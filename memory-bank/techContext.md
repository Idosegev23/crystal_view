# Crystal View - Technical Context

## Technology Stack
- **Framework**: Next.js 14 (React-based, server-side rendering)
- **Styling**: TailwindCSS (utility-first CSS framework)
- **Animations**: Framer Motion (smooth animations and parallax effects)
- **Image Galleries**: SwiperJS for portfolio lightbox functionality
- **Typography**: Heebo font family (all weights)
- **Deployment**: Vercel (optimized for Next.js)

## Development Setup
- Node.js 18+ required
- npm/yarn for package management
- Git for version control
- ESLint + Prettier for code quality

## Key Dependencies
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "tailwindcss": "^3.0.0",
  "framer-motion": "^10.0.0",
  "swiper": "^10.0.0",
  "next/font": "built-in"
}
```

## Design System
- **Colors**: 
  - Dark: #0D0D0D (luxury depth)
  - Silver: #C0C0C0 (aluminum reflection)
  - Blue: #6DBFF2 (glass accent)
  - White: #FFFFFF (negative space)
- **Typography**: Heebo (Hebrew-optimized, multiple weights)
- **Breakpoints**: Mobile-first (320px, 768px, 1024px, 1920px)

## Performance Considerations
- Image optimization with Next.js Image component
- Lazy loading for portfolio galleries
- Code splitting for optimal loading
- Mobile-first responsive design

## Accessibility Features
- Semantic HTML structure
- High contrast color ratios
- Keyboard navigation support
- Screen reader compatibility
- Large text options

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile Safari and Chrome
- Progressive enhancement approach