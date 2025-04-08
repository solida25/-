// src/components/AdvancedCalculator.jsx

import React, { useState } from "react";
import styled from "styled-components";
import {
  FaCalculator,
  FaFileUpload,
  FaChartBar,
  FaArrowRight,
  FaCheckCircle,
  FaExclamationTriangle,
  FaFilePdf,
  FaFileAlt,
  FaTrash,
} from "react-icons/fa";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import FormInput from "../components/common/FormInput.jsx";

// Esempio di loading spinner. Se ne hai già uno tuo, importalo e sostituisci qui
const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${({ theme }) => theme.backgroundLight};
  border-top: 5px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Overlay per coprire la UI durante l’elaborazione
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: white;
  font-size: 1.1rem;
`;

// Styled components
const CalculatorContainer = styled.div`
  position: relative;
  z-index: 2;
`;

const CalculatorCard = styled(Card)`
  max-width: 900px;
  margin: 0 auto;
`;

const CalculatorHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CalculatorIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  color: white;
  font-size: 1.8rem;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 1rem;
  }
`;

const CalculatorTitle = styled.h3`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const CalculatorDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin: 0;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundLight};
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  background-color: transparent;
  color: ${({ active, theme }) => (active ? theme.primary : theme.textLight)};
  border: none;
  border-bottom: 3px solid
    ${({ active, theme }) => (active ? theme.primary : "transparent")};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme, active }) => (!active ? theme.text : theme.primary)};
  }

  svg {
    margin-right: 8px;
  }
`;

const CalculatorForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}30;
  }
`;

const UploadContainer = styled.div`
  border: 2px dashed
    ${({ theme, isDragActive }) =>
      isDragActive ? theme.primary : theme.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  background-color: ${({ theme, isDragActive }) =>
    isDragActive ? `${theme.primary}10` : "transparent"};
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => `${theme.primary}10`};
  }
`;

const UploadIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textLight};
`;

const FileInput = styled.input`
  display: none;
`;

const UploadedFile = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundLight};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1rem;
`;

const FileIcon = styled.div`
  margin-right: 1rem;
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
`;

const FileInfo = styled.div`
  flex: 1;
`;

const FileName = styled.p`
  margin: 0;
  font-weight: 500;
`;

const FileSize = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textLight};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.error};
  }
`;

const CalculatorResultContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const ResultTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const SavingsAmount = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
  text-align: center;
`;

const ResultDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 1.5rem;
  text-align: center;
`;

const DetailedResults = styled.div`
  margin-top: 2rem;
`;

const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundLight};

  &:last-child {
    border-bottom: none;
  }
`;

const ResultLabel = styled.span`
  color: ${({ theme }) => theme.text};
  font-weight: ${({ isBold }) => (isBold ? "bold" : "normal")};
`;

const ResultValue = styled.span`
  color: ${({ theme, isHighlighted }) =>
    isHighlighted ? theme.primary : theme.text};
  font-weight: ${({ isBold }) => (isBold ? "bold" : "normal")};
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => `${theme.error}20`};
  color: ${({ theme }) => theme.error};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    flex-shrink: 0;
  }
`;

const SuccessMessage = styled.div`
  background-color: ${({ theme }) => `${theme.success}20`};
  color: ${({ theme }) => theme.success};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    flex-shrink: 0;
  }
