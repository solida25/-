// src/pages/AreaClienti.jsx

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Layout from "../components/common/Layout.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import ParallaxHero from "../components/common/ParallaxHero.jsx";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import SEO from "../components/seo/SEO";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { SEO_CONSTANTS } from "../utils/seoConstants";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaRegLightbulb,
  FaChartLine,
  FaFileInvoiceDollar,
  FaCreditCard,
  FaHeadset,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

/* Animations */
const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(230, 57, 70, 0); }
  100% { box-shadow: 0 0 0 0 rgba(230, 57, 70, 0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

/* Styled Components */
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
  max-width: 800px;
`;

/* Login/Register Section */
const LoginSection = styled.section`
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

const LoginContainer = styled.div`
  flex: 1;
  animation: ${fadeIn} 0.5s ease-out;
`;

const LoginCard = styled(Card)`
  height: 100%;
  position: relative;
  overflow: visible;
  &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
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
      width: 50px;
      height: 50px;
      top: -10px;
      left: -10px;
    }
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const FormDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 2rem;
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
  padding-left: ${({ hasIcon }) => (hasIcon ? "2.5rem" : "1rem")};
  border: 1px solid #ddd;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}30;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textLight};
`;

const PasswordIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.textLight};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const FormActions = styled.div`
  margin-top: 2rem;
`;

const ForgotPassword = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.secondary};
      text-decoration: underline;
    }
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #ddd;
  }
  span {
    padding: 0 1rem;
    color: ${({ theme }) => theme.textLight};
    font-size: 0.9rem;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const ToggleView = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
    text-decoration: underline;
    padding: 0;
    font: inherit;
    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }
`;

/* Features (o "Vantaggi") dell'Area Clienti */
const FeaturesSection = styled.section`
  flex: 1;
  animation: ${slideIn} 0.5s ease-out;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ isRegister }) => (isRegister ? "none" : "block")};
  }
`;

const FeaturesCard = styled(Card)`
  height: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary}CC,
    ${({ theme }) => theme.secondary}CC
  );
  color: white;
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const FeatureContent = styled.div`
  flex: 1;
`;

const FeatureTitle = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const FeatureDescription = styled.p`
  opacity: 0.8;
  font-size: 0.95rem;
`;

/* Security Section */
const SecureSection = styled.section`
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
    z-index: 1;
  }
`;

const SecureContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const SecurityIcon = styled.div`
  width: 80px;
  height: 80px;
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
  font-size: 2.5rem;
  margin: 0 auto 2rem;
`;

const SecurityTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const SecurityDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const SecurityFeatures = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 3rem;
`;

const SecurityFeature = styled.div`
  text-align: center;
  max-width: 200px;
`;

const SecurityFeatureIcon = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const SecurityFeatureTitle = styled.h4`
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const SecurityFeatureDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
`;

/* Messaggi di Successo / Errore */
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

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
    color: #dc3545;
  }
`;

