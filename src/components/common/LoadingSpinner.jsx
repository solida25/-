// src/components/common/LoadingSpinner.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ fullPage }) => (fullPage ? "100vh" : "200px")};
  width: 100%;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid ${({ theme }) => theme.backgroundLight};
  border-top: 5px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
`;

const LoadingSpinner = ({
  fullPage = false,
  text = "Caricamento in corso...",
}) => {
  return (
    <SpinnerContainer fullPage={fullPage}>
      <div style={{ textAlign: "center" }}>
        <Spinner />
        {text && <LoadingText>{text}</LoadingText>}
      </div>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
