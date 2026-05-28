import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJson } from "../api/client";
import { DiagnosticoCard } from "../components/DiagnosticoCard";
import { StatusBanner } from "../components/StatusBanner";
import { useDemandaId } from "../context/DemandaContext";
import type { DemandaDetalhe } from "../types/demanda";

const MODULO_ROUTES: Record<string, string> = {
  m1: "/modulo1",
  m2: "/modulo2",
  m3: "/modulo3",
  m4: "/modulo4",
  m5: "/modulo5",
};

export function CasoDetalhePage() {
  const { demandaId: paramId } = useParams<{ demandaId: string }>();
  const { setDemandaId } = useDemandaId();
  const navigate = useNavigate();
  const [detalhe, setDetalhe] = useState<DemandaDetalhe | null>(null);
  const [banner, setBanner] = useState<{ kind: "idle" | "loading" | "error"; message: string }>({
    kind: "idle",
    message: "",
  });

  useEffect(() => {
    if (!paramId) {
      return;
    }
    setDemandaId(paramId);
    setBanner({ kind: "loading", message: "Carregando caso..." });

    getJson<DemandaDetalhe>(`/api/v1/demandas/${encodeURIComponent(paramId)}`)
      .then((data) => {
        setDetalhe(data);
        setBanner({ kind: "idle", message: "" });
      })
      .catch((error) => {
        setDetalhe(null);
        setBanner({
          kind: "error",
          message: error instanceof Error ? error.message : "Falha ao carregar caso",
        });
      });
  }, [paramId, setDemandaId]);

  if (!paramId) {
    return (
      <section className="page-card">
        <p>Caso invalido.</p>
        <Link to="/">Voltar aos casos</Link>
      </section>
    );
  }

  return (
    <div className="caso-detalhe-layout caso-detalhe-standalone">
      <div className="caso-top-bar">
        <p className="eyebrow">dLogica — Diagnostico</p>
        <Link to="/" className="btn-secondary">
          Todos os casos
        </Link>
      </div>
      <div className="page-toolbar">
        <button type="button" className="btn-secondary" onClick={() => navigate("/")}>
          Voltar aos casos
        </button>
        {detalhe?.proxima_etapa ? (
          <Link className="btn-primary-link" to={`/sessao/${encodeURIComponent(paramId)}`}>
            Continuar: {detalhe.proxima_etapa_label}
          </Link>
        ) : (
          <Link className="btn-primary-link" to={`/sessao/${encodeURIComponent(paramId)}`}>
            Revisar sessao
          </Link>
        )}
      </div>

      <StatusBanner kind={banner.kind === "loading" ? "loading" : banner.kind} message={banner.message} />

      {detalhe ? (
        <>
          <DiagnosticoCard demandaId={paramId} detalhe={detalhe} />

          <details className="caso-detalhe-tecnico">
            <summary>Detalhes tecnicos do pipeline</summary>

            <div className="progress-block">
              <div className="progress-meta">
                <span>
                  Progresso: {detalhe.etapas_concluidas}/{detalhe.etapas_total}
                </span>
                <span className="progress-next">{detalhe.proxima_etapa_label}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(detalhe.etapas_concluidas / detalhe.etapas_total) * 100}%` }}
                />
              </div>
            </div>

            <div className="pipeline-grid">
              {detalhe.pipeline.map((step) => (
                <div
                  key={step.modulo}
                  className={step.concluido ? "pipeline-step done" : "pipeline-step pending"}
                >
                  <span className="pipeline-modulo">{step.modulo.toUpperCase()}</span>
                  <span>{step.label}</span>
                  <Link to={MODULO_ROUTES[step.modulo]}>Modo avancado</Link>
                </div>
              ))}
            </div>
          </details>
        </>
      ) : null}
    </div>
  );
}
