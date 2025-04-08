import styled, { css } from "styled-components";

const slideUpAnimation = css`
  transform: translateY(30px);
`;

const slideLeftAnimation = css`
  transform: translateX(30px);
`;

const slideRightAnimation = css`
  transform: translateX(-30px);
`;

const zoomInAnimation = css`
  transform: scale(0.9);
`;

const fadeInUpAnimation = css`
  transform: translateY(20px);
`;

export const AnimatedElement = styled.div`
  opacity: 0;
  transition: all 0.8s ease;
  will-change: opacity, transform;

  ${(props) => {
    if (props.animationType === "slide-up") return slideUpAnimation;
    if (props.animationType === "slide-left") return slideLeftAnimation;
    if (props.animationType === "slide-right") return slideRightAnimation;
    if (props.animationType === "zoom-in") return zoomInAnimation;
    if (props.animationType === "fade-in-up") return fadeInUpAnimation;
    return slideUpAnimation; // default
  }}

  ${(props) =>
    props.visible &&
    css`
      opacity: 1;
      transform: none;
    `}
  
  ${(props) =>
    props.duration &&
    css`
      transition-duration: ${props.duration};
    `}
  
  ${(props) =>
    props.easing &&
    css`
      transition-timing-function: ${props.easing};
    `}
  
  ${(props) =>
    props.delay &&
    css`
      transition-delay: ${props.delay};
    `}
`;
