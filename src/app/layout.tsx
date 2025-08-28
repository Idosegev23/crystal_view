import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'

const heebo = Heebo({
  subsets: ['latin', 'hebrew'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Crystal View - חזיתות זכוכית ואלומיניום יוקרתיות',
  description: 'Crystal View מתמחה בפתרונות זכוכית ואלומיניום ברמה הגבוהה ביותר. חזיתות, חלונות, מעקות, מקלחונים ופרגולות מודרניות.',
  keywords: 'זכוכית, אלומיניום, חזיתות, חלונות, מעקות, מקלחונים, פרגולות, אדריכלות',
  authors: [{ name: 'Crystal View' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Crystal View - חזיתות זכוכית ואלומיניום יוקרתיות',
    description: 'פתרונות זכוכית ואלומיניום ברמה הגבוהה ביותר עבור אדריכלים, קבלנים ובעלי בתים',
    type: 'website',
    locale: 'he_IL',
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
        <meta name="theme-color" content="#0D0D0D" />
      </head>
      <body className={`${heebo.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}