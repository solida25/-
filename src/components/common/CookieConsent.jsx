import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import cookieService from "../../services/cookieService";
import { FaCookieBite, FaTimesCircle, FaCog } from "react-icons/fa";

const CookieConsentContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 1rem 2rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${({ show }) => (show ? "block" : "none")};
  border-top: 3px solid ${({ theme }) => theme.primary};
`;

const CookieConsentContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CookieText = styled.div`
  flex: 1;
  min-width: 280px;
`;

const CookieTitle = styled.h3`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.primary};
  svg {
    margin-right: 0.5rem;
  }
`;

const CookieDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const CookieLinks = styled.div`
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: underline;
    font-size: 0.9rem;
    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
  }
`;

const CookieButton = styled.button`
  padding: 0.7rem 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
  svg {
    margin-right: 0.5rem;
  }
  &:hover {
    transform: translateY(-2px);
  }
`;

const AcceptButton = styled(CookieButton)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  border: none;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CustomizeButton = styled(CookieButton)`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid #ddd;
  &:hover {
    background-color: ${({ theme }) => theme.backgroundLight};
  }
`;

const RejectButton = styled(CookieButton)`
  background-color: #f5f5f5;
  color: ${({ theme }) => theme.text};
  border: 1px solid #ddd;
  &:hover {
    background-color: #eaeaea;
  }
`;

// Cookie Preferences Modal
const Modal = styled.div`
  display: ${({ show }) => (show ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textLight};
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const CookieOption = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const CookieOptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const CookieOptionTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const CookieOptionDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
  margin: 0.5rem 0;
`;

const Toggle = styled.div`
  position: relative;
  width: 50px;
  height: 24px;
`;

// Aggiornamento qui: rendiamo l'input cliccabile
const ToggleInput = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  &:checked + span {
    background-color: ${({ theme }) => theme.primary};
  }
  &:checked + span:before {
    transform: translateX(26px);
  }
  &:disabled + span {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ModalFooter = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SaveButton = styled(AcceptButton)`
  min-width: 120px;
`;

// Esponiamo globalmente la funzione per aprire le preferenze cookie
if (typeof window !== "undefined") {
  window.openCookiePreferences = () => {
    console.log("openCookiePreferences placeholder");
  };
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    if (!cookieService.hasConsent()) {
      setShowBanner(true);
    } else {
      const savedPreferences = cookieService.getPreferences();
      setCookiePreferences(savedPreferences);
    }
    window.openCookiePreferences = () => {
      setShowPreferences(true);
    };
    return () => {
      window.openCookiePreferences = () => {
        console.warn("Cookie preferences component is not mounted");
      };
    };
  }, []);

  const savePreferences = (preferences) => {
    cookieService.savePreferences(preferences);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setCookiePreferences(allAccepted);
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setCookiePreferences(onlyNecessary);
    savePreferences(onlyNecessary);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    savePreferences(cookiePreferences);
    setShowPreferences(false);
    setShowBanner(false);
  };

  const handlePreferenceChange = (name) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <>
      <CookieConsentContainer show={showBanner}>
        <CookieConsentContent>
          <CookieText>
            <CookieTitle>
              <FaCookieBite /> Informativa sui Cookie
            </CookieTitle>
            <CookieDescription>
              Utilizziamo i cookie per personalizzare contenuti ed annunci,
              fornire funzionalità dei social media e analizzare il nostro
              traffico. Condividiamo inoltre informazioni sul modo in cui
              utilizzi il nostro sito con i nostri partner per analisi,
              pubblicità e social media.
            </CookieDescription>
            <CookieLinks>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/termini">Termini e Condizioni</Link>
            </CookieLinks>
          </CookieText>
          <ButtonGroup>
            <AcceptButton onClick={handleAcceptAll}>Accetta tutti</AcceptButton>
            <CustomizeButton onClick={() => setShowPreferences(true)}>
              <FaCog /> Personalizza
            </CustomizeButton>
            <RejectButton onClick={handleRejectAll}>
              Solo necessari
            </RejectButton>
          </ButtonGroup>
        </CookieConsentContent>
      </CookieConsentContainer>

      <Modal show={showPreferences}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Preferenze Cookie</ModalTitle>
            <CloseButton onClick={() => setShowPreferences(false)}>
              <FaTimesCircle />
            </CloseButton>
          </ModalHeader>

          <CookieOption>
            <CookieOptionHeader>
              <CookieOptionTitle>Cookie Necessari</CookieOptionTitle>
              <Toggle>
                <ToggleInput
                  type="checkbox"
                  checked={cookiePreferences.necessary}
                  disabled
                />
                <ToggleSlider disabled />
              </Toggle>
            </CookieOptionHeader>
            <CookieOptionDescription>
              Questi cookie sono essenziali per il funzionamento del sito e non
              possono essere disattivati.
            </CookieOptionDescription>
          </CookieOption>

          <CookieOption>
            <CookieOptionHeader>
              <CookieOptionTitle>Cookie Funzionali</CookieOptionTitle>
              <Toggle>
                <ToggleInput
                  type="checkbox"
                  checked={cookiePreferences.functional}
                  onChange={() => handlePreferenceChange("functional")}
                />
                <ToggleSlider />
              </Toggle>
            </CookieOptionHeader>
            <CookieOptionDescription>
              Consentono funzionalità e personalizzazione avanzate. Possono
              essere impostati da noi o da terzi.
            </CookieOptionDescription>
          </CookieOption>

          <CookieOption>
            <CookieOptionHeader>
              <CookieOptionTitle>Cookie Analitici</CookieOptionTitle>
              <Toggle>
                <ToggleInput
                  type="checkbox"
                  checked={cookiePreferences.analytics}
                  onChange={() => handlePreferenceChange("analytics")}
                />
                <ToggleSlider />
              </Toggle>
            </CookieOptionHeader>
            <CookieOptionDescription>
              Ci permettono di analizzare le visite e le fonti di traffico per
              migliorare il sito.
            </CookieOptionDescription>
          </CookieOption>

          <CookieOption>
            <CookieOptionHeader>
              <CookieOptionTitle>Cookie di Marketing</CookieOptionTitle>
              <Toggle>
                <ToggleInput
                  type="checkbox"
                  checked={cookiePreferences.marketing}
                  onChange={() => handlePreferenceChange("marketing")}
                />
                <ToggleSlider />
              </Toggle>
            </CookieOptionHeader>
            <CookieOptionDescription>
              Utilizzati per costruire un profilo dei tuoi interessi e mostrarti
              annunci pertinenti.
            </CookieOptionDescription>
          </CookieOption>

          <ModalFooter>
            <CustomizeButton onClick={() => setShowPreferences(false)}>
              Annulla
            </CustomizeButton>
            <SaveButton onClick={handleSavePreferences}>
              Salva preferenze
            </SaveButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CookieConsent;
