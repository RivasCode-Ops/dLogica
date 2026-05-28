from __future__ import annotations

import json

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder

from api.db import get_session
from api.models import AuditoriaRecord, BriefingRecord, DecisaoRecord, DemandaRecord, TriagemRecord
from api.schemas import (
    AcceptedOut,
    AuditoriaIn,
    BriefingIn,
    DecisaoIn,
    DemandaDetalheOut,
    DemandaIn,
    DemandaListOut,
    TriagemIn,
)
from api.services.demanda_consulta import listar_demandas, obter_demanda

router = APIRouter(prefix="/api/v1")


@router.get("/demandas", response_model=DemandaListOut)
def get_demandas() -> DemandaListOut:
    with get_session() as session:
        return listar_demandas(session)


@router.get("/demandas/{demanda_id}", response_model=DemandaDetalheOut)
def get_demanda(demanda_id: str) -> DemandaDetalheOut:
    with get_session() as session:
        detalhe = obter_demanda(session, demanda_id)
        if detalhe is None:
            raise HTTPException(status_code=404, detail="demanda_id nao encontrado")
        return detalhe

@router.post("/modulo1/demandas", response_model=AcceptedOut)
def upsert_demanda(payload: DemandaIn) -> AcceptedOut:
    with get_session() as session:
        row = session.get(DemandaRecord, payload.demanda_id)
        payload_json = json.dumps(jsonable_encoder(payload), ensure_ascii=False)
        if row is None:
            if payload.status != "capturado":
                raise HTTPException(
                    status_code=400,
                    detail="Status inicial invalido para criacao. Use 'capturado'.",
                )
            row = DemandaRecord(demanda_id=payload.demanda_id, payload_json=payload_json)
            session.add(row)
        else:
            row.payload_json = payload_json
            session.add(row)
        session.commit()
    return AcceptedOut(status="accepted", modulo="m1", demanda_id=payload.demanda_id)


@router.post("/modulo2/triagens", response_model=AcceptedOut)
def upsert_triagem(payload: TriagemIn) -> AcceptedOut:
    with get_session() as session:
        demanda = session.get(DemandaRecord, payload.demanda_id)
        if demanda is None:
            raise HTTPException(status_code=400, detail="demanda_id nao encontrado no modulo 1")
        row = session.get(TriagemRecord, payload.demanda_id)
        payload_json = json.dumps(jsonable_encoder(payload), ensure_ascii=False)
        if row is None:
            row = TriagemRecord(demanda_id=payload.demanda_id, payload_json=payload_json)
            session.add(row)
        else:
            row.payload_json = payload_json
            session.add(row)
        session.commit()
    return AcceptedOut(status="accepted", modulo="m2", demanda_id=payload.demanda_id)


@router.post("/modulo3/decisoes", response_model=AcceptedOut)
def upsert_decisao(payload: DecisaoIn) -> AcceptedOut:
    with get_session() as session:
        demanda = session.get(DemandaRecord, payload.demanda_id)
        if demanda is None:
            raise HTTPException(status_code=400, detail="demanda_id nao encontrado no modulo 1")

        envolve_painel_documento = payload.tipo_recomendado in {"painel", "documento_estruturado"} or any(
            a in {"painel", "documento_estruturado"} for a in payload.alternativas_consideradas
        )
        if envolve_painel_documento and payload.validacao_painel_documento is None:
            raise HTTPException(status_code=400, detail="validacao_painel_documento obrigatoria para disputa painel/documento")

        if payload.validacao_painel_documento is not None:
            score = payload.validacao_painel_documento.score_classificacao
            if 5 <= score <= 7 and not payload.validacao_painel_documento.evidencia_teste_7_dias:
                raise HTTPException(status_code=400, detail="evidencia_teste_7_dias obrigatoria para score entre 5 e 7")

        if payload.tipo_recomendado == "app" and payload.gate_promocao_app is None:
            raise HTTPException(status_code=400, detail="gate_promocao_app obrigatorio quando tipo_recomendado = app")

        row = session.get(DecisaoRecord, payload.demanda_id)
        payload_json = json.dumps(jsonable_encoder(payload), ensure_ascii=False)
        if row is None:
            row = DecisaoRecord(demanda_id=payload.demanda_id, payload_json=payload_json)
            session.add(row)
        else:
            row.payload_json = payload_json
            session.add(row)
        session.commit()
    return AcceptedOut(status="accepted", modulo="m3", demanda_id=payload.demanda_id)


@router.post("/modulo4/briefings", response_model=AcceptedOut)
def upsert_briefing(payload: BriefingIn) -> AcceptedOut:
    with get_session() as session:
        demanda = session.get(DemandaRecord, payload.demanda_id)
        if demanda is None:
            raise HTTPException(status_code=400, detail="demanda_id nao encontrado no modulo 1")
        decisao_row = session.get(DecisaoRecord, payload.demanda_id)
        if decisao_row is None:
            raise HTTPException(status_code=400, detail="decisao nao encontrada no modulo 3")

        decisao = DecisaoIn.model_validate(json.loads(decisao_row.payload_json))
        if payload.solucao_sugerida != decisao.tipo_recomendado:
            raise HTTPException(status_code=400, detail="solucao_sugerida divergente da decisao do modulo 3")

        row = session.get(BriefingRecord, payload.demanda_id)
        payload_json = json.dumps(jsonable_encoder(payload), ensure_ascii=False)
        if row is None:
            row = BriefingRecord(demanda_id=payload.demanda_id, briefing_id=payload.briefing_id, payload_json=payload_json)
            session.add(row)
        else:
            row.briefing_id = payload.briefing_id
            row.payload_json = payload_json
            session.add(row)
        session.commit()
    return AcceptedOut(status="accepted", modulo="m4", demanda_id=payload.demanda_id)


@router.post("/modulo5/auditorias", response_model=AcceptedOut)
def upsert_auditoria(payload: AuditoriaIn) -> AcceptedOut:
    with get_session() as session:
        demanda = session.get(DemandaRecord, payload.demanda_id)
        if demanda is None:
            raise HTTPException(status_code=400, detail="demanda_id nao encontrado no modulo 1")
        briefing = session.get(BriefingRecord, payload.demanda_id)
        if briefing is None:
            raise HTTPException(status_code=400, detail="briefing nao encontrado no modulo 4")
        if briefing.briefing_id != payload.briefing_id:
            raise HTTPException(status_code=400, detail="briefing_id divergente do briefing do modulo 4")

        row = session.get(AuditoriaRecord, payload.demanda_id)
        payload_json = json.dumps(jsonable_encoder(payload), ensure_ascii=False)
        if row is None:
            row = AuditoriaRecord(
                demanda_id=payload.demanda_id,
                briefing_id=payload.briefing_id,
                auditoria_id=payload.auditoria_id,
                payload_json=payload_json,
            )
            session.add(row)
        else:
            row.briefing_id = payload.briefing_id
            row.auditoria_id = payload.auditoria_id
            row.payload_json = payload_json
            session.add(row)
        session.commit()
    return AcceptedOut(status="accepted", modulo="m5", demanda_id=payload.demanda_id)
