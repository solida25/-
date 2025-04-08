// src/components/common/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Componente che riporta la visualizzazione all'inizio della pagina
 * quando si naviga tra diverse route
 *
 * Da inserire all'interno del componente App.jsx dentro al BrowserRouter
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top ogni volta che il pathname cambia
    window.scrollTo({
      top: 0,
      behavior: "instant", // Per uno scroll immediato
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
