import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Layout from "../components/common/Layout.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import ParallaxHero from "../components/common/ParallaxHero.jsx";
import Button from "../components/common/Button.jsx";
import SEO from "../components/seo/SEO";
import StructuredData from "../components/seo/StructuredData";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { SEO_CONSTANTS } from "../utils/seoConstants";
import {
  FaChevronDown,
  FaSearch,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

/* Keyframes */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

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

const FaqSection = styled.section`
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

const SearchContainer = styled.div`
  max-width: 700px;
  margin: 2rem auto 3rem;
  position: relative;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.3s ease;
  &:focus-within {
    box-shadow: ${({ theme }) => theme.shadows.large};
    transform: translateY(-2px);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.2rem 4rem 1.2rem 1.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: 1.1rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #999;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const CategoryButton = styled.button`
  background-color: ${({ active, theme }) =>
    active ? theme.primary : "white"};
  color: ${({ active, theme }) => (active ? "white" : theme.text)};
  border: 1px solid ${({ active, theme }) => (active ? theme.primary : "#ddd")};
  border-radius: 50px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  box-shadow: ${({ active, theme }) => (active ? theme.shadows.small : "none")};
  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.primary : "#f5f5f5"};
    transform: translateY(-2px);
  }
`;

const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FaqCard = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const FaqCardHeader = styled.div`
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
`;

const FaqContainer = styled.div`
  margin-top: 2rem;
`;

const FaqItem = styled.div`
  margin-bottom: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  background-color: white;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const FaqQuestion = styled.div`
  padding: 1.5rem;
  background-color: ${({ isOpen, theme }) =>
    isOpen ? theme.backgroundLight : "white"};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundLight};
  }
`;

const QuestionText = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ isOpen, theme }) => (isOpen ? theme.primary : theme.text)};
  flex: 1;
  padding-right: 1rem;
`;

const IconContainer = styled.div`
  color: ${({ isOpen, theme }) => (isOpen ? theme.primary : theme.textLight)};
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? "rotate(-180deg)" : "rotate(0)")};
`;

const FaqAnswer = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  overflow: hidden;
  transition:
    max-height 0.5s ease,
    opacity 0.3s ease,
    padding 0.3s ease;
  padding: ${({ isOpen }) => (isOpen ? "1.5rem" : "0 1.5rem")};
  border-top: ${({ isOpen }) => (isOpen ? "1px solid #eee" : "none")};
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const AnswerText = styled.p`
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
  margin: 0;
