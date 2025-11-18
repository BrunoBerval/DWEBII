import { useState, type CSSProperties } from "react";
import { useNumbersContext } from "../context/NumbersContext";

const inputSld: CSSProperties = {
  // Estilo do seu input, por exemplo:
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  padding: "20px",
  gap: "20px",
};

const errorSld: CSSProperties = {
  color: "red",
  marginTop: "5px",
};

export default function Input() {
  const { setNumbers } = useNumbersContext();
  const [entrada, setEntrada] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEntrada(value);
    setError(""); // Limpa o erro anterior

    // Remove qualquer caractere que não seja um número ou espaço
    const sanitizedValue = value.replace(/[^0-9\s]/g, "");
    setEntrada(sanitizedValue);

    // Divide a string por espaços e filtra entradas vazias
    const parsedNumbers = sanitizedValue
      .split(" ")
      .filter((num) => num.trim() !== "");

    // Validação de quantidade
    if (parsedNumbers.length > 6) {
      setError("Você deve digitar no máximo 6 números.");
      setNumbers([]);
      return;
    }

    const validNumbers: string[] = [];
    let hasInvalidNumber = false;

    for (const num of parsedNumbers) {
      // Validação de formato (dois algarismos)
      if (num.length === 2 && /^\d+$/.test(num)) {
        validNumbers.push(num);
      } else {
        hasInvalidNumber = true;
        break; // Para o loop na primeira entrada inválida
      }
    }

    // Atualiza o contexto com os números válidos encontrados até o momento
    setNumbers(validNumbers);

    // Exibe a mensagem de erro se houver alguma entrada inválida
    if (hasInvalidNumber && parsedNumbers.length > 0) {
      setError("Cada número deve ter exatamente 2 algarismos.");
    } else if (parsedNumbers.length < 6 && sanitizedValue.trim() !== "") {
      setError(
        `Faltam ${6 - parsedNumbers.length} número${
          6 - parsedNumbers.length > 1 ? "s" : ""
        }.`
      );
    }
  };

  return (
    <>
      <input
        type="text"
        value={entrada}
        onChange={handleInputChange}
        placeholder="Digite 6 números separados por espaços..."
        style={inputSld}
      />
      {error && <p style={errorSld}>{error}</p>}
    </>
  );
}
