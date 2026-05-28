import { FormEvent, useEffect, useState } from "react";
import { nowIso, postJson } from "../api/client";
import { DemandaIdReadonly } from "../components/DemandaIdReadonly";
import { FormField } from "../components/FormField";
import { StatusBanner } from "../components/StatusBanner";
import type { ModuloFormProps } from "../components/wizard/types";
import { useDemandaId } from "../context/DemandaContext";

type Accepted = { status: string; modulo: string; demanda_id: string };

type GateValue = "ok" | "falhou";

export function Modulo5Page({ embedded = false, onSuccess, initialBriefingId }: ModuloFormProps = {}) {
  const { demandaId } = useDemandaId();
  const [briefingId, setBriefingId] = useState(initialBriefingId ?? "BRF-UI-01");

  useEffect(() => {
    if (initialBriefingId) {
      setBriefingId(initialBriefingId);
    }
  }, [initialBriefingId]);
  const [escopo, setEscopo] = useState("Entrega da UI minima da Fase 3");
  const [veredito, setVeredito] = useState("aprovado");
  const [resumo, setResumo] = useState("Fluxo visual validado com consistencia entre modulos.");
  const [responsavel, setResponsavel] = useState("time-dlogica");

  const [gatesCriticos, setGatesCriticos] = useState<Record<string, GateValue>>({
    aderencia_problema_objetivo: "ok",
    escopo_limites: "ok",
    rastreabilidade_decisao: "ok",
    qualidade_minima_verificavel: "ok",
  });

  const [gatesImportantes, setGatesImportantes] = useState<Record<string, GateValue>>({
    coerencia_tipo_solucao: "ok",
    proximo_passo_executavel: "ok",
    clareza_entrega: "ok",
    descartes_rastreaveis: "ok",
  });

  const [banner, setBanner] = useState<{ kind: "idle" | "loading" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });

  function updateGate(
    group: "criticos" | "importantes",
    key: string,
    value: GateValue,
  ) {
    if (group === "criticos") {
      setGatesCriticos((prev) => ({ ...prev, [key]: value }));
      return;
    }
    setGatesImportantes((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBanner({ kind: "loading", message: "Enviando auditoria..." });

    const gatesCriticosFalhos = Object.entries(gatesCriticos)
      .filter(([, value]) => value === "falhou")
      .map(([key]) => key);
    const gatesImportantesFalhos = Object.entries(gatesImportantes)
      .filter(([, value]) => value === "falhou")
      .map(([key]) => key);

    try {
      const result = await postJson<Accepted>("/api/v1/modulo5/auditorias", {
        auditoria_id: `AUD-${Date.now()}`,
        demanda_id: demandaId,
        briefing_id: briefingId,
        escopo_referencia: escopo,
        gates_criticos: gatesCriticos,
        gates_importantes: gatesImportantes,
        veredito,
        gates_criticos_falhos: gatesCriticosFalhos,
        gates_importantes_falhos: gatesImportantesFalhos,
        resumo_objetivo: resumo,
        acoes_obrigatorias_antes_do_aceite: [],
        data_auditoria: nowIso(),
        responsavel_auditoria: responsavel,
      });
      setBanner({
        kind: "success",
        message: embedded
          ? "Etapa salva. Fluxo concluido."
          : `Auditoria aceita (${result.modulo}) — veredito registrado para ${result.demanda_id}`,
      });
      onSuccess?.();
    } catch (error) {
      setBanner({
        kind: "error",
        message: error instanceof Error ? error.message : "Falha ao enviar auditoria",
      });
    }
  }

  const form = (
    <>
      {!embedded ? (
        <>
          <h2>Modulo 5 — Auditoria</h2>
          <p className="lead">Gate de aceite com veredito e listas de gates falhos coerentes.</p>
        </>
      ) : null}
      <StatusBanner kind={banner.kind} message={banner.message} />
      <DemandaIdReadonly demandaId={demandaId} embedded={embedded} />

      <form className="form-grid" onSubmit={onSubmit}>
        {!embedded ? (
          <FormField label="ID do caso (somente leitura)">
            <input value={demandaId} readOnly aria-readonly />
          </FormField>
        ) : null}

        <FormField label="briefing_id" hint="Deve existir no M4">
          <input value={briefingId} onChange={(e) => setBriefingId(e.target.value)} />
        </FormField>

        <FormField label="escopo_referencia">
          <input value={escopo} onChange={(e) => setEscopo(e.target.value)} />
        </FormField>

        <p className="section-title">Gates criticos</p>
        {Object.keys(gatesCriticos).map((key) => (
          <FormField key={key} label={key}>
            <select
              value={gatesCriticos[key]}
              onChange={(e) => updateGate("criticos", key, e.target.value as GateValue)}
            >
              <option value="ok">ok</option>
              <option value="falhou">falhou</option>
            </select>
          </FormField>
        ))}

        <p className="section-title">Gates importantes</p>
        {Object.keys(gatesImportantes).map((key) => (
          <FormField key={key} label={key}>
            <select
              value={gatesImportantes[key]}
              onChange={(e) => updateGate("importantes", key, e.target.value as GateValue)}
            >
              <option value="ok">ok</option>
              <option value="falhou">falhou</option>
            </select>
          </FormField>
        ))}

        <FormField label="veredito">
          <select value={veredito} onChange={(e) => setVeredito(e.target.value)}>
            <option value="aprovado">aprovado</option>
            <option value="aprovado_com_ressalvas">aprovado_com_ressalvas</option>
            <option value="corrigir">corrigir</option>
            <option value="reprovado">reprovado</option>
          </select>
        </FormField>

        <FormField label="resumo_objetivo">
          <textarea value={resumo} onChange={(e) => setResumo(e.target.value)} />
        </FormField>

        <FormField label="responsavel_auditoria">
          <input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />
        </FormField>

        <button type="submit" disabled={banner.kind === "loading"}>
          {embedded ? "Finalizar sessao" : "Registrar auditoria"}
        </button>
      </form>
    </>
  );

  return embedded ? <div className="wizard-step-inner">{form}</div> : <section className="page-card">{form}</section>;
}
