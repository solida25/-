import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import { FaCheck, FaCalculator } from "react-icons/fa";

// Il resto del codice rimane invariato

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

const PageDescription = styled.p`
  text-align: center;
  margin-bottom: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: #666666;
`;

const OffersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const OfferCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const OfferHeader = styled.div`
  background-color: #0066cc;
  color: white;
  padding: 1.5rem;
  text-align: center;
`;

const OfferType = styled.h3`
  margin-bottom: 0.5rem;
`;

const OfferPrice = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const OfferPriceCaption = styled.span`
  font-size: 1rem;
  font-weight: normal;
`;

const OfferContent = styled.div`
  padding: 1.5rem;
`;

const OfferFeatures = styled.ul`
  margin-bottom: 2rem;
`;

const OfferFeature = styled.li`
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "✓";
    color: #0066cc;
    position: absolute;
    left: 0;
  }
`;

const OfferButton = styled.button`
  display: block;
  width: 100%;
  background-color: #0066cc;
  color: white;
  text-align: center;
  padding: 0.8rem;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

const SavingsCalculator = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 4rem;
`;

const CalculatorTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const CalculatorIcon = styled.span`
  margin-right: 0.8rem;
  color: #0066cc;
`;

const CalculatorForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #dddddd;
  border-radius: 4px;
`;

const CalculateButton = styled.button`
  background-color: #0066cc;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }

  &:hover {
    background-color: #0055aa;
  }
`;

const ActivationSteps = styled.div`
  margin-bottom: 4rem;
`;

const StepsTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const StepCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StepNumber = styled.div`
  background-color: #0066cc;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin: 0 auto 1.5rem;
`;

const StepTitle = styled.h3`
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  color: #666666;
`;

const FAQ = styled.div`
  margin-bottom: 4rem;
`;

const FAQTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FAQQuestion = styled.h3`
  margin-bottom: 0.8rem;
  color: #0066cc;
`;

const FAQAnswer = styled.p`
  color: #666666;
