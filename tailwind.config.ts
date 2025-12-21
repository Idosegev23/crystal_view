import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			// Glass Design System - זכוכיתי ושקוף
  			'glass': {
  				white: '#fafcff',
  				ice: '#f0f6ff',
  				frost: '#e8f1fc',
  				mist: '#d4e5f7',
  				sky: '#a8c8e8',
  				blue: '#5b9bd5',
  				'blue-deep': '#3a7fc1',
  				steel: '#7a8b9a',
  				charcoal: '#2c3e50',
  				dark: '#1a2530',
  				accent: '#88c5e0',
  				warm: '#f5e6d3',
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  		},
  		fontFamily: {
  			sans: ['Assistant', 'sans-serif'],
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.8s ease-out',
  			marquee: 'marquee var(--duration) linear infinite',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translateX(0)'
  				},
  				to: {
  					transform: 'translateX(calc(-100% - var(--gap)))'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translateY(0)'
  				},
  				to: {
  					transform: 'translateY(calc(-100% - var(--gap)))'
  				}
  			}
  		},
  		borderRadius: {
  			lg: '20px',
  			md: '16px',
  			sm: '12px',
  			bento: '20px',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
