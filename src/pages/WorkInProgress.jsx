// Crea un nuovo file WorkInProgress.jsx
import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import Button from "../components/common/Button.jsx";
import { FaTools, FaHome } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
  min-height: 60vh;
`;

const Icon = styled.div`
  font-size: 5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 2rem;
  animation: swing 2s infinite ease-in-out;

  @keyframes swing {
    20% {
      transform: rotate(15deg);
    }
    40% {
      transform: rotate(-10deg);
    }
    60% {
      transform: rotate(5deg);
    }
    80% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const WorkInProgress = () => {
  return (
    <Layout
      title="Area in costruzione"
      description="Quest'area del sito è attualmente in fase di sviluppo."
    >
      <Container>
        <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
          <Icon>
            <FaTools />
          </Icon>
          <Title>Area in costruzione</Title>
          <Message>
            Questa sezione del sito è attualmente in fase di sviluppo. Stiamo
            lavorando per offrirti presto un'area riservata completa e
            funzionale. Nel frattempo, puoi esplorare le altre sezioni del
            nostro sito.
          </Message>
          <Button to="/" size="large" icon={<FaHome />} iconPosition="left">
            Torna alla Home
          </Button>
        </ScrollAnimation>
      </Container>
    </Layout>
  );
};

export default WorkInProgress;
