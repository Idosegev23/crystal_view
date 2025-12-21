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
  // מרפסת שמש בקו נקי ומינימליסטי
  {
    id: 1,
    title: "מרפסת שמש מינימליסטית",
    location: "תל אביב",
    category: "סגירות מרפסת",
    description: "מרפסת שמש בקו נקי ומינימליסטי, שילוב מושלם של אלומיניום וזכוכית ליצירת מרחב מואר ומזמין.",
    images: [
      "/projects/balcony-minimal/1.webp",
      "/projects/balcony-minimal/2.webp",
      "/projects/balcony-minimal/3.webp",
      "/projects/balcony-minimal/4.webp",
      "/projects/balcony-minimal/5.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  // סגירה משולבת אלומיניום וזכוכית
  {
    id: 2,
    title: "סגירה משולבת אלומיניום וזכוכית",
    location: "הרצליה",
    category: "סגירות מרפסת",
    description: "סגירת מרפסת משולבת אלומיניום וזכוכית באיכות גבוהה, מאפשרת שימוש בכל עונות השנה.",
    images: [
      "/projects/aluminum-glass/1.webp",
      "/projects/aluminum-glass/2.webp",
      "/projects/aluminum-glass/3.webp",
      "/projects/aluminum-glass/4.webp",
      "/projects/aluminum-glass/5.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  // סגירת מרפסת לשימוש בכל עונות השנה
  {
    id: 3,
    title: "סגירת מרפסת לכל עונות השנה",
    location: "רמת גן",
    category: "סגירות מרפסת",
    description: "סגירת מרפסת מעוצבת לשימוש בכל עונות השנה, בידוד תרמי מעולה ועיצוב אלגנטי.",
    images: [
      "/projects/balcony-seasons/1.webp",
      "/projects/balcony-seasons/2.webp",
      "/projects/balcony-seasons/3.webp",
      "/projects/balcony-seasons/4.webp",
      "/projects/balcony-seasons/5.webp"
    ],
    year: 2023,
    client: "לקוח פרטי"
  },

  // פרגולה משולבת סגירה עם איוורור ותאורה
  {
    id: 4,
    title: "פרגולה עם איוורור ותאורה",
    location: "קיסריה",
    category: "פרגולות",
    description: "פרגולה משולבת סגירה עם מערכת איוורור חכמה ותאורת LED מובנית.",
    images: [
      "/projects/pergola-ventilation/1.webp",
      "/projects/pergola-ventilation/2.webp",
      "/projects/pergola-ventilation/3.webp",
      "/projects/pergola-ventilation/4.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  // פרגולה שחורה בסגנון מודרני
  {
    id: 5,
    title: "פרגולה שחורה מודרנית",
    location: "רעננה",
    category: "פרגולות",
    description: "פרגולת אלומיניום שחורה בסגנון מודרני ומינימליסטי, עיצוב נקי וקווים חדים.",
    images: [
      "/projects/pergola-modern-black/1.webp",
      "/projects/pergola-modern-black/2.webp",
      "/projects/pergola-modern-black/3.webp",
      "/projects/pergola-modern-black/4.webp",
      "/projects/pergola-modern-black/5.webp",
      "/projects/pergola-modern-black/6.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  // פרגולת אלומיניום בעיצוב אישי
  {
    id: 6,
    title: "פרגולה בעיצוב אישי",
    location: "כפר סבא",
    category: "פרגולות",
    description: "פרגולת אלומיניום מותאמת אישית לפי דרישות הלקוח, שילוב צבעים וחומרים ייחודי.",
    images: [
      "/projects/pergola-custom/1.webp",
      "/projects/pergola-custom/2.webp",
      "/projects/pergola-custom/3.webp",
      "/projects/pergola-custom/4.webp",
      "/projects/pergola-custom/5.webp"
    ],
    year: 2023,
    client: "לקוח פרטי"
  },

  // קו עיצוב כפרי מודרני
  {
    id: 7,
    title: "עיצוב כפרי מודרני",
    location: "מושב בית יצחק",
    category: "פרויקטי וילות",
    description: "פרויקט וילה בקו עיצוב כפרי מודרני, שילוב אלומיניום עם אלמנטים טבעיים.",
    images: [
      "/projects/rustic-modern/1.webp",
      "/projects/rustic-modern/2.webp",
      "/projects/rustic-modern/3.webp",
      "/projects/rustic-modern/4.webp",
      "/projects/rustic-modern/5.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  // עוד פרויקטים מהתמונות
  {
    id: 8,
    title: "מרפסת שמש יוקרתית",
    location: "ירושלים",
    category: "סגירות מרפסת",
    description: "מרפסת שמש מעוצבת עם פרופילי אלומיניום דקים ואלגנטיים.",
    images: [
      "/projects/balcony-minimal/6.webp",
      "/projects/balcony-minimal/7.webp",
      "/projects/balcony-minimal/8.webp"
    ],
    year: 2023,
    client: "לקוח פרטי"
  },

  {
    id: 9,
    title: "סגירת מרפסת פרימיום",
    location: "נתניה",
    category: "סגירות מרפסת",
    description: "סגירת מרפסת ברמה גבוהה עם זכוכית בידודית ומערכות פתיחה חלקות.",
    images: [
      "/projects/aluminum-glass/6.webp",
      "/projects/aluminum-glass/7.webp",
      "/projects/aluminum-glass/8.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  {
    id: 10,
    title: "פרגולת אלומיניום מעוצבת",
    location: "הוד השרון",
    category: "פרגולות",
    description: "פרגולה מעוצבת בסגנון מודרני עם אפשרויות הצללה מתקדמות.",
    images: [
      "/projects/pergola-modern-black/7.webp",
      "/projects/pergola-modern-black/8.webp",
      "/projects/pergola-modern-black/9.webp",
      "/projects/pergola-modern-black/10.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  {
    id: 11,
    title: "וילה מודרנית בשרון",
    location: "רמת השרון",
    category: "פרויקטי וילות",
    description: "פרויקט וילה מקיף הכולל פרגולות, סגירות וחיפויי אלומיניום.",
    images: [
      "/projects/rustic-modern/6.webp",
      "/projects/rustic-modern/7.webp",
      "/projects/rustic-modern/8.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  {
    id: 12,
    title: "פרגולה עם תאורה משולבת",
    location: "חיפה",
    category: "פרגולות",
    description: "פרגולת אלומיניום עם תאורת LED משולבת ומערכת שליטה חכמה.",
    images: [
      "/projects/pergola-modern-black/11.webp",
      "/projects/pergola-modern-black/12.webp",
      "/projects/pergola-modern-black/13.webp"
    ],
    year: 2023,
    client: "לקוח פרטי"
  }
];

export const categories = [
  "כל הפרויקטים",
  "פרגולות",
  "סגירות מרפסת",
  "פרויקטי וילות"
];
