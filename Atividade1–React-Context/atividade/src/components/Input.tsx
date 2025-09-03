import { useContext } from "react";
import { InputContext } from "../App";

export default function Input() {
  const { inputValue, setInputValue } = useContext(InputContext);

  return (
    <input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)} 
    />
  );
}

const inputSld: CSSProperties = {
    display: "flex",
    padding: "10px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "1px solid #fff"
};