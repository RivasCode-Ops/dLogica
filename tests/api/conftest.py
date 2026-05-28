from __future__ import annotations

import json
from collections.abc import Generator
from pathlib import Path

import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine

ROOT = Path(__file__).resolve().parents[2]
TESTS_DIR = ROOT / "tests"


@pytest.fixture()
def api_client(tmp_path, monkeypatch) -> Generator[TestClient, None, None]:
    db_path = tmp_path / "api_test.db"
    engine = create_engine(f"sqlite:///{db_path}", connect_args={"check_same_thread": False})

    import api.db as db_module

    monkeypatch.setattr(db_module, "engine", engine)

    def _get_session() -> Session:
        return Session(engine)

    monkeypatch.setattr(db_module, "get_session", _get_session)

    from api import models  # noqa: F401

    SQLModel.metadata.create_all(engine)

    from api.main import app

    with TestClient(app) as client:
        yield client


def load_json(relative: str) -> dict:
    return json.loads((TESTS_DIR / relative).read_text(encoding="utf-8"))


def seed_demanda(client: TestClient, demanda_id: str = "DLG-20260528-101") -> None:
    m1 = load_json("integrado-positivo-m1.json")
    payload = {
        "demanda_id": demanda_id,
        "data_registro": m1["data_registro"],
        "origem_principal": m1["origem_principal"],
        "demanda_bruta": m1["demanda_bruta"],
        "status": m1["status"],
    }
    resp = client.post("/api/v1/modulo1/demandas", json=payload)
    assert resp.status_code == 200, resp.text


def seed_through_triagem(client: TestClient, demanda_id: str = "DLG-20260528-101") -> None:
    seed_demanda(client, demanda_id)
    m2 = load_json("integrado-positivo-m2.json")
    payload = {"demanda_id": demanda_id, "triagem_itens": m2["triagem_itens"]}
    for item in payload["triagem_itens"]:
        item["demanda_id"] = demanda_id
    resp = client.post("/api/v1/modulo2/triagens", json=payload)
    assert resp.status_code == 200, resp.text


def seed_through_decisao_painel(client: TestClient, demanda_id: str = "DLG-20260528-101") -> None:
    seed_through_triagem(client, demanda_id)
    payload = load_json("integrado-positivo-m3.json")
    payload["demanda_id"] = demanda_id
    resp = client.post("/api/v1/modulo3/decisoes", json=payload)
    assert resp.status_code == 200, resp.text


def seed_through_briefing(client: TestClient, demanda_id: str = "DLG-20260528-101") -> None:
    seed_through_decisao_painel(client, demanda_id)
    payload = load_json("integrado-positivo-m4.json")
    payload["demanda_id"] = demanda_id
    resp = client.post("/api/v1/modulo4/briefings", json=payload)
    assert resp.status_code == 200, resp.text
