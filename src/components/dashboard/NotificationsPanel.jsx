// src/components/dashboard/NotificationsPanel.jsx (continua)
import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaBell, FaFileInvoice, FaInfoCircle, FaExclamationTriangle, 
  FaCheckCircle, FaTimes, FaEllipsisV, FaTrash, FaEye, FaEyeSlash
} from 'react-icons/fa';

// Stile per il container delle notifiche
const NotificationsContainer = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.small};
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

// Stile per l'header del pannello
const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundLight};
`;

// Stile per il titolo del pannello
const PanelTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin: 0;

  svg {
    margin-right: 0.8rem;
    color: ${({ theme }) => theme.primary};
  }
`;

// Stile per il badge delle notifiche
const NotificationBadge = styled.span`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 10px;
  margin-left: 0.8rem;
`;

// Stile per i controlli del pannello
const PanelControls = styled.div`
  display: flex;
  align-items: center;
`;

// Stile per un pulsante di controllo
const ControlButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textLight};
  font-size: 0.9rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 1rem;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  svg {
    margin-right: ${({ iconOnly }) => iconOnly ? '0' : '0.5rem'};
  }
`;

// Stile per l'elenco delle notifiche
const NotificationsList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

// Stile per una notifica
const NotificationItem = styled.div`
  display: flex;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.backgroundLight};
  background-color: ${({ $isRead, theme }) => $isRead ? 'white' : theme.backgroundLight};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundLight};
  }

  &:last-child {
    border-bottom: none;
  }
`;

// Stile per l'icona della notifica
const NotificationIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-right: 1rem;
  background-color: ${({ type, theme }) => {
    switch(type) {
      case 'success': return `${theme.success}20`;
      case 'warning': return `${theme.warning}20`;
      case 'error': return `${theme.error}20`;
      case 'info': return `${theme.primary}20`;
      default: return `${theme.primary}20`;
    }
  }};
  color: ${({ type, theme }) => {
    switch(type) {
      case 'success': return theme.success;
      case 'warning': return theme.warning;
      case 'error': return theme.error;
      case 'info': return theme.primary;
      default: return theme.primary;
    }
  }};
`;

// Stile per il contenuto della notifica
const NotificationContent = styled.div`
  flex: 1;
`;

// Stile per il titolo della notifica
const NotificationTitle = styled.h4`
  margin: 0 0 0.3rem 0;
  font-size: 1rem;
  font-weight: ${({ $isRead }) => $isRead ? 'normal' : 'bold'};
`;

// Stile per il testo della notifica
const NotificationText = styled.p`
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
`;

// Stile per la data della notifica
const NotificationDate = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textLight};
`;

// Stile per le azioni della notifica
const NotificationActions = styled.div`
  display: flex;
  margin-left: 1rem;
  align-self: center;
`;

// Stile per un'azione sulla notifica
const NotificationAction = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
  padding: 0.3rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.delete:hover {
    color: ${({ theme }) => theme.error};
  }

  &:first-child {
    margin-right: 0.5rem;
  }
`;

// Stile per il menu delle azioni
const ActionsMenu = styled.div`
  position: relative;
`;

// Stile per il pulsante del menu
const MenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
  padding: 0.3rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

// Stile per il dropdown del menu
const MenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 1000;
  min-width: 180px;
  padding: 0.5rem 0;
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
`;

// Stile per un elemento del menu
const MenuItem = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundLight};
  }

  svg {
    margin-right: 0.8rem;
    width: 16px;
  }

  &.delete {
    color: ${({ theme }) => theme.error};
  }
`;

// Stile per il footer del pannello
const PanelFooter = styled.div`
  padding: 1rem;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.backgroundLight};
`;

// Stile per il link per visualizzare tutte le notifiche
const ViewAllLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

