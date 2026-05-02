import React from 'react';
import { Helmet } from 'react-helmet-async';
import seoConfig from './seoConfig';
import { getStructuredData } from './structuredData';

const SEOHead = ({ title, description, url, image, robots }) => {
  const finalTitle = title || seoConfig.defaultTitle;
  const finalDescription = description || seoConfig.defaultDescription;
  const finalUrl = url || seoConfig.domain;
  const finalImage = image || seoConfig.ogImage;
  const finalRobots = robots || "index, follow";

  const structuredData = getStructuredData();

  // Dev-only logging for verification
  if (import.meta.env.DEV) {
    console.log('SEOHead:', { finalTitle, finalDescription, finalUrl, finalRobots });
  }

  return (
    <Helmet>
      <meta name="google-site-verification" content="DbDQzUPULc-YzS3PbGGp95hvb6pEbjU8tsISh3y-hFw" />
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={seoConfig.keywords} />
      <meta name="author" content={seoConfig.developer} />
      <meta name="robots" content={finalRobots} />
      <meta name="theme-color" content={seoConfig.themeColor} />
      <link rel="canonical" href={finalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content={seoConfig.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content={seoConfig.twitterHandle} />

      {/* Schema.org Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </Helmet>
  );
};

export default SEOHead;
