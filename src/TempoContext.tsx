import { createContext, useContext, useState, type ReactNode } from "react";

interface TempoContextType {
  timeRange: string;
  description: string;
  setTimeRange: (value: string) => void;
}

const TempoContext = createContext<TempoContextType | undefined>(undefined);

export function TempoProvider({ children }: { children: ReactNode }) {
  const [timeRange, setTimeRange] = useState("-60s");

  const descriptions: Record<string, string> = {
    "-60s": "Últimos 60 segundos",
    "-30m": "Últimos 30 minutos",
    "-1h": "Última hora",
    "-1d": "Último dia",
  };

  const description = descriptions[timeRange] || "Intervalo personalizado";

  return (
    <TempoContext.Provider value={{ timeRange, description, setTimeRange }}>
      {children}
    </TempoContext.Provider>
  );
}

export function useTempo() {
  const context = useContext(TempoContext);
  if (!context) {
    throw new Error("useTempo deve ser usado dentro de um TempoProvider");
  }
  return context;
}
