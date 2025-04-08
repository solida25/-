// src/components/common/ParallaxHero.jsx
import React, { useEffect, useRef } from "react";
import {
  ParallaxContainer,
  ParallaxBackground,
  ParallaxContent,
} from "./ParallaxHero.styles.jsx";

/**
 * Componente Hero con effetto parallasse
 *
 * @param {Object} props - Proprietà del componente
 * @param {React.ReactNode} props.children - Contenuto del hero
 * @param {string} props.backgroundImage - URL dell'immagine di sfondo
 * @param {string} props.height - Altezza del hero (es. "60vh")
 * @param {string} props.mobileHeight - Altezza del hero su mobile (es. "50vh")
 * @param {string} props.overlay - Colore dell'overlay (es. "rgba(0, 0, 0, 0.5)")
 * @param {string} props.gradient - Gradiente da sovrapporre (es. "linear-gradient(...)")
 * @param {number} props.parallaxSpeed - Velocità dell'effetto parallasse (es. 0.5)
 * @param {string} props.className - Classi CSS aggiuntive
 */
const ParallaxHero = ({
  children,
  backgroundImage,
  height,
  mobileHeight,
  overlay,
  gradient,
  parallaxSpeed = 0.3,
  className,
}) => {
  const parallaxRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !backgroundRef.current) return;

      const scrollPosition = window.scrollY;
      const offset = scrollPosition * parallaxSpeed;

      backgroundRef.current.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [parallaxSpeed]);

  return (
    <ParallaxContainer
      ref={parallaxRef}
      height={height}
      mobileHeight={mobileHeight}
      className={className}
    >
      <ParallaxBackground
        ref={backgroundRef}
        image={backgroundImage}
        overlay={overlay}
        gradient={gradient}
      />
      <ParallaxContent>{children}</ParallaxContent>
    </ParallaxContainer>
  );
};

export default ParallaxHero;
