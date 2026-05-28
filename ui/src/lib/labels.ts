export const VEREDITO_LABELS: Record<string, string> = {
  aprovado: "Aprovado",
  aprovado_com_ressalvas: "Aprovado com ressalvas",
  corrigir: "Corrigir antes do aceite",
  reprovado: "Reprovado",
};

export const SOLUCAO_LABELS: Record<string, string> = {
  app: "Aplicativo",
  automacao: "Automacao",
  agente: "Agente",
  painel: "Painel de indicadores",
  documento_estruturado: "Documento estruturado",
  fluxo_manual: "Fluxo manual",
  backlog: "Backlog",
  descarte: "Descarte",
};

export const ORIGEM_LABELS: Record<string, string> = {
  usuario: "Usuario",
  IA: "IA",
  referencia_externa: "Referencia externa",
  regra_interna: "Regra interna",
};

export function labelVeredito(value: string | null | undefined): string {
  if (!value) {
    return "Pendente";
  }
  return VEREDITO_LABELS[value] ?? value;
}

export function labelSolucao(value: string | null | undefined): string {
  if (!value) {
    return "A definir";
  }
  return SOLUCAO_LABELS[value] ?? value;
}

export function labelOrigem(value: string | null | undefined): string {
  if (!value) {
    return "—";
  }
  return ORIGEM_LABELS[value] ?? value;
}
