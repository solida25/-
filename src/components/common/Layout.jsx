import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const Main = styled.main`
  min-height: calc(100vh - 300px);
`;

const Layout = ({ children, title, description }) => {
  return (
    <>
      <Helmet>
        <title>
          {title
            ? `${title} | Solida-Energia`
            : "Solida-Energia - Energia affidabile per casa e azienda"}
        </title>
        <meta
          name="description"
          content={
            description ||
            "Solida-Energia offre soluzioni energetiche affidabili e competitive per privati e aziende. Scopri le nostre offerte di luce e gas."
          }
        />
      </Helmet>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
