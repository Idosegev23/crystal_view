'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BlurText from '@/components/ui/AccessibleBlurText';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">טוען...</div>
      </div>
    );
  }

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-white">
      {/* Skip Link */}
      <Link 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        דלג לתוכן הראשי
      </Link>
      
      <main id="main-content">
      {/* Hero Section */}
        <section 
          aria-labelledby="hero-heading"
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 sm:mb-12"
            >
              <Image
                src="/logowtext.png"
                alt="Crystal View לוגו"
                width={200}
                height={100}
                className="object-contain filter brightness-0 invert mx-auto sm:w-[300px] sm:h-[150px] lg:w-[400px] lg:h-[200px]"
                priority
              />
            </motion.div>
            
            {/* Title */}
            <h1 
              id="hero-heading"
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight text-white"
            >
              <BlurText
                text="קריסטל ויו אלומיניום"
                delay={150}
                animateBy="words"
                direction="top"
                stepDuration={0.5}
              />
            </h1>
            
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-white font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                מעל 20 שנה של מומחיות, איכות ושירות ללא פשרות
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="mt-12"
            >
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto rounded-full"></div>
            </motion.div>
        </div>
      </section>

        {/* Belief Section */}
        <section 
          aria-labelledby="belief-heading"
          className="py-20 lg:py-32 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-[60%_40%] gap-12 lg:gap-20 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  <Image
                    src="/images/04cbc3da-c594-4208-a939-8ad817b047e8.png"
                    alt="פרופיל אלומיניום מוברש בקלוז-אפ מציג איכות גימור גבוהה ודיוק ייצור מתקדם"
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-2xl object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </motion.div>
              
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="space-y-8">
                  <h2 
                    id="belief-heading"
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                  >
                    <BlurText
                      text="אנו מאמינים"
                      delay={200}
                      animateBy="words"
                      direction="top"
                      stepDuration={0.6}
                    />
                    <br />
                    שעבודות אלומיניום הן
                    <br />
                    <BlurText
                      text="הרבה יותר ממוצר"
                      delay={250}
                      animateBy="words"
                      direction="top"
                      stepDuration={0.7}
                    />
                  </h2>
                  
                  <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                    <p>
                      הן חלק בלתי נפרד מהעיצוב, הנוחות והאיכות של כל פרויקט. 
                      כל פרט חשוב, כל מידה צריכה להיות מדויקת, וכל גימור חייב להיות מושלם.
                  </p>
                  
                  <p>
                      <BlurText
                        text="מעל 20 שנה"
                        delay={180}
                        animateBy="words"
                        direction="top"
                        stepDuration={0.5}
                        className="font-semibold"
                      /> אנו מתמחים בייצור, התקנה ותיקון של כל סוגי מוצרי האלומיניום: 
                      פרגולות, ויטרינות, סגירות מרפסת, ועוד.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section 
          aria-labelledby="process-heading"
          className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50"
        >
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center mb-16">
                <h2 
                  id="process-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                >
                  <BlurText
                    text="מגלם לגמור"
                    delay={200}
                    animateBy="words"
                    direction="top"
                    stepDuration={0.8}
                  />
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  כל חומר עובר תחת הידיים שלנו בבית המלאכה – 
                  משלב הגלם ועד התוצאה המושלמת
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: "01",
                  title: "תכנון ועיצוב",
                  description: "פגישה אישית, מדידות מדויקות ותכנון מותאם לצרכים שלכם",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  )
                },
                {
                  step: "02", 
                  title: "ייצור מדויק",
                  description: "עבודה בבית המלאכה שלנו עם ציוד מתקדם וטכנולוגיות חדישות",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
                {
                  step: "03",
                  title: "התקנה מקצועית", 
                  description: "התקנה מדויקת על ידי צוות מנוסה עם גימור ברמה הגבוהה ביותר",
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="relative group">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                      <div className="flex items-center mb-6">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white">
                          {item.icon}
                        </div>
                        <div className="mr-4 text-4xl font-black text-blue-100 group-hover:text-blue-200 transition-colors">
                          {item.step}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section 
          aria-labelledby="values-heading"
          className="py-20 lg:py-32 bg-white"
        >
          <div className="max-w-7xl mx-auto px-6">
              <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center mb-16">
                <h2 
                  id="values-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                >
                  <BlurText
                    text="הערכים שלנו"
                    delay={200}
                    animateBy="words"
                    direction="top"
                    stepDuration={0.9}
                  />
                </h2>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  שלושה עקרונות שמנחים אותנו בכל פרויקט
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                {[
                  {
                    icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ),
                  title: "ניסיון עשיר",
                  subtitle: "מעל 20 שנות מומחיות",
                  description: "ניסיון רב בכל סוגי עבודות האלומיניום, מפרויקטים קטנים ועד מתחמים גדולים"
                  },
                  {
                    icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ),
                    title: "בית מלאכה מקצועי",
                  subtitle: "פיקוח ישיר על כל שלב",
                  description: "כל העבודה מתבצעת בפיקוחנו הישיר עם ציוד מתקדם וטכנולוגיות חדישות"
                  },
                  {
                    icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "איכות ללא פשרות",
                  subtitle: "מושלמות בכל פרט",
                  description: "משלב הגלם ועד התוצאה המושלמת - אנו לא מתפשרים על איכות"
                  }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="group relative">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full hover:-translate-y-2">
                      <div className="text-blue-600 mb-6 group-hover:text-blue-700 transition-colors">
                        {value.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                      
                      <p className="text-blue-600 font-semibold mb-4">
                        {value.subtitle}
                      </p>
                      
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                      
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

              {/* CTA Section */}
        <section 
          aria-labelledby="cta-heading"
          className="py-20 lg:py-32 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 
                id="cta-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight text-center"
              >
                <BlurText
                  text="מעוניינים לשמוע עוד?"
                  delay={200}
                  animateBy="words"
                  direction="top"
                  stepDuration={0.7}
                />
              </h2>
              
              <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                צרו איתנו קשר ונשמח לספר לכם עוד על השירותים שלנו 
                ולתת הצעת מחיר מותאמת אישית
              </p>
              
              <Link href="/contact" aria-label="צרו קשר עם קריסטל ויו אלומיניום">
                <ShimmerButton className="shadow-2xl glass-button-liquid">
                  <span className="text-center text-lg leading-none font-bold tracking-tight whitespace-pre-wrap text-white lg:text-xl flex items-center gap-3">
                    צרו קשר עכשיו
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </span>
                </ShimmerButton>
              </Link>
            </motion.div>
        </div>
      </section>
      </main>
    </div>
  );
}