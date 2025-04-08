import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Layout from "../components/common/Layout.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import ParallaxHero from "../components/common/ParallaxHero.jsx";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHeadset,
  FaCheckCircle,
  FaPaperPlane,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.3rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

const ContactSection = styled.section`
  padding: 5rem 0;
  background-color: white;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background-color: white;
    transform: skewY(-2deg);
    z-index: -1;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primary};
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 3rem;
  max-width: 600px;
`;

const ContactInfoCard = styled(Card)`
  height: 100%;
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  margin-right: 1.2rem;
  flex-shrink: 0;
  box-shadow: 0 4px 10px ${({ theme }) => theme.primary}40;
`;

const ContactInfo = styled.div`
  flex: 1;
`;

const ContactLabel = styled.h4`
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
`;

const ContactValue = styled.p`
  color: ${({ theme }) => theme.textLight};
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background-color: ${({ theme, $network }) => {
      switch ($network) {
        case "facebook":
          return "#3b5998";
        case "instagram":
          return "#e1306c";
        case "linkedin":
          return "#0077b5";
        default:
          return theme.primary;
      }
    }};
    color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${({ theme }) => theme.primary}70; }
  70% { box-shadow: 0 0 0 10px ${({ theme }) => theme.primary}00; }
  100% { box-shadow: 0 0 0 0 ${({ theme }) => theme.primary}00; }
`;

const FormContainer = styled(Card)`
  position: relative;
  overflow: visible;

  &::before {
    content: "";
    position: absolute;
    top: -15px;
    right: -15px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary},
      ${({ theme }) => theme.secondary}
    );
    z-index: -1;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      top: -10px;
      right: -10px;
      width: 50px;
      height: 50px;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const InputContainer = styled.div`
  position: relative;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid
    ${({ theme, $isFocused }) => ($isFocused ? theme.primary : "#ddd")};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.3s ease;
  font-size: 1rem;
  background-color: ${({ $isFocused }) => ($isFocused ? "#f9f9f9" : "white")};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}30;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid
    ${({ theme, $isFocused }) => ($isFocused ? theme.primary : "#ddd")};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-size: 1rem;
  background-color: ${({ $isFocused }) => ($isFocused ? "#f9f9f9" : "white")};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}30;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.primary};
  opacity: ${({ $isFocused }) => ($isFocused ? 1 : 0.3)};
  transition: opacity 0.3s ease;
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    color: #28a745;
  }
`;

const MapSection = styled.section`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.backgroundLight};
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 70px;
    background-color: white;
    z-index: 1;
  }

  &::before {
    top: -35px;
    transform: skewY(2deg);
  }

  &::after {
    bottom: -35px;
    transform: skewY(-2deg);
  }
`;

const MapContainer = styled.div`
  position: relative;
  z-index: 2;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  height: 500px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItalyMap = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const FAQSection = styled.section`
  padding: 7rem 0 5rem;
  background-color: white;
  position: relative;
  z-index: 1;
`;

