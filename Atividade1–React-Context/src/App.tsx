import type { CSSProperties } from "react";
import { NumbersProvider } from "./context/NumbersContext";
import Display from "./components/Display";
import Input from "./components/Input";

export default function App() {
  return (
    <NumbersProvider>
      <div style={containerSld}>
        <Input />
        <Display />
      </div>
    </NumbersProvider>
  )
}

const containerSld: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid #fff",
  padding: "20px",
  borderRadius: "10px",
  width: "600px",
  gap: "20px",
  margin: "auto",
  marginTop: "50px"
};