// src/components/common/Card.jsx
import React from "react";
import {
  CardContainer,
  LinkCardContainer,
  ExternalLinkCardContainer,
  CardHeader,
  CardContent,
  CardImage,
  CardFooter,
  CardTitle,
  CardSubtitle,
} from "./Card.styles.jsx";

/**
 * Componente Card personalizzabile
 *
 * @param {Object} props - Proprietà del componente
 * @param {React.ReactNode} props.children - Contenuto della card (facoltativo se si usano image, title, etc.)
 * @param {string} props.to - URL per react-router-dom Link
 * @param {string} props.href - URL per link esterni
 * @param {string} props.title - Titolo della card
 * @param {string} props.titleSize - Dimensioni del titolo ('small', 'medium', 'large')
 * @param {boolean|string} props.titleUnderline - Linea sotto il titolo (true o colore specifico)
 * @param {string} props.subtitle - Sottotitolo della card
 * @param {string} props.image - URL dell'immagine
 * @param {string} props.imageHeight - Altezza dell'immagine (es. '200px')
 * @param {boolean|string} props.imageOverlay - Overlay sull'immagine (true o colore specifico)
 * @param {string} props.imageBadge - Badge da mostrare sull'immagine
 * @param {React.ReactNode} props.footer - Contenuto del footer
 * @param {string} props.footerAlign - Allineamento degli elementi nel footer
 * @param {string} props.elevation - Livello di ombra ('none', 'small', 'medium', 'large', 'hover')
 * @param {string} props.hoverEffect - Effetto al passaggio del mouse ('lift', 'glow', 'border')
 * @param {boolean} props.rounded - Bordi arrotondati più pronunciati
 * @param {boolean} props.bordered - Aggiunge un bordo
 * @param {string} props.borderColor - Colore del bordo
 * @param {boolean} props.fullHeight - Se true, occupa tutta l'altezza disponibile
 * @param {string} props.padding - Padding personalizzato per il contenuto
 * @param {string} props.className - Classi CSS aggiuntive
 */
const Card = ({
  children,
  to = null,
  href = null,
  title = null,
  titleSize = "medium",
  titleUnderline = null,
  subtitle = null,
  image = null,
  imageHeight = null,
  imageOverlay = false,
  imageBadge = null,
  footer = null,
  footerAlign = "space-between",
  elevation = "medium",
  hoverEffect = null,
  rounded = false,
  bordered = false,
  borderColor = null,
  fullHeight = false,
  padding = null,
  className = "",
  ...props
}) => {
  // Props comuni
  const cardProps = {
    elevation,
    hoverEffect,
    rounded,
    bordered,
    borderColor,
    fullHeight,
    className,
    ...props,
  };

  // Costruisci il contenuto della card
  const renderCardContent = () => (
    <>
      {image && (
        <CardImage
          src={image}
          height={imageHeight}
          overlay={imageOverlay}
          badge={imageBadge}
        />
      )}

      <CardContent padding={padding}>
        {title && (
          <CardHeader $hasLine={false}>
            <CardTitle
              hasSubtitle={!!subtitle}
              size={titleSize}
              $titleUnderline={titleUnderline}
            >
              {title}
            </CardTitle>
            {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
          </CardHeader>
        )}

        {children}
      </CardContent>

      {footer && <CardFooter align={footerAlign}>{footer}</CardFooter>}
    </>
  );

  // Determina il tipo di card (normale, link interno, link esterno)
  if (to) {
    return (
      <LinkCardContainer to={to} {...cardProps}>
        {renderCardContent()}
      </LinkCardContainer>
    );
  } else if (href) {
    return (
      <ExternalLinkCardContainer
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...cardProps}
      >
        {renderCardContent()}
      </ExternalLinkCardContainer>
    );
  } else {
    return <CardContainer {...cardProps}>{renderCardContent()}</CardContainer>;
  }
};

export default Card;
