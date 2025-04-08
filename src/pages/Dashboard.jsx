import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/common/Layout.jsx";
import Button from "../components/common/Button.jsx";
import Card from "../components/common/Card.jsx";
import ErrorBoundary from "../components/error/ErrorBoundary";
import SEO from "../components/seo/SEO";
import { SEO_CONSTANTS } from "../utils/seoConstants"; // Aggiungi questa importazione

import {
  FaUser,
  FaSignOutAlt,
  FaHome,
  FaTachometerAlt,
  FaChartLine,
  FaFileInvoiceDollar,
  FaCreditCard,
  FaHeadset,
  FaCog,
  FaBell,
  FaUserEdit,
  FaBars,
  FaRegLightbulb,
  FaGasPump,
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
} from "../data/mockDashboardData.jsx";
import { useAuth } from "../contexts/AuthContext";

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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary},
    ${({ theme }) => theme.secondary}
  );
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`;
const UserName = styled.h3`
  margin-bottom: 0.5rem;
`;
const UserEmail = styled.p`
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;
const NavItem = styled.li`
  margin-bottom: 0.5rem;
`;
const NavLink = styled.a`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: ${({ theme, active }) => (active ? theme.primary : theme.text)};
  background-color: ${({ theme, active }) =>
    active ? `${theme.primary}10` : "transparent"};
  transition: all 0.3s ease;
  border-left: 3px solid
    ${({ theme, active }) => (active ? theme.primary : "transparent")};
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

// Dashboard Component
const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Stato per la sezione attiva (dashboard, consumption, bills, notifications, ecc.)
  const [activeSection, setActiveSection] = useState("dashboard");
  // Stato per l'apertura della sidebar su mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Stato per le notifiche
  const [notifications, setNotifications] = useState(mockNotifications);

  // MODIFICATO: Rimosso il controllo di autenticazione con reindirizzamento
  // Non abbiamo più bisogno di questo useEffect
  /*
  useEffect(() => {
    if (!localStorage.getItem("auth_token")) {
      navigate("/area-clienti");
    }
  }, [navigate]);
  */

  // Funzione per il logout
  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/area-clienti");
      })
      .catch((error) => {
        console.error("Errore durante il logout:", error);
      });
  };

  // Funzione per segnare le notifiche come lette
  const handleMarkAsRead = (id) => {
    if (id === "all") {
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true }))
      );
    } else {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    }
  };

  // Funzione per eliminare le notifiche
  const handleDeleteNotification = (id) => {
    if (id === "all") {
      setNotifications([]);
    } else {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    }
  };

  // MODIFICATO: Rimosso il controllo di autenticazione con reindirizzamento
  // Non dobbiamo più verificare se l'utente è autenticato
  /*
  if (!localStorage.getItem("auth_token")) {
    return <Navigate to="/area-clienti" />;
  }
  */

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
                onClick={() => setActiveSection("profile")}
              >
                Modifica Profilo
              </Button>
            </UserInfo>
            <NavMenu>
              <NavItem>
                <NavLink
                  active={activeSection === "dashboard" ? 1 : 0}
                  onClick={() => setActiveSection("dashboard")}
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
                  onClick={() => setActiveSection("contracts")}
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
                  onClick={() => setActiveSection("consumption")}
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
                  onClick={() => setActiveSection("bills")}
                >
                  <NavIcon>
                    <FaFileInvoiceDollar />
                  </NavIcon>
                  <NavText>Bollette</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "payments" ? 1 : 0}
                  onClick={() => setActiveSection("payments")}
                >
                  <NavIcon>
                    <FaCreditCard />
                  </NavIcon>
                  <NavText>Pagamenti</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "notifications" ? 1 : 0}
                  onClick={() => setActiveSection("notifications")}
                >
                  <NavIcon>
                    <FaBell />
                  </NavIcon>
                  <NavText>Notifiche</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "support" ? 1 : 0}
                  onClick={() => setActiveSection("support")}
                >
                  <NavIcon>
                    <FaHeadset />
                  </NavIcon>
                  <NavText>Assistenza</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={activeSection === "profile" ? 1 : 0}
                  onClick={() => setActiveSection("profile")}
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
                  onClick={() => setActiveSection("settings")}
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
                    onClick={() => setActiveSection("notifications")}
                  >
                    Notifiche
                  </Button>
                  <Button
                    size="small"
                    icon={<FaHeadset />}
                    iconPosition="left"
                    onClick={() => setActiveSection("support")}
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
              {/* Notifiche (mostra le prime 3) */}
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
                  <Card elevation="small" padding="1.5rem">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                    >
                      <h3 style={{ margin: 0 }}>Le tue forniture</h3>
                      <Button
                        size="small"
                        variant="secondary"
                        outlined
                        onClick={() => setActiveSection("contracts")}
                      >
                        Gestisci forniture
                      </Button>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "1.5rem",
                      }}
                    >
                      {mockUserData.contracts.map((contract) => (
                        <Card
                          key={contract.id}
                          elevation="small"
                          padding="1.5rem"
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "1rem",
                            }}
                          >
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: contract.type.includes("Luce")
                                  ? "#E6394620"
                                  : "#4069E120",
                                color: contract.type.includes("Luce")
                                  ? "#E63946"
                                  : "#4069E1",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: "1rem",
                              }}
                            >
                              {contract.type.includes("Luce") ? (
                                <FaRegLightbulb />
                              ) : (
                                <FaGasPump />
                              )}
                            </div>
                            <div>
                              <h3 style={{ margin: 0, marginBottom: "0.2rem" }}>
                                {contract.type}
                              </h3>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: "0.8rem",
                                  color: "#666",
                                }}
                              >
                                {contract.id}
                              </p>
                            </div>
                          </div>
                          <div style={{ marginBottom: "1rem" }}>
                            <div
                              style={{
                                display: "flex",
                                marginBottom: "0.5rem",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 500,
                                  flex: 1,
                                  color: "#666",
                                }}
                              >
                                Indirizzo:
                              </span>
                              <span style={{ flex: 2 }}>
                                {contract.address}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                marginBottom: "0.5rem",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 500,
                                  flex: 1,
                                  color: "#666",
                                }}
                              >
                                Data attivazione:
                              </span>
                              <span style={{ flex: 2 }}>
                                {contract.activationDate}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                marginBottom: "0.5rem",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 500,
                                  flex: 1,
                                  color: "#666",
                                }}
                              >
                                {contract.type.includes("Luce")
                                  ? "POD:"
                                  : "PDR:"}
                              </span>
                              <span style={{ flex: 2 }}>
                                {contract.type.includes("Luce")
                                  ? contract.pod
                                  : contract.pdr}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                marginBottom: "0.5rem",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 500,
                                  flex: 1,
                                  color: "#666",
                                }}
                              >
                                Stato:
                              </span>
                              <span
                                style={{
                                  flex: 2,
                                  display: "inline-block",
                                  padding: "0.25rem 0.75rem",
                                  borderRadius: "1rem",
                                  fontSize: "0.8rem",
                                  backgroundColor: "#28A74520",
                                  color: "#28A745",
                                }}
                              >
                                {contract.status}
                              </span>
                            </div>
                          </div>
                          <Button
                            fullWidth
                            variant="secondary"
                            outlined
                            size="small"
                          >
                            Dettagli
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </Card>
                </ErrorBoundary>
              </DashboardSection>
              {/* Bollette Recenti */}
              <DashboardSection>
                <ErrorBoundary>
                  <BillsManager bills={mockBills.slice(0, 5)} />
                  <div style={{ textAlign: "right", marginTop: "1rem" }}>
                    <Button
                      variant="secondary"
                      outlined
                      icon={<FaFileInvoiceDollar />}
                      onClick={() => setActiveSection("bills")}
                    >
                      Tutte le bollette
                    </Button>
                  </div>
                </ErrorBoundary>
              </DashboardSection>
            </>
          )}
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
                    onClick={() => setActiveSection("dashboard")}
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
                    onClick={() => setActiveSection("dashboard")}
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
                    onClick={() => setActiveSection("dashboard")}
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
          {/* Altre sezioni (ad es. support, profile, settings) */}
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
                  funzionalità relative a {activeSection}.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setActiveSection("dashboard")}
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
