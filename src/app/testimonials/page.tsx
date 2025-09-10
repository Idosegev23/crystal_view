import { Metadata } from 'next';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import WhatsApp from '@/components/shared/WhatsApp';

export const metadata: Metadata = {
  title: 'המלצות לקוחות - Crystal View | עדויות על עבודות אלומיניום איכותיות',
  description: 'קראו המלצות אמיתיות מלקוחות שביצענו עבורם פרויקטי אלומיניום - פרגולות, סגירת מרפסות, רשתות נגד יתושים וסורגים שקופים',
  keywords: [
    'המלצות לקוחות',
    'עדויות Crystal View',
    'ביקורות עבודות אלומיניום',
    'המלצות פרגולות',
    'המלצות סגירת מרפסות',
    'עדויות לקוחות מרוצים',
    'ביקורות רשתות יתושים',
    'המלצות עבודות זכוכית'
  ],
  openGraph: {
    title: 'המלצות לקוחות - Crystal View',
    description: 'עדויות אמיתיות מלקוחות מרוצים על עבודות אלומיניום איכותיות',
    url: 'https://crystalview.co.il/testimonials',
  },
  alternates: {
    canonical: 'https://crystalview.co.il/testimonials',
  },
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white/20 to-blue-100/30 backdrop-blur-sm"></div>
        <div className="section-padding relative z-10">
          <div className="container-max text-center">
            <div className="glass-card p-8 lg:p-12 max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                מה הלקוחות אומרים עלינו
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                קראו עדויות אמיתיות מלקוחות שביצענו עבורם פרויקטי אלומיניום איכותיים -
                <br />
                פרגולות, סגירת מרפסות, רשתות נגד יתושים וסורגים שקופים
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Under Construction */}
      <section className="py-20">
        <div className="section-padding">
          <div className="container-max text-center">
            <div className="glass-card p-12 max-w-2xl mx-auto">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                בקרוב...
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                אנחנו עובדים על איסוף המלצות מלקוחותינו המרוצים.
                <br />
                העמוד יעודכן בקרוב עם עדויות אמיתיות על העבודות שלנו.
              </p>
              <p className="text-base text-gray-600">
                רוצים לחלוק את החוויה שלכם? צרו איתנו קשר!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsApp />
    </div>
  );
}