`;

const OfferteLuce = () => {
  return (
    <Layout
      title="Offerte Luce"
      description="Scopri le offerte di energia elettrica di Solida-Energia per la tua casa. Tariffe competitive e servizio eccellente."
    >
      <PageContainer>
        <PageTitle>Offerte Luce per la tua Casa</PageTitle>
        <PageDescription>
          Scegli l'offerta più adatta alle tue esigenze. Tariffe trasparenti,
          energia sostenibile e un servizio clienti sempre a tua disposizione.
        </PageDescription>

        <OffersContainer>
          <OfferCard>
            <OfferHeader>
              <OfferType>Luce Basic</OfferType>
              <OfferPrice>
                0,07€ <OfferPriceCaption>/kWh</OfferPriceCaption>
              </OfferPrice>
            </OfferHeader>
            <OfferContent>
              <OfferFeatures>
                <OfferFeature>Prezzo bloccato per 12 mesi</OfferFeature>
                <OfferFeature>Energia da fonti rinnovabili</OfferFeature>
                <OfferFeature>Nessun deposito cauzionale</OfferFeature>
                <OfferFeature>Attivazione gratuita</OfferFeature>
              </OfferFeatures>
              <OfferButton>Attiva ora</OfferButton>
            </OfferContent>
          </OfferCard>

          <OfferCard>
            <OfferHeader>
              <OfferType>Luce Smart</OfferType>
              <OfferPrice>
                0,069€ <OfferPriceCaption>/kWh</OfferPriceCaption>
              </OfferPrice>
            </OfferHeader>
            <OfferContent>
              <OfferFeatures>
                <OfferFeature>Prezzo bloccato per 24 mesi</OfferFeature>
                <OfferFeature>100% energia verde certificata</OfferFeature>
                <OfferFeature>Monitoraggio consumi in tempo reale</OfferFeature>
                <OfferFeature>Attivazione gratuita</OfferFeature>
              </OfferFeatures>
              <OfferButton>Attiva ora</OfferButton>
            </OfferContent>
          </OfferCard>

          <OfferCard>
            <OfferHeader>
              <OfferType>Luce Premium</OfferType>
              <OfferPrice>
                0,068€ <OfferPriceCaption>/kWh</OfferPriceCaption>
              </OfferPrice>
            </OfferHeader>
            <OfferContent>
              <OfferFeatures>
                <OfferFeature>Prezzo bloccato per 36 mesi</OfferFeature>
                <OfferFeature>100% energia verde certificata</OfferFeature>
                <OfferFeature>Monitoraggio consumi in tempo reale</OfferFeature>
                <OfferFeature>Assistenza prioritaria 24/7</OfferFeature>
                <OfferFeature>Manutenzione impianto inclusa</OfferFeature>
              </OfferFeatures>
              <OfferButton>Attiva ora</OfferButton>
            </OfferContent>
          </OfferCard>
        </OffersContainer>

        <SavingsCalculator>
          <CalculatorTitle>
            <CalculatorIcon>
              <FaCalculator />
            </CalculatorIcon>
            Calcola il tuo Risparmio
          </CalculatorTitle>
          <CalculatorForm>
            <FormGroup>
              <FormLabel>Consumo annuo (kWh)</FormLabel>
              <FormInput type="number" placeholder="Es. 2500" />
            </FormGroup>

            <FormGroup>
              <FormLabel>Importo ultima bolletta (€)</FormLabel>
              <FormInput type="number" placeholder="Es. 150" />
            </FormGroup>

            <FormGroup>
              <FormLabel>Numero componenti famiglia</FormLabel>
              <FormSelect>
                <option value="1">1 persona</option>
                <option value="2">2 persone</option>
                <option value="3">3 persone</option>
                <option value="4">4 persone</option>
                <option value="5">5 o più persone</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>Zona geografica</FormLabel>
              <FormSelect>
                <option value="nord">Nord Italia</option>
                <option value="centro">Centro Italia</option>
                <option value="sud">Sud Italia e Isole</option>
              </FormSelect>
            </FormGroup>

            <CalculateButton>Calcola il Risparmio</CalculateButton>
          </CalculatorForm>
        </SavingsCalculator>

        <ActivationSteps>
          <StepsTitle>Come Attivare la tua Fornitura</StepsTitle>
          <StepsContainer>
            <StepCard>
              <StepNumber>1</StepNumber>
              <StepTitle>Scegli l'Offerta</StepTitle>
              <StepDescription>
                Seleziona l'offerta più adatta alle tue esigenze tra quelle
                disponibili.
              </StepDescription>
            </StepCard>

            <StepCard>
              <StepNumber>2</StepNumber>
              <StepTitle>Compila il Form</StepTitle>
              <StepDescription>
                Inserisci i tuoi dati e i dettagli della fornitura attuale.
              </StepDescription>
            </StepCard>

            <StepCard>
              <StepNumber>3</StepNumber>
              <StepTitle>Conferma</StepTitle>
              <StepDescription>
                Verifica i dati e conferma la tua richiesta di attivazione.
              </StepDescription>
            </StepCard>

            <StepCard>
              <StepNumber>4</StepNumber>
              <StepTitle>Attivazione</StepTitle>
              <StepDescription>
                Ci occupiamo noi di tutto! L'attivazione avviene entro 30
                giorni.
              </StepDescription>
            </StepCard>
          </StepsContainer>
        </ActivationSteps>

        <FAQ>
          <FAQTitle>Domande Frequenti</FAQTitle>
          <FAQItem>
            <FAQQuestion>Quanto tempo occorre per l'attivazione?</FAQQuestion>
            <FAQAnswer>
              L'attivazione della fornitura avviene entro 30 giorni dalla
              sottoscrizione del contratto. Durante il passaggio non ci sarà
              alcuna interruzione del servizio.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>
              Devo comunicare qualcosa al mio fornitore attuale?
            </FAQQuestion>
            <FAQAnswer>
              No, non è necessario. Ci occupiamo noi di tutte le comunicazioni
              con il tuo attuale fornitore per garantire un passaggio senza
              interruzioni.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Ci sono costi di attivazione?</FAQQuestion>
            <FAQAnswer>
              No, l'attivazione è completamente gratuita e non è previsto alcun
              deposito cauzionale.
            </FAQAnswer>
          </FAQItem>

          <FAQItem>
            <FAQQuestion>Cosa significa "prezzo bloccato"?</FAQQuestion>
            <FAQAnswer>
              Significa che il prezzo dell'energia rimarrà invariato per tutto
              il periodo indicato nell'offerta, indipendentemente dalle
              oscillazioni del mercato.
            </FAQAnswer>
          </FAQItem>
        </FAQ>
      </PageContainer>
    </Layout>
  );
};

export default OfferteLuce;
