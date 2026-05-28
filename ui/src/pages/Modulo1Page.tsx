import { FormEvent, useState } from "react";
import { nowIso, postJson } from "../api/client";
import { DemandaIdReadonly } from "../components/DemandaIdReadonly";
import { FormField } from "../components/FormField";
import { StatusBanner } from "../components/StatusBanner";
import type { ModuloFormProps } from "../components/wizard/types";
import { useDemandaId } from "../context/DemandaContext";

type Accepted = { status: string; modulo: string; demanda_id: string };

export function Modulo1Page({ embedded = false, onSuccess }: ModuloFormProps = {}) {
  const { demandaId } = useDemandaId();
  const [origem, setOrigem] = useState("usuario");
  const [demandaBruta, setDemandaBruta] = useState(
    "Preciso melhorar a priorizacao semanal com rastreabilidade.",
  );
  const [status, setStatus] = useState("capturado");
  const [banner, setBanner] = useState<{ kind: "idle" | "loading" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBanner({ kind: "loading", message: "Enviando demanda..." });

    try {
      const result = await postJson<Accepted>("/api/v1/modulo1/demandas", {
        demanda_id: demandaId,
        data_registro: nowIso(),
        origem_principal: origem,
        demanda_bruta: demandaBruta,
        status,
      });
      setBanner({
        kind: "success",
        message: embedded ? "Etapa salva." : `Demanda aceita (${result.modulo}) — ${result.demanda_id}`,
      });
      onSuccess?.();
    } catch (error) {
      setBanner({
        kind: "error",
        message: error instanceof Error ? error.message : "Falha ao enviar demanda",
      });
    }
  }

  const form = (
    <>
      {!embedded ? (
        <>
          <h2>Modulo 1 — Demanda</h2>
          <p className="lead">Captura inicial com contrato minimo e status de entrada.</p>
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

        <FormField label="origem_principal">
          <select value={origem} onChange={(e) => setOrigem(e.target.value)}>
            <option value="usuario">usuario</option>
            <option value="IA">IA</option>
            <option value="referencia_externa">referencia_externa</option>
            <option value="regra_interna">regra_interna</option>
          </select>
        </FormField>

        <FormField label="demanda_bruta" hint="Minimo 10 caracteres">
          <textarea value={demandaBruta} onChange={(e) => setDemandaBruta(e.target.value)} />
        </FormField>

        <FormField label="status">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="capturado">capturado</option>
            <option value="classificado">classificado</option>
            <option value="avaliado">avaliado</option>
            <option value="aprovado">aprovado</option>
            <option value="backlog">backlog</option>
            <option value="descartado">descartado</option>
          </select>
        </FormField>

        <button type="submit" disabled={banner.kind === "loading"}>
          {embedded ? "Salvar e continuar" : "Registrar demanda"}
        </button>
      </form>
    </>
  );

  return embedded ? <div className="wizard-step-inner">{form}</div> : <section className="page-card">{form}</section>;
}
