// src/pages/Dashboard.jsx

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Layout from "../components/common/Layout.jsx";
import ScrollAnimation from "../components/common/ScrollAnimation.jsx";
import ParallaxHero from "../components/common/ParallaxHero.jsx";
import Button from "../components/common/Button.jsx";
import SEO from "../components/seo/SEO";
import StructuredData from "../components/seo/StructuredData";
import ErrorBoundary from "../components/error/ErrorBoundary";
import { SEO_CONSTANTS } from "../utils/seoConstants";

import {
  FaBars,
  FaTachometerAlt,
  FaHome,
  FaChartLine,
  FaFileInvoiceDollar,
  FaBell,
  FaHeadset,
  FaSignOutAlt,
  FaUser,
  FaUserEdit,
  FaCog,
} from "react-icons/fa";

// Import dei componenti della dashboard
import {
  ConsumptionChart,
  ConsumptionAnalysis,
  NotificationsPanel,
  BillsManager,
  DashboardSummary,
} from "../components/dashboard/dashboardComponents.jsx";

// Import dei dati mock
import {
  mockElectricityData,
  mockGasData,
  mockBills,
  mockNotifications,
  mockUserData,
} from "../data/mockDashboardData";

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.backgroundLight};
  min-height: calc(100vh - 70px);
`;

const Sidebar = styled.aside`
  width: 280px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.small};
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    top: 70px;
    left: ${({ isOpen }) => (isOpen ? "0" : "-280px")};
    height: calc(100vh - 70px);
    z-index: 100;
    transition: left 0.3s ease;
  }
`;

const SidebarToggle = styled.button`
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 101;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const UserInfo = styled.div`
  padding: 0 1.5rem 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundLight};
  text-align: center;
`;

const UserAvatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.primary}20`};
  color: ${({ theme }) => theme.primary};
  margin: 0 auto 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
`;

const UserName = styled.h4`
  margin: 0;
  margin-bottom: 0.3rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
`;

const UserEmail = styled.p`
  margin: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
`;

const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;

const NavLink = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: ${({ theme, active }) => (active ? theme.primary : theme.text)};
  background-color: ${({ active, theme }) =>
    active ? `${theme.primary}10` : "transparent"};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => `${theme.primary}10`};
    color: ${({ theme }) => theme.primary};
  }
`;

const NavIcon = styled.span`
  margin-right: 0.8rem;
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
`;

const NavText = styled.span``;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const DashboardSection = styled.section`
  margin-bottom: 2rem;
