'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  darkMode: boolean;
  reducedMotion: boolean;
  focusIndicators: boolean;
  screenReader: boolean;
}

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    highContrast: false,
    darkMode: false,
    reducedMotion: false,
    focusIndicators: true,
    screenReader: false,
  });

  // Keyboard navigation support
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        announceToScreenReader('תפריט נגישות נסגר');
      }
    };

    const handleTabTrap = (e: KeyboardEvent) => {
      if (!isOpen || e.key !== 'Tab') return;
      
      const focusableElements = document.querySelectorAll(
        '#accessibility-menu button, #accessibility-menu input, #accessibility-menu [role="switch"]'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabTrap);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabTrap);
    };
  }, [isOpen]);

  // טוען הגדרות משמורות
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // יישום ההגדרות על הדף
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // גודל טקסט
    root.style.fontSize = `${settings.fontSize}%`;
    
    // ניגודיות גבוהה
    if (settings.highContrast) {
      body.classList.add('accessibility-high-contrast');
      root.classList.add('accessibility-high-contrast');
    } else {
      body.classList.remove('accessibility-high-contrast');
      root.classList.remove('accessibility-high-contrast');
    }
    
    // מצב כהה
    if (settings.darkMode) {
      body.classList.add('accessibility-dark-mode');
      root.classList.add('accessibility-dark-mode');
    } else {
      body.classList.remove('accessibility-dark-mode');
      root.classList.remove('accessibility-dark-mode');
    }
    
    // הפחתת תנועות
    if (settings.reducedMotion) {
      body.classList.add('accessibility-reduced-motion');
      root.classList.add('accessibility-reduced-motion');
      // הפעלת prefers-reduced-motion CSS
      root.style.setProperty('--animation-duration', '0.01ms');
      root.style.setProperty('--transition-duration', '0.01ms');
    } else {
      body.classList.remove('accessibility-reduced-motion');
      root.classList.remove('accessibility-reduced-motion');
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }
    
    // אינדיקטורי פוקוס מוגברים
    if (settings.focusIndicators) {
      body.classList.add('accessibility-enhanced-focus');
      root.classList.add('accessibility-enhanced-focus');
    } else {
      body.classList.remove('accessibility-enhanced-focus');
      root.classList.remove('accessibility-enhanced-focus');
    }

    // שמירת הגדרות
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      highContrast: false,
      darkMode: false,
      reducedMotion: false,
      focusIndicators: true,
      screenReader: false,
    });
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <>
      {/* כפתור פתיחת נגישות */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          announceToScreenReader(isOpen ? 'תפריט נגישות נסגר' : 'תפריט נגישות נפתח');
        }}
        className="accessibility-floating-button"
        aria-label="פתח תפריט נגישות"
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg 
          className="w-7 h-7" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path d="M12 2a5 5 0 015 5 5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5zm0 2a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3zm0 8c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0 1.9c-2.97 0-6.1 1.46-6.1 2.1v.1h12.2V16c0-.64-3.13-2.1-6.1-2.1z"/>
        </svg>
      </motion.button>

      {/* תפריט נגישות */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* רקע חצי שקוף */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-[58]"
              onClick={() => setIsOpen(false)}
            />

            {/* פאנל נגישות */}
            <motion.div
              id="accessibility-menu"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl z-[59] overflow-y-auto"
              role="dialog"
              aria-labelledby="accessibility-title"
              aria-describedby="accessibility-description"
            >
              <div className="p-6">
                {/* כותרת */}
                <div className="flex items-center justify-between mb-6">
                  <h2 id="accessibility-title" className="text-2xl font-bold text-gray-800">
                    הגדרות נגישות
                  </h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="סגור תפריט נגישות"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p id="accessibility-description" className="text-gray-600 mb-6 text-sm">
                  התאמה אישית של האתר לצרכים שלך
                </p>

                <div className="space-y-6">
                  {/* גודל טקסט */}
                  <div>
                    <label htmlFor="font-size-slider" className="block text-sm font-semibold text-gray-800 mb-3">
                      גודל טקסט: {settings.fontSize}%
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const newSize = Math.max(80, settings.fontSize - 10);
                          updateSetting('fontSize', newSize);
                          announceToScreenReader(`גודל טקסט הוקטן ל-${newSize}%`);
                        }}
                        className="glass-button px-3 py-1 text-sm"
                        aria-label="הקטן טקסט"
                      >
                        א-
                      </button>
                      <input
                        id="font-size-slider"
                        type="range"
                        min="80"
                        max="150"
                        step="10"
                        value={settings.fontSize}
                        onChange={(e) => {
                          const newSize = parseInt(e.target.value);
                          updateSetting('fontSize', newSize);
                          announceToScreenReader(`גודל טקסט שונה ל-${newSize}%`);
                        }}
                        className="flex-1 accent-blue-600"
                        aria-describedby="font-size-description"
                      />
                      <button
                        onClick={() => {
                          const newSize = Math.min(150, settings.fontSize + 10);
                          updateSetting('fontSize', newSize);
                          announceToScreenReader(`גודל טקסט הוגדל ל-${newSize}%`);
                        }}
                        className="glass-button px-3 py-1 text-sm"
                        aria-label="הגדל טקסט"
                      >
                        א+
                      </button>
                    </div>
                    <p id="font-size-description" className="text-xs text-gray-500 mt-1">
                      80% - 150% מהגודל הרגיל
                    </p>
                  </div>

                  {/* ניגודיות גבוהה */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="high-contrast" className="text-sm font-semibold text-gray-800">
                      ניגודיות גבוהה
                    </label>
                    <button
                      id="high-contrast"
                      role="switch"
                      aria-checked={settings.highContrast}
                      onClick={() => {
                        const newValue = !settings.highContrast;
                        updateSetting('highContrast', newValue);
                        announceToScreenReader(newValue ? 'ניגודיות גבוהה הופעלה' : 'ניגודיות גבוהה כובתה');
                      }}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${settings.highContrast ? 'bg-blue-600' : 'bg-gray-300'}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 rounded-full bg-white transition-transform
                          ${settings.highContrast ? 'translate-x-6' : 'translate-x-1'}
                        `}
                      />
                    </button>
                  </div>

                  {/* מצב כהה */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="dark-mode" className="text-sm font-semibold text-gray-800">
                      מצב כהה
                    </label>
                    <button
                      id="dark-mode"
                      role="switch"
                      aria-checked={settings.darkMode}
                      onClick={() => {
                        const newValue = !settings.darkMode;
                        updateSetting('darkMode', newValue);
                        announceToScreenReader(newValue ? 'מצב כהה הופעל' : 'מצב כהה כובה');
                      }}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 rounded-full bg-white transition-transform
                          ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}
                        `}
                      />
                    </button>
                  </div>

                  {/* הפחתת תנועות */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="reduced-motion" className="text-sm font-semibold text-gray-800">
                      הפחתת תנועות ואנימציות
                    </label>
                    <button
                      id="reduced-motion"
                      role="switch"
                      aria-checked={settings.reducedMotion}
                      onClick={() => {
                        const newValue = !settings.reducedMotion;
                        updateSetting('reducedMotion', newValue);
                        announceToScreenReader(newValue ? 'הפחתת תנועות הופעלה' : 'הפחתת תנועות כובתה');
                      }}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${settings.reducedMotion ? 'bg-blue-600' : 'bg-gray-300'}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 rounded-full bg-white transition-transform
                          ${settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'}
                        `}
                      />
                    </button>
                  </div>

                  {/* אינדיקטורי פוקוס מוגברים */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="focus-indicators" className="text-sm font-semibold text-gray-800">
                      סימון פוקוס מוגבר
                    </label>
                    <button
                      id="focus-indicators"
                      role="switch"
                      aria-checked={settings.focusIndicators}
                      onClick={() => {
                        const newValue = !settings.focusIndicators;
                        updateSetting('focusIndicators', newValue);
                        announceToScreenReader(newValue ? 'סימון פוקוס מוגבר הופעל' : 'סימון פוקוס מוגבר כובה');
                      }}
                      className={`
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${settings.focusIndicators ? 'bg-blue-600' : 'bg-gray-300'}
                      `}
                    >
                      <span
                        className={`
                          inline-block h-4 w-4 rounded-full bg-white transition-transform
                          ${settings.focusIndicators ? 'translate-x-6' : 'translate-x-1'}
                        `}
                      />
                    </button>
                  </div>
                </div>

                {/* כפתור איפוס */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      resetSettings();
                      announceToScreenReader('הגדרות נגישות אופסו לברירת מחדל');
                    }}
                    className="w-full glass-button text-gray-800 py-3 font-medium"
                  >
                    איפוס הגדרות
                  </button>
                </div>

                {/* מידע נוסף */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">צריך עזרה נוספת?</h3>
                  <p className="text-blue-800 text-sm">
                    לתמיכה בנגישות צרו קשר עמנו בטלפון <a href="tel:053-3366101" className="underline">053-3366101</a>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}