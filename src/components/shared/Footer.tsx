'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fadeInUp } from '@/lib/animations';

export default function Footer() {
  return (
    <footer 
      className="bg-clean-gray-900 text-white relative"
      role="contentinfo"
      aria-label="מידע על החברה וקישורים"
    >
      <div className="section-padding">
        <div className="container-max">
          <div className="py-16">
            
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="mb-6">
                  <Image
                    src="/logowtext.png"
                    alt="Crystal View Logo"
                    width={180}
                    height={60}
                    className="h-12 w-auto brightness-0 invert"
                  />
                </div>
                <p className="text-clean-gray-300 leading-relaxed">
                  פתרונות זכוכית ואלומיניום ברמה הגבוהה ביותר עם מעל 20 שנות ניסיון והקפדה מירבית על כל פרט
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="text-lg font-bold mb-4">קישורים מהירים</h4>
                <nav className="space-y-3" aria-label="קישורים מהירים בתחתית הדף">
                  {[
                    { href: '/', label: 'בית' },
                    { href: '/about', label: 'אודות' },
                    { href: '/gallery', label: 'גלריה' },
                    { href: '/testimonials', label: 'המלצות' },
                    { href: '/contact', label: 'צור קשר' },
                    { href: '/accessibility-statement', label: 'הצהרת נגישות' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-clean-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h4 className="text-lg font-bold mb-4">השירותים שלנו</h4>
                <ul className="space-y-3 text-clean-gray-300 text-sm" role="list">
                  <li>סגירות מרפסות בזכוכית</li>
                  <li>פרגולות אלומיניום מעוצבות</li>
                  <li>חזיתות זכוכית</li>
                  <li>רשתות יתושים</li>
                  <li>סורגים שקופים</li>
                  <li>מקלחונים</li>
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h4 className="text-lg font-bold mb-4">צרו קשר</h4>
                <div className="space-y-4 text-clean-gray-300 text-sm">
                  <a 
                    href="tel:0533366101"
                    className="flex items-center gap-3 hover:text-white transition-colors duration-200 touch-target"
                    aria-label="התקשר למספר טלפון 053-3366101"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span dir="ltr">053-3366101</span>
                  </a>
                  
                  <a 
                    href="mailto:crystalview202@gmail.com"
                    className="flex items-center gap-3 hover:text-white transition-colors duration-200 touch-target"
                    aria-label="שלח אימייל לכתובת crystalview202@gmail.com"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="break-all">crystalview202@gmail.com</span>
                  </a>
                  
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>המחוגה 2, איזור תעשייה צפוני, אשקלון 78100</span>
                  </div>
                </div>
              </motion.div>

            </div>

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-t border-clean-gray-800 pt-12 mb-12"
            >
              <h4 className="text-lg font-bold mb-6 text-center">מיקום המפעל</h4>
              <div className="clean-card p-8 text-center bg-white text-clean-gray-900 max-w-2xl mx-auto">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-clean-blue-50 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-clean-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2 text-clean-gray-700 mb-6">
                  <div className="font-semibold text-xl">המחוגה 2</div>
                  <div>איזור תעשייה צפוני אשקלון</div>
                  <div className="text-sm text-clean-gray-600">78100, ישראל</div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://www.openstreetmap.org/?mlat=31.667890&mlon=34.571234&zoom=16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clean-btn-secondary text-sm py-3 px-6 touch-target"
                    aria-label="פתח את המיקום ב-OpenStreetMap"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    OpenStreetMap
                  </a>
                  <a
                    href="https://maps.google.com/?q=המחוגה+2+איזור+תעשייה+צפוני+אשקלון"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="clean-btn text-sm py-3 px-6 touch-target"
                    aria-label="פתח את המיקום ב-Google Maps"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Google Maps
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Bottom Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="border-t border-clean-gray-800 pt-8 text-center"
            >
              <p className="text-clean-gray-400 text-sm">
                © 2024 Crystal View • כל הזכויות שמורות
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </footer>
  );
}
