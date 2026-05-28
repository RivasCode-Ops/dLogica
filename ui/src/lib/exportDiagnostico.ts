import { labelOrigem, labelSolucao, labelVeredito } from "./labels";
import type { DemandaDetalhe } from "../types/demanda";

export function buildDiagnosticoMarkdown(demandaId: string, detalhe: DemandaDetalhe): string {
  const { resumo } = detalhe;
  const lines = [
    `# Diagnostico dLogica — ${demandaId}`,
    "",
    `> Gerado em ${new Date().toISOString()}`,
    "",
    "## Status",
    "",
    `- Progresso: ${detalhe.etapas_concluidas}/${detalhe.etapas_total}`,
    `- Proxima etapa: ${detalhe.proxima_etapa_label}`,
    `- Veredito: ${labelVeredito(resumo.veredito)}`,
    "",
    "## Entrada original",
    "",
    resumo.demanda_bruta ? `> ${resumo.demanda_bruta}` : "_Nao registrada_",
    "",
    "## Problema e objetivo",
    "",
    `**Problema:** ${resumo.problema ?? "—"}`,
    "",
    `**Objetivo:** ${resumo.objetivo ?? "—"}`,
    "",
    "## Decisao",
    "",
    `- Solucao recomendada: ${labelSolucao(resumo.solucao_sugerida)}`,
    `- Origem: ${labelOrigem(resumo.origem_principal)}`,
    "",
  ];

  if (resumo.baseline || resumo.meta) {
    lines.push("## Metricas", "", `| Indicador | Valor |`, `|-----------|-------|`, `| Baseline | ${resumo.baseline ?? "—"} |`, `| Meta (1a iteracao) | ${resumo.meta ?? "—"} |`, "");
  }

  if (resumo.proximo_passo) {
    lines.push("## Proximo passo", "", resumo.proximo_passo, "");
  }

  if (resumo.auditoria_resumo) {
    lines.push("## Parecer da auditoria", "", resumo.auditoria_resumo, "");
  }

  lines.push("## Pipeline", "");
  for (const step of detalhe.pipeline) {
    lines.push(`- [${step.concluido ? "x" : " "}] ${step.modulo.toUpperCase()} — ${step.label}`);
  }

  lines.push("", "---", "_Documento gerado pelo dLogica (Fase 4)._");
  return lines.join("\n");
}

export function downloadDiagnosticoMarkdown(demandaId: string, detalhe: DemandaDetalhe): void {
  const content = buildDiagnosticoMarkdown(demandaId, detalhe);
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `dlogica-${demandaId}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}
