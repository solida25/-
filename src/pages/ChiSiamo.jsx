import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import ParallaxHero from "../components/common/ParallaxHero.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import Card from "../components/common/Card.jsx";
import Button from "../components/common/Button.jsx";
import {
  FaHandshake,
  FaLeaf,
  FaUsers,
  FaChartLine,
  FaQuoteLeft,
  FaArrowRight,
} from "react-icons/fa";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

const StorySection = styled.section`
  padding: 5rem 0;
  background-color: white;
`;

const StoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const StoryImage = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.large};
  position: relative;

  &::before {
    content: "";
    padding-top: 75%;
    display: block;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StoryContent = styled.div`
  padding: 1rem;
`;

const ValuesSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.backgroundLight};
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 50px;
    background-color: white;
    z-index: 1;
  }

  &::before {
    top: -25px;
    transform: skewY(-1.5deg);
  }

  &::after {
    bottom: -25px;
    transform: skewY(1.5deg);
  }
`;

const ValueContent = styled.div`
  position: relative;
  z-index: 2;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled(Card)`
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.default};
`;

const ValueIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
  display: inline-block;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.primary}15;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;

const TeamSection = styled.section`
  padding: 5rem 0;
  background-color: white;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
`;

const MissionSection = styled.section`
  padding: 6rem 0;
  background:
    linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}CC,
      ${({ theme }) => theme.secondary}CC
    ),
    url("https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")
      center/cover;
  color: white;
  text-align: center;
  position: relative;
`;

const MissionContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const QuoteIcon = styled.div`
  font-size: 5rem;
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 1.5rem;
`;

const MissionText = styled.p`
  font-size: 1.8rem;
  font-style: italic;
  margin-bottom: 2rem;
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.4rem;
  }
`;

const MissionAuthor = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const TimelineSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.backgroundLight};
`;

const Timeline = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;

  &::after {
    content: "";
    position: absolute;
    width: 4px;
    background-color: ${({ theme }) => theme.primary}30;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 1rem 0;
  position: relative;
  width: 50%;
  left: ${({ position }) => (position === "right" ? "50%" : "0")};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: calc(100% - 60px);
    left: 60px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border: 4px solid ${({ theme }) => theme.primary};
    top: 24px;
    border-radius: 50%;
    z-index: 1;

    ${({ position }) =>
      position === "right" ? "left: -10px;" : "right: -10px;"}

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: -45px;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 1.5rem;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  position: relative;
  margin: 0 2rem;

  &::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 10px;
    top: 20px;

    ${({ position }) =>
      position === "right"
        ? `
        border-color: transparent white transparent transparent;
        left: -20px;
      `
        : `
        border-color: transparent transparent transparent white;
        right: -20px;
      `}

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      border-color: transparent white transparent transparent;
      left: -20px;
    }
  }
`;

const TimelineYear = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const TimelineText = styled.p`
  color: ${({ theme }) => theme.textLight};
`;

const CTASection = styled.section`
  padding: 5rem 0;
  text-align: center;
  background-color: white;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.textLight};
`;

