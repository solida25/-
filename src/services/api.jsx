import axios from "axios";
import { handleApiError } from "../utils/errorHandler";

// Impostazione dell'URL di base per le chiamate API
const API_URL = "https://solida-energia-backend.amministrazio25.repl.co/api";
// Creazione dell'istanza axios con configurazione di base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor per aggiungere il token di autenticazione alle richieste
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      // Correzione: utilizza i backtick
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Aggiungiamo un interceptor per gestire gli errori di risposta
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gestione token scaduto
    if (error.response && error.response.status === 401) {
      // Se abbiamo un refresh token, proviamo a rinnovare il token
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        // Qui potremmo implementare la logica per il refresh del token
        // Per ora reindirizza alla pagina di login
        window.location.href = "/area-clienti";
      }
    }
    // Propaghiamo l'errore per gestirlo nei componenti
    return Promise.reject(error);
  },
);

// API calls per le offerte con gestione errori migliorata
export const getOfferteLuce = async () => {
  try {
    return await apiClient.get("/offerte/luce");
  } catch (error) {
    throw new Error(
      handleApiError(error, "Impossibile recuperare le offerte luce."),
    );
  }
};

export const getOfferteGas = async () => {
  try {
    return await apiClient.get("/offerte/gas");
  } catch (error) {
    throw new Error(
      handleApiError(error, "Impossibile recuperare le offerte gas."),
    );
  }
};

export const getOfferteBusiness = async () => {
  try {
    return await apiClient.get("/offerte/business");
  } catch (error) {
    throw new Error(
      handleApiError(error, "Impossibile recuperare le offerte business."),
    );
  }
};

// API calls per l'autenticazione
export const login = (credentials) => {
  return apiClient.post("/auth/login", credentials);
};

export const register = (userData) => {
  return apiClient.post("/auth/register", userData);
};

export const logout = () => {
  localStorage.removeItem("auth_token");
  return Promise.resolve();
};

// API calls per il profilo utente
export const getUserProfile = () => {
  return apiClient.get("/user/profile");
};

export const updateUserProfile = (profileData) => {
  return apiClient.put("/user/profile", profileData);
};

// API calls per le bollette
export const getUserBills = () => {
  return apiClient.get("/user/bills");
};

export const getBillDetail = (billId) => {
  return apiClient.get(`/user/bills/${billId}`);
};

export default apiClient;