`;

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Stato per la sezione attiva (dashboard, consumption, bills, notifications, ecc.)
  const [activeSection, setActiveSection] = useState("dashboard");
  // Stato per l'apertura della sidebar su mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Stato per le notifiche
  const [notifications, setNotifications] = useState(mockNotifications);

  // Verifica autenticazione (se non autenticato, reindirizza all'area clienti)
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/area-clienti");
    }
  }, [navigate]);

  // Gestione della sezione attiva basata sul path (URL)
  useEffect(() => {
    const pathSection = location.pathname.split("/").pop();
    if (pathSection && pathSection !== "dashboard") {
      setActiveSection(pathSection);
    } else {
      setActiveSection("dashboard");
    }
  }, [location]);

  // Cambio sezione + sincronizzazione con navigate
  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section !== "dashboard") {
      navigate(`/${section}`);
    } else {
      navigate("/dashboard");
    }
  };

  // Funzione per il logout
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_name");
    navigate("/area-clienti");
  };

  // Funzione per segnare le notifiche come lette
  const handleMarkAsRead = (id) => {
    if (id === "all") {
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true })),
      );
    } else {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    }
  };

  // Funzione per eliminare le notifiche
  const handleDeleteNotification = (id) => {
    if (id === "all") {
      setNotifications([]);
    } else {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  // Se l'utente non è autenticato, reindirizza
  if (!localStorage.getItem("auth_token")) {
    return <Navigate to="/area-clienti" />;
  }

  return (
    <Layout
      title="Dashboard Cliente"
      description="Gestisci le tue forniture, visualizza i consumi e accedi alle tue bollette"
    >
      <SEO
        title="Dashboard Cliente"
        description="Gestisci le tue forniture, visualizza i consumi e accedi alle tue bollette nella tua area personale."
        canonical="/dashboard"
        keywords={[
          ...SEO_CONSTANTS.DEFAULT_KEYWORDS,
          "dashboard",
          "area personale",
          "gestione forniture",
          "monitoraggio consumi",
        ]}
        noindex={true}
      />
      <DashboardContainer>
        <SidebarToggle onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars />
        </SidebarToggle>

        <SidebarOverlay
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen(false)}
        />

        <ErrorBoundary>
          <Sidebar isOpen={sidebarOpen}>
            <UserInfo>
              <UserAvatar>
                <FaUser />
              </UserAvatar>
              <UserName>{mockUserData.name}</UserName>
              <UserEmail>{mockUserData.email}</UserEmail>
              <Button
                size="small"
                variant="secondary"
                outlined
                icon={<FaUserEdit />}
                iconPosition="left"
                onClick={() => handleSectionChange("profile")}
              >
                Modifica Profilo
              </Button>
            </UserInfo>
            <NavMenu>
              <NavItem>
                <NavLink
                  active={activeSection === "dashboard" ? 1 : 0}
                  onClick={() => handleSectionChange("dashboard")}
                >
                  <NavIcon>
                    <FaTachometerAlt />
                  </NavIcon>
                  <NavText>Dashboard</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "contracts" ? 1 : 0}
                  onClick={() => handleSectionChange("contracts")}
                >
                  <NavIcon>
                    <FaHome />
                  </NavIcon>
                  <NavText>Forniture</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "consumption" ? 1 : 0}
                  onClick={() => handleSectionChange("consumption")}
                >
                  <NavIcon>
                    <FaChartLine />
                  </NavIcon>
                  <NavText>Consumi</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "bills" ? 1 : 0}
                  onClick={() => handleSectionChange("bills")}
                >
                  <NavIcon>
                    <FaFileInvoiceDollar />
                  </NavIcon>
                  <NavText>Bollette</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "notifications" ? 1 : 0}
                  onClick={() => handleSectionChange("notifications")}
                >
                  <NavIcon>
                    <FaBell />
                  </NavIcon>
                  <NavText>Notifiche</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "profile" ? 1 : 0}
                  onClick={() => handleSectionChange("profile")}
                >
                  <NavIcon>
                    <FaUser />
                  </NavIcon>
                  <NavText>Profilo</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "settings" ? 1 : 0}
                  onClick={() => handleSectionChange("settings")}
                >
                  <NavIcon>
                    <FaCog />
                  </NavIcon>
                  <NavText>Impostazioni</NavText>
                </NavLink>
              </NavItem>
            </NavMenu>
            <div style={{ padding: "0 1.5rem", marginTop: "auto" }}>
              <Button
                fullWidth
                variant="secondary"
                outlined
                icon={<FaSignOutAlt />}
                iconPosition="left"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Sidebar>
        </ErrorBoundary>

        <MainContent>
          {/* Sezione Dashboard */}
          {activeSection === "dashboard" && (
            <>
              <PageHeader>
                <PageTitle>Dashboard</PageTitle>
                <ActionButtons>
                  <Button
                    variant="secondary"
                    size="small"
                    icon={<FaBell />}
                    iconPosition="left"
                    onClick={() => handleSectionChange("notifications")}
                  >
                    Notifiche
                  </Button>

                  <Button
                    size="small"
                    icon={<FaHeadset />}
                    iconPosition="left"
                    onClick={() => handleSectionChange("support")}
                  >
                    Assistenza
                  </Button>
                </ActionButtons>
              </PageHeader>

              {/* Riepilogo Dashboard */}
              <DashboardSection>
                <ErrorBoundary>
                  <DashboardSummary
                    electricityData={mockElectricityData}
                    gasData={mockGasData}
                    billsData={mockBills}
                  />
                </ErrorBoundary>
              </DashboardSection>

              {/* Notifiche (prime 3) */}
              <DashboardSection>
                <ErrorBoundary>
                  <NotificationsPanel
                    notifications={notifications.slice(0, 3)}
                    onMarkAsRead={handleMarkAsRead}
                    onDeleteNotification={handleDeleteNotification}
                  />
                </ErrorBoundary>
              </DashboardSection>

              {/* Grafico Consumi */}
              <DashboardSection>
                <ErrorBoundary>
                  <ConsumptionChart
                    electricityData={mockElectricityData}
                    gasData={mockGasData}
                  />
                </ErrorBoundary>
              </DashboardSection>

              {/* Sezione Contratti */}
              <DashboardSection>
                <ErrorBoundary>
                  {/* Esempio di card contratti e boll. recenti */}
                  {/* ... (resto del codice contratti) */}
                </ErrorBoundary>
              </DashboardSection>

              {/* Bollette Recenti (es. le prime 5) */}
              <DashboardSection>
                <ErrorBoundary>
                  <BillsManager bills={mockBills.slice(0, 5)} />
                  <div style={{ textAlign: "right", marginTop: "1rem" }}>
                    <Button
                      variant="secondary"
                      outlined
                      icon={<FaFileInvoiceDollar />}
                      onClick={() => handleSectionChange("bills")}
                    >
                      Tutte le bollette
                    </Button>
                  </div>
                </ErrorBoundary>
              </DashboardSection>
            </>
          )}

          {/* Sezione Consumi */}
          {activeSection === "consumption" && (
            <>
              <PageHeader>
                <PageTitle>Analisi Consumi</PageTitle>
                <ActionButtons>
                  <Button
                    variant="secondary"
                    size="small"
                    icon={<FaTachometerAlt />}
                    iconPosition="left"
                    onClick={() => handleSectionChange("dashboard")}
                  >
                    Dashboard
                  </Button>
                </ActionButtons>
              </PageHeader>
              <DashboardSection>
                <ErrorBoundary>
                  <ConsumptionAnalysis
                    type="electricity"
                    data={mockElectricityData}
                  />
                </ErrorBoundary>
              </DashboardSection>
              <DashboardSection>
                <ErrorBoundary>
                  <ConsumptionAnalysis type="gas" data={mockGasData} />
                </ErrorBoundary>
              </DashboardSection>
            </>
          )}

          {/* Sezione Bollette */}
          {activeSection === "bills" && (
            <>
              <PageHeader>
                <PageTitle>Gestione Bollette</PageTitle>
                <ActionButtons>
                  <Button
                    variant="secondary"
                    size="small"
                    icon={<FaTachometerAlt />}
                    iconPosition="left"
                    onClick={() => handleSectionChange("dashboard")}
                  >
                    Dashboard
                  </Button>
                </ActionButtons>
              </PageHeader>
              <DashboardSection>
                <ErrorBoundary>
                  <BillsManager bills={mockBills} />
                </ErrorBoundary>
              </DashboardSection>
            </>
          )}

          {/* Sezione Notifiche */}
          {activeSection === "notifications" && (
            <>
              <PageHeader>
                <PageTitle>Notifiche</PageTitle>
                <ActionButtons>
                  <Button
                    variant="secondary"
                    size="small"
                    icon={<FaTachometerAlt />}
                    iconPosition="left"
                    onClick={() => handleSectionChange("dashboard")}
                  >
                    Dashboard
                  </Button>
                </ActionButtons>
              </PageHeader>
              <DashboardSection>
                <ErrorBoundary>
                  <NotificationsPanel
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onDeleteNotification={handleDeleteNotification}
                  />
                </ErrorBoundary>
              </DashboardSection>
            </>
          )}

          {/* Sezioni “in sviluppo” (profilo, impostazioni, support, ecc.) */}
          {activeSection !== "dashboard" &&
            activeSection !== "consumption" &&
            activeSection !== "bills" &&
            activeSection !== "notifications" && (
              <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                <FaCog
                  style={{
                    fontSize: "4rem",
                    color: "#ddd",
                    marginBottom: "2rem",
                  }}
                />
                <h2>Sezione {activeSection} in sviluppo</h2>
                <p
                  style={{
                    maxWidth: "600px",
                    margin: "1rem auto",
                    color: "#666",
                  }}
                >
                  Questa sezione è attualmente in fase di sviluppo. In una
                  implementazione completa, qui verrebbero visualizzate tutte le
                  funzionalità relative a <strong>{activeSection}</strong>.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => handleSectionChange("dashboard")}
                  style={{ marginTop: "2rem" }}
                >
                  Torna alla Dashboard
                </Button>
              </div>
            )}
        </MainContent>
      </DashboardContainer>
    </Layout>
  );
};

export default Dashboard;
