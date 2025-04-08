// src/styles/theme.js
const theme = {
  // Colori principali
  primary: "#E63946", // Rosso
  secondary: "#F9A826", // Arancione/Giallo

  // Colori di base
  background: "#FFFFFF",
  backgroundLight: "#F8F9FA",
  text: "#333333",
  textLight: "#666666",

  // Colori di stato
  success: "#28A745",
  warning: "#FFC107",
  error: "#DC3545",
  info: "#17A2B8",

  // Colori di gradazione per animazioni
  primaryLight: "#F87178",
  primaryDark: "#C62331",
  secondaryLight: "#FFBC5C",
  secondaryDark: "#D68511",

  // Dimensioni di breakpoint responsive
  breakpoints: {
    xs: "576px",
    sm: "768px",
    md: "992px",
    lg: "1200px",
  },

  // Valori per animazioni
  transitions: {
    quick: "0.2s",
    default: "0.3s",
    slow: "0.5s",
  },

  // Valori per ombre
  shadows: {
    small: "0 2px 4px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
    large: "0 10px 15px rgba(0, 0, 0, 0.1)",
    hover: "0 8px 15px rgba(0, 0, 0, 0.2)",
  },

  // Bordi arrotondati
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    circle: "50%",
  },
};

export default theme;
