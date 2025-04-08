import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ThemeProvider, createGlobalStyle, keyframes } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "./components/error/ErrorBoundary";
import CookieConsent from "./components/common/CookieConsent"; // Importiamo il componente
import AppRoutes from "./routes.jsx";
import theme from "./styles/theme";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./components/common/ScrollToTop.jsx";

/* -----------------------------
 * Animazioni Keyframes Globali
 * ----------------------------- */
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
export const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;
export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

/* -----------------------------
 * GlobalStyle con stili generali
 * + Stili per le transizioni di pagina
 * ----------------------------- */
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.backgroundLight};
  }
  a {
    text-decoration: none;
    color: inherit;
    transition: color ${({ theme }) => theme.transitions.quick};
  }
  button {
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.quick};
  }
  ul, ol {
    list-style: none;
  }
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  section {
    padding: 4rem 0;
  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }
  // Effetti di hover globali
  .hover-scale {
    transition: transform ${({ theme }) => theme.transitions.quick};
    &:hover {
      transform: scale(1.05);
    }
  }
  .hover-shadow {
    transition: box-shadow ${({ theme }) => theme.transitions.quick};
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.hover};
    }
  }
  // Classi di animazione
  .fade-in {
    animation: ${fadeIn} 1s ease forwards;
  }
  .slide-up {
    animation: ${slideUp} 0.5s ease forwards;
  }
  /* -----------------------------
  * Classi per animazioni di pagina
  * (react-transition-group)
  * ----------------------------- */
  .page-enter {
    opacity: 0;
    transform: translateY(20px);
  }
  .page-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms, transform 300ms;
  }
  .page-exit {
    opacity: 1;
  }
  .page-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

/* -----------------------------
 * Componente di transizione pagina
 * ----------------------------- */
const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <div style={{ position: "relative" }}>{children}</div>
      </CSSTransition>
    </TransitionGroup>
  );
};

/* -----------------------------
 * App principale
 * ----------------------------- */
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <BrowserRouter>
            <AuthProvider>
              <GlobalStyle />
              {/* Avvolgiamo AppRoutes dentro PageTransition per animare il cambio di route */}
              <PageTransition>
                <AppRoutes />
              </PageTransition>
              {/* Componente per la gestione dei cookie */}
              <CookieConsent />
            </AuthProvider>
            <ScrollToTop /> {/* Aggiungi questa riga */}
          </BrowserRouter>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
