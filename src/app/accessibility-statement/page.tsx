import type { Metadata } from 'next';

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
  return (
    <>

      <div className="min-h-screen" id="main-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                הצהרת נגישות
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed">
                Crystal View מחויבת לספק חוויית גלישה נגישה וידידותית לכל המשתמשים
              </p>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">

              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                  מחויבות לנגישות
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Crystal View מחויבת להנגשת שירותיה לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות.
                  אנו עושים מאמץ מתמיד להקפיד על הנגשה מירבית של האתר בהתאם לתקן הישראלי ת&quot;י 5568 (חלק 1)
                  בדרגת הנגישות AA ולהנחיות הנגישות הבינלאומיות WCAG 2.1 ברמת AA.
                </p>
              </section>

              {/* Compliance Standards */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                  תקנים ודרישות נגישות
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm ml-3">
                        🇮🇱
                      </span>
                      תקן ישראלי ת&quot;י 5568
                    </h3>
                    <p className="text-gray-700">
                      התאמה מלאה לתקן הישראלי לנגישות תוכן אתרי אינטרנט בדרגת AA
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                      <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm ml-3">
                        🌍
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
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                  תכונות נגישות באתר
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">התאמות טקסט</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 ml-2">•</span>
                        הגדלת/הקטנת גודל טקסט (75%-175%)
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 ml-2">•</span>
                        החלפה לגופן קריא (Arial/Open Sans)
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 ml-2">•</span>
                        שיפור מרווחי שורות לקריאות טובה יותר
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">ניגודיות וצבעים</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-600 ml-2">•</span>
                        מצב ניגודיות גבוהה (שחור-לבן)
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 ml-2">•</span>
                        מצב ניגודיות הפוכה (לבן-שחור)
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 ml-2">•</span>
                        מצב גווני אפור
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 ml-2">•</span>
                        הדגשה מיוחדת של קישורים וכותרות
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">ניווט ובקרה</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 ml-2">•</span>
                        ניווט מלא באמצעות מקלדת
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 ml-2">•</span>
                        סימון פוקוס מוגבר לאלמנטים פעילים
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 ml-2">•</span>
                        קישורי דילוג לתוכן הראשי
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 ml-2">•</span>
                        בקרת אנימציות והפעלה אוטומטית
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 text-lg">תמיכה טכנולוגית</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-red-600 ml-2">•</span>
                        תמיכה מלאה בקוראי מסך
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 ml-2">•</span>
                        תגיות ARIA מתקדמות
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 ml-2">•</span>
                        הודעות דינמיות לקוראי מסך
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 ml-2">•</span>
                        שמירת העדפות המשתמש
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Keyboard Shortcuts */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
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
                      <span className="text-gray-700">דלג לתוכן הראשי</span>
                      <kbd className="px-3 py-1 bg-gray-200 rounded font-mono text-sm">Skip Link</kbd>
                    </div>
                  </div>
                </div>
              </section>

              {/* Limitations */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                  מגבלות ידועות
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">
                    למרות המאמץ המתמיד להנגשת האתר, ייתכנו מקרים בהם חלקים מסוימים באתר עדיין אינם נגישים במלואם.
                    אנו עובדים ללא הרף על שיפור הנגישות ומטפלים בכל בעיה המדווחת לנו במהירות האפשרית.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                  פנייה לבעיות נגישות
                </h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    אם נתקלת בבעיה בנגישות האתר או שיש לך הצעות לשיפור, נשמח לשמוע ממך:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-semibold text-gray-900 mb-2">טלפון</h3>
                      <a
                        href="tel:053-3366101"
                        className="text-blue-600 hover:text-blue-800 font-medium text-lg no-underline"
                        aria-label="התקשר למספר 053-3366101"
                      >
                        053-3366101
                      </a>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <h3 className="font-semibold text-gray-900 mb-2">אימייל</h3>
                      <a
                        href="mailto:accessibility@crystalview.co.il"
                        className="text-blue-600 hover:text-blue-800 font-medium no-underline"
                        aria-label="שלח אימייל לכתובת accessibility@crystalview.co.il"
                      >
                        accessibility@crystalview.co.il
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-white rounded-lg border">
                    <p className="text-gray-600 text-sm">
                      <strong>זמן תגובה:</strong> אנו מתחייבים לטפל בכל פנייה תוך 48 שעות ולספק פתרון תוך 7 ימי עבודה.
                    </p>
                  </div>
                </div>
              </section>

              {/* Continuous Improvement */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                  שיפור מתמיד
                </h2>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Crystal View רואה בנגישות ערך מרכזי ומתחייבת לשיפור מתמיד:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 ml-2">✓</span>
                      ביקורות נגישות רבעוניות עם מומחי נגישות
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 ml-2">✓</span>
                      בדיקות אוטומטיות ויזואליות של נגישות
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 ml-2">✓</span>
                      שיתוף פעולה עם ארגונים לקידום נגישות
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 ml-2">✓</span>
                      הדרכות צוות פיתוח בנושאי נגישות
                    </li>
                  </ul>
                </div>
              </section>

              {/* Footer Info */}
              <section className="border-t-2 border-gray-200 pt-6">
                <div className="text-center text-gray-600 text-sm">
                  <p>הצהרת נגישות זו עודכנה לאחרונה ב-{new Date().toLocaleDateString('he-IL')}</p>
                  <p className="mt-2">
                    האתר נבדק ואושר לעמידה בתקן הנגישות על ידי מומחי נגישות מוסמכים
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}