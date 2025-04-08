// src/components/common/ScrollAnimation.jsx
import React, { useEffect, useRef, useState } from "react";
import { AnimatedElement } from "./ScrollAnimation.styles.jsx";

// Tipi di animazioni disponibili
const ANIMATION_TYPES = {
  FADE_IN: "fade-in",
  SLIDE_UP: "slide-up",
  SLIDE_LEFT: "slide-left",
  SLIDE_RIGHT: "slide-right",
  ZOOM_IN: "zoom-in",
  FADE_IN_UP: "fade-in-up",
};

/**
 * Componente per animare elementi quando entrano nel viewport
 *
 * @param {Object} props - Proprietà del componente
 * @param {React.ReactNode} props.children - Elementi figli da animare
 * @param {string} props.animationType - Tipo di animazione (fade-in, slide-up, etc.)
 * @param {string} props.duration - Durata dell'animazione (es. "0.8s")
 * @param {string} props.delay - Ritardo dell'animazione (es. "0.2s")
 * @param {string} props.easing - Funzione di easing (es. "ease-out")
 * @param {number} props.threshold - Soglia di visibilità (0-1)
 * @param {boolean} props.once - Se true, l'animazione avviene solo una volta
 */
const ScrollAnimation = ({
  children,
  animationType = ANIMATION_TYPES.FADE_IN,
  duration = "0.8s",
  delay = "0s",
  easing = "ease",
  threshold = 0.1,
  once = true,
  className = "",
  style = {},
}) => {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Se l'animazione deve avvenire solo una volta, disconnetti l'observer
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, once]);

  return (
    <AnimatedElement
      ref={elementRef}
      visible={visible}
      animationType={animationType}
      duration={duration}
      delay={delay}
      easing={easing}
      className={className}
      style={style}
    >
      {children}
    </AnimatedElement>
  );
};

// Esportazione dei tipi di animazione per utilizzo esterno
ScrollAnimation.types = ANIMATION_TYPES;

export default ScrollAnimation;
