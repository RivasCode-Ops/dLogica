from __future__ import annotations

from fastapi.testclient import TestClient

from api.main import app


def test_health() -> None:
    client = TestClient(app)
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


def test_end_to_end_api_flow() -> None:
    client = TestClient(app)
    demanda_id = "DLG-API-E2E-001"

    m1 = {
        "demanda_id": demanda_id,
        "data_registro": "2026-05-28T23:00:00Z",
        "origem_principal": "usuario",
        "demanda_bruta": "Preciso melhorar a priorizacao semanal com rastreabilidade.",
        "status": "capturado",
    }
    r1 = client.post("/api/v1/modulo1/demandas", json=m1)
    assert r1.status_code == 200

    m2 = {
        "demanda_id": demanda_id,
        "triagem_itens": [
            {
                "triagem_item_id": "TRI-API-01",
                "demanda_id": demanda_id,
                "texto_item": "Ha tarefas criticas sem dono.",
                "classe_item": "fato",
                "status_pertinencia": "manter",
                "justificativa_curta": "Afeta diretamente a operacao.",
                "data_classificacao": "2026-05-28T23:05:00Z",
            }
        ],
    }
    r2 = client.post("/api/v1/modulo2/triagens", json=m2)
    assert r2.status_code == 200

    m3 = {
        "decisao_id": "DEC-API-01",
        "demanda_id": demanda_id,
        "tipo_recomendado": "painel",
        "justificativa_principal": "Consulta recorrente com comparacao de indicadores.",
        "alternativas_consideradas": ["documento_estruturado"],
        "data_decisao": "2026-05-28T23:10:00Z",
        "responsavel_decisao": "time-dlogica",
        "validacao_painel_documento": {
            "aplicada": True,
            "score_classificacao": 6,
            "criterio_mais_relevante": "frequencia de consulta",
            "decisao_final": "painel",
            "justificativa_curta": "Uso recorrente semanal.",
            "evidencia_teste_7_dias": "Equipe consultou diariamente por uma semana.",
        },
    }
    r3 = client.post("/api/v1/modulo3/decisoes", json=m3)
    assert r3.status_code == 200

    m4 = {
        "briefing_id": "BRF-API-01",
        "demanda_id": demanda_id,
        "problema": "Ha retrabalho por falta de visao de prioridades.",
        "objetivo": "Padronizar decisao semanal.",
        "criterios_de_decisao": ["tempo", "impacto", "risco"],
        "solucao_sugerida": "painel",
        "proximo_passo": "Subir painel minimo para operacao.",
        "metrica_tempo": "Reduzir reuniao de 80 para 40 minutos.",
        "metrica_impacto": "Aumentar cumprimento para 85%.",
        "metrica_risco": "Reduzir tarefas sem dono para <=2.",
        "baseline_numerico_inicial": "9 tarefas sem dono",
        "meta_numerica_primeira_iteracao": "<=2 tarefas sem dono",
        "fora_de_escopo": ["App completo na fase inicial"],
        "descartes_relevantes": [
            {"item": "Relatorio mensal", "justificativa_curta": "Ritmo insuficiente"},
            {"item": "Automacao total", "justificativa_curta": "Escopo alto"},
        ],
        "data_geracao": "2026-05-28T23:15:00Z",
        "responsavel_geracao": "time-dlogica",
    }
    r4 = client.post("/api/v1/modulo4/briefings", json=m4)
    assert r4.status_code == 200

    m5 = {
        "auditoria_id": "AUD-API-01",
        "demanda_id": demanda_id,
        "briefing_id": "BRF-API-01",
        "escopo_referencia": "Teste E2E API",
        "gates_criticos": {
            "aderencia_problema_objetivo": "ok",
            "escopo_limites": "ok",
            "rastreabilidade_decisao": "ok",
            "qualidade_minima_verificavel": "ok",
        },
        "gates_importantes": {
            "coerencia_tipo_solucao": "ok",
            "proximo_passo_executavel": "ok",
            "clareza_entrega": "ok",
            "descartes_rastreaveis": "ok",
        },
        "veredito": "aprovado",
        "gates_criticos_falhos": [],
        "gates_importantes_falhos": [],
        "resumo_objetivo": "Fluxo API validado ponta a ponta com consistencia.",
        "acoes_obrigatorias_antes_do_aceite": [],
        "data_auditoria": "2026-05-28T23:20:00Z",
        "responsavel_auditoria": "time-dlogica",
    }
    r5 = client.post("/api/v1/modulo5/auditorias", json=m5)
    assert r5.status_code == 200

    lista = client.get("/api/v1/demandas")
    assert lista.status_code == 200
    body = lista.json()
    assert body["total"] >= 1
    ids = [item["demanda_id"] for item in body["itens"]]
    assert demanda_id in ids

    detalhe = client.get(f"/api/v1/demandas/{demanda_id}")
    assert detalhe.status_code == 200
    d = detalhe.json()
    assert d["demanda_id"] == demanda_id
    assert d["etapas_concluidas"] == 5
    assert d["resumo"]["veredito"] == "aprovado"


def test_get_demanda_not_found() -> None:
    client = TestClient(app)
    resp = client.get("/api/v1/demandas/NAO-EXISTE-999")
    assert resp.status_code == 404
