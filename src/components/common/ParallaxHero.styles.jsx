// src/components/common/ParallaxHero.styles.jsx
import styled from "styled-components";

// Componente con effetto parallasse
export const ParallaxContainer = styled.section`
  position: relative;
  height: ${({ height }) => height || "60vh"};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: ${({ mobileHeight }) => mobileHeight || "50vh"};
  }
`;

export const ParallaxBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
  z-index: 1;
  transform: translateY(${({ offset }) => offset || "0px"});
  will-change: transform;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ overlay }) => overlay || "rgba(0, 0, 0, 0.5)"};
    z-index: 2;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ gradient }) =>
      gradient ||
      "linear-gradient(135deg, rgba(230, 57, 70, 0.4), rgba(249, 168, 38, 0.4))"};
    z-index: 3;
  }
`;

export const ParallaxContent = styled.div`
  position: relative;
  z-index: 4;
  padding: 2rem;
  text-align: center;
  max-width: 1200px;
  width: 100%;
`;
