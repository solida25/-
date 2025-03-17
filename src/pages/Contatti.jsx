import React from 'react';
import styled from 'styled-components';
import Layout from '../components/common/Layout.jsx';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeadset } from 'react-icons/fa';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ContactForm = styled.form`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const InfoIcon = styled.span`
  font-size: 1.5rem;
  color: #0066cc;
  margin-right: 1rem;
  width: 30px;
  text-align: center;
`;

const InfoText = styled.div``;

const InfoLabel = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.3rem;
`;

const InfoValue = styled.p`
  color: #666666;
`;

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 150px;
`;

const Button = styled.button`
  background-color: #0066cc;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0055aa;
  }
`;

const MapSection = styled.div`
  margin-bottom: 4rem;
`;

const MapTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.8rem;
`;

const MapPlaceholder = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 1.2rem;
`;

const Contatti = () => {
  return (
    <Layout
      title="Contatti"
      description="Contatta Solida-Energia per informazioni, assistenza o preventivi personalizzati."
    >
      <PageContainer>
        <PageTitle>Contattaci</PageTitle>

        <ContactGrid>
          <ContactInfo>
            <InfoTitle>Informazioni di Contatto</InfoTitle>

            <InfoItem>
              <InfoIcon>
                <FaPhone />
              </InfoIcon>
              <InfoText>
                <InfoLabel>Telefono</InfoLabel>
                <InfoValue>800 123 456</InfoValue>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FaEnvelope />
              </InfoIcon>
              <InfoText>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>info@solida-energia.it</InfoValue>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FaMapMarkerAlt />
              </InfoIcon>
              <InfoText>
                <InfoLabel>Indirizzo</InfoLabel>
                <InfoValue>Via dell'Energia, 123 - 00100 Roma</InfoValue>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FaClock />
              </InfoIcon>
              <InfoText>
                <InfoLabel>Orari di Apertura</InfoLabel>
                <InfoValue>Lun-Ven: 9:00-18:00</InfoValue>
                <InfoValue>Sab: 9:00-12:00</InfoValue>
              </InfoText>
            </InfoItem>

            <InfoItem>
              <InfoIcon>
                <FaHeadset />
              </InfoIcon>
              <InfoText>
                <InfoLabel>Servizio Clienti</InfoLabel>
                <InfoValue>Lun-Ven: 8:00-20:00</InfoValue>
                <InfoValue>Sab: 8:00-14:00</InfoValue>
              </InfoText>
            </InfoItem>
          </ContactInfo>

          <ContactForm>
            <FormTitle>Invia un Messaggio</FormTitle>

            <FormGroup>
              <Label htmlFor="name">Nome e Cognome</Label>
              <Input type="text" id="name" placeholder="Inserisci il tuo nome e cognome" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Inserisci la tua email" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Telefono</Label>
              <Input type="tel" id="phone" placeholder="Inserisci il tuo numero di telefono" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Oggetto</Label>
              <Input type="text" id="subject" placeholder="Inserisci l'oggetto del messaggio" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Messaggio</Label>
              <TextArea id="message" placeholder="Scrivi il tuo messaggio..." />