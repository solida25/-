import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const SearchContainer = styled.div`
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const SearchBox = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  border: none;
  outline: none;
`;

const SearchButton = styled.button`
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 0 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
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
  background-color: ${(props) => (props.active ? "#0066cc" : "white")};
  color: ${(props) => (props.active ? "white" : "#333")};
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#0055aa" : "#f5f5f5")};
  }
`;

const FaqContainer = styled.div`
  margin-bottom: 4rem;
`;

const FaqItem = styled.div`
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const FaqQuestion = styled.div`
  padding: 1.5rem;
  background-color: ${(props) => (props.isOpen ? "#f5f5f5" : "white")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const QuestionText = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const IconContainer = styled.div`
  color: #0066cc;
`;

const FaqAnswer = styled.div`
  padding: ${(props) => (props.isOpen ? "1.5rem" : "0 1.5rem")};
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border-top: ${(props) => (props.isOpen ? "1px solid #ddd" : "none")};
`;

const AnswerText = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0;
`;

const ContactSection = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
`;

const ContactTitle = styled.h2`
  margin-bottom: 1.5rem;
`;

const ContactDescription = styled.p`
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: #666666;
`;

const ContactButton = styled.button`
  background-color: #0066cc;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState("tutti");
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
  ];

  // Filtra le FAQ in base alla categoria selezionata
  const filteredFaqs =
    activeCategory === "tutti"
      ? faqData
      : faqData.filter((faq) => faq.category === activeCategory);

  return (
    <Layout
      title="FAQ"
      description="Domande frequenti su contratti, fatturazione, offerte e assistenza di Solida-Energia."
    >
      <PageContainer>
        <PageTitle>Domande Frequenti</PageTitle>

        <SearchContainer>
          <SearchBox>
            <SearchInput type="text" placeholder="Cerca una domanda..." />
            <SearchButton>
              <FaSearch />
            </SearchButton>
          </SearchBox>
        </SearchContainer>

        <CategoriesContainer>
          <CategoryButton
            active={activeCategory === "tutti"}
            onClick={() => setActiveCategory("tutti")}
          >
            Tutti
          </CategoryButton>
          <CategoryButton
            active={activeCategory === "contratti"}
            onClick={() => setActiveCategory("contratti")}
          >
            Contratti
          </CategoryButton>
          <CategoryButton
            active={activeCategory === "fatturazione"}
            onClick={() => setActiveCategory("fatturazione")}
          >
            Fatturazione
          </CategoryButton>
          <CategoryButton
            active={activeCategory === "offerte"}
            onClick={() => setActiveCategory("offerte")}
          >
            Offerte
          </CategoryButton>
          <CategoryButton
            active={activeCategory === "assistenza"}
            onClick={() => setActiveCategory("assistenza")}
          >
            Assistenza
          </CategoryButton>
        </CategoriesContainer>

        <FaqContainer>
          {filteredFaqs.map((faq) => (
            <FaqItem key={faq.id}>
              <FaqQuestion
                isOpen={openItems[faq.id]}
                onClick={() => toggleItem(faq.id)}
              >
                <QuestionText>{faq.question}</QuestionText>
                <IconContainer>
                  {openItems[faq.id] ? <FaChevronUp /> : <FaChevronDown />}
                </IconContainer>
              </FaqQuestion>
              <FaqAnswer isOpen={openItems[faq.id]}>
                <AnswerText>{faq.answer}</AnswerText>
              </FaqAnswer>
            </FaqItem>
          ))}
        </FaqContainer>

        <ContactSection>
          <ContactTitle>Non hai trovato la risposta che cercavi?</ContactTitle>
          <ContactDescription>
            Il nostro team di assistenza è sempre disponibile per rispondere
            alle tue domande e fornirti il supporto di cui hai bisogno.
          </ContactDescription>
          <ContactButton>Contattaci</ContactButton>
        </ContactSection>
      </PageContainer>
    </Layout>
  );
};

export default Faq;
