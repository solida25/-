import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Layout from "../components/common/Layout.jsx";
import {
  FaLightbulb,
  FaGasPump,
  FaHandshake,
  FaLeaf,
  FaHeadset,
} from "react-icons/fa";

// Il resto del codice rimane invariato

// Hero Section Styling
const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #0066cc;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  margin: 0 0.5rem 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0055aa;
  }
`;

// Advantages Section Styling
const AdvantagesSection = styled.section`
  padding: 4rem 2rem;
  background-color: white;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
`;

const AdvantagesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const AdvantageCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AdvantageIcon = styled.div`
  font-size: 2.5rem;
  color: #0066cc;
  margin-bottom: 1rem;
`;

const AdvantageTitle = styled.h3`
  margin-bottom: 0.8rem;
`;

const AdvantageDescription = styled.p`
  color: #666666;
`;

// Offers Section Styling
const OffersSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f9fa;
`;

const OffersGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const OfferCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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

const OfferButton = styled(Link)`
  display: block;
  background-color: #0066cc;
  color: white;
  text-align: center;
  padding: 0.8rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0055aa;
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: 4rem 2rem;
  background-color: white;
`;

const TestimonialsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled.div`
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
`;

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
`;

const TestimonialAuthor = styled.p`
  font-weight: bold;
`;

// CTA Section
const CTASection = styled.section`
  padding: 4rem 2rem;
  background-color: #0066cc;
  color: white;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButtonLight = styled(Link)`
  display: inline-block;
  background-color: white;
  color: #0066cc;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Home = () => {
  return (
    <Layout
      title="Home"
      description="Solida-Energia offre soluzioni energetiche affidabili e competitive per privati e aziende. Scopri le nostre offerte di luce e gas."
    >
      {/* Hero Section */}
      <HeroSection>
        <HeroTitle>
          Energia affidabile per la tua casa e la tua azienda
        </HeroTitle>
        <HeroSubtitle>
          Con Solida-Energia ottieni tariffe competitive, servizio clienti
          eccellente e soluzioni energetiche sostenibili.
        </HeroSubtitle>
        <CTAButton to="/offerte-luce">Scopri le Offerte</CTAButton>
        <CTAButton to="/contatti">Contattaci</CTAButton>
      </HeroSection>

      {/* Advantages Section */}
      <AdvantagesSection>
        <SectionTitle>Perché Scegliere Solida-Energia</SectionTitle>
        <AdvantagesGrid>
          <AdvantageCard>
            <AdvantageIcon>
              <FaLightbulb />
            </AdvantageIcon>
            <AdvantageTitle>Tariffe Competitive</AdvantageTitle>
            <AdvantageDescription>
              Offriamo piani tariffari trasparenti e convenienti per soddisfare
              ogni esigenza.
            </AdvantageDescription>
          </AdvantageCard>

          <AdvantageCard>
            <AdvantageIcon>
              <FaHeadset />
            </AdvantageIcon>
            <AdvantageTitle>Servizio Clienti Eccellente</AdvantageTitle>
            <AdvantageDescription>
              Il nostro team di supporto è sempre disponibile per rispondere
              alle tue domande.
            </AdvantageDescription>
          </AdvantageCard>

          <AdvantageCard>
            <AdvantageIcon>
              <FaLeaf />
            </AdvantageIcon>
            <AdvantageTitle>Energia Sostenibile</AdvantageTitle>
            <AdvantageDescription>
              Ci impegniamo a promuovere soluzioni energetiche rispettose
              dell'ambiente.
            </AdvantageDescription>
          </AdvantageCard>

          <AdvantageCard>
            <AdvantageIcon>
              <FaHandshake />
            </AdvantageIcon>
            <AdvantageTitle>Affidabilità Garantita</AdvantageTitle>
            <AdvantageDescription>
              Forniamo energia senza interruzioni, con garanzia di continuità
              del servizio.
            </AdvantageDescription>
          </AdvantageCard>
        </AdvantagesGrid>
      </AdvantagesSection>

      {/* Offers Section */}
      <OffersSection>
        <SectionTitle>Le Nostre Offerte</SectionTitle>
        <OffersGrid>
          <OfferCard>
            <OfferHeader>
              <OfferType>Luce Casa</OfferType>
              <OfferPrice>
                0,07€ <OfferPriceCaption>/kWh</OfferPriceCaption>
              </OfferPrice>
            </OfferHeader>
            <OfferContent>
              <OfferFeatures>
                <OfferFeature>Prezzo bloccato per 12 mesi</OfferFeature>
                <OfferFeature>100% energia verde certificata</OfferFeature>
                <OfferFeature>Nessun deposito cauzionale</OfferFeature>
                <OfferFeature>Attivazione gratuita</OfferFeature>
              </OfferFeatures>
              <OfferButton to="/offerte-luce">Scopri di più</OfferButton>
            </OfferContent>
          </OfferCard>

          <OfferCard>
            <OfferHeader>
              <OfferType>Gas Casa</OfferType>
              <OfferPrice>
                0,28€ <OfferPriceCaption>/Smc</OfferPriceCaption>
              </OfferPrice>
            </OfferHeader>
            <OfferContent>
              <OfferFeatures>
                <OfferFeature>Prezzo bloccato per 12 mesi</OfferFeature>
                <OfferFeature>Compensazione CO2</OfferFeature>
                <OfferFeature>Nessun deposito cauzionale</OfferFeature>
                <OfferFeature>Attivazione gratuita</OfferFeature>
              </OfferFeatures>
              <OfferButton to="/offerte-gas">Scopri di più</OfferButton>
            </OfferContent>
          </OfferCard>

          <OfferCard>
            <OfferHeader>
              <OfferType>Business</OfferType>
              <OfferPrice>
                Tariffe <OfferPriceCaption>personalizzate</OfferPriceCaption>
              </OfferPrice>
            </OfferHeader>
            <OfferContent>
              <OfferFeatures>
                <OfferFeature>Consulenza energetica dedicata</OfferFeature>
                <OfferFeature>Piani tariffari su misura</OfferFeature>
                <OfferFeature>Assistenza prioritaria</OfferFeature>
                <OfferFeature>Analisi consumi avanzata</OfferFeature>
              </OfferFeatures>
              <OfferButton to="/offerte-business">Scopri di più</OfferButton>
            </OfferContent>
          </OfferCard>
        </OffersGrid>
      </OffersSection>

      {/* Testimonials Section */}
      <TestimonialsSection>
        <SectionTitle>Cosa Dicono i Nostri Clienti</SectionTitle>
        <TestimonialsGrid>
          <TestimonialCard>
            <TestimonialText>
              "Da quando sono passato a Solida-Energia, la mia bolletta è
              diminuita del 20%. Il processo di passaggio è stato semplice e
              veloce."
            </TestimonialText>
            <TestimonialAuthor>
              Marco R. - Cliente residenziale
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialText>
              "L'assistenza clienti è eccezionale. Ogni volta che ho avuto un
              dubbio, hanno risposto con cortesia e professionalità."
            </TestimonialText>
            <TestimonialAuthor>
              Laura T. - Cliente residenziale
            </TestimonialAuthor>
          </TestimonialCard>

          <TestimonialCard>
            <TestimonialText>
              "La nostra azienda ha ridotto i costi energetici del 15% grazie al
              piano personalizzato di Solida-Energia. Ottimo servizio di
              consulenza."
            </TestimonialText>
            <TestimonialAuthor>
              Giuseppe M. - Proprietario di un ristorante
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialsGrid>
      </TestimonialsSection>

      {/* CTA Section */}
      <CTASection>
        <CTATitle>Pronto per Risparmiare sulla Bolletta?</CTATitle>
        <CTAText>
          Passa a Solida-Energia oggi stesso e inizia a godere di tariffe
          competitive e servizio clienti eccellente.
        </CTAText>
        <CTAButtonLight to="/offerte-luce">
          Passa a Solida-Energia
        </CTAButtonLight>
      </CTASection>
    </Layout>
  );
};

export default Home;
