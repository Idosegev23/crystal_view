'use client';

import { motion } from 'framer-motion';
import CleanHero from '@/components/hero/CleanHero';
import Services from '@/components/Services';
import About from '@/components/About';
import MarqueeGallery from '@/components/sections/MarqueeGallery';

export default function Home() {
  return (
    <main id="main-content" role="main">
      {/* Hero Section - נקי ומינימליסטי */}
      <CleanHero />

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Gallery Section */}
      <MarqueeGallery />
    </main>
  );
}
