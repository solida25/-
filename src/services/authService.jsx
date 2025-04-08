// src/services/authService.jsx
import apiClient from "./api";

const authService = {
  // Login utente
  login: async (credentials) => {
    try {
      const response = await apiClient.post("/auth/login", credentials);

      // Salva i token e i dati utente
      const { token, refreshToken, user } = response.data;
      localStorage.setItem("auth_token", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user_data", JSON.stringify(user));

      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Errore durante il login",
      };
    }
  },

  // Registrazione utente
  register: async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      return {
        success: true,
        message:
          response.data.message || "Registrazione completata con successo",
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Errore durante la registrazione",
      };
    }
  },

  // Logout utente
  logout: async () => {
    try {
      // Informa il server per invalidare il token
      await apiClient.post("/auth/logout");
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      return { success: false, error: "Errore durante il logout" };
    }
  },

  // Verifica validità token
  verifyToken: async () => {
    try {
      await apiClient.get("/auth/verify-token");
      return true;
    } catch (error) {
      return false;
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        return false;
      }

      const response = await apiClient.post("/auth/refresh-token", {
        refreshToken,
      });

      // Aggiorna il token
      const { token } = response.data;
      localStorage.setItem("auth_token", token);

      return true;
    } catch (error) {
      return false;
    }
  },
};

export default authService;
