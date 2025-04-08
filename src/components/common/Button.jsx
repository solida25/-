// src/components/common/Button.jsx
import React from "react";
import {
  StyledButton,
  StyledLinkButton,
  StyledExternalLink,
} from "./Button.styles.jsx";

/**
 * Componente Button personalizzabile
 *
 * @param {Object} props - Proprietà del componente
 * @param {string} props.variant - Variante del bottone ('primary', 'secondary', 'white')
 * @param {string} props.size - Dimensione del bottone ('small', 'medium', 'large')
 * @param {boolean} props.outlined - Se true, mostra solo il bordo
 * @param {boolean} props.rounded - Se true, ha bordi completamente arrotondati
 * @param {boolean} props.fullWidth - Se true, occupa tutta la larghezza disponibile
 * @param {boolean} props.elevation - Se true, aggiunge un'ombra
 * @param {boolean} props.shimmer - Se true, aggiunge effetto shimmer
 * @param {string} props.color - Colore personalizzato
 * @param {React.ReactNode} props.icon - Icona da mostrare
 * @param {string} props.iconPosition - Posizione dell'icona ('left', 'right')
 * @param {string} props.to - URL per LinkButton (react-router-dom)
 * @param {string} props.href - URL per link esterni
 * @param {string} props.className - Classi CSS aggiuntive
 */
const Button = ({
  children,
  variant = "primary",
  size = "medium",
  outlined = false,
  rounded = false,
  fullWidth = false,
  elevation = true,
  shimmer = false,
  color = null,
  icon = null,
  iconPosition = "right",
  to = null,
  href = null,
  className = "",
  ...props
}) => {
  // Props da passare ai componenti styled
  const buttonProps = {
    variant,
    size,
    outlined,
    rounded,
    fullWidth,
    elevation,
    shimmer,
    color,
    iconPosition,
    className,
    ...props,
  };

  // Contenuto del bottone con gestione icona
  const buttonContent = (
    <>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </>
  );

  // Router Link, external link o button
  if (to) {
    return (
      <StyledLinkButton to={to} {...buttonProps}>
        {buttonContent}
      </StyledLinkButton>
    );
  } else if (href) {
    return (
      <StyledExternalLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...buttonProps}
      >
        {buttonContent}
      </StyledExternalLink>
    );
  } else {
    return <StyledButton {...buttonProps}>{buttonContent}</StyledButton>;
  }
};

export default Button;
