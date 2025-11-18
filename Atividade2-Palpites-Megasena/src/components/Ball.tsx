//components/Ball.tsx
import type { CSSProperties } from "react";

// 1. Define as propriedades que o componente espera
interface Props {
  value: string;
}

// 2. O componente recebe 'props' e exibe o 'props.value'
export default function Ball(props: Props) {
  return <div style={ballSld}>{props.value}</div>;
}

// 3. Estilo CSS-in-JS que você forneceu
const ballSld: CSSProperties = {
  display: "flex",
  backgroundColor: "#20b2aa",
  height: "60px",
  width: "60px",
  borderRadius: "30px", // 50% de 60px
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "25px",
};