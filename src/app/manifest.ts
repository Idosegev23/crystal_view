import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Crystal View - זכוכית ואלומיניום יוקרתי',
    short_name: 'Crystal View',
    description: 'מובילים בפתרונות זכוכית ואלומיניום איכותיים בישראל',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D0D0D',
    theme_color: '#6DBFF2',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
