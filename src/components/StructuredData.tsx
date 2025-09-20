export default function StructuredData() {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://crystalview.co.il/#organization",
    "name": "Crystal View",
    "alternateName": "קריסטל וויו",
    "url": "https://crystalview.co.il",
    "logo": "https://crystalview.co.il/logontext.png",
    "description": "מובילים בפתרונות זכוכית ואלומיניום איכותיים בישראל. חלונות אלומיניום, דלתות זכוכית, פרגולות מודרניות, חזיתות אדריכליות ומקלחונים יוקרתיים.",
    "founder": {
      "@type": "Person",
      "name": "דני כהן"
    },
    "foundingDate": "2008",
    "areaServed": {
      "@type": "Country",
      "name": "Israel"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 32.0853,
        "longitude": 34.7818
      },
      "geoRadius": "50000"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+972-50-123-4567",
      "contactType": "customer service",
      "areaServed": "IL",
      "availableLanguage": ["Hebrew", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "רחוב הזכוכית 123",
      "addressLocality": "תל אביב",
      "addressCountry": "IL"
    },
    "sameAs": [
      "https://www.facebook.com/crystalview",
      "https://www.instagram.com/crystalview",
      "https://www.linkedin.com/company/crystalview"
    ]
  };

  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://crystalview.co.il/#localbusiness",
    "name": "Crystal View",
    "alternateName": "קריסטל וויו",
    "description": "מובילים בפתרונות זכוכית ואלומיניום איכותיים בישראל",
    "url": "https://crystalview.co.il",
    "telephone": "+972-50-123-4567",
    "priceRange": "₪₪₪",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "רחוב הזכוכית 123",
      "addressLocality": "תל אביב",
      "addressCountry": "IL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.0853,
      "longitude": 34.7818
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "08:00",
        "closes": "14:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "שירותי זכוכית ואלומיניום",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "חלונות אלומיניום",
            "description": "התקנת חלונות אלומיניום איכותיים"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "דלתות זכוכית",
            "description": "התקנת דלתות זכוכית מודרניות"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "פרגולות",
            "description": "בניית פרגולות אלומיניום וזכוכית"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "חזיתות אדריכליות",
            "description": "עיצוב והתקנת חזיתות זכוכית"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "מקלחונים",
            "description": "התקנת מקלחוני זכוכית יוקרתיים"
          }
        }
      ]
    }
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://crystalview.co.il/#website",
    "url": "https://crystalview.co.il",
    "name": "Crystal View",
    "description": "מובילים בפתרונות זכוכית ואלומיניום איכותיים בישראל",
    "publisher": {
      "@id": "https://crystalview.co.il/#organization"
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://crystalview.co.il/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    ],
    "inLanguage": "he-IL",
    "accessibilityFeature": [
      "alternativeText",
      "highContrastDisplay", 
      "resizeText",
      "readingOrder",
      "structuralNavigation",
      "keyboardNavigation",
      "skipToContent",
      "focusVisible",
      "screenReaderSupport"
    ],
    "accessibilityHazard": "none",
    "accessibilityControl": [
      "fullKeyboardControl",
      "fullMouseControl",
      "fullTouchControl"
    ],
    "accessibilityAPI": "ARIA"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
    </>
  );
}
