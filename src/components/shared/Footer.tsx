'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '972501234567';
    const message = 'שלום, אני מעוניין לשמוע עוד על שירותי Crystal View';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-crystal-dark via-gray-900 to-black">
      <div className="section-padding py-16">
        <div className="container-max">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          >
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-crystal-blue to-crystal-silver rounded-lg flex items-center justify-center">
                  <span className="text-crystal-dark font-bold text-xl">CV</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-crystal-white">Crystal View</h3>
                  <p className="text-crystal-silver text-sm">זכוכית ואלומיניום יוקרתיים</p>
                </div>
              </div>
              
              <p className="text-crystal-silver leading-relaxed mb-6 max-w-md">
                Crystal View מובילה בתחום פתרונות זכוכית ואלומיניום ברמה הגבוהה ביותר. 
                אנחנו מתמחים בפרויקטים אדריכליים מורכבים ומספקים פתרונות מותאמים אישית.
              </p>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWhatsAppClick}
                  className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-white text-lg">📱</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open('tel:+972501234567')}
                  className="w-10 h-10 bg-crystal-blue hover:bg-crystal-silver rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-crystal-dark text-lg">📞</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => window.open('mailto:info@crystalview.co.il')}
                  className="w-10 h-10 bg-crystal-silver hover:bg-crystal-blue rounded-full flex items-center justify-center transition-colors"
                >
                  <span className="text-crystal-dark text-lg">✉️</span>
                </motion.button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-crystal-white mb-6">קישורים מהירים</h4>
              <nav className="space-y-3">
                {[
                  { id: 'hero', label: 'בית' },
                  { id: 'about', label: 'אודות' },
                  { id: 'portfolio', label: 'פרויקטים' },
                  { id: 'services', label: 'שירותים' },
                  { id: 'contact', label: 'צור קשר' },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-crystal-silver hover:text-crystal-blue transition-colors text-right"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-bold text-crystal-white mb-6">השירותים שלנו</h4>
              <nav className="space-y-3">
                {[
                  'חזיתות זכוכית',
                  'חלונות ודלתות',
                  'מעקות ומאחזי יד',
                  'מקלחונים יוקרתיים',
                  'פרגולות מודרניות',
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="text-crystal-silver hover:text-crystal-blue transition-colors cursor-pointer"
                    onClick={() => scrollToSection('services')}
                  >
                    {service}
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="border-t border-crystal-silver/20 pt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Contact Info */}
              <div className="flex flex-col md:flex-row gap-6 text-crystal-silver text-sm">
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span>050-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✉️</span>
                  <span>info@crystalview.co.il</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>רחוב הזכוכית 123, תל אביב</span>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-crystal-silver text-sm text-center md:text-right">
                © {currentYear} Crystal View. כל הזכויות שמורות.
                <br />
                <span className="text-xs">עוצב ופותח בישראל 🇮🇱</span>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 text-center p-6 bg-gradient-to-r from-crystal-blue/10 to-crystal-silver/10 rounded-2xl glass-effect">
              <h5 className="text-xl font-bold text-crystal-white mb-2">
                מוכנים להתחיל את הפרויקט שלכם?
              </h5>
              <p className="text-crystal-silver mb-4">
                צרו קשר עוד היום לקבלת ייעוץ מקצועי והצעת מחיר ללא התחייבות
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
              >
                בואו נתחיל לעבוד
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}