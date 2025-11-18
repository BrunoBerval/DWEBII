import { useState, useEffect, useMemo, useCallback, type CSSProperties } from "react";

// ----------------------------------------------------------------------
// 1. DEFINIÇÃO DE INTERFACE TYPESCRIPT (ATUALIZADA: data_do_sorteio)
// ----------------------------------------------------------------------
interface ContestData {
  concurso: number;
  data_do_sorteio: string; // Nome do campo corrigido conforme o JSON de exemplo
  bola1: number;
  bola2: number;
  bola3: number;
  bola4: number;
  bola5: number;
  bola6: number;
}

// ----------------------------------------------------------------------
// IMPORT SOLICITADO PELO USUÁRIO (Destinado a funcionar no ambiente local)
import Ball from "../components/Ball"; 
// ----------------------------------------------------------------------

// O URL base agora utiliza a variável de ambiente VITE_API_BASE_URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3003";

// ----------------------------------------------------------------------
// Função auxiliar para formatar a data no formato extenso (Ex: Quinta-feira, 03 de abril de 2025)
// ----------------------------------------------------------------------
const formatContestDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // Dia da semana por extenso
        day: '2-digit',
        month: 'long', // Mês por extenso
        year: 'numeric',
        timeZone: 'UTC'
    };
    
    // Gera a string formatada em português do Brasil
    const formatted = date.toLocaleDateString('pt-BR', options);
    
    // Capitaliza a primeira letra do dia da semana (ex: 'quinta-feira' -> 'Quinta-feira')
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};


