from __future__ import annotations

import json
from typing import TypeVar

from sqlmodel import Session, select

from api.models import AuditoriaRecord, BriefingRecord, DecisaoRecord, DemandaRecord, TriagemRecord
from api.schemas import (
    AuditoriaIn,
    BriefingIn,
    DecisaoIn,
    DemandaDetalheOut,
    DemandaIn,
    DemandaListItem,
    DemandaListOut,
    ModuloPipelineStatus,
    TriagemIn,
)

T = TypeVar("T")

MODULOS_ORDEM = ("m1", "m2", "m3", "m4", "m5")
PROXIMA_ETAPA_LABEL = {
    "m1": "Captura da demanda",
    "m2": "Triagem",
    "m3": "Decisao de solucao",
    "m4": "Briefing final",
    "m5": "Auditoria",
}


def _parse(model: type[T], raw: str | None) -> T | None:
    if raw is None:
        return None
    return model.model_validate(json.loads(raw))


def _resumo_demanda(texto: str, max_len: int = 120) -> str:
    limpo = " ".join(texto.split())
    if len(limpo) <= max_len:
        return limpo
    return limpo[: max_len - 3] + "..."


def _pipeline_flags(session: Session, demanda_id: str) -> dict[str, bool]:
    return {
        "m1": session.get(DemandaRecord, demanda_id) is not None,
        "m2": session.get(TriagemRecord, demanda_id) is not None,
        "m3": session.get(DecisaoRecord, demanda_id) is not None,
        "m4": session.get(BriefingRecord, demanda_id) is not None,
        "m5": session.get(AuditoriaRecord, demanda_id) is not None,
    }


def _proxima_etapa(flags: dict[str, bool]) -> str | None:
    for modulo in MODULOS_ORDEM:
        if not flags[modulo]:
            return modulo
    return None


def listar_demandas(session: Session) -> DemandaListOut:
    demandas = session.exec(select(DemandaRecord).order_by(DemandaRecord.demanda_id)).all()
    itens: list[DemandaListItem] = []

    for row in demandas:
        demanda = _parse(DemandaIn, row.payload_json)
        flags = _pipeline_flags(session, row.demanda_id)
        concluidas = sum(1 for ok in flags.values() if ok)
        proxima = _proxima_etapa(flags)

        veredito: str | None = None
        auditoria_row = session.get(AuditoriaRecord, row.demanda_id)
        if auditoria_row is not None:
            auditoria = _parse(AuditoriaIn, auditoria_row.payload_json)
            if auditoria is not None:
                veredito = auditoria.veredito

        tipo_solucao: str | None = None
        decisao_row = session.get(DecisaoRecord, row.demanda_id)
        if decisao_row is not None:
            decisao = _parse(DecisaoIn, decisao_row.payload_json)
            if decisao is not None:
                tipo_solucao = decisao.tipo_recomendado

        itens.append(
            DemandaListItem(
                demanda_id=row.demanda_id,
                status_demanda=demanda.status if demanda else None,
                origem_principal=demanda.origem_principal if demanda else None,
                resumo=_resumo_demanda(demanda.demanda_bruta) if demanda else None,
                etapas_concluidas=concluidas,
                etapas_total=5,
                veredito=veredito,
                tipo_solucao=tipo_solucao,
                proxima_etapa=proxima,
                proxima_etapa_label=PROXIMA_ETAPA_LABEL.get(proxima) if proxima else "Fluxo concluido",
            )
        )

    return DemandaListOut(total=len(itens), itens=itens)


def obter_demanda(session: Session, demanda_id: str) -> DemandaDetalheOut | None:
    demanda_row = session.get(DemandaRecord, demanda_id)
    if demanda_row is None:
        return None

    triagem_row = session.get(TriagemRecord, demanda_id)
    decisao_row = session.get(DecisaoRecord, demanda_id)
    briefing_row = session.get(BriefingRecord, demanda_id)
    auditoria_row = session.get(AuditoriaRecord, demanda_id)

    flags = {
        "m1": True,
        "m2": triagem_row is not None,
        "m3": decisao_row is not None,
        "m4": briefing_row is not None,
        "m5": auditoria_row is not None,
    }
    proxima = _proxima_etapa(flags)

    pipeline = [
        ModuloPipelineStatus(modulo=modulo, concluido=flags[modulo], label=PROXIMA_ETAPA_LABEL[modulo])
        for modulo in MODULOS_ORDEM
    ]

    demanda = _parse(DemandaIn, demanda_row.payload_json)
    decisao = _parse(DecisaoIn, decisao_row.payload_json) if decisao_row else None
    briefing = _parse(BriefingIn, briefing_row.payload_json) if briefing_row else None
    auditoria = _parse(AuditoriaIn, auditoria_row.payload_json) if auditoria_row else None

    return DemandaDetalheOut(
        demanda_id=demanda_id,
        pipeline=pipeline,
        etapas_concluidas=sum(1 for ok in flags.values() if ok),
        etapas_total=5,
        proxima_etapa=proxima,
        proxima_etapa_label=PROXIMA_ETAPA_LABEL.get(proxima) if proxima else "Fluxo concluido",
        briefing_id=briefing.briefing_id if briefing else None,
        demanda=demanda,
        triagem=_parse(TriagemIn, triagem_row.payload_json) if triagem_row else None,
        decisao=decisao,
        briefing=briefing,
        auditoria=auditoria,
        resumo={
            "problema": briefing.problema if briefing else None,
            "objetivo": briefing.objetivo if briefing else None,
            "solucao_sugerida": briefing.solucao_sugerida if briefing else (decisao.tipo_recomendado if decisao else None),
            "proximo_passo": briefing.proximo_passo if briefing else None,
            "veredito": auditoria.veredito if auditoria else None,
            "baseline": briefing.baseline_numerico_inicial if briefing else None,
            "meta": briefing.meta_numerica_primeira_iteracao if briefing else None,
            "demanda_bruta": demanda.demanda_bruta if demanda else None,
            "origem_principal": demanda.origem_principal if demanda else None,
            "auditoria_resumo": auditoria.resumo_objetivo if auditoria else None,
        },
    )
