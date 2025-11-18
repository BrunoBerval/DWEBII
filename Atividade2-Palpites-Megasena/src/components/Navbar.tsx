//src/components/Navbar.tsx
import { type CSSProperties } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={navbarSld}>
      {/* 1. Lado Esquerdo: Logo */}
      <div>
        {/*
          * MUDANÇA AQUI:
          * Adicionamos o <Link to="/"> ao redor da imagem
          * para que ela aponte para a página inicial.
        */}
        <Link to="/">
          <img src="/logo-branco.png" alt="Logo da Faculdade" style={logoSld} />
        </Link>
      </div>

      {/* 2. Lado Direito: Links de Navegação */}
      <div style={linksContainerSld}>
        <Link to="/palpite" style={linkSld}>
          Palpite
        </Link>
        <Link to="/historico" style={linkSld}>
          Histórico
        </Link>
      </div>
    </nav>
  );
}

// 3. Estilos CSS-in-JS (Exatamente como você enviou)

// Estilo da barra de navegação principal
const navbarSld: CSSProperties = {
  display: "flex",
  justifyContent: "space-between", // Coloca logo na esquerda e links na direita
  alignItems: "center",
  width: "100%", // Ocupa a largura inteira
  padding: "15px 40px", // Deixa a barra "grossa"
  backgroundColor: "#3a3a3a", // Um cinza mais claro que o fundo (#242424)
  boxSizing: "border-box", // Garante que o padding não estoure a largura
  minHeight: "150px",

  // Posicionamento (será controlado pelo Layout.tsx)
  position: "fixed", // Fica fixa no topo
  top: 0,
  left: 0,
  zIndex: 1000,
};

// Estilo do container dos links
const linksContainerSld: CSSProperties = {
  display: "flex",
  gap: "30px", // Espaço entre os links "Palpite" e "Histórico"
};

// Estilo dos links (Palpite e Histórico)
const linkSld: CSSProperties = {
  color: "#ffffff", // Letras brancas
  textDecoration: "none",
  fontSize: "1.1rem",
  fontWeight: "bold",
  fontFamily: "Arial", // Garante a fonte
};

// Estilo da imagem do logo
const logoSld: CSSProperties = {
  height: "120px", // Altura da logo
  width: "auto",
  // Adicionado para garantir que a imagem se comporte bem dentro do link
  display: "block", 
};