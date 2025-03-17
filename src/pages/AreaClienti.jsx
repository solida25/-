import React from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

const ForgotPassword = styled.p`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #0066cc;
    text-decoration: underline;

    &:hover {
      color: #0055aa;
    }
  }
`;

const AreaClienti = () => {
  return (
    <Layout
      title="Area Clienti"
      description="Accedi all'area riservata clienti di Solida-Energia"
    >
      <Container>
        <Title>Area Clienti</Title>
        <LoginForm>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Inserisci la tua email"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Inserisci la tua password"
            />
          </FormGroup>
          <Button type="submit">Accedi</Button>
          <ForgotPassword>
            <a href="#reset-password">Password dimenticata?</a>
          </ForgotPassword>
        </LoginForm>
      </Container>
    </Layout>
  );
};

export default AreaClienti;
