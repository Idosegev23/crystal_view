'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { services } from '@/lib/services';
import { WindowIcon, FacadeIcon, RailingIcon, ShowerIcon, PergolaIcon } from '@/lib/icons';

export default function Services() {
  const scrollToContact = () => {
    const section = document.getElementById('contact');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-32 relative" role="region" aria-labelledby="services-heading">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-blue-900/60 to-black/90 backdrop-blur-sm"></div>
      
      <div className="section-padding relative z-10">
        <div className="container-max">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-0"
          >
            <div className="glass-card-dark p-8 lg:p-12 mb-8">
              <motion.h2
                id="services-heading"
                variants={fadeInUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
              >
                ההתמחויות שלנו
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
              >
                מהחזיתות הגדולות ביותר ועד הפרטים הקטנים –
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                אנחנו מספקים פתרונות בהתאמה אישית לכל פרויקט.
              </motion.p>
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4 sm:px-6 lg:px-0"
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
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group relative cursor-pointer"
                >
                  <div className="glass-card-dark overflow-hidden h-full">
                    {/* Background Image */}
                    <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-2xl">
                      <Image
                        src={service.image}
                        alt={`${service.title} - שירותי זכוכית ואלומיניום מקצועיים של Crystal View`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        aria-describedby={`service-desc-${service.id}`}
                        loading="lazy"
                      />
                      
                      <p id={`service-desc-${service.id}`} className="sr-only">
                        שירות {service.title}: {service.description}
                        כולל: {service.features.slice(0, 3).join(', ')}
                      </p>
                      
                      {/* Glass Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      
                      {/* Service Icon - Glass Morphism */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 glass-card w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-blue-600">
                        <IconComponent />
                      </div>
                    </div>

                    {/* Content - Glass Panel */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-blue-200 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List - Enhanced Glass */}
                      <div className="space-y-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-xs text-blue-300">
                            <div className="w-2 h-2 bg-blue-400 rounded-full ml-2 shadow-sm"></div>
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* CTA Button - Glass Morphism */}
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToContact}
                        className="mt-3 sm:mt-4 glass-button text-gray-800 px-4 sm:px-6 py-2 sm:py-3 font-bold text-xs sm:text-sm w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label={`קבל הצעת מחיר לשירות ${service.title}`}
                        aria-describedby={`service-cta-${service.id}`}
                      >
                        קבל הצעת מחיר
                        <span id={`service-cta-${service.id}`} className="sr-only">
                          לחץ כדי לעבור לטופס יצירת קשר ולקבל הצעת מחיר לשירות {service.title}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Detailed Service Features */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="glass-card-dark p-8 lg:p-12 mt-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                למה לבחור ב-Crystal View?
              </h3>
              <p className="text-xl text-blue-200">
                אנחנו מספקים פתרונות מקיפים מהרעיון ועד למוצר המוגמר
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: "🎯",
                  title: "דיוק מקסימלי",
                  description: "מדידות מדויקות ועבודה לפי סטנדרטים הגבוהים ביותר"
                },
                {
                  icon: "⚡",
                  title: "ביצוע מהיר",
                  description: "לוחות זמנים קצרים וקיום מועדים ללא פשרות"
                },
                {
                  icon: "🛡️",
                  title: "איכות מובטחת",
                  description: "אחריות מלאה על כל העבודות והחומרים"
                },
                {
                  icon: "🏆",
                  title: "שירות יוקרתי",
                  description: "ליווי צמוד ושירות אישי לאורך כל הפרויקט"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center"
                >
                  <div className="glass-card p-6 h-full">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h4 className="text-xl font-bold text-gray-800 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="glass-button text-gray-800 px-12 py-4 font-bold text-lg hover:shadow-2xl transition-all duration-300"
              >
                בואו נתחיל לעבוד יחד
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}