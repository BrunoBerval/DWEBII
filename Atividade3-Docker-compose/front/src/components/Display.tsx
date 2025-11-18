//components/Display.tsx
import type { CSSProperties } from "react";
import { useNumbersContext } from "../context/NumbersContext";
import Ball from "./Ball";

export default function Display(){
  const { numbers } = useNumbersContext();

  return (
    <div style={containerSld}>
      {numbers.length === 0 ? (
        <span style={textInfo }>Sem entrada</span>
      ) : (
        numbers.map((num, index) => <Ball key={index} value={num} />)
      )}
    </div>
  )
}

const textInfo: CSSProperties = {
    color: "#fff", 
    fontSize: "1.25rem"
}

const containerSld: CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: "10px",
    border: "1px solid #fff",
    padding: "20px",
    gap: "20px"
};
