'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroAutoCompare from '@/components/hero/HeroAutoCompare';
import GlassBarsSection from '@/components/sections/GlassBarsSection';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { services } from '@/lib/services';
import { projects } from '@/lib/projects';
import { WindowIcon, FacadeIcon, RailingIcon, ShowerIcon, PergolaIcon } from '@/lib/icons';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <div className="min-h-screen" role="main">
        <GlassBarsSection />
      
      {/* Text Section */}
      <section 
        className="py-20 lg:py-32 relative" 
        aria-labelledby="text-heading"
        role="region"
      >
        {/* Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-blue-100/30 backdrop-blur-sm"></div>
        <div className="section-padding relative z-10">
          <div className="container-max">
            
            {/* Section Header */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16 lg:mb-20"
            >
              <motion.h2
                id="text-heading"
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-6 leading-tight"
              >
                תהליך עבודה מקצועי ושקוף
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-4"
              >
                אנחנו מתמחים בעבודות אלומיניום–מסגירת מרפסת ועד פרגולות מודרניות בהתאמה אישית.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
                className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-4"
              >
                התהליך כולו מתבצע בצורה פשוטה, ברורה ושקופה: החל מייעוץ ותכנון ראשוני, דרך ייצור קפדני, ועד התקנה מקצועית בשטח.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
              >
                כל פרויקט מלווה באחריות מלאה ושירות אישי, כדי להבטיח לכם שקט וביטחון לאורך זמן.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      <HeroAutoCompare />

      {/* Featured Projects Preview */}
      <section className="py-20 lg:py-32 relative" aria-labelledby="projects-heading" role="region">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-blue-100/30 backdrop-blur-sm"></div>
        <div className="section-padding relative z-10">
          <div className="container-max">
            {/* Featured Projects Preview */}
            <motion.div
              initial="initial"
              whileInView="animate" 
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <div className="glass-card p-8 mb-12">
                <motion.h2
                  id="projects-heading"
                  variants={fadeInUp}
                  className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
                >
                  פרויקטים נבחרים
                </motion.h2>
                <motion.p
                  variants={fadeInUp}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
                >
                  כל פרויקט הוא הזדמנות להראות מהי שלמות
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={staggerItem}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <div className="glass-card overflow-hidden p-4 hover:shadow-2xl transition-all duration-500">
                    <div className="relative overflow-hidden rounded-xl mb-4">
                      <Image
                        src={project.images[0]}
                        alt={`פרויקט ${project.title} - עבודות אלומיניום וזכוכית באיכות גבוהה`}
                        width={400}
                        height={300}
                        className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="glass-card-dark p-4">
                      <h4 className="text-white font-bold text-lg mb-2">
                        {project.title}
                      </h4>
                      <p className="text-gray-700 text-sm">
                        {project.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center">
              <Link href="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-button text-gray-800 px-12 py-4 font-bold text-lg hover:shadow-2xl transition-all duration-300"
                >
                  צפו בכל הפרויקטים
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}