const ChiSiamo = () => {
  return (
    <Layout
      title="Chi Siamo"
      description="Scopri la storia, la mission e i valori di Solida-Energia, il tuo fornitore di energia affidabile e sostenibile."
    >
      {/* Hero Section */}
      <ParallaxHero
        backgroundImage="https://images.unsplash.com/photo-1508247967583-7d982ea01526?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        height="60vh"
      >
        <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
          <HeroTitle>Chi Siamo</HeroTitle>
          <HeroDescription>
            Solida-Energia è un fornitore di energia elettrica e gas con una
            missione chiara: rendere l'energia accessibile, sostenibile e
            conveniente per tutti.
          </HeroDescription>
        </ScrollAnimation>
      </ParallaxHero>

      {/* Story Section */}
      <StorySection>
        <PageContainer>
          <StoryContainer>
            <ScrollAnimation
              animationType={ScrollAnimation.types.SLIDE_RIGHT}
              threshold={0.2}
            >
              <StoryImage>
                <img
                  src="https://images.unsplash.com/photo-1564676677001-92e8f1a0df24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Storia di Solida-Energia"
                />
              </StoryImage>
            </ScrollAnimation>

            <ScrollAnimation
              animationType={ScrollAnimation.types.SLIDE_LEFT}
              threshold={0.2}
              delay="0.2s"
            >
              <StoryContent>
                <SectionTitle>La Nostra Storia</SectionTitle>
                <SectionSubtitle>
                  Un percorso di innovazione e sostenibilità dal 2010
                </SectionSubtitle>
                <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
                  Fondata nel 2010 da un gruppo di esperti del settore
                  energetico, Solida-Energia è nata con l'obiettivo di offrire
                  un'alternativa ai tradizionali fornitori di energia, puntando
                  su trasparenza, sostenibilità e innovazione.
                </p>
                <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
                  Negli anni abbiamo continuato a crescere, espandendo la nostra
                  offerta di servizi e rafforzando il nostro impegno verso
                  l'utilizzo di fonti rinnovabili. Oggi serviamo migliaia di
                  clienti in tutta Italia.
                </p>
                <p style={{ lineHeight: "1.8" }}>
                  La nostra vision è diventare il fornitore di energia preferito
                  in Italia, riconosciuto per la qualità del servizio, la
                  trasparenza e l'impegno verso un futuro energetico
                  sostenibile.
                </p>
              </StoryContent>
            </ScrollAnimation>
          </StoryContainer>
        </PageContainer>
      </StorySection>

      {/* Values Section */}
      <ValuesSection>
        <ValueContent>
          <PageContainer>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <SectionTitle>I Nostri Valori</SectionTitle>
                <SectionSubtitle style={{ margin: "2rem auto" }}>
                  Principi che guidano ogni nostra azione e decisione
                </SectionSubtitle>
              </div>
            </ScrollAnimation>

            <ValuesGrid>
              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.1s"
              >
                <ValueCard elevation="medium" hoverEffect="lift">
                  <ValueIcon>
                    <FaHandshake />
                  </ValueIcon>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
                    Affidabilità
                  </h3>
                  <p style={{ color: "#666" }}>
                    Manteniamo le nostre promesse e lavoriamo per guadagnare
                    ogni giorno la fiducia dei nostri clienti.
                  </p>
                </ValueCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.2s"
              >
                <ValueCard elevation="medium" hoverEffect="lift">
                  <ValueIcon>
                    <FaLeaf />
                  </ValueIcon>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
                    Sostenibilità
                  </h3>
                  <p style={{ color: "#666" }}>
                    Ci impegniamo a promuovere un consumo responsabile e a
                    investire in fonti di energia rinnovabile.
                  </p>
                </ValueCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.3s"
              >
                <ValueCard elevation="medium" hoverEffect="lift">
                  <ValueIcon>
                    <FaUsers />
                  </ValueIcon>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
                    Orientamento al Cliente
                  </h3>
                  <p style={{ color: "#666" }}>
                    Mettiamo i clienti al centro di tutto ciò che facciamo,
                    offrendo soluzioni personalizzate e assistenza dedicata.
                  </p>
                </ValueCard>
              </ScrollAnimation>

              <ScrollAnimation
                animationType={ScrollAnimation.types.SLIDE_UP}
                delay="0.4s"
              >
                <ValueCard elevation="medium" hoverEffect="lift">
                  <ValueIcon>
                    <FaChartLine />
                  </ValueIcon>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
                    Innovazione
                  </h3>
                  <p style={{ color: "#666" }}>
                    Investiamo costantemente in tecnologie e processi innovativi
                    per migliorare i nostri servizi.
                  </p>
                </ValueCard>
              </ScrollAnimation>
            </ValuesGrid>
          </PageContainer>
        </ValueContent>
      </ValuesSection>

      {/* Mission Quote Section */}
      <MissionSection>
        <MissionContent>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <QuoteIcon>
              <FaQuoteLeft />
            </QuoteIcon>
            <MissionText>
              "Il nostro obiettivo è fornire energia pulita a prezzi
              competitivi, contribuendo a costruire un futuro più sostenibile
              per le prossime generazioni."
            </MissionText>
            <MissionAuthor>Marco Rossi, CEO & Fondatore</MissionAuthor>
          </ScrollAnimation>
        </MissionContent>
      </MissionSection>

      {/* Team Section */}
      <TeamSection>
        <PageContainer>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionTitle>Il Nostro Team</SectionTitle>
              <SectionSubtitle style={{ margin: "2rem auto" }}>
                Professionisti dedicati alla tua soddisfazione
              </SectionSubtitle>
            </div>
          </ScrollAnimation>

          <TeamGrid>
            <ScrollAnimation
              animationType={ScrollAnimation.types.SLIDE_UP}
              delay="0.1s"
            >
              <Card
                image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                imageHeight="300px"
                title="Marco Rossi"
                titleSize="medium"
                subtitle="CEO & Fondatore"
                elevation="medium"
                hoverEffect="lift"
                padding="1.5rem"
              >
                <p style={{ color: "#666", marginBottom: "1rem" }}>
                  Con oltre 20 anni di esperienza nel settore energetico, Marco
                  guida l'azienda con visione e determinazione.
                </p>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation
              animationType={ScrollAnimation.types.SLIDE_UP}
              delay="0.2s"
            >
              <Card
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                imageHeight="300px"
                title="Laura Bianchi"
                titleSize="medium"
                subtitle="Direttrice Operativa"
                elevation="medium"
                hoverEffect="lift"
                padding="1.5rem"
              >
                <p style={{ color: "#666", marginBottom: "1rem" }}>
                  Laura coordina le operazioni quotidiane assicurando efficienza
                  e qualità in tutti i nostri servizi.
                </p>
              </Card>
            </ScrollAnimation>

            <ScrollAnimation
              animationType={ScrollAnimation.types.SLIDE_UP}
              delay="0.3s"
            >
              <Card
                image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                imageHeight="300px"
                title="Francesco Verdi"
                titleSize="medium"
                subtitle="Responsabile Sostenibilità"
                elevation="medium"
                hoverEffect="lift"
                padding="1.5rem"
              >
                <p style={{ color: "#666", marginBottom: "1rem" }}>
                  Francesco guida le nostre iniziative ambientali e il nostro
                  impegno verso un futuro energetico sostenibile.
                </p>
              </Card>
            </ScrollAnimation>
          </TeamGrid>
        </PageContainer>
      </TeamSection>

      {/* Timeline Section */}
      <TimelineSection>
        <PageContainer>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionTitle>La Nostra Storia</SectionTitle>
              <SectionSubtitle style={{ margin: "2rem auto" }}>
                Un percorso di crescita e innovazione
              </SectionSubtitle>
            </div>
          </ScrollAnimation>

          <Timeline>
            <ScrollAnimation
              animationType={ScrollAnimation.types.FADE_IN}
              delay="0.1s"
            >
              <TimelineItem position="left">
                <TimelineContent position="left">
                  <TimelineYear>2010</TimelineYear>
                  <TimelineTitle>Fondazione di Solida-Energia</TimelineTitle>
                  <TimelineText>
                    Solida-Energia nasce dalla visione di un gruppo di esperti
                    del settore energetico con l'obiettivo di offrire
                    un'alternativa sostenibile.
                  </TimelineText>
                </TimelineContent>
              </TimelineItem>
            </ScrollAnimation>

            <ScrollAnimation
              animationType={ScrollAnimation.types.FADE_IN}
              delay="0.2s"
            >
              <TimelineItem position="right">
                <TimelineContent position="right">
                  <TimelineYear>2013</TimelineYear>
                  <TimelineTitle>Espansione nazionale</TimelineTitle>
                  <TimelineText>
                    Dopo i primi anni di successo locale, iniziamo l'espansione
                    in tutta Italia raggiungendo migliaia di nuovi clienti.
                  </TimelineText>
                </TimelineContent>
              </TimelineItem>
            </ScrollAnimation>

            <ScrollAnimation
              animationType={ScrollAnimation.types.FADE_IN}
              delay="0.3s"
            >
              <TimelineItem position="left">
                <TimelineContent position="left">
                  <TimelineYear>2016</TimelineYear>
                  <TimelineTitle>Certificazione 100% Verde</TimelineTitle>
                  <TimelineText>
                    Otteniamo la certificazione ufficiale per l'energia 100% da
                    fonti rinnovabili, consolidando il nostro impegno per
                    l'ambiente.
                  </TimelineText>
                </TimelineContent>
              </TimelineItem>
            </ScrollAnimation>

            <ScrollAnimation
              animationType={ScrollAnimation.types.FADE_IN}
              delay="0.4s"
            >
              <TimelineItem position="right">
                <TimelineContent position="right">
                  <TimelineYear>2020</TimelineYear>
                  <TimelineTitle>Lancio soluzioni Smart Home</TimelineTitle>
                  <TimelineText>
                    Introduciamo una nuova gamma di soluzioni per la casa
                    intelligente, integrando energia e tecnologia per un consumo
                    più efficiente.
                  </TimelineText>
                </TimelineContent>
              </TimelineItem>
            </ScrollAnimation>

            <ScrollAnimation
              animationType={ScrollAnimation.types.FADE_IN}
              delay="0.5s"
            >
              <TimelineItem position="left">
                <TimelineContent position="left">
                  <TimelineYear>2023</TimelineYear>
                  <TimelineTitle>Ampliamento gamma servizi</TimelineTitle>
                  <TimelineText>
                    Lanciamo nuovi servizi orientati all'efficienza energetica e
                    alla consulenza personalizzata per clienti residenziali e
                    business.
                  </TimelineText>
                </TimelineContent>
              </TimelineItem>
            </ScrollAnimation>
          </Timeline>
        </PageContainer>
      </TimelineSection>

      {/* CTA Section */}
      <CTASection>
        <PageContainer>
          <CTAContent>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <CTATitle>Vuoi saperne di più?</CTATitle>
              <CTAText>
                Se vuoi conoscere meglio Solida-Energia o hai domande sulle
                nostre offerte, il nostro team è a tua disposizione.
              </CTAText>
              <Button
                to="/contatti"
                size="large"
                rounded
                elevation
                shimmer
                icon={<FaArrowRight />}
              >
                Contattaci ora
              </Button>
            </ScrollAnimation>
          </CTAContent>
        </PageContainer>
      </CTASection>
    </Layout>
  );
};

export default ChiSiamo;
