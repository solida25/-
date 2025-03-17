import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import { FaHandshake, FaLeaf, FaUsers, FaChartLine } from "react-icons/fa";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const PageDescription = styled.p`
  max-width: 800px;
  margin: 0 auto 2rem;
  color: #666666;
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ValueCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  color: #0066cc;
  margin-bottom: 1.5rem;
`;

const ValueTitle = styled.h3`
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: #666666;
`;

const StorySection = styled.div`
  margin-bottom: 4rem;
`;

const StoryText = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #444444;
`;

const TeamSection = styled.div`
  margin-bottom: 4rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const TeamMember = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MemberImage = styled.div`
  height: 250px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.2rem;
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
`;

const MemberName = styled.h3`
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: #0066cc;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const MemberBio = styled.p`
  color: #666666;
`;

const ChiSiamo = () => {
  return (
    <Layout
      title="Chi Siamo"
      description="Scopri la storia, la mission e i valori di Solida-Energia, il tuo fornitore di energia affidabile e sostenibile."
    >
      <PageContainer>
        <HeroSection>
          <PageTitle>Chi Siamo</PageTitle>
          <PageDescription>
            Solida-Energia è un fornitore di energia elettrica e gas con una
            missione chiara: rendere l'energia accessibile, sostenibile e
            conveniente per tutti. Dal 2010 serviamo famiglie e aziende in tutta
            Italia con soluzioni energetiche innovative.
          </PageDescription>
        </HeroSection>

        <StorySection>
          <SectionTitle>La Nostra Storia</SectionTitle>
          <StoryText>
            Fondata nel 2010 da un gruppo di esperti del settore energetico,
            Solida-Energia è nata con l'obiettivo di offrire un'alternativa ai
            tradizionali fornitori di energia, puntando su trasparenza,
            sostenibilità e innovazione.
          </StoryText>
          <StoryText>
            Negli anni abbiamo continuato a crescere, espandendo la nostra
            offerta di servizi e rafforzando il nostro impegno verso l'utilizzo
            di fonti rinnovabili. Oggi serviamo migliaia di clienti in tutta
            Italia, con un team di professionisti dedicati alla soddisfazione
            del cliente e all'eccellenza operativa.
          </StoryText>
          <StoryText>
            La nostra vision è diventare il fornitore di energia preferito in
            Italia, riconosciuto per la qualità del servizio, la trasparenza e
            l'impegno verso un futuro energetico sostenibile.
          </StoryText>
        </StorySection>

        <SectionTitle>I Nostri Valori</SectionTitle>
        <ValuesGrid>
          <ValueCard>
            <ValueIcon>
              <FaHandshake />
            </ValueIcon>
            <ValueTitle>Affidabilità</ValueTitle>
            <ValueDescription>
              Manteniamo le nostre promesse e lavoriamo per guadagnare ogni
              giorno la fiducia dei nostri clienti.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>
              <FaLeaf />
            </ValueIcon>
            <ValueTitle>Sostenibilità</ValueTitle>
            <ValueDescription>
              Ci impegniamo a promuovere un consumo responsabile e a investire
              in fonti di energia rinnovabile.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>
              <FaUsers />
            </ValueIcon>
            <ValueTitle>Orientamento al Cliente</ValueTitle>
            <ValueDescription>
              Mettiamo i clienti al centro di tutto ciò che facciamo, offrendo
              soluzioni personalizzate e assistenza dedicata.
            </ValueDescription>
          </ValueCard>

          <ValueCard>
            <ValueIcon>
              <FaChartLine />
            </ValueIcon>
            <ValueTitle>Innovazione</ValueTitle>
            <ValueDescription>
              Investiamo costantemente in tecnologie e processi innovativi per
              migliorare i nostri servizi.
            </ValueDescription>
          </ValueCard>
        </ValuesGrid>

        <TeamSection>
          <SectionTitle>Il Nostro Team</SectionTitle>
          <TeamGrid>
            <TeamMember>
              <MemberImage>Foto del Direttore</MemberImage>
              <MemberInfo>
                <MemberName>Marco Rossi</MemberName>
                <MemberRole>CEO & Fondatore</MemberRole>
                <MemberBio>
                  Con oltre 20 anni di esperienza nel settore energetico, Marco
                  guida l'azienda con visione e determinazione.
                </MemberBio>
              </MemberInfo>
            </TeamMember>

            <TeamMember>
              <MemberImage>Foto della Direttrice</MemberImage>
              <MemberInfo>
                <MemberName>Laura Bianchi</MemberName>
                <MemberRole>Direttrice Operativa</MemberRole>
                <MemberBio>
                  Laura coordina le operazioni quotidiane assicurando efficienza
                  e qualità in tutti i nostri servizi.
                </MemberBio>
              </MemberInfo>
            </TeamMember>

            <TeamMember>
              <MemberImage>Foto del Responsabile</MemberImage>
              <MemberInfo>
                <MemberName>Francesco Verdi</MemberName>
                <MemberRole>Responsabile Sostenibilità</MemberRole>
                <MemberBio>
                  Francesco guida le nostre iniziative ambientali e il nostro
                  impegno verso un futuro energetico sostenibile.
                </MemberBio>
              </MemberInfo>
            </TeamMember>
          </TeamGrid>
        </TeamSection>
      </PageContainer>
    </Layout>
  );
};

export default ChiSiamo;
