import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Glassmorphism Crystal View Palette
        'crystal-bg': '#f0f9ff', // Light ice blue background
        'crystal-surface': 'rgba(255, 255, 255, 0.25)', // Glass surface
        'crystal-border': 'rgba(255, 255, 255, 0.3)', // Glass borders
        'crystal-accent': '#38bdf8', // Soft blue accent
        'crystal-soft': '#67e8f9', // Cyan soft
        'crystal-mint': '#86efac', // Mint green
        'crystal-text': '#1e293b', // Dark blue-gray text
        'crystal-text-light': '#475569', // Medium text
        'crystal-text-muted': '#64748b', // Muted text
        'crystal-white': '#ffffff',
        'crystal-glass-tint': 'rgba(255, 255, 255, 0.5)',
        'crystal-glass-border': 'rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        'heebo': ['Heebo', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'parallax': 'parallax 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        parallax: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config