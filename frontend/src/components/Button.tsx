import React from "react";
import { useCounter } from "../context/Counter";

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = () => {
  const context = useCounter();
  return (
    <>
      <h1>{context?.val}</h1>
      <button
        onClick={() => {
          if (context && typeof context.val === "number" && context.val > 0) {
            context.setVal(context.val - 1);
          }
        }}
      >
        Decrease Count
      </button>
      <button onClick={() => context?.setVal(context?.val + 1)}>
        Increase Count
      </button>
    </>
  );
};

export default Button;
