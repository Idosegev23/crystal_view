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
    title: "וילת יוקרה בתל אביב",
    location: "תל אביב",
    category: "פרויקטי וילות",
    description: "פרויקט מקיף לוילה יוקרתית הכולל פרגולה מודרנית, סגירת מרפסות ומערכות אלומיניום מעוצבות.",
    images: ["/images/04cbc3da-c594-4208-a939-8ad817b047e8.png"],
    year: 2024,
    client: "לקוח פרטי"
  },
  {
    id: 2,
    title: "סגירת מרפסת יוקרתית",
    location: "ירושלים",
    category: "סגירות מרפסת",
    description: "סגירת מרפסת מעוצבת עם פרופילי אלומיניום מתקדמים, זכוכית בידודית ומערכות פתיחה חלקות.",
    images: ["/images/260bb74b-a085-4b4c-800a-58d3b10aab9f.png"],
    year: 2023,
    client: "לקוח פרטי"
  },
  {
    id: 3,
    title: "וילה חופים בהרצליה",
    location: "הרצליה פיתוח",
    category: "פרויקטי וילות",
    description: "פרויקט וילה מקיף הכולל פרגולה מעוצבת, סגירות מרפסת ומערכות אלומיניום מותאמות למיקום חופי.",
    images: ["/images/713825341901573.jpg"],
    year: 2024,
    client: "לקוח פרטי"
  },
  {
    id: 4,
    title: "סגירת מרפסת פנטהאוז",
    location: "תל אביב",
    category: "סגירות מרפסת",
    description: "סגירת מרפסת יוקרתית לפנטהאוז עם דלתות הזזה רחבות, מסילה שקועה ועיצוב מינימליסטי מודרני.",
    images: ["/images/hero.jpg"],
    year: 2023,
    client: "לקוח פרטי"
  },
  {
    id: 5,
    title: "מרפסת מעוצבת רמת גן",
    location: "רמת גן",
    category: "סגירות מרפסת",
    description: "סגירת מרפסת מודרנית עם מעקות אלומיניום מעוצבים, זכוכית בטיחותית ועיצוב אלגנטי.",
    images: ["/images/04cbc3da-c594-4208-a939-8ad817b047e8.png"],
    year: 2022,
    client: "לקוח פרטי"
  },
  {
    id: 6,
    title: "קוטג' הדסים בכפר סבא",
    location: "כפר סבא",
    category: "פרויקטי וילות",
    description: "פרויקט מקיף לקוטג' הכולל מרפסת מעוצבת, מעקות אלומיניום ופתרונות אלומיניום מותאמים.",
    images: ["/images/260bb74b-a085-4b4c-800a-58d3b10aab9f.png"],
    year: 2024,
    client: "לקוח פרטי"
  },
  {
    id: 7,
    title: "סגירת מרפסת במודיעין",
    location: "מודיעין",
    category: "סגירות מרפסת",
    description: "סגירת מרפסת מעוצבת עם פרופילי אלומיניום דקים, זכוכית בידודית ומערכת פתיחה חלקה.",
    images: ["/images/713825341901573.jpg"],
    year: 2025,
    client: "לקוח פרטי"
  },
  {
    id: 8,
    title: "פרויקט וילה בנתניה",
    location: "נתניה",
    category: "פרויקטי וילות",
    description: "פרויקט מקיף לוילה הכולל פרגולה, סגירות מרפסת ומערכות אלומיניום מותאמות אישית.",
    images: ["/images/hero.jpg"],
    year: 2024,
    client: "לקוח פרטי"
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
    title: "בית ענת בחיפה",
    location: "חיפה",
    category: "פרויקטי וילות",
    description: "פרויקט מקיף לבית פרטי עם פתרונות אלומיניום מודרניים, סגירות מרפסת ועיצוב מותאם אישית.",
    images: [
      "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?w=800",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"
    ],
    year: 2025
  },
  {
    id: 12,
    title: "סגירת מרפסת פתח תקווה",
    location: "פתח תקווה",
    category: "סגירות מרפסת",
    description: "סגירת מרפסת מעוצבת עם זכוכית בידודית, דלתות הזזה אוטומטיות ועיצוב מודרני ומינימליסטי.",
    images: [
      "https://images.unsplash.com/photo-1545058422-689e65f0c6b3?w=800",
      "https://images.unsplash.com/photo-1519455953755-af066f52f1ea?w=800",
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800"
    ],
    year: 2023
  },
  {
    id: 13,
    title: "דופלקס פלמחים בראשון לציון",
    location: "ראשון לציון",
    category: "פרויקטי וילות",
    description: "פרויקט דופלקס מודרני עם מעקות אלומיניום, סגירת מרפסת ופתרונות אלומיניום מותאמים.",
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800",
      "https://images.unsplash.com/photo-1616597097379-7e97b7c9ab66?w=800",
      "https://images.unsplash.com/photo-1523419409543-8f0f141e1d99?w=800"
    ],
    year: 2024
  },
  {
    id: 14,
    title: "סגירת מרפסת גבעתיים",
    location: "גבעתיים",
    category: "סגירות מרפסת",
    description: "סגירת מרפסת מעוצבת עם פרופיל דק בגוון מודרני, זכוכית שקופה ועיצוב אלגנטי.",
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
  "פרגולות אלומיניום מודרניות",
  "סגירות מרפסת",
  "פרויקטי וילות"
];