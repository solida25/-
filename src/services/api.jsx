import axios from "axios";
import { handleApiError } from "../utils/errorHandler";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";
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
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
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
  }
);

// API calls per le offerte
// API calls con gestione degli errori migliorata
export const getOfferteLuce = async () => {
  try {
    return await apiClient.get("/offerte/luce");
  } catch (error) {
    throw new Error(
      handleApiError(error, "Impossibile recuperare le offerte luce.")
    );
  }
};

export const getOfferteGas = async () => {
  try {
    return await apiClient.get("/offerte/gas");
  } catch (error) {
    throw new Error(
      handleApiError(error, "Impossibile recuperare le offerte gas.")
    );
  }
};

export const getOfferteBusiness = async () => {
  try {
    return await apiClient.get("/offerte/business");
  } catch (error) {
    throw new Error(
      handleApiError(error, "Impossibile recuperare le offerte bussines.")
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

// Aggiungi la funzione calculateSavings mancante
export const calculateSavings = (billData, type) => {
  // Get our competitive rates
  const solidaRate = type === "electricity" ? 0.069 : 0.28;

  // Calculate unit cost from the bill
  const unitCost = billData.totalAmount / billData.consumption;

  // Calculate savings percentage (capped at 30%)
  const savingsPercentage = Math.min(
    Math.round(((unitCost - solidaRate) / unitCost) * 100),
    30
  );

  // Calculate absolute savings
  const annualConsumption = billData.annualizedConsumption;
  const annualCost = billData.annualizedCost;
  const savingsAmount = Math.round((savingsPercentage / 100) * annualCost);

  // Calculate CO2 reduction
  const co2ReductionKg = Math.round(
    type === "electricity"
      ? annualConsumption * 0.35 * (savingsPercentage / 100) // 0.35 kg CO2 per kWh
      : annualConsumption * 2.5 * (savingsPercentage / 100) // 2.5 kg CO2 per Smc
  );

  return {
    currentProvider: billData.provider,
    periodStart: billData.periodStart,
    periodEnd: billData.periodEnd,
    consumption: billData.consumption,
    annualConsumption: billData.annualizedConsumption,
    billAmount: billData.totalAmount,
    annualCost: billData.annualizedCost,
    savingsPercentage,
    savingsAmount,
    currentUnitCost: unitCost.toFixed(3),
    potentialUnitCost: solidaRate.toFixed(3),
    estimatedNewAnnualCost: annualCost - savingsAmount,
    co2ReductionKg,
    fixedCosts: billData.fixedCosts,
    variableCosts: billData.variableCosts,
    taxes: billData.taxes,
  };
};

export default apiClient;
