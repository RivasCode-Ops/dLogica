import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJson } from "../api/client";
import { DiagnosticoCard } from "../components/DiagnosticoCard";
import { ContextPanel } from "../components/wizard/ContextPanel";
import { WizardStepper, moduloFromIndex } from "../components/wizard/WizardStepper";
import { stepIndexFromModulo, WIZARD_STEPS } from "../components/wizard/types";
import { useDemandaId } from "../context/DemandaContext";
import type { DemandaDetalhe } from "../types/demanda";
import { Modulo1Page } from "./Modulo1Page";
import { Modulo2Page } from "./Modulo2Page";
import { Modulo3Page } from "./Modulo3Page";
import { Modulo4Page } from "./Modulo4Page";
import { Modulo5Page } from "./Modulo5Page";

export function SessaoWizardPage() {
  const { demandaId: paramId } = useParams<{ demandaId: string }>();
  const { demandaId, setDemandaId } = useDemandaId();
  const navigate = useNavigate();
  const activeDemandaId = paramId ?? demandaId;

  const [activeIndex, setActiveIndex] = useState(0);
  const [detalhe, setDetalhe] = useState<DemandaDetalhe | null>(null);
  const [loading, setLoading] = useState(false);
  const syncedStepRef = useRef(false);

  const refreshDetalhe = useCallback(async () => {
    if (!activeDemandaId || activeDemandaId.length < 5) {
      setDetalhe(null);
      return;
    }
    setLoading(true);
    try {
      const data = await getJson<DemandaDetalhe>(
        `/api/v1/demandas/${encodeURIComponent(activeDemandaId)}`,
      );
      setDetalhe(data);
    } catch {
      setDetalhe(null);
    } finally {
      setLoading(false);
    }
  }, [activeDemandaId]);

  useEffect(() => {
    if (!detalhe || syncedStepRef.current) {
      return;
    }
    syncedStepRef.current = true;
    if (detalhe.proxima_etapa) {
      setActiveIndex(stepIndexFromModulo(detalhe.proxima_etapa));
    } else if (detalhe.etapas_concluidas >= 5) {
      setActiveIndex(4);
    }
  }, [detalhe]);

  useEffect(() => {
    if (paramId) {
      setDemandaId(paramId);
    }
  }, [paramId, setDemandaId]);

  useEffect(() => {
    void refreshDetalhe();
  }, [refreshDetalhe]);

  async function handleStepSuccess() {
    await refreshDetalhe();
    setActiveIndex((prev) => Math.min(prev + 1, WIZARD_STEPS.length - 1));
  }

  function handleProximaEtapa() {
    const proximoIndice = activeIndex + 1;
    if (proximoIndice > completedThrough) {
      const avancar = window.confirm(
        "Esta etapa ainda não foi salva na API. Deseja avançar mesmo assim? Os dados do formulário podem ser perdidos.",
      );
      if (!avancar) {
        return;
      }
    }
    setActiveIndex(proximoIndice);
  }

  const completedThrough = detalhe?.etapas_concluidas ?? 0;
  const step = WIZARD_STEPS[activeIndex];
  const allDone = detalhe !== null && detalhe.proxima_etapa === null && detalhe.etapas_concluidas >= 5;

  const stepForm = (() => {
    const props = { embedded: true, onSuccess: handleStepSuccess };
    switch (moduloFromIndex(activeIndex)) {
      case "m1":
        return <Modulo1Page {...props} />;
      case "m2":
        return <Modulo2Page {...props} />;
      case "m3":
        return <Modulo3Page {...props} />;
      case "m4":
        return (
          <Modulo4Page
            {...props}
            initialSolucao={detalhe?.resumo.solucao_sugerida ?? undefined}
            initialBriefingId={detalhe?.briefing_id ?? undefined}
          />
        );
      case "m5":
        return (
          <Modulo5Page
            {...props}
            initialBriefingId={detalhe?.briefing_id ?? undefined}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <div className="wizard-shell">
      <header className="wizard-header">
        <div>
          <p className="eyebrow">dLogica — Sessão guiada</p>
          <h1>{step.title}</h1>
          <p className="lead">{step.subtitle}</p>
        </div>
        <div className="wizard-header-actions">
          <Link to="/" className="btn-secondary">
            Casos
          </Link>
          {allDone && detalhe ? (
            <Link
              to={`/casos/${encodeURIComponent(activeDemandaId)}`}
              className="btn-primary-link"
            >
              Ficha completa
            </Link>
          ) : null}
        </div>
      </header>

      <WizardStepper
        activeIndex={activeIndex}
        completedThrough={completedThrough}
        onSelect={setActiveIndex}
      />

      <div className="wizard-body">
        <main className="wizard-main">
          {allDone && detalhe ? (
            <DiagnosticoCard demandaId={activeDemandaId} detalhe={detalhe} />
          ) : (
            <div className="wizard-step-card">{stepForm}</div>
          )}
        </main>
        <ContextPanel demandaId={activeDemandaId} detalhe={detalhe} loading={loading} />
      </div>

      <footer className="wizard-footer">
        <button
          type="button"
          className="btn-secondary"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex((i) => i - 1)}
        >
          Etapa anterior
        </button>
        <button
          type="button"
          className="btn-secondary"
          disabled={activeIndex >= WIZARD_STEPS.length - 1}
          onClick={handleProximaEtapa}
        >
          Próxima etapa
        </button>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => navigate(`/sessao/${encodeURIComponent(activeDemandaId)}`)}
        >
          Recarregar sessão
        </button>
      </footer>
    </div>
  );
}
