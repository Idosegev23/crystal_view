import type { Metadata } from 'next'
import './globals.css'
import StructuredData from '@/components/StructuredData'
import AccessibilityWidget from '@/components/shared/AccessibilityWidget'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import WhatsApp from '@/components/shared/WhatsApp'
import PageLoader from '@/components/shared/PageLoader'
import { AccessibilityProvider } from '@/contexts/AccessibilityContext'
import { ToastProvider } from '@/contexts/ToastContext'
import ToastContainer from '@/components/ui/Toast'
import BackToTop from '@/components/shared/BackToTop'

export const metadata: Metadata = {
  metadataBase: new URL('https://crystalview.co.il'),
  title: {
    default: 'Crystal View | פתרונות אלומיניום וזכוכית',
    template: '%s | Crystal View'
  },
  description: 'Crystal View - פתרונות אלומיניום מקיפים לוילות. מתמחים בתכנון והתקנת פרגולות איכותיות, סגירות מרפסת ופרויקטי אלומיניום. ייצור בבית מלאכה עם מעל 20 שנות ניסיון.',
  keywords: [
    'פרויקטי וילות',
    'סגירות מרפסת',
    'התקנת פרגולות',
    'פתרונות אלומיניום לוילות',
    'פרגולות איכותיות',
    'סגירת מרפסת בהתאמה אישית',
    'עבודות אלומיניום',
    'ייצור אלומיניום',
    'בית מלאכה אלומיניום',
    'קבלנות אלומיניום',
    'פרגולות מודרניות',
    'מערכות אלומיניום',
    'אלומיניום לוילה',
    'התקנת פרגולות בישראל',
    'סגירת מרפסת יוקרתית',
    'פתרונות אלומיניום מותאמים אישית'
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
    title: 'Crystal View | פתרונות אלומיניום וזכוכית',
    description: 'פתרונות אלומיניום מקיפים לוילות. פרגולות איכותיות, סגירות מרפסת ופרויקטי אלומיניום עם ייצור מלא בבית מלאכה.',
    images: [
      {
        url: '/logowtext.png',
        width: 1200,
        height: 630,
        alt: 'Crystal View - פתרונות אלומיניום',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crystal View | פתרונות אלומיניום וזכוכית',
    description: 'פתרונות אלומיניום מקיפים לוילות. פרגולות איכותיות וסגירות מרפסת עם ייצור מלא בבית מלאכה.',
    images: ['/logowtext.png'],
  },
  alternates: {
    canonical: 'https://crystalview.co.il',
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="icon" href="/logontext.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logontext.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logontext.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logontext.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#fafafa" />
        <meta name="msapplication-TileColor" content="#fafafa" />
        
        {/* Accessibility Meta Tags */}
        <meta name="accessibility-features" content="WCAG-AA" />
        <meta name="screen-reader-support" content="true" />
        <meta name="keyboard-navigation" content="true" />
        <meta name="high-contrast-support" content="true" />
        <meta name="font-resize-support" content="true" />
        
        <StructuredData />
      </head>
      <body className="antialiased">
        <ToastProvider>
          <AccessibilityProvider>
            <PageLoader />
            <Header />
            {children}
            <Footer />
            <WhatsApp />
            <AccessibilityWidget />
            <BackToTop />
            <ToastContainer />
          </AccessibilityProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
