from __future__ import annotations

import pytest

from tests.api.conftest import (
    load_json,
    seed_demanda,
    seed_through_decisao_painel,
    seed_through_triagem,
)


@pytest.mark.parametrize(
    ("fixture_path", "endpoint"),
    [
        ("modulo1/ct04-demanda-vazia.json", "/api/v1/modulo1/demandas"),
        ("modulo1/ct05-origem-invalida.json", "/api/v1/modulo1/demandas"),
    ],
)
def test_modulo1_negativos_validacao(api_client, fixture_path: str, endpoint: str) -> None:
    payload = load_json(fixture_path)
    resp = api_client.post(endpoint, json=payload)
    assert resp.status_code == 422


def test_modulo2_sem_justificativa(api_client) -> None:
    seed_demanda(api_client)
    payload = load_json("modulo2/ct2-06-justificativa-ausente.json")
    resp = api_client.post("/api/v1/modulo2/triagens", json=payload)
    assert resp.status_code == 422


def test_modulo2_sem_itens(api_client) -> None:
    seed_demanda(api_client, "DLG-NEG-M2-08")
    resp = api_client.post(
        "/api/v1/modulo2/triagens",
        json={"demanda_id": "DLG-NEG-M2-08", "triagem_itens": []},
    )
    assert resp.status_code == 422


def test_modulo3_app_sem_gate(api_client) -> None:
    seed_through_triagem(api_client)
    payload = load_json("modulo3/ct3-08-app-sem-gate.json")
    resp = api_client.post("/api/v1/modulo3/decisoes", json=payload)
    assert resp.status_code == 400
    assert "gate_promocao_app" in resp.json()["detail"]


def test_modulo3_painel_sem_validacao(api_client) -> None:
    seed_through_triagem(api_client, "DLG-NEG-M3-06")
    resp = api_client.post(
        "/api/v1/modulo3/decisoes",
        json={
            "decisao_id": "DEC-NEG-06",
            "demanda_id": "DLG-NEG-M3-06",
            "tipo_recomendado": "painel",
            "justificativa_principal": "Teste sem bloco de validacao painel documento.",
            "alternativas_consideradas": ["documento_estruturado"],
            "data_decisao": "2026-05-28T19:00:00Z",
            "responsavel_decisao": "time-dlogica",
        },
    )
    assert resp.status_code == 400
    assert "validacao_painel_documento" in resp.json()["detail"]


def test_modulo4_incoerencia_decisao(api_client) -> None:
    seed_through_decisao_painel(api_client)
    payload = load_json("modulo4/ct4-09-incoerencia-com-decisao.json")
    resp = api_client.post("/api/v1/modulo4/briefings", json=payload)
    assert resp.status_code == 400
    assert "divergente" in resp.json()["detail"]


def test_modulo5_briefing_inexistente(api_client) -> None:
    seed_demanda(api_client, "DLG-NEG-M5-07")
    payload = load_json("modulo5/ct5-07-briefing-inexistente.json")
    payload["demanda_id"] = "DLG-NEG-M5-07"
    resp = api_client.post("/api/v1/modulo5/auditorias", json=payload)
    assert resp.status_code == 400
    assert "briefing" in resp.json()["detail"].lower()


def test_modulo1_status_nao_capturado_aceito_pela_api(api_client) -> None:
    """API aceita status inicial diferente de capturado (regra extra pode entrar depois)."""
    payload = load_json("modulo1/ct06-status-inicial-invalido.json")
    resp = api_client.post("/api/v1/modulo1/demandas", json=payload)
    assert resp.status_code == 200


def test_modulo2_demanda_inexistente(api_client) -> None:
    payload = load_json("integrado-positivo-m2.json")
    payload["demanda_id"] = "DLG-NAO-EXISTE-999"
    for item in payload["triagem_itens"]:
        item["demanda_id"] = "DLG-NAO-EXISTE-999"
    resp = api_client.post("/api/v1/modulo2/triagens", json=payload)
    assert resp.status_code == 400
    assert "modulo 1" in resp.json()["detail"].lower()


def test_validacao_pydantic_em_portugues(api_client) -> None:
    seed_through_triagem(api_client, "DLG-NEG-PT-01")
    payload = load_json("integrado-positivo-m3.json")
    payload["demanda_id"] = "DLG-NEG-PT-01"
    payload["validacao_painel_documento"]["score_classificacao"] = 11
    resp = api_client.post("/api/v1/modulo3/decisoes", json=payload)
    assert resp.status_code == 422
    detail = resp.json()["detail"]
    assert isinstance(detail, list)
    msgs = " ".join(item["msg"] for item in detail)
    assert "menor ou igual" in msgs
