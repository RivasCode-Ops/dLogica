#!/usr/bin/env python3
"""Importa arquivos *.db.json legados (Fase 1) para dlogica_api.db (Fase 3)."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from sqlmodel import Session, SQLModel, create_engine, select

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from api.models import (  # noqa: E402
    AuditoriaRecord,
    BriefingRecord,
    DecisaoRecord,
    DemandaRecord,
    TriagemRecord,
)

DB_FILE = ROOT / "dlogica_api.db"
FILES = {
    "demandas": ("demandas.db.json", DemandaRecord, "demanda_id"),
    "triagens": ("triagens.db.json", TriagemRecord, "demanda_id"),
    "decisoes": ("decisoes.db.json", DecisaoRecord, "demanda_id"),
    "briefings": ("briefings.db.json", BriefingRecord, "demanda_id"),
    "auditorias": ("auditorias.db.json", AuditoriaRecord, "demanda_id"),
}


def load_array(path: Path) -> list[dict]:
    if not path.is_file():
        return []
    return json.loads(path.read_text(encoding="utf-8-sig"))


def upsert_demanda(session: Session, item: dict) -> str:
    demanda_id = item["demanda_id"]
    payload_json = json.dumps(item, ensure_ascii=False)
    row = session.get(DemandaRecord, demanda_id)
    if row is None:
        session.add(DemandaRecord(demanda_id=demanda_id, payload_json=payload_json))
        return "inserted"
    row.payload_json = payload_json
    session.add(row)
    return "updated"


def upsert_by_demanda_id(session: Session, model: type, item: dict, extra: dict | None = None) -> str:
    demanda_id = item["demanda_id"]
    payload_json = json.dumps(item, ensure_ascii=False)
    row = session.get(model, demanda_id)
    kwargs = {"demanda_id": demanda_id, "payload_json": payload_json}
    if extra:
        kwargs.update(extra)
    if row is None:
        session.add(model(**kwargs))
        return "inserted"
    for key, value in kwargs.items():
        setattr(row, key, value)
    session.add(row)
    return "updated"


def main() -> int:
    engine = create_engine(f"sqlite:///{DB_FILE.as_posix()}", echo=False)
    SQLModel.metadata.create_all(engine)

    stats: dict[str, dict[str, int]] = {}

    with Session(engine) as session:
        for label, (filename, model, _) in FILES.items():
            path = ROOT / filename
            items = load_array(path)
            stats[label] = {"inserted": 0, "updated": 0, "skipped": 0}

            for item in items:
                if label == "demandas":
                    action = upsert_demanda(session, item)
                elif label == "triagens":
                    action = upsert_by_demanda_id(session, TriagemRecord, item)
                elif label == "decisoes":
                    action = upsert_by_demanda_id(session, DecisaoRecord, item)
                elif label == "briefings":
                    action = upsert_by_demanda_id(
                        session,
                        BriefingRecord,
                        item,
                        {"briefing_id": item.get("briefing_id", "")},
                    )
                elif label == "auditorias":
                    action = upsert_by_demanda_id(
                        session,
                        AuditoriaRecord,
                        item,
                        {
                            "briefing_id": item.get("briefing_id", ""),
                            "auditoria_id": item.get("auditoria_id", ""),
                        },
                    )
                else:
                    stats[label]["skipped"] += 1
                    continue

                stats[label][action] += 1

            session.commit()

        total_demandas = len(session.exec(select(DemandaRecord)).all())

    print(f"Banco: {DB_FILE}")
    for label, counts in stats.items():
        print(f"  {label}: {counts}")
    print(f"  total demandas no SQLite: {total_demandas}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
