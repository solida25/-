import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout.jsx';

// Il resto del codice rimane invariato
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  color: #0066cc;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  color: #666666;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: #0066cc;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    background-color: #0055aa;
  }
`;

const NotFound = () => {
  return (
    <Layout title="Pagina non trovata">
      <NotFoundContainer>
        <ErrorCode>404</ErrorCode>
        <ErrorMessage>Pagina non trovata</ErrorMessage>
        <ErrorDescription>
          La pagina che stai cercando non esiste o è stata spostata. Torna alla
          homepage per continuare la navigazione.
        </ErrorDescription>
        <HomeButton to="/">Torna alla Homepage</HomeButton>
      </NotFoundContainer>
    </Layout>
  );
};

export default NotFound;
