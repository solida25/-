// src/components/dashboard/DashboardSummary.jsx
import React from "react";
import styled from "styled-components";
import {
  FaFileInvoiceDollar,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEquals,
  FaBolt,
  FaGasPump,
} from "react-icons/fa";

// Stile per la griglia di riepilogo
const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

// Stile per una carta di riepilogo
const SummaryCard = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: 1.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

// Stile per l'icona della carta
const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
  flex-shrink: 0;
  font-size: 1.8rem;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "electricity":
        return `${theme.primary}15`;
      case "gas":
        return `${theme.info}15`;
      case "bill":
        return `${theme.secondary}15`;
      case "trend":
        return `${theme.success}15`;
      default:
        return `${theme.primary}15`;
    }
  }};
  color: ${({ type, theme }) => {
    switch (type) {
      case "electricity":
        return theme.primary;
      case "gas":
        return theme.info;
      case "bill":
        return theme.secondary;
      case "trend":
        return theme.success;
      default:
        return theme.primary;
    }
  }};
`;

// Stile per il contenuto della carta
const CardContent = styled.div`
  flex: 1;
`;

// Stile per il titolo della carta
const CardTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
`;

// Stile per il valore della carta
const CardValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

// Stile per la tendenza
const TrendIndicator = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ trend, theme }) =>
    trend === "up"
      ? theme.error
      : trend === "down"
        ? theme.success
        : theme.textLight};

  svg {
    margin-right: 0.4rem;
  }
`;

/**
 * Componente per mostrare un riepilogo delle principali statistiche nella dashboard
 * @param {Object} props - Proprietà del componente
 * @param {Object} props.electricityData - Dati relativi al consumo di elettricità
 * @param {Object} props.gasData - Dati relativi al consumo di gas
 * @param {Object} props.billsData - Dati relativi alle bollette
 */
const DashboardSummary = ({ electricityData, gasData, billsData }) => {
  // Calcola il consumo di elettricità dell'ultimo mese
  const lastElectricityConsumption =
    electricityData.length > 0
      ? electricityData[electricityData.length - 1].consumption
      : 0;

  // Calcola il consumo di elettricità del mese precedente
  const prevElectricityConsumption =
    electricityData.length > 1
      ? electricityData[electricityData.length - 2].consumption
      : lastElectricityConsumption;

  // Calcola la variazione percentuale del consumo di elettricità
  const electricityChangePercentage = prevElectricityConsumption
    ? Math.round(
        ((lastElectricityConsumption - prevElectricityConsumption) /
          prevElectricityConsumption) *
          100,
      )
    : 0;

  // Determina la tendenza del consumo di elettricità
  const electricityTrend =
    electricityChangePercentage > 0
      ? "up"
      : electricityChangePercentage < 0
        ? "down"
        : "same";

  // Calcola il consumo di gas dell'ultimo mese
  const lastGasConsumption =
    gasData.length > 0 ? gasData[gasData.length - 1].consumption : 0;

  // Calcola il consumo di gas del mese precedente
  const prevGasConsumption =
    gasData.length > 1
      ? gasData[gasData.length - 2].consumption
      : lastGasConsumption;

  // Calcola la variazione percentuale del consumo di gas
  const gasChangePercentage = prevGasConsumption
    ? Math.round(
        ((lastGasConsumption - prevGasConsumption) / prevGasConsumption) * 100,
      )
    : 0;

  // Determina la tendenza del consumo di gas
  const gasTrend =
    gasChangePercentage > 0 ? "up" : gasChangePercentage < 0 ? "down" : "same";

  // Calcola l'importo dell'ultima bolletta
  const lastBillAmount =
    billsData.length > 0
      ? billsData.reduce(
          (max, bill) =>
            new Date(bill.date.split("/").reverse().join("-")) >
            new Date(max.date.split("/").reverse().join("-"))
              ? bill
              : max,
          billsData[0],
        ).amount
      : 0;

  // Calcola il totale delle bollette dell'ultimo anno
  const currentYear = new Date().getFullYear();
  const yearlyBillTotal = billsData
    .filter((bill) => {
      const year = bill.date.split("/")[2];
      return year === currentYear.toString();
    })
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <SummaryGrid>
      <SummaryCard>
        <CardIcon type="electricity">
          <FaBolt />
        </CardIcon>
        <CardContent>
          <CardTitle>Consumo Elettrico Ultimo Mese</CardTitle>
          <CardValue>{lastElectricityConsumption} kWh</CardValue>
          <TrendIndicator trend={electricityTrend}>
            {electricityTrend === "up" ? (
              <>
                <FaArrowUp /> +{Math.abs(electricityChangePercentage)}%
              </>
            ) : electricityTrend === "down" ? (
              <>
                <FaArrowDown /> -{Math.abs(electricityChangePercentage)}%
              </>
            ) : (
              <>
                <FaEquals /> 0%
              </>
            )}
          </TrendIndicator>
        </CardContent>
      </SummaryCard>

      <SummaryCard>
        <CardIcon type="gas">
          <FaGasPump />
        </CardIcon>
        <CardContent>
          <CardTitle>Consumo Gas Ultimo Mese</CardTitle>
          <CardValue>{lastGasConsumption} Smc</CardValue>
          <TrendIndicator trend={gasTrend}>
            {gasTrend === "up" ? (
              <>
                <FaArrowUp /> +{Math.abs(gasChangePercentage)}%
              </>
            ) : gasTrend === "down" ? (
              <>
                <FaArrowDown /> -{Math.abs(gasChangePercentage)}%
              </>
            ) : (
              <>
                <FaEquals /> 0%
              </>
            )}
          </TrendIndicator>
        </CardContent>
      </SummaryCard>

      <SummaryCard>
        <CardIcon type="bill">
          <FaFileInvoiceDollar />
        </CardIcon>
        <CardContent>
          <CardTitle>Ultima Bolletta</CardTitle>
          <CardValue>€ {lastBillAmount.toFixed(2)}</CardValue>
        </CardContent>
      </SummaryCard>

      <SummaryCard>
        <CardIcon type="trend">
          <FaChartLine />
        </CardIcon>
        <CardContent>
          <CardTitle>Spesa Energetica Anno Corrente</CardTitle>
          <CardValue>€ {yearlyBillTotal.toFixed(2)}</CardValue>
        </CardContent>
      </SummaryCard>
    </SummaryGrid>
  );
};

export default DashboardSummary;
