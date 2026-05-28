import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHealth, getJson } from "../api/client";
import { StatusBanner } from "../components/StatusBanner";
import { useDemandaId } from "../context/DemandaContext";
import { labelVeredito } from "../lib/labels";
import type { DemandaListOut } from "../types/demanda";

export function HomePage() {
  const { demandaId } = useDemandaId();
  const [apiStatus, setApiStatus] = useState<"checking" | "ok" | "error">("checking");
  const [casos, setCasos] = useState<DemandaListOut | null>(null);
  const [banner, setBanner] = useState<{ kind: "idle" | "loading" | "error"; message: string }>({
    kind: "loading",
    message: "",
  });

  function carregarCasos() {
    setBanner({ kind: "loading", message: "Carregando casos..." });
    getJson<DemandaListOut>("/api/v1/demandas")
      .then((data) => {
        setCasos(data);
        setBanner({ kind: "idle", message: "" });
      })
      .catch((error) => {
        setCasos(null);
        const msg =
          error instanceof Error
            ? error.message
            : "Nao foi possivel carregar os casos. Verifique se a API esta ativa.";
        setBanner({ kind: "error", message: msg });
      });
  }

  useEffect(() => {
    getHealth()
      .then(() => setApiStatus("ok"))
      .catch(() => setApiStatus("error"));
    carregarCasos();
  }, []);

  return (
    <div className="home-grid">
      <section className="home-card home-card-highlight">
        <h2>Do caos a uma decisão clara</h2>
        <p className="lead">
          Cada caso passa por captura, triagem, decisão, briefing e auditoria — com rastreabilidade
          completa.
        </p>
        <p className="lead-muted">
          Abra um caso para ver o diagnóstico ou inicie uma sessão guiada.
        </p>
      </section>

      <section className="home-card">
        <div className="list-toolbar">
          <h2>Casos registrados</h2>
          <button type="button" className="btn-secondary" onClick={carregarCasos}>
            Atualizar
          </button>
        </div>

        <StatusBanner kind={banner.kind === "loading" ? "loading" : banner.kind} message={banner.message} />

        {apiStatus === "error" && (
          <p className="warn-text">API indisponivel. Rode uvicorn na porta 8000 ou use start-fase3.ps1.</p>
        )}

        {casos && casos.total === 0 ? (
          <p>Nenhum caso ainda. Comece em <Link to="/modulo1">M1 — Demanda</Link>.</p>
        ) : null}

        {casos && casos.itens.length > 0 ? (
          <ul className="casos-list">
            {casos.itens.map((item) => (
              <li key={item.demanda_id} className="caso-card">
                <div className="caso-card-head">
                  <Link to={`/sessao/${encodeURIComponent(item.demanda_id)}`} className="caso-id">
                    {item.demanda_id}
                  </Link>
                  <span className="caso-progress">
                    {item.etapas_concluidas}/{item.etapas_total}
                  </span>
                </div>
                <p className="caso-resumo">{item.resumo ?? "Sem resumo"}</p>
                <div className="caso-meta">
                  <span>{item.origem_principal ?? "origem ?"}</span>
                  <span>{item.proxima_etapa_label}</span>
                  {item.tipo_solucao ? <span className="badge">{item.tipo_solucao}</span> : null}
                  {item.veredito ? (
                    <span className={`veredito veredito-${item.veredito}`}>
                      {labelVeredito(item.veredito)}
                    </span>
                  ) : null}
                  <Link
                    to={`/casos/${encodeURIComponent(item.demanda_id)}`}
                    className="caso-ficha-link"
                  >
                    Diagnóstico
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <p className="home-actions">
          <Link to={`/sessao/${encodeURIComponent(demandaId)}`} className="btn-primary-link">
            Sessão guiada (wizard)
          </Link>
          <Link to="/modulo1" className="btn-secondary" style={{ marginLeft: "0.5rem" }}>
            Modo avancado M1
          </Link>
        </p>
      </section>
    </div>
  );
}
