/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from "react";

interface CounterContextProps {
  val: number;
  setVal: (num: number) => void;
}

interface CounterProviderProps {
  children: React.ReactNode;
}

const CounterContext = createContext<CounterContextProps | null>(null);

export const useCounter = () => {
  return useContext(CounterContext);
};

export const CounterProvider: React.FC<CounterProviderProps> = (props) => {
  const [count, setCount] = useState<number>(1);
  return (
    <CounterContext.Provider
      value={{
        val: count,
        setVal: setCount,
      }}
    >
      {props.children}
    </CounterContext.Provider>
  );
};
