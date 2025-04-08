import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import ParallaxHero from "../components/common/ParallaxHero.jsx";
import SEO from "../components/seo/SEO";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { SEO_CONSTANTS } from "../utils/seoConstants";

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin: 2.5rem 0 1rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    border-radius: 1.5px;
  }
`;

const SubsectionTitle = styled.h3`
  font-size: 1.4rem;
  margin: 1.5rem 0 1rem;
  color: ${({ theme }) => theme.text};
`;

const TermsText = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 1.5rem;
  line-height: 1.8;
`;

const TermsList = styled.ul`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textLight};
  padding-left: 2rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.8;
  }
`;

const LastUpdate = styled.p`
  font-style: italic;
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.backgroundLight};
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
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

const TerminiCondizioni = () => {
  return (
    <Layout
      title="Termini e Condizioni"
      description="Termini e Condizioni di Futura Energia srl: regole e accordi per l'utilizzo dei nostri servizi e del nostro sito web."
    >
      <SEO
        title="Termini e Condizioni"
        description="Termini e Condizioni di Futura Energia srl: regole e accordi per l'utilizzo dei nostri servizi e del nostro sito web."
        canonical="/termini"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "termini",
          "condizioni",
          "contratto",
          "accordo",
        ]}
      />

      <ErrorBoundary>
        <ParallaxHero
          backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          height="40vh"
        >
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <HeroTitle>Termini e Condizioni</HeroTitle>
            <HeroDescription>
              Regole e accordi per l'utilizzo dei nostri servizi e del nostro
              sito web
            </HeroDescription>
          </ScrollAnimation>
        </ParallaxHero>
      </ErrorBoundary>

      <PageContainer>
        <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
          <TermsText>
            I presenti Termini e Condizioni ("Termini") regolano l'utilizzo del
            sito web <strong>solidaenergia.com</strong> ("Sito") e dei servizi
            offerti da <strong>Futura Energia srl</strong> ("Società").
            Utilizzando il Sito, l'utente accetta di essere vincolato dai
            presenti Termini.
          </TermsText>

          <SectionTitle>1. Accettazione dei Termini</SectionTitle>
          <TermsText>
            Accedendo o utilizzando il Sito in qualsiasi modo, l'utente accetta
            di essere legalmente vincolato dai presenti Termini e da tutte le
            condizioni incorporate per riferimento. Se non si accettano tutti i
            termini e le condizioni, non è consentito utilizzare il Sito.
          </TermsText>

          <SectionTitle>2. Modifiche ai Termini</SectionTitle>
          <TermsText>
            Ci riserviamo il diritto di modificare questi Termini in qualsiasi
            momento. Le modifiche avranno effetto immediatamente dopo la
            pubblicazione sul Sito. Continuando a utilizzare il Sito dopo tali
            modifiche, l'utente accetta i nuovi Termini. È responsabilità
            dell'utente controllare regolarmente eventuali modifiche.
          </TermsText>

          <SectionTitle>3. Utilizzo del Sito</SectionTitle>
          <TermsText>
            L'utente accetta di utilizzare il Sito solo per scopi legali e in
            modo da non violare i diritti di, limitare o impedire l'uso e il
            godimento del Sito da parte di terzi.
          </TermsText>

          <SubsectionTitle>3.1. Comportamenti Vietati</SubsectionTitle>
          <TermsText>L'utente non può:</TermsText>
          <TermsList>
            <li>
              Utilizzare il Sito in qualsiasi modo che sia illegale, fraudolento
              o dannoso
            </li>
            <li>
              Utilizzare il Sito per copiare, archiviare, ospitare, trasmettere,
              inviare, utilizzare o distribuire qualsiasi materiale che consista
              di (o sia collegato a) qualsiasi spyware, virus informatico,
              trojan, worm, keylogger o altro software dannoso
            </li>
            <li>Condurre attività di data mining o scraping sul Sito</li>
            <li>
              Utilizzare il Sito per trasmettere comunicazioni commerciali non
              richieste
            </li>
            <li>
              Utilizzare il Sito per attività di marketing senza il nostro
              consenso scritto
            </li>
          </TermsList>

          <SectionTitle>4. Registrazione e Account</SectionTitle>
          <TermsText>
            Alcuni servizi e funzionalità del nostro Sito possono richiedere la
            registrazione di un account. Quando si registra un account, l'utente
            accetta di:
          </TermsText>
          <TermsList>
            <li>
              Fornire informazioni veritiere, accurate, attuali e complete
            </li>
            <li>
              Mantenere e aggiornare tempestivamente i dati di registrazione
            </li>
            <li>Mantenere la sicurezza del proprio account e della password</li>
            <li>
              Avvisarci immediatamente di qualsiasi accesso non autorizzato o
              violazione della sicurezza
            </li>
            <li>
              Assumersi la responsabilità per tutte le attività che si
              verificano sotto il proprio account
            </li>
          </TermsList>

          <SectionTitle>5. Prodotti e Servizi</SectionTitle>
          <TermsText>
            Le descrizioni dei prodotti e servizi energetici presentati sul
            nostro Sito sono accurate per quanto possibile. Tuttavia, non
            garantiamo che tutte le descrizioni siano accurate, complete,
            affidabili, aggiornate o prive di errori.
          </TermsText>
          <TermsText>
            I prezzi dei nostri prodotti e servizi sono soggetti a modifiche
            senza preavviso. Ci riserviamo il diritto di modificare o
            interrompere qualsiasi prodotto o servizio senza preavviso in
            qualsiasi momento.
          </TermsText>

          <SectionTitle>6. Contratti di Fornitura</SectionTitle>
          <TermsText>
            La sottoscrizione di un contratto di fornitura attraverso il nostro
            Sito è soggetta a specifiche condizioni contrattuali che saranno
            rese disponibili durante il processo di attivazione. In caso di
            conflitto tra i presenti Termini e le condizioni specifiche del
            contratto di fornitura, prevarranno queste ultime.
          </TermsText>

          <SectionTitle>7. Diritti di Proprietà Intellettuale</SectionTitle>
          <TermsText>
            Il Sito e il suo contenuto originale, caratteristiche e funzionalità
            sono di proprietà della Società e sono protetti da copyright,
            marchio, brevetto e altre leggi sulla proprietà intellettuale o
            diritti di proprietà.
          </TermsText>
          <TermsText>
            Tutto il testo, le immagini, il codice, i grafici, i loghi, i
            marchi, i nomi commerciali, i simboli, i disegni, le foto, i segnali
            acustici, le musiche, l'aspetto, il look and feel e il software che
            appaiono o sono disponibili attraverso il nostro Sito sono di
            proprietà esclusiva della Società o dei suoi fornitori di contenuti.
          </TermsText>

          <SectionTitle>8. Limitazione di Responsabilità</SectionTitle>
          <TermsText>
            In nessun caso la Società, né i suoi amministratori, dipendenti o
            agenti saranno responsabili per qualsiasi danno diretto, indiretto,
            speciale, incidentale, consequenziale o punitivo, inclusi, senza
            limitazione, perdita di profitti, dati, uso o qualsiasi altro danno
            immateriale, derivante da o in qualsiasi modo connesso con:
          </TermsText>
          <TermsList>
            <li>L'utilizzo o l'impossibilità di utilizzare il Sito</li>
            <li>Qualsiasi contenuto ottenuto dal Sito</li>
            <li>
              Accesso non autorizzato ai nostri server e/o a qualsiasi
              informazione personale ivi memorizzata
            </li>
            <li>Interruzioni della trasmissione da o verso il nostro Sito</li>
            <li>
              Bug, virus, trojan o simili che possono essere trasmessi al o
              tramite il nostro Sito
            </li>
          </TermsList>

          <SectionTitle>9. Indennizzo</SectionTitle>
          <TermsText>
            L'utente accetta di difendere, indennizzare e tenere indenne la
            Società e i suoi licenziatari, fornitori di servizi, subcontraenti,
            distributori, agenti, rappresentanti e altri utenti autorizzati, e
            ciascuno dei loro rispettivi funzionari, dirigenti, proprietari,
            dipendenti, agenti, rappresentanti e successori da e contro
            qualsiasi reclamo, responsabilità, danni, sentenze, premi, perdite,
            costi, spese o commissioni (incluse ragionevoli spese legali)
            derivanti da o in connessione con la violazione di questi Termini.
          </TermsText>

          <SectionTitle>10. Legge Applicabile e Foro Competente</SectionTitle>
          <TermsText>
            I presenti Termini saranno regolati e interpretati in conformità con
            le leggi italiane. Qualsiasi controversia derivante da o in
            connessione con questi Termini sarà soggetta alla giurisdizione
            esclusiva del Tribunale di Roma.
          </TermsText>
          <TermsText>
            Se l'utente è un consumatore, le disposizioni precedenti non
            pregiudicano i diritti che possono essere fatti valere sulla base
            delle disposizioni obbligatorie della legge applicabile nel paese di
            residenza.
          </TermsText>

          <SectionTitle>11. Generalità</SectionTitle>
          <TermsText>
            Se una qualsiasi disposizione dei presenti Termini è ritenuta
            invalida o inapplicabile, tale disposizione sarà modificata e
            interpretata per realizzare gli obiettivi di tale disposizione nella
            misura massima possibile ai sensi della legge applicabile, e le
            restanti disposizioni continueranno ad avere pieno vigore ed
            effetto.
          </TermsText>
          <TermsText>
            Il mancato esercizio o applicazione di qualsiasi diritto o
            disposizione dei presenti Termini non costituirà una rinuncia a tale
            diritto o disposizione.
          </TermsText>

          <SectionTitle>12. Contatti</SectionTitle>
          <TermsText>
            Per qualsiasi domanda sui presenti Termini, contattare:
          </TermsText>
          <TermsText>
            <strong>Futura Energia srl</strong>
            <br />
            Via Foro Buonaparte 59
            <br />
            20121 Milano
            <br />
            Email: solida@solidaenergia.com
            <br />
            Tel: 090350 5923
          </TermsText>

          <LastUpdate>Ultimo aggiornamento: 8 Aprile 2025</LastUpdate>
        </ScrollAnimation>
      </PageContainer>
    </Layout>
  );
};

export default TerminiCondizioni;
