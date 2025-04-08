// src/components/dashboard/ConsumptionAnalysis.jsx
import React, { useState } from "react";
import styled from "styled-components";
import {
  FaCalendarAlt,
  FaChartPie,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaEquals,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

// Stile per il container dell'analisi
const AnalysisContainer = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

// Stile per il titolo della sezione
const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.8rem;
    color: ${({ theme }) => theme.primary};
  }
`;

// Stile per la griglia delle statistiche
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

// Stile per un elemento della statistica
const StatItem = styled.div`
  background-color: ${({ theme }) => theme.backgroundLight};
  padding: 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  display: flex;
  flex-direction: column;
`;

// Stile per il titolo della statistica
const StatTitle = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 0.8rem;
`;

// Stile per il valore della statistica
const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

// Stile per la tendenza della statistica
const StatTrend = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
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

// Stile per la griglia dell'analisi
const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

// Stile per un pannello dell'analisi
const AnalysisPanel = styled.div`
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1.5rem;
`;

// Stile per il titolo del pannello
const PanelTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.6rem;
    color: ${({ theme }) => theme.primary};
  }
`;

// Stile per il contenuto del pannello
const PanelContent = styled.div`
  height: 250px;
  position: relative;
`;

// Stile per la legenda del grafico a torta
const PieLegend = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 40%;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    width: 100%;
    margin-top: 1rem;
  }
`;

// Stile per un elemento della legenda
const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

// Stile per il punto colorato della legenda
const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${({ color }) => color};
  margin-right: 0.8rem;
`;

// Stile per il testo della legenda
const LegendText = styled.div`
  font-size: 0.9rem;
  flex: 1;
`;

// Stile per il valore della legenda
const LegendValue = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  min-width: 50px;
  text-align: right;
`;

// Stile per i consigli di risparmio
const SavingTips = styled.div`
  background-color: ${({ theme }) => `${theme.primary}10`};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1.5rem;
  margin-top: 2rem;
`;

// Stile per il titolo dei consigli
const TipsTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
`;

// Stile per la lista dei consigli
const TipsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

// Stile per un elemento della lista
const TipItem = styled.li`
  padding: 0.8rem 0;
  border-bottom: 1px solid ${({ theme }) => `${theme.primary}20`};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  &:first-child {
    padding-top: 0;
  }
`;

// Stile per i controlli di periodo
const PeriodControls = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

// Stile per un selettore di periodo
const PeriodSelector = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: white;
`;

/**
 * Componente per l'analisi dettagliata dei consumi
 * @param {Object} props - Proprietà del componente
 * @param {string} props.type - Tipo di analisi ('electricity' o 'gas')
 * @param {Array} props.data - Dati di consumo
 */
