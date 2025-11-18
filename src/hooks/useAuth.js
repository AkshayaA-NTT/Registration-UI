import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * useAuth()
 * Custom hook for easy access to AuthContext
 * 
 * Example:
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
