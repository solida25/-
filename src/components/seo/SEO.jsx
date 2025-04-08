// src/components/seo/SEO.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  canonical,
  ogImage,
  noindex = false,
  keywords = [],
  ogType = "website",
  twitterCard = "summary_large_image",
  languageAlternates = [],
}) => {
  // Costruiamo il titolo completo
  const fullTitle = title
    ? `${title} | Solida-Energia`
    : "Solida-Energia - Energia affidabile per la tua casa e azienda";

  // Descrizione di default
  const defaultDescription =
    "Solida-Energia offre soluzioni energetiche affidabili e competitive per privati e aziende. Scopri le nostre offerte di luce e gas.";
  const metaDescription = description || defaultDescription;

  // Immagine OG di default
  const defaultOgImage = "assets/images/logo-solida.png";
  const metaOgImage = ogImage || defaultOgImage;

  // URL canonico
  const site = "https://solida-energia.it";
  const metaCanonical = canonical ? `${site}${canonical}` : site;

  return (
    <Helmet>
      {/* Titolo e meta base */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* Link canonico */}
      <link rel="canonical" href={metaCanonical} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:site_name" content="Solida-Energia" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />

      {/* Alternate languages */}
      {languageAlternates.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hreflang={lang} href={url} />
      ))}
    </Helmet>
  );
};

export default SEO;
