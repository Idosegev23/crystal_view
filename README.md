# Crystal View - Premium Glass & Aluminum Website 🏢✨

A luxury, cinematic website for Crystal View construction company, specializing in glass and aluminum solutions.

## 🎯 Project Overview

Crystal View is a premium construction company website featuring:
- **Cinematic Hero Section** with glass/aluminum imagery
- **Portfolio Gallery** with lightbox functionality
- **Services Showcase** with interactive cards
- **Client Testimonials** and partner logos
- **Multi-channel Contact** (form, WhatsApp, phone, map)
- **Mobile-First Design** with smooth animations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: TailwindCSS 3
- **Animations**: Framer Motion 11
- **Typography**: Heebo (Hebrew + Latin)
- **Language**: TypeScript
- **Deployment**: Ready for Vercel

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📱 Features

### Design & UX
- **Dark Luxury Theme**: Professional glass/aluminum aesthetic
- **Hebrew RTL Support**: Proper right-to-left layout
- **Smooth Animations**: Framer Motion powered interactions
- **Mobile-First**: Responsive across all devices
- **High Performance**: Optimized images and code splitting

### Sections
1. **Hero**: Fullscreen impact with CTAs and floating elements
2. **About**: Company story with values (דיוק, יוקרה, שקיפות)
3. **Portfolio**: 6 projects with category filtering
4. **Services**: 5 service categories with detailed features
5. **Testimonials**: Client reviews and partner showcase
6. **Contact**: Form, WhatsApp, phone, email, and map

### Technical
- **SEO Optimized**: Proper metadata and social sharing
- **Performance**: 137 kB bundle size, static generation
- **Accessibility**: Semantic HTML, keyboard navigation
- **Type Safety**: Full TypeScript implementation

## 🎨 Design System

### Colors
- **Dark**: `#0D0D0D` (luxury depth)
- **Silver**: `#C0C0C0` (aluminum reflection)
- **Blue**: `#6DBFF2` (glass accent)
- **White**: `#FFFFFF` (negative space)

### Typography
- **Font**: Heebo (all weights, Hebrew optimized)
- **Scale**: Large bold headlines + thin elegant subtext

### Layout
- **Style**: Minimalist, cinematic spacing
- **Grid**: Mobile-first responsive breakpoints
- **Spacing**: Wide margins, generous white space

## 📞 Contact Integration

### WhatsApp
- Floating button with pulse animation
- Pre-filled messages in Hebrew
- Direct integration with phone number

### Contact Form
- Full validation and error handling
- WhatsApp and email submission options
- Responsive design with accessibility

### Map Integration
- Google Maps embed
- Responsive container
- Location: Tel Aviv (customizable)

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── globals.css      # Global styles and Tailwind
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main homepage
├── components/          # React components
│   ├── Hero.tsx         # Cinematic hero section
│   ├── About.tsx        # Company story and values
│   ├── Portfolio.tsx    # Project gallery with lightbox
│   ├── Services.tsx     # Service cards and features
│   ├── Testimonials.tsx # Client reviews and partners
│   ├── Contact.tsx      # Contact form and info
│   └── shared/          # Shared components
│       ├── Header.tsx   # Sticky navigation
│       ├── Footer.tsx   # Site footer
│       └── WhatsApp.tsx # Floating WhatsApp button
├── lib/                 # Utilities and data
│   ├── projects.ts      # Portfolio project data
│   ├── services.ts      # Services and company info
│   └── animations.ts    # Framer Motion variants
└── public/              # Static assets (icons, images)
```

## 📊 Performance

- **Build Size**: 137 kB total
- **Loading**: Static generation for optimal speed
- **Images**: Next.js optimized with WebP/AVIF
- **Fonts**: Preloaded with display:swap
- **Animations**: 60fps smooth interactions

## 🔧 Customization

### Content Updates
- **Projects**: Edit `src/lib/projects.ts`
- **Services**: Edit `src/lib/services.ts`
- **Contact Info**: Update phone numbers and addresses
- **Images**: Replace Unsplash URLs with your own

### Styling
- **Colors**: Modify `tailwind.config.ts`
- **Fonts**: Update in `src/app/layout.tsx`
- **Animations**: Customize in `src/lib/animations.ts`

### Features
- **WhatsApp**: Update phone number in components
- **Map**: Replace Google Maps embed URL
- **Form**: Add backend integration for submissions

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment
```bash
# Build production
npm run build

# Start production server
npm start
```

## 📈 Analytics & SEO

- **Metadata**: Comprehensive meta tags for SEO
- **Open Graph**: Social media sharing optimization
- **Hebrew Support**: Proper RTL and language tags
- **Performance**: Core Web Vitals optimized

## 🎯 Business Goals

- **Brand Positioning**: Premium, innovative, trustworthy
- **Target Audience**: Architects, contractors, luxury homeowners
- **Conversion**: Drive WhatsApp, phone, and form inquiries
- **Trust Building**: Showcase quality work and client satisfaction

## 📞 Support

For questions or customizations, contact the development team or refer to the Memory Bank documentation in `memory-bank/` directory.

---

**Crystal View** - Where glass meets excellence. ✨🏢