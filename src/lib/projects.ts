export interface Project {
  id: number;
  title: string;
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
    category: "מרפסת מינימליסטית",
    description: "מרפסת שמש בקו נקי ומינימליסטי, שילוב מושלם של אלומיניום וזכוכית ליצירת מרחב מואר ומזמין.",
    images: [
      "/projects/balcony-minimal/1.webp",
      "/projects/balcony-minimal/2.webp",
      "/projects/balcony-minimal/3.webp",
      "/projects/balcony-minimal/4.webp",
      "/projects/balcony-minimal/5.webp",
      "/projects/balcony-minimal/6.webp",
      "/projects/balcony-minimal/7.webp",
      "/projects/balcony-minimal/8.webp",
      "/projects/balcony-minimal/9.webp",
      "/projects/balcony-minimal/10.webp",
      "/projects/balcony-minimal/11.webp",
      "/projects/balcony-minimal/12.webp",
      "/projects/balcony-minimal/13.webp",
      "/projects/balcony-minimal/14.webp",
      "/projects/balcony-minimal/15.webp",
      "/projects/balcony-minimal/16.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  // סגירה משולבת אלומיניום וזכוכית
  {
    id: 2,
    title: "סגירה משולבת אלומיניום וזכוכית",
    category: "אלומיניום וזכוכית",
    description: "סגירת מרפסת משולבת אלומיניום וזכוכית באיכות גבוהה, מאפשרת שימוש בכל עונות השנה.",
    images: [
      "/projects/aluminum-glass/1.webp",
      "/projects/aluminum-glass/2.webp",
      "/projects/aluminum-glass/3.webp",
      "/projects/aluminum-glass/4.webp",
      "/projects/aluminum-glass/5.webp",
      "/projects/aluminum-glass/6.webp",
      "/projects/aluminum-glass/7.webp",
      "/projects/aluminum-glass/8.webp",
      "/projects/aluminum-glass/9.webp",
      "/projects/aluminum-glass/10.webp",
      "/projects/aluminum-glass/11.webp",
      "/projects/aluminum-glass/12.webp",
      "/projects/aluminum-glass/13.webp",
      "/projects/aluminum-glass/14.webp",
      "/projects/aluminum-glass/15.webp",
      "/projects/aluminum-glass/16.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  // סגירת מרפסת לשימוש בכל עונות השנה
  {
    id: 3,
    title: "סגירת מרפסת לכל עונות השנה",
    category: "מרפסת לכל העונות",
    description: "סגירת מרפסת מעוצבת לשימוש בכל עונות השנה, בידוד תרמי מעולה ועיצוב אלגנטי.",
    images: [
      "/projects/balcony-seasons/1.webp",
      "/projects/balcony-seasons/2.webp",
      "/projects/balcony-seasons/3.webp",
      "/projects/balcony-seasons/4.webp",
      "/projects/balcony-seasons/5.webp",
      "/projects/balcony-seasons/6.webp",
      "/projects/balcony-seasons/7.webp",
      "/projects/balcony-seasons/8.webp",
      "/projects/balcony-seasons/9.webp"
    ],
    year: 2023,
    client: "לקוח פרטי"
  },

  // פרגולה משולבת סגירה עם איוורור ותאורה
  {
    id: 4,
    title: "פרגולה עם איוורור ותאורה",
    category: "פרגולה עם איוורור",
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
    category: "פרגולה מודרנית",
    description: "פרגולת אלומיניום שחורה בסגנון מודרני ומינימליסטי, עיצוב נקי וקווים חדים.",
    images: [
      "/projects/pergola-modern-black/1.webp",
      "/projects/pergola-modern-black/2.webp",
      "/projects/pergola-modern-black/3.webp",
      "/projects/pergola-modern-black/4.webp",
      "/projects/pergola-modern-black/5.webp",
      "/projects/pergola-modern-black/6.webp",
      "/projects/pergola-modern-black/7.webp",
      "/projects/pergola-modern-black/8.webp",
      "/projects/pergola-modern-black/9.webp",
      "/projects/pergola-modern-black/10.webp",
      "/projects/pergola-modern-black/11.webp",
      "/projects/pergola-modern-black/12.webp",
      "/projects/pergola-modern-black/13.webp",
      "/projects/pergola-modern-black/14.webp",
      "/projects/pergola-modern-black/15.webp",
      "/projects/pergola-modern-black/16.webp",
      "/projects/pergola-modern-black/17.webp",
      "/projects/pergola-modern-black/18.webp",
      "/projects/pergola-modern-black/19.webp",
      "/projects/pergola-modern-black/20.webp",
      "/projects/pergola-modern-black/21.webp",
      "/projects/pergola-modern-black/22.webp",
      "/projects/pergola-modern-black/23.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  // פרגולת אלומיניום בעיצוב אישי
  {
    id: 6,
    title: "פרגולה בעיצוב אישי",
    category: "פרגולה בעיצוב אישי",
    description: "פרגולת אלומיניום מותאמת אישית לפי דרישות הלקוח, שילוב צבעים וחומרים ייחודי.",
    images: [
      "/projects/pergola-custom/1.webp",
      "/projects/pergola-custom/2.webp",
      "/projects/pergola-custom/3.webp",
      "/projects/pergola-custom/4.webp",
      "/projects/pergola-custom/5.webp",
      "/projects/pergola-custom/6.webp",
      "/projects/pergola-custom/7.webp",
      "/projects/pergola-custom/8.webp",
      "/projects/pergola-custom/9.webp",
      "/projects/pergola-custom/10.webp",
      "/projects/pergola-custom/11.webp",
      "/projects/pergola-custom/12.webp",
      "/projects/pergola-custom/13.webp",
      "/projects/pergola-custom/14.webp",
      "/projects/pergola-custom/15.webp",
      "/projects/pergola-custom/16.webp",
      "/projects/pergola-custom/17.webp"
    ],
    year: 2023,
    client: "לקוח פרטי"
  },

  // קו עיצוב כפרי מודרני
  {
    id: 7,
    title: "עיצוב כפרי מודרני",
    category: "עיצוב כפרי מודרני",
    description: "פרויקט וילה בקו עיצוב כפרי מודרני, שילוב אלומיניום עם אלמנטים טבעיים.",
    images: [
      "/projects/rustic-modern/1.webp",
      "/projects/rustic-modern/2.webp",
      "/projects/rustic-modern/3.webp",
      "/projects/rustic-modern/4.webp",
      "/projects/rustic-modern/5.webp",
      "/projects/rustic-modern/6.webp",
      "/projects/rustic-modern/7.webp",
      "/projects/rustic-modern/8.webp",
      "/projects/rustic-modern/9.webp",
      "/projects/rustic-modern/10.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  },

  // אטמוספירה
  {
    id: 8,
    title: "אווירה ייחודית",
    category: "אווירה ייחודית",
    description: "פרויקט מקיף המשלב עיצוב פנים וחוץ ליצירת אווירה ייחודית ומזמינה.",
    images: [
      "/projects/atmosphere/1.webp",
      "/projects/atmosphere/2.webp",
      "/projects/atmosphere/3.webp",
      "/projects/atmosphere/4.webp",
      "/projects/atmosphere/5.webp",
      "/projects/atmosphere/6.webp",
      "/projects/atmosphere/7.webp"
    ],
    year: 2024,
    client: "לקוח פרטי"
  }
];

export const categories = [
  "כל הפרויקטים",
  "מרפסת מינימליסטית",
  "אלומיניום וזכוכית",
  "מרפסת לכל העונות",
  "פרגולה עם איוורור",
  "פרגולה מודרנית",
  "פרגולה בעיצוב אישי",
  "עיצוב כפרי מודרני",
  "אווירה ייחודית"
];
