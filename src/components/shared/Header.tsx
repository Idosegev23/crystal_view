'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Only use transparent/white text on homepage
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? 'bg-white/90 backdrop-blur-lg shadow-glass border-b border-glass-mist/50'
          : 'bg-transparent'
      }`}
      aria-label="ניווט ראשי"
    >
      <div className="section-padding">
        <div className="container-max">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link href="/" aria-label="Crystal View - עמוד הבית">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center cursor-pointer"
              >
                <div className="hidden sm:block">
                  <Image
                    src="/logowtext.png"
                    alt="Crystal View"
                    width={180}
                    height={50}
                    className={`h-11 lg:h-12 w-auto transition-all duration-300 ${
                      isScrolled || !isHomePage ? '' : 'brightness-0 invert'
                    }`}
                    priority
                  />
                </div>
                
                <div className="block sm:hidden">
                  <Image
                    src="/logontext.png"
                    alt="Crystal View"
                    width={40}
                    height={40}
                    className={`h-10 w-10 transition-all duration-300 ${
                      isScrolled || !isHomePage ? '' : 'brightness-0 invert'
                    }`}
                    priority
                  />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav 
              className="hidden lg:flex items-center gap-8" 
              role="navigation" 
              aria-label="תפריט ניווט ראשי"
            >
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`text-sm font-medium transition-all duration-300 relative group ${
                      isScrolled || !isHomePage ? 'text-glass-charcoal' : 'text-white'
                    } ${pathname === item.href ? 'text-glass-blue' : 'hover:text-glass-blue'}`}
                    aria-current={pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                    <span 
                      className={`absolute -bottom-1 left-0 h-0.5 bg-glass-blue rounded-full transition-all duration-300 ${
                        pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <Link href="/contact" className="hidden lg:block">
              <button
                className={`glass-btn bento-1 text-sm px-6 py-2.5 ${
                  !isScrolled && isHomePage && 'bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white hover:text-glass-charcoal'
                }`}
              >
                הצעת מחיר
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-11 h-11 flex flex-col justify-center items-center touch-target bg-glass-charcoal text-white bento-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
              aria-expanded={isMobileMenuOpen}
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -4,
                }}
                className="w-5 h-0.5 bg-current absolute rounded-full"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-5 h-0.5 bg-current absolute rounded-full"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 4,
                }}
                className="w-5 h-0.5 bg-current absolute rounded-full"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-panel border-t border-glass-mist overflow-hidden"
            role="navigation"
            aria-label="תפריט ניווט נייד"
          >
            <div className="section-padding py-6">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={item.href}>
                      <div
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block py-4 px-4 text-lg font-medium transition-all duration-200 ${getBentoClass(index)} ${
                          pathname === item.href 
                            ? 'bg-glass-blue text-white' 
                            : 'text-glass-charcoal hover:bg-glass-ice'
                        }`}
                        aria-current={pathname === item.href ? 'page' : undefined}
                      >
                        {item.label}
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 }}
                  className="pt-4"
                >
                  <Link href="/contact">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="glass-btn bento-mixed w-full"
                    >
                      קבל הצעת מחיר
                    </button>
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

const getBentoClass = (index: number) => {
  const classes = ['bento-1', 'bento-2', 'bento-3', 'bento-4', 'bento-mixed', 'bento-soft'];
  return classes[index % classes.length];
};
