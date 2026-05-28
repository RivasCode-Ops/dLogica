import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type DemandaContextValue = {
  demandaId: string;
  setDemandaId: (value: string) => void;
};

const DemandaContext = createContext<DemandaContextValue | null>(null);

export function DemandaProvider({ children }: { children: ReactNode }) {
  const [demandaId, setDemandaId] = useState("DLG-UI-001");

  const value = useMemo(() => ({ demandaId, setDemandaId }), [demandaId]);

  return <DemandaContext.Provider value={value}>{children}</DemandaContext.Provider>;
}

export function useDemandaId(): DemandaContextValue {
  const ctx = useContext(DemandaContext);
  if (!ctx) {
    throw new Error("useDemandaId deve ser usado dentro de DemandaProvider");
  }
  return ctx;
}
