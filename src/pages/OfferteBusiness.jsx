import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import {
  FaBuilding,
  FaHandshake,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const PageDescription = styled.p`
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: #666666;
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #0066cc;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666666;
`;

const ContactSection = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 4rem;
`;

const ContactTitle = styled.h2`
  margin-bottom: 1.5rem;
`;

const ContactDescription = styled.p`
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: #666666;
`;

const ContactButton = styled.button`
  background-color: #0066cc;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

const OfferteBusiness = () => {
  return (
    <Layout
      title="Offerte Business"
      description="Soluzioni energetiche su misura per la tua azienda. Scopri le offerte business di Solida-Energia."
    >
      <PageContainer>
        <PageTitle>Soluzioni Energetiche per il tuo Business</PageTitle>
        <PageDescription>
          Offriamo soluzioni personalizzate per aziende di ogni dimensione.
          Consulenza dedicata, tariffe competitive e servizi esclusivi per
          ottimizzare i tuoi costi energetici.
        </PageDescription>

        <FeaturesContainer>
          <FeatureCard>
            <FeatureIcon>
              <FaBuilding />
            </FeatureIcon>
            <FeatureTitle>Soluzioni Personalizzate</FeatureTitle>
            <FeatureDescription>
              Creiamo offerte su misura in base ai consumi e alle
              caratteristiche della tua attività.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaHandshake />
            </FeatureIcon>
            <FeatureTitle>Consulenza Dedicata</FeatureTitle>
            <FeatureDescription>
              Un consulente personale ti aiuterà a trovare la soluzione più
              efficiente per le tue esigenze.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaChartLine />
            </FeatureIcon>
            <FeatureTitle>Monitoraggio Avanzato</FeatureTitle>
            <FeatureDescription>
              Strumenti di monitoraggio dei consumi in tempo reale per
              ottimizzare l'efficienza energetica.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaShieldAlt />
            </FeatureIcon>
            <FeatureTitle>Protezione Prezzi</FeatureTitle>
            <FeatureDescription>
              Opzioni di fissazione dei prezzi per proteggere il tuo business
              dalla volatilità del mercato.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesContainer>

        <ContactSection>
          <ContactTitle>Contatta il nostro Team Business</ContactTitle>
          <ContactDescription>
            Parla con uno dei nostri consulenti dedicati per ricevere un'offerta
            personalizzata in base alle specifiche esigenze della tua azienda.
          </ContactDescription>
          <ContactButton>Richiedi una Consulenza</ContactButton>
        </ContactSection>
      </PageContainer>
    </Layout>
  );
};

export default OfferteBusiness;
