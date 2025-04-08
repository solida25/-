import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaArrowUp,
  FaLeaf,
  FaCookieBite,
} from "react-icons/fa";

const FooterContainer = styled.footer`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: #ffffff;
  padding: 5rem 0 3rem;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    height: 60px;
    background: white;
    transform: skewY(-2deg);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'><path fill='rgba(255,255,255,0.05)' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'/></svg>")
      no-repeat bottom;
    background-size: cover;
    opacity: 0.1;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.8rem;
  color: #ffffff;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 2px;
  }
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  &:hover {
    color: #ffffff;
    transform: translateX(5px);
  }
  &::before {
    content: "→";
    margin-right: 8px;
    opacity: 0;
    transform: translateX(-5px);
    transition: all 0.3s ease;
  }
  &:hover::before {
    opacity: 1;
    transform: translateX(0);
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const ContactIcon = styled.span`
  margin-right: 1rem;
  color: #ffffff;
  font-size: 1.2rem;
  padding-top: 3px;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactLabel = styled.h4`
  margin-bottom: 0.3rem;
  font-size: 1rem;
  color: #ffffff;
`;

const ContactValue = styled.p`
  margin: 0;
  line-height: 1.4;
`;

const SocialLinks = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 15px;
`;

const SocialIcon = styled.a`
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  &:hover {
    background-color: #ffffff;
    color: ${({ theme }) => theme.primary};
    transform: translateY(-5px);
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 3rem auto 0;
  padding: 1.5rem 2rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CopyrightText = styled.p`
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
`;

const LegalLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const ScrollToTop = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  color: ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 2rem;
  transform: translateY(-50%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-60%);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 768px) {
    position: static;
    margin: 1rem auto;
    transform: none;
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

const SustainabilityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 5px 12px;
  border-radius: 20px;
  margin-top: 1rem;
  svg {
    margin-right: 8px;
    color: #4caf50;
  }
`;

const Newsletter = styled.div`
  margin-top: 1rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 1rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  background-color: rgba(255, 255, 255, 0.9);
  @media (max-width: 768px) {
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }
  &:focus {
    outline: none;
  }
`;

const NewsletterButton = styled.button`
  padding: 0 1.5rem;
  background-color: white;
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  @media (max-width: 768px) {
    padding: 0.8rem;
    border-radius: 4px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    color: white;
  }
`;

const CookiePreferencesButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
  }
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Funzione per aprire le preferenze cookie
  const openCookiePreferences = () => {
    if (window.openCookiePreferences) {
      window.openCookiePreferences();
    } else {
      document.cookie =
        "solida-energia-cookie-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Futura Energia srl</FooterTitle>
          <FooterText>
            La tua fonte di energia affidabile e sostenibile per casa e azienda.
            Offriamo soluzioni energetiche innovative con un occhio di riguardo
            per l'ambiente.
          </FooterText>
          <SustainabilityBadge>
            <FaLeaf /> Energia 100% Verde
          </SustainabilityBadge>
          <SocialLinks>
            <SocialIcon
              href="https://www.facebook.com/profile.php?id=61574769068450"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </SocialIcon>
            <SocialIcon
              href="https://www.instagram.com/solidaenergia2025/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </SocialIcon>
            <SocialIcon
              href="https://www.linkedin.com/company/solida-energia/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
            >
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
        </FooterSection>
        <FooterSection>
          <FooterTitle>Contatti</FooterTitle>
          <ContactItem>
            <ContactIcon>
              <FaPhone />
            </ContactIcon>
            <ContactInfo>
              <ContactLabel>Telefono</ContactLabel>
              <ContactValue>090350 5923</ContactValue>
            </ContactInfo>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <FaEnvelope />
            </ContactIcon>
            <ContactInfo>
              <ContactLabel>Email</ContactLabel>
              <ContactValue>solida@solidaenergia.com</ContactValue>
            </ContactInfo>
          </ContactItem>
          <ContactItem>
            <ContactIcon>
              <FaMapMarkerAlt />
            </ContactIcon>
            <ContactInfo>
              <ContactLabel>Indirizzo</ContactLabel>
              <ContactValue>Via Foro Buonaparte 59 - 20121 Milano</ContactValue>
            </ContactInfo>
          </ContactItem>
          <Newsletter>
            <FooterText>Iscriviti alla nostra newsletter</FooterText>
            <NewsletterForm>
              <NewsletterInput type="email" placeholder="La tua email" />
              <NewsletterButton type="submit">Iscriviti</NewsletterButton>
            </NewsletterForm>
          </Newsletter>
        </FooterSection>
      </FooterContent>
      <BottomBar>
        <CopyrightText>
          &copy; {new Date().getFullYear()} Futura Energia srl. Tutti i diritti
          riservati.
        </CopyrightText>
        <LegalLinks>
          <LegalLink to="/privacy">Privacy Policy</LegalLink>
          <LegalLink to="/termini">Termini e Condizioni</LegalLink>
          <CookiePreferencesButton onClick={openCookiePreferences}>
            <FaCookieBite /> Impostazioni Cookie
          </CookiePreferencesButton>
        </LegalLinks>
        <ScrollToTop onClick={scrollToTop}>
          <FaArrowUp />
        </ScrollToTop>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
