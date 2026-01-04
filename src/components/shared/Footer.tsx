'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer 
      id="footer"
      className="bg-gradient-to-b from-glass-charcoal to-glass-dark text-white"
      role="contentinfo"
      aria-label="מידע על החברה וקישורים"
    >
      <div className="section-padding">
        <div className="container-max">
          <div className="py-12">
            
            {/* Main Footer Content - 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
              
              {/* Left Column - Company Info + Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6">
                  <Image
                    src="/logowtext.png"
                    alt="Crystal View"
                    width={140}
                    height={45}
                    className="h-9 w-auto brightness-0 invert"
                  />
                </div>
                <p className="text-glass-sky/80 text-sm leading-relaxed mb-6">
                  פתרונות אלומיניום וזכוכית ברמה הגבוהה ביותר. מעל 20 שנות ניסיון.
                </p>
                
                {/* Quick Links */}
                <nav className="flex flex-wrap gap-4 text-sm" aria-label="קישורים מהירים">
                  {[
                    { href: '/', label: 'בית' },
                    { href: '/about', label: 'אודות' },
                    { href: '/gallery', label: 'גלריה' },
                    { href: '/contact', label: 'צור קשר' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-white/70 hover:text-glass-accent transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>

              {/* Right Column - Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="text-sm font-semibold text-glass-accent mb-4">צרו קשר</h4>
                <div className="space-y-3 text-sm">
                  <a 
                    href="tel:0533366101"
                    className="block text-white/70 hover:text-glass-accent transition-colors duration-300 touch-target"
                  >
                    <span dir="ltr">053-3366101</span>
                  </a>
                  
                  <a 
                    href="mailto:crystalview202@gmail.com"
                    className="block text-white/70 hover:text-glass-accent transition-colors duration-300 touch-target"
                  >
                    crystalview202@gmail.com
                  </a>
                  
                  <address className="not-italic text-white/70">
                    המחוגה 2, איזור תעשייה צפוני, אשקלון
                  </address>
                </div>
              </motion.div>

            </div>

            {/* Divider */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-white/40 text-xs">
                  © 2025 Crystal View — כל הזכויות שמורות
                </p>
                <Link 
                  href="/accessibility-statement" 
                  className="text-white/40 hover:text-glass-accent transition-colors text-xs"
                >
                  הצהרת נגישות
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
