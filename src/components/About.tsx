'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="glass-section bg-glass-white" role="region" aria-labelledby="about-heading">
      <div className="container-max">
        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden shadow-glass-lg" style={{ borderRadius: '0 24px 24px 24px' }}>
              <Image
                src="/projects/atmosphere/1.webp"
                alt="עבודה מקצועית של Crystal View - פרויקט אלומיניום וזכוכית"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle blue overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-glass-blue/10 to-transparent" />
            </div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 right-6 glass-card p-6 border-t-2 border-glass-blue"
              style={{ borderRadius: '16px 0 16px 16px' }}
            >
              <div className="text-3xl font-bold text-glass-blue mb-1">20+</div>
              <div className="text-xs text-glass-steel font-medium">שנות ניסיון</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-6 left-6 glass-card p-6 border-b-2 border-glass-accent"
              style={{ borderRadius: '16px 16px 16px 0' }}
            >
              <div className="text-3xl font-bold text-glass-blue mb-1">500+</div>
              <div className="text-xs text-glass-steel font-medium">פרויקטים</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="glass-subheading mb-4">אודות החברה</p>
            
            <h2 id="about-heading" className="glass-heading-md mb-6">
              מעל <span className="text-glass-blue">20 שנה</span> של מומחיות באלומיניום וזכוכית
            </h2>

            <div className="space-y-4 glass-body">
              <p>
                ב-Crystal View אנו מתמחים בייצור, התקנה ותיקון של כל סוגי מוצרי האלומיניום. פרגולות, ויטרינות, סגירות מרפסת ועוד — כל חומר עובר תחת הידיים שלנו בבית המלאכה.
              </p>

              <p>
                הניסיון הרב מאפשר לנו להעניק ללקוחות פתרון כולל — משלב התכנון והייצור ועד להתקנה מדויקת וגימור ברמה הגבוהה ביותר.
              </p>
            </div>

            {/* Subtle accent line */}
            <div className="w-20 h-1 bg-gradient-to-r from-glass-blue to-glass-accent mt-8 rounded-full" />
          </motion.div>
        </div>

        {/* Expertise Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10"
          style={{ borderRadius: '24px 0 24px 24px' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "פרויקטי וילות", desc: "פתרונות מקצה לקצה משלב התכנון ועד ההתקנה" },
              { title: "סגירות מרפסת", desc: "התאמה אישית לכל סוג מרפסת וחלל" },
              { title: "פרגולות", desc: "תכנון והתקנה של פרגולות איכותיות" },
              { title: "ייצור עצמי", desc: "הכל תחת קורת גג אחת לשליטה מלאה באיכות" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`glass-panel ${getBentoClass(index)} p-6 border-t-2 border-transparent hover:border-glass-blue/30 transition-colors duration-300`}
              >
                <h3 className="text-lg font-bold text-glass-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="glass-body text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

const getBentoClass = (index: number) => {
  const classes = ['bento-1', 'bento-2', 'bento-3', 'bento-4'];
  return classes[index % classes.length];
};
