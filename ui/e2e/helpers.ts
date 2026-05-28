import type { APIRequestContext } from "@playwright/test";

/** API dedicada do Playwright (porta 8765); evita servidor dev antigo em :8000. */
const API = "http://127.0.0.1:8765";

export async function seedCasoCompleto(request: APIRequestContext, demandaId: string): Promise<void> {
  const m1 = await request.post(`${API}/api/v1/modulo1/demandas`, {
    data: {
      demanda_id: demandaId,
      data_registro: "2026-05-28T23:00:00Z",
      origem_principal: "usuario",
      demanda_bruta: "Caso E2E Playwright com fluxo completo para exportacao de diagnostico.",
      status: "capturado",
    },
  });
  if (!m1.ok()) {
    throw new Error(`M1 falhou: ${await m1.text()}`);
  }

  const m2 = await request.post(`${API}/api/v1/modulo2/triagens`, {
    data: {
      demanda_id: demandaId,
      triagem_itens: [
        {
          triagem_item_id: "TRI-PW-01",
          demanda_id: demandaId,
          texto_item: "Ha tarefas criticas sem dono.",
          classe_item: "fato",
          status_pertinencia: "manter",
          justificativa_curta: "Afeta diretamente a operacao.",
          data_classificacao: "2026-05-28T23:05:00Z",
        },
      ],
    },
  });
  if (!m2.ok()) {
    throw new Error(`M2 falhou: ${await m2.text()}`);
  }

  const m3 = await request.post(`${API}/api/v1/modulo3/decisoes`, {
    data: {
      decisao_id: "DEC-PW-01",
      demanda_id: demandaId,
      tipo_recomendado: "painel",
      justificativa_principal: "Consulta recorrente com comparacao de indicadores.",
      alternativas_consideradas: ["documento_estruturado"],
      data_decisao: "2026-05-28T23:10:00Z",
      responsavel_decisao: "time-dlogica",
      validacao_painel_documento: {
        aplicada: true,
        score_classificacao: 6,
        criterio_mais_relevante: "frequencia de consulta",
        decisao_final: "painel",
        justificativa_curta: "Uso recorrente semanal.",
        evidencia_teste_7_dias: "Equipe consultou diariamente por uma semana.",
      },
    },
  });
  if (!m3.ok()) {
    throw new Error(`M3 falhou: ${await m3.text()}`);
  }

  const m4 = await request.post(`${API}/api/v1/modulo4/briefings`, {
    data: {
      briefing_id: "BRF-PW-01",
      demanda_id: demandaId,
      problema: "Ha retrabalho por falta de visao de prioridades.",
      objetivo: "Padronizar decisao semanal.",
      criterios_de_decisao: ["tempo", "impacto", "risco"],
      solucao_sugerida: "painel",
      proximo_passo: "Subir painel minimo para operacao.",
      metrica_tempo: "Reduzir reuniao de 80 para 40 minutos.",
      metrica_impacto: "Aumentar cumprimento para 85%.",
      metrica_risco: "Reduzir tarefas sem dono para <=2.",
      baseline_numerico_inicial: "9 tarefas sem dono",
      meta_numerica_primeira_iteracao: "<=2 tarefas sem dono",
      fora_de_escopo: ["App completo na fase inicial"],
      descartes_relevantes: [
        { item: "Relatorio mensal", justificativa_curta: "Ritmo insuficiente" },
        { item: "Automacao total", justificativa_curta: "Escopo alto" },
      ],
      data_geracao: "2026-05-28T23:15:00Z",
      responsavel_geracao: "time-dlogica",
    },
  });
  if (!m4.ok()) {
    throw new Error(`M4 falhou: ${await m4.text()}`);
  }

  const m5 = await request.post(`${API}/api/v1/modulo5/auditorias`, {
    data: {
      auditoria_id: "AUD-PW-01",
      demanda_id: demandaId,
      briefing_id: "BRF-PW-01",
      escopo_referencia: "Teste E2E Playwright",
      gates_criticos: {
        aderencia_problema_objetivo: "ok",
        escopo_limites: "ok",
        rastreabilidade_decisao: "ok",
        qualidade_minima_verificavel: "ok",
      },
      gates_importantes: {
        coerencia_tipo_solucao: "ok",
        proximo_passo_executavel: "ok",
        clareza_entrega: "ok",
        descartes_rastreaveis: "ok",
      },
      veredito: "aprovado",
      gates_criticos_falhos: [],
      gates_importantes_falhos: [],
      resumo_objetivo: "Fluxo E2E Playwright validado com consistencia.",
      acoes_obrigatorias_antes_do_aceite: [],
      data_auditoria: "2026-05-28T23:20:00Z",
      responsavel_auditoria: "time-dlogica",
    },
  });
  if (!m5.ok()) {
    throw new Error(`M5 falhou: ${await m5.text()}`);
  }

  const detalhe = await request.get(
    `${API}/api/v1/demandas/${encodeURIComponent(demandaId)}`,
  );
  if (!detalhe.ok()) {
    throw new Error(`GET detalhe apos seed falhou: ${await detalhe.text()}`);
  }
  const body = (await detalhe.json()) as { etapas_concluidas?: number; proxima_etapa?: string | null };
  if (body.etapas_concluidas !== 5 || body.proxima_etapa != null) {
    throw new Error(`Seed incompleto: ${JSON.stringify(body)}`);
  }
}
