//src/context/SugestaoContext
import { createContext, useContext, useState, type ReactNode } from "react";

// 1. Definição dos tipos para o Contexto
// Um palpite é um array de strings (ex: ["01", "02", "03"])
// O histórico é um array de palpites (ex: [ ["01", "02"], ["04", "05"] ])
type Palpite = string[];
type Historico = Palpite[];

interface SugestaoContextType {
  history: Historico;
  // O tipo React.Dispatch<React.SetStateAction<...>> é o tipo padrão
  // que o useState retorna para a função de "set"
  setHistory: React.Dispatch<React.SetStateAction<Historico>>;
}

// 2. Criação do Contexto
// Iniciamos com 'undefined' para forçar o uso do hook de validação
const SugestaoContext = createContext<SugestaoContextType | undefined>(
  undefined
);

// 3. Hook personalizado para usar o contexto
// Isso nos poupa de importar 'useContext' e 'SugestaoContext' em
// todos os componentes, e já faz a validação.
export const useSugestaoContext = () => {
  const context = useContext(SugestaoContext);

  // Validação: Garante que o hook só seja usado dentro do Provider
  if (!context) {
    throw new Error(
      "useSugestaoContext deve ser usado dentro de um SugestaoProvider"
    );
  }
  return context;
};

// 4. Componente Provedor (Provider)
// Este componente vai "envelopar" nossa aplicação
interface ProviderProps {
  children: ReactNode;
}

export const SugestaoProvider = ({ children }: ProviderProps) => {
  // 5. O Estado global que será compartilhado
  // Começa como um array vazio
  const [history, setHistory] = useState<Historico>([]);

  // O 'value' é o que será disponibilizado para todos os componentes
  // filhos que usarem o hook 'useSugestaoContext'
  const value = { history, setHistory };

  return (
    <SugestaoContext.Provider value={value}>
      {children}
    </SugestaoContext.Provider>
  );
};