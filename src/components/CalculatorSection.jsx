import React from "react";
import styled from "styled-components";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import AdvancedCalculator from "./AdvancedCalculator.jsx";

const SectionContainer = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.backgroundLight};
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 70px;
    background-color: white;
    z-index: 1;
  }

  &::before {
    top: -35px;
    transform: skewY(2deg);
  }

  &::after {
    bottom: -35px;
    transform: skewY(-2deg);
  }
`;

const SectionContent = styled.div`
  position: relative;
  z-index: 2;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 3rem;
  max-width: 800px;
`;

/**
 * Reusable section component for the advanced calculator
 * @param {Object} props Component props
 * @param {string} props.type Type of calculator ("electricity" or "gas")
 */
const CalculatorSection = ({ type }) => {
  return (
    <SectionContainer id="calculator">
      <SectionContent>
        <PageContainer>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionTitle>Calcola il tuo Risparmio</SectionTitle>
              <SectionSubtitle style={{ margin: "2rem auto" }}>
                Scopri quanto puoi risparmiare passando a Solida-Energia con il
                nostro simulatore avanzato o caricando direttamente la tua
                bolletta
              </SectionSubtitle>
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            animationType={ScrollAnimation.types.FADE_IN}
            delay="0.2s"
          >
            <AdvancedCalculator type={type} />
          </ScrollAnimation>
        </PageContainer>
      </SectionContent>
    </SectionContainer>
  );
};

export default CalculatorSection;
