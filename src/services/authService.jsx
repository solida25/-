// src/services/authService.jsx
const authService = {
  // Login utente
  login: async (credentials) => {
    // Simuliamo un ritardo per dare l'illusione di una chiamata API
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Creazione di un utente mock
    const mockUser = {
      id: "123456",
      name: "Mario Rossi",
      email: credentials.email || "mario.rossi@example.com",
      phone: "333 123 4567",
    };

    // Salva i dati mock nel localStorage
    localStorage.setItem("auth_token", "fake-jwt-token");
    localStorage.setItem("refresh_token", "fake-refresh-token");
    localStorage.setItem("user_data", JSON.stringify(mockUser));

    return { success: true, user: mockUser };
  },

  // Registrazione utente
  register: async (userData) => {
    // Simuliamo un ritardo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock di una risposta positiva
    return {
      success: true,
      message: "Registrazione completata con successo",
    };
  },

  // Logout utente
  logout: async () => {
    // Rimuovi semplicemente i dati dal localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");

    return { success: true };
  },

  // Verifica validità token (sempre valido in questo caso)
  verifyToken: async () => {
    return true;
  },

  // Refresh token (sempre successo in questo caso)
  refreshToken: async () => {
    return true;
  },
};

export default authService;
