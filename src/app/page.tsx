'use client';

import { motion } from 'framer-motion';
import CleanHero from '@/components/hero/CleanHero';
import Services from '@/components/Services';
import WorkProcess from '@/components/WorkProcess';
import MarqueeGallery from '@/components/sections/MarqueeGallery';

export default function Home() {
  return (
    <main id="main-content" role="main">
      {/* Hero Section - נקי ומינימליסטי */}
      <CleanHero />

      {/* Services Section */}
      <Services />

      {/* Work Process Section */}
      <WorkProcess />

      {/* Gallery Section */}
      <MarqueeGallery />
    </main>
  );
}
