//components/Layout.tsx
import { type CSSProperties } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <>
      {/* 1. A barra de navegação que acabamos de criar */}
      <Navbar />

      {/* 2. O conteúdo principal da página */}
      <main style={mainSld}>
        {/* O <Outlet> é um componente especial do React Router
          que renderiza o componente da rota "filha".
          No nosso caso, será Home, Sugestao ou Historico.
        */}
        <Outlet />
      </main>
    </>
  );
}

// 3. Estilos CSS-in-JS
const mainSld: CSSProperties = {
  // O body no index.css já centraliza o conteúdo.
  // Este padding garante que o conteúdo não fique
  // escondido *atrás* do Navbar (que tem position: fixed).
  // A altura do Navbar é ~50px + 15px*2 de padding = 80px.
  // Vamos usar um pouco mais para garantir.
  paddingTop: "100px", 
  width: "100%",
  
  // Garante que o conteúdo dentro do main também seja
  // flexível e centralizado, complementando o body
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};