const Contatti = () => {
  // State per gestire i campi del form
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // State per tracciare quale campo è attualmente attivo/focused
  const [focusedField, setFocusedField] = useState(null);

  // State per il messaggio di successo
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handler per il cambio di valore nei campi
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handler per il focus sui campi
  const handleFocus = (field) => {
    setFocusedField(field);
  };

  // Handler per la perdita di focus sui campi
  const handleBlur = () => {
    setFocusedField(null);
  };

  // Handler per l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Qui normalmente ci sarebbe una chiamata API per inviare i dati
    console.log("Form data:", formState);

    // Simuliamo il successo dell'invio
    setTimeout(() => {
      setFormSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Dopo 5 secondi, nascondi il messaggio di successo
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 800);
  };

  return (
    <Layout
      title="Contatti"
      description="Contatta Futura Energia srl per informazioni, assistenza o preventivi personalizzati."
    >
      {/* Hero Section */}
      <ParallaxHero
        backgroundImage="https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        height="50vh"
      >
        <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
          <HeroTitle>Contattaci</HeroTitle>
          <HeroDescription>
            Siamo a tua disposizione per qualsiasi informazione o richiesta. Il
            nostro team è pronto ad aiutarti.
          </HeroDescription>
        </ScrollAnimation>
      </ParallaxHero>

      {/* Contact Info and Form Section */}
      <ContactSection>
        <PageContainer>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionTitle>Come possiamo aiutarti?</SectionTitle>
              <SectionSubtitle style={{ margin: "2rem auto" }}>
                Hai domande sulle nostre offerte o hai bisogno di assistenza?
                Siamo qui per te.
              </SectionSubtitle>
            </div>
          </ScrollAnimation>

          <ContactGrid>
            <ScrollAnimation
              animationType={ScrollAnimation.types.SLIDE_RIGHT}
              threshold={0.2}
            >
              <ContactInfoCard elevation="medium" padding="2rem">
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "2rem",
                    color: "#333",
                  }}
                >
                  Informazioni di Contatto
                </h3>

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
                    <ContactValue>
                      Via Foro Buonaparte 59 - 20121 Milano
                    </ContactValue>
                  </ContactInfo>
                </ContactItem>

                <ContactItem>
                  <ContactIcon>
                    <FaClock />
                  </ContactIcon>
                  <ContactInfo>
                    <ContactLabel>Orari di Apertura</ContactLabel>
                    <ContactValue>Lun-Ven: 9:00-18:00</ContactValue>
                    <ContactValue>Sab: 9:00-12:00</ContactValue>
                  </ContactInfo>
                </ContactItem>

                <ContactItem>
                  <ContactIcon>
                    <FaHeadset />
                  </ContactIcon>
                  <ContactInfo>
                    <ContactLabel>Servizio Clienti</ContactLabel>
                    <ContactValue>Lun-Ven: 8:00-20:00</ContactValue>
                    <ContactValue>Sab: 8:00-14:00</ContactValue>
                  </ContactInfo>
                </ContactItem>

                <SocialLinks>
                  <SocialLink
                    href="https://www.facebook.com/profile.php?id=61574769068450"
                    target="_blank"
                    rel="noopener noreferrer"
                    $network="facebook"
                  >
                    <FaFacebook />
                  </SocialLink>
                  <SocialLink
                    href="https://www.instagram.com/solidaenergia2025/"
                    target="_blank"
                    rel="noopener noreferrer"
                    $network="instagram"
                  >
                    <FaInstagram />
                  </SocialLink>
                  <SocialLink
                    href="https://www.linkedin.com/company/solida-energia/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    $network="linkedin"
                  >
                    <FaLinkedin />
                  </SocialLink>
                </SocialLinks>
              </ContactInfoCard>
            </ScrollAnimation>

            <ScrollAnimation
              animationType={ScrollAnimation.types.SLIDE_LEFT}
              threshold={0.2}
              delay="0.2s"
            >
              <FormContainer elevation="medium" padding="2rem">
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "2rem",
                    color: "#333",
                  }}
                >
                  Invia un Messaggio
                </h3>

                {formSubmitted && (
                  <SuccessMessage>
                    <FaCheckCircle /> Il tuo messaggio è stato inviato con
                    successo. Ti risponderemo al più presto.
                  </SuccessMessage>
                )}

                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormLabel htmlFor="name">Nome e Cognome</FormLabel>
                    <InputContainer>
                      <FormInput
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        placeholder="Inserisci il tuo nome e cognome"
                        required
                        $isFocused={focusedField === "name"}
                      />
                    </InputContainer>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <InputContainer>
                      <FormInput
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        placeholder="Inserisci la tua email"
                        required
                        $isFocused={focusedField === "email"}
                      />
                      <InputIcon $isFocused={focusedField === "email"}>
                        <FaEnvelope />
                      </InputIcon>
                    </InputContainer>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="phone">Telefono</FormLabel>
                    <InputContainer>
                      <FormInput
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("phone")}
                        onBlur={handleBlur}
                        placeholder="Inserisci il tuo numero di telefono"
                        $isFocused={focusedField === "phone"}
                      />
                      <InputIcon $isFocused={focusedField === "phone"}>
                        <FaPhone />
                      </InputIcon>
                    </InputContainer>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="subject">Oggetto</FormLabel>
                    <InputContainer>
                      <FormInput
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("subject")}
                        onBlur={handleBlur}
                        placeholder="Inserisci l'oggetto del messaggio"
                        required
                        $isFocused={focusedField === "subject"}
                      />
                    </InputContainer>
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="message">Messaggio</FormLabel>
                    <TextArea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      placeholder="Scrivi il tuo messaggio..."
                      required
                      $isFocused={focusedField === "message"}
                    />
                  </FormGroup>

                  <Button
                    type="submit"
                    fullWidth
                    size="large"
                    icon={<FaPaperPlane />}
                  >
                    Invia Messaggio
                  </Button>
                </form>
              </FormContainer>
            </ScrollAnimation>
          </ContactGrid>
        </PageContainer>
      </ContactSection>

      {/* Map Section */}
      <MapSection>
        <PageContainer>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionTitle>Siamo in Cloud</SectionTitle>
              <SectionSubtitle style={{ margin: "2rem auto" }}>
                Anche se non abbiamo una sede fisica, i nostri dati coprono
                l'intero territorio nazionale.
              </SectionSubtitle>
            </div>
          </ScrollAnimation>

          <ScrollAnimation
            animationType={ScrollAnimation.types.FADE_IN}
            threshold={0.2}
          >
            <MapContainer>
              <ItalyMap
                src="https://images.unsplash.com/photo-1742855751015-5bda25456249?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="paesagio"
              />
            </MapContainer>
          </ScrollAnimation>
        </PageContainer>
      </MapSection>

      {/* FAQ Quick Access Section */}
      <FAQSection>
        <PageContainer>
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <div
              style={{
                textAlign: "center",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              <SectionTitle>Domande Frequenti</SectionTitle>
              <SectionSubtitle style={{ margin: "2rem auto" }}>
                Hai altre domande? Consulta la nostra sezione FAQ o contattaci
                direttamente.
              </SectionSubtitle>
              <Button
                to="/faq"
                size="large"
                variant="secondary"
                rounded
                icon={<FaArrowRight />}
              >
                Vai alle FAQ
              </Button>
            </div>
          </ScrollAnimation>
        </PageContainer>
      </FAQSection>
    </Layout>
  );
};

export default Contatti;
