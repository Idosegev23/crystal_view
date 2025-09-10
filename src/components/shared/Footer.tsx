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
              <div className="glass-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="space-y-2 text-gray-600 mb-6">
                  <div className="font-medium text-lg">המחוגה 2</div>
                  <div>איזור תעשייה צפוני אשקלון</div>
                  <div className="text-sm text-gray-500">78100, ישראל</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://www.openstreetmap.org/?mlat=31.667890&mlon=34.571234&zoom=16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button text-gray-800 px-4 py-2 text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    OpenStreetMap
                  </a>
                  <a
                    href="https://maps.google.com/?q=המחוגה+2+איזור+תעשייה+צפוני+אשקלון"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button text-gray-800 px-4 py-2 text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Google Maps
                  </a>
                </div>
              </div>
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