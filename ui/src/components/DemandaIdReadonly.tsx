type Props = {
  demandaId: string;
  embedded?: boolean;
};

/** Exibe o ID do caso (somente leitura) no wizard e no modo avançado. */
export function DemandaIdReadonly({ demandaId, embedded = false }: Props) {
  if (!demandaId) {
    return null;
  }

  return (
    <div className={`demanda-id-readonly${embedded ? " demanda-id-readonly--embedded" : ""}`}>
      <span className="demanda-id-readonly-label">Caso ativo</span>
      <code className="demanda-id-readonly-value">{demandaId}</code>
    </div>
  );
}
