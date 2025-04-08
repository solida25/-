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

/* Story Section */
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

/* Values Section */
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

/* Team Section */
const TeamSection = styled.section`
  padding: 5rem 0;
  background-color: white;
  text-align: center;
`;

const TeamImage = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.large};
  margin: 0 auto 2rem;
  max-width: 800px;

  &::before {
    content: "";
    display: block;
    padding-top: 56.25%; /* 16:9 aspect ratio */
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

const TeamText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
  max-width: 800px;
  margin: 0 auto;
`;

/* Mission Quote Section */
const MissionSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(
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

/* Timeline Section */
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

/* CTA Section */
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
      description="Scopri la storia, la mission e i valori di Solida Energia, il fornitore di energia focalizzato esclusivamente sul settore residenziale e micro-business."
    >
      {/* Hero Section */}
      <ParallaxHero
        backgroundImage="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        height="60vh"
      >
        <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
          <HeroTitle>Chi Siamo</HeroTitle>
          <HeroDescription>
            Fondata nel 2025 dopo 10 anni di esperienza e analisi del mercato,
            Solida Energia si dedica esclusivamente al settore residenziale e ai
            micro-business, offrendo soluzioni energetiche innovative e
            sostenibili.
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
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Il nostro percorso"
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
                  Dal 2015 al lancio ufficiale nel 2025, un decennio di
                  progettazione e realizzazione.
                </SectionSubtitle>
                <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
                  Nel 2015 è iniziato il nostro impegno: un’approfondita analisi
                  di mercato ha guidato la progettazione di soluzioni mirate
                  esclusivamente al settore residenziale e ai micro-business.
                </p>
                <p style={{ marginBottom: "1.5rem", lineHeight: "1.8" }}>
                  Nel 2020 abbiamo validato le nostre idee con prototipi e test
                  in ambienti reali, perfezionando il nostro approccio e
                  garantendo la sostenibilità delle soluzioni.
                </p>
                <p style={{ lineHeight: "1.8" }}>
                  Nel 2025, dopo 10 anni di esperienza, nasce ufficialmente
                  Solida Energia, pronta a rivoluzionare il mercato con
                  soluzioni su misura.
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
                  I principi che guidano ogni nostra decisione
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
                    Siamo impegnati a mantenere le nostre promesse, costruendo
                    la fiducia attraverso risultati concreti.
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
                    Investiamo in soluzioni verdi e responsabili per un futuro
                    più pulito.
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
                    Focus sul Cliente
                  </h3>
                  <p style={{ color: "#666" }}>
                    Offriamo soluzioni personalizzate e un'assistenza dedicata
                    per ogni esigenza.
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
                    Innoviamo costantemente per migliorare i nostri servizi e
                    anticipare le esigenze del mercato.
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
              "Il nostro obiettivo è trasformare il settore energetico
              attraverso innovazione e sostenibilità, concentrandoci
              esclusivamente su soluzioni per il residenziale e il
              micro-business."
            </MissionText>
            <MissionAuthor>Il Team di Solida energia </MissionAuthor>
          </ScrollAnimation>
        </MissionContent>
      </MissionSection>

      {/* Team Section */}
      <TeamSection>
        <PageContainer>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <SectionTitle>Il Nostro Team</SectionTitle>
            <SectionSubtitle>
              Il nostro gruppo di professionisti opera in modo discreto e
              congiunto per garantire risultati eccellenti.
            </SectionSubtitle>
          </ScrollAnimation>
          <ScrollAnimation
            animationType={ScrollAnimation.types.SLIDE_UP}
            delay="0.1s"
          >
            <TeamImage>
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Il nostro team"
              />
            </TeamImage>
          </ScrollAnimation>
          <ScrollAnimation
            animationType={ScrollAnimation.types.FADE_IN}
            delay="0.2s"
          >
            <TeamText>
              Pur mantenendo riservata l'identità dei nostri collaboratori, il
              nostro impegno si riflette nei progetti innovativi e nella
              continua ricerca dell'eccellenza.
            </TeamText>
          </ScrollAnimation>
        </PageContainer>
      </TeamSection>

      {/* Timeline Section */}
      <TimelineSection>
        <PageContainer>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionTitle>La Nostra Storia</SectionTitle>
              <SectionSubtitle style={{ margin: "2rem auto" }}>
                Un percorso iniziato nel 2015, risultato di ricerca e
                innovazione
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
                  <TimelineYear>2015</TimelineYear>
                  <TimelineTitle>
                    Inizio della Ricerca e Progettazione
                  </TimelineTitle>
                  <TimelineText>
                    Da qui parte il nostro percorso: un'analisi approfondita del
                    mercato riservata al settore residenziale e ai
                    micro-business.
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
                  <TimelineYear>2020</TimelineYear>
                  <TimelineTitle>Prototipazione e Validazione</TimelineTitle>
                  <TimelineText>
                    Testiamo le nostre soluzioni in ambienti reali,
                    perfezionando il nostro approccio per garantire
                    sostenibilità ed efficienza.
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
                  <TimelineYear>2025</TimelineYear>
                  <TimelineTitle>Fondazione di Solida Energia</TimelineTitle>
                  <TimelineText>
                    Dopo 10 anni di esperienza, l'azienda viene ufficialmente
                    lanciata, focalizzandosi esclusivamente sui clienti
                    residenziali e sui micro-business.
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
                Se desideri ulteriori dettagli su Solida Energia o hai domande
                sulle nostre soluzioni, il nostro team è a tua disposizione.
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
