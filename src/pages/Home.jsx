import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Layout from "../components/common/Layout.jsx";
import SEO from "../components/seo/SEO";
import StructuredData from "../components/seo/StructuredData";
import ErrorBoundary from "../components/error/ErrorBoundary";
import {
  FaLightbulb,
  FaHeadset,
  FaLeaf,
  FaHandshake,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

// Definizione SEO_CONSTANTS
const SEO_CONSTANTS = {
  DEFAULT_KEYWORDS: [
    "energia",
    "luce",
    "gas",
    "risparmio energetico",
    "sostenibilità",
  ],
};

// Animazioni
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const slideInLeft = keyframes`
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;
const slideInRight = keyframes`
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;
const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// COMPONENTI STILIZZATI

// Icona fluttuante nel Hero (usa animazione "float")
const FloatingIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  animation: ${float} 3s ease-in-out infinite;
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.7);
`;

// Sezione Hero
const HeroSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 8rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}80 0%,
      ${({ theme }) => theme.secondary}80 100%
    );
    z-index: 1;
  }
`;
const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
`;
const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  animation: ${slideUp} 0.8s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.3rem;
  }

  span {
    color: ${({ theme }) => theme.secondary};
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: ${({ theme }) => theme.secondary};
      animation: ${slideInRight} 1s ease-out 0.5s forwards;
      transform-origin: left;
    }
  }
`;
const HeroSubtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 1s ease-out 0.3s forwards;
  opacity: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

// Bottone call-to-action (usa transient prop $secondary)
const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme, $secondary }) =>
    $secondary ? theme.secondary : theme.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: bold;
  margin: 0 0.8rem 1rem;
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px
    ${({ theme, $secondary }) =>
      $secondary ? theme.secondary + "80" : theme.primary + "80"};
  animation: ${fadeIn} 1s ease-out 0.6s forwards;
  opacity: 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px
      ${({ theme, $secondary }) =>
        $secondary ? theme.secondary + "80" : theme.primary + "80"};
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
  }
  &:hover::after {
    transition: 0.5s;
    transform: translateX(100%);
  }
`;
const ButtonIcon = styled.span`
  margin-left: 8px;
  display: inline-block;
  transition: transform 0.3s;
  ${CTAButton}:hover & {
    transform: translateX(5px);
  }
`;

// Sezione Advantages
const AdvantagesSection = styled.section`
  padding: 6rem 2rem;
  background-color: white;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background-color: white;
    transform: skewY(-2deg);
    z-index: 1;
  }
`;
const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  display: inline-block;
  z-index: 2;
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    border-radius: 2px;
  }
`;
const SectionSubtitle = styled.p`
  text-align: center;
  margin-bottom: 3.5rem;
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.textLight};
  font-size: 1.1rem;
`;
const AdvantagesGrid = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
`;
// Card vantaggio con animazione "slideInLeft"
const AdvantageCard = styled.div`
  text-align: center;
  padding: 2.5rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  background-color: white;
  z-index: 2;
  opacity: 0;
  transform: translateX(-50px);
  &.visible {
    animation: ${slideInLeft} 0.8s ease-out forwards;
  }
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  &:hover::before {
    transform: scaleX(1);
  }
`;
const AdvantageIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  display: inline-block;
`;
// Wrapper che applica l'animazione "pulse" al passaggio del mouse
const PulseIcon = styled.div`
  display: inline-block;
  &:hover {
    animation: ${pulse} 1s infinite;
  }
`;
const AdvantageTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
`;
const AdvantageDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
`;

// Sezione Offers
const OffersSection = styled.section`
  padding: 6rem 2rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background-color: ${({ theme }) => theme.backgroundLight};
    transform: skewY(2deg);
    z-index: 1;
  }
`;
const OffersGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  position: relative;
  z-index: 2;
`;
const OfferCard = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all ${({ theme }) => theme.transitions.default};
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`;
const OfferHeader = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  padding: 2rem 1.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.3) 0%,
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.5s;
  }
  ${OfferCard}:hover &::after {
    opacity: 1;
  }
`;
const OfferType = styled.h3`
  margin-bottom: 0.8rem;
  font-size: 1.5rem;
  position: relative;
  display: inline-block;
  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background-color: white;
  }
`;
const OfferPrice = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;
const OfferPriceCaption = styled.span`
  font-size: 1rem;
  font-weight: normal;
  opacity: 0.8;
`;
const OfferContent = styled.div`
  padding: 2rem 1.5rem;
`;
const OfferFeatures = styled.ul`
  margin-bottom: 2rem;
`;
const OfferFeature = styled.li`
  margin-bottom: 1rem;
  position: relative;
  padding-left: 2rem;
  color: ${({ theme }) => theme.textLight};
  &:before {
    content: "✓";
    color: ${({ theme }) => theme.secondary};
    position: absolute;
    left: 0;
    font-weight: bold;
  }
`;
const OfferButton = styled(Link)`
  display: block;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  text-align: center;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: bold;
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
  }
  &:hover::after {
    transition: 0.5s;
    transform: translateX(100%);
  }
