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
    { href: '/testimonials', label: 'המלצות' },
    { href: '/contact', label: 'צור קשר' },
  ];

  return (
    <motion.header
      id="navigation"
      role="banner"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled
          ? ''
          : 'bg-transparent'
      }`}
      aria-label="ניווט ראשי של Crystal View"
    >
      <div className="section-padding">
        <div className="container-max">
          <div className="flex items-center justify-between h-16 lg:h-20 glass-nav px-6">
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
                    className="h-12 lg:h-14 w-auto group-hover:brightness-110 transition-all duration-300"
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
                    className="h-10 w-10 group-hover:brightness-110 transition-all duration-300"
                    priority
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav 
              className="hidden lg:flex items-center space-x-8 space-x-reverse" 
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
                      className="relative group px-4 py-2 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 rounded-lg"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {/* Active indicator */}
                      {pathname === item.href && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-crystal-blue/20 to-crystal-silver/20 rounded-lg border border-crystal-blue/30"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      
                      {/* Text */}
                      <span className={`relative z-10 text-sm font-medium transition-all duration-300 ${
                        pathname === item.href 
                          ? 'text-blue-600 font-bold' 
                          : 'text-gray-800 group-hover:text-blue-600'
                      }`}>
                        {item.label}
                      </span>
                      
                      {/* Underline effect */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-crystal-blue to-crystal-silver group-hover:w-full group-hover:left-0 transition-all duration-300"
                        initial={false}
                      />
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
                className="hidden lg:block glass-button text-gray-800 px-8 py-3 font-bold transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                aria-label="עבור לעמוד צור קשר לקבלת הצעת מחיר"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Button text */}
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  קבל הצעת מחיר
                </span>
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center glass-button group"
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
                className="w-5 h-5 text-gray-800 group-hover:text-blue-600 transition-colors duration-300"
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
        className="lg:hidden glass-nav overflow-hidden border-t border-crystal-glass-border mt-2"
        role="navigation"
        aria-label="תפריט ניווט נייד"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="section-padding py-6">
          <nav className="flex flex-col space-y-2" role="list">
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
                    whileTap={{ scale: 0.95, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                      pathname === item.href 
                        ? 'bg-gradient-to-r from-blue-100/50 to-blue-50/50 border-blue-300/50 text-blue-600' 
                        : 'border-gray-200/30 text-gray-800 hover:border-blue-300/50 hover:bg-blue-50/20'
                    }`}
                    role="button"
                    tabIndex={0}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    <span className="font-medium text-lg">{item.label}</span>
                    
                    {/* Arrow indicator */}
                    <motion.svg
                      className={`w-5 h-5 transition-colors duration-300 ${
                        pathname === item.href ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </motion.svg>
                    
                    {/* Active indicator dot */}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="mobileDot"
                        className="absolute left-2 top-1/2 w-2 h-2 bg-blue-600 rounded-full"
                        initial={false}
                        style={{ y: "-50%" }}
                      />
                    )}
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
                  className="relative overflow-hidden glass-button text-gray-800 px-8 py-4 rounded-xl font-bold text-center w-full shadow-lg hover:shadow-xl transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                  aria-label="עבור לעמוד צור קשר לקבלת הצעת מחיר"
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                    <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    קבל הצעת מחיר
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </nav>
        </div>
      </motion.div>
    </motion.header>
  );
}