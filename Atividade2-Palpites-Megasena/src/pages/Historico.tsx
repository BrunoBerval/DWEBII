//src/pages/Historico.tsx
import { type CSSProperties } from "react";
import { useSugestaoContext } from "../context/SugestaoContext";
import Ball from "../components/Ball";

export default function Historico() {
  // 1. Acessa o histórico salvo no Contexto
  const { history } = useSugestaoContext();

  return (
    // 2. O contêiner com contorno branco
    <div style={containerSld}>
      <h2 style={titleSld}>Palpites Anteriores</h2>

      {/* 3. Div que vai conter a lista de palpites */}
      <div style={listaHistoricoSld}>
        
        {/* 4. Verifica se o histórico está vazio */}
        {history.length === 0 ? (
          <p style={emptyTextSld}>Nenhum palpite foi gerado ainda.</p>
        ) : (
          
          // 5. Se não estiver vazio, faz um map no histórico
          // 'history' é um array de palpites (string[][])
          history.map((palpite, indexDoPalpite) => (
            
            // 6. Renderiza um "jogo" (linha) por palpite
            <div key={indexDoPalpite} style={jogoSld}>
              
              {/* 7. Faz um map interno para renderizar as bolas do palpite */}
              {/* 'palpite' é um array de números (string[]) */}
              {palpite.map((numero, indexDoNumero) => (
                <Ball key={indexDoNumero} value={numero} />
              ))}
            </div>
          ))
        )}
      </div>
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
  minHeight: "300px", // Altura mínima para o container
  gap: "20px",
  backgroundColor: "#242424",
};

// Título "Palpites Anteriores"
const titleSld: CSSProperties = {
  color: "#ffffff",
  fontSize: "2rem",
  margin: 0,
  marginBottom: "10px", // Espaço abaixo do título
};

// Contêiner para a lista de jogos
const listaHistoricoSld: CSSProperties = {
  display: "flex",
  flexDirection: "column", // Um jogo abaixo do outro
  gap: "15px", // Espaço entre os jogos
  width: "100%",
};

// Linha de um jogo (o contêiner das 6 bolas)
const jogoSld: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "10px", // Espaço entre as bolas de um mesmo jogo
  width: "100%",
};

// Texto para o caso de histórico vazio
const emptyTextSld: CSSProperties = {
  color: "#ccc", // Cinza claro
  fontSize: "1.1rem",
  textAlign: "center",
  width: "100%",
};