`;

// Sezione Testimonials
const TestimonialsSection = styled.section`
  padding: 6rem 2rem;
  background-color: white;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background-color: white;
    transform: skewY(-2deg);
    z-index: 1;
  }
`;
const TestimonialContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;
const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
`;
const TestimonialCard = styled.div`
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  background-color: white;
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
  &::before {
    content: '"';
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 5rem;
    color: ${({ theme }) => theme.primary + "20"};
    font-family: Georgia, serif;
    line-height: 1;
  }
`;
const TestimonialRating = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.secondary};
  font-size: 1.2rem;
  display: flex;
`;
const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textLight};
  position: relative;
  z-index: 1;
`;
const TestimonialAuthor = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  &::before {
    content: "";
    display: inline-block;
    width: 25px;
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
    margin-right: 10px;
  }
`;

// Sezione CTA
const CTASection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    height: 60px;
    background: white;
    transform: skewY(-2deg);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(255,255,255,0.05)" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>')
      no-repeat bottom;
    background-size: cover;
    opacity: 0.1;
  }
`;
const CTAContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`;
const CTATitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;
const CTAText = styled.p`
  margin-bottom: 2.5rem;
  font-size: 1.2rem;
  opacity: 0.9;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;
const CTAButtonLight = styled(Link)`
  display: inline-block;
  background-color: white;
  color: ${({ theme }) => theme.primary};
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: bold;
  transition: all ${({ theme }) => theme.transitions.default};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

// COMPONENTE PRINCIPALE Home
const Home = () => {
  // Observer per animazioni "on scroll"
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));
    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <Layout
      title="Home"
      description="Solida-Energia offre soluzioni energetiche affidabili e competitive per privati e aziende. Scopri le nostre offerte di luce e gas."
    >
      {/* Componente SEO ottimizzato */}
      <SEO
        title="Home"
        description="Energia affidabile e sostenibile per la tua casa e la tua azienda. Tariffe competitive e servizio eccellente per luce e gas."
        canonical="/"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "offerte energia",
          "fornitore luce",
          "fornitore gas",
        ]}
      />

      {/* Dati strutturati per l'organizzazione */}
      <StructuredData
        type="Organization"
        data={{
          name: "Solida-Energia",
          url: "https://solida-energia.it",
          logo: "https://solida-energia.it/assets/images/logo-solida.png",
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "800 123 456",
            contactType: "customer service",
            areaServed: "IT",
            availableLanguage: "Italian",
          },
          sameAs: [
            "https://www.facebook.com/solidaenergia",
            "https://www.instagram.com/solidaenergia",
            "https://twitter.com/solidaenergia",
          ],
        }}
      />

      {/* HERO SECTION */}
      <ErrorBoundary>
        <HeroSection>
          <HeroContent>
            <HeroTitle className="animate-on-scroll">
              Energia <span>affidabile</span> per la tua casa e la tua azienda
            </HeroTitle>
            <HeroSubtitle className="animate-on-scroll">
              Con Solida-Energia ottieni tariffe competitive, servizio clienti
              eccellente e soluzioni energetiche sostenibili.
            </HeroSubtitle>
            <CTAButton to="/offerte-luce" className="animate-on-scroll">
              Scopri le Offerte{" "}
              <ButtonIcon>
                <FaArrowRight />
              </ButtonIcon>
            </CTAButton>
            <CTAButton to="/contatti" $secondary className="animate-on-scroll">
              Contattaci
            </CTAButton>
          </HeroContent>
        </HeroSection>
      </ErrorBoundary>

      {/* ADVANTAGES SECTION */}
      <ErrorBoundary>
        <AdvantagesSection>
          <div className="container">
            <SectionTitle className="animate-on-scroll">
              Perché Scegliere Solida-Energia
            </SectionTitle>
            <SectionSubtitle className="animate-on-scroll">
              Scopri tutti i vantaggi di affidarti a un fornitore che mette al
              primo posto l'affidabilità e la sostenibilità
            </SectionSubtitle>
            <AdvantagesGrid>
              <AdvantageCard className="animate-on-scroll">
                <AdvantageIcon>
                  <PulseIcon>
                    <FaLightbulb />
                  </PulseIcon>
                </AdvantageIcon>
                <AdvantageTitle>Tariffe Competitive</AdvantageTitle>
                <AdvantageDescription>
                  Offriamo piani tariffari trasparenti e convenienti per
                  soddisfare ogni esigenza, senza costi nascosti.
                </AdvantageDescription>
              </AdvantageCard>
              <AdvantageCard className="animate-on-scroll">
                <AdvantageIcon>
                  <PulseIcon>
                    <FaHeadset />
                  </PulseIcon>
                </AdvantageIcon>
                <AdvantageTitle>Servizio Clienti Eccellente</AdvantageTitle>
                <AdvantageDescription>
                  Il nostro team di supporto è sempre disponibile per rispondere
                  alle tue domande e risolvere i tuoi problemi.
                </AdvantageDescription>
              </AdvantageCard>
              <AdvantageCard className="animate-on-scroll">
                <AdvantageIcon>
                  <PulseIcon>
                    <FaLeaf />
                  </PulseIcon>
                </AdvantageIcon>
                <AdvantageTitle>Energia Sostenibile</AdvantageTitle>
                <AdvantageDescription>
                  Ci impegniamo a promuovere soluzioni energetiche rispettose
                  dell'ambiente e a ridurre l'impatto ambientale.
                </AdvantageDescription>
              </AdvantageCard>
              <AdvantageCard className="animate-on-scroll">
                <AdvantageIcon>
                  <PulseIcon>
                    <FaHandshake />
                  </PulseIcon>
                </AdvantageIcon>
                <AdvantageTitle>Affidabilità Garantita</AdvantageTitle>
                <AdvantageDescription>
                  Forniamo energia senza interruzioni, con garanzia di
                  continuità del servizio e assistenza prioritaria.
                </AdvantageDescription>
              </AdvantageCard>
            </AdvantagesGrid>
          </div>
        </AdvantagesSection>
      </ErrorBoundary>

      {/* OFFERS SECTION */}
      <ErrorBoundary>
        <OffersSection>
          <div className="container">
            <SectionTitle className="animate-on-scroll">
              Le Nostre Offerte
            </SectionTitle>
            <SectionSubtitle className="animate-on-scroll">
              Scegli l'offerta più adatta alle tue esigenze tra i nostri piani
              personalizzati
            </SectionSubtitle>
            <OffersGrid>
              <OfferCard className="animate-on-scroll">
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
              <OfferCard className="animate-on-scroll">
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
              <OfferCard className="animate-on-scroll">
                <OfferHeader>
                  <OfferType>Business</OfferType>
                  <OfferPrice>
                    Tariffe{" "}
                    <OfferPriceCaption>personalizzate</OfferPriceCaption>
                  </OfferPrice>
                </OfferHeader>
                <OfferContent>
                  <OfferFeatures>
                    <OfferFeature>Consulenza energetica dedicata</OfferFeature>
                    <OfferFeature>Piani tariffari su misura</OfferFeature>
                    <OfferFeature>Assistenza prioritaria</OfferFeature>
                    <OfferFeature>Analisi consumi avanzata</OfferFeature>
                  </OfferFeatures>
                  <OfferButton to="/offerte-business">
                    Scopri di più
                  </OfferButton>
                </OfferContent>
              </OfferCard>
            </OffersGrid>
          </div>
        </OffersSection>
      </ErrorBoundary>

      {/* TESTIMONIALS SECTION */}
      <ErrorBoundary>
        <TestimonialsSection>
          <TestimonialContainer>
            <SectionTitle className="animate-on-scroll">
              Cosa Dicono i Nostri Clienti
            </SectionTitle>
            <SectionSubtitle className="animate-on-scroll">
              Scopri le esperienze di chi ha già scelto Solida-Energia per la
              propria fornitura
            </SectionSubtitle>
            <TestimonialsGrid>
              <TestimonialCard className="animate-on-scroll">
                <TestimonialRating>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </TestimonialRating>
                <TestimonialText>
                  "Da quando sono passato a Solida-Energia, la mia bolletta è
                  diminuita del 20%. Il processo di passaggio è stato semplice e
                  veloce."
                </TestimonialText>
                <TestimonialAuthor>
                  Marco R. - Cliente residenziale
                </TestimonialAuthor>
              </TestimonialCard>
              <TestimonialCard className="animate-on-scroll">
                <TestimonialRating>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </TestimonialRating>
                <TestimonialText>
                  "L'assistenza clienti è eccezionale. Ogni volta che ho avuto
                  un dubbio, hanno risposto con cortesia e professionalità."
                </TestimonialText>
                <TestimonialAuthor>
                  Laura T. - Cliente residenziale
                </TestimonialAuthor>
              </TestimonialCard>
              <TestimonialCard className="animate-on-scroll">
                <TestimonialRating>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </TestimonialRating>
                <TestimonialText>
                  "La nostra azienda ha ridotto i costi energetici del 15%
                  grazie al piano personalizzato di Solida-Energia. Ottimo
                  servizio di consulenza."
                </TestimonialText>
                <TestimonialAuthor>
                  Giuseppe M. - Proprietario di un ristorante
                </TestimonialAuthor>
              </TestimonialCard>
            </TestimonialsGrid>
          </TestimonialContainer>
        </TestimonialsSection>
      </ErrorBoundary>

      {/* CTA SECTION */}
      <ErrorBoundary>
        <CTASection>
          <CTAContent>
            <CTATitle className="animate-on-scroll">
              Pronto per Risparmiare sulla Bolletta?
            </CTATitle>
            <CTAText className="animate-on-scroll">
              Passa a Solida-Energia oggi stesso e inizia a godere di tariffe
              competitive e servizio clienti eccellente.
            </CTAText>
            <CTAButtonLight to="/offerte-luce" className="animate-on-scroll">
              Passa a Solida-Energia{" "}
              <ButtonIcon>
                <FaArrowRight />
              </ButtonIcon>
            </CTAButtonLight>
          </CTAContent>
        </CTASection>
      </ErrorBoundary>
    </Layout>
  );
};

export default Home;
