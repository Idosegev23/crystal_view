'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useFocusManagement } from '@/hooks/useFocusManagement';

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
  
  // Use our custom focus management hook
  const { focusRef, handleKeyNavigation, restoreFocus } = useFocusManagement();

  const closeWidget = useCallback(() => {
    updateSetting('isOpen', false);
    announceToScreenReader('תפריט נגישות נסגר');
    setTimeout(() => triggerRef.current?.focus(), 100);
  }, [updateSetting, announceToScreenReader]);

  const toggleWidget = useCallback(() => {
    const newIsOpen = !settings.isOpen;
    updateSetting('isOpen', newIsOpen);

    if (newIsOpen) {
      announceToScreenReader('תפריט נגישות נפתח - השתמש בטאב לניווט בין האפשרויות');
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

  // Enhanced keyboard navigation
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

      // Handle escape to close
      if (e.key === 'Escape') {
        e.preventDefault();
        closeWidget();
        return;
      }

      // Use our enhanced keyboard navigation
      handleKeyNavigation(e);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [settings.isOpen, toggleWidget, closeWidget, handleKeyNavigation]);

  const adjustFontSize = (increment: number) => {
    const newSize = Math.max(75, Math.min(175, settings.fontSize + increment));
    updateSetting('fontSize', newSize);
    announceToScreenReader(`גודל טקסט שונה ל-${newSize} אחוז`);
  };

  const handleBooleanToggle = (key: keyof typeof settings, onMessage: string, offMessage: string) => {
    const currentValue = settings[key] as boolean;
    const newValue = !currentValue;
    updateSetting(key, newValue as any);
    announceToScreenReader(newValue ? onMessage : offMessage);
  };

  const handleFontFamilyToggle = () => {
    const newFont = settings.fontFamily === 'default' ? 'readable' : 'default';
    updateSetting('fontFamily', newFont);
    announceToScreenReader(newFont === 'readable' ? 'גופן קריא הופעל - שונה לגופן Arial' : 'גופן קריא כובה - חזר לגופן ברירת המחדל');
  };

  const handleResetSettings = () => {
    resetSettings();
    announceToScreenReader('כל ההגדרות אופסו לברירת המחדל');
  };

  // Dynamic styling based on current accessibility modes
  const getTriggerButtonClasses = () => {
    let baseClasses = "accessibility-widget-trigger fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group focus-visible:outline-4 focus-visible:outline-offset-3";

    if (settings.highContrast) {
      return `${baseClasses} bg-black text-white border-4 border-white hover:bg-white hover:text-black focus-visible:outline-yellow-400`;
    } else if (settings.invertedContrast) {
      return `${baseClasses} bg-white text-black border-4 border-black hover:bg-gray-200 focus-visible:outline-blue-600`;
    } else if (settings.darkMode) {
      return `${baseClasses} bg-gray-800 text-white border-4 border-gray-600 hover:bg-gray-700 hover:border-teal-400 focus-visible:outline-teal-400 shadow-2xl`;
    } else {
      return `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl focus-visible:outline-white`;
    }
  };

  const getPanelClasses = () => {
    let baseClasses = "fixed top-0 right-0 h-full w-96 max-w-[90vw] shadow-2xl z-50 overflow-y-auto";

    if (settings.highContrast) {
      return `${baseClasses} bg-white text-black border-l-4 border-black`;
    } else if (settings.invertedContrast) {
      return `${baseClasses} bg-white text-black border-l-4 border-gray-400`;
    } else if (settings.darkMode) {
      return `${baseClasses} bg-gray-900 text-white border-l-4 border-gray-700 shadow-3xl`;
    } else {
      return `${baseClasses} bg-white`;
    }
  };

  return (
    <>
      {/* Screen reader announcements */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        role="status"
        aria-label="הודעות נגישות"
      >
        {announcement}
      </div>

      {/* Floating trigger button with dynamic styling */}
      <motion.button
        ref={triggerRef}
        onClick={toggleWidget}
        className={getTriggerButtonClasses()}
        data-accessibility-trigger
        aria-label={settings.isOpen ? 'סגור תפריט נגישות' : 'פתח תפריט נגישות - קיצור מקלדת Alt ועוד A'}
        aria-expanded={settings.isOpen}
        aria-controls="accessibility-panel"
        aria-haspopup="dialog"
        aria-describedby="accessibility-trigger-help"
        title="תפריט נגישות - Alt+A"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className={`w-8 h-8 transition-transform duration-300 ${settings.isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 512 512"
          aria-hidden="true"
          role="img"
          aria-labelledby="accessibility-icon-title"
        >
          <title id="accessibility-icon-title">סמל נגישות</title>
          <path d="M256 48c114.953 0 208 93.029 208 208 0 114.953-93.029 208-208 208-114.953 0-208-93.029-208-208 0-114.953 93.029-208 208-208m0-40C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 56C149.961 64 64 149.961 64 256s85.961 192 192 192 192-85.961 192-192S362.039 64 256 64zm0 44c19.882 0 36 16.118 36 36s-16.118 36-36 36-36-16.118-36-36 16.118-36 36-36zm117.741 98.023c-28.712 6.779-55.511 12.748-82.14 15.807.851 101.023 12.306 123.052 25.037 155.621 3.617 9.26-.957 19.698-10.217 23.315-9.261 3.617-19.699-.957-23.316-10.217-8.705-22.308-17.086-40.636-22.261-78.549h-9.686c-5.167 37.851-13.534 56.208-22.262 78.549-3.615 9.255-14.05 13.836-23.315 10.217-9.26-3.617-13.834-14.056-10.217-23.315 12.713-32.541 24.185-54.541 25.037-155.621-26.629-3.058-53.428-9.027-82.141-15.807-8.6-2.031-13.926-10.648-11.895-19.249s10.647-13.926 19.249-11.895c96.686 22.829 124.283 22.783 220.775 0 8.599-2.03 17.218 3.294 19.249 11.895 2.029 8.601-3.297 17.219-11.897 19.249z"/>
        </svg>
        <span id="accessibility-trigger-help" className="sr-only">
          לחץ כדי לפתוח תפריט נגישות או השתמש בקיצור מקלדת Alt+A
        </span>
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
              aria-hidden="true"
            />

            {/* Panel with dynamic styling */}
            <motion.div
              ref={(node) => {
                if (widgetRef.current !== node) {
                  (widgetRef as any).current = node;
                }
                if (focusRef.current !== node) {
                  (focusRef as any).current = node;
                }
              }}
              id="accessibility-panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className={getPanelClasses()}
              role="dialog"
              aria-labelledby="accessibility-title"
              aria-describedby="accessibility-description"
              aria-modal="true"
            >
              <div className="p-6">
                {/* Header */}
                <header className="flex items-center justify-between mb-6">
                  <h1 id="accessibility-title" className="text-2xl font-bold text-gray-900">
                    הגדרות נגישות
                  </h1>
                  <button
                    ref={lastFocusableRef}
                    onClick={closeWidget}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                    aria-label="סגור תפריט נגישות"
                    type="button"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </header>

                <p id="accessibility-description" className="text-gray-600 mb-6 text-sm">
                  התאם את האתר לצרכי הנגישות שלך. השינויים יישמרו אוטומטית ויחזרו בביקור הבא.
                </p>

                <div className="space-y-6">
                  {/* Font Size Controls */}
                  <section aria-labelledby="font-size-section">
                    <h2 id="font-size-section" className="text-lg font-semibold text-gray-900 mb-4">
                      גודל טקסט
                    </h2>
                    <div className="mb-4" role="group" aria-labelledby="font-size-label">
                      <label id="font-size-label" className="block text-sm font-medium text-gray-700 mb-3">
                        גודל נוכחי: {settings.fontSize}%
                      </label>
                      <div className="flex items-center gap-3" role="group" aria-label="בקרי גודל טקסט">
                        <button
                          onClick={() => adjustFontSize(-25)}
                          disabled={settings.fontSize <= 75}
                          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                          aria-label={`הקטן טקסט - גודל נוכחי ${settings.fontSize}%`}
                          type="button"
                        >
                          א-
                        </button>
                        
                        <button
                          onClick={() => updateSetting('fontSize', 100)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                          aria-label="איפוס גודל טקסט ל-100 אחוז"
                          type="button"
                        >
                          רגיל
                        </button>

                        <button
                          onClick={() => adjustFontSize(25)}
                          disabled={settings.fontSize >= 175}
                          className="px-4 py-2 bg-blue-100 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                          aria-label={`הגדל טקסט - גודל נוכחי ${settings.fontSize}%`}
                          type="button"
                        >
                          א+
                        </button>
                      </div>
                    </div>
                  </section>

                  {/* Essential Accessibility Options */}
                  <section aria-labelledby="essential-options">
                    <h2 id="essential-options" className="text-lg font-semibold text-gray-900 mb-4">
                      אפשרויות נגישות
                    </h2>
                    <div className="space-y-4">
                      {/* High Contrast */}
                      <div className="flex items-center justify-between" role="group" aria-labelledby="high-contrast-label">
                        <div>
                          <label id="high-contrast-label" htmlFor="high-contrast" className="text-sm font-medium text-gray-900">
                            ניגודיות גבוהה
                          </label>
                          <p className="text-xs text-gray-600 mt-1">רקע שחור וטקסט לבן</p>
                        </div>
                        <button
                          id="high-contrast"
                          role="switch"
                          aria-checked={settings.highContrast}
                          onClick={() => handleBooleanToggle('highContrast', 'ניגודיות גבוהה הופעלה', 'ניגודיות גבוהה כובתה')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                            settings.highContrast ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                          type="button"
                        >
                          <span className="sr-only">
                            {settings.highContrast ? 'ניגודיות גבוהה פעילה' : 'ניגודיות גבוהה כבויה'}
                          </span>
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* Dark Mode */}
                      <div className="flex items-center justify-between" role="group" aria-labelledby="dark-mode-label">
                        <div>
                          <label id="dark-mode-label" htmlFor="dark-mode" className="text-sm font-medium text-gray-900">
                            מצב כהה
                          </label>
                          <p className="text-xs text-gray-600 mt-1">עיצוב כהה נוח לעיניים</p>
                        </div>
                        <button
                          id="dark-mode"
                          role="switch"
                          aria-checked={settings.darkMode}
                          disabled={settings.highContrast}
                          onClick={() => handleBooleanToggle('darkMode', 'מצב כהה הופעל', 'מצב כהה כובה')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                            settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                          } ${settings.highContrast ? 'opacity-50 cursor-not-allowed' : ''}`}
                          type="button"
                        >
                          <span className="sr-only">
                            {settings.darkMode ? 'מצב כהה פעיל' : 'מצב כהה כבוי'}
                          </span>
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* Readable Font */}
                      <div className="flex items-center justify-between" role="group" aria-labelledby="readable-font-label">
                        <div>
                          <label id="readable-font-label" htmlFor="readable-font" className="text-sm font-medium text-gray-900">
                            גופן קריא
                          </label>
                          <p className="text-xs text-gray-600 mt-1">גופן Arial קריא יותר</p>
                        </div>
                        <button
                          id="readable-font"
                          role="switch"
                          aria-checked={settings.fontFamily === 'readable'}
                          onClick={handleFontFamilyToggle}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                            settings.fontFamily === 'readable' ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                          type="button"
                        >
                          <span className="sr-only">
                            {settings.fontFamily === 'readable' ? 'גופן קריא פעיל' : 'גופן קריא כבוי'}
                          </span>
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.fontFamily === 'readable' ? 'translate-x-6' : 'translate-x-1'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* Reduce Animations */}
                      <div className="flex items-center justify-between" role="group" aria-labelledby="reduce-animations-label">
                        <div>
                          <label id="reduce-animations-label" htmlFor="reduce-animations" className="text-sm font-medium text-gray-900">
                            הפחת אנימציות
                          </label>
                          <p className="text-xs text-gray-600 mt-1">השבת אנימציות מסחררות</p>
                        </div>
                        <button
                          id="reduce-animations"
                          role="switch"
                          aria-checked={settings.reduceAnimations}
                          onClick={() => handleBooleanToggle('reduceAnimations', 'הפחתת אנימציות הופעלה', 'הפחתת אנימציות כובתה')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
                            settings.reduceAnimations ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                          type="button"
                        >
                          <span className="sr-only">
                            {settings.reduceAnimations ? 'הפחתת אנימציות פעילה' : 'הפחתת אנימציות כבויה'}
                          </span>
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.reduceAnimations ? 'translate-x-6' : 'translate-x-1'
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Reset button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    ref={firstFocusableRef}
                    onClick={handleResetSettings}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
                    aria-describedby="reset-help"
                    type="button"
                  >
                    איפוס לברירת מחדל
                  </button>
                  <p id="reset-help" className="sr-only">
                    מחזיר את כל ההגדרות למצב הראשוני
                  </p>
                </div>

                {/* Help section */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg" role="region" aria-labelledby="help-title">
                  <h3 id="help-title" className="font-semibold text-blue-900 mb-2 text-sm">
                    קיצורי מקלדת
                  </h3>
                  <div className="text-blue-800 text-xs leading-relaxed">
                    <p className="mb-2">
                      <kbd className="px-2 py-1 bg-blue-200 rounded text-xs mr-2">Alt+A</kbd>
                      פתיחת תפריט נגישות
                    </p>
                    <p>
                      <kbd className="px-2 py-1 bg-blue-200 rounded text-xs mr-2">Escape</kbd>
                      סגירת תפריט
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
