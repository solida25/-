import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import ParallaxHero from "../components/common/ParallaxHero.jsx";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import SEO from "../components/seo/SEO";
import StructuredData from "../components/seo/StructuredData";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { SEO_CONSTANTS } from "../utils/seoConstants";
import {
  FaBuilding,
  FaHandshake,
  FaChartLine,
  FaShieldAlt,
  FaUserTie,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaRegLightbulb,
  FaGasPump,
  FaBolt,
  FaSolarPanel,
} from "react-icons/fa";

/* Styled Components */
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.3rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
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
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 3rem;
  max-width: 800px;
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
  background-color: white;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background-color: white;
    transform: skewY(-2deg);
    z-index: -1;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(Card)`
  height: 100%;
  text-align: center;
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}20,
    ${({ theme }) => theme.secondary}20
  );
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 1.5rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    border: 2px dashed ${({ theme }) => theme.primary}50;
    animation: spin 30s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.4rem;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
`;

const SolutionsSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.backgroundLight};
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 70px;
    background-color: white;
    z-index: 1;
  }

  &::before {
    top: -35px;
    transform: skewY(2deg);
  }

  &::after {
    bottom: -35px;
    transform: skewY(-2deg);
    z-index: 1;
  }
`;

const SolutionsContent = styled.div`
  position: relative;
  z-index: 2;
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SolutionCard = styled(Card)`
  height: 100%;
  overflow: visible;

  ${({ isPopular, theme }) =>
    isPopular &&
    `
    position: relative;

    &::before {
      content: 'Più richiesto';
      position: absolute;
      top: -15px;
      right: 20px;
      background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      z-index: 2;
    }
  `}
`;

const SolutionHeader = styled.div`
  padding: 2rem 1.5rem;
  background: ${({ theme, variant }) => {
    switch (variant) {
      case "luce":
        return `linear-gradient(135deg, #FFD700, #FFA500)`;
      case "gas":
        return `linear-gradient(135deg, #4169E1, #1E90FF)`;
      case "dual":
        return `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;
      default:
        return `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`;
    }
  }};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium}
    ${({ theme }) => theme.borderRadius.medium} 0 0;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path opacity=".5" d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"/></g></g></svg>');
    opacity: 0.5;
  }
`;

const SolutionIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SolutionIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
`;

const SolutionTitle = styled.h3`
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const SolutionSubtitle = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0;
`;

const SolutionContent = styled.div`
  padding: 2rem 1.5rem;
`;

const SolutionFeatures = styled.ul`
  margin-bottom: 2rem;
  list-style: none;
  padding: 0;
`;

const SolutionFeature = styled.li`
  margin-bottom: 1rem;
  position: relative;
  padding-left: 2rem;
  color: ${({ theme, important }) =>
    important ? theme.text : theme.textLight};
  font-weight: ${({ important }) => (important ? "bold" : "normal")};

  &:before {
    content: "✓";
    color: ${({ theme, variant }) => {
      switch (variant) {
        case "luce":
          return "#FFA500";
        case "gas":
          return "#1E90FF";
        case "dual":
          return theme.secondary;
        default:
          return theme.primary;
      }
    }};
    position: absolute;
    left: 0;
    font-weight: bold;
  }
`;

const BusinessTypesSection = styled.section`
  padding: 7rem 0 5rem;
  background-color: white;
  position: relative;
  z-index: 2;
`;

const BusinessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const BusinessCard = styled(Card)`
  height: 100%;
  padding: 0;
  overflow: hidden;
`;

const BusinessImage = styled.div`
  height: 180px;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const BusinessName = styled.h3`
  position: absolute;
  bottom: 1rem;
  left: 1.5rem;
  color: white;
  margin: 0;
  font-size: 1.4rem;
  z-index: 2;
`;

const BusinessContent = styled.div`
  padding: 1.5rem;
`;

const BusinessDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 1.5rem;
`;

const BusinessFeatures = styled.ul`
  margin-bottom: 1.5rem;
  list-style: none;
  padding: 0;
`;

const BusinessFeature = styled.li`
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.textLight};

  &:before {
    content: "•";
    color: ${({ theme }) => theme.primary};
    position: absolute;
    left: 0;
    font-weight: bold;
  }
