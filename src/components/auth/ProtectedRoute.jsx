// src/components/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../common/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Mostra loading mentre verifichiamo l'autenticazione
  if (loading) {
    return <LoadingSpinner />;
  }

  // Reindirizza se non autenticato
  if (!isAuthenticated) {
    return <Navigate to="/area-clienti" state={{ from: location }} replace />;
  }

  // Mostra il contenuto protetto
  return children;
};

export default ProtectedRoute;