const ConsumptionAnalysis = ({ type, data }) => {
  // Stato per il periodo selezionato
  const [period, setPeriod] = useState("year");

  // Determina l'unità di misura in base al tipo
  const unit = type === "electricity" ? "kWh" : "Smc";

  // Calcola statistiche di base dai dati
  const calculateStats = () => {
    const totalConsumption = data.reduce(
      (sum, item) => sum + item.consumption,
      0,
    );
    const avgConsumption = totalConsumption / data.length;
    const maxConsumption = Math.max(...data.map((item) => item.consumption));
    const lastMonthConsumption = data[data.length - 1].consumption;
    const prevMonthConsumption = data[data.length - 2].consumption;
    const trend =
      lastMonthConsumption > prevMonthConsumption
        ? "up"
        : lastMonthConsumption < prevMonthConsumption
          ? "down"
          : "same";
    const changePercentage = prevMonthConsumption
      ? Math.round(
          ((lastMonthConsumption - prevMonthConsumption) /
            prevMonthConsumption) *
            100,
        )
      : 0;

    return {
      total: totalConsumption,
      average: avgConsumption,
      max: maxConsumption,
      lastMonth: lastMonthConsumption,
      trend,
      changePercentage,
    };
  };

  // Statistiche calcolate
  const stats = calculateStats();

  // Dati per il grafico a torta della distribuzione dei consumi
  const getFasceOrarie = () => {
    // Simulazione dati per fasce orarie
    return [
      { name: "F1 (Ore di punta)", value: 35, color: "#E63946" },
      { name: "F2 (Ore intermedie)", value: 28, color: "#F9A826" },
      { name: "F3 (Ore fuori punta)", value: 37, color: "#4069E1" },
    ];
  };

  // Dati per il grafico a torta del confronto stagionale
  const getConfrontoStagionale = () => {
    // Simulazione dati per il confronto stagionale
    return [
      { name: "Inverno", value: 40, color: "#4069E1" },
      { name: "Primavera", value: 22, color: "#4CAF50" },
      { name: "Estate", value: 15, color: "#E63946" },
      { name: "Autunno", value: 23, color: "#F9A826" },
    ];
  };

  // Dati per il grafico utilizzato
  const pieData =
    type === "electricity" ? getFasceOrarie() : getConfrontoStagionale();

  // Consigli di risparmio in base al tipo
  const getTips = () => {
    if (type === "electricity") {
      return [
        "Sostituisci lampadine tradizionali con LED a basso consumo",
        "Utilizza elettrodomestici in classe energetica A+++",
        "Spegni i dispositivi invece di lasciarli in standby",
        "Programma lavatrice e lavastoviglie nelle ore non di punta (F2 e F3)",
      ];
    } else {
      return [
        "Mantieni una temperatura costante di 20°C in casa",
        "Installa valvole termostatiche sui termosifoni",
        "Verifica l'isolamento termico di porte e finestre",
        "Effettua la manutenzione periodica della caldaia",
      ];
    }
  };

  // Consigli di risparmio
  const tips = getTips();

  return (
    <AnalysisContainer>
      <SectionTitle>
        <FaChartLine />
        Analisi {type === "electricity"
          ? "Consumi Elettrici"
          : "Consumi Gas"}{" "}
        Dettagliata
      </SectionTitle>

      <PeriodControls>
        <PeriodSelector
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="year">Ultimi 12 mesi</option>
          <option value="quarter">Ultimi 3 mesi</option>
          <option value="month">Ultimo mese</option>
        </PeriodSelector>
      </PeriodControls>

      <StatsGrid>
        <StatItem>
          <StatTitle>Consumo Totale</StatTitle>
          <StatValue>
            {stats.total} {unit}
          </StatValue>
        </StatItem>

        <StatItem>
          <StatTitle>Consumo Medio Mensile</StatTitle>
          <StatValue>
            {Math.round(stats.average)} {unit}
          </StatValue>
        </StatItem>

        <StatItem>
          <StatTitle>Consumo Ultimo Mese</StatTitle>
          <StatValue>
            {stats.lastMonth} {unit}
          </StatValue>
          <StatTrend trend={stats.trend}>
            {stats.trend === "up" ? (
              <>
                <FaArrowUp /> +{Math.abs(stats.changePercentage)}%
              </>
            ) : stats.trend === "down" ? (
              <>
                <FaArrowDown /> -{Math.abs(stats.changePercentage)}%
              </>
            ) : (
              <>
                <FaEquals /> 0%
              </>
            )}
          </StatTrend>
        </StatItem>

        <StatItem>
          <StatTitle>Consumo Massimo Mensile</StatTitle>
          <StatValue>
            {stats.max} {unit}
          </StatValue>
        </StatItem>
      </StatsGrid>

      <AnalysisGrid>
        <AnalysisPanel>
          <PanelTitle>
            <FaChartPie />
            {type === "electricity"
              ? "Distribuzione per Fasce Orarie"
              : "Distribuzione Stagionale"}
          </PanelTitle>
          <PanelContent>
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value) => [`${value}%`, ""]}
                  separator=": "
                />
              </PieChart>
            </ResponsiveContainer>

            <PieLegend>
              {pieData.map((entry, index) => (
                <LegendItem key={index}>
                  <LegendColor color={entry.color} />
                  <LegendText>{entry.name}</LegendText>
                  <LegendValue>{entry.value}%</LegendValue>
                </LegendItem>
              ))}
            </PieLegend>
          </PanelContent>
        </AnalysisPanel>

        <AnalysisPanel>
          <PanelTitle>
            <FaCalendarAlt />
            Andamento Mensile
          </PanelTitle>
          <PanelContent>
            {/* Qui si potrebbe inserire un grafico a linea mensile */}
            <div
              style={{ textAlign: "center", paddingTop: "30px", color: "#666" }}
            >
              Il grafico dell'andamento mensile verrà implementato nella
              prossima versione.
            </div>
          </PanelContent>
        </AnalysisPanel>
      </AnalysisGrid>

      <SavingTips>
        <TipsTitle>Consigli per risparmiare</TipsTitle>
        <TipsList>
          {tips.map((tip, index) => (
            <TipItem key={index}>{tip}</TipItem>
          ))}
        </TipsList>
      </SavingTips>
    </AnalysisContainer>
  );
};

export default ConsumptionAnalysis;
