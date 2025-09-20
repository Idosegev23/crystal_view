'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import { PhoneIcon, EmailIcon, LocationIcon, TimeIcon } from '@/lib/icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      errors.name = 'שם מלא הוא שדה חובה';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'מספר טלפון הוא שדה חובה';
    } else if (!/^[0-9\-\s\+\(\)]+$/.test(formData.phone)) {
      errors.phone = 'מספר טלפון לא תקין';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'כתובת אימייל היא שדה חובה';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'כתובת אימייל לא תקינה';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setFormErrors({});
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '972501234567';
    const message = `שלום, אני ${formData.name || '[שם]'} ואני מעוניין לשמוע עוד על שירותי Crystal View. ${formData.message || 'אשמח לקבל פרטים נוספים.'}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCallClick = () => {
    window.open('tel:+972501234567', '_self');
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative" role="region" aria-labelledby="contact-heading">
      {/* Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-gray-900/70 to-black/80 backdrop-blur-sm"></div>
      
      <div className="section-padding relative z-10">
        <div className="container-max">
          {/* Section Header */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-20"
          >
            <div className="glass-card-dark p-8 lg:p-12">
              <motion.h2
                id="contact-heading"
                variants={fadeInUp}
                className="text-4xl lg:text-6xl font-bold text-white mb-6"
              >
                בואו נתחיל את הפרויקט שלכם
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed"
              >
                נשמח לשמוע על החזון שלכם ולהראות איך אפשר להפוך אותו למציאות.
                <br />
                השאירו פרטים ונחזור אליכם בהקדם, או דברו איתנו ישירות ב-WhatsApp.
              </motion.p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
            {/* Contact Form */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
              className="glass-card-dark p-8 lg:p-12"
            >
              <h3 className="text-3xl font-bold text-white mb-8">
                שלחו לנו הודעה
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <fieldset>
                  <legend className="sr-only">פרטי קשר</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" id="name-label" className="block text-blue-200 font-medium mb-2">
                        שם מלא *<span className="sr-only">(שדה חובה)</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        aria-required="true"
                        aria-labelledby="name-label"
                        aria-describedby={formErrors.name ? "name-error" : undefined}
                        aria-invalid={!!formErrors.name}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass-card border-white/20 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="הכניסו את שמכם המלא"
                      />
                      {formErrors.name && (
                        <div id="name-error" role="alert" aria-live="polite" className="text-red-400 text-sm mt-1">
                          {formErrors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" id="phone-label" className="block text-blue-200 font-medium mb-2">
                        טלפון *<span className="sr-only">(שדה חובה)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        aria-required="true"
                        aria-labelledby="phone-label"
                        aria-describedby={formErrors.phone ? "phone-error" : "phone-help"}
                        aria-invalid={!!formErrors.phone}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass-card border-white/20 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="050-123-4567"
                      />
                      <div id="phone-help" className="sr-only">
                        הכניסו מספר טלפון ישראלי בפורמט 050-123-4567
                      </div>
                      {formErrors.phone && (
                        <div id="phone-error" role="alert" aria-live="polite" className="text-red-400 text-sm mt-1">
                          {formErrors.phone}
                        </div>
                      )}
                    </div>
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="email" id="email-label" className="block text-blue-200 font-medium mb-2">
                    אימייל *<span className="sr-only">(שדה חובה)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    aria-required="true"
                    aria-labelledby="email-label"
                    aria-describedby={formErrors.email ? "email-error" : "email-help"}
                    aria-invalid={!!formErrors.email}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-card border-white/20 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="example@email.com"
                  />
                  <div id="email-help" className="sr-only">
                    הכניסו כתובת אימייל תקינה לקבלת תשובה
                  </div>
                  {formErrors.email && (
                    <div id="email-error" role="alert" aria-live="polite" className="text-red-400 text-sm mt-1">
                      {formErrors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="message" id="message-label" className="block text-blue-200 font-medium mb-2">
                    הודעה<span className="sr-only">(שדה אופציונלי)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    aria-labelledby="message-label"
                    aria-describedby="message-help"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-card border-white/20 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                    placeholder="ספרו לנו על הפרויקט שלכם..."
                  />
                  <div id="message-help" className="sr-only">
                    ספרו לנו על הפרויקט שלכם, סוג העבודה הנדרשת ועוד פרטים רלוונטיים
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 glass-button text-gray-800 px-6 py-3 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-describedby="submit-help"
                    aria-disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span aria-hidden="true">שולח...</span>
                        <span className="sr-only">שולח את ההודעה, אנא המתן</span>
                      </>
                    ) : (
                      'שלח הודעה'
                    )}
                  </motion.button>
                  <div id="submit-help" className="sr-only">
                    לחץ כדי לשלוח את פרטי הקשר שלך ונחזור אליך בהקדם
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleWhatsAppClick}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-green-500/80 hover:bg-green-600/90 backdrop-blur-sm border border-green-400/30 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    aria-label="פתח שיחת WhatsApp עם Crystal View לקבלת ייעוץ מיידי"
                    aria-describedby="whatsapp-help"
                  >
                    <span>דברו איתנו עכשיו</span>
                  </motion.button>
                  <div id="whatsapp-help" className="sr-only">
                    לחץ כדי לפתוח שיחת WhatsApp מיידית עם הצוות המקצועי שלנו
                  </div>
                </div>

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-center font-medium"
                    role="status"
                    aria-live="polite"
                    aria-label="הודעת הצלחה"
                  >
                    ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.
                  </motion.div>
                )}

                {submitStatus === 'error' && Object.keys(formErrors).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-center font-medium"
                    role="alert"
                    aria-live="assertive"
                    aria-label="הודעת שגיאה"
                  >
                    אנא תקן את השגיאות בטופס ונסה שוב
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
              className="space-y-8"
            >
              <div className="glass-card-dark p-8">
                <h3 className="text-3xl font-bold text-white mb-8">
                  פרטי קשר
                </h3>

                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* Phone */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-4 cursor-pointer w-full text-right"
                    onClick={handleCallClick}
                    aria-label="התקשר למספר 050-123-4567"
                    aria-describedby="phone-contact-desc"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 glass-card-dark rounded-full flex items-center justify-center text-blue-400 flex-shrink-0" aria-hidden="true">
                        <PhoneIcon />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800 font-bold text-sm sm:text-base">טלפון</h4>
                        <p className="text-gray-600 text-sm sm:text-base">050-123-4567</p>
                      </div>
                    </div>
                    <span id="phone-contact-desc" className="sr-only">
                      לחץ כדי להתקשר ישירות למספר הטלפון שלנו
                    </span>
                  </motion.button>

                  {/* Email */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-4 cursor-pointer w-full text-right"
                    onClick={() => window.open('mailto:info@crystalview.co.il')}
                    aria-label="שלח אימייל לכתובת info@crystalview.co.il"
                    aria-describedby="email-contact-desc"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 glass-card-dark rounded-full flex items-center justify-center text-blue-400 flex-shrink-0" aria-hidden="true">
                        <EmailIcon />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-800 font-bold text-sm sm:text-base">אימייל</h4>
                        <p className="text-gray-600 text-sm sm:text-base">info@crystalview.co.il</p>
                      </div>
                    </div>
                    <span id="email-contact-desc" className="sr-only">
                      לחץ כדי לפתוח את תוכנת האימייל ולשלוח לנו הודעה
                    </span>
                  </motion.button>

                  {/* Address */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-4"
                    role="group"
                    aria-labelledby="address-heading"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 glass-card-dark rounded-full flex items-center justify-center text-blue-400 flex-shrink-0" aria-hidden="true">
                        <LocationIcon />
                      </div>
                      <div className="flex-1">
                        <h4 id="address-heading" className="text-gray-800 font-bold text-sm sm:text-base">כתובת</h4>
                        <address className="text-gray-600 text-sm sm:text-base not-italic">
                          רחוב הזכוכית 123, תל אביב
                        </address>
                      </div>
                    </div>
                  </motion.div>

                  {/* Working Hours */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-4"
                    role="group"
                    aria-labelledby="hours-heading"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 glass-card-dark rounded-full flex items-center justify-center text-blue-400 flex-shrink-0" aria-hidden="true">
                        <TimeIcon />
                      </div>
                      <div className="flex-1">
                        <h4 id="hours-heading" className="text-gray-800 font-bold text-sm sm:text-base">שעות פעילות</h4>
                        <div aria-label="שעות פעילות של המשרד">
                          <p className="text-gray-600 text-xs sm:text-sm">
                            <time dateTime="Mo-Fr 08:00-17:00">ראשון-חמישי: 8:00-17:00</time>
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm">
                            <time dateTime="Fr 08:00-14:00">ששי: 8:00-14:00</time>
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Map */}
              <div className="glass-card-dark p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  המיקום שלנו
                </h3>
                <div className="glass-card p-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.344927853457!2d34.7817676!3d32.0852999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0x6b5a7cf9a3a7b8c1!2sTel%20Aviv-Yafo%2C%20Israel!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl"
                    title="מפת המיקום של Crystal View - רחוב הזכוכית 123, תל אביב"
                    aria-label="מפה אינטראקטיבית המראה את מיקום המשרד שלנו ברחוב הזכוכית 123, תל אביב"
                  />
                </div>
                <p className="sr-only">
                  המשרד שלנו נמצא ברחוב הזכוכית 123, תל אביב. ניתן לראות את המיקום המדויק במפה לעיל.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}