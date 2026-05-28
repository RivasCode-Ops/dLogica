from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


TipoSolucao = Literal[
    "app",
    "automacao",
    "agente",
    "painel",
    "documento_estruturado",
    "fluxo_manual",
    "backlog",
    "descarte",
]


class DemandaIn(BaseModel):
    demanda_id: str = Field(min_length=5)
    data_registro: datetime
    origem_principal: Literal["usuario", "IA", "referencia_externa", "regra_interna"]
    demanda_bruta: str = Field(min_length=10)
    status: Literal["capturado", "classificado", "avaliado", "aprovado", "backlog", "descartado"]


class TriagemItemIn(BaseModel):
    triagem_item_id: str
    demanda_id: str
    texto_item: str = Field(min_length=3)
    classe_item: Literal["fato", "hipotese", "sugestao", "contexto", "ruido"]
    status_pertinencia: Literal["manter", "revisar", "backlog", "descartar"]
    justificativa_curta: str = Field(min_length=5)
    data_classificacao: datetime


class TriagemIn(BaseModel):
    demanda_id: str
    triagem_itens: list[TriagemItemIn] = Field(min_length=1)


class ValidacaoPainelDocumentoIn(BaseModel):
    aplicada: bool
    score_classificacao: int = Field(ge=0, le=10)
    criterio_mais_relevante: str
    decisao_final: Literal["painel", "documento_estruturado"]
    justificativa_curta: str = Field(min_length=5)
    evidencia_teste_7_dias: str | None = None


class GatePromocaoAppIn(BaseModel):
    score_total: int = Field(ge=0, le=16)
    decisao_promocao: Literal["sim", "nao", "validar_mais"]
    justificativa_promocao: str


class DecisaoIn(BaseModel):
    decisao_id: str
    demanda_id: str
    tipo_recomendado: TipoSolucao
    justificativa_principal: str = Field(min_length=10)
    alternativas_consideradas: list[str] = Field(min_length=1)
    data_decisao: datetime
    responsavel_decisao: str
    validacao_painel_documento: ValidacaoPainelDocumentoIn | None = None
    gate_promocao_app: GatePromocaoAppIn | None = None


class DescarteRelevanteIn(BaseModel):
    item: str
    justificativa_curta: str = Field(min_length=5)


class BriefingIn(BaseModel):
    briefing_id: str
    demanda_id: str
    problema: str = Field(min_length=10)
    objetivo: str = Field(min_length=8)
    criterios_de_decisao: list[str] = Field(min_length=3)
    solucao_sugerida: TipoSolucao
    proximo_passo: str = Field(min_length=8)
    metrica_tempo: str
    metrica_impacto: str
    metrica_risco: str
    baseline_numerico_inicial: str | float
    meta_numerica_primeira_iteracao: str | float
    fora_de_escopo: list[str] = Field(min_length=1)
    descartes_relevantes: list[DescarteRelevanteIn] = Field(min_length=2)
    data_geracao: datetime
    responsavel_geracao: str


class GatesCriticosIn(BaseModel):
    aderencia_problema_objetivo: Literal["ok", "falhou"]
    escopo_limites: Literal["ok", "falhou"]
    rastreabilidade_decisao: Literal["ok", "falhou"]
    qualidade_minima_verificavel: Literal["ok", "falhou"]


class GatesImportantesIn(BaseModel):
    coerencia_tipo_solucao: Literal["ok", "falhou"]
    proximo_passo_executavel: Literal["ok", "falhou"]
    clareza_entrega: Literal["ok", "falhou"]
    descartes_rastreaveis: Literal["ok", "falhou"]


class AuditoriaIn(BaseModel):
    auditoria_id: str
    demanda_id: str
    briefing_id: str
    escopo_referencia: str
    gates_criticos: GatesCriticosIn
    gates_importantes: GatesImportantesIn
    veredito: Literal["aprovado", "aprovado_com_ressalvas", "corrigir", "reprovado"]
    gates_criticos_falhos: list[str]
    gates_importantes_falhos: list[str]
    resumo_objetivo: str = Field(min_length=15)
    acoes_obrigatorias_antes_do_aceite: list[str]
    data_auditoria: datetime
    responsavel_auditoria: str


class AcceptedOut(BaseModel):
    status: Literal["accepted"]
    modulo: Literal["m1", "m2", "m3", "m4", "m5"]
    demanda_id: str


class ModuloPipelineStatus(BaseModel):
    modulo: Literal["m1", "m2", "m3", "m4", "m5"]
    concluido: bool
    label: str


class DemandaListItem(BaseModel):
    demanda_id: str
    status_demanda: str | None = None
    origem_principal: str | None = None
    resumo: str | None = None
    etapas_concluidas: int
    etapas_total: int = 5
    veredito: str | None = None
    tipo_solucao: str | None = None
    proxima_etapa: str | None = None
    proxima_etapa_label: str


class DemandaListOut(BaseModel):
    total: int
    itens: list[DemandaListItem]


class DemandaResumoOut(BaseModel):
    problema: str | None = None
    objetivo: str | None = None
    solucao_sugerida: str | None = None
    proximo_passo: str | None = None
    veredito: str | None = None
    baseline: str | float | None = None
    meta: str | float | None = None
    demanda_bruta: str | None = None
    origem_principal: str | None = None
    auditoria_resumo: str | None = None


class DemandaDetalheOut(BaseModel):
    demanda_id: str
    pipeline: list[ModuloPipelineStatus]
    etapas_concluidas: int
    etapas_total: int = 5
    proxima_etapa: str | None = None
    proxima_etapa_label: str
    briefing_id: str | None = None
    demanda: DemandaIn | None = None
    triagem: TriagemIn | None = None
    decisao: DecisaoIn | None = None
    briefing: BriefingIn | None = None
    auditoria: AuditoriaIn | None = None
    resumo: DemandaResumoOut
