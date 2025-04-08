// src/components/common/ScrollAnimation.styles.jsx
import styled from "styled-components";

// Stili per l'elemento animato
export const AnimatedElement = styled.div`
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  transform: ${({ visible, animationType }) => {
    if (!visible) {
      switch (animationType) {
        case "slide-up":
          return "translateY(30px)";
        case "slide-left":
          return "translateX(30px)";
        case "slide-right":
          return "translateX(-30px)";
        case "zoom-in":
          return "scale(0.9)";
        case "fade-in-up":
          return "translateY(20px)";
        default:
          return "none";
      }
    }
    return "none";
  }};
  transition:
    opacity ${({ duration }) => duration || "0.8s"}
      ${({ easing }) => easing || "ease"},
    transform ${({ duration }) => duration || "0.8s"}
      ${({ easing }) => easing || "ease"};
  transition-delay: ${({ delay }) => delay || "0s"};
  will-change: opacity, transform;
`;
