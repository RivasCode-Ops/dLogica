import { FormEvent, useState } from "react";
import { nowIso, parseListInput, postJson } from "../api/client";
import { FormField } from "../components/FormField";
import { StatusBanner } from "../components/StatusBanner";
import type { ModuloFormProps } from "../components/wizard/types";
import { useDemandaId } from "../context/DemandaContext";

type Accepted = { status: string; modulo: string; demanda_id: string };

export function Modulo3Page({ embedded = false, onSuccess }: ModuloFormProps = {}) {
  const { demandaId } = useDemandaId();
  const [tipoRecomendado, setTipoRecomendado] = useState("painel");
  const [justificativa, setJustificativa] = useState(
    "Consulta recorrente com comparacao de indicadores.",
  );
  const [alternativas, setAlternativas] = useState("documento_estruturado");
  const [responsavel, setResponsavel] = useState("time-dlogica");
  const [score, setScore] = useState("6");
  const [evidencia7d, setEvidencia7d] = useState("Equipe consultou diariamente por uma semana.");
  const [banner, setBanner] = useState<{ kind: "idle" | "loading" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });

  const needsPainelDoc =
    tipoRecomendado === "painel" ||
    tipoRecomendado === "documento_estruturado" ||
    alternativas.includes("painel") ||
    alternativas.includes("documento_estruturado");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBanner({ kind: "loading", message: "Enviando decisao..." });

    const payload: Record<string, unknown> = {
      decisao_id: `DEC-${Date.now()}`,
      demanda_id: demandaId,
      tipo_recomendado: tipoRecomendado,
      justificativa_principal: justificativa,
      alternativas_consideradas: parseListInput(alternativas),
      data_decisao: nowIso(),
      responsavel_decisao: responsavel,
    };

    if (needsPainelDoc) {
      payload.validacao_painel_documento = {
        aplicada: true,
        score_classificacao: Number(score),
        criterio_mais_relevante: "frequencia de consulta",
        decisao_final: tipoRecomendado === "documento_estruturado" ? "documento_estruturado" : "painel",
        justificativa_curta: "Classificacao aplicada pela UI.",
        evidencia_teste_7_dias: evidencia7d || null,
      };
    }

    try {
      const result = await postJson<Accepted>("/api/v1/modulo3/decisoes", payload);
      setBanner({
        kind: "success",
        message: embedded ? "Etapa salva." : `Decisao aceita (${result.modulo}) — ${result.demanda_id}`,
      });
      onSuccess?.();
    } catch (error) {
      setBanner({
        kind: "error",
        message: error instanceof Error ? error.message : "Falha ao enviar decisao",
      });
    }
  }

  const form = (
    <>
      {!embedded ? (
        <>
          <h2>Modulo 3 — Decisao</h2>
          <p className="lead">Tipo de solucao com validacao painel/documento quando aplicavel.</p>
        </>
      ) : null}
      <StatusBanner kind={banner.kind} message={banner.message} />

      <form className="form-grid" onSubmit={onSubmit}>
        {!embedded ? (
          <FormField label="demanda_id">
            <input value={demandaId} readOnly />
          </FormField>
        ) : null}

        <FormField label="tipo_recomendado">
          <select value={tipoRecomendado} onChange={(e) => setTipoRecomendado(e.target.value)}>
            <option value="painel">painel</option>
            <option value="documento_estruturado">documento_estruturado</option>
            <option value="app">app</option>
            <option value="automacao">automacao</option>
            <option value="agente">agente</option>
            <option value="fluxo_manual">fluxo_manual</option>
            <option value="backlog">backlog</option>
            <option value="descarte">descarte</option>
          </select>
        </FormField>

        <FormField label="justificativa_principal">
          <textarea value={justificativa} onChange={(e) => setJustificativa(e.target.value)} />
        </FormField>

        <FormField label="alternativas_consideradas" hint="Separadas por virgula">
          <input value={alternativas} onChange={(e) => setAlternativas(e.target.value)} />
        </FormField>

        <FormField label="responsavel_decisao">
          <input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
        </FormField>

        {needsPainelDoc ? (
          <>
            <p className="section-title">Validacao painel / documento</p>
            <FormField label="score_classificacao (0-10)">
              <input value={score} onChange={(e) => setScore(e.target.value)} />
            </FormField>
            <FormField label="evidencia_teste_7_dias" hint="Obrigatoria para score 5-7">
              <textarea value={evidencia7d} onChange={(e) => setEvidencia7d(e.target.value)} />
            </FormField>
          </>
        ) : null}

        <button type="submit" disabled={banner.kind === "loading"}>
          {embedded ? "Salvar e continuar" : "Registrar decisao"}
        </button>
      </form>
    </>
  );

  return embedded ? <div className="wizard-step-inner">{form}</div> : <section className="page-card">{form}</section>;
}
