"use client"

import React, { createContext } from "react";
import { useContext, useState, type ReactNode } from "react";

interface ContextProps {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  item: any;
  setItem: React.Dispatch<React.SetStateAction<any>>;
}

interface ContextProviderProps {
  children: ReactNode;
}
const ContextApi = createContext<ContextProps | undefined>(undefined);

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [id, setId] = useState("");
  const [item, setItem] = useState({});

  return (
    <ContextApi.Provider
      value={{
        id,
        setId,
        item,
        setItem, 
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextApi;
export const useAppContext = () => {
  const context = useContext(ContextApi);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a ContextProvider");
  }
  return context;
};
