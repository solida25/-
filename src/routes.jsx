import React from "react";
import { Routes, Route } from "react-router-dom";

// Importa le pagine
import Home from "./pages/Home.jsx";
import OfferteLuce from "./pages/OfferteLuce.jsx";
import OfferteGas from "./pages/OfferteGas.jsx";
import OfferteBusiness from "./pages/OfferteBusiness.jsx";
import ChiSiamo from "./pages/ChiSiamo.jsx";
import Contatti from "./pages/Contatti.jsx";
import Faq from "./pages/Faq.jsx";
import Blog from "./pages/Blog.jsx";
import AreaClienti from "./pages/AreaClienti.jsx";
import NotFound from "./pages/NotFound.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/offerte-luce" element={<OfferteLuce />} />
      <Route path="/offerte-gas" element={<OfferteGas />} />
      <Route path="/offerte-business" element={<OfferteBusiness />} />
      <Route path="/chi-siamo" element={<ChiSiamo />} />
      <Route path="/contatti" element={<Contatti />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/area-clienti" element={<AreaClienti />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
