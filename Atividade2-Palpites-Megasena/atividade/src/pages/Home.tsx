//src/pages/Home
import { type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // 1. Hook do React Router para navegar entre páginas
  const navigate = useNavigate();

  // 2. Função que será chamada ao clicar no botão
  const handleNavigate = () => {
    navigate('/palpite'); // Redireciona para a rota /palpite
  };

  return (
    // 3. O contêiner com contorno branco
    <div style={containerSld}>
      
      {/* 4. Título */}
      <h1 style={titleSld}>Bem Vindo!</h1>

      {/* 5. Botão para começar */}
      <button style={buttonSld} onClick={handleNavigate}>
        Clique para começar
      </button>

    </div>
  );
}

// 6. Estilos CSS-in-JS

// O contêiner principal da página (baseado no seu 'containerSld' de referência)
const containerSld: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Centraliza verticalmente
  alignItems: "center", // Centraliza horizontalmente
  border: "1px solid #fff",
  padding: "50px",
  borderRadius: "10px",
  width: "600px",
  gap: "30px", // Espaço entre o título e o botão
  backgroundColor: "#242424", // Fundo igual ao do body
};

// Estilo do Título "Bem Vindo!"
const titleSld: CSSProperties = {
  color: "#ffffff",
  fontSize: "3rem", // "letras bem grande"
  margin: 0,
};

// Estilo do Botão "Clique para começar"
const buttonSld: CSSProperties = {
  backgroundColor: "blue", // Um tom de azul
  color: "#ffffff",
  border: "none",
  borderRadius: "5px",
  padding: "15px 30px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.2s",
};