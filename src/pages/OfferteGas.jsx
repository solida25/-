import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import ParallaxHero from "../components/common/ParallaxHero.jsx";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import CalculatorSection from "../components/CalculatorSection.jsx";
import SEO from "../components/seo/SEO";
import StructuredData from "../components/seo/StructuredData";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { SEO_CONSTANTS } from "../utils/seoConstants";
import {
  FaGasPump,
  FaCalculator,
  FaCheckCircle,
  FaArrowRight,
  FaInfoCircle,
  FaChevronDown,
} from "react-icons/fa";

/* Definizione dei dati strutturati per le offerte gas */
const offerteGasStructuredData = [
  {
    "@type": "Product",
    name: "Gas Basic",
    description:
      "Offerta di gas naturale con prezzo bloccato per 12 mesi, compensazione CO2 e nessun deposito cauzionale.",
    brand: { "@type": "Brand", name: "Solida-Energia" },
    offers: {
      "@type": "Offer",
      price: "0.28",
      priceCurrency: "EUR",
      priceValidUntil: "2024-12-31",
      availability: "https://schema.org/InStock",
    },
  },
  {
    "@type": "Product",
    name: "Gas Smart",
    description:
      "Offerta di gas naturale con prezzo bloccato per 24 mesi, compensazione CO2 inclusa e monitoraggio consumi in tempo reale.",
    brand: { "@type": "Brand", name: "Solida-Energia" },
    offers: {
      "@type": "Offer",
      price: "0.275",
      priceCurrency: "EUR",
      priceValidUntil: "2024-12-31",
      availability: "https://schema.org/InStock",
    },
  },
  {
    "@type": "Product",
    name: "Gas Premium",
    description:
      "Offerta di gas naturale con prezzo bloccato per 36 mesi, compensazione CO2 inclusa e assistenza prioritaria 24/7.",
    brand: { "@type": "Brand", name: "Solida-Energia" },
    offers: {
      "@type": "Offer",
      price: "0.270",
      priceCurrency: "EUR",
      priceValidUntil: "2024-12-31",
      availability: "https://schema.org/InStock",
    },
  },
];

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

const OffersSection = styled.section`
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

const OffersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

/* Componenti Offerta – Card */
const OfferCard = styled(Card)`
  height: 100%;
  transition: all 0.4s ease;
  overflow: visible;
  ${({ $isPopular, theme }) =>
    $isPopular &&
    `
    position: relative;
    &::before {
      content: 'Più popolare';
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
      z-index: 10;
    }
    transform: scale(1.05);
    @media (max-width: ${theme.breakpoints.lg}) {
      transform: scale(1);
      margin-top: 20px;
    }
  `}
`;

const OfferHeader = styled.div`
  background: ${({ $isPopular, theme }) =>
    $isPopular
      ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
      : `linear-gradient(135deg, ${theme.primary}DD, ${theme.primary})`};
  color: white;
  padding: 2rem 1.5rem;
  text-align: center;
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
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9z"/></g></g></svg>')
      no-repeat bottom;
    opacity: 0.5;
  }
`;

const OfferIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.8rem;
`;

const OfferType = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
`;

const OfferPrice = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1rem 0;
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
  list-style: none;
  padding: 0;
`;

const OfferFeature = styled.li`
  margin-bottom: 1rem;
  position: relative;
  padding-left: 2rem;
  color: ${({ theme, $isHighlighted }) =>
    $isHighlighted ? theme.text : theme.textLight};
  font-weight: ${({ $isHighlighted }) => ($isHighlighted ? "bold" : "normal")};
  &:before {
    content: "✓";
    color: ${({ theme, $isHighlighted }) =>
      $isHighlighted ? theme.secondary : theme.primary};
    position: absolute;
    left: 0;
    font-weight: bold;
  }
`;

/* STEPS SECTION */
const StepsSection = styled.section`
  padding: 7rem 0 5rem;
  background-color: white;
  position: relative;
  z-index: 1;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled(Card)`
  text-align: center;
  height: 100%;
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
`;

/* FAQ SECTION */
const FAQSection = styled.section`
  padding: 7rem 0 5rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -35px;
    left: 0;
    right: 0;
    height: 70px;
    background-color: white;
    transform: skewY(2deg);
    z-index: 1;
  }
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const FAQQuestion = styled.div`
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ $isOpen, theme }) => ($isOpen ? "#f9f9f9" : "white")};
  &:hover {
    background-color: #f9f9f9;
  }
`;

