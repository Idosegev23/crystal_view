'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/shared/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/shared/Footer';
import WhatsApp from '@/components/shared/WhatsApp';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { services } from '@/lib/services';
import { projects } from '@/lib/projects';
import { WindowIcon, FacadeIcon, RailingIcon, ShowerIcon, PergolaIcon } from '@/lib/icons';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Process Steps */}
      <section className="py-20 lg:py-32">
        <div className="section-padding">
          <div className="container-max">
            
            {/* Section Header */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16 lg:mb-20"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-crystal-text mb-6 leading-tight"
              >
                תהליך עבודה מקצועי לזכוכית ואלומיניום
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-crystal-text-light max-w-2xl lg:max-w-3xl mx-auto leading-relaxed"
              >
                התקנת חלונות אלומיניום, דלתות זכוכית ופרגולות מודרניות בתהליך פשוט ושקוף
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                מייעוץ ותכנון ועד התקנה מקצועית עם אחריות מלאה
              </motion.p>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-20"
            >
              {[
                {
                  step: "01",
                  title: "ייעוץ והתכנון מקצועי",
                  description: "פגישה ראשונה לבירור צרכים, מדידות מדויקות לחלונות ודלתות והצעת מחיר שקופה לפרויקט הזכוכית והאלומיניום שלכם",
                  icon: (
                    <svg className="w-8 h-8 text-crystal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                },
                {
                  step: "02", 
                  title: "ייצור וחיתוך אלומיניום איכותי",
                  description: "עיבוד פרופילי אלומיניום וזכוכית בטיחותית במפעל שלנו עם ציוד CNC מתקדם ובקרת איכות קפדנית לכל חלון ודלת",
                  icon: (
                    <svg className="w-8 h-8 text-crystal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
                {
                  step: "03",
                  title: "התקנה מקצועית ומסירה",
                  description: "התקנת חלונות אלומיניום ודלתות זכוכית ע״י צוות מקצועי מיומן, בדיקות סופיות ומסירה עם אחריות מלאה ושירות לאחר מכירה",
                  icon: (
                    <svg className="w-8 h-8 text-crystal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              ].map((process, index) => (
                    <motion.div
                  key={index}
                      variants={staggerItem}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  {/* Step Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-crystal-blue to-crystal-silver rounded-full flex items-center justify-center text-crystal-dark font-bold text-lg z-10"
                  >
                    {process.step}
                  </motion.div>

                  {/* Card */}
                  <div className="liquidGlass-wrapper h-full">
                    <div className="liquidGlass-effect"></div>
                    <div className="liquidGlass-tint"></div>
                    <div className="liquidGlass-shine"></div>
                    <div className="liquidGlass-content p-8">
                    <div className="mb-6 p-4 bg-crystal-blue/10 rounded-xl w-fit">
                      {process.icon}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-crystal-text mb-4 group-hover:text-crystal-accent transition-colors duration-300">
                        {process.title}
                        </h3>
                      
                      <p className="text-crystal-text-light text-sm sm:text-base leading-relaxed">
                        {process.description}
                        </p>
                      </div>
                  </div>

                  {/* Connecting Line */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -left-6 w-12 h-0.5 bg-gradient-to-r from-crystal-blue to-crystal-silver opacity-60 transform -translate-y-1/2 z-0"></div>
                  )}
                </motion.div>
              ))}
                    </motion.div>

            {/* CTA Section */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <div className="liquidGlass-wrapper">
                <div className="liquidGlass-effect"></div>
                <div className="liquidGlass-tint"></div>
                <div className="liquidGlass-shine"></div>
                <div className="liquidGlass-content p-8 lg:p-12">
                  <h3 className="text-2xl lg:text-3xl font-bold text-crystal-text mb-4">
                    מוכנים להתחיל?
                  </h3>
                  <p className="text-crystal-text-light mb-8 max-w-2xl mx-auto">
                    השאירו פרטים ונחזור אליכם עם הצעת מחיר מותאמת אישית
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/calculator">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="glass-button text-crystal-text px-8 py-3 font-bold"
                      >
                        חשבו מחיר עכשיו
                      </motion.button>
                    </Link>
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="glass-button text-crystal-text px-8 py-3 font-bold"
                      >
                        יצירת קשר
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Featured Projects Preview */}
            <motion.div
              initial="initial"
              whileInView="animate" 
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-16"
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl lg:text-5xl font-bold text-crystal-white mb-6"
              >
                פרויקטים נבחרים
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-xl text-crystal-silver max-w-3xl mx-auto leading-relaxed"
              >
                כל פרויקט הוא הזדמנות להראות מהי שלמות
              </motion.p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={staggerItem}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-64 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-crystal-dark/80 to-transparent">
                      <div className="absolute bottom-4 right-4 left-4">
                        <h4 className="text-crystal-white font-bold text-lg mb-1">
                          {project.title}
                        </h4>
                        <p className="text-crystal-blue text-sm">
                          {project.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center">
              <Link href="/gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                >
                  צפו בכל הפרויקטים
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsApp />
    </main>
  );
}