// Stile per il messaggio quando non ci sono notifiche
const EmptyNotifications = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.textLight};
`;

/**
 * Componente per visualizzare e gestire le notifiche
 * @param {Object} props - Proprietà del componente
 * @param {Array} props.notifications - Elenco delle notifiche da visualizzare
 * @param {Function} props.onMarkAsRead - Funzione chiamata quando una notifica viene marcata come letta
 * @param {Function} props.onDeleteNotification - Funzione chiamata quando una notifica viene eliminata
 */
const NotificationsPanel = ({ 
  notifications = [], 
  onMarkAsRead = () => {}, 
  onDeleteNotification = () => {} 
}) => {
  // Stato per il menu delle azioni
  const [menuOpen, setMenuOpen] = useState(false);

  // Filtra le notifiche non lette
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Gestisce la marcatura di una notifica come letta
  const handleMarkAsRead = (id) => {
    onMarkAsRead(id);
  };

  // Gestisce l'eliminazione di una notifica
  const handleDeleteNotification = (id) => {
    onDeleteNotification(id);
  };

  // Ottiene l'icona appropriata per il tipo di notifica
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return <FaCheckCircle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'error': return <FaTimes />;
      case 'bill': return <FaFileInvoice />;
      default: return <FaInfoCircle />;
    }
  };

  // Formatta la data della notifica
  const formatNotificationDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMin < 60) {
      return `${diffMin} min fa`;
    } else if (diffHrs < 24) {
      return `${diffHrs} ore fa`;
    } else if (diffDays < 7) {
      return `${diffDays} giorni fa`;
    } else {
      return date.toLocaleDateString('it-IT');
    }
  };

  return (
    <NotificationsContainer>
      <PanelHeader>
        <PanelTitle>
          <FaBell />
          Notifiche
          {unreadCount > 0 && <NotificationBadge>{unreadCount}</NotificationBadge>}
        </PanelTitle>

        <PanelControls>
          <ControlButton onClick={() => onMarkAsRead('all')}>
            <FaEye /> Segna tutte come lette
          </ControlButton>

          <ActionsMenu>
            <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
              <FaEllipsisV />
            </MenuButton>

            <MenuDropdown isOpen={menuOpen}>
              <MenuItem onClick={() => onMarkAsRead('all')}>
                <FaEye /> Segna tutte come lette
              </MenuItem>
              <MenuItem onClick={() => {/* filtrare per non lette */}}>
                <FaEyeSlash /> Mostra solo non lette
              </MenuItem>
              <MenuItem className="delete" onClick={() => onDeleteNotification('all')}>
                <FaTrash /> Elimina tutte
              </MenuItem>
            </MenuDropdown>
          </ActionsMenu>
        </PanelControls>
      </PanelHeader>

      <NotificationsList>
        {notifications.length === 0 ? (
          <EmptyNotifications>
            <FaBell size={32} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <p>Non hai nuove notifiche</p>
          </EmptyNotifications>
        ) : (
          notifications.map(notification => (
            <NotificationItem 
              key={notification.id} 
              $isRead={notification.isRead}
            >
              <NotificationIcon type={notification.type}>
                {getNotificationIcon(notification.type)}
              </NotificationIcon>

              <NotificationContent>
                <NotificationTitle $isRead={notification.isRead}>
                  {notification.title}
                </NotificationTitle>
                <NotificationText>{notification.message}</NotificationText>
                <NotificationDate>
                  {formatNotificationDate(notification.date)}
                </NotificationDate>
              </NotificationContent>

              <NotificationActions>
                {!notification.isRead && (
                  <NotificationAction 
                    title="Segna come letta" 
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <FaEye />
                  </NotificationAction>
                )}
                <NotificationAction 
                  title="Elimina" 
                  className="delete" 
                  onClick={() => handleDeleteNotification(notification.id)}
                >
                  <FaTrash />
                </NotificationAction>
              </NotificationActions>
            </NotificationItem>
          ))
        )}
      </NotificationsList>

      {notifications.length > 0 && (
        <PanelFooter>
          <ViewAllLink>Visualizza tutte le notifiche</ViewAllLink>
        </PanelFooter>
      )}
    </NotificationsContainer>
  );
};

export default NotificationsPanel;