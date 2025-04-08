// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Layout from "../components/common/Layout.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import Button from "../components/common/Button.jsx";
import SEO from "../components/seo/SEO";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { SEO_CONSTANTS } from "../utils/seoConstants";
import { FaHome, FaSearch } from "react-icons/fa";

// Animazione per il testo "404"
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

// Styled components
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const ErrorCode = styled.div`
  font-size: 10rem;
  font-weight: bold;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  animation: ${float} 4s ease-in-out infinite;
  text-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 6rem;
  }
`;

const ErrorMessage = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.8rem;
  }
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 2.5rem;
  max-width: 600px;
  line-height: 1.6;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const NotFound = () => {
  return (
    <Layout
      title="Pagina non trovata"
      description="La pagina che stai cercando non esiste"
    >
      <SEO
        title="Pagina non trovata"
        description="La pagina che stai cercando potrebbe essere stata spostata, eliminata o temporaneamente non disponibile."
        canonical="/404"
        noindex={true}
      />
      <ErrorBoundary>
        <NotFoundContainer>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <ErrorCode>404</ErrorCode>
            <ErrorMessage>Pagina non trovata</ErrorMessage>
            <ErrorDescription>
              La pagina che stai cercando potrebbe essere stata spostata,
              eliminata o temporaneamente non disponibile. Torna alla homepage o
              utilizza la ricerca per trovare ciò di cui hai bisogno.
            </ErrorDescription>
            <ButtonsContainer>
              <Button
                to="/"
                size="large"
                icon={<FaHome />}
                iconPosition="left"
                rounded
              >
                Torna alla Homepage
              </Button>
              <Button
                to="/contatti"
                size="large"
                variant="secondary"
                outlined
                rounded
              >
                Contattaci
              </Button>
            </ButtonsContainer>
          </ScrollAnimation>
        </NotFoundContainer>
      </ErrorBoundary>
    </Layout>
  );
};

export default NotFound;