`;

const ConsultingSection = styled.section`
  padding: 5rem 0;
  background:
    linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}DD,
      ${({ theme }) => theme.secondary}DD
    ),
    url("https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")
      center/cover;
  color: white;
  position: relative;
`;

const ConsultingContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConsultingTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ConsultingDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  max-width: 800px;
  text-align: center;
`;

const ConsultingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-bottom: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ConsultingCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ConsultingIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
`;

const ConsultingItemTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const ConsultingItemDescription = styled.p`
  opacity: 0.8;
`;

const ContactSection = styled.section`
  padding: 7rem 0 5rem;
  background-color: white;
  position: relative;
  z-index: 1;
`;

const ContactCard = styled(Card)`
  max-width: 900px;
  margin: 0 auto;
  padding: 2.5rem;
`;

const ContactTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const ContactDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 2rem;
`;

const ContactForm = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ContactOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ContactInfo = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.primary}15;
  color: ${({ theme }) => theme.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const ContactText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactLabel = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.3rem;
`;

const ContactValue = styled.span`
  color: ${({ theme }) => theme.textLight};
`;

const ContactActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/* OfferteBusiness Component */
const OfferteBusiness = () => {
  // I dati strutturati per il SEO
  const offerteBusinessStructuredData = {
    "@type": "Service",
    name: "Soluzioni Energetiche per Aziende",
    provider: {
      "@type": "Organization",
      name: "Solida-Energia",
    },
    description:
      "Soluzioni energetiche personalizzate per aziende di ogni dimensione, con consulenza dedicata, tariffe competitive e servizi esclusivi.",
    serviceType: "Fornitura Energia",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      offerCount: 3,
      highPrice: "0.28",
      lowPrice: "0.068",
    },
    areaServed: "IT",
  };

  const businessSectorsStructuredData = {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Soluzioni per Retail e Negozi",
          description:
            "Soluzioni su misura per negozi, centri commerciali e punti vendita al dettaglio, con focus sulla riduzione dei costi per illuminazione e climatizzazione.",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Soluzioni per Ristoranti e Hotel",
          description:
            "Offerte pensate per le esigenze specifiche del settore HoReCa, con attenzione ai consumi continuativi e ai picchi di utilizzo.",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "Soluzioni per Uffici e Coworking",
          description:
            "Energie efficienti per spazi di lavoro, con soluzioni per contenere i costi e migliorare la sostenibilità ambientale.",
        },
      },
    ],
  };

  return (
    <Layout
      title="Offerte Business"
      description="Soluzioni energetiche su misura per la tua azienda. Scopri le offerte business di Solida-Energia."
    >
      <SEO
        title="Offerte Business"
        description="Soluzioni energetiche personalizzate per aziende di ogni dimensione. Consulenza dedicata, tariffe competitive e servizi esclusivi per ottimizzare i tuoi costi energetici."
        canonical="/offerte-business"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "energia business",
          "offerte aziende",
          "soluzioni energetiche",
          "efficienza energetica",
        ]}
      />

      <StructuredData type="Service" data={offerteBusinessStructuredData} />
      <StructuredData type="ItemList" data={businessSectorsStructuredData} />

      {/* Hero Section */}
      <ErrorBoundary>
        <ParallaxHero
          backgroundImage="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          height="60vh"
        >
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <HeroTitle>Soluzioni Energetiche per il tuo Business</HeroTitle>
            <HeroDescription>
              Offriamo soluzioni personalizzate per aziende di ogni dimensione.
              Consulenza dedicata, tariffe competitive e servizi esclusivi per
              ottimizzare i tuoi costi energetici.
            </HeroDescription>
            <Button
              size="large"
              rounded
              shimmer
              icon={<FaArrowRight />}
              iconPosition="right"
              to="#solutions"
            >
              Scopri le Soluzioni
            </Button>
          </ScrollAnimation>
        </ParallaxHero>
      </ErrorBoundary>

      {/* Sezioni principali */}
      <ErrorBoundary>
        <FeaturesSection>
          <PageContainer>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <SectionTitle>Perché Scegliere Solida-Energia</SectionTitle>
                <SectionSubtitle style={{ margin: "2rem auto" }}>
                  Un partner energetico affidabile per la tua azienda, con
                  soluzioni su misura per ottimizzare costi e consumi
                </SectionSubtitle>
              </div>
            </ScrollAnimation>

            <FeaturesGrid>
              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.1s"
              >
                <FeatureCard
                  elevation="medium"
                  padding="2rem"
                  hoverEffect="lift"
                >
                  <FeatureIcon>
                    <FaBuilding />
                  </FeatureIcon>
                  <FeatureTitle>Soluzioni Personalizzate</FeatureTitle>
                  <FeatureDescription>
                    Creiamo offerte su misura in base ai consumi e alle
                    caratteristiche della tua attività.
                  </FeatureDescription>
                </FeatureCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.2s"
              >
                <FeatureCard
                  elevation="medium"
                  padding="2rem"
                  hoverEffect="lift"
                >
                  <FeatureIcon>
                    <FaHandshake />
                  </FeatureIcon>
                  <FeatureTitle>Consulenza Dedicata</FeatureTitle>
                  <FeatureDescription>
                    Un consulente personale ti aiuterà a trovare la soluzione
                    più efficiente per le tue esigenze.
                  </FeatureDescription>
                </FeatureCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.3s"
              >
                <FeatureCard
                  elevation="medium"
                  padding="2rem"
                  hoverEffect="lift"
                >
                  <FeatureIcon>
                    <FaChartLine />
                  </FeatureIcon>
                  <FeatureTitle>Monitoraggio Avanzato</FeatureTitle>
                  <FeatureDescription>
                    Strumenti di monitoraggio dei consumi in tempo reale per
                    ottimizzare l'efficienza energetica.
                  </FeatureDescription>
                </FeatureCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.4s"
              >
                <FeatureCard
                  elevation="medium"
                  padding="2rem"
                  hoverEffect="lift"
                >
                  <FeatureIcon>
                    <FaShieldAlt />
                  </FeatureIcon>
                  <FeatureTitle>Protezione Prezzi</FeatureTitle>
                  <FeatureDescription>
                    Opzioni di fissazione dei prezzi per proteggere il tuo
                    business dalla volatilità del mercato.
                  </FeatureDescription>
                </FeatureCard>
              </ScrollAnimation>
            </FeaturesGrid>
          </PageContainer>
        </FeaturesSection>
      </ErrorBoundary>

      <ErrorBoundary>
        <SolutionsSection id="solutions">
          <SolutionsContent>
            <PageContainer>
              <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                  <SectionTitle>Le Nostre Soluzioni</SectionTitle>
                  <SectionSubtitle style={{ margin: "2rem auto" }}>
                    Scegli la soluzione più adatta alle esigenze della tua
                    azienda
                  </SectionSubtitle>
                </div>
              </ScrollAnimation>

              <SolutionsGrid>
                <ScrollAnimation
                  animationType={ScrollAnimation.types.SLIDE_UP}
                  delay="0.1s"
                >
                  <SolutionCard elevation="medium" hoverEffect="lift">
                    <SolutionHeader variant="luce">
                      <SolutionIconContainer>
                        <SolutionIcon>
                          <FaRegLightbulb />
                        </SolutionIcon>
                      </SolutionIconContainer>
                      <SolutionTitle>Energia Elettrica</SolutionTitle>
                      <SolutionSubtitle>
                        Per tutte le attività commerciali
                      </SolutionSubtitle>
                    </SolutionHeader>
                    <SolutionContent>
                      <SolutionFeatures>
                        <SolutionFeature variant="luce">
                          Tariffe personalizzate in base ai consumi
                        </SolutionFeature>
                        <SolutionFeature variant="luce" important>
                          Prezzo fisso o indicizzato, a tua scelta
                        </SolutionFeature>
                        <SolutionFeature variant="luce">
                          100% energia da fonti rinnovabili
                        </SolutionFeature>
                        <SolutionFeature variant="luce">
                          Consulenza per ottimizzare i consumi
                        </SolutionFeature>
                        <SolutionFeature variant="luce" important>
                          Monitoraggio consumi in tempo reale
                        </SolutionFeature>
                        <SolutionFeature variant="luce">
                          Assistenza dedicata
                        </SolutionFeature>
                      </SolutionFeatures>
                      <Button fullWidth icon={<FaArrowRight />} color="#FFA500">
                        Richiedi Preventivo
                      </Button>
                    </SolutionContent>
                  </SolutionCard>
                </ScrollAnimation>

                <ScrollAnimation
                  animationType={ScrollAnimation.types.SLIDE_UP}
                  delay="0.2s"
                >
                  <SolutionCard elevation="medium" hoverEffect="lift">
                    <SolutionHeader variant="gas">
                      <SolutionIconContainer>
                        <SolutionIcon>
                          <FaGasPump />
                        </SolutionIcon>
                      </SolutionIconContainer>
                      <SolutionTitle>Gas Naturale</SolutionTitle>
                      <SolutionSubtitle>
                        Per riscaldamento e processi produttivi
                      </SolutionSubtitle>
                    </SolutionHeader>
                    <SolutionContent>
                      <SolutionFeatures>
                        <SolutionFeature variant="gas">
                          Tariffe competitive per ogni consumo
                        </SolutionFeature>
                        <SolutionFeature variant="gas" important>
                          Prezzo bloccato fino a 36 mesi
                        </SolutionFeature>
                        <SolutionFeature variant="gas">
                          Compensazione CO2
                        </SolutionFeature>
                        <SolutionFeature variant="gas">
                          Analisi dell'efficienza degli impianti
                        </SolutionFeature>
                        <SolutionFeature variant="gas" important>
                          Gestione pratiche burocratiche
                        </SolutionFeature>
                        <SolutionFeature variant="gas">
                          Assistenza prioritaria
                        </SolutionFeature>
                      </SolutionFeatures>
                      <Button fullWidth icon={<FaArrowRight />} color="#1E90FF">
                        Richiedi Preventivo
                      </Button>
                    </SolutionContent>
                  </SolutionCard>
                </ScrollAnimation>

                <ScrollAnimation
                  animationType={ScrollAnimation.types.SLIDE_UP}
                  delay="0.3s"
                >
                  <SolutionCard elevation="medium" hoverEffect="lift" isPopular>
                    <SolutionHeader variant="dual">
                      <SolutionIconContainer>
                        <SolutionIcon>
                          <FaBolt />
                        </SolutionIcon>
                      </SolutionIconContainer>
                      <SolutionTitle>Dual Fuel</SolutionTitle>
                      <SolutionSubtitle>
                        La soluzione integrata per risparmiare
                      </SolutionSubtitle>
                    </SolutionHeader>
                    <SolutionContent>
                      <SolutionFeatures>
                        <SolutionFeature variant="dual" important>
                          Sconto esclusivo con doppia fornitura
                        </SolutionFeature>
                        <SolutionFeature variant="dual">
                          Gestione unica di luce e gas
                        </SolutionFeature>
                        <SolutionFeature variant="dual" important>
                          Un solo referente per entrambe le forniture
                        </SolutionFeature>
                        <SolutionFeature variant="dual">
                          Fatturazione unificata per semplificare la gestione
                        </SolutionFeature>
                        <SolutionFeature variant="dual">
                          Report dettagliati sui consumi
                        </SolutionFeature>
                        <SolutionFeature variant="dual" important>
                          Consulenza energetica completa
                        </SolutionFeature>
                      </SolutionFeatures>
                      <Button
                        fullWidth
                        variant="secondary"
                        icon={<FaArrowRight />}
                      >
                        Richiedi Preventivo
                      </Button>
                    </SolutionContent>
                  </SolutionCard>
                </ScrollAnimation>
              </SolutionsGrid>
            </PageContainer>
          </SolutionsContent>
        </SolutionsSection>
      </ErrorBoundary>

      <ErrorBoundary>
        <BusinessTypesSection>
          <PageContainer>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <SectionTitle>Soluzioni per ogni Settore</SectionTitle>
                <SectionSubtitle style={{ margin: "2rem auto" }}>
                  Ogni attività ha esigenze energetiche diverse. Scopri le
                  soluzioni specifiche per il tuo settore.
                </SectionSubtitle>
              </div>
            </ScrollAnimation>

            <BusinessGrid>
              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.1s"
              >
                <BusinessCard elevation="medium" hoverEffect="lift">
                  <BusinessImage image="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
                    <BusinessName>Retail e Negozi</BusinessName>
                  </BusinessImage>
                  <BusinessContent>
                    <BusinessDescription>
                      Soluzioni su misura per negozi, centri commerciali e punti
                      vendita al dettaglio, con focus sulla riduzione dei costi
                      per illuminazione e climatizzazione.
                    </BusinessDescription>
                    <BusinessFeatures>
                      <BusinessFeature>
                        Tariffe ottimizzate per gli orari di apertura
                      </BusinessFeature>
                      <BusinessFeature>
                        Sistemi di illuminazione efficiente
                      </BusinessFeature>
                      <BusinessFeature>
                        Monitoraggio dei consumi per punto vendita
                      </BusinessFeature>
                    </BusinessFeatures>
                    <Button
                      fullWidth
                      variant="secondary"
                      outlined
                      to="#contact"
                    >
                      Scopri di più
                    </Button>
                  </BusinessContent>
                </BusinessCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.2s"
              >
                <BusinessCard elevation="medium" hoverEffect="lift">
                  <BusinessImage image="https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
                    <BusinessName>Ristoranti e Hotel</BusinessName>
                  </BusinessImage>
                  <BusinessContent>
                    <BusinessDescription>
                      Offerte pensate per le esigenze specifiche del settore
                      HoReCa, con attenzione ai consumi continuativi e ai picchi
                      di utilizzo.
                    </BusinessDescription>
                    <BusinessFeatures>
                      <BusinessFeature>
                        Tariffe studiate per consumi intensivi
                      </BusinessFeature>
                      <BusinessFeature>
                        Soluzioni dual fuel per cucine professionali
                      </BusinessFeature>
                      <BusinessFeature>
                        Consulenza per ridurre i costi in bassa stagione
                      </BusinessFeature>
                    </BusinessFeatures>
                    <Button
                      fullWidth
                      variant="secondary"
                      outlined
                      to="#contact"
                    >
                      Scopri di più
                    </Button>
                  </BusinessContent>
                </BusinessCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.3s"
              >
                <BusinessCard elevation="medium" hoverEffect="lift">
                  <BusinessImage image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80">
                    <BusinessName>Uffici e Coworking</BusinessName>
                  </BusinessImage>
                  <BusinessContent>
                    <BusinessDescription>
                      Energie efficienti per spazi di lavoro, con soluzioni per
                      contenere i costi e migliorare la sostenibilità
                      ambientale.
                    </BusinessDescription>
                    <BusinessFeatures>
                      <BusinessFeature>
                        Tariffe orarie ottimizzate per orari d'ufficio
                      </BusinessFeature>
                      <BusinessFeature>
                        Certificazioni verdi per policy aziendali
                      </BusinessFeature>
                      <BusinessFeature>
                        Sistemi di monitoraggio per ogni area
                      </BusinessFeature>
                    </BusinessFeatures>
                    <Button
                      fullWidth
                      variant="secondary"
                      outlined
                      to="#contact"
                    >
                      Scopri di più
                    </Button>
                  </BusinessContent>
                </BusinessCard>
              </ScrollAnimation>
            </BusinessGrid>
          </PageContainer>
        </BusinessTypesSection>
      </ErrorBoundary>

      <ErrorBoundary>
        <ConsultingSection>
          <ConsultingContent>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <ConsultingTitle>Consulenza Energetica Avanzata</ConsultingTitle>
              <ConsultingDescription>
                Il nostro team di esperti ti aiuta a ottimizzare i consumi e
                ridurre i costi energetici della tua azienda
              </ConsultingDescription>
            </ScrollAnimation>

            <ConsultingGrid>
              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.1s"
              >
                <ConsultingCard>
                  <ConsultingIcon>
                    <FaChartLine />
                  </ConsultingIcon>
                  <ConsultingItemTitle>Analisi dei Consumi</ConsultingItemTitle>
                  <ConsultingItemDescription>
                    Studiamo i tuoi profili di consumo per identificare
                    inefficienze e opportunità di risparmio.
                  </ConsultingItemDescription>
                </ConsultingCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.2s"
              >
                <ConsultingCard>
                  <ConsultingIcon>
                    <FaSolarPanel />
                  </ConsultingIcon>
                  <ConsultingItemTitle>Energie Rinnovabili</ConsultingItemTitle>
                  <ConsultingItemDescription>
                    Valutazione di soluzioni di autoproduzione e consulenza
                    sugli incentivi disponibili.
                  </ConsultingItemDescription>
                </ConsultingCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.3s"
              >
                <ConsultingCard>
                  <ConsultingIcon>
                    <FaUserTie />
                  </ConsultingIcon>
                  <ConsultingItemTitle>
                    Consulenza Personalizzata
                  </ConsultingItemTitle>
                  <ConsultingItemDescription>
                    Un energy manager dedicato per le tue esigenze specifiche di
                    business.
                  </ConsultingItemDescription>
                </ConsultingCard>
              </ScrollAnimation>
            </ConsultingGrid>

            <ScrollAnimation
              animationType={ScrollAnimation.types.FADE_IN}
              delay="0.4s"
            >
              <Button
                variant="white"
                size="large"
                rounded
                elevation
                icon={<FaArrowRight />}
                to="#contact"
              >
                Richiedi Consulenza
              </Button>
            </ScrollAnimation>
          </ConsultingContent>
        </ConsultingSection>
      </ErrorBoundary>

      <ErrorBoundary>
        <ContactSection id="contact">
          <PageContainer>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <SectionTitle>Contatta il nostro Team Business</SectionTitle>
                <SectionSubtitle style={{ margin: "2rem auto" }}>
                  Parla con uno dei nostri consulenti dedicati per ricevere
                  un'offerta personalizzata
                </SectionSubtitle>
              </div>
            </ScrollAnimation>

            <ScrollAnimation
              animationType={ScrollAnimation.types.FADE_IN}
              delay="0.2s"
            >
              <ContactCard elevation="medium">
                <ContactForm>
                  <ContactOptions>
                    <ContactInfo>
                      <ContactTitle>Team Business</ContactTitle>
                      <ContactDescription>
                        I nostri esperti sono pronti ad aiutarti a trovare la
                        soluzione migliore per la tua azienda.
                      </ContactDescription>

                      <ContactItem>
                        <ContactIcon>
                          <FaPhoneAlt />
                        </ContactIcon>
                        <ContactText>
                          <ContactLabel>Telefono</ContactLabel>
                          <ContactValue>800 456 789</ContactValue>
                        </ContactText>
                      </ContactItem>

                      <ContactItem>
                        <ContactIcon>
                          <FaEnvelope />
                        </ContactIcon>
                        <ContactText>
                          <ContactLabel>Email</ContactLabel>
                          <ContactValue>
                            business@solida-energia.it
                          </ContactValue>
                        </ContactText>
                      </ContactItem>

                      <ContactItem>
                        <ContactIcon>
                          <FaCalendarAlt />
                        </ContactIcon>
                        <ContactText>
                          <ContactLabel>Orari</ContactLabel>
                          <ContactValue>Lun-Ven: 9:00-18:00</ContactValue>
                        </ContactText>
                      </ContactItem>
                    </ContactInfo>

                    <ContactActions>
                      <Button
                        fullWidth
                        size="large"
                        icon={<FaPhoneAlt />}
                        iconPosition="left"
                      >
                        Richiedi una Chiamata
                      </Button>
                      <Button
                        fullWidth
                        variant="secondary"
                        size="large"
                        icon={<FaCalendarAlt />}
                        iconPosition="left"
                      >
                        Prenota un Appuntamento
                      </Button>
                    </ContactActions>
                  </ContactOptions>

                  <div>
                    <iframe
                      title="Company Map"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{
                        border: 0,
                        minHeight: "300px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                      src="about:blank"
                      allowFullScreen=""
                      aria-hidden="false"
                      tabIndex="0"
                    >
                      Mappa caricamento in corso...
                    </iframe>
                  </div>
                </ContactForm>
              </ContactCard>
            </ScrollAnimation>
          </PageContainer>
        </ContactSection>
      </ErrorBoundary>
    </Layout>
  );
};

export default OfferteBusiness;
