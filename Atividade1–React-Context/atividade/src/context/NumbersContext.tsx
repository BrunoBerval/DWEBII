import { createContext, useContext, useState, type ReactNode } from "react";

// Definição dos tipos para o contexto
interface NumbersContextType {
  numbers: string[];
  setNumbers: (numbers: string[]) => void;
}

// Criação do contexto
const NumbersContext = createContext<NumbersContextType | undefined>(undefined);

// Hook personalizado para usar o contexto de forma mais fácil e segura
export const useNumbersContext = () => {
  const context = useContext(NumbersContext);
  if (!context) {
    throw new Error("useNumbersContext must be used within a NumbersProvider");
  }
  return context;
};

// Componente Provedor
export const NumbersProvider = ({ children }: { children: ReactNode }) => {
  const [numbers, setNumbers] = useState<string[]>([]);
  return (
    <NumbersContext.Provider value={{ numbers, setNumbers }}>
      {children}
    </NumbersContext.Provider>
  );
};