import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 3rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
`;

const FooterLink = styled(Link)`
  color: #cccccc;
  margin-bottom: 0.8rem;
  text-decoration: none;

  &:hover {
    color: #0066cc;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #cccccc;
`;

const ContactIcon = styled.span`
  margin-right: 0.8rem;
  color: #0066cc;
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  color: #cccccc;
  font-size: 1.5rem;
  margin-right: 1rem;

  &:hover {
    color: #0066cc;
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 1.5rem 2rem 0;
  border-top: 1px solid #333333;
  text-align: center;
  color: #999999;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Solida-Energia</FooterTitle>
          <p style={{ color: "#cccccc", marginBottom: "1rem" }}>
            La tua fonte di energia affidabile e sostenibile per casa e azienda.
          </p>
          <SocialLinks>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Link Utili</FooterTitle>
          <FooterLink to="/offerte-luce">Offerte Luce</FooterLink>
          <FooterLink to="/offerte-gas">Offerte Gas</FooterLink>
          <FooterLink to="/offerte-business">Soluzioni Business</FooterLink>
          <FooterLink to="/chi-siamo">Chi Siamo</FooterLink>
          <FooterLink to="/blog">Blog & News</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Supporto</FooterTitle>
          <FooterLink to="/contatti">Contatti</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/area-clienti">Area Clienti</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
          <FooterLink to="/termini">Termini e Condizioni</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contatti</FooterTitle>
          <ContactItem>
            <ContactIcon>
              <FaPhone />
            </ContactIcon>
            800 123 456
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <FaEnvelope />
            </ContactIcon>
            info@solida-energia.it
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <FaMapMarkerAlt />
            </ContactIcon>
            Via dell'Energia, 123 - Roma
          </ContactItem>
        </FooterSection>
      </FooterContent>

      <BottomBar>
        <p>
          &copy; {new Date().getFullYear()} Solida-Energia. Tutti i diritti
          riservati.
        </p>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