`;

// Simulazione dell’estrazione dati dalla bolletta
const simulateBillDataExtraction = async (file, type) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // (Come prima)
      const fileName = file.name.toLowerCase();
      let provider = "Fornitore Generico";
      const providers = [
        "enel",
        "eni",
        "a2a",
        "edison",
        "acea",
        "iren",
        "sorgenia",
        "hera",
      ];
      for (const p of providers) {
        if (fileName.includes(p)) {
          provider = p.charAt(0).toUpperCase() + p.slice(1);
          break;
        }
      }

      const consumption =
        type === "electricity"
          ? Math.floor(Math.random() * 300) + 150
          : Math.floor(Math.random() * 100) + 50;
      const unitCost =
        type === "electricity"
          ? Math.random() * 0.03 + 0.08
          : Math.random() * 0.1 + 0.3;

      const totalAmount = Math.round(consumption * unitCost * 100) / 100;
      const periodDays = 30 + Math.floor(Math.random() * 30);
      const annualizationFactor = 365 / periodDays;
      const annualizedConsumption = Math.round(
        consumption * annualizationFactor,
      );
      const annualizedCost = Math.round(totalAmount * annualizationFactor);

      resolve({
        provider,
        consumption,
        unitCost,
        totalAmount,
        periodStart: "01/01/2023",
        periodEnd: "31/01/2023",
        periodDays,
        annualizedConsumption,
        annualizedCost,
      });
    }, 2000);
  });
};

const AdvancedCalculator = ({ type = "electricity" }) => {
  // Stato per i tab
  const [activeTab, setActiveTab] = useState("manual");
  // Stato form manuale
  const [calculatorData, setCalculatorData] = useState({
    consumo: "",
    importo: "",
    persone: type === "electricity" ? "2" : "",
    metri: type === "gas" ? "" : "",
    zona: "nord",
    provider: "",
    potenza: type === "electricity" ? "" : "",
  });
  // Upload file
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [fileError, setFileError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // **Novità**: stato per l’indicatore di caricamento del calcolo manuale
  const [isCalculating, setIsCalculating] = useState(false);

  // Risultati
  const [calculationResult, setCalculationResult] = useState(null);

  // handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["consumo", "importo", "metri"].includes(name)) {
      if (value === "" || !isNaN(parseFloat(value))) {
        setCalculatorData({ ...calculatorData, [name]: value });
      }
      return;
    }
    setCalculatorData({ ...calculatorData, [name]: value });
  };

  // validazione
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!calculatorData.consumo || parseFloat(calculatorData.consumo) <= 0) {
      errors.consumo = "Inserisci un valore valido per il consumo";
      isValid = false;
    }
    if (!calculatorData.importo || parseFloat(calculatorData.importo) <= 0) {
      errors.importo = "Inserisci un importo valido";
      isValid = false;
    }
    if (
      type === "gas" &&
      calculatorData.metri &&
      parseFloat(calculatorData.metri) <= 0
    ) {
      errors.metri = "Inserisci un valore valido per i metri quadri";
      isValid = false;
    }

    return { isValid, errors };
  };

  // Drag and drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    setFileError("");
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploadedFile(file);
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    setFileError("");
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Calcolo manuale con feedback visivo
  const handleManualCalculation = (e) => {
    e.preventDefault();
    setIsCalculating(true); // Mostra indicatore di caricamento

    const { isValid, errors } = validateForm();
    if (!isValid) {
      setFileError(Object.values(errors)[0]);
      setIsCalculating(false); // Nascondi caricamento, errore
      return;
    }

    // Ritardo artificiale per mostrare UI di caricamento
    setTimeout(() => {
      try {
        // Logica di calcolo
        const consumo = parseFloat(calculatorData.consumo) || 0;
        const importo = parseFloat(calculatorData.importo) || 0;
        const solidaRate = type === "electricity" ? 0.069 : 0.28;
        const unitCost = importo / consumo;
        let savingsPercentage = Math.min(
          Math.max(Math.round(((unitCost - solidaRate) / unitCost) * 100), 5),
          30,
        );
        const annualConsumption =
          type === "electricity" ? consumo * 12 : consumo;
        const annualCost = unitCost * annualConsumption;
        const savingsAmount = Math.round(
          (savingsPercentage / 100) * annualCost,
        );
        const co2ReductionKg = Math.round(
          type === "electricity"
            ? annualConsumption * 0.35 * (savingsPercentage / 100)
            : annualConsumption * 2.5 * (savingsPercentage / 100),
        );

        // Risultato
        const newCalculation = {
          annualConsumption,
          annualCost,
          savingsAmount,
          savingsPercentage,
          co2ReductionKg,
          currentUnitCost: unitCost.toFixed(3),
          potentialUnitCost: solidaRate.toFixed(3),
          estimatedNewAnnualCost: annualCost - savingsAmount,
          animateResult: true, // per potenziali animazioni
        };

        setCalculationResult(newCalculation);
        setActiveTab("results");
      } catch (error) {
        setFileError("Errore durante il calcolo. Verifica i dati inseriti.");
        console.error("Calculation error:", error);
      } finally {
        setIsCalculating(false); // Fine caricamento
      }
    }, 800);
  };

  // Analisi bolletta
  const handleBillAnalysis = async (e) => {
    e.preventDefault();
    if (!uploadedFile) {
      setFileError("Carica una bolletta per procedere con l'analisi");
      return;
    }
    setIsAnalyzing(true);
    setFileError("");

    try {
      if (uploadedFile.size > 5 * 1024 * 1024) {
        throw new Error("Il file è troppo grande. Dimensione massima: 5MB");
      }
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (!validTypes.includes(uploadedFile.type)) {
        throw new Error(
          "Formato file non supportato. Carica un file PDF, JPG, PNG o XLSX",
        );
      }

      const extractedData = await simulateBillDataExtraction(
        uploadedFile,
        type,
      );
      const solidaRate = type === "electricity" ? 0.069 : 0.28;
      const {
        consumption,
        unitCost,
        annualizedConsumption,
        annualizedCost,
        provider,
      } = extractedData;
      const savingsPercentage = Math.min(
        Math.round(((unitCost - solidaRate) / unitCost) * 100),
        30,
      );
      const savingsAmount = Math.round(
        (savingsPercentage / 100) * annualizedCost,
      );
      const co2ReductionKg = Math.round(
        type === "electricity"
          ? annualizedConsumption * 0.35 * (savingsPercentage / 100)
          : annualizedConsumption * 2.5 * (savingsPercentage / 100),
      );

      const calculationResult = {
        currentProvider: provider,
        consumption,
        unitCost,
        annualConsumption: annualizedConsumption,
        annualCost: annualizedCost,
        savingsPercentage,
        savingsAmount,
        co2ReductionKg,
        currentUnitCost: unitCost.toFixed(3),
        potentialUnitCost: solidaRate.toFixed(3),
        estimatedNewAnnualCost: annualizedCost - savingsAmount,
      };

      setCalculationResult(calculationResult);
      setActiveTab("results");
    } catch (error) {
      setFileError(error.message || "Errore durante l'analisi della bolletta");
      console.error("Error analyzing bill:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset
  const resetCalculator = () => {
    setCalculatorData({
      consumo: "",
      importo: "",
      persone: type === "electricity" ? "2" : "",
      metri: type === "gas" ? "" : "",
      zona: "nord",
      provider: "",
      potenza: type === "electricity" ? "" : "",
    });
    setUploadedFile(null);
    setCalculationResult(null);
    setFileError("");
    setActiveTab("manual");
  };

  return (
    <CalculatorContainer>
      {/* Overlay di caricamento per il calcolo manuale */}
      {isCalculating && (
        <LoadingOverlay>
          <LoadingSpinner />
          <LoadingText>Elaborazione in corso...</LoadingText>
        </LoadingOverlay>
      )}

      <CalculatorCard elevation="medium" padding="2rem">
        <CalculatorHeader>
          <CalculatorIcon>
            <FaCalculator />
          </CalculatorIcon>
          <div>
            <CalculatorTitle>Simulatore di Risparmio Avanzato</CalculatorTitle>
            <CalculatorDescription>
              Calcola quanto puoi risparmiare passando a Solida-Energia
            </CalculatorDescription>
          </div>
        </CalculatorHeader>

        {/* Tabs */}
        <TabsContainer>
          <Tab
            active={activeTab === "manual"}
            onClick={() => setActiveTab("manual")}
          >
            <FaCalculator />
            Calcolo Manuale
          </Tab>
          <Tab
            active={activeTab === "upload"}
            onClick={() => setActiveTab("upload")}
          >
            <FaFileUpload />
            Carica Bolletta
          </Tab>
          {calculationResult && (
            <Tab
              active={activeTab === "results"}
              onClick={() => setActiveTab("results")}
            >
              <FaChartBar />
              Risultati
            </Tab>
          )}
        </TabsContainer>

        {fileError && (
          <ErrorMessage>
            <FaExclamationTriangle />
            <span>{fileError}</span>
          </ErrorMessage>
        )}

        {/* Tab manuale */}
        {activeTab === "manual" && (
          <form onSubmit={handleManualCalculation}>
            <CalculatorForm>
              <FormGroup>
                <FormLabel htmlFor="consumo">
                  Consumo{" "}
                  {type === "electricity" ? "mensile (kWh)" : "annuo (Smc)"}
                </FormLabel>
                <FormInput
                  id="consumo"
                  name="consumo"
                  placeholder={type === "electricity" ? "Es. 250" : "Es. 1000"}
                  value={calculatorData.consumo}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="importo">
                  Importo ultima bolletta (€)
                </FormLabel>
                <FormInput
                  id="importo"
                  name="importo"
                  placeholder="Es. 80"
                  value={calculatorData.importo}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="provider">Fornitore attuale</FormLabel>
                <FormInput
                  id="provider"
                  name="provider"
                  placeholder="Es. Enel, Eni, ecc."
                  value={calculatorData.provider}
                  onChange={handleInputChange}
                />
              </FormGroup>

              {type === "electricity" ? (
                <FormGroup>
                  <FormLabel htmlFor="persone">
                    Numero componenti famiglia
                  </FormLabel>
                  <FormSelect
                    id="persone"
                    name="persone"
                    value={calculatorData.persone}
                    onChange={handleInputChange}
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 persone</option>
                    <option value="3">3 persone</option>
                    <option value="4">4 persone</option>
                    <option value="5">5 o più persone</option>
                  </FormSelect>
                </FormGroup>
              ) : (
                <FormGroup>
                  <FormLabel htmlFor="metri">Metri quadri abitazione</FormLabel>
                  <FormInput
                    id="metri"
                    name="metri"
                    placeholder="Es. 80"
                    value={calculatorData.metri}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              )}

              {type === "electricity" && (
                <FormGroup>
                  <FormLabel htmlFor="potenza">
                    Potenza contatore (kW)
                  </FormLabel>
                  <FormSelect
                    id="potenza"
                    name="potenza"
                    value={calculatorData.potenza}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleziona potenza</option>
                    <option value="3">3 kW</option>
                    <option value="4.5">4.5 kW</option>
                    <option value="6">6 kW</option>
                    <option value="other">Altra potenza</option>
                  </FormSelect>
                </FormGroup>
              )}

              <FormGroup>
                <FormLabel htmlFor="zona">Zona geografica</FormLabel>
                <FormSelect
                  id="zona"
                  name="zona"
                  value={calculatorData.zona}
                  onChange={handleInputChange}
                >
                  <option value="nord">Nord Italia</option>
                  <option value="centro">Centro Italia</option>
                  <option value="sud">Sud Italia e Isole</option>
                </FormSelect>
              </FormGroup>
            </CalculatorForm>

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Button
                type="submit"
                size="large"
                variant="secondary"
                icon={<FaCalculator />}
              >
                Calcola il Risparmio
              </Button>
            </div>
          </form>
        )}

        {/* Tab upload */}
        {activeTab === "upload" && (
          <form onSubmit={handleBillAnalysis}>
            <div>
              <UploadContainer
                isDragActive={isDragActive}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload").click()}
              >
                <FileInput
                  type="file"
                  id="file-upload"
                  accept=".pdf,.jpg,.jpeg,.png,.xlsx"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />

                {!uploadedFile ? (
                  <>
                    <UploadIcon>
                      <FaFileUpload />
                    </UploadIcon>
                    <UploadText>
                      Trascina qui la tua bolletta o clicca per caricarla
                    </UploadText>
                    <UploadText style={{ fontSize: "0.85rem" }}>
                      Formati supportati: PDF, JPG, PNG, XLSX (max 5MB)
                    </UploadText>
                  </>
                ) : (
                  <UploadedFile>
                    <FileIcon>
                      {uploadedFile.type.includes("pdf") ? (
                        <FaFilePdf />
                      ) : (
                        <FaFileAlt />
                      )}
                    </FileIcon>
                    <FileInfo>
                      <FileName>{uploadedFile.name}</FileName>
                      <FileSize>{formatFileSize(uploadedFile.size)}</FileSize>
                    </FileInfo>
                    <DeleteButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile();
                      }}
                    >
                      <FaTrash />
                    </DeleteButton>
                  </UploadedFile>
                )}
              </UploadContainer>

              <div style={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  size="large"
                  variant="secondary"
                  icon={<FaChartBar />}
                  disabled={!uploadedFile || isAnalyzing}
                >
                  {isAnalyzing ? "Analisi in corso..." : "Analizza Bolletta"}
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* Tab results */}
        {activeTab === "results" && calculationResult && (
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <CalculatorResultContainer>
              <ResultTitle>Il tuo risparmio stimato</ResultTitle>
              <SavingsAmount>
                € {calculationResult.savingsAmount} / anno
              </SavingsAmount>
              <ResultDescription>
                Passando a Solida-Energia potresti risparmiare fino al{" "}
                {calculationResult.savingsPercentage}% sulla tua bolletta
                {type === "electricity" ? " della luce" : " del gas"}.
              </ResultDescription>

              <DetailedResults>
                <h4 style={{ marginBottom: "1rem" }}>Dettaglio Analisi:</h4>

                {calculationResult.currentProvider && (
                  <ResultRow>
                    <ResultLabel>Fornitore attuale:</ResultLabel>
                    <ResultValue>
                      {calculationResult.currentProvider}
                    </ResultValue>
                  </ResultRow>
                )}

                <ResultRow>
                  <ResultLabel>Consumo annuo stimato:</ResultLabel>
                  <ResultValue>
                    {calculationResult.annualConsumption}{" "}
                    {type === "electricity" ? "kWh" : "Smc"}
                  </ResultValue>
                </ResultRow>

                <ResultRow>
                  <ResultLabel>Costo annuo attuale:</ResultLabel>
                  <ResultValue>
                    € {calculationResult.annualCost?.toFixed(2)}
                  </ResultValue>
                </ResultRow>

                <ResultRow>
                  <ResultLabel>Costo unitario attuale:</ResultLabel>
                  <ResultValue>
                    € {calculationResult.currentUnitCost} /{" "}
                    {type === "electricity" ? "kWh" : "Smc"}
                  </ResultValue>
                </ResultRow>

                <ResultRow>
                  <ResultLabel>Costo unitario Solida:</ResultLabel>
                  <ResultValue isHighlighted>
                    € {calculationResult.potentialUnitCost} /{" "}
                    {type === "electricity" ? "kWh" : "Smc"}
                  </ResultValue>
                </ResultRow>

                <ResultRow>
                  <ResultLabel isBold>Risparmio annuo stimato:</ResultLabel>
                  <ResultValue isBold isHighlighted>
                    € {calculationResult.savingsAmount?.toFixed(2)} (
                    {calculationResult.savingsPercentage}%)
                  </ResultValue>
                </ResultRow>

                <ResultRow>
                  <ResultLabel>Risparmio di CO₂:</ResultLabel>
                  <ResultValue isHighlighted>
                    {calculationResult.co2ReductionKg} kg di CO₂ all'anno
                  </ResultValue>
                </ResultRow>
              </DetailedResults>

              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <SuccessMessage>
                  <FaCheckCircle />
                  <span>
                    Passando a Solida-Energia puoi risparmiare fino a €{" "}
                    {calculationResult.savingsAmount} all'anno!
                  </span>
                </SuccessMessage>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "1rem",
                    marginTop: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    variant="secondary"
                    icon={<FaArrowRight />}
                    to={
                      type === "electricity" ? "/offerte-luce" : "/offerte-gas"
                    }
                  >
                    Scopri le Offerte
                  </Button>
                  <Button
                    variant="secondary"
                    outlined
                    onClick={resetCalculator}
                  >
                    Nuovo Calcolo
                  </Button>
                </div>
              </div>
            </CalculatorResultContainer>
          </ScrollAnimation>
        )}

        {/* Se c'è già un risultato ma siamo su tab diverso */}
        {activeTab !== "results" && calculationResult && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button
              variant="secondary"
              outlined
              icon={<FaChartBar />}
              onClick={() => setActiveTab("results")}
            >
              Visualizza Risultati
            </Button>
          </div>
        )}
      </CalculatorCard>
    </CalculatorContainer>
  );
};

export default AdvancedCalculator;
