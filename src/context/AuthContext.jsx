import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/endpoints/AuthAPI";
import { userAPI } from "../api/endpoints/UserAPI";
import api from "../api/api"; 

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await authAPI.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          localStorage.removeItem("access_token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);


  const login = async (credentials) => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", credentials.username);
      formData.append("password", credentials.password);

      const response = await authAPI.login(formData);
      const { access_token } = response.data;

      if (!access_token) {
        throw new Error("Login failed: Token missing in response");
      }

      localStorage.setItem("access_token", access_token);
      setToken(access_token);
      api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      const userResponse = await authAPI.getCurrentUser();
      setUser(userResponse.data);

      return userResponse.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

 
  const register = async (userData) => {
    try {
      const response = await userAPI.createUser(userData);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("access_token");
      setUser(null);
      setToken(null);
      delete api.defaults.headers.common["Authorization"];
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
