'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '@/contexts/AccessibilityContext';

export default function AccessibilityWidget() {
  const {
    settings,
    updateSetting,
    resetSettings,
    announceToScreenReader,
    announcement
  } = useAccessibility();

  const widgetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  const closeWidget = useCallback(() => {
    updateSetting('isOpen', false);
    announceToScreenReader('תפריט נגישות נסגר');
    setTimeout(() => triggerRef.current?.focus(), 100);
  }, [updateSetting, announceToScreenReader]);

  const toggleWidget = useCallback(() => {
    const newIsOpen = !settings.isOpen;
    updateSetting('isOpen', newIsOpen);

    if (newIsOpen) {
      announceToScreenReader('תפריט נגישות נפתח');
      setTimeout(() => firstFocusableRef.current?.focus(), 100);
    } else {
      announceToScreenReader('תפריט נגישות נסגר');
      setTimeout(() => triggerRef.current?.focus(), 100);
    }
  }, [settings.isOpen, updateSetting, announceToScreenReader]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settings.isOpen && widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        closeWidget();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [settings.isOpen, closeWidget]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!settings.isOpen) {
        // Alt + A to open widget
        if (e.altKey && e.key.toLowerCase() === 'a') {
          e.preventDefault();
          toggleWidget();
        }
        return;
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeWidget();
          break;
        case 'Tab':
          if (e.shiftKey) {
            // Shift + Tab - move backward
            if (document.activeElement === firstFocusableRef.current) {
              e.preventDefault();
              lastFocusableRef.current?.focus();
            }
          } else {
            // Tab - move forward
            if (document.activeElement === lastFocusableRef.current) {
              e.preventDefault();
              firstFocusableRef.current?.focus();
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [settings.isOpen, toggleWidget, closeWidget]);

  const adjustFontSize = (increment: number) => {
    const newSize = Math.max(75, Math.min(175, settings.fontSize + increment));
    updateSetting('fontSize', newSize);
    announceToScreenReader(`גודל טקסט שונה ל-${newSize}%`);
  };

  const handleBooleanToggle = (key: string, onMessage: string, offMessage: string) => {
    const currentValue = settings[key as keyof typeof settings] as boolean;
    const newValue = !currentValue;
    updateSetting(key as keyof typeof settings, newValue);
    announceToScreenReader(newValue ? onMessage : offMessage);
  };

  const handleFontFamilyToggle = () => {
    const newFont = settings.fontFamily === 'default' ? 'readable' : 'default';
    updateSetting('fontFamily', newFont);
    announceToScreenReader(newFont === 'readable' ? 'גופן קריא הופעל' : 'גופן קריא כובה');
  };

  return (
    <>
      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {/* Floating trigger button */}
      <motion.button
        ref={triggerRef}
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group focus-visible:outline-4 focus-visible:outline-white focus-visible:outline-offset-3"
        data-accessibility-trigger
        aria-label={settings.isOpen ? 'סגור תפריט נגישות' : 'פתח תפריט נגישות (Alt+A)'}
        aria-expanded={settings.isOpen}
        aria-controls="accessibility-panel"
        aria-haspopup="dialog"
        title="תפריט נגישות (Alt+A)"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className={`w-7 h-7 transition-transform duration-300 ${settings.isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.48.41-2.86 1.12-4.06l10.94 10.94C14.86 19.59 13.48 20 12 20zM18.88 15.94L7.94 5.06C9.14 4.41 10.52 4 12 4c4.41 0 8 3.59 8 8 0 1.48-.41 2.86-1.12 4.06z"/>
        </svg>
      </motion.button>

      {/* Accessibility panel */}
      <AnimatePresence>
        {settings.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={closeWidget}
            />

            {/* Panel */}
            <motion.div
              ref={widgetRef}
              id="accessibility-panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-white shadow-2xl z-50 overflow-y-auto"
              role="dialog"
              aria-labelledby="accessibility-title"
              aria-describedby="accessibility-description"
              aria-modal="true"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 id="accessibility-title" className="text-2xl font-bold text-gray-900">
                    הגדרות נגישות
                  </h2>
                  <button
                    ref={lastFocusableRef}
                    onClick={closeWidget}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                    aria-label="סגור תפריט נגישות"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <p id="accessibility-description" className="text-gray-600 mb-6 text-sm">
                  התאם את האתר לצרכי הנגישות שלך. השינויים יישמרו אוטומטית.
                </p>

                <div className="space-y-6">
                  {/* Font Size Section */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">התאמות טקסט</h3>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-900 mb-3">
                        גודל טקסט: {settings.fontSize}%
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => adjustFontSize(-25)}
                          disabled={settings.fontSize <= 75}
                          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                          aria-label="הקטן טקסט"
                        >
                          א-
                        </button>
                        <button
                          onClick={() => updateSetting('fontSize', 100)}
                          className="px-3 py-2 text-xs bg-blue-100 hover:bg-blue-200 rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                          aria-label="איפוס גודל טקסט"
                        >
                          איפוס
                        </button>
                        <button
                          onClick={() => adjustFontSize(25)}
                          disabled={settings.fontSize >= 175}
                          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                          aria-label="הגדל טקסט"
                        >
                          א+
                        </button>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>+25%</span>
                        <span>+50%</span>
                        <span>+75%</span>
                      </div>
                    </div>

                    {/* Readable Font */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label htmlFor="readable-font" className="text-sm font-semibold text-gray-900">
                          גופן קריא
                        </label>
                        <p className="text-xs text-gray-600 mt-1">החלף לגופן Arial/Open Sans קריא יותר</p>
                      </div>
                      <button
                        id="readable-font"
                        role="switch"
                        aria-checked={settings.fontFamily === 'readable'}
                        onClick={handleFontFamilyToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.fontFamily === 'readable' ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.fontFamily === 'readable' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Contrast & Colors Section */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">ניגודיות וצבעים</h3>

                    {/* High Contrast */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <label htmlFor="high-contrast" className="text-sm font-semibold text-gray-900">
                          ניגודיות גבוהה
                        </label>
                        <p className="text-xs text-gray-600 mt-1">רקע שחור, טקסט לבן</p>
                      </div>
                      <button
                        id="high-contrast"
                        role="switch"
                        aria-checked={settings.highContrast}
                        onClick={() => handleBooleanToggle('highContrast', 'ניגודיות גבוהה הופעלה', 'ניגודיות גבוהה כובתה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.highContrast ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Inverted Contrast */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <label htmlFor="inverted-contrast" className="text-sm font-semibold text-gray-900">
                          ניגודיות הפוכה
                        </label>
                        <p className="text-xs text-gray-600 mt-1">רקע לבן, טקסט שחור מודגש</p>
                      </div>
                      <button
                        id="inverted-contrast"
                        role="switch"
                        aria-checked={settings.invertedContrast}
                        disabled={settings.highContrast}
                        onClick={() => handleBooleanToggle('invertedContrast', 'ניגודיות הפוכה הופעלה', 'ניגודיות הפוכה כובתה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.invertedContrast ? 'bg-blue-600' : 'bg-gray-300'
                        } ${settings.highContrast ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.invertedContrast ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Grayscale Mode */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <label htmlFor="grayscale-mode" className="text-sm font-semibold text-gray-900">
                          מצב אפור
                        </label>
                        <p className="text-xs text-gray-600 mt-1">הצגה בגווני אפור בלבד</p>
                      </div>
                      <button
                        id="grayscale-mode"
                        role="switch"
                        aria-checked={settings.grayscaleMode}
                        onClick={() => handleBooleanToggle('grayscaleMode', 'מצב אפור הופעל', 'מצב אפור כובה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.grayscaleMode ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.grayscaleMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Highlight Links */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <label htmlFor="highlight-links" className="text-sm font-semibold text-gray-900">
                          הדגש קישורים
                        </label>
                        <p className="text-xs text-gray-600 mt-1">קו תחתון וצבע מודגש לקישורים</p>
                      </div>
                      <button
                        id="highlight-links"
                        role="switch"
                        aria-checked={settings.highlightLinks}
                        onClick={() => handleBooleanToggle('highlightLinks', 'הדגשת קישורים הופעלה', 'הדגשת קישורים כובתה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.highlightLinks ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.highlightLinks ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Highlight Headings */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label htmlFor="highlight-headings" className="text-sm font-semibold text-gray-900">
                          הדגש כותרות
                        </label>
                        <p className="text-xs text-gray-600 mt-1">מסגור או רקע מודגש לכותרות</p>
                      </div>
                      <button
                        id="highlight-headings"
                        role="switch"
                        aria-checked={settings.highlightHeadings}
                        onClick={() => handleBooleanToggle('highlightHeadings', 'הדגשת כותרות הופעלה', 'הדגשת כותרות כובתה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.highlightHeadings ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.highlightHeadings ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Navigation & Content Section */}
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">ניווט ותוכן</h3>

                    {/* Enhanced Focus */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <label htmlFor="enhanced-focus" className="text-sm font-semibold text-gray-900">
                          פוקוס מוגבר
                        </label>
                        <p className="text-xs text-gray-600 mt-1">מסגור בולט יותר לאלמנטים בפוקוס</p>
                      </div>
                      <button
                        id="enhanced-focus"
                        role="switch"
                        aria-checked={settings.enhancedFocus}
                        onClick={() => handleBooleanToggle('enhancedFocus', 'פוקוס מוגבר הופעל', 'פוקוס מוגבר כובה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.enhancedFocus ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.enhancedFocus ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Improved Readability */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label htmlFor="improved-readability" className="text-sm font-semibold text-gray-900">
                          קריאות משופרת
                        </label>
                        <p className="text-xs text-gray-600 mt-1">מרווחי שורות ושוליים טובים יותר</p>
                      </div>
                      <button
                        id="improved-readability"
                        role="switch"
                        aria-checked={settings.improvedReadability}
                        onClick={() => handleBooleanToggle('improvedReadability', 'קריאות משופרת הופעלה', 'קריאות משופרת כובתה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.improvedReadability ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.improvedReadability ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Control Behavior Section */}
                  <div className="pb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">בקרת התנהגות</h3>

                    {/* Reduce Animations */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <label htmlFor="reduce-animations" className="text-sm font-semibold text-gray-900">
                          הפחת אנימציות
                        </label>
                        <p className="text-xs text-gray-600 mt-1">השבת אנימציות ופרלקס</p>
                      </div>
                      <button
                        id="reduce-animations"
                        role="switch"
                        aria-checked={settings.reduceAnimations}
                        onClick={() => handleBooleanToggle('reduceAnimations', 'הפחתת אנימציות הופעלה', 'הפחתת אנימציות כובתה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.reduceAnimations ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.reduceAnimations ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Stop Autoplay */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label htmlFor="stop-autoplay" className="text-sm font-semibold text-gray-900">
                          עצור הפעלה אוטומטית
                        </label>
                        <p className="text-xs text-gray-600 mt-1">השבת וידיאו ומחזורי תמונות אוטומטיים</p>
                      </div>
                      <button
                        id="stop-autoplay"
                        role="switch"
                        aria-checked={settings.stopAutoplay}
                        onClick={() => handleBooleanToggle('stopAutoplay', 'עצירת הפעלה אוטומטית הופעלה', 'עצירת הפעלה אוטומטית כובתה')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                          settings.stopAutoplay ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.stopAutoplay ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reset button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    ref={firstFocusableRef}
                    onClick={resetSettings}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                  >
                    איפוס לברירת מחדל
                  </button>
                </div>

                {/* Help text */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2 text-sm">עזרה וקיצורי מקלדת</h3>
                  <div className="text-blue-800 text-xs leading-relaxed">
                    <p className="mb-2">
                      <kbd className="px-1 py-0.5 bg-blue-200 rounded text-xs">Alt+A</kbd> - פתח תפריט נגישות<br/>
                      <kbd className="px-1 py-0.5 bg-blue-200 rounded text-xs">Escape</kbd> - סגור תפריט<br/>
                      <kbd className="px-1 py-0.5 bg-blue-200 rounded text-xs">Tab</kbd> - נווט בין האפשרויות
                    </p>
                    <p className="border-t border-blue-200 pt-2">
                      לתמיכה טכנית: <a href="tel:053-3366101" className="underline font-medium hover:text-blue-600">053-3366101</a><br/>
                      <a href="/accessibility-statement" className="underline font-medium hover:text-blue-600">הצהרת נגישות מלאה</a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}