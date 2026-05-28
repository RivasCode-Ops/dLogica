import { Link } from "react-router-dom";
import type { DemandaDetalhe } from "../../types/demanda";

type Props = {
  demandaId: string;
  detalhe: DemandaDetalhe | null;
  loading: boolean;
};

export function ContextPanel({ demandaId, detalhe, loading }: Props) {
  return (
    <aside className="wizard-context">
      <h3>Contexto do caso</h3>
      <p className="wizard-context-id">{demandaId}</p>

      {loading ? <p className="wizard-context-muted">Atualizando...</p> : null}

      {detalhe ? (
        <>
          <div className="wizard-context-progress">
            <span>
              {detalhe.etapas_concluidas}/{detalhe.etapas_total} etapas
            </span>
            <span>{detalhe.proxima_etapa_label}</span>
          </div>

          <dl className="wizard-context-dl">
            <div>
              <dt>Problema</dt>
              <dd>{detalhe.resumo.problema ?? "—"}</dd>
            </div>
            <div>
              <dt>Solucao</dt>
              <dd>{detalhe.resumo.solucao_sugerida ?? "—"}</dd>
            </div>
            <div>
              <dt>Veredito</dt>
              <dd>
                {detalhe.resumo.veredito ? (
                  <span className={`veredito veredito-${detalhe.resumo.veredito}`}>
                    {detalhe.resumo.veredito}
                  </span>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>

          <Link to={`/casos/${encodeURIComponent(demandaId)}`} className="wizard-context-link">
            Ver ficha completa
          </Link>
        </>
      ) : (
        <p className="wizard-context-muted">Preencha a etapa 1 para iniciar o caso.</p>
      )}
    </aside>
  );
}
