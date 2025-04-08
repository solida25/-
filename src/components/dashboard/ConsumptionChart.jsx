// src/components/dashboard/ConsumptionChart.jsx
import React, { useState } from "react";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { FaInfoCircle } from "react-icons/fa";

// Stile per il container del grafico
const ChartContainer = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  height: 400px;
`;

// Stile per i controlli del grafico
const ChartControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

// Stile per i tab del grafico
const ChartTabs = styled.div`
  display: flex;
`;

// Stile per singolo tab
const ChartTab = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ active, theme }) =>
    active ? theme.primary : "transparent"};
  color: ${({ active }) => (active ? "white" : "inherit")};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  margin-right: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.primary : theme.backgroundLight};
  }
`;

// Stile per i selettori del grafico
const ChartSelects = styled.div`
  display: flex;
  gap: 1rem;
`;

// Stile per il selettore
const ChartSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: white;
`;

// Stile per la tooltip personalizzata
const CustomTooltipContainer = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 0.8rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

// Stile per il titolo della tooltip
const TooltipTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

// Stile per una riga della tooltip
const TooltipRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

// Stile per il punto colorato nella tooltip
const TooltipDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 0.5rem;
`;

// Stile per il testo della tooltip
const TooltipText = styled.div`
  color: ${({ theme }) => theme.textLight};

  span {
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }
`;

// Stile per la legenda del grafico
const ChartLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
`;

// Stile per un elemento della legenda
const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

// Stile per il punto colorato della legenda
const LegendDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 0.5rem;
`;

// Stile per il testo della legenda
const LegendText = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
`;

// Stile per la nota informativa
const InfoNote = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textLight};
  margin-top: 0.5rem;

  svg {
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.info};
  }
`;

/**
 * Componente per la tooltip personalizzata del grafico
 * @param {Object} props - Proprietà del componente
 * @param {boolean} props.active - Se la tooltip è attiva
 * @param {Array} props.payload - Dati della tooltip
 * @param {string} props.label - Etichetta della tooltip
 * @param {string} props.unit - Unità di misura da visualizzare
 */
const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <TooltipTitle>{label}</TooltipTitle>
        {payload.map((entry, index) => (
          <TooltipRow key={index}>
            <TooltipDot color={entry.color} />
            <TooltipText>
              {entry.name}:{" "}
              <span>
                {entry.value} {unit}
              </span>
            </TooltipText>
          </TooltipRow>
        ))}
      </CustomTooltipContainer>
    );
  }

  return null;
};

/**
 * Componente per visualizzare i grafici di consumo
 * @param {Object} props - Proprietà del componente
 * @param {Array} props.electricityData - Dati di consumo elettrico
 * @param {Array} props.gasData - Dati di consumo gas
 */
const ConsumptionChart = ({ electricityData, gasData }) => {
  // Stato per il tipo di grafico (elettricità o gas)
  const [chartType, setChartType] = useState("electricity");

  // Stato per il periodo di visualizzazione
  const [timePeriod, setTimePeriod] = useState("year");

  // Stato per il tipo di visualizzazione (area o barre)
  const [chartView, setChartView] = useState("area");

  // Determina quale dataset usare in base al tipo di grafico selezionato
  const data = chartType === "electricity" ? electricityData : gasData;

  // Determina l'unità di misura in base al tipo di grafico
  const unit = chartType === "electricity" ? "kWh" : "Smc";

  // Determina i colori in base al tipo di grafico
  const primaryColor = chartType === "electricity" ? "#E63946" : "#4069E1";
  const secondaryColor = chartType === "electricity" ? "#F9A826" : "#1E90FF";

  // Filtra i dati in base al periodo selezionato
  const filteredData = timePeriod === "year" ? data : data.slice(-3);

  return (
    <ChartContainer>
      <ChartControls>
        <ChartTabs>
          <ChartTab
            active={chartType === "electricity"}
            onClick={() => setChartType("electricity")}
          >
            Energia Elettrica
          </ChartTab>
          <ChartTab
            active={chartType === "gas"}
            onClick={() => setChartType("gas")}
          >
            Gas
          </ChartTab>
        </ChartTabs>

        <ChartSelects>
          <ChartSelect
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            <option value="year">Ultimi 12 mesi</option>
            <option value="quarter">Ultimi 3 mesi</option>
          </ChartSelect>

          <ChartSelect
            value={chartView}
            onChange={(e) => setChartView(e.target.value)}
          >
            <option value="area">Grafico ad area</option>
            <option value="bar">Grafico a barre</option>
          </ChartSelect>
        </ChartSelects>
      </ChartControls>

      <ResponsiveContainer width="100%" height="80%">
        {chartView === "area" ? (
          <AreaChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: "#E0E0E0" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "#E0E0E0" }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Area
              type="monotone"
              dataKey="consumption"
              name="Consumo"
              stroke={primaryColor}
              fillOpacity={0.8}
              fill={`url(#${chartType}Gradient)`}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="average"
              name="Media"
              stroke={secondaryColor}
              fillOpacity={0.3}
              fill={`url(#${chartType}AverageGradient)`}
              activeDot={{ r: 6 }}
            />
            <defs>
              <linearGradient
                id={`${chartType}Gradient`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient
                id={`${chartType}AverageGradient`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={secondaryColor}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={secondaryColor}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
          </AreaChart>
        ) : (
          <BarChart
            data={filteredData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.2}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: "#E0E0E0" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ stroke: "#E0E0E0" }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip unit={unit} />} />
            <Bar
              dataKey="consumption"
              name="Consumo"
              fill={primaryColor}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="average"
              name="Media"
              fill={secondaryColor}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        )}
      </ResponsiveContainer>

      <ChartLegend>
        <LegendItem>
          <LegendDot color={primaryColor} />
          <LegendText>Tuo consumo</LegendText>
        </LegendItem>
        <LegendItem>
          <LegendDot color={secondaryColor} />
          <LegendText>Media consumo clienti simili</LegendText>
        </LegendItem>
      </ChartLegend>

      <InfoNote>
        <FaInfoCircle />
        <span>
          I dati mostrati si basano sui consumi reali e quelli medi di clienti
          con profilo simile.
        </span>
      </InfoNote>
    </ChartContainer>
  );
};

export default ConsumptionChart;
