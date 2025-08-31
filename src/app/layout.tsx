import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import StructuredData from '@/components/StructuredData'

const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://crystalview.co.il'),
  title: {
    default: 'Crystal View - זכוכית ואלומיניום יוקרתי | חלונות, דלתות ופרגולות בישראל',
    template: '%s | Crystal View - זכוכית ואלומיניום יוקרתי'
  },
  description: 'Crystal View - מובילים בפתרונות זכוכית ואלומיניום איכותיים בישראל. חלונות אלומיניום, דלתות זכוכית, פרגולות מודרניות, חזיתות אדריכליות ומקלחונים יוקרתיים. שירות מקצועי עם אחריות מלאה.',
  keywords: [
    'זכוכית ואלומיניום',
    'חלונות אלומיניום', 
    'דלתות זכוכית',
    'פרגולות מודרניות',
    'חזיתות אדריכליות',
    'מקלחונים יוקרתיים',
    'מעקות אלומיניום',
    'זכוכית בטיחותית',
    'אלומיניום איכותי',
    'התקנה מקצועית',
    'עבודות זכוכית בישראל',
    'קבלן אלומיניום',
    'חלונות נפתחים',
    'דלתות הזזה',
    'זכוכית מחוסמת',
    'פרופילי אלומיניום'
  ],
  authors: [{ name: 'Crystal View', url: 'https://crystalview.co.il' }],
  creator: 'Crystal View',
  publisher: 'Crystal View',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://crystalview.co.il',
    siteName: 'Crystal View',
    title: 'Crystal View - זכוכית ואלומיניום יוקרתי בישראל',
    description: 'מובילים בפתרונות זכוכית ואלומיניום איכותיים בישראל. חלונות, דלתות, פרגולות וחזיתות אדריכליות עם התקנה מקצועית ואחריות מלאה.',
    images: [
      {
        url: '/logowtext.png',
        width: 1200,
        height: 630,
        alt: 'Crystal View - זכוכית ואלומיניום יוקרתי',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crystal View - זכוכית ואלומיניום יוקרתי בישראל',
    description: 'מובילים בפתרונות זכוכית ואלומיניום איכותיים. חלונות, דלתות, פרגולות וחזיתות אדריכליות.',
    images: ['/logowtext.png'],
  },
  alternates: {
    canonical: 'https://crystalview.co.il',
  },
  verification: {
    google: 'google-site-verification-code', // יש להחליף בקוד האמיתי
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0D0D0D" />
        <meta name="msapplication-TileColor" content="#0D0D0D" />
        <StructuredData />
      </head>
      <body className={`${heebo.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}