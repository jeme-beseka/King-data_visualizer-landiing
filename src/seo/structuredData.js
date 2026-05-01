import seoConfig from './seoConfig';

export const getStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "King Data Visualizer",
    "alternateName": ["King Data Viz", "King data visualization tool"],
    "author": {
      "@type": "Person",
      "name": "Jeme Beseka",
      "email": "j.beseka@gmail.com"
    },
    "description": seoConfig.description,
    "applicationCategory": "DataVisualizationApplication",
    "applicationSubCategory": "DesktopApplication",
    "operatingSystem": ["Windows 10", "Windows 11"],
    "softwareVersion": "3.3",
    "datePublished": "2026-04-16",
    "dateModified": "2026-04-16",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "downloadUrl": seoConfig.downloadUrl,
    "fileSize": "80 MB",
    "screenshot": seoConfig.ogImage,
    "featureList": [
      "Line Chart",
      "Bar Chart",
      "Scatter Plot",
      "Area Chart",
      "Pie Chart",
      "Histogram",
      "Box Plot",
      "Bubble Chart",
      "Heatmap",
      "Radar Chart",
      "Multi-Series Support",
      "Interactive Tooltips",
      "Dark Mode",
      "CSV Import",
      "Manual Data Entry",
      "PNG Export"
    ],
    "keywords": seoConfig.keywords,
    "url": seoConfig.domain,
    "inLanguage": "en",
    "isAccessibleForFree": true
  };
};
