import { Link } from "react-router-dom";
import { downloadDiagnosticoMarkdown } from "../lib/exportDiagnostico";
import { labelOrigem, labelSolucao, labelVeredito } from "../lib/labels";
import type { DemandaDetalhe } from "../types/demanda";

type Props = {
  demandaId: string;
  detalhe: DemandaDetalhe;
  compact?: boolean;
};

export function DiagnosticoCard({ demandaId, detalhe, compact = false }: Props) {
  const { resumo } = detalhe;
  const concluido = detalhe.proxima_etapa === null && detalhe.etapas_concluidas >= 5;
  const veredito = resumo.veredito;

  return (
    <article className={`diagnostico-card ${compact ? "diagnostico-card-compact" : ""}`}>
      <header className="diagnostico-header">
        <div>
          <p className="diagnostico-eyebrow">Diagnostico do caso</p>
          <h2 className="diagnostico-title">{demandaId}</h2>
          <p className="diagnostico-subtitle">
            {concluido
              ? "Fluxo completo — decisao estruturada e auditada."
              : `Em andamento — ${detalhe.proxima_etapa_label}`}
          </p>
        </div>
        <span
          className={`diagnostico-veredito ${veredito ? `veredito veredito-${veredito}` : "diagnostico-veredito-pendente"}`}
        >
          {labelVeredito(veredito)}
        </span>
      </header>

      {resumo.demanda_bruta ? (
        <blockquote className="diagnostico-entrada">{resumo.demanda_bruta}</blockquote>
      ) : null}

      <div className="diagnostico-grid">
        <section className="diagnostico-block">
          <h3>Problema</h3>
          <p>{resumo.problema ?? "Ainda nao registrado no briefing."}</p>
        </section>
        <section className="diagnostico-block">
          <h3>Objetivo</h3>
          <p>{resumo.objetivo ?? "Ainda nao registrado no briefing."}</p>
        </section>
      </div>

      <div className="diagnostico-meta-row">
        <div className="diagnostico-pill">
          <span className="pill-label">Solucao recomendada</span>
          <strong>{labelSolucao(resumo.solucao_sugerida)}</strong>
        </div>
        <div className="diagnostico-pill">
          <span className="pill-label">Origem</span>
          <strong>{labelOrigem(resumo.origem_principal)}</strong>
        </div>
        <div className="diagnostico-pill">
          <span className="pill-label">Progresso</span>
          <strong>
            {detalhe.etapas_concluidas}/{detalhe.etapas_total}
          </strong>
        </div>
      </div>

      {resumo.baseline || resumo.meta ? (
        <div className="diagnostico-metrics">
          <div className="metric-box">
            <span>Baseline</span>
            <strong>{resumo.baseline ?? "—"}</strong>
          </div>
          <div className="metric-arrow" aria-hidden>
            →
          </div>
          <div className="metric-box metric-box-target">
            <span>Meta (1a iteracao)</span>
            <strong>{resumo.meta ?? "—"}</strong>
          </div>
        </div>
      ) : null}

      {resumo.proximo_passo ? (
        <section className="diagnostico-proximo">
          <h3>Proximo passo executavel</h3>
          <p>{resumo.proximo_passo}</p>
        </section>
      ) : null}

      {resumo.auditoria_resumo ? (
        <section className="diagnostico-auditoria">
          <h3>Parecer da auditoria</h3>
          <p>{resumo.auditoria_resumo}</p>
        </section>
      ) : null}

      {!compact ? (
        <footer className="diagnostico-actions">
          {!concluido ? (
            <Link to={`/sessao/${encodeURIComponent(demandaId)}`} className="btn-primary-link">
              Continuar sessao
            </Link>
          ) : null}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => downloadDiagnosticoMarkdown(demandaId, detalhe)}
          >
            Exportar Markdown
          </button>
          <Link to="/" className="btn-secondary">
            Todos os casos
          </Link>
          <Link to={`/sessao/${encodeURIComponent(demandaId)}`} className="btn-secondary">
            Revisar etapas
          </Link>
        </footer>
      ) : null}
    </article>
  );
}
