/**
 * Utility functions for bill parsing and analysis
 * This is a simplified version for frontend demonstration.
 * In a real-world scenario, this would be done on the backend.
 */

/**
 * Parse a bill file and extract relevant information
 * @param {File} file - The uploaded bill file
 * @param {string} type - The bill type ("electricity" or "gas")
 * @returns {Promise<Object>} The extracted bill data
 */
export const parseBillFile = async (file) => {
  // In a real application, you would upload the file to the server for processing
  // Here we'll do some simple checks and return mock data

  if (!file) {
    throw new Error("Nessun file fornito");
  }

  // Check file type
  const fileType = file.type;

  if (fileType === "application/pdf") {
    // Simulate PDF parsing
    return await mockPdfParsing(file);
  } else if (fileType.includes("image/")) {
    // Simulate image OCR
    return await mockImageOcr(file);
  } else if (fileType.includes("spreadsheet") || fileType.includes("excel")) {
    // Simulate Excel parsing
    return await mockExcelParsing(file);
  } else {
    throw new Error("Formato file non supportato");
  }
};

/**
 * Calculate potential savings based on bill data
 * @param {Object} billData - The extracted bill data
 * @param {string} type - The bill type ("electricity" or "gas")
 * @returns {Object} Savings analysis
 */
export const calculateSavings = (billData, type) => {
  // Get our competitive rates
  const solidaRate = type === "electricity" ? 0.069 : 0.28;

  // Calculate unit cost from the bill
  const unitCost = billData.totalAmount / billData.consumption;

  // Calculate savings percentage (capped at 30%)
  const savingsPercentage = Math.min(
    Math.round(((unitCost - solidaRate) / unitCost) * 100),
    30,
  );

  // Calculate absolute savings
  const annualConsumption = billData.annualizedConsumption;
  const annualCost = billData.annualizedCost;
  const savingsAmount = Math.round((savingsPercentage / 100) * annualCost);

  // Calculate CO2 reduction
  const co2ReductionKg = Math.round(
    type === "electricity"
      ? annualConsumption * 0.35 * (savingsPercentage / 100) // 0.35 kg CO2 per kWh
      : annualConsumption * 2.5 * (savingsPercentage / 100), // 2.5 kg CO2 per Smc
  );

  return {
    currentProvider: billData.provider,
    periodStart: billData.periodStart,
    periodEnd: billData.periodEnd,
    consumption: billData.consumption,
    annualConsumption: billData.annualizedConsumption,
    billAmount: billData.totalAmount,
    annualCost: billData.annualizedCost,
    savingsPercentage,
    savingsAmount,
    currentUnitCost: unitCost.toFixed(3),
    potentialUnitCost: solidaRate.toFixed(3),
    estimatedNewAnnualCost: annualCost - savingsAmount,
    co2ReductionKg,
    fixedCosts: billData.fixedCosts,
    variableCosts: billData.variableCosts,
    taxes: billData.taxes,
  };
};

// Mock functions for file parsing (in a real app, these would be server-side)

/**
 * Mock PDF parsing
 * @param {File} file - The PDF file
 * @returns {Promise<Object>} Mock extracted data
 */
const mockPdfParsing = async (file) => {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return generateMockBillData(file);
};

/**
 * Mock Image OCR
 * @param {File} file - The image file
 * @returns {Promise<Object>} Mock extracted data
 */
const mockImageOcr = async (file) => {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return generateMockBillData(file);
};

/**
 * Mock Excel parsing
 * @param {File} file - The Excel file
 * @returns {Promise<Object>} Mock extracted data
 */
const mockExcelParsing = async (file) => {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return generateMockBillData(file);
};

/**
 * Generate mock bill data based on the filename
 * @param {File} file - The uploaded file
 * @returns {Object} Mock bill data
 */
const generateMockBillData = (file) => {
  const fileName = file.name.toLowerCase();
  const isElectricity = !fileName.includes("gas");

  // Try to detect provider from filename
  let provider = "fornitore generico";
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

  // Generate random consumption and cost based on type
  const consumption = isElectricity
    ? Math.floor(Math.random() * 300) + 150 // 150-450 kWh
    : Math.floor(Math.random() * 100) + 50; // 50-150 Smc

  // Unit costs are higher than Solida's rates
  const unitCost = isElectricity
    ? Math.random() * 0.03 + 0.09 // 0.09-0.12 €/kWh
    : Math.random() * 0.1 + 0.31; // 0.31-0.41 €/Smc

  // Calculate total amount
  const totalAmount = Math.round(consumption * unitCost * 100) / 100;

  // Generate annual consumption and cost
  const periodDays = 30 + Math.floor(Math.random() * 30); // 30-60 days
  const annualizationFactor = 365 / periodDays;
  const annualizedConsumption = Math.round(consumption * annualizationFactor);
  const annualizedCost = Math.round(totalAmount * annualizationFactor);

  // Generate bill period
  const today = new Date();
  const endDate = new Date(
    today.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000,
  ); // 0-30 days ago
  const startDate = new Date(
    endDate.getTime() - periodDays * 24 * 60 * 60 * 1000,
  );

  // Format dates
  const formatDate = (date) => {
    return date.toLocaleDateString("it-IT");
  };

  // Cost breakdown
  const fixedCosts = Math.round(totalAmount * 0.2 * 100) / 100; // 20% fixed
  const variableCosts = Math.round(totalAmount * 0.65 * 100) / 100; // 65% variable
  const taxes = Math.round(totalAmount * 0.15 * 100) / 100; // 15% taxes

  // Generate more realistic data if we can detect a real provider
  let additionalDetails = {};

  if (provider.toLowerCase() !== "fornitore generico") {
    // Provider-specific tariff names and additional details
    const tariffNames = {
      Enel: ["Easy Luce", "Semplice Luce", "E-Light", "Sempre Con Te"],
      Eni: ["Link Luce", "Sconto Certo Gas", "Flexi Gas", "Energia 3.0"],
      A2a: ["Extra Luce", "Click Gas", "Prezzo Sicuro", "Prezzo Leggero"],
      Edison: ["World Luce", "Best Luce", "Sweet Gas", "Start Gas"],
      Acea: ["Placet Luce", "Viva Luce", "Acea Rapida", "Acea Unica"],
      Iren: ["Iren Casa", "Iren Plus", "Gas Flex", "Luce Web"],
      Sorgenia: ["Next Energy", "Next Gas", "Energy Revolution", "Gas 24"],
      Hera: ["Hera Comm Luce", "Giorno Hera", "Gas Insieme", "Prezzo Netto"],
    };

    const tariffs = tariffNames[provider] || ["Tariffa Standard"];
    const randomTariff = tariffs[Math.floor(Math.random() * tariffs.length)];

    additionalDetails = {
      tariffName: randomTariff,
      contractNumber: "C" + Math.floor(Math.random() * 100000000),
      customerCode: "U" + Math.floor(Math.random() * 10000000),
    };
  }

  return {
    provider,
    consumption,
    unitCost,
    totalAmount,
    periodStart: formatDate(startDate),
    periodEnd: formatDate(endDate),
    periodDays,
    annualizedConsumption,
    annualizedCost,
    fixedCosts,
    variableCosts,
    taxes,
    ...additionalDetails,
  };
};

export default {
  parseBillFile,
  calculateSavings,
};
