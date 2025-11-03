export default function StructuredData() {
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://crystalview.co.il/#organization",
    "name": "Crystal View פתרונות אלומיניום",
    "alternateName": "קריסטל וויו אלומיניום",
    "url": "https://crystalview.co.il",
    "logo": "https://crystalview.co.il/logontext.png",
    "image": "https://crystalview.co.il/logowtext.png",
    "description": "Crystal View - פתרונות אלומיניום מקיפים לוילות. מתמחים בתכנון והתקנת פרגולות איכותיות, סגירות מרפסת ופרויקטי אלומיניום מא׳ לת׳. ייצור בבית מלאכה עם מעל 20 שנות ניסיון.",
    "foundingDate": "2003",
    "areaServed": {
      "@type": "Country",
      "name": "Israel"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 31.6694444,
        "longitude": 34.567892
      },
      "geoRadius": "100000"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+972-53-336-6101",
      "contactType": "customer service",
      "email": "crystalview202@gmail.com",
      "areaServed": "IL",
      "availableLanguage": ["Hebrew"],
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "המחוגה 2, איזור תעשייה צפוני",
      "addressLocality": "אשקלון",
      "addressCountry": "IL",
      "postalCode": ""
    },
    "sameAs": [
      "https://wa.me/972533366101"
    ]
  };

  const localBusinessStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://crystalview.co.il/#localbusiness",
    "name": "Crystal View פתרונות אלומיניום",
    "alternateName": "קריסטל וויו אלומיניום",
    "description": "פתרונות אלומיניום מקצה לקצה לפרויקטי וילות, התקנת פרגולות, סגירות מרפסת ופרויקטי אלומיניום. ייצור מלא בבית מלאכה מא׳ לת׳",
    "url": "https://crystalview.co.il",
    "telephone": "+972-53-336-6101",
    "email": "crystalview202@gmail.com",
    "priceRange": "₪₪₪",
    "currenciesAccepted": "ILS",
    "paymentAccepted": "Cash, Credit Card, Bank Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "המחוגה 2, איזור תעשייה צפוני",
      "addressLocality": "אשקלון",
      "addressCountry": "IL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.6694444,
      "longitude": 34.567892
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "reviewCount": "87"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "שירותי אלומיניום ופרגולות",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "התקנת פרגולות אלומיניום",
            "description": "תכנון, ייצור והתקנה של פרגולות אלומיניום מודרניות בהתאמה אישית",
            "provider": {
              "@id": "https://crystalview.co.il/#organization"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "סגירות מרפסת",
            "description": "סגירות מרפסת אלומיניום ברמה גבוהה עם זכוכית איכותית",
            "provider": {
              "@id": "https://crystalview.co.il/#organization"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "פרויקטי וילות מקיפים",
            "description": "פתרונות אלומיניום מקצה לקצה לפרויקטי וילות - משלב התכנון ועד ההתקנה",
            "provider": {
              "@id": "https://crystalview.co.il/#organization"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ייצור אלומיניום בבית מלאכה",
            "description": "ייצור מלא של מוצרי אלומיניום בבית מלאכה מא׳ לת׳",
            "provider": {
              "@id": "https://crystalview.co.il/#organization"
            }
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

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "כמה זמן לוקח התקנת פרגולה?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "משך ההתקנה תלוי בגודל ובמורכבות הפרגולה. בדרך כלל, פרגולה סטנדרטית נמשכת 2-4 ימי עבודה מהרגע שהחומרים מגיעים לאתר. פרגולות מורכבות יותר עם מערכות חשמליות או חכמות עשויות לקחת עד שבוע."
        }
      },
      {
        "@type": "Question",
        "name": "באילו אזורים אתם מספקים שירות?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "אנו מספקים שירות בכל רחבי הארץ, עם התמחות באזור הדרום והמרכז. בית המלאכה שלנו נמצא באשקלון, ואנו מגיעים לכל פרויקט ללא קשר למיקום."
        }
      },
      {
        "@type": "Question",
        "name": "מה ההבדל בין סגירת מרפסת לפרגולה?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "סגירת מרפסת היא מערכת סגורה לחלוטין עם זכוכיות/פנלים שניתנים לפתיחה, המספקת הגנה מלאה מפני מזג אוויר ומאפשרת שימוש במרפסת כל השנה. פרגולה היא מבנה פתוח יותר עם גג (קבוע או נפתח) המספק צל והגנה חלקית, תוך שמירה על תחושת החוץ."
        }
      },
      {
        "@type": "Question",
        "name": "האם הפרגולות עמידות בפני תנאי מזג אוויר קיצוניים?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "כן! הפרגולות שלנו מתוכננות לעמוד בתנאי מזג אוויר קשים - חום, גשם, רוח וסערות. אנו משתמשים באלומיניום איכותי המצופה בציפוי אבקה עמיד, עם חיזוקים מבניים מתאימים. כל המערכות עוברות בדיקות עומסים ומתוכננות לפי תקני הבניה הישראליים."
        }
      },
      {
        "@type": "Question",
        "name": "איזו אחריות ניתנת על המוצרים?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "אנו נותנים אחריות מלאה של 5 שנים על כל עבודות האלומיניום, הזכוכית וההתקנה. האחריות כוללת תיקון או החלפה של כל בעיה הנובעת מפגם בייצור או התקנה. בנוסף, פרופילי האלומיניום מגיעים עם אחריות יצרן של עד 10 שנים."
        }
      }
    ]
  };

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "פרגולות אלומיניום מודרניות",
    "description": "פרגולות אלומיניום איכותיות בעיצוב מודרני, מיוצרות בבית מלאכה מא׳ לת׳. התאמה אישית מלאה, התקנה מקצועית ואחריות של 5 שנים.",
    "image": "https://crystalview.co.il/logowtext.png",
    "brand": {
      "@type": "Brand",
      "name": "Crystal View"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "ILS",
      "lowPrice": "25000",
      "highPrice": "100000",
      "offerCount": "3"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "87"
    }
  };

  const breadcrumbListStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "עמוד הבית",
        "item": "https://crystalview.co.il"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "אודות",
        "item": "https://crystalview.co.il/about"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "גלריה",
        "item": "https://crystalview.co.il/gallery"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "שאלות נפוצות",
        "item": "https://crystalview.co.il/faq"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "המלצות",
        "item": "https://crystalview.co.il/testimonials"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "צור קשר",
        "item": "https://crystalview.co.il/contact"
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbListStructuredData),
        }}
      />
    </>
  );
}
