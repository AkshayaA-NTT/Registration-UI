import { useContext } from "react";
import { DealContext } from "../context/DealContext";

export const useDeal = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error("useDeal must be used within a DealProvider");
  }
  return context;
};
