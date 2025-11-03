'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { MenuIcon, CloseIcon } from '@/lib/icons';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { href: '/', label: 'בית' },
    { href: '/about', label: 'אודות' },
    { href: '/gallery', label: 'גלריה' },
    { href: '/faq', label: 'שאלות נפוצות' },
    { href: '/testimonials', label: 'המלצות' },
    { href: '/contact', label: 'צור קשר' },
  ];

  return (
    <motion.header
      id="navigation"
      role="banner"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-clean-md'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
      aria-label="ניווט ראשי של Crystal View"
    >
      <div className="section-padding">
        <div className="container-max">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" aria-label="Crystal View - עמוד הבית">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center cursor-pointer group"
              >
                {/* Desktop Logo - עם טקסט */}
                <div className="hidden sm:block">
                  <Image
                    src="/logowtext.png"
                    alt="Crystal View - זכוכית ואלומיניום יוקרתי"
                    width={200}
                    height={60}
                    className="h-12 lg:h-14 w-auto transition-opacity duration-300 group-hover:opacity-80"
                    priority
                  />
                </div>
                
                {/* Mobile Logo - בלי טקסט */}
                <div className="block sm:hidden">
                  <Image
                    src="/logontext.png"
                    alt="Crystal View"
                    width={48}
                    height={48}
                    className="h-10 w-10 transition-opacity duration-300 group-hover:opacity-80"
                    priority
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav 
              className="hidden lg:flex items-center gap-1" 
              role="navigation" 
              aria-label="תפריט ניווט ראשי"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={`relative px-4 py-2 rounded-lg transition-colors duration-200 ${
                        pathname === item.href 
                          ? 'bg-clean-blue text-white font-semibold' 
                          : 'text-clean-gray-800 hover:bg-clean-gray-100 font-medium'
                      }`}
                      whileHover={{ scale: pathname === item.href ? 1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      <span className="text-sm">
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <Link href="/contact">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                className="hidden lg:flex items-center gap-2 bg-clean-blue text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-clean-blue-700 shadow-clean hover:shadow-clean-md touch-target"
                aria-label="עבור לעמוד צור קשר לקבלת הצעת מחיר"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                קבל הצעת מחיר
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative w-11 h-11 flex flex-col justify-center items-center bg-clean-gray-100 rounded-lg hover:bg-clean-gray-200 transition-colors touch-target"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMobileMenuOpen ? 'סגור תפריט ניווט נייד' : 'פתח תפריט ניווט נייד'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-describedby="mobile-menu-help"
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-5 h-5 text-clean-gray-800 transition-colors duration-300"
              >
                {isMobileMenuOpen ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CloseIcon />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MenuIcon />
                  </motion.div>
                )}
              </motion.div>
              <span id="mobile-menu-help" className="sr-only">
                {isMobileMenuOpen ? 'התפריט פתוח - השתמש בטאב לניווט או לחץ שוב לסגירה' : 'לחץ כדי לפתוח את תפריט הניווט הנייד'}
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        id="mobile-navigation"
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="lg:hidden bg-white border-t border-clean-gray-200 overflow-hidden"
        role="navigation"
        aria-label="תפריט ניווט נייד"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="section-padding py-6">
          <nav className="flex flex-col gap-2" role="list">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                role="listitem"
              >
                <Link href={item.href}>
                  <motion.div
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 touch-target ${
                      pathname === item.href 
                        ? 'bg-clean-blue border-clean-blue text-white font-semibold' 
                        : 'border-clean-gray-200 text-clean-gray-800 hover:border-clean-blue hover:bg-clean-blue-50 font-medium'
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    <span className="text-lg">{item.label}</span>
                    
                    {/* Arrow indicator */}
                    <svg
                      className={`w-5 h-5 transition-colors duration-200 ${
                        pathname === item.href ? 'text-white' : 'text-clean-gray-600'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
            
            {/* CTA Button Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20
              }}
              transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
              className="pt-4"
            >
              <Link href="/contact">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-clean-blue text-white px-8 py-4 rounded-lg font-semibold text-center w-full shadow-clean hover:shadow-clean-md hover:bg-clean-blue-700 transition-all duration-200 touch-target"
                  aria-label="עבור לעמוד צור קשר לקבלת הצעת מחיר"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  קבל הצעת מחיר
                </motion.button>
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
}
