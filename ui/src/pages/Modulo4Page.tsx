import { FormEvent, useEffect, useState } from "react";
import { nowIso, parseListInput, postJson } from "../api/client";
import { FormField } from "../components/FormField";
import { StatusBanner } from "../components/StatusBanner";
import type { ModuloFormProps } from "../components/wizard/types";
import { useDemandaId } from "../context/DemandaContext";

type Accepted = { status: string; modulo: string; demanda_id: string };

export function Modulo4Page({
  embedded = false,
  onSuccess,
  initialBriefingId,
  initialSolucao,
}: ModuloFormProps = {}) {
  const { demandaId } = useDemandaId();
  const [briefingId, setBriefingId] = useState(initialBriefingId ?? "BRF-UI-01");
  const [problema, setProblema] = useState("Ha retrabalho por falta de visao de prioridades.");
  const [objetivo, setObjetivo] = useState("Padronizar decisao semanal.");
  const [solucao, setSolucao] = useState(initialSolucao ?? "painel");

  useEffect(() => {
    if (initialBriefingId) {
      setBriefingId(initialBriefingId);
    }
  }, [initialBriefingId]);

  useEffect(() => {
    if (initialSolucao) {
      setSolucao(initialSolucao);
    }
  }, [initialSolucao]);
  const [proximoPasso, setProximoPasso] = useState("Subir painel minimo para operacao.");
  const [criterios, setCriterios] = useState("tempo, impacto, risco");
  const [baseline, setBaseline] = useState("9 tarefas sem dono");
  const [meta, setMeta] = useState("<=2 tarefas sem dono");
  const [foraEscopo, setForaEscopo] = useState("App completo na fase inicial");
  const [descarte1, setDescarte1] = useState("Relatorio mensal");
  const [descarte1Just, setDescarte1Just] = useState("Ritmo insuficiente");
  const [descarte2, setDescarte2] = useState("Automacao total");
  const [descarte2Just, setDescarte2Just] = useState("Escopo alto");
  const [responsavel, setResponsavel] = useState("time-dlogica");
  const [banner, setBanner] = useState<{ kind: "idle" | "loading" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBanner({ kind: "loading", message: "Enviando briefing..." });

    try {
      const result = await postJson<Accepted>("/api/v1/modulo4/briefings", {
        briefing_id: briefingId,
        demanda_id: demandaId,
        problema,
        objetivo,
        criterios_de_decisao: parseListInput(criterios),
        solucao_sugerida: solucao,
        proximo_passo: proximoPasso,
        metrica_tempo: "Reduzir reuniao de 80 para 40 minutos.",
        metrica_impacto: "Aumentar cumprimento para 85%.",
        metrica_risco: "Reduzir tarefas sem dono para <=2.",
        baseline_numerico_inicial: baseline,
        meta_numerica_primeira_iteracao: meta,
        fora_de_escopo: parseListInput(foraEscopo),
        descartes_relevantes: [
          { item: descarte1, justificativa_curta: descarte1Just },
          { item: descarte2, justificativa_curta: descarte2Just },
        ],
        data_geracao: nowIso(),
        responsavel_geracao: responsavel,
      });
      setBanner({
        kind: "success",
        message: embedded ? "Etapa salva." : `Briefing aceito (${result.modulo}) — ${result.demanda_id}`,
      });
      onSuccess?.();
    } catch (error) {
      setBanner({
        kind: "error",
        message: error instanceof Error ? error.message : "Falha ao enviar briefing",
      });
    }
  }

  const form = (
    <>
      {!embedded ? (
        <>
          <h2>Modulo 4 — Briefing final</h2>
          <p className="lead">
            Campos obrigatorios do metodo: baseline, meta, descartes e proximo passo executavel.
          </p>
        </>
      ) : null}
      <StatusBanner kind={banner.kind} message={banner.message} />

      <form className="form-grid" onSubmit={onSubmit}>
        {!embedded ? (
          <FormField label="demanda_id">
            <input value={demandaId} readOnly />
          </FormField>
        ) : null}

        <FormField label="briefing_id">
          <input value={briefingId} onChange={(e) => setBriefingId(e.target.value)} />
        </FormField>

        <FormField label="problema">
          <textarea value={problema} onChange={(e) => setProblema(e.target.value)} />
        </FormField>

        <FormField label="objetivo">
          <textarea value={objetivo} onChange={(e) => setObjetivo(e.target.value)} />
        </FormField>

        <FormField label="criterios_de_decisao">
          <input value={criterios} onChange={(e) => setCriterios(e.target.value)} />
        </FormField>

        <FormField label="solucao_sugerida" hint="Deve coincidir com M3">
          <select value={solucao} onChange={(e) => setSolucao(e.target.value)}>
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

        <FormField label="proximo_passo">
          <textarea value={proximoPasso} onChange={(e) => setProximoPasso(e.target.value)} />
        </FormField>

        <FormField label="baseline_numerico_inicial">
          <input value={baseline} onChange={(e) => setBaseline(e.target.value)} />
        </FormField>

        <FormField label="meta_numerica_primeira_iteracao">
          <input value={meta} onChange={(e) => setMeta(e.target.value)} />
        </FormField>

        <FormField label="fora_de_escopo">
          <input value={foraEscopo} onChange={(e) => setForaEscopo(e.target.value)} />
        </FormField>

        <p className="section-title">Descartes relevantes (minimo 2)</p>
        <FormField label="descarte 1">
          <input value={descarte1} onChange={(e) => setDescarte1(e.target.value)} />
        </FormField>
        <FormField label="justificativa descarte 1">
          <input value={descarte1Just} onChange={(e) => setDescarte1Just(e.target.value)} />
        </FormField>
        <FormField label="descarte 2">
          <input value={descarte2} onChange={(e) => setDescarte2(e.target.value)} />
        </FormField>
        <FormField label="justificativa descarte 2">
          <input value={descarte2Just} onChange={(e) => setDescarte2Just(e.target.value)} />
        </FormField>

        <FormField label="responsavel_geracao">
          <input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
        </FormField>

        <button type="submit" disabled={banner.kind === "loading"}>
          {embedded ? "Salvar e continuar" : "Registrar briefing"}
        </button>
      </form>
    </>
  );

  return embedded ? <div className="wizard-step-inner">{form}</div> : <section className="page-card">{form}</section>;
}
