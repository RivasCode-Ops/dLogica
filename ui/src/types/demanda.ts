export type DemandaListItem = {
  demanda_id: string;
  status_demanda: string | null;
  origem_principal: string | null;
  resumo: string | null;
  etapas_concluidas: number;
  etapas_total: number;
  veredito: string | null;
  tipo_solucao: string | null;
  proxima_etapa: string | null;
  proxima_etapa_label: string;
};

export type DemandaListOut = {
  total: number;
  itens: DemandaListItem[];
};

export type ModuloPipelineStatus = {
  modulo: "m1" | "m2" | "m3" | "m4" | "m5";
  concluido: boolean;
  label: string;
};

export type DemandaResumo = {
  problema: string | null;
  objetivo: string | null;
  solucao_sugerida: string | null;
  proximo_passo: string | null;
  veredito: string | null;
  baseline: string | number | null;
  meta: string | number | null;
  demanda_bruta: string | null;
  origem_principal: string | null;
  auditoria_resumo: string | null;
};

export type DemandaDetalhe = {
  demanda_id: string;
  pipeline: ModuloPipelineStatus[];
  etapas_concluidas: number;
  etapas_total: number;
  proxima_etapa: string | null;
  proxima_etapa_label: string;
  briefing_id: string | null;
  resumo: DemandaResumo;
};