`;

/* Sezione CTA (in sostituzione della vecchia ContactSection) */
const CTASection = styled.section`
  padding: 5rem 0;
  background:
    linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}CC,
      ${({ theme }) => theme.secondary}CC
    ),
    url("https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")
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

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const ContactDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const ContactOptions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
`;

const ContactOption = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  backdrop-filter: blur(5px);
  svg {
    font-size: 1.5rem;
    margin-right: 1rem;
  }
  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

/* Dati di esempio per le FAQ */
const faqData = [
  {
    id: 1,
    category: "contratti",
    question: "Come posso attivare una nuova fornitura?",
    answer:
      "Per attivare una nuova fornitura, puoi scegliere tra diverse opzioni: compilare il form online sul nostro sito, chiamare il numero verde 800 123 456, o recarti presso uno dei nostri punti vendita. Ti basterà avere con te un documento d'identità valido, il codice fiscale, e i dati tecnici del punto di fornitura (POD per l'elettricità o PDR per il gas).",
  },
  {
    id: 2,
    category: "contratti",
    question: "Quanto tempo occorre per l'attivazione?",
    answer:
      "I tempi di attivazione variano in base alla tipologia di richiesta. Per un cambio fornitore, l'attivazione avviene generalmente entro 30 giorni dalla sottoscrizione del contratto. Per nuove attivazioni, i tempi potrebbero essere più lunghi in base alla necessità di interventi tecnici. In ogni caso, sarai informato sullo stato della tua pratica tramite email o SMS.",
  },
  {
    id: 3,
    category: "fatturazione",
    question: "Con quale frequenza riceverò le bollette?",
    answer:
      "La frequenza di fatturazione dipende dal tipo di fornitura e dai tuoi consumi annui. In generale, per le forniture domestiche emettiamo bollette bimestrali, mentre per le aziende la fatturazione può essere mensile. Puoi sempre richiedere una frequenza di fatturazione diversa contattando il nostro servizio clienti.",
  },
  {
    id: 4,
    category: "fatturazione",
    question: "Come posso pagare le bollette?",
    answer:
      "Offriamo diverse modalità di pagamento: domiciliazione bancaria (SEPA), bollettino postale, bonifico bancario, pagamento online tramite l'area clienti del nostro sito o app, o presso i punti vendita autorizzati. La domiciliazione bancaria ti permette di ottenere anche uno sconto annuale sulla componente fissa della bolletta.",
  },
  {
    id: 5,
    category: "assistenza",
    question: "Cosa devo fare in caso di guasto o interruzione del servizio?",
    answer:
      "In caso di guasto o interruzione del servizio, è importante distinguere tra problemi della rete di distribuzione e problemi dell'impianto interno. Per guasti alla rete, contatta il numero di pronto intervento del distributore locale (indicato in bolletta). Per problemi all'impianto interno, contatta un tecnico specializzato. Per assistenza o informazioni, puoi sempre chiamare il nostro servizio clienti al numero 800 123 456.",
  },
  {
    id: 6,
    category: "offerte",
    question: 'Cosa significa "prezzo bloccato"?',
    answer:
      "Un'offerta a \"prezzo bloccato\" garantisce che il costo della materia prima energia (elettricità o gas) rimanga invariato per un periodo definito, solitamente 12, 24 o 36 mesi, indipendentemente dalle oscillazioni del mercato. Questo ti protegge da eventuali aumenti di prezzo, ma restano soggette a variazioni le altre componenti della bolletta, come gli oneri di sistema o le imposte, che sono stabilite dall'Autorità per l'energia.",
  },
  {
    id: 7,
    category: "offerte",
    question:
      "Posso passare a Solida-Energia mantenendo il mio contatore attuale?",
    answer:
      "Sì, puoi passare a Solida-Energia mantenendo il tuo contatore attuale. Il cambio di fornitore non richiede la sostituzione del contatore o modifiche all'impianto. La procedura è completamente amministrativa e non comporta interruzioni del servizio.",
  },
  {
    id: 8,
    category: "contratti",
    question: "Come posso disdire il contratto?",
    answer:
      "Per disdire il contratto puoi inviarci una comunicazione scritta via email a disdette@solida-energia.it o via posta raccomandata. La disdetta ha effetto secondo i termini previsti dalle condizioni contrattuali, generalmente entro 30 giorni dalla ricezione della richiesta. Non sono previsti costi di disdetta a meno che non sia specificato diversamente nelle condizioni particolari dell'offerta sottoscritta.",
  },
  {
    id: 9,
    category: "assistenza",
    question: "Come posso comunicare l'autolettura del contatore?",
    answer:
      "Puoi comunicare l'autolettura del contatore in diversi modi: tramite l'area clienti del nostro sito web o app, chiamando il numero verde 800 123 456 e seguendo le istruzioni del risponditore automatico, o inviando un SMS al numero 339 9941234 con il formato \"LETTURA [spazio] POD/PDR [spazio] VALORE\".",
  },
  {
    id: 10,
    category: "fatturazione",
    question: "Cosa fare se ricevo una bolletta con importi anomali?",
    answer:
      "Se ricevi una bolletta con importi che ritieni anomali, puoi contattare il nostro servizio clienti al numero 800 123 456 per richiedere una verifica. Potrebbe trattarsi di consumi stimati superiori ai reali, di un conguaglio, o di un effettivo aumento dei consumi. In ogni caso, analizzeremo la situazione e, se necessario, emetteremo una bolletta rettificativa.",
  },
  {
    id: 11,
    category: "fatturazione",
    question: "Quando devo pagare la bolletta?",
    answer:
      'La data entro cui effettuare il pagamento è indicata in ogni bolletta come "data di scadenza". Generalmente concediamo 20 giorni dalla data di emissione per il pagamento. In caso di domiciliazione bancaria, l\'addebito avverrà direttamente sul tuo conto corrente alla data di scadenza indicata.',
  },
  {
    id: 12,
    category: "assistenza",
    question: "Come posso verificare lo stato della mia pratica?",
    answer:
      "Puoi verificare lo stato della tua pratica accedendo all'area clienti del nostro sito web o app, dove troverai una sezione dedicata alle tue richieste in corso. In alternativa, puoi contattare il servizio clienti al numero 800 123 456 e un operatore verificherà lo stato della tua pratica.",
  },
];

/* Componente FAQ */
const Faq = () => {
  // Stato per la categoria attiva
  const [activeCategory, setActiveCategory] = useState("tutti");
  // Stato per le FAQ aperte (più di uno può essere aperto)
  const [openItems, setOpenItems] = useState({});
  // Stato per il campo di ricerca
  const [searchTerm, setSearchTerm] = useState("");
  // Stato per le FAQ filtrate
  const [filteredFaqs, setFilteredFaqs] = useState(faqData);

  // Funzione per attivare/disattivare una FAQ
  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Effetto per filtrare le FAQ in base alla categoria e al termine di ricerca
  useEffect(() => {
    let result = faqData;
    // Filtro per categoria (se diversa da "tutti")
    if (activeCategory !== "tutti") {
      result = result.filter((faq) => faq.category === activeCategory);
    }
    // Filtro per termine di ricerca
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (faq) =>
          faq.question.toLowerCase().includes(term) ||
          faq.answer.toLowerCase().includes(term),
      );
    }
    setFilteredFaqs(result);
  }, [activeCategory, searchTerm]);

  // Gestione dell'input di ricerca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Organizzazione delle FAQ per categoria
  const faqsByCategory = {
    contratti: filteredFaqs.filter((faq) => faq.category === "contratti"),
    fatturazione: filteredFaqs.filter((faq) => faq.category === "fatturazione"),
    offerte: filteredFaqs.filter((faq) => faq.category === "offerte"),
    assistenza: filteredFaqs.filter((faq) => faq.category === "assistenza"),
  };

  // Funzione per ottenere il numero di FAQ per una determinata categoria
  const getCategoryCount = (category) =>
    faqData.filter((faq) => faq.category === category).length;

  // Prepara i dati strutturati per le FAQ
  const faqStructuredData = {
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Layout
      title="FAQ"
      description="Domande frequenti su contratti, fatturazione, offerte e assistenza di Solida-Energia."
    >
      <SEO
        title="Domande Frequenti"
        description="Trova rapidamente le risposte alle tue domande su contratti, fatturazione, offerte e assistenza di Solida-Energia."
        canonical="/faq"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "domande frequenti",
          "faq",
          "aiuto",
          "assistenza",
          "informazioni",
        ]}
      />

      <StructuredData type="FAQPage" data={faqStructuredData} />

      {/* Hero Section */}
      <ErrorBoundary>
        <ParallaxHero
          backgroundImage="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          height="50vh"
        >
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <HeroTitle>Domande Frequenti</HeroTitle>
            <HeroDescription>
              Trova rapidamente le risposte alle tue domande su contratti,
              fatturazione, offerte e assistenza.
            </HeroDescription>
          </ScrollAnimation>
        </ParallaxHero>
      </ErrorBoundary>

      {/* Sezione FAQ */}
      <ErrorBoundary>
        <FaqSection>
          <PageContainer>
            {/* Search Box */}
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <SearchContainer>
                <SearchInputWrapper>
                  <SearchInput
                    type="text"
                    placeholder="Cerca una domanda..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <SearchIcon>
                    <FaSearch />
                  </SearchIcon>
                </SearchInputWrapper>
              </SearchContainer>
            </ScrollAnimation>

            {/* Categorie */}
            <ScrollAnimation
              animationType={ScrollAnimation.types.FADE_IN}
              delay="0.1s"
            >
              <CategoriesContainer>
                <CategoryButton
                  active={activeCategory === "tutti"}
                  onClick={() => setActiveCategory("tutti")}
                >
                  Tutti ({faqData.length})
                </CategoryButton>
                <CategoryButton
                  active={activeCategory === "contratti"}
                  onClick={() => setActiveCategory("contratti")}
                >
                  Contratti ({getCategoryCount("contratti")})
                </CategoryButton>
                <CategoryButton
                  active={activeCategory === "fatturazione"}
                  onClick={() => setActiveCategory("fatturazione")}
                >
                  Fatturazione ({getCategoryCount("fatturazione")})
                </CategoryButton>
                <CategoryButton
                  active={activeCategory === "offerte"}
                  onClick={() => setActiveCategory("offerte")}
                >
                  Offerte ({getCategoryCount("offerte")})
                </CategoryButton>
                <CategoryButton
                  active={activeCategory === "assistenza"}
                  onClick={() => setActiveCategory("assistenza")}
                >
                  Assistenza ({getCategoryCount("assistenza")})
                </CategoryButton>
              </CategoriesContainer>
            </ScrollAnimation>

            {/* Visualizzazione FAQ */}
            {searchTerm === "" && activeCategory === "tutti" ? (
              <FaqGrid>
                {/* Card per Contratti */}
                <ScrollAnimation
                  animationType={ScrollAnimation.types.SLIDE_UP}
                  delay="0.1s"
                >
                  <FaqCard>
                    <FaqCardHeader>Contratti</FaqCardHeader>
                    <div style={{ padding: "1.5rem" }}>
                      <FaqContainer>
                        {faqsByCategory.contratti.slice(0, 2).map((faq) => (
                          <FaqItem key={faq.id}>
                            <FaqQuestion
                              isOpen={openItems[faq.id]}
                              onClick={() => toggleItem(faq.id)}
                            >
                              <QuestionText isOpen={openItems[faq.id]}>
                                {faq.question}
                              </QuestionText>
                              <IconContainer isOpen={openItems[faq.id]}>
                                <FaChevronDown />
                              </IconContainer>
                            </FaqQuestion>
                            <FaqAnswer isOpen={openItems[faq.id]}>
                              <AnswerText>{faq.answer}</AnswerText>
                            </FaqAnswer>
                          </FaqItem>
                        ))}
                      </FaqContainer>
                      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                        <Button
                          size="small"
                          variant="secondary"
                          outlined
                          onClick={() => setActiveCategory("contratti")}
                        >
                          Vedi tutte
                        </Button>
                      </div>
                    </div>
                  </FaqCard>
                </ScrollAnimation>

                {/* Card per Fatturazione */}
                <ScrollAnimation
                  animationType={ScrollAnimation.types.SLIDE_UP}
                  delay="0.2s"
                >
                  <FaqCard>
                    <FaqCardHeader>Fatturazione</FaqCardHeader>
                    <div style={{ padding: "1.5rem" }}>
                      <FaqContainer>
                        {faqsByCategory.fatturazione.slice(0, 2).map((faq) => (
                          <FaqItem key={faq.id}>
                            <FaqQuestion
                              isOpen={openItems[faq.id]}
                              onClick={() => toggleItem(faq.id)}
                            >
                              <QuestionText isOpen={openItems[faq.id]}>
                                {faq.question}
                              </QuestionText>
                              <IconContainer isOpen={openItems[faq.id]}>
                                <FaChevronDown />
                              </IconContainer>
                            </FaqQuestion>
                            <FaqAnswer isOpen={openItems[faq.id]}>
                              <AnswerText>{faq.answer}</AnswerText>
                            </FaqAnswer>
                          </FaqItem>
                        ))}
                      </FaqContainer>
                      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                        <Button
                          size="small"
                          variant="secondary"
                          outlined
                          onClick={() => setActiveCategory("fatturazione")}
                        >
                          Vedi tutte
                        </Button>
                      </div>
                    </div>
                  </FaqCard>
                </ScrollAnimation>

                {/* Card per Offerte */}
                <ScrollAnimation
                  animationType={ScrollAnimation.types.SLIDE_UP}
                  delay="0.3s"
                >
                  <FaqCard>
                    <FaqCardHeader>Offerte</FaqCardHeader>
                    <div style={{ padding: "1.5rem" }}>
                      <FaqContainer>
                        {faqsByCategory.offerte.slice(0, 2).map((faq) => (
                          <FaqItem key={faq.id}>
                            <FaqQuestion
                              isOpen={openItems[faq.id]}
                              onClick={() => toggleItem(faq.id)}
                            >
                              <QuestionText isOpen={openItems[faq.id]}>
                                {faq.question}
                              </QuestionText>
                              <IconContainer isOpen={openItems[faq.id]}>
                                <FaChevronDown />
                              </IconContainer>
                            </FaqQuestion>
                            <FaqAnswer isOpen={openItems[faq.id]}>
                              <AnswerText>{faq.answer}</AnswerText>
                            </FaqAnswer>
                          </FaqItem>
                        ))}
                      </FaqContainer>
                      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                        <Button
                          size="small"
                          variant="secondary"
                          outlined
                          onClick={() => setActiveCategory("offerte")}
                        >
                          Vedi tutte
                        </Button>
                      </div>
                    </div>
                  </FaqCard>
                </ScrollAnimation>

                {/* Card per Assistenza */}
                <ScrollAnimation
                  animationType={ScrollAnimation.types.SLIDE_UP}
                  delay="0.4s"
                >
                  <FaqCard>
                    <FaqCardHeader>Assistenza</FaqCardHeader>
                    <div style={{ padding: "1.5rem" }}>
                      <FaqContainer>
                        {faqsByCategory.assistenza.slice(0, 2).map((faq) => (
                          <FaqItem key={faq.id}>
                            <FaqQuestion
                              isOpen={openItems[faq.id]}
                              onClick={() => toggleItem(faq.id)}
                            >
                              <QuestionText isOpen={openItems[faq.id]}>
                                {faq.question}
                              </QuestionText>
                              <IconContainer isOpen={openItems[faq.id]}>
                                <FaChevronDown />
                              </IconContainer>
                            </FaqQuestion>
                            <FaqAnswer isOpen={openItems[faq.id]}>
                              <AnswerText>{faq.answer}</AnswerText>
                            </FaqAnswer>
                          </FaqItem>
                        ))}
                      </FaqContainer>
                      <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                        <Button
                          size="small"
                          variant="secondary"
                          outlined
                          onClick={() => setActiveCategory("assistenza")}
                        >
                          Vedi tutte
                        </Button>
                      </div>
                    </div>
                  </FaqCard>
                </ScrollAnimation>
              </FaqGrid>
            ) : (
              // Lista completa o filtrata di FAQ
              <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
                <FaqContainer>
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq) => (
                      <ScrollAnimation
                        key={faq.id}
                        animationType={ScrollAnimation.types.SLIDE_UP}
                        delay={`${0.1 * (faq.id % 5)}s`}
                      >
                        <FaqItem>
                          <FaqQuestion
                            isOpen={openItems[faq.id]}
                            onClick={() => toggleItem(faq.id)}
                          >
                            <QuestionText isOpen={openItems[faq.id]}>
                              {faq.question}
                            </QuestionText>
                            <IconContainer isOpen={openItems[faq.id]}>
                              <FaChevronDown />
                            </IconContainer>
                          </FaqQuestion>
                          <FaqAnswer isOpen={openItems[faq.id]}>
                            <AnswerText>{faq.answer}</AnswerText>
                          </FaqAnswer>
                        </FaqItem>
                      </ScrollAnimation>
                    ))
                  ) : (
                    <div style={{ textAlign: "center", padding: "3rem 0" }}>
                      <h3 style={{ color: "#666", marginBottom: "1rem" }}>
                        Nessuna domanda trovata
                      </h3>
                      <p style={{ color: "#888" }}>
                        La tua ricerca non ha prodotto risultati. Prova con
                        termini diversi o naviga tra le categorie.
                      </p>
                    </div>
                  )}
                </FaqContainer>
              </ScrollAnimation>
            )}
          </PageContainer>
        </FaqSection>
      </ErrorBoundary>

      {/* Sezione CTA */}
      <ErrorBoundary>
        <CTASection>
          <CTAContent>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <ContactTitle>
                Non hai trovato la risposta che cercavi?
              </ContactTitle>
              <ContactDescription>
                Il nostro team di assistenza è sempre disponibile per rispondere
                alle tue domande e fornirti il supporto di cui hai bisogno.
              </ContactDescription>
              <Button
                to="/contatti"
                size="large"
                variant="white"
                rounded
                elevation
              >
                Contattaci
              </Button>
              <ContactOptions>
                <ContactOption>
                  <FaPhoneAlt />
                  <a href="tel:800123456">800 123 456</a>
                </ContactOption>
                <ContactOption>
                  <FaEnvelope />
                  <a href="mailto:info@solida-energia.it">
                    info@solida-energia.it
                  </a>
                </ContactOption>
              </ContactOptions>
            </ScrollAnimation>
          </CTAContent>
        </CTASection>
      </ErrorBoundary>
    </Layout>
  );
};

export default Faq;
