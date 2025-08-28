# Crystal View - System Patterns

## Architecture Overview
Next.js app with component-based architecture, focusing on performance and visual impact.

```
src/
├── app/                 # Next.js 14 app directory
│   ├── layout.tsx       # Root layout with fonts and global styles
│   ├── page.tsx         # Homepage with all sections
│   └── globals.css      # Global styles and Tailwind imports
├── components/          # Reusable UI components
│   ├── Hero.tsx         # Cinematic hero section
│   ├── About.tsx        # About/Vision section
│   ├── Portfolio.tsx    # Project gallery
│   ├── Services.tsx     # Services cards
│   ├── Testimonials.tsx # Client testimonials
│   ├── Contact.tsx      # Contact form and info
│   └── shared/          # Shared components
│       ├── Header.tsx   # Sticky navigation
│       ├── Footer.tsx   # Site footer
│       └── WhatsApp.tsx # Floating WhatsApp button
├── lib/                 # Utilities and data
│   ├── projects.ts      # Portfolio project data
│   ├── services.ts      # Services information
│   └── animations.ts    # Framer Motion variants
└── public/              # Static assets
    ├── images/          # Project and service images
    └── icons/           # SVG icons and logos
```

## Component Design Patterns

### 1. Section Components
Each main section is a self-contained component with consistent structure:
- Container wrapper with proper spacing
- Responsive grid/flex layouts
- Smooth animations on scroll
- Mobile-first responsive design

### 2. Animation Patterns
Using Framer Motion for consistent, performant animations:
- Fade-in on scroll for sections
- Parallax effects for hero elements
- Hover states for interactive elements
- Stagger animations for grids

### 3. Image Handling
- Next.js Image component for optimization
- Proper aspect ratios and sizes
- Lazy loading for performance
- WebP format support

### 4. Mobile-First Responsive
- TailwindCSS breakpoint system
- Touch-friendly interactions
- Optimized layouts for all screen sizes
- Performance-first mobile experience

## Data Management
- Static data in TypeScript files
- Type safety for project and service data
- Easy content updates without database complexity
- SEO-optimized static generation

## Performance Patterns
- Component lazy loading
- Image optimization and lazy loading
- Minimal JavaScript bundles
- Server-side rendering for SEO

## Style Architecture
- TailwindCSS utility classes
- Custom CSS for complex animations
- Design system consistency
- Dark theme with luxury feel