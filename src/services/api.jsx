import axios from "axios";

// Impostazione dell'URL di base per le chiamate API
const API_URL = "http://localhost:8000/api";

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
  },
);

// API calls per le offerte
export const getOfferteLuce = () => {
  return apiClient.get("/offerte/luce");
};

export const getOfferteGas = () => {
  return apiClient.get("/offerte/gas");
};

export const getOfferteBusiness = () => {
  return apiClient.get("/offerte/business");
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
