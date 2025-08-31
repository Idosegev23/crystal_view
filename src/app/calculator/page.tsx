import { Metadata } from 'next';
import CalculatorClient from './client';

export const metadata: Metadata = {
  title: 'מחשבון מחיר זכוכית ואלומיניום | חישוב עלות מיידי - Crystal View',
  description: 'מחשבון מחיר מתקדם לחלונות אלומיניום, דלתות זכוכית ופרגולות. קבלו הערכת מחיר מיידית בהתאם למידות שלכם. שירות מקצועי של Crystal View.',
  keywords: [
    'מחשבון מחיר זכוכית',
    'מחיר חלונות אלומיניום',
    'עלות דלתות זכוכית',
    'מחיר פרגולות',
    'הצעת מחיר זכוכית',
    'חישוב עלות אלומיניום',
    'מחיר התקנה חלונות',
    'עלות מקלחון זכוכית'
  ],
  openGraph: {
    title: 'מחשבון מחיר זכוכית ואלומיניום - Crystal View',
    description: 'חשבו עלות מיידית לפרויקט הזכוכית והאלומיניום שלכם',
    url: 'https://crystalview.co.il/calculator',
  },
  alternates: {
    canonical: 'https://crystalview.co.il/calculator',
  },
};

export default function CalculatorPage() {
  return <CalculatorClient />;
}