// ----------------------------------------------------------------------
// Componente Concursos
// ----------------------------------------------------------------------
export default function Concursos() {
  // 1. Estados para gerenciar a aplicação, agora explicitamente tipados
  const [concursoInput, setConcursoInput] = useState<string>(""); 
  
  const [contestData, setContestData] = useState<ContestData | null>(null); 
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 
  
  const [isLoading, setIsLoading] = useState<boolean>(true); 

  // 2. Transforma os dados do concurso em um array de strings para o componente Ball
  const drawnNumbers = useMemo((): string[] => {
    if (!contestData) return [];
    
    const balls = [
      String(contestData.bola1),
      String(contestData.bola2),
      String(contestData.bola3),
      String(contestData.bola4),
      String(contestData.bola5),
      String(contestData.bola6),
    ];

    // Ordena numericamente, conforme o padrão de exibição da Mega-Sena
    return balls
      .filter(n => n && !isNaN(parseInt(n)))
      .sort((a, b) => parseInt(a) - parseInt(b));
  }, [contestData]);

  // 3. Função principal para buscar o concurso na API
  const fetchContest = useCallback(async (concurso: string) => {
    if (!concurso) return;

    setIsLoading(true);
    setErrorMessage(null);
    setContestData(null);

    let endpoint = `/latest`;
    let displayConcurso = "o mais recente";

    if (concurso !== "latest") {
      if (!/^\d+$/.test(concurso)) {
        setIsLoading(false);
        return;
      }
      endpoint = `/${concurso}`;
      displayConcurso = concurso;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/megasena${endpoint}`);

      if (response.status === 404) {
        setErrorMessage(`Não existem dados para o concurso número: ${displayConcurso}`);
        return;
      }

      if (!response.ok) {
        throw new Error(`Erro de rede ou servidor: ${response.status}`);
      }

      const data: ContestData = await response.json();
      setContestData(data);
      setErrorMessage(null); 
      
    } catch (error) {
      console.error("Erro ao buscar dados do concurso:", error);
      setErrorMessage(`Erro ao conectar com a API. Verifique se o backend está rodando em ${API_BASE_URL} (obtido de VITE_API_BASE_URL).`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 4. Efeito para buscar o último concurso na montagem do componente
  useEffect(() => {
    fetchContest("latest");
  }, [fetchContest]);

  // 5. Debounce para a mudança no input 
  useEffect(() => {
    if (concursoInput === "") {
        fetchContest("latest");
        return;
    }

    if (!/^\d+$/.test(concursoInput)) {
        return;
    }

    const debounceTimeout = setTimeout(() => {
      fetchContest(concursoInput);
    }, 500); 

    return () => clearTimeout(debounceTimeout);
  }, [concursoInput, fetchContest]);


  // 6. Renderização do conteúdo
  const renderContent = () => {
    if (isLoading) {
      return <div style={textInfoSld}>A carregar dados...</div>;
    }

    if (errorMessage) {
      return <div style={textErrorSld}>{errorMessage}</div>;
    }

    if (contestData) {
      // ----------------------------------------------------
      // REQUISITO: Formata a data no formato extenso
      const finalDateDisplay = formatContestDate(contestData.data_do_sorteio);
      // ----------------------------------------------------
      
      return (
        <>
          {/* REQUISITO: Título acima das bolas */}
          <h2 style={megaSenaTitleSld}>MEGA-SENA Concurso {contestData.concurso}</h2>
          
          <div style={bolasContainerSld}>
            {/* Usa o componente Ball importado */}
            {drawnNumbers.map((numero, index) => (
              <Ball key={index} value={numero} />
            ))}
          </div>
          
          {/* REQUISITO: Data abaixo das bolas */}
          <p style={dateSorteioSld}>Sorteio realizado em: {finalDateDisplay}</p>
        </>
      );
    }

    return <div style={textInfoSld}>Use o campo acima para procurar um concurso.</div>;
  };

  return (
    <div style={{ padding: "20px", width: "100%", display: 'flex', justifyContent: 'center' }}>
      <div style={containerSld}>
        {/* 7. Input do Concurso (Canto Superior Esquerdo dentro do box) */}
        <div style={inputContainerSld}>
          <label htmlFor="concurso-input" style={inputLabelSld}>Procurar Concurso:</label>
          <input
            id="concurso-input"
            type="number"
            placeholder="Ex: 2500"
            value={concursoInput}
            // Garante que o input só tenha números inteiros
            onChange={(e) => setConcursoInput(e.target.value.replace(/[^0-9]/g, ''))}
            style={inputSld}
            min="1"
          />
        </div>

        {/* 9. Renderiza a mensagem, o erro ou as bolas */}
        {renderContent()}

      </div>
    </div>
  );
}

// 10. Estilos CSS-in-JS (usando type CSSProperties)

const containerSld: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #fff",
  padding: "40px",
  paddingTop: "100px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "700px",
  gap: "30px",
  backgroundColor: "#242424",
  position: "relative",
  fontFamily: 'Inter, sans-serif'
};

const inputContainerSld: CSSProperties = {
    position: 'absolute',
    top: '15px',
    left: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    zIndex: 10,
    alignItems: 'flex-start',
};

const inputLabelSld: CSSProperties = {
    color: '#ffffff',
    fontSize: '0.9rem',
}

const inputSld: CSSProperties = {
  padding: "8px 12px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "120px",
  fontSize: "1rem",
  backgroundColor: "#333",
  color: "#fff",
  textAlign: "center"
};

// NOVO ESTILO: Título da MEGA-SENA
const megaSenaTitleSld: CSSProperties = {
    color: "#ffffff",
    fontSize: "2.0rem",
    marginBottom: "10px",
    marginTop: "20px", // Espaçamento após o H1 principal
    textAlign: "center",
    fontWeight: "bold",
};

// Estilos do contêiner das bolas
const bolasContainerSld: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "15px",
  width: "100%",
  minHeight: "60px",
};

// NOVO ESTILO: Data do Sorteio
const dateSorteioSld: CSSProperties = {
    color: "#ffffff",
    fontSize: "1.2rem",
    marginTop: "10px",
    textAlign: "center",
};

const textInfoSld: CSSProperties = {
    color: "#ffffff99",
    fontSize: "1.2rem",
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    textAlign: "center", 
};

const textErrorSld: CSSProperties = {
    color: "#ff6b6b",
    fontSize: "1.2rem",
    fontWeight: "bold",
    textAlign: "center", 
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
};