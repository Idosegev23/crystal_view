'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/lib/animations';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-50/30 via-white/20 to-blue-100/30 backdrop-blur-sm text-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)] pointer-events-none"></div>
      
      <div className="section-padding relative z-10">
        <div className="container-max">
          <div className="py-8 lg:py-12">
            
            {/* Main Footer Content - Mobile First */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
              
              {/* Company Info */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                className="text-center md:text-right"
              >
                <div className="flex justify-center md:justify-start mb-4">
                  <Image
                    src="/logowtext.png"
                    alt="Crystal View Logo"
                    width={100}
                    height={35}
                    className="h-8 w-auto"
                  />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  פתרונות אלומיניום איכותיים עם שירות אישי
                </p>
              </motion.div>

              {/* Services - Compact */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
                className="text-center md:text-right"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-3">השירותים שלנו</h4>
                <div className="text-gray-600 text-sm space-y-1">
                  <div>פרגולות • סגירת מרפסות</div>
                  <div>רשתות יתושים • סורגים שקופים</div>
                </div>
              </motion.div>

              {/* Contact Info - Compact */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-center md:text-right lg:col-span-1 md:col-span-2 lg:col-span-1"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-3">צרו קשר</h4>
                <div className="space-y-2 text-gray-600 text-sm">
                  <div>053-3366101</div>
                  <div>crystalview202@gmail.com</div>
                  <div>המחוגה 2, אשקלון</div>
                </div>
              </motion.div>

            </div>

            {/* Map Section - Mobile Optimized */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="border-t border-crystal-silver/20 pt-6"
            >
              <h4 className="text-lg font-bold text-gray-800 mb-3 text-center">מיקום המפעל</h4>
              <div className="w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-lg relative group">
                <Image
                  src="https://staticmap.openstreetmap.de/staticmap.php?center=31.667890,34.571234&zoom=16&size=600x300&maptype=mapnik&markers=31.667890,34.571234,blue-pin"
                  alt="מיקום Crystal View - המחוגה 2, איזור תעשייה צפוני אשקלון"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  unoptimized
                />
                {/* Click overlay */}
                <a
                  href="https://www.openstreetmap.org/?mlat=31.667890&mlon=34.571234&zoom=16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center group"
                >
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-gray-800 font-medium text-sm">פתח ב-OpenStreetMap</span>
                  </div>
                </a>
              </div>
              <p className="text-gray-600 text-sm mt-3 text-center">
                המחוגה 2, איזור תעשייה צפוני אשקלון
              </p>
            </motion.div>

            {/* Bottom Bar - Simplified */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="border-t border-crystal-silver/20 pt-6 mt-6 text-center"
            >
              <p className="text-gray-600 text-xs">
                © 2024 Crystal View • כל הזכויות שמורות
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </footer>
  );
}