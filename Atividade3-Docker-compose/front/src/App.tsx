import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Sugestao from "./pages/Sugestao";
import Historico from "./pages/Historico";
import Concursos from "./pages/Concursos";

function App() {
  return (
    // 1. O 'Routes' é o contêiner principal para todas as rotas
    <Routes>
      
      {/* 2. Rota "pai" (Layout)
        * Todos os componentes aninhados (as 'Route' filhas)
        * serão renderizados dentro do <Outlet /> do 'Layout.tsx'.
        * Isso garante que o Navbar apareça em todas as páginas.
      */}
      <Route element={<Layout />}>
        
        {/* 3. Rotas "filhas" (as páginas) */}
        
        {/* Rota da Página Inicial */}
        <Route path="/" element={<Home />} />

        {/* Rota da Página de Concursos Anteriores */}
        <Route path="/concursos" element={<Concursos />} />
        
        {/* Rota da Página de Palpite */}
        <Route path="/palpite" element={<Sugestao />} />
        
        {/* Rota da Página de Histórico */}
        <Route path="/historico" element={<Historico />} />
      
      </Route>
    </Routes>
  );
}

export default App;