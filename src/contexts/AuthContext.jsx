// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

// Creazione del context
export const AuthContext = createContext();

// Hook personalizzato per utilizzare il context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Controlla se l'utente è già autenticato all'avvio
  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      try {
        const userData = localStorage.getItem("user_data");
        const token = localStorage.getItem("auth_token");

        if (userData && token) {
          // Verifica validità token
          const isValid = await authService.verifyToken();

          if (isValid) {
            setUser(JSON.parse(userData));
          } else {
            // Tenta refresh token
            const refreshed = await authService.refreshToken();
            if (refreshed) {
              setUser(JSON.parse(localStorage.getItem("user_data")));
            } else {
              // Logout se refresh fallisce
              await logout();
            }
          }
        }
      } catch (err) {
        console.error("Error checking auth status:", err);
        setError("Errore durante la verifica dello stato di autenticazione");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Funzione di login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.login({ email, password });

      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = "Errore durante il login. Riprova più tardi.";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Altre funzioni: register, logout, resetPassword, ecc.
  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      localStorage.removeItem("refresh_token");
      setUser(null);
      navigate("/area-clienti");
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.register(userData);

      if (result.success) {
        return { success: true, message: result.message };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = "Errore durante la registrazione. Riprova più tardi.";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Valore del context
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