/* Componente AreaClienti */
const AreaClienti = () => {
  const navigate = useNavigate();

  // Stato per il toggle tra login e registrazione
  const [isRegister, setIsRegister] = useState(false);
  // Stato per il recupero password
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [isSubmittingRecovery, setIsSubmittingRecovery] = useState(false);
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  // Stato per mostrare/nascondere la password
  const [showPassword, setShowPassword] = useState(false);
  // Stato per i dati del form
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  // Stato per messaggi di errore e successo
  const [errorMessage, setErrorMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ------------------------------------------------------------------
   * Sezione per la validazione del form (aggiunta/modificata)
   * ------------------------------------------------------------------ */
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Password: min 8 caratteri, almeno una lettera e un numero
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let errors = {};
    let isValid = true;

    // Se siamo in registrazione
    if (isRegister) {
      // Validazione del nome
      if (!formState.name.trim()) {
        errors.name = "Il nome è obbligatorio";
        isValid = false;
      }
      // Validazione password complessa
      if (!passwordRegex.test(formState.password)) {
        errors.password =
          "La password deve contenere almeno 8 caratteri, inclusi lettere e numeri";
        isValid = false;
      }
      // Conferma password
      if (formState.password !== formState.confirmPassword) {
        errors.confirmPassword = "Le password non corrispondono";
        isValid = false;
      }
    }

    // Validazione email
    if (!emailRegex.test(formState.email)) {
      errors.email = "Inserisci un indirizzo email valido";
      isValid = false;
    }

    return { isValid, errors };
  };

  // Funzione per l’invio del form di registrazione, con validazione
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      setErrorMessage(Object.values(validation.errors)[0]);
      return;
    }

    // Se la validazione è ok, prosegui come da logica esistente
    if (
      !formState.name ||
      !formState.email ||
      !formState.password ||
      !formState.confirmPassword
    ) {
      setErrorMessage("Compila tutti i campi richiesti.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        setFormSubmitted(false);
        setIsRegister(false);
      }, 3000);
    }, 1500);
  };

  // Resto del codice invariato...
  const toggleView = () => {
    setIsRegister(!isRegister);
    setErrorMessage("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handlePasswordRecovery = (e) => {
    e.preventDefault();
    const email = e.target.recoveryEmail.value;
    if (!email) {
      setErrorMessage("Inserisci un indirizzo email valido.");
      return;
    }
    setIsSubmittingRecovery(true);
    setErrorMessage("");
    setTimeout(() => {
      setIsSubmittingRecovery(false);
      setRecoverySuccess(true);
      setTimeout(() => {
        setRecoverySuccess(false);
        setIsRecoveringPassword(false);
      }, 5000);
    }, 1500);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!formState.email || !formState.password) {
      setErrorMessage("Compila tutti i campi richiesti.");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage("");
    setTimeout(() => {
      localStorage.setItem("auth_token", "fake-jwt-token");
      localStorage.setItem("user_name", "Mario Rossi");
      navigate("/dashboard");
    }, 1000);
  };

  // Selettore del form da mostrare (login, register o recovery)
  let formContent;
  if (isRecoveringPassword) {
    formContent = (
      <div>
        <FormTitle>Recupera Password</FormTitle>
        <FormDescription>
          Inserisci l'indirizzo email associato al tuo account. Ti invieremo un
          link per reimpostare la password.
        </FormDescription>
        {errorMessage && (
          <ErrorMessage>
            <FaExclamationTriangle /> {errorMessage}
          </ErrorMessage>
        )}
        {recoverySuccess ? (
          <SuccessMessage>
            <FaCheckCircle /> Abbiamo inviato un'email con le istruzioni per
            recuperare la password.
          </SuccessMessage>
        ) : (
          <form onSubmit={handlePasswordRecovery}>
            <FormGroup>
              <FormLabel htmlFor="recoveryEmail">Email</FormLabel>
              <InputContainer>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <FormInput
                  type="email"
                  id="recoveryEmail"
                  name="recoveryEmail"
                  placeholder="Inserisci la tua email"
                  hasIcon
                  required
                />
              </InputContainer>
            </FormGroup>
            <FormActions>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="secondary"
                disabled={isSubmittingRecovery}
              >
                {isSubmittingRecovery
                  ? "Invio in corso..."
                  : "Invia link di recupero"}
              </Button>
              <Button
                type="button"
                fullWidth
                size="large"
                variant="secondary"
                outlined
                onClick={() => setIsRecoveringPassword(false)}
                style={{ marginTop: "1rem" }}
              >
                Torna al login
              </Button>
            </FormActions>
          </form>
        )}
      </div>
    );
  } else if (isRegister) {
    formContent = (
      <div>
        <FormTitle>Crea il tuo account</FormTitle>
        <FormDescription>
          Compila i campi sottostanti per creare il tuo account personale.
        </FormDescription>
        {errorMessage && (
          <ErrorMessage>
            <FaExclamationTriangle /> {errorMessage}
          </ErrorMessage>
        )}
        {formSubmitted ? (
          <SuccessMessage>
            <FaCheckCircle /> Registrazione completata con successo! Ora puoi
            accedere con le tue credenziali.
          </SuccessMessage>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <FormGroup>
              <FormLabel htmlFor="name">Nome e Cognome</FormLabel>
              <InputContainer>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="Inserisci il tuo nome e cognome"
                  hasIcon
                  required
                />
              </InputContainer>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputContainer>
                <InputIcon>
                  <FaEnvelope />
                </InputIcon>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="Inserisci la tua email"
                  hasIcon
                  required
                />
              </InputContainer>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="phone">Telefono</FormLabel>
              <InputContainer>
                <InputIcon>
                  <FaUser />
                </InputIcon>
                <FormInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleInputChange}
                  placeholder="Inserisci il tuo numero di telefono"
                  hasIcon
                />
              </InputContainer>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputContainer>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <FormInput
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  placeholder="Inserisci la tua password"
                  hasIcon
                  required
                />
                <PasswordIcon onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordIcon>
              </InputContainer>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="confirmPassword">Conferma Password</FormLabel>
              <InputContainer>
                <InputIcon>
                  <FaLock />
                </InputIcon>
                <FormInput
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Conferma la tua password"
                  hasIcon
                  required
                />
                <PasswordIcon onClick={toggleShowPassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordIcon>
              </InputContainer>
            </FormGroup>
            <FormActions>
              <Button
                type="submit"
                fullWidth
                size="large"
                icon={<FaArrowRight />}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrazione in corso..." : "Registrati"}
              </Button>
            </FormActions>
          </form>
        )}
        <ToggleView>
          Hai già un account?{" "}
          <button type="button" onClick={toggleView}>
            Accedi
          </button>
        </ToggleView>
      </div>
    );
  } else {
    // Login form
    formContent = (
      <div>
        <FormTitle>Accedi al tuo account</FormTitle>
        <FormDescription>
          Inserisci le tue credenziali per accedere all'area riservata.
        </FormDescription>
        {errorMessage && (
          <ErrorMessage>
            <FaExclamationTriangle /> {errorMessage}
          </ErrorMessage>
        )}
        <form onSubmit={handleLoginSubmit}>
          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputContainer>
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="Inserisci la tua email"
                hasIcon
                required
              />
            </InputContainer>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputContainer>
              <InputIcon>
                <FaLock />
              </InputIcon>
              <FormInput
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formState.password}
                onChange={handleInputChange}
                placeholder="Inserisci la tua password"
                hasIcon
                required
              />
              <PasswordIcon onClick={toggleShowPassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordIcon>
            </InputContainer>
          </FormGroup>
          <FormActions>
            <Button
              type="submit"
              fullWidth
              size="large"
              icon={<FaArrowRight />}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Accesso in corso..." : "Accedi"}
            </Button>
          </FormActions>
          <ForgotPassword>
            <a onClick={() => setIsRecoveringPassword(true)}>
              Password dimenticata?
            </a>
          </ForgotPassword>
        </form>
        <OrDivider>
          <span>oppure</span>
        </OrDivider>
        <SocialButtons>
          <Button fullWidth outlined color="#3b5998">
            Accedi con Facebook
          </Button>
          <Button fullWidth outlined color="#db4437">
            Accedi con Google
          </Button>
        </SocialButtons>
        <ToggleView>
          Non hai ancora un account?{" "}
          <button type="button" onClick={toggleView}>
            Registrati
          </button>
        </ToggleView>
      </div>
    );
  }

  return (
    <Layout
      title="Area Clienti"
      description="Accedi all'area riservata clienti di Solida-Energia"
    >
      <SEO
        title="Area Clienti"
        description="Accedi alla tua area riservata per gestire la tua fornitura, visualizzare le bollette e monitorare i tuoi consumi in tempo reale."
        canonical="/area-clienti"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "area clienti",
          "login",
          "accesso utente",
          "area riservata",
        ]}
        noindex={true}
      />

      {/* Hero Section */}
      <ErrorBoundary>
        <ParallaxHero
          backgroundImage="https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          height="50vh"
        >
          <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
            <HeroTitle>Area Clienti</HeroTitle>
            <HeroDescription>
              Accedi alla tua area riservata per gestire la tua fornitura,
              visualizzare le bollette e monitorare i tuoi consumi in tempo
              reale.
            </HeroDescription>
          </ScrollAnimation>
        </ParallaxHero>
      </ErrorBoundary>

      {/* Login / Register / Recovery Section */}
      <ErrorBoundary>
        <LoginSection>
          <PageContainer>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <SectionTitle>
                  {isRegister
                    ? "Registrati"
                    : isRecoveringPassword
                      ? "Recupera Password"
                      : "Accedi"}
                </SectionTitle>
                <SectionSubtitle style={{ margin: "2rem auto" }}>
                  {isRegister
                    ? "Crea un account per gestire le tue forniture e accedere a tutti i servizi esclusivi"
                    : isRecoveringPassword
                      ? "Recupera l'accesso al tuo account in modo semplice e sicuro"
                      : "Accedi alla tua area personale per gestire le tue forniture e scoprire tutti i vantaggi"}
                </SectionSubtitle>
              </div>
            </ScrollAnimation>

            <ContactGrid style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <LoginContainer>
                <ErrorBoundary>
                  <LoginCard elevation="medium" padding="2.5rem">
                    {formContent}
                  </LoginCard>
                </ErrorBoundary>
              </LoginContainer>

              <FeaturesSection isRegister={isRegister || isRecoveringPassword}>
                <ErrorBoundary>
                  <FeaturesCard elevation="medium" padding="2.5rem">
                    <FormTitle style={{ color: "white" }}>
                      Funzionalità dell'Area Clienti
                    </FormTitle>
                    <FormDescription
                      style={{ color: "rgba(255, 255, 255, 0.8)" }}
                    >
                      Gestisci le tue forniture e accedi a tutti i servizi
                      esclusivi riservati ai clienti Solida-Energia.
                    </FormDescription>
                    <FeaturesList>
                      <FeatureItem>
                        <FeatureIcon>
                          <FaRegLightbulb />
                        </FeatureIcon>
                        <FeatureContent>
                          <FeatureTitle>Gestione Forniture</FeatureTitle>
                          <FeatureDescription>
                            Visualizza e gestisci tutte le tue forniture di luce
                            e gas in un'unica interfaccia.
                          </FeatureDescription>
                        </FeatureContent>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureIcon>
                          <FaChartLine />
                        </FeatureIcon>
                        <FeatureContent>
                          <FeatureTitle>Monitoraggio Consumi</FeatureTitle>
                          <FeatureDescription>
                            Monitora i tuoi consumi in tempo reale e visualizza
                            grafici dettagliati per periodo.
                          </FeatureDescription>
                        </FeatureContent>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureIcon>
                          <FaFileInvoiceDollar />
                        </FeatureIcon>
                        <FeatureContent>
                          <FeatureTitle>Bollette Online</FeatureTitle>
                          <FeatureDescription>
                            Visualizza e scarica le tue bollette in formato PDF,
                            con storico completo.
                          </FeatureDescription>
                        </FeatureContent>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureIcon>
                          <FaCreditCard />
                        </FeatureIcon>
                        <FeatureContent>
                          <FeatureTitle>Pagamenti Sicuri</FeatureTitle>
                          <FeatureDescription>
                            Paga le tue bollette online in modo sicuro e
                            gestisci le modalità di pagamento.
                          </FeatureDescription>
                        </FeatureContent>
                      </FeatureItem>
                      <FeatureItem>
                        <FeatureIcon>
                          <FaHeadset />
                        </FeatureIcon>
                        <FeatureContent>
                          <FeatureTitle>Assistenza Prioritaria</FeatureTitle>
                          <FeatureDescription>
                            Accedi all'assistenza prioritaria e contatta
                            direttamente il tuo consulente.
                          </FeatureDescription>
                        </FeatureContent>
                      </FeatureItem>
                    </FeaturesList>
                  </FeaturesCard>
                </ErrorBoundary>
              </FeaturesSection>
            </ContactGrid>
          </PageContainer>
        </LoginSection>
      </ErrorBoundary>

      {/* Security Section */}
      <ErrorBoundary>
        <SecureSection>
          <SecureContent>
            <ScrollAnimation animationType={ScrollAnimation.types.FADE_IN}>
              <SecurityIcon>
                <FaShieldAlt />
              </SecurityIcon>
              <SecurityTitle>Proteggiamo i tuoi Dati</SecurityTitle>
              <SecurityDescription>
                La sicurezza e la privacy dei tuoi dati sono la nostra priorità.
                Utilizziamo le più avanzate tecnologie di crittografia e
                sicurezza per proteggere le tue informazioni personali e le tue
                transazioni.
              </SecurityDescription>
              <Button variant="secondary" outlined to="/privacy">
                Scopri di più sulla privacy
              </Button>
              <SecurityFeatures>
                <SecurityFeature>
                  <SecurityFeatureIcon>
                    <FaShieldAlt />
                  </SecurityFeatureIcon>
                  <SecurityFeatureTitle>Crittografia</SecurityFeatureTitle>
                  <SecurityFeatureDescription>
                    Connessione protetta con crittografia SSL a 256 bit
                  </SecurityFeatureDescription>
                </SecurityFeature>
                <SecurityFeature>
                  <SecurityFeatureIcon>
                    <FaLock />
                  </SecurityFeatureIcon>
                  <SecurityFeatureTitle>Autenticazione</SecurityFeatureTitle>
                  <SecurityFeatureDescription>
                    Sistema di autenticazione a più fattori
                  </SecurityFeatureDescription>
                </SecurityFeature>
                <SecurityFeature>
                  <SecurityFeatureIcon>
                    <FaUser />
                  </SecurityFeatureIcon>
                  <SecurityFeatureTitle>Privacy</SecurityFeatureTitle>
                  <SecurityFeatureDescription>
                    Dati personali trattati secondo GDPR
                  </SecurityFeatureDescription>
                </SecurityFeature>
              </SecurityFeatures>
            </ScrollAnimation>
          </SecureContent>
        </SecureSection>
      </ErrorBoundary>
    </Layout>
  );
};

export default AreaClienti;
