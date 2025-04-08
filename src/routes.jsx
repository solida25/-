import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";
import { useAuth } from "./contexts/AuthContext"; // Assumo che tu abbia un AuthContext

// Componente ProtectedRoute per proteggere le rotte
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner fullPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/area-clienti" replace />;
  }

  return children;
};

// Caricamento lazy dei componenti/pagine principali con prefetch per le pagine più importanti
const Home = lazy(() => import(/* webpackPrefetch: true */ "./pages/Home.jsx"));
const OfferteLuce = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/OfferteLuce.jsx"),
);
const OfferteGas = lazy(
  () => import(/* webpackPrefetch: true */ "./pages/OfferteGas.jsx"),
);
const OfferteBusiness = lazy(() => import("./pages/OfferteBusiness.jsx"));
const ChiSiamo = lazy(() => import("./pages/ChiSiamo.jsx"));
const Contatti = lazy(() => import("./pages/Contatti.jsx"));
const Faq = lazy(() => import("./pages/Faq.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const AreaClienti = lazy(() => import("./pages/AreaClienti.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner fullPage />}>
      <Routes>
        {/* Rotte pubbliche */}
        <Route path="/" element={<Home />} />
        <Route path="/offerte-luce" element={<OfferteLuce />} />
        <Route path="/offerte-gas" element={<OfferteGas />} />
        <Route path="/offerte-business" element={<OfferteBusiness />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/contatti" element={<Contatti />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Blog />} />

        {/* Rotte area clienti */}
        <Route path="/area-clienti" element={<AreaClienti />} />

        {/* Rotte protette per la dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profilo"
          element={
            <ProtectedRoute>
              <Dashboard activeSection="profile" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/consumi"
          element={
            <ProtectedRoute>
              <Dashboard activeSection="consumption" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bollette"
          element={
            <ProtectedRoute>
              <Dashboard activeSection="bills" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/notifiche"
          element={
            <ProtectedRoute>
              <Dashboard activeSection="notifications" />
            </ProtectedRoute>
          }
        />

        {/* 404 - pagina non trovata */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
