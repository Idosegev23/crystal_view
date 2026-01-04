import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'הצהרת נגישות | Crystal View - זכוכית ואלומיניום יוקרתי',
  description: 'הצהרת נגישות מלאה עבור אתר Crystal View. מחויבות שלנו לנגישות דיגיטלית עבור כל המשתמשים לפי תקן ת"י 5568 ו-WCAG 2.1 AA.',
  keywords: [
    'הצהרת נגישות',
    'נגישות דיגיטלית',
    'תקן ת"י 5568',
    'WCAG 2.1 AA',
    'נגישות אתר',
    'Crystal View נגישות'
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'הצהרת נגישות | Crystal View',
    description: 'מחויבות שלנו לנגישות דיגיטלית עבור כל המשתמשים',
    type: 'website',
    locale: 'he_IL',
  },
};

export default function AccessibilityStatementPage() {
  const lastUpdated = new Date().toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main id="main-content" role="main" className="min-h-screen bg-gradient-to-b from-glass-frost via-glass-white to-glass-ice">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <div className="max-w-4xl mx-auto">
          
          {/* Header Section */}
          <header className="text-center mb-12">
            <p className="glass-subheading mb-4">נגישות</p>
            <h1 className="glass-heading-lg mb-6">
              הצהרת נגישות
            </h1>
            <div className="glass-divider mx-auto mb-6" />
            <p className="glass-body max-w-2xl mx-auto">
              Crystal View מחויבת לספק חוויית גלישה נגישה וידידותית לכל המשתמשים
            </p>
          </header>

          {/* Main Content */}
          <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-10">

            {/* Introduction */}
            <section aria-labelledby="intro-heading">
              <h2 id="intro-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                מחויבות לנגישות
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Crystal View מחויבת להנגשת שירותיה לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות.
                אנו עושים מאמץ מתמיד להקפיד על הנגשה מירבית של האתר בהתאם לתקן הישראלי ת&quot;י 5568 (חלק 1)
                בדרגת הנגישות AA ולהנחיות הנגישות הבינלאומיות WCAG 2.1 ברמת AA, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ&quot;ח-1998.
              </p>
            </section>

            {/* Legal Framework */}
            <section aria-labelledby="legal-heading">
              <h2 id="legal-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                מסגרת חוקית
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  הנגשת האתר בוצעה בהתאם לדרישות החוק והתקנות הבאים:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>חוק שוויון זכויות לאנשים עם מוגבלות</strong>, התשנ&quot;ח-1998</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות)</strong>, התשע&quot;ג-2013</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>תקן ישראלי ת&quot;י 5568</strong> - נגישות תכנים באינטרנט (חלק 1)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span><strong>WCAG 2.1 Level AA</strong> - הנחיות הנגישות הבינלאומיות לתוכן אינטרנט</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Compliance Standards */}
            <section aria-labelledby="standards-heading">
              <h2 id="standards-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                תקנים ודרישות נגישות
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm ml-3" aria-hidden="true">
                      IL
                    </span>
                    תקן ישראלי ת&quot;י 5568
                  </h3>
                  <p className="text-gray-700">
                    התאמה מלאה לתקן הישראלי לנגישות תוכן אתרי אינטרנט בדרגת AA
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                    <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm ml-3" aria-hidden="true">
                      W3
                    </span>
                    WCAG 2.1 Level AA
                  </h3>
                  <p className="text-gray-700">
                    עמידה בהנחיות הבינלאומיות לנגישות תוכן אתרי אינטרנט ברמת AA
                  </p>
                </div>
              </div>
            </section>

            {/* Accessibility Features */}
            <section aria-labelledby="features-heading">
              <h2 id="features-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                תכונות נגישות באתר
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">התאמות טקסט וקריאה</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600" aria-hidden="true">✓</span>
                        הגדלת/הקטנת גודל טקסט (75%-175%)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600" aria-hidden="true">✓</span>
                        החלפה לגופן קריא
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600" aria-hidden="true">✓</span>
                        שיפור מרווחי שורות ואותיות
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600" aria-hidden="true">✓</span>
                        סרגל קריאה לעזרה במעקב
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">ניגודיות וצבעים</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600" aria-hidden="true">✓</span>
                        מצב ניגודיות גבוהה (שחור-לבן)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600" aria-hidden="true">✓</span>
                        מצב ניגודיות הפוכה
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600" aria-hidden="true">✓</span>
                        מצב גווני אפור ומצב ספיה
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600" aria-hidden="true">✓</span>
                        הדגשה מיוחדת של קישורים וכותרות
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">ניווט ובקרה</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600" aria-hidden="true">✓</span>
                        ניווט מלא באמצעות מקלדת
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600" aria-hidden="true">✓</span>
                        סימון פוקוס מוגבר לאלמנטים פעילים
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600" aria-hidden="true">✓</span>
                        קישורי דילוג לתוכן הראשי
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600" aria-hidden="true">✓</span>
                        סמן עכבר מוגדל
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">תמיכה טכנולוגית</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600" aria-hidden="true">✓</span>
                        תמיכה מלאה בקוראי מסך (NVDA, JAWS, VoiceOver)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600" aria-hidden="true">✓</span>
                        תגיות ARIA מתקדמות
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600" aria-hidden="true">✓</span>
                        הודעות דינמיות לקוראי מסך
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600" aria-hidden="true">✓</span>
                        שמירת העדפות המשתמש
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Keyboard Shortcuts */}
            <section aria-labelledby="shortcuts-heading">
              <h2 id="shortcuts-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                קיצורי מקלדת
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-gray-700">פתח תפריט נגישות</span>
                    <kbd className="px-3 py-1 bg-gray-200 rounded font-mono text-sm">Alt + A</kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-gray-700">סגור תפריט/דו-שיח</span>
                    <kbd className="px-3 py-1 bg-gray-200 rounded font-mono text-sm">Escape</kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-gray-700">מעבר בין אלמנטים</span>
                    <kbd className="px-3 py-1 bg-gray-200 rounded font-mono text-sm">Tab</kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-gray-700">חזרה לאלמנט קודם</span>
                    <kbd className="px-3 py-1 bg-gray-200 rounded font-mono text-sm">Shift + Tab</kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-gray-700">הפעלת כפתור/קישור</span>
                    <kbd className="px-3 py-1 bg-gray-200 rounded font-mono text-sm">Enter</kbd>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="text-gray-700">ניווט בתפריט</span>
                    <kbd className="px-3 py-1 bg-gray-200 rounded font-mono text-sm">חצים</kbd>
                  </div>
                </div>
              </div>
            </section>

            {/* Tested Technologies */}
            <section aria-labelledby="tested-heading">
              <h2 id="tested-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                טכנולוגיות נתמכות
              </h2>
              <p className="text-gray-700 mb-4">
                האתר נבדק ותומך בדפדפנים ובטכנולוגיות הבאים:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">דפדפנים</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>Google Chrome (גרסה אחרונה)</li>
                    <li>Mozilla Firefox (גרסה אחרונה)</li>
                    <li>Apple Safari (גרסה אחרונה)</li>
                    <li>Microsoft Edge (גרסה אחרונה)</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">קוראי מסך</h3>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>NVDA (Windows)</li>
                    <li>JAWS (Windows)</li>
                    <li>VoiceOver (macOS/iOS)</li>
                    <li>TalkBack (Android)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Limitations */}
            <section aria-labelledby="limitations-heading">
              <h2 id="limitations-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                מגבלות ידועות
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  למרות המאמץ המתמיד להנגשת האתר, ייתכנו מקרים בהם חלקים מסוימים באתר עדיין אינם נגישים במלואם:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600" aria-hidden="true">•</span>
                    תמונות מסוימות עשויות להיות ללא תיאור מלא
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600" aria-hidden="true">•</span>
                    מפות אינטראקטיביות (Google Maps) עשויות להוות אתגר למשתמשי קוראי מסך
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  אנו עובדים ללא הרף על שיפור הנגישות ומטפלים בכל בעיה המדווחת לנו במהירות האפשרית.
                </p>
              </div>
            </section>

            {/* Accessibility Coordinator */}
            <section aria-labelledby="coordinator-heading">
              <h2 id="coordinator-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                רכז נגישות
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  בהתאם לתקנות, מונה רכז נגישות לטיפול בפניות הציבור בנושאי נגישות:
                </p>
                <div className="bg-white p-5 rounded-lg border border-blue-200">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">שם רכז הנגישות</p>
                      <p className="font-semibold text-gray-900">Crystal View - צוות נגישות</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">טלפון</p>
                      <a 
                        href="tel:053-3366101" 
                        className="font-semibold text-blue-600 hover:text-blue-800"
                      >
                        053-3366101
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">דוא&quot;ל לפניות נגישות</p>
                      <a 
                        href="mailto:crystalview202@gmail.com" 
                        className="font-semibold text-blue-600 hover:text-blue-800"
                      >
                        crystalview202@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">שעות מענה</p>
                      <p className="font-semibold text-gray-900">א&apos;-ה&apos; 8:00-17:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact for Accessibility Issues */}
            <section aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                פנייה לבעיות נגישות
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  אם נתקלת בבעיה בנגישות האתר או שיש לך הצעות לשיפור, נשמח לשמוע ממך.
                  אנו מתחייבים לטפל בכל פנייה באופן מהיר ויעיל.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <a 
                    href="tel:053-3366101"
                    className="flex items-center gap-3 bg-white p-4 rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                  >
                    <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm text-gray-600">טלפון</p>
                      <p className="font-semibold text-gray-900">053-3366101</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:crystalview202@gmail.com"
                    className="flex items-center gap-3 bg-white p-4 rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
                  >
                    <span className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center" aria-hidden="true">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm text-gray-600">דוא&quot;ל</p>
                      <p className="font-semibold text-gray-900">crystalview202@gmail.com</p>
                    </div>
                  </a>
                </div>

                <div className="p-4 bg-white rounded-lg border border-blue-200">
                  <p className="text-gray-700 text-sm">
                    <strong>זמני טיפול:</strong> אנו מתחייבים לאשר קבלת פנייה תוך 2 ימי עסקים, 
                    ולספק מענה מלא תוך 7 ימי עסקים. במקרים דחופים, ניתן להתקשר ישירות.
                  </p>
                </div>
              </div>
            </section>

            {/* Continuous Improvement */}
            <section aria-labelledby="improvement-heading">
              <h2 id="improvement-heading" className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                שיפור מתמיד
              </h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Crystal View רואה בנגישות ערך מרכזי ומתחייבת לשיפור מתמיד:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" aria-hidden="true">✓</span>
                    ביקורות נגישות תקופתיות עם מומחי נגישות
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" aria-hidden="true">✓</span>
                    בדיקות אוטומטיות ויזואליות של נגישות
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" aria-hidden="true">✓</span>
                    הדרכות צוות פיתוח בנושאי נגישות
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600" aria-hidden="true">✓</span>
                    עדכון האתר בהתאם לשינויים בתקנים
                  </li>
                </ul>
              </div>
            </section>

            {/* Footer Info */}
            <footer className="border-t-2 border-gray-200 pt-6 mt-8">
              <div className="text-center text-gray-600 text-sm space-y-2">
                <p>
                  <strong>תאריך עדכון אחרון:</strong> {lastUpdated}
                </p>
                <p>
                  הצהרה זו נכתבה בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות)
                </p>
                <p className="pt-4">
                  <Link 
                    href="/contact" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    צור קשר
                  </Link>
                  <span className="mx-3">|</span>
                  <Link 
                    href="/" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    חזרה לעמוד הבית
                  </Link>
                </p>
              </div>
            </footer>

          </article>
        </div>
      </div>
    </main>
  );
}
