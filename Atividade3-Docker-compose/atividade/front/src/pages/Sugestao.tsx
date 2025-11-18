//src/pages/Sugestao
import { useState, useEffect, type CSSProperties } from "react";
import { useSugestaoContext } from "../context/SugestaoContext";
import { gerarPalpite } from "../utils/gerarPalpite";
import Ball from "../components/Ball";

export default function Sugestao() {
  // 1. Hook para o state local (o palpite que está na tela)
  const [palpiteAtual, setPalpiteAtual] = useState<string[]>([]);

  // 2. Hook para o Contexto (para salvar no histórico)
  const { setHistory } = useSugestaoContext();

  // 3. Função para gerar e salvar um novo palpite
  const gerarNovoPalpite = () => {
    // 3.1. Gera os 6 números
    const novoPalpite = gerarPalpite();
    
    // 3.2. Atualiza o state local (o que o usuário vê)
    setPalpiteAtual(novoPalpite);
    
    // 3.3. Atualiza o Contexto (salva no histórico)
    // Usamos o formato de callback para garantir que estamos
    // adicionando ao histórico anterior.
    setHistory(historicoAnterior => [...historicoAnterior, novoPalpite]);
  };

  // 4. useEffect para lidar com efeitos colaterais (Requisito v)
  // O array de dependências vazio [] faz com que este código
  // rode APENAS UMA VEZ, quando o componente é montado.
  useEffect(() => {
    gerarNovoPalpite();
  }, []); // Array vazio = "rodar na montagem"

  return (
    // 5. O contêiner com contorno branco
    <div style={containerSld}>
      <h2 style={titleSld}>Palpite para a Mega Sena</h2>

      {/* 6. Div para exibir as bolas */}
      <div style={bolasContainerSld}>
        {palpiteAtual.map((numero, index) => (
          <Ball key={index} value={numero} />
        ))}
      </div>

      {/* 7. Botão para gerar nova sugestão */}
      <button style={buttonSld} onClick={gerarNovoPalpite}>
        Nova sugestão
      </button>
    </div>
  );
}

// 8. Estilos CSS-in-JS

// Contêiner principal (caixa com contorno branco)
const containerSld: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #fff",
  padding: "40px",
  borderRadius: "10px",
  width: "600px",
  gap: "30px", // Espaço entre os elementos
  backgroundColor: "#242424",
};

// Título "Palpite para a Mega Sena"
const titleSld: CSSProperties = {
  color: "#ffffff",
  fontSize: "2rem",
  margin: 0,
};

// Contêiner que agrupa as bolas
const bolasContainerSld: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "15px", // Espaço entre as bolas
  width: "100%",
};

// Estilo do Botão "Nova sugestão"
const buttonSld: CSSProperties = {
  backgroundColor: "blue", // Azul
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  padding: "15px 30px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.2s",
};