import Cookies from "js-cookie";

// Nome del cookie che memorizza le preferenze
const COOKIE_CONSENT_NAME = "solida-energia-cookie-consent";
// Durata predefinita dei cookie in giorni
const COOKIE_EXPIRY = 365;

/**
 * Servizio per la gestione dei cookie
 */
const cookieService = {
  /**
   * Verifica se l'utente ha già dato il consenso
   * @returns {boolean} True se l'utente ha dato il consenso, false altrimenti
   */
  hasConsent: () => {
    return !!Cookies.get(COOKIE_CONSENT_NAME);
  },

  /**
   * Ottiene le preferenze sui cookie
   * @returns {Object} Le preferenze sui cookie (necessary, functional, analytics, marketing)
   */
  getPreferences: () => {
    const consent = Cookies.get(COOKIE_CONSENT_NAME);
    if (!consent) {
      return {
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
      };
    }
    try {
      return JSON.parse(consent);
    } catch (error) {
      console.error("Errore nel parsing delle preferenze cookie:", error);
      return {
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
      };
    }
  },

  /**
   * Salva le preferenze sui cookie
   * @param {Object} preferences - Le preferenze sui cookie
   */
  savePreferences: (preferences) => {
    // Assicuriamoci che il cookie necessary sia sempre true
    const finalPreferences = {
      ...preferences,
      necessary: true, // Sempre true
    };

    Cookies.set(COOKIE_CONSENT_NAME, JSON.stringify(finalPreferences), {
      expires: COOKIE_EXPIRY,
      path: "/",
    });

    // Applica le preferenze
    cookieService.applyPreferences(finalPreferences);
  },

  /**
   * Applica le preferenze sui cookie
   * @param {Object} preferences - Le preferenze sui cookie
   */
  applyPreferences: (preferences) => {
    // I cookie necessari sono sempre attivi

    // Cookie funzionali
    if (preferences.functional) {
      // Attiva i cookie funzionali
      // Esempio: Cookies.set('language_preference', 'it', { expires: COOKIE_EXPIRY });
    } else {
      // Rimuovi i cookie funzionali
      // Esempio: Cookies.remove('language_preference');
    }

    // Cookie analitici
    if (preferences.analytics) {
      // Attiva Google Analytics o strumenti simili
      cookieService.enableAnalytics();
    } else {
      // Disattiva Google Analytics o strumenti simili
      cookieService.disableAnalytics();
    }

    // Cookie di marketing
    if (preferences.marketing) {
      // Attiva cookie di marketing/pubblicità
      cookieService.enableMarketing();
    } else {
      // Disattiva cookie di marketing/pubblicità
      cookieService.disableMarketing();
    }
  },

  /**
   * Abilita i servizi di analytics
   */
  enableAnalytics: () => {
    // Esempio: Attivazione Google Analytics
    if (window.gtag) {
      console.log("Analytics enabled");
      // Configura gtag per raccogliere dati
    }
  },

  /**
   * Disabilita i servizi di analytics
   */
  disableAnalytics: () => {
    // Esempio: Disattivazione Google Analytics
    if (window.gtag) {
      console.log("Analytics disabled");
      // Configura gtag per non raccogliere dati
      // window['ga-disable-UA-XXXXXXXX-Y'] = true;
    }
    // Rimuovi eventuali cookie di Google Analytics
    Cookies.remove("_ga");
    Cookies.remove("_gid");
    Cookies.remove("_gat");
  },

  /**
   * Abilita i servizi di marketing
   */
  enableMarketing: () => {
    console.log("Marketing cookies enabled");
    // Attiva servizi di pubblicità
    // Esempio: Facebook Pixel, Google Ads, ecc.
  },

  /**
   * Disabilita i servizi di marketing
   */
  disableMarketing: () => {
    console.log("Marketing cookies disabled");
    // Disattiva servizi di pubblicità
    // Rimuovi cookie di marketing
  },

  /**
   * Rimuove tutti i cookie non necessari
   */
  removeAllNonEssentialCookies: () => {
    // Lista dei cookie necessari che non dovrebbero essere rimossi
    const essentialCookies = [COOKIE_CONSENT_NAME, "auth_token"];

    // Ottieni tutti i cookie
    const allCookies = Cookies.get();

    // Rimuovi tutti i cookie non necessari
    Object.keys(allCookies).forEach((cookieName) => {
      if (!essentialCookies.includes(cookieName)) {
        Cookies.remove(cookieName);
      }
    });
  },

  /**
   * Apre il pannello di preferenze dei cookie
   */
  openPreferences: () => {
    // Questa funzione sarà implementata nel componente CookieConsent
    // E resa disponibile globalmente
    if (typeof window !== "undefined" && window.openCookiePreferences) {
      window.openCookiePreferences();
    } else {
      // Se la funzione non è disponibile, resetta il cookie di consenso
      Cookies.remove(COOKIE_CONSENT_NAME, { path: "/" });
      window.location.reload();
    }
  },
};

export default cookieService;
