export type ModuloFormProps = {
  embedded?: boolean;
  onSuccess?: () => void;
  initialBriefingId?: string | null;
  initialSolucao?: string | null;
};

export const WIZARD_STEPS = [
  { id: "m1", title: "O que chegou?", subtitle: "Captura da demanda" },
  { id: "m2", title: "Separar sinais", subtitle: "Triagem e classificacao" },
  { id: "m3", title: "Tipo de solucao", subtitle: "Decisao recomendada" },
  { id: "m4", title: "Plano e metricas", subtitle: "Briefing final" },
  { id: "m5", title: "Gate de aceite", subtitle: "Auditoria e veredito" },
] as const;

export type WizardStepId = (typeof WIZARD_STEPS)[number]["id"];

export function stepIndexFromModulo(modulo: string | null | undefined): number {
  const idx = WIZARD_STEPS.findIndex((s) => s.id === modulo);
  return idx >= 0 ? idx : 0;
}
