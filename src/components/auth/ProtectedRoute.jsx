// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Mostra loading mentre verifichiamo l'autenticazione
  if (loading) {
    return <LoadingSpinner />;
  }

  // In questa versione semplificata, mostriamo sempre il contenuto protetto
  // Abbiamo rimosso il reindirizzamento alla pagina di login
  return children;
};

export default ProtectedRoute;
