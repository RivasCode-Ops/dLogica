import { jsPDF } from "jspdf";
import { labelOrigem, labelSolucao, labelVeredito } from "./labels";
import type { DemandaDetalhe } from "../types/demanda";

const PDF_MARGIN = 18;
const PDF_LINE = 6;
const PDF_WIDTH = 174;

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

function writePdfLines(
  doc: jsPDF,
  y: { value: number },
  text: string,
  options?: { bold?: boolean; size?: number; gapAfter?: number },
): void {
  const bold = options?.bold ?? false;
  const size = options?.size ?? 10;
  const gapAfter = options?.gapAfter ?? 0;
  doc.setFont("helvetica", bold ? "bold" : "normal");
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(text, PDF_WIDTH) as string[];
  for (const line of lines) {
    if (y.value > 275) {
      doc.addPage();
      y.value = PDF_MARGIN;
    }
    doc.text(line, PDF_MARGIN, y.value);
    y.value += PDF_LINE;
  }
  y.value += gapAfter;
}

export function downloadDiagnosticoPdf(demandaId: string, detalhe: DemandaDetalhe): void {
  const { resumo } = detalhe;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const y = { value: PDF_MARGIN };

  writePdfLines(doc, y, `Diagnostico dLogica`, { bold: true, size: 16, gapAfter: 2 });
  writePdfLines(doc, y, demandaId, { bold: true, size: 13, gapAfter: 4 });
  writePdfLines(doc, y, `Gerado em ${new Date().toLocaleString("pt-BR")}`, { size: 9, gapAfter: 6 });

  writePdfLines(doc, y, "Status", { bold: true, size: 11, gapAfter: 2 });
  writePdfLines(
    doc,
    y,
    `Progresso: ${detalhe.etapas_concluidas}/${detalhe.etapas_total} | ${detalhe.proxima_etapa_label} | Veredito: ${labelVeredito(resumo.veredito)}`,
    { gapAfter: 6 },
  );

  if (resumo.demanda_bruta) {
    writePdfLines(doc, y, "Entrada original", { bold: true, size: 11, gapAfter: 2 });
    writePdfLines(doc, y, resumo.demanda_bruta, { gapAfter: 6 });
  }

  writePdfLines(doc, y, "Problema", { bold: true, size: 11, gapAfter: 1 });
  writePdfLines(doc, y, resumo.problema ?? "—", { gapAfter: 4 });
  writePdfLines(doc, y, "Objetivo", { bold: true, size: 11, gapAfter: 1 });
  writePdfLines(doc, y, resumo.objetivo ?? "—", { gapAfter: 6 });

  writePdfLines(doc, y, "Decisao", { bold: true, size: 11, gapAfter: 2 });
  writePdfLines(doc, y, `Solucao: ${labelSolucao(resumo.solucao_sugerida)}`, { gapAfter: 1 });
  writePdfLines(doc, y, `Origem: ${labelOrigem(resumo.origem_principal)}`, { gapAfter: 6 });

  if (resumo.baseline || resumo.meta) {
    writePdfLines(doc, y, "Metricas", { bold: true, size: 11, gapAfter: 2 });
    writePdfLines(doc, y, `Baseline: ${resumo.baseline ?? "—"}`, { gapAfter: 1 });
    writePdfLines(doc, y, `Meta (1a iteracao): ${resumo.meta ?? "—"}`, { gapAfter: 6 });
  }

  if (resumo.proximo_passo) {
    writePdfLines(doc, y, "Proximo passo", { bold: true, size: 11, gapAfter: 2 });
    writePdfLines(doc, y, resumo.proximo_passo, { gapAfter: 6 });
  }

  if (resumo.auditoria_resumo) {
    writePdfLines(doc, y, "Parecer da auditoria", { bold: true, size: 11, gapAfter: 2 });
    writePdfLines(doc, y, resumo.auditoria_resumo, { gapAfter: 6 });
  }

  writePdfLines(doc, y, "Pipeline", { bold: true, size: 11, gapAfter: 2 });
  for (const step of detalhe.pipeline) {
    const mark = step.concluido ? "[x]" : "[ ]";
    writePdfLines(doc, y, `${mark} ${step.modulo.toUpperCase()} — ${step.label}`);
  }

  doc.save(`dlogica-${demandaId}.pdf`);
}
