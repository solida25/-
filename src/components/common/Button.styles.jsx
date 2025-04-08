// src/components/common/Button.styles.jsx
import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Animazione per l'effetto "shimmer"
export const shimmerAnimation = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Stili base condivisi tra Button e LinkButton
export const baseStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => {
    switch (size) {
      case "small":
        return "0.5rem 1rem";
      case "large":
        return "1rem 2.5rem";
      default:
        return "0.8rem 1.5rem";
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "0.875rem";
      case "large":
        return "1.2rem";
      default:
        return "1rem";
    }
  }};
  font-weight: bold;
  border-radius: ${({ theme, rounded }) =>
    rounded ? "50px" : theme.borderRadius.medium};
  transition: all ${({ theme }) => theme.transitions.default};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  border: none;
  text-decoration: none;
  letter-spacing: 0.5px;

  /* Gestione varianti di colore */
  background: ${({ theme, variant, outlined, color }) => {
    if (outlined) return "transparent";
    if (variant === "secondary") return theme.secondary;
    if (variant === "white") return "#FFFFFF";
    if (color) return color;
    return theme.primary;
  }};

  color: ${({ theme, variant, outlined }) => {
    if (outlined && variant === "secondary") return theme.secondary;
    if (outlined) return theme.primary;
    if (variant === "white") return theme.primary;
    return "#FFFFFF";
  }};

  border: ${({ theme, variant, outlined }) => {
    if (!outlined) return "none";
    if (variant === "secondary") return `2px solid ${theme.secondary}`;
    return `2px solid ${theme.primary}`;
  }};

  box-shadow: ${({ theme, variant, outlined, elevation }) => {
    if (outlined || !elevation) return "none";
    if (variant === "secondary") return `0 4px 15px ${theme.secondary}80`;
    if (variant === "white") return theme.shadows.medium;
    return `0 4px 15px ${theme.primary}80`;
  }};

  /* Effetti hover */
  &:hover {
    transform: ${({ noHoverEffect }) =>
      noHoverEffect ? "none" : "translateY(-3px)"};
    box-shadow: ${({ theme, variant, outlined, noHoverEffect }) => {
      if (outlined || noHoverEffect) return "none";
      if (variant === "secondary") return `0 8px 20px ${theme.secondary}80`;
      if (variant === "white") return theme.shadows.hover;
      return `0 8px 20px ${theme.primary}80`;
    }};

    background: ${({ theme, variant, outlined, color }) => {
      if (!outlined) {
        if (variant === "secondary") return theme.secondaryDark;
        if (variant === "white") return "#F8F8F8";
        if (color) return color;
        return theme.primaryDark;
      }
      return "transparent";
    }};
  }

  /* Effetto disabled */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    `}

  /* Effetto shimmer */
  ${({ shimmer }) =>
    shimmer &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.3) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        background-size: 200% 100%;
        animation: ${shimmerAnimation} 2s infinite;
        z-index: 1;
      }

      & > * {
        position: relative;
        z-index: 2;
      }
    `}

  /* Gestione full width */
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  /* Gestione icona */
  svg {
    margin-left: ${({ iconPosition }) =>
      iconPosition === "right" ? "8px" : "0"};
    margin-right: ${({ iconPosition }) =>
      iconPosition === "left" ? "8px" : "0"};
    font-size: 1.1em;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: ${({ iconPosition }) => {
      if (iconPosition === "right") return "translateX(3px)";
      if (iconPosition === "left") return "translateX(-3px)";
      return "none";
    }};
  }
`;

// Componente Button (per <button>)
export const StyledButton = styled.button`
  ${baseStyles}
`;

// Componente LinkButton (per <Link> di react-router-dom)
export const StyledLinkButton = styled(Link)`
  ${baseStyles}
`;

// Componente ExternalLinkButton (per <a> href esterni)
export const StyledExternalLink = styled.a`
  ${baseStyles}
`;
