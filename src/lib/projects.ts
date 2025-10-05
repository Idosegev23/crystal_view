export interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  description: string;
  images: string[];
  year: number;
  client?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "מגדל רימונים – חזית זכוכית כפולה",
    location: "תל אביב",
    category: "חזיתות זכוכית יוקרתיות",
    description: "מערכת קיר מסך (Curtain Wall) עם בידוד תרמי ואקוסטי, שילוב זכוכית Low-E ופתרונות הצללה אינטגרליים.",
    images: ["/images/04cbc3da-c594-4208-a939-8ad817b047e8.png"],
    year: 2024,
    client: 'יזמות אורבנית בע"מ'
  },
  {
    id: 2,
    title: "קניון הפסגה – שיקום חזית",
    location: "ירושלים",
    category: "חזיתות זכוכית יוקרתיות",
    description: "שדרוג חזית קיימת: החלפת פרופילי אלומיניום, זכוכית חכמה ומעברי אוויר נסתרים לשיפור נוחות המבקרים.",
    images: ["/images/260bb74b-a085-4b4c-800a-58d3b10aab9f.png"],
    year: 2023,
    client: "חברת ניהול קניונים"
  },
  {
    id: 3,
    title: "וילה חופים – חלונות בלגיים",
    location: "הרצליה פיתוח",
    category: "חלונות ודלתות אלומיניום",
    description: "מערכת חלונות ודלתות פרימיום בפרופיל דק במיוחד, פתיחות הזזה וקיפ, זכוכית בידודית נגד רעש ים.",
    images: ["/images/713825341901573.jpg"],
    year: 2024,
    client: "לקוח פרטי"
  },
  {
    id: 4,
    title: "פנטהאוז סוזן – דלתות הזזה רחבות",
    location: "תל אביב",
    category: "חלונות ודלתות אלומיניום",
    description: "דלתות הזזה באורך 6 מטרים על מסילה שקועה, פרזול איטלקי שקט ועגינות נסתרות לזרימה בין פנים לחוץ.",
    images: ["/images/hero.jpg"],
    year: 2023,
    client: "לקוח פרטי"
  },
  {
    id: 5,
    title: "פארק העסקים – מעקות טריפלקס",
    location: "רמת גן",
    category: "מעקות זכוכית ובטיחות",
    description: "מערך מעקות זכוכית טריפלקס מחוסמת עם נקודות חיבור מנירוסטה 316, תקן עומסים מלא לחללים ציבוריים.",
    images: ["/images/04cbc3da-c594-4208-a939-8ad817b047e8.png"],
    year: 2022,
    client: 'חברת נדל"ן מסחרי'
  },
  {
    id: 6,
    title: "קוטג' הדסים – מעקה שקוף למרפסת",
    location: "כפר סבא",
    category: "מעקות זכוכית ובטיחות",
    description: "פתרון בטיחותי שלא מסתיר נוף: מעקה זכוכית שקופה עם פרופיל תחתון נסתר וגמר מינימליסטי.",
    images: ["/images/260bb74b-a085-4b4c-800a-58d3b10aab9f.png"],
    year: 2024,
    client: "יזם פרטי"
  },
  {
    id: 7,
    title: "דירת בוטיק – מקלחון ללא מסגרת",
    location: "מודיעין",
    category: "מקלחונים בהתאמה אישית",
    description: 'מקלחון Walk-In זכוכית 10 מ"מ עם צירים נסתרים, ציפוי ננו קל ניקוי ואטימה מלאה.',
    images: ["/images/713825341901573.jpg"],
    year: 2025,
    client: "לקוח פרטי"
  },
  {
    id: 8,
    title: "סוויטת ספא – מקלחון פינתי",
    location: "נתניה",
    category: "מקלחונים בהתאמה אישית",
    description: "מקלחון פינתי עם זכוכית מעושנת, פרופיל שחור מט ותעלות ניקוז נסתרות למראה אלגנטי.",
    images: ["/images/hero.jpg"],
    year: 2024,
    client: "רשת מלונות"
  },

  // פרגולות אלומיניום מודרניות
  {
    id: 9,
    title: "חצר הדרים – פרגולה חשמלית",
    location: "קיסריה",
    category: "פרגולות אלומיניום מודרניות",
    description: "פרגולת אלומיניום עם שלבים מתכווננים, חיישן גשם מובנה ותאורה חכמה היקפית.",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800"
    ],
    year: 2023,
    client: "לקוח פרטי"
  },
  {
    id: 10,
    title: "בית האורן – פרגולת רפפות",
    location: "רעננה",
    category: "פרגולות אלומיניום מודרניות",
    description: "מערכת רפפות אלומיניום צבע ברונזה עם מיתוג תאורה, שילוב מסכי הצללה היקפיים.",
    images: [
      "https://images.unsplash.com/photo-1600607687352-460c4f04f73a?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    year: 2022,
    client: "לקוח פרטי"
  },

  // תוספות לכל קטגוריה – עוד פרויקטים לגלריה
  {
    id: 11,
    title: "בית ענת – ויטרינות סלון",
    location: "חיפה",
    category: "חלונות ודלתות אלומיניום",
    description: "ויטרינות הזזה אלומיניום שחור מט, זכוכית בידודית עם סנן UV ושילוב רשתות גלילה נסתרות.",
    images: [
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"
    ],
    year: 2025
  },
  {
    id: 12,
    title: "מגדל עמק – לובי זכוכית",
    location: "פתח תקווה",
    category: "חזיתות זכוכית יוקרתיות",
    description: "חיפוי זכוכית ללובי כניסה, דלתות אוטומטיות ומסכי זכוכית פנימיים עם צירי רצפה סמויים.",
    images: [
      "https://images.unsplash.com/photo-1545058422-689e65f0c6b3?w=800",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1ea?w=800",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800"
    ],
    year: 2023
  },
  {
    id: 13,
    title: "דופלקס פלמחים – מעקה זכוכית",
    location: "ראשון לציון",
    category: "מעקות זכוכית ובטיחות",
    description: "מעקה זכוכית פנימי למדרגות, חיבור קליפים מינימליים ובר מתכת עליון בגוון תואם.",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
      "https://images.unsplash.com/photo-1616597097379-7e97b7c9ab66?w=800",
      "https://images.unsplash.com/photo-1523419409543-8f0f141e1d99?w=800"
    ],
    year: 2024
  },
  {
    id: 14,
    title: "חדר הורים – מקלחון פסי זהב",
    location: "גבעתיים",
    category: "מקלחונים בהתאמה אישית",
    description: "מקלחון פרופיל דק בגוון זהב מט, זכוכית שקופה עם פסי דקורציה ולוח קיר תואם.",
    images: [
      "https://images.unsplash.com/photo-1616597097211-1f3a836b6c31?w=800",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
    ],
    year: 2023
  },
  {
    id: 15,
    title: "גינת אירוח – פרגולת קסטה",
    location: "רמת השרון",
    category: "פרגולות אלומיניום מודרניות",
    description: "פרגולת קסטה סגורה עם ארובות ניקוז אינטגרליות, מסכי ZIP היקפיים ושליטה באפליקציה.",
    images: [
      "https://images.unsplash.com/photo-1600607687352-460c4f04f73a?w=800",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    year: 2024
  }
];

export const categories = [
  "כל הפרויקטים",
  "חזיתות זכוכית יוקרתיות",
  "חלונות ודלתות אלומיניום", 
  "מעקות זכוכית ובטיחות",
  "מקלחונים בהתאמה אישית",
  "פרגולות אלומיניום מודרניות"
];