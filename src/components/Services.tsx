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
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-br from-crystal-dark via-gray-900 to-crystal-dark">
      <div className="section-padding">
        <div className="container-max">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-0"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-crystal-white mb-4 sm:mb-6 leading-tight"
            >
              ההתמחויות שלנו
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-crystal-silver max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            >
              מהחזיתות הגדולות ביותר ועד הפרטים הקטנים –
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              אנחנו מספקים פתרונות בהתאמה אישית לכל פרויקט.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 px-4 sm:px-0"
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
                  <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-crystal-dark via-crystal-dark/70 to-crystal-dark/20"></div>
                    
                    {/* Service Icon */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-crystal-blue/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-crystal-dark">
                      <IconComponent />
                    </div>
                  </div>

                {/* Content */}
                <div className="absolute bottom-0 right-0 left-0 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-crystal-white mb-2 sm:mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-crystal-silver text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs text-crystal-silver">
                        <div className="w-1.5 h-1.5 bg-crystal-blue rounded-full ml-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToContact}
                    className="mt-4 bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark px-4 py-2 rounded-lg font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    קבל הצעת מחיר
                  </motion.button>
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
            className="bg-gradient-to-r from-crystal-dark to-gray-900 rounded-2xl p-8 lg:p-12 glass-effect"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-crystal-white mb-4">
                למה לבחור ב-Crystal View?
              </h3>
              <p className="text-xl text-crystal-silver">
                אנחנו מספקים פתרונות מקיפים מהרעיון ועד למוצר המוגמר
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  whileHover={{ scale: 1.05 }}
                  className="text-center p-6 bg-crystal-dark/50 rounded-xl glass-effect"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-xl font-bold text-crystal-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-crystal-silver text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300"
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