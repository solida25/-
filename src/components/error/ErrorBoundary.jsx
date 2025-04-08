// src/components/error/ErrorBoundary.jsx
import React, { Component } from "react";
import styled from "styled-components";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";
import Button from "../common/Button";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
  margin: 2rem auto;
  max-width: 800px;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  text-align: center;
`;

const ErrorIcon = styled.div`
  color: ${({ theme }) => theme.error};
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }) => theme.error};
  margin-bottom: 1rem;
  font-size: 1.8rem;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 2rem;
  max-width: 600px;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  margin: 1.5rem 0;
  width: 100%;
  max-width: 700px;

  summary {
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
    padding: 0.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};

    &:hover {
      background-color: ${({ theme }) => theme.backgroundLight};
    }
  }
`;

const ErrorStack = styled.pre`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  overflow: auto;
  text-align: left;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
  max-height: 300px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Aggiorna lo stato così il prossimo render mostrerà l'UI di fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puoi loggare l'errore in un servizio di reportistica
    this.setState({ error, errorInfo });

    // In una app in produzione, qui potresti inviare l'errore a un servizio come Sentry
    console.error("Errore catturato dall'ErrorBoundary:", error, errorInfo);

    // Puoi anche registrare gli errori in un servizio di analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "error", {
        event_category: "ErrorBoundary",
        event_label: error.toString(),
        non_interaction: true,
      });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const isDev = process.env.NODE_ENV === "development";

      return (
        <ErrorContainer>
          <ErrorIcon>
            <FaExclamationTriangle />
          </ErrorIcon>
          <ErrorTitle>Si è verificato un errore</ErrorTitle>
          <ErrorMessage>
            Ci scusiamo per l'inconveniente. Si è verificato un errore
            imprevisto durante il caricamento di questa pagina.
          </ErrorMessage>

          {isDev && this.state.error && (
            <ErrorDetails>
              <summary>Dettagli tecnici (solo in sviluppo)</summary>
              <ErrorStack>
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </ErrorStack>
            </ErrorDetails>
          )}

          <ActionButtons>
            <Button
              onClick={this.handleReload}
              variant="secondary"
              size="medium"
            >
              Ricarica la pagina
            </Button>
            <Button
              onClick={this.handleGoHome}
              icon={<FaHome />}
              iconPosition="left"
              size="medium"
            >
              Torna alla Home
            </Button>
          </ActionButtons>
        </ErrorContainer>
      );
    }

    // Altrimenti, renderizza normalmente i children
    return this.props.children;
  }
}

export default ErrorBoundary;
