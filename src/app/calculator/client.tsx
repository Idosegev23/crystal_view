'use client';

import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import WhatsApp from '@/components/shared/WhatsApp';
import Calculator from '@/components/Calculator';

export default function CalculatorClient() {
  return (
    <main className="min-h-screen bg-crystal-dark">
      <Header />

      <section className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <div className="section-padding">
          <div className="container-max">
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-crystal-white mb-8">
              מחשבון עלות משוערת
            </h1>
            <p className="text-center text-crystal-silver max-w-2xl mx-auto mb-12 sm:mb-16">
              הכנס את המידות וסוג העבודה שתרצה לקבל לגביה הערכת מחיר ראשונית. 
              <br className="hidden sm:block" />
              המחיר הסופי יינתן לאחר בדיקה מקצועית.
            </p>

            <Calculator />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsApp />
    </main>
  );
}
