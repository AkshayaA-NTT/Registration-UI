import { useContext } from "react";
import { DealContext } from "../context/DealContext";

/**
 * useDeal()
 * Custom hook for easy access to DealContext
 * 
 * Example:
 * const { clientId, selectedSpoc, setSelectedSpoc } = useDeal();
 */
export const useDeal = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error("useDeal must be used within a DealProvider");
  }
  return context;
};
