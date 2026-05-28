import { FormEvent, useState } from "react";
import { nowIso, postJson } from "../api/client";
import { DemandaIdReadonly } from "../components/DemandaIdReadonly";
import { FormField } from "../components/FormField";
import { StatusBanner } from "../components/StatusBanner";
import type { ModuloFormProps } from "../components/wizard/types";
import { useDemandaId } from "../context/DemandaContext";

type Accepted = { status: string; modulo: string; demanda_id: string };

export function Modulo2Page({ embedded = false, onSuccess }: ModuloFormProps = {}) {
  const { demandaId } = useDemandaId();
  const [textoItem, setTextoItem] = useState("Ha tarefas criticas sem dono.");
  const [classeItem, setClasseItem] = useState("fato");
  const [statusPertinencia, setStatusPertinencia] = useState("manter");
  const [justificativa, setJustificativa] = useState("Afeta diretamente a operacao.");
  const [banner, setBanner] = useState<{ kind: "idle" | "loading" | "success" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBanner({ kind: "loading", message: "Enviando triagem..." });

    try {
      const result = await postJson<Accepted>("/api/v1/modulo2/triagens", {
        demanda_id: demandaId,
        triagem_itens: [
          {
            triagem_item_id: `TRI-${Date.now()}`,
            demanda_id: demandaId,
            texto_item: textoItem,
            classe_item: classeItem,
            status_pertinencia: statusPertinencia,
            justificativa_curta: justificativa,
            data_classificacao: nowIso(),
          },
        ],
      });
      setBanner({
        kind: "success",
        message: embedded ? "Etapa salva." : `Triagem aceita (${result.modulo}) — ${result.demanda_id}`,
      });
      onSuccess?.();
    } catch (error) {
      setBanner({
        kind: "error",
        message: error instanceof Error ? error.message : "Falha ao enviar triagem",
      });
    }
  }

  const form = (
    <>
      {!embedded ? (
        <>
          <h2>Modulo 2 — Triagem</h2>
          <p className="lead">Classificacao de itens com justificativa curta obrigatoria.</p>
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

        <FormField label="texto_item">
          <textarea value={textoItem} onChange={(e) => setTextoItem(e.target.value)} />
        </FormField>

        <FormField label="classe_item">
          <select value={classeItem} onChange={(e) => setClasseItem(e.target.value)}>
            <option value="fato">fato</option>
            <option value="hipotese">hipotese</option>
            <option value="sugestao">sugestao</option>
            <option value="contexto">contexto</option>
            <option value="ruido">ruido</option>
          </select>
        </FormField>

        <FormField label="status_pertinencia">
          <select value={statusPertinencia} onChange={(e) => setStatusPertinencia(e.target.value)}>
            <option value="manter">manter</option>
            <option value="revisar">revisar</option>
            <option value="backlog">backlog</option>
            <option value="descartar">descartar</option>
          </select>
        </FormField>

        <FormField label="justificativa_curta">
          <input value={justificativa} onChange={(e) => setJustificativa(e.target.value)} />
        </FormField>

        <button type="submit" disabled={banner.kind === "loading"}>
          {embedded ? "Salvar e continuar" : "Registrar triagem"}
        </button>
      </form>
    </>
  );

  return embedded ? <div className="wizard-step-inner">{form}</div> : <section className="page-card">{form}</section>;
}
