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
    title: "מגדל אלמוגים",
    location: "תל אביב",
    category: "חזיתות זכוכית יוקרתיות",
    description: "חזית זכוכית מתקדמת למגדל מגורים יוקרתי עם 25 קומות. שילב זכוכית חכמה לחסכון אנרגטי ועיצוב אדריכלי מרהיב שמשקף את רוח העיר.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"
    ],
    year: 2023,
    client: "חברת בנייה יוקרתית"
  },
  {
    id: 2,
    title: "וילת נוף",
    location: "הרצליה פיתוח",
    category: "חלונות ודלתות אלומיניום",
    description: "מערכת חלונות ודלתות אלומיניום מותאמת אישית לוילה פרטית מול הים. כולל דלתות הזזה ענקיות וחלונות בלגיים יוקרתיים עם נוף פנורמי.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    year: 2023,
    client: "לקוח פרטי"
  },
  {
    id: 3,
    title: "מרכז עסקים גיבורי ישראל",
    location: "רמת גן",
    category: "מעקות זכוכית ובטיחות",
    description: "מעקות אלומיניום מעוצבים למרכז עסקים חדש באזור הבורסה. עיצוב מינימליסטי המשלב בטיחות מקסימלית עם אסתטיקה מודרנית.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1567367899726-2e2b2f6a7ad9?w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
    ],
    year: 2022,
    client: "חברת נדל\"ן מסחרי"
  },
  {
    id: 4,
    title: "ספא יוקרתי רויאל",
    location: "נתניה",
    category: "מקלחונים בהתאמה אישית",
    description: "מקלחונים מזכוכית מחוסמת עם מסגרות אלומיניום דקות למלון ספא יוקרתי. זכוכית אנטי אדים וציפוי להגנה, התאמה מושלמת לעיצוב הפנים.",
    images: [
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800"
    ],
    year: 2023,
    client: "רשת מלונות יוקרה"
  },
  {
    id: 5,
    title: "פרגולת נסיכות",
    location: "קיסריה",
    category: "פרגולות אלומיניום מודרניות",
    description: "פרגולה אלומיניום מתקדמת עם גג רעפים מתכווצים וחיפוי זכוכית חלקי. מערכת תאורה חכמה ושלט רחוק לחוויה מושלמת.",
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800"
    ],
    year: 2022,
    client: "לקוח פרטי"
  },
  {
    id: 6,
    title: "מרכז מסחרי חדרה",
    location: "חדרה",
    category: "חזיתות זכוכית יוקרתיות",
    description: "שיפוץ חזית למרכז מסחרי חדש. שילוב זכוכית מודרנית עם אלמנטים אדריכליים ייחודיים ומערכת תאורה אמנותית.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
    ],
    year: 2022,
    client: "חברת פיתוח מסחרי"
  },
  {
    id: 7,
    title: "פנטהאוז דרך הים",
    location: "בת ים",
    category: "חלונות ודלתות אלומיניום",
    description: "פרויקט פנטהאוז יוקרתי עם חלונות ודלתות מותאמים לנוף הים. בידוד אקוסטי מתקדם ופתיחה רחבה למרפסת גג פרטית.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
    ],
    year: 2023,
    client: "לקוח פרטי"
  },
  {
    id: 8,
    title: "מתחם בוטיק כפר סבא",
    location: "כפר סבא",
    category: "מעקות זכוכית ובטיחות",
    description: "מתחם מגורים בוטיק עם מעקות זכוכית מעוצבים במיוחד. שילוב של אבטחה מקסימלית עם שקיפות ועיצוב אלגנטי.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1567367899726-2e2b2f6a7ad9?w=800",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
    ],
    year: 2023,
    client: "יזם פרטי"
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