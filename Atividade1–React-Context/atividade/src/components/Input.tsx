import { useState, type CSSProperties } from "react";
import { useNumbersContext } from "../context/NumbersContext";

export default function Input() {
  const { setNumbers } = useNumbersContext();
  const [entrada, setEntrada] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEntrada(value);
    
    // Divide a string, filtra valores vazios e limita a 6 números.
    const parsedNumbers = value.split(" ").filter(num => num.trim() !== "").slice(0, 6);
    setNumbers(parsedNumbers);
  };

  return (
    <input
      type="text"
      value={entrada}
      onChange={handleInputChange}
      placeholder="Digite números separados por espaços..."
      style={inputSld}
    />
  );
};


const inputSld: CSSProperties = {
  display: "flex",
  padding: "10px",
  fontSize: "18px",
  borderRadius: "10px",
  border: "1px solid #fff"
};

