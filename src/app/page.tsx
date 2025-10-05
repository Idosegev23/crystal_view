'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroAutoCompare from '@/components/hero/HeroAutoCompare';
import GlassBarsSection from '@/components/sections/GlassBarsSection';
import MagicBento from '@/components/gallery/MagicBento';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { services } from '@/lib/services';
import { projects } from '@/lib/projects';
import { WindowIcon, FacadeIcon, RailingIcon, ShowerIcon, PergolaIcon } from '@/lib/icons';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="min-h-screen" role="main">
        {/* Hero Section 1: Glass Bars */}
        <GlassBarsSection />

        {/* Text Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
              ב<strong className="text-gray-900">קריסטל ויו</strong> אנחנו מתמחים בייצור והתקנה של מוצרי אלומיניום איכותיים.
              עם <strong className="text-gray-900">מעל 20 שנות ניסיון</strong>, אנו מספקים פתרונות מותאמים אישית
              לכל לקוח - החל מפרגולות מעוצבות, דרך סגירות מרפסות מתקדמות, ועד רשתות יתושים וסורגים שקופים.
              כל עבודה מבוצעת בקפדנות מירבית, תוך שימוש בחומרים איכותיים ביותר וטכנולוגיות מתקדמות.
            </p>
        </div>
      </section>

        {/* Hero Section 2: Auto Compare */}
        <HeroAutoCompare />

        {/* Gallery Section - Magic Bento Grid */}
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="132, 0, 255"
        />
      </div>
    </>
  );
}