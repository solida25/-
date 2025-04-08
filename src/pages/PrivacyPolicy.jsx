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

const PolicyText = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 1.5rem;
  line-height: 1.8;
`;

const PolicyList = styled.ul`
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

const PrivacyPolicy = () => {
  return (
    <Layout
      title="Privacy Policy"
      description="Informativa sulla Privacy di Solida-Energia: come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali."
    >
      <SEO
        title="Privacy Policy"
        description="Informativa sulla Privacy di Solida-Energia: come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali in conformità con il GDPR."
        canonical="/privacy"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "privacy policy",
          "GDPR",
          "dati personali",
          "cookie policy",
        ]}
      />

      <ErrorBoundary>
        <ParallaxHero
          backgroundImage="https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          height="40vh"
        >
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <HeroTitle>Privacy Policy</HeroTitle>
            <HeroDescription>
              Come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali
            </HeroDescription>
          </ScrollAnimation>
        </ParallaxHero>
      </ErrorBoundary>

      <PageContainer>
        <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
          <PolicyText>
            La presente Privacy Policy ha lo scopo di descrivere le modalità di
            gestione del sito web
            <strong> solida-energia.it</strong> in riferimento al trattamento
            dei dati personali degli utenti che lo consultano. Si tratta di
            un'informativa che è resa ai sensi dell'art. 13 del Regolamento UE
            2016/679 (GDPR) a coloro che interagiscono con i servizi web di
            Solida-Energia.
          </PolicyText>

          <SectionTitle>1. Titolare del Trattamento</SectionTitle>
          <PolicyText>
            Il Titolare del trattamento dei dati personali è{" "}
            <strong>Solida-Energia S.p.A.</strong> con sede legale in Via
            dell'Energia, 123 - 00100 Roma, Email: privacy@solida-energia.it.
          </PolicyText>

          <SectionTitle>2. Tipologie di Dati Raccolti</SectionTitle>
          <PolicyText>
            Fra i dati personali raccolti da questo sito web, in modo autonomo o
            tramite terze parti, ci sono:
          </PolicyText>
          <PolicyList>
            <li>Cookie</li>
            <li>Dati di utilizzo</li>
            <li>Nome e cognome</li>
            <li>Numero di telefono</li>
            <li>Email</li>
            <li>Indirizzo</li>
            <li>Dati di fatturazione</li>
            <li>Dati di consumo energetico</li>
          </PolicyList>
          <PolicyText>
            I dati personali possono essere liberamente forniti dall'Utente o,
            nel caso di Dati di Utilizzo, raccolti automaticamente durante l'uso
            di questo sito web.
          </PolicyText>

          <SectionTitle>3. Modalità e Luogo del Trattamento</SectionTitle>
          <PolicyText>
            I Dati Personali sono trattati con strumenti automatizzati per il
            tempo strettamente necessario a conseguire gli scopi per cui sono
            stati raccolti.
          </PolicyText>
          <PolicyText>
            Il trattamento dei Dati avviene presso la sede operativa del
            Titolare ed in ogni altro luogo in cui le parti coinvolte nel
            trattamento siano localizzate. I dati personali sono trattati
            principalmente su server ubicati all'interno dell'Unione Europea.
            Qualora i dati venissero trasferiti al di fuori dell'UE, il Titolare
            assicura che il trattamento avverrà in conformità alla presente
            Privacy Policy ed alla normativa applicabile.
          </PolicyText>

          <SectionTitle>4. Finalità del Trattamento dei Dati</SectionTitle>
          <PolicyText>
            I Dati dell'Utente sono raccolti per consentire al Titolare di
            fornire i propri servizi, così come per le seguenti finalità:
          </PolicyText>
          <PolicyList>
            <li>Permettere la registrazione e l'autenticazione dell'Utente</li>
            <li>Gestire le richieste di contatto o supporto</li>
            <li>Elaborare e gestire i contratti di fornitura</li>
            <li>Gestire la fatturazione e i pagamenti</li>
            <li>
              Analizzare l'utilizzo del sito per migliorare i servizi offerti
            </li>
            <li>Inviare comunicazioni commerciali (con consenso specifico)</li>
          </PolicyList>

          <SectionTitle>5. Cookie Policy</SectionTitle>
          <PolicyText>
            Questo sito web utilizza Cookie per salvare le preferenze di
            navigazione ed ottimizzare l'esperienza di navigazione dell'Utente.
            Tra gli strumenti utilizzati si fa ricorso a Cookie, web beacon e
            altre tecnologie simili.
          </PolicyText>
          <PolicyText>
            I cookie utilizzati su questo sito possono essere classificati come
            segue:
          </PolicyText>
          <PolicyList>
            <li>
              <strong>Cookie tecnici/necessari:</strong> Sono essenziali per il
              funzionamento del sito e consentono all'utente di navigare e
              utilizzare le sue funzioni.
            </li>
            <li>
              <strong>Cookie funzionali:</strong> Permettono al sito di
              ricordare le scelte fatte dall'utente e fornire funzionalità
              avanzate e personalizzate.
            </li>
            <li>
              <strong>Cookie analytics:</strong> Raccolgono informazioni su come
              gli utenti utilizzano il sito, ad esempio quali pagine visitano
              più spesso.
            </li>
            <li>
              <strong>Cookie di marketing:</strong> Vengono utilizzati per
              tracciare i visitatori sui siti web e mostrare annunci pertinenti
              e coinvolgenti.
            </li>
          </PolicyList>
          <PolicyText>
            L'Utente può gestire le proprie preferenze relative ai Cookie
            attraverso il banner che appare al primo accesso al sito e
            successivamente attraverso l'apposito pannello di preferenze.
          </PolicyText>

          <SectionTitle>6. Diritti dell'Utente</SectionTitle>
          <PolicyText>
            Gli Utenti possono esercitare determinati diritti con riferimento ai
            Dati trattati dal Titolare. In particolare, l'Utente ha diritto di:
          </PolicyText>
          <PolicyList>
            <li>
              <strong>Revocare il consenso in ogni momento:</strong> L'Utente
              può revocare il consenso al trattamento dei propri Dati
              precedentemente espresso.
            </li>
            <li>
              <strong>Accedere ai propri Dati:</strong> L'Utente ha diritto ad
              ottenere informazioni sui Dati trattati dal Titolare.
            </li>
            <li>
              <strong>Verificare e chiedere la rettifica:</strong> L'Utente può
              verificare la correttezza dei propri Dati e richiederne
              l'aggiornamento o la correzione.
            </li>
            <li>
              <strong>Ottenere la limitazione del trattamento:</strong> L'Utente
              può richiedere la limitazione del trattamento dei propri Dati.
            </li>
            <li>
              <strong>Ottenere la cancellazione:</strong> L'Utente può
              richiedere la cancellazione dei propri Dati.
            </li>
            <li>
              <strong>Opporsi al trattamento:</strong> L'Utente può opporsi al
              trattamento dei propri Dati quando esso avviene su una base
              giuridica diversa dal consenso.
            </li>
            <li>
              <strong>Portabilità dei dati:</strong> L'Utente ha diritto di
              ricevere i propri Dati in formato strutturato e leggibile da
              dispositivo automatico.
            </li>
          </PolicyList>
          <PolicyText>
            Le richieste vanno rivolte al Titolare del Trattamento utilizzando i
            contatti forniti nella sezione "Titolare del Trattamento".
          </PolicyText>

          <SectionTitle>7. Modifiche a questa Privacy Policy</SectionTitle>
          <PolicyText>
            Il Titolare del Trattamento si riserva il diritto di apportare
            modifiche alla presente privacy policy in qualunque momento dandone
            informazione agli Utenti su questa pagina. Si prega dunque di
            consultare regolarmente questa pagina.
          </PolicyText>

          <LastUpdate>Ultimo aggiornamento: 4 Aprile 2025</LastUpdate>
        </ScrollAnimation>
      </PageContainer>
    </Layout>
  );
};

export default PrivacyPolicy;
