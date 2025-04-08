// src/utils/errorHandler.js
export const handleApiError = (
  error,
  defaultMessage = "Si è verificato un errore. Riprova più tardi.",
) => {
  // Logga l'errore (in produzione potrebbe inviare a un servizio come Sentry)
  console.error("API Error:", error);

  // Determina il messaggio di errore da mostrare all'utente
  let errorMessage = defaultMessage;

  if (error.response) {
    // La richiesta è stata effettuata e il server ha risposto con un codice di stato diverso da 2xx
    const statusCode = error.response.status;
    const serverMessage = error.response.data?.message;

    if (statusCode === 401) {
      errorMessage = "Sessione scaduta. Effettua nuovamente l'accesso.";
    } else if (statusCode === 403) {
      errorMessage = "Non hai i permessi per accedere a questa risorsa.";
    } else if (statusCode === 404) {
      errorMessage = "La risorsa richiesta non è disponibile.";
    } else if (statusCode >= 500) {
      errorMessage = "Errore del server. Riprova più tardi.";
    } else if (serverMessage) {
      errorMessage = serverMessage;
    }
  } else if (error.request) {
    // La richiesta è stata effettuata ma non è stata ricevuta alcuna risposta
    errorMessage =
      "Impossibile contattare il server. Verifica la tua connessione.";
  }

  return errorMessage;
};
