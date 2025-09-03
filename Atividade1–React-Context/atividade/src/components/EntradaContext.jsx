// context/EntradaContext.tsx
// Arquivo responsável pelo gerenciamento de estado global da entrada do usuário

import { createContext, useContext, useState, ReactNode } from "react";

// Define os dados que o contexto vai compartilhar
interface EntradaContextType {
  entrada: string; // valor digitado pelo usuário
  setEntrada: (valor: string) => void; // função para atualizar o valor
}

// Criação do contexto
const EntradaContext = createContext<EntradaContextType | undefined>(undefined);

// Provider que encapsula os componentes filhos
// Aqui é onde guardamos o estado global
export function EntradaProvider({ children }: { children: ReactNode }) {
  const [entrada, setEntrada] = useState("");

  return (
    <EntradaContext.Provider value={{ entrada, setEntrada }}>
      {children}
    </EntradaContext.Provider>
  );
}

// Hook personalizado para consumir o contexto
export function useEntrada(): EntradaContextType {
  const context = useContext(EntradaContext);
  if (!context) {
    throw new Error("useEntrada deve ser usado dentro de EntradaProvider");
  }
  return context;
}