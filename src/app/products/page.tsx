'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import WhatsApp from '@/components/shared/WhatsApp';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { services } from '@/lib/services';
import { WindowIcon, FacadeIcon, RailingIcon, ShowerIcon, PergolaIcon } from '@/lib/icons';

export default function ProductsPage() {
  const scrollToContact = () => {
    window.location.href = '/contact';
  };

  return (
    <main className="min-h-screen bg-crystal-dark">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20">
        <div className="section-padding">
          <div className="container-max">
            <motion.div
              initial="initial"
              animate="animate"
              className="text-center mb-16"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl lg:text-6xl font-bold text-crystal-white mb-6"
              >
                ההתמחויות שלנו
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-xl text-crystal-silver max-w-4xl mx-auto leading-relaxed"
              >
                מהחזיתות הגדולות ביותר ועד הפרטים הקטנים –
                <br />
                אנחנו מספקים פתרונות בהתאמה אישית לכל פרויקט.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 lg:py-20">
        <div className="section-padding">
          <div className="container-max">
            
            {/* Services Grid */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            >
              {services.map((service, index) => {
                const IconComponent = service.icon === 'window' ? WindowIcon : 
                                     service.icon === 'facade' ? FacadeIcon : 
                                     service.icon === 'railing' ? RailingIcon : 
                                     service.icon === 'shower' ? ShowerIcon : 
                                     PergolaIcon;
                
                return (
                  <motion.div
                    key={service.id}
                    variants={staggerItem}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-2xl shadow-2xl bg-crystal-dark cursor-pointer"
                  >
                    {/* Background Image */}
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-crystal-dark via-crystal-dark/70 to-crystal-dark/20"></div>
                      
                      {/* Service Icon */}
                      <div className="absolute top-6 right-6 w-12 h-12 bg-crystal-blue/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-crystal-dark">
                        <IconComponent />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-crystal-white mb-4">
                        {service.title}
                      </h3>
                      <p className="text-crystal-silver mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-3 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-crystal-silver">
                            <div className="w-2 h-2 bg-crystal-blue rounded-full ml-3"></div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToContact}
                        className="w-full bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                      >
                        קבל הצעת מחיר
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Process Section */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="bg-gradient-to-r from-crystal-dark to-gray-900 rounded-2xl p-8 lg:p-12 glass-effect mb-20"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl lg:text-4xl font-bold text-crystal-white mb-4">
                  איך אנחנו עובדים
                </h3>
                <p className="text-xl text-crystal-silver">
                  תהליך עבודה מקצועי ושקוף מהרעיון ועד למוצר המוגמר
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: "ייעוץ ותכנון",
                    description: "פגישה ראשונית להבנת הצרכים ותכנון מותאם אישית"
                  },
                  {
                    step: "02", 
                    title: "עיצוב ומדידות",
                    description: "יצירת עיצוב מדויק ומדידות פרטניות באתר"
                  },
                  {
                    step: "03",
                    title: "ייצור איכותי",
                    description: "ייצור בטכנולוגיות מתקדמות עם בקרת איכות מחמירה"
                  },
                  {
                    step: "04",
                    title: "התקנה מקצועית",
                    description: "התקנה מדויקת ע״י צוות מיומן עם אחריות מלאה"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 bg-crystal-dark/50 rounded-xl glass-effect"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-crystal-blue to-crystal-silver rounded-full flex items-center justify-center text-crystal-dark font-bold text-xl mb-4 mx-auto">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-bold text-crystal-white mb-3">
                      {item.title}
                    </h4>
                    <p className="text-crystal-silver text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quality Features */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              className="text-center"
            >
              <h3 className="text-3xl lg:text-4xl font-bold text-crystal-white mb-12">
                למה לבחור ב-Crystal View?
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "חומרים איכותיים",
                    description: "שימוש באלומיניום וזכוכית ברמה הגבוהה ביותר"
                  },
                  {
                    title: "טכנולוגיה מתקדמת",
                    description: "ציוד ייצור חדיש ותהליכי עבודה מחשבים"
                  },
                  {
                    title: "צוות מקצועי",
                    description: "בעלי מלאכה מיומנים עם שנות ניסיון רבות"
                  },
                  {
                    title: "עמידה בלוחות זמנים",
                    description: "התחייבות לסיום פרויקטים במועד שנקבע"
                  },
                  {
                    title: "אחריות מלאה",
                    description: "אחריות כוללת על כל העבודות והחומרים"
                  },
                  {
                    title: "שירות אישי",
                    description: "ליווי צמוד ושירות מותאם לכל לקוח"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gradient-to-br from-crystal-dark to-gray-900 rounded-xl glass-effect"
                  >
                    <h4 className="text-xl font-bold text-crystal-white mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-crystal-silver leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Final CTA */}
              <div className="mt-16">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark px-12 py-4 rounded-lg font-bold text-xl hover:shadow-2xl transition-all duration-300"
                >
                  בואו נתחיל לעבוד יחד
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsApp />
    </main>
  );
}