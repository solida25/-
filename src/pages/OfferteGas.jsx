import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import { FaCheck, FaCalculator } from "react-icons/fa";

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

const OffersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const OfferCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const OfferHeader = styled.div`
  background-color: #0066cc;
  color: white;
  padding: 1.5rem;
  text-align: center;
`;

const OfferType = styled.h3`
  margin-bottom: 0.5rem;
`;

const OfferPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const OfferPriceCaption = styled.span`
  font-size: 1rem;
  font-weight: normal;
`;

const OfferContent = styled.div`
  padding: 1.5rem;
`;

const OfferFeatures = styled.ul`
  margin-bottom: 2rem;
`;

const OfferFeature = styled.li`
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "✓";
    color: #0066cc;
    position: absolute;
    left: 0;
  }
`;

const OfferButton = styled.button`
  display: block;
  width: 100%;
  background-color: #0066cc;
  color: white;
  text-align: center;
  padding: 0.8rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

const OfferteGas = () => {
  return (
    <Layout
      title="Offerte Gas"
      description="Scopri le offerte di gas di Solida-Energia per la tua casa. Tariffe competitive e servizio eccellente."
    >
      <PageContainer>
        <PageTitle>Offerte Gas per la tua Casa</PageTitle>
        <PageDescription>
          Scegli l'offerta gas più adatta alle tue esigenze. Tariffe
          trasparenti, assistenza dedicata e un servizio clienti sempre a tua
          disposizione.
        </PageDescription>

        <OffersContainer>
          <OfferCard>
            <OfferHeader>
              <OfferType>Gas Basic</OfferType>
              <OfferPrice>
                0,30€ <OfferPriceCaption>/Smc</OfferPriceCaption>
              </OfferPrice>
            </OfferHeader>
            <OfferContent>
              <OfferFeatures>
                <OfferFeature>Prezzo bloccato per 12 mesi</OfferFeature>
                <OfferFeature>Nessun deposito cauzionale</OfferFeature>
                <OfferFeature>Attivazione gratuita</OfferFeature>
                <OfferFeature>Compensazione CO2</OfferFeature>
              </OfferFeatures>
              <OfferButton>Attiva ora</OfferButton>
            </OfferContent>
          </OfferCard>

          <OfferCard>
            <OfferHeader>
              <OfferType>Gas Smart</OfferType>
              <OfferPrice>
                0,28€ <OfferPriceCaption>/Smc</OfferPriceCaption>
              </OfferPrice>
            </OfferHeader>
            <OfferContent>
              <OfferFeatures>
                <OfferFeature>Prezzo bloccato per 24 mesi</OfferFeature>
                <OfferFeature>Monitoraggio consumi in tempo reale</OfferFeature>
                <OfferFeature>Attivazione gratuita</OfferFeature>
                <OfferFeature>Compensazione CO2</OfferFeature>
              </OfferFeatures>
              <OfferButton>Attiva ora</OfferButton>
            </OfferContent>
          </OfferCard>

          <OfferCard>
            <OfferHeader>
              <OfferType>Gas Premium</OfferType>
              <OfferPrice>
                0,27€ <OfferPriceCaption>/Smc</OfferPriceCaption>
              </OfferPrice>
            </OfferHeader>
            <OfferContent>
              <OfferFeatures>
                <OfferFeature>Prezzo bloccato per 36 mesi</OfferFeature>
                <OfferFeature>Monitoraggio consumi in tempo reale</OfferFeature>
                <OfferFeature>Assistenza prioritaria 24/7</OfferFeature>
                <OfferFeature>Manutenzione caldaia inclusa</OfferFeature>
                <OfferFeature>Compensazione CO2</OfferFeature>
              </OfferFeatures>
              <OfferButton>Attiva ora</OfferButton>
            </OfferContent>
          </OfferCard>
        </OffersContainer>
      </PageContainer>
    </Layout>
  );
};

export default OfferteGas;
