import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import SEO from "../components/seo/SEO";
import StructuredData from "../components/seo/StructuredData";
import ErrorBoundary from "../components/error/ErrorBoundary";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import ParallaxHero from "../components/common/ParallaxHero.jsx";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import CalculatorSection from "../components/CalculatorSection.jsx";
import { SEO_CONSTANTS } from "../utils/seoConstants";
import {
  FaLightbulb,
  FaCalculator,
  FaCheckCircle,
  FaArrowRight,
  FaInfoCircle,
  FaChevronDown,
  FaBolt,
} from "react-icons/fa";

/* Styled Components */
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

/* HERO */
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

/* Sezioni – Titoli e sottotitoli */
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
  margin-left: auto;
  margin-right: auto;
`;

/* OFFERS SECTION */
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

/* Offerta – Card e componenti correlati */
const StyledOfferCard = styled(Card)`
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
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><g fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><path d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9z"/></g></g></svg>')
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
  padding: 5rem 0;
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
  padding: 2rem;
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
  padding: 5rem 0;
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
const FAQItemWrapper = styled.div`
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

/* Componenti per la generazione dinamica */

// Offerta – Card Item
const OfferCardItem = ({
  isPopular,
  icon,
  type,
  price,
  priceCaption,
  features,
  buttonLink,
  buttonText,
  buttonVariant,
}) => (
  <ScrollAnimation animationType={ScrollAnimation.types.SLIDE_UP}>
    <StyledOfferCard
      $isPopular={isPopular}
      elevation="medium"
      hoverEffect="lift"
    >
      <OfferHeader $isPopular={isPopular}>
        <OfferIcon>{icon}</OfferIcon>
        <OfferType>{type}</OfferType>
        <OfferPrice>
          {price} <OfferPriceCaption>{priceCaption}</OfferPriceCaption>
        </OfferPrice>
      </OfferHeader>
      <OfferContent>
        <OfferFeatures>
          {features.map((feature, idx) => {
            const text = typeof feature === "object" ? feature.text : feature;
            const highlighted =
              typeof feature === "object" ? feature.highlighted : false;
            return (
              <OfferFeature key={idx} $isHighlighted={highlighted}>
                {text}
              </OfferFeature>
            );
          })}
        </OfferFeatures>
        <Button
          fullWidth
          icon={<FaArrowRight />}
          variant={buttonVariant}
          to={buttonLink}
        >
          {buttonText}
        </Button>
      </OfferContent>
    </StyledOfferCard>
  </ScrollAnimation>
);

// Step Card Item
const StepCardItem = ({ number, title, description, delay }) => (
  <ScrollAnimation animationType={ScrollAnimation.types.SLIDE_UP} delay={delay}>
    <StepCard elevation="medium" hoverEffect="lift">
      <StepNumber>{number}</StepNumber>
      <StepTitle>{title}</StepTitle>
      <StepDescription>{description}</StepDescription>
    </StepCard>
  </ScrollAnimation>
);

// FAQ Item Component
const FAQItem = ({ id, question, answer, isOpen, onToggle, delay }) => (
  <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN} delay={delay}>
    <FAQItemWrapper>
      <FAQQuestion $isOpen={isOpen} onClick={() => onToggle(id)}>
        <QuestionText $isOpen={isOpen}>{question}</QuestionText>
        <IconContainer $isOpen={isOpen}>
          <FaChevronDown />
        </IconContainer>
      </FAQQuestion>
      <FAQAnswer $isOpen={isOpen}>
        <FAQText>{answer}</FAQText>
      </FAQAnswer>
    </FAQItemWrapper>
  </ScrollAnimation>
);

/* Dati per le offerte, i passaggi e gli FAQ */
const offerCardsData = [
  {
    id: 1,
    isPopular: false,
    icon: <FaLightbulb />,
    type: "Luce Basic",
    price: "0.07€",
    priceCaption: "/kWh",
    features: [
      "Prezzo bloccato per 12 mesi",
      "Energia da fonti rinnovabili",
      "Nessun deposito cauzionale",
      "Attivazione gratuita",
    ],
    buttonLink: "/offerte-luce",
    buttonText: "Attiva ora",
    buttonVariant: "primary",
  },
  {
    id: 2,
    isPopular: true,
    icon: <FaLightbulb />,
    type: "Luce Smart",
    price: "0.069€",
    priceCaption: "/kWh",
    features: [
      { text: "Prezzo bloccato per 24 mesi", highlighted: true },
      "100% energia verde certificata",
      { text: "Monitoraggio consumi in tempo reale", highlighted: true },
      "Attivazione gratuita",
      "Assistenza prioritaria",
    ],
    buttonLink: "/offerte-luce",
    buttonText: "Attiva ora",
    buttonVariant: "secondary",
  },
  {
    id: 3,
    isPopular: false,
    icon: <FaBolt />,
    type: "Luce Premium",
    price: "0.068€",
    priceCaption: "/kWh",
    features: [
      { text: "Prezzo bloccato per 36 mesi", highlighted: true },
      "100% energia verde certificata",
      "Monitoraggio consumi in tempo reale",
      { text: "Assistenza prioritaria 24/7", highlighted: true },
      { text: "Check-up impianto annuale incluso", highlighted: true },
    ],
    buttonLink: "/offerte-luce",
    buttonText: "Attiva ora",
    buttonVariant: "primary",
  },
];

const stepsData = [
  {
    number: "1",
    title: "Scegli l'Offerta",
    description:
      "Seleziona l'offerta più adatta alle tue esigenze tra quelle disponibili.",
  },
  {
    number: "2",
    title: "Compila il Form",
    description: "Inserisci i tuoi dati e i dettagli della fornitura attuale.",
  },
  {
    number: "3",
    title: "Conferma",
    description: "Verifica i dati e conferma la tua richiesta di attivazione.",
  },
  {
    number: "4",
    title: "Attivazione",
    description:
      "Ci occupiamo noi di tutto! L'attivazione avviene entro 30 giorni.",
  },
];

const faqData = [
  {
    id: 1,
    question: "Quanto tempo occorre per l'attivazione?",
    answer:
      "L'attivazione della fornitura avviene entro 30 giorni dalla sottoscrizione del contratto. Durante il passaggio non ci sarà alcuna interruzione del servizio.",
  },
  {
    id: 2,
    question: "Devo comunicare qualcosa al mio fornitore attuale?",
    answer:
      "No, non è necessario. Ci occupiamo noi di tutte le comunicazioni per garantire un passaggio senza interruzioni.",
  },
  {
    id: 3,
    question: 'Cosa significa "energia 100% verde"?',
    answer:
      "Significa che tutta l'energia fornita proviene da fonti rinnovabili, certificata tramite Garanzia d'Origine.",
  },
  {
    id: 4,
    question: "Come viene calcolato il prezzo della luce?",
    answer:
      "Il prezzo si compone di materia prima (che blocchiamo), costi di rete e imposte. Le nostre offerte garantiscono un prezzo fisso per tutta la durata del contratto.",
  },
];

/* COMPONENTE PRINCIPALE */
const OfferteLuce = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <Layout
      title="Offerte Luce"
      description="Scopri le offerte di energia elettrica di Solida-Energia per la tua casa. Tariffe competitive e servizio eccellente."
    >
      <SEO
        title="Offerte Luce"
        description="Scegli l'offerta di energia elettrica più adatta alle tue esigenze. Tariffe trasparenti, energia 100% verde e un servizio clienti sempre a tua disposizione."
        canonical="/offerte-luce"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "offerte luce",
          "energia elettrica",
          "tariffe luce",
          "energia verde",
        ]}
      />

      <StructuredData
        type="ItemList"
        data={{
          itemListElement: offerCardsData.map((offerta, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: offerta.type,
              description: offerta.features.join(" - "),
              brand: { "@type": "Brand", name: "Solida-Energia" },
              offers: {
                "@type": "Offer",
                price: offerta.price.replace("€", ""),
                priceCurrency: "EUR",
                priceValidUntil: "2024-12-31",
                availability: "https://schema.org/InStock",
              },
            },
          })),
        }}
      />

      {/* HERO SECTION */}
      <ErrorBoundary>
        <ParallaxHero
          backgroundImage="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          height="60vh"
        >
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <HeroTitle>Offerte Luce per la tua Casa</HeroTitle>
            <HeroDescription>
              Scegli l'offerta di energia elettrica più adatta alle tue
              esigenze. Tariffe trasparenti, energia 100% verde e un servizio
              clienti sempre a tua disposizione.
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
                <SectionTitle>Le Nostre Offerte Luce</SectionTitle>
                <SectionSubtitle style={{ margin: "2rem auto" }}>
                  Tariffe competitive e personalizzate per ogni esigenza di
                  consumo. Scegli l'offerta più adatta a te.
                </SectionSubtitle>
              </div>
            </ScrollAnimation>
            <OffersGrid>
              {offerCardsData.map((offer, idx) => (
                <OfferCardItem
                  key={offer.id}
                  {...offer}
                  delay={`${0.1 * (idx + 1)}s`}
                />
              ))}
            </OffersGrid>
          </PageContainer>
        </OffersSection>
      </ErrorBoundary>

      {/* CALCULATOR SECTION */}
      <ErrorBoundary>
        <CalculatorSection type="electricity" />
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
              {stepsData.map((step, idx) => (
                <StepCardItem
                  key={idx}
                  {...step}
                  delay={`${0.1 * (idx + 1)}s`}
                />
              ))}
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
                  luce.
                </SectionSubtitle>
              </div>
            </ScrollAnimation>
            <FAQContainer>
              {faqData.map((faq, idx) => (
                <FAQItem
                  key={faq.id}
                  id={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaq === faq.id}
                  onToggle={toggleFaq}
                  delay={`${0.1 * (idx + 1)}s`}
                />
              ))}
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
                Pronto per risparmiare sulla bolletta della luce?
              </CTATitle>
              <CTAText>
                Passa a Solida-Energia oggi stesso e inizia a godere di tariffe
                competitive e di un servizio clienti eccellente.
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

export default OfferteLuce;
