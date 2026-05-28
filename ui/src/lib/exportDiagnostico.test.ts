import { describe, expect, it } from "vitest";
import { buildDiagnosticoMarkdown } from "./exportDiagnostico";
import type { DemandaDetalhe } from "../types/demanda";

const detalheMinimo: DemandaDetalhe = {
  demanda_id: "DLG-TEST",
  pipeline: [],
  etapas_concluidas: 1,
  etapas_total: 5,
  proxima_etapa: "m2",
  proxima_etapa_label: "Triagem",
  briefing_id: null,
  resumo: {
    problema: "Problema teste",
    objetivo: "Objetivo teste",
    solucao_sugerida: "painel",
    proximo_passo: null,
    veredito: null,
    baseline: null,
    meta: null,
    demanda_bruta: "Entrada de teste",
    origem_principal: "usuario",
    auditoria_resumo: null,
  },
};

describe("buildDiagnosticoMarkdown", () => {
  it("gera titulo e secoes principais", () => {
    const md = buildDiagnosticoMarkdown("DLG-TEST", detalheMinimo);
    expect(md).toContain("# Diagnostico dLogica — DLG-TEST");
    expect(md).toContain("## Problema e objetivo");
    expect(md).toContain("Problema teste");
  });
});
