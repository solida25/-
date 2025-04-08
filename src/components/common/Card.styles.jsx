// src/components/common/Card.styles.jsx
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// Stili comuni per i diversi tipi di card
export const cardStyles = css`
  background-color: white;
  border-radius: ${({ theme, rounded }) =>
    rounded ? theme.borderRadius.large : theme.borderRadius.medium};
  overflow: hidden;
  position: relative;
  transition: all ${({ theme }) => theme.transitions.default};
  height: ${({ fullHeight }) => (fullHeight ? "100%" : "auto")};
  display: flex;
  flex-direction: column;

  /* Gestione dell'elevazione/ombra */
  box-shadow: ${({ theme, elevation }) => {
    switch (elevation) {
      case "none":
        return "none";
      case "small":
        return theme.shadows.small;
      case "large":
        return theme.shadows.large;
      case "hover":
        return theme.shadows.medium;
      default:
        return theme.shadows.medium; // medium è il default
    }
  }};

  /* Effetto hover */
  ${({ hoverEffect, theme }) => {
    if (hoverEffect === "lift") {
      return css`
        &:hover {
          transform: translateY(-8px);
          box-shadow: ${theme.shadows.hover};
        }
      `;
    }
    if (hoverEffect === "glow") {
      return css`
        &:hover {
          box-shadow: 0 5px 20px ${theme.primary}40;
        }
      `;
    }
    if (hoverEffect === "border") {
      return css`
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            to right,
            ${theme.primary},
            ${theme.secondary}
          );
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        &:hover::after {
          transform: scaleX(1);
        }
      `;
    }
    return "";
  }}

  /* Bordo personalizzato */
  ${({ bordered, borderColor, theme }) =>
    bordered &&
    css`
      border: 1px solid ${borderColor || theme.backgroundLight};
    `}
`;

// Componente Card base
export const CardContainer = styled.div`
  ${cardStyles}
`;

// Componente Card collegabile
export const LinkCardContainer = styled(Link)`
  ${cardStyles}
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

// Componente Card con link esterno
export const ExternalLinkCardContainer = styled.a`
  ${cardStyles}
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

// Stili per intestazione della card
export const CardHeader = styled.div`
  position: relative;

  &::after {
    content: "";
    display: ${({ $hasLine }) => ($hasLine ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 1px;
    background-color: ${({ theme }) => theme.backgroundLight};
  }
`;

// Stili per contenuto della card
export const CardContent = styled.div`
  padding: ${({ padding }) => padding || "1.5rem"};
  flex: 1;
`;

// Stili per immagine della card
export const CardImage = styled.div`
  height: ${({ height }) => height || "200px"};
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
  position: relative;

  /* Overlay */
  ${({ overlay, theme }) =>
    overlay &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${typeof overlay === "string"
          ? overlay
          : `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5))`};
      }
    `}

  /* Badge */
  ${({ badge, theme }) =>
    badge &&
    css`
      &::after {
        content: "${badge}";
        position: absolute;
        top: 1rem;
        right: 1rem;
        background-color: ${theme.primary};
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: ${theme.borderRadius.small};
        font-size: 0.8rem;
        font-weight: bold;
      }
    `}
`;

// Stili per il footer della card
export const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.backgroundLight};
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => {
    switch (align) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      case "center":
        return "center";
      case "space-between":
        return "space-between";
      default:
        return "space-between";
    }
  }};
`;

// Stili per titolo della card
export const CardTitle = styled.h3`
  margin-bottom: ${({ hasSubtitle }) => (hasSubtitle ? "0.5rem" : "1rem")};
  color: ${({ theme }) => theme.text};
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "1.1rem";
      case "large":
        return "1.6rem";
      default:
        return "1.3rem";
    }
  }};

  /* Linea sotto il titolo */
  ${({ $titleUnderline, theme }) =>
    $titleUnderline &&
    css`
      position: relative;
      padding-bottom: 0.6rem;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: ${typeof $titleUnderline === "string"
          ? $titleUnderline
          : "40px"};
        height: 3px;
        background: ${typeof $titleUnderline === "string" &&
        $titleUnderline.includes("#")
          ? $titleUnderline
          : `linear-gradient(to right, ${theme.primary}, ${theme.secondary})`};
        border-radius: 1.5px;
      }
    `}
`;

// Stili per sottotitolo della card
export const CardSubtitle = styled.h4`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textLight};
  font-size: 0.95rem;
  font-weight: normal;
`;