const QuestionText = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ $isOpen, theme }) => ($isOpen ? theme.primary : theme.text)};
`;

const IconContainer = styled.div`
  color: ${({ $isOpen, theme }) => ($isOpen ? theme.primary : theme.textLight)};
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const FAQAnswer = styled.div`
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  overflow: hidden;
  transition:
    max-height 0.5s ease,
    opacity 0.3s ease,
    padding 0.3s ease;
  padding: ${({ $isOpen }) => ($isOpen ? "0 1.5rem 1.5rem" : "0 1.5rem")};
`;

const FAQText = styled.p`
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  margin: 0;
`;

/* CTA SECTION */
const CTASection = styled.section`
  padding: 5rem 0;
  background:
    linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}DD,
      ${({ theme }) => theme.secondary}DD
    ),
    url("https://images.unsplash.com/photo-1518291344630-4857135fb581?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")
      center/cover;
  color: white;
  text-align: center;
  position: relative;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const OfferteGas = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <Layout
      title="Offerte Gas"
      description="Scopri le offerte di gas naturale di Solida-Energia per la tua casa. Tariffe competitive e servizio eccellente."
    >
      <SEO
        title="Offerte Gas"
        description="Scegli l'offerta di gas più adatta alle tue esigenze. Tariffe trasparenti, compensazione CO2 e un servizio clienti sempre a tua disposizione."
        canonical="/offerte-gas"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "offerte gas",
          "gas naturale",
          "tariffe gas",
          "compensazione CO2",
        ]}
      />

      <StructuredData
        type="ItemList"
        data={{
          itemListElement: offerteGasStructuredData.map((offerta, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: offerta,
          })),
        }}
      />

      {/* HERO SECTION */}
      <ErrorBoundary>
        <ParallaxHero
          backgroundImage="https://images.unsplash.com/photo-1585849835263-84fa85743e66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          height="60vh"
        >
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <HeroTitle>Offerte Gas per la tua Casa</HeroTitle>
            <HeroDescription>
              Scegli l'offerta di gas più adatta alle tue esigenze. Tariffe
              trasparenti, compensazione CO2 e un servizio clienti sempre a tua
              disposizione.
            </HeroDescription>
            <Button
              size="large"
              rounded
              shimmer
              icon={<FaArrowRight />}
              iconPosition="right"
              to="#offerte"
            >
              Scopri le Offerte
            </Button>
          </ScrollAnimation>
        </ParallaxHero>
      </ErrorBoundary>

      {/* OFFERS SECTION */}
      <ErrorBoundary>
        <OffersSection id="offerte">
          <PageContainer>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <SectionTitle>Le Nostre Offerte Gas</SectionTitle>
                <SectionSubtitle style={{ margin: "2rem auto" }}>
                  Tariffe competitive e personalizzate per ogni esigenza di
                  consumo. Scegli l'offerta più adatta a te.
                </SectionSubtitle>
              </div>
            </ScrollAnimation>
            <OffersGrid>
              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.1s"
              >
                <OfferCard elevation="medium" hoverEffect="lift">
                  <OfferHeader>
                    <OfferIcon>
                      <FaGasPump />
                    </OfferIcon>
                    <OfferType>Gas Basic</OfferType>
                    <OfferPrice>
                      0.28€ <OfferPriceCaption>/Smc</OfferPriceCaption>
                    </OfferPrice>
                  </OfferHeader>
                  <OfferContent>
                    <OfferFeatures>
                      <OfferFeature>Prezzo bloccato per 12 mesi</OfferFeature>
                      <OfferFeature>Compensazione CO2</OfferFeature>
                      <OfferFeature>Nessun deposito cauzionale</OfferFeature>
                      <OfferFeature>Attivazione gratuita</OfferFeature>
                    </OfferFeatures>
                    <Button fullWidth icon={<FaArrowRight />}>
                      Attiva ora
                    </Button>
                  </OfferContent>
                </OfferCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.2s"
              >
                <OfferCard elevation="medium" hoverEffect="lift" $isPopular>
                  <OfferHeader $isPopular>
                    <OfferIcon>
                      <FaGasPump />
                    </OfferIcon>
                    <OfferType>Gas Smart</OfferType>
                    <OfferPrice>
                      0.275€ <OfferPriceCaption>/Smc</OfferPriceCaption>
                    </OfferPrice>
                  </OfferHeader>
                  <OfferContent>
                    <OfferFeatures>
                      <OfferFeature $isHighlighted>
                        Prezzo bloccato per 24 mesi
                      </OfferFeature>
                      <OfferFeature>Compensazione CO2 inclusa</OfferFeature>
                      <OfferFeature $isHighlighted>
                        Monitoraggio consumi in tempo reale
                      </OfferFeature>
                      <OfferFeature>Attivazione gratuita</OfferFeature>
                      <OfferFeature>Assistenza prioritaria</OfferFeature>
                    </OfferFeatures>
                    <Button
                      fullWidth
                      variant="secondary"
                      icon={<FaArrowRight />}
                    >
                      Attiva ora
                    </Button>
                  </OfferContent>
                </OfferCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.3s"
              >
                <OfferCard elevation="medium" hoverEffect="lift">
                  <OfferHeader>
                    <OfferIcon>
                      <FaGasPump />
                    </OfferIcon>
                    <OfferType>Gas Premium</OfferType>
                    <OfferPrice>
                      0.270€ <OfferPriceCaption>/Smc</OfferPriceCaption>
                    </OfferPrice>
                  </OfferHeader>
                  <OfferContent>
                    <OfferFeatures>
                      <OfferFeature $isHighlighted>
                        Prezzo bloccato per 36 mesi
                      </OfferFeature>
                      <OfferFeature>Compensazione CO2 inclusa</OfferFeature>
                      <OfferFeature>
                        Monitoraggio consumi in tempo reale
                      </OfferFeature>
                      <OfferFeature $isHighlighted>
                        Assistenza prioritaria 24/7
                      </OfferFeature>
                      <OfferFeature $isHighlighted>
                        Check-up caldaia annuale incluso
                      </OfferFeature>
                    </OfferFeatures>
                    <Button fullWidth icon={<FaArrowRight />}>
                      Attiva ora
                    </Button>
                  </OfferContent>
                </OfferCard>
              </ScrollAnimation>
            </OffersGrid>
          </PageContainer>
        </OffersSection>
      </ErrorBoundary>

      {/* CALCULATOR SECTION */}
      <ErrorBoundary>
        <CalculatorSection type="gas" />
      </ErrorBoundary>

      {/* STEPS SECTION */}
      <ErrorBoundary>
        <StepsSection>
          <PageContainer>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <SectionTitle>Come Attivare la tua Fornitura</SectionTitle>
                <SectionSubtitle style={{ margin: "2rem auto" }}>
                  Passare a Solida-Energia è semplice e veloce. Ecco i passaggi
                  da seguire:
                </SectionSubtitle>
              </div>
            </ScrollAnimation>
            <StepsContainer>
              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.1s"
              >
                <StepCard elevation="medium" padding="2rem" hoverEffect="lift">
                  <StepNumber>1</StepNumber>
                  <StepTitle>Scegli l'Offerta</StepTitle>
                  <StepDescription>
                    Seleziona l'offerta più adatta alle tue esigenze tra quelle
                    disponibili.
                  </StepDescription>
                </StepCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.2s"
              >
                <StepCard elevation="medium" padding="2rem" hoverEffect="lift">
                  <StepNumber>2</StepNumber>
                  <StepTitle>Compila il Form</StepTitle>
                  <StepDescription>
                    Inserisci i tuoi dati e i dettagli della fornitura attuale.
                  </StepDescription>
                </StepCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.3s"
              >
                <StepCard elevation="medium" padding="2rem" hoverEffect="lift">
                  <StepNumber>3</StepNumber>
                  <StepTitle>Conferma</StepTitle>
                  <StepDescription>
                    Verifica i dati e conferma la tua richiesta di attivazione.
                  </StepDescription>
                </StepCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.4s"
              >
                <StepCard elevation="medium" padding="2rem" hoverEffect="lift">
                  <StepNumber>4</StepNumber>
                  <StepTitle>Attivazione</StepTitle>
                  <StepDescription>
                    Ci occupiamo noi di tutto! L'attivazione avviene entro 30
                    giorni.
                  </StepDescription>
                </StepCard>
              </ScrollAnimation>
            </StepsContainer>
          </PageContainer>
        </StepsSection>
      </ErrorBoundary>

      {/* FAQ SECTION */}
      <ErrorBoundary>
        <FAQSection>
          <PageContainer>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <SectionTitle>Domande Frequenti</SectionTitle>
                <SectionSubtitle style={{ margin: "2rem auto" }}>
                  Alcune risposte alle domande più comuni sulle nostre offerte
                  gas.
                </SectionSubtitle>
              </div>
            </ScrollAnimation>
            <FAQContainer>
              <ScrollAnimation
                animationType={ScrollAnimation.types.FADE_IN}
                delay="0.1s"
              >
                <FAQItem>
                  <FAQQuestion
                    $isOpen={openFaq === 1}
                    onClick={() => toggleFaq(1)}
                  >
                    <QuestionText $isOpen={openFaq === 1}>
                      Quanto tempo occorre per l'attivazione?
                    </QuestionText>
                    <IconContainer $isOpen={openFaq === 1}>
                      <FaChevronDown />
                    </IconContainer>
                  </FAQQuestion>
                  <FAQAnswer $isOpen={openFaq === 1}>
                    <FAQText>
                      L'attivazione della fornitura avviene entro 30 giorni
                      dalla sottoscrizione del contratto. Durante il passaggio
                      non ci sarà alcuna interruzione del servizio.
                    </FAQText>
                  </FAQAnswer>
                </FAQItem>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.FADE_IN}
                delay="0.2s"
              >
                <FAQItem>
                  <FAQQuestion
                    $isOpen={openFaq === 2}
                    onClick={() => toggleFaq(2)}
                  >
                    <QuestionText $isOpen={openFaq === 2}>
                      Devo comunicare qualcosa al mio fornitore attuale?
                    </QuestionText>
                    <IconContainer $isOpen={openFaq === 2}>
                      <FaChevronDown />
                    </IconContainer>
                  </FAQQuestion>
                  <FAQAnswer $isOpen={openFaq === 2}>
                    <FAQText>
                      No, non è necessario. Ci occupiamo noi di tutte le
                      comunicazioni per garantire un passaggio senza
                      interruzioni.
                    </FAQText>
                  </FAQAnswer>
                </FAQItem>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.FADE_IN}
                delay="0.3s"
              >
                <FAQItem>
                  <FAQQuestion
                    $isOpen={openFaq === 3}
                    onClick={() => toggleFaq(3)}
                  >
                    <QuestionText $isOpen={openFaq === 3}>
                      Che cos'è la compensazione CO2?
                    </QuestionText>
                    <IconContainer $isOpen={openFaq === 3}>
                      <FaChevronDown />
                    </IconContainer>
                  </FAQQuestion>
                  <FAQAnswer $isOpen={openFaq === 3}>
                    <FAQText>
                      La compensazione CO2 è un servizio che permette di
                      neutralizzare le emissioni di CO2 generate dal consumo di
                      gas attraverso investimenti in progetti ambientali.
                    </FAQText>
                  </FAQAnswer>
                </FAQItem>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.FADE_IN}
                delay="0.4s"
              >
                <FAQItem>
                  <FAQQuestion
                    $isOpen={openFaq === 4}
                    onClick={() => toggleFaq(4)}
                  >
                    <QuestionText $isOpen={openFaq === 4}>
                      Come viene calcolato il prezzo del gas?
                    </QuestionText>
                    <IconContainer $isOpen={openFaq === 4}>
                      <FaChevronDown />
                    </IconContainer>
                  </FAQQuestion>
                  <FAQAnswer $isOpen={openFaq === 4}>
                    <FAQText>
                      Il prezzo del gas si compone di materia prima, costi di
                      rete e imposte. Le nostre offerte garantiscono un prezzo
                      fisso per tutta la durata del contratto.
                    </FAQText>
                  </FAQAnswer>
                </FAQItem>
              </ScrollAnimation>
            </FAQContainer>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Button
                to="/faq"
                variant="secondary"
                outlined
                icon={<FaInfoCircle />}
              >
                Vai a tutte le FAQ
              </Button>
            </div>
          </PageContainer>
        </FAQSection>
      </ErrorBoundary>

      {/* CTA SECTION */}
      <ErrorBoundary>
        <CTASection>
          <CTAContent>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <CTATitle>
                Pronto per risparmiare sulla bolletta del gas?
              </CTATitle>
              <CTAText>
                Passa a Solida-Energia oggi stesso e inizia a godere di tariffe
                competitive e servizio clienti eccellente.
              </CTAText>
              <Button
                variant="white"
                size="large"
                rounded
                elevation
                icon={<FaArrowRight />}
                to="#offerte"
              >
                Scopri le Offerte
              </Button>
            </ScrollAnimation>
          </CTAContent>
        </CTASection>
      </ErrorBoundary>
    </Layout>
  );
};

export default OfferteGas;
