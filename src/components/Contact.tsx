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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
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
    <section id="contact" className="py-20 lg:py-32 relative">
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

          <div className="grid lg:grid-cols-2 gap-16">
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

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-blue-200 font-medium mb-2">
                      שם מלא *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass-card border-white/20 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-colors"
                      placeholder="הכניסו את שמכם המלא"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-blue-200 font-medium mb-2">
                      טלפון *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 glass-card border-white/20 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-colors"
                      placeholder="050-123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-blue-200 font-medium mb-2">
                    אימייל *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-card border-white/20 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-blue-200 font-medium mb-2">
                    הודעה
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 glass-card border-white/20 text-gray-800 placeholder-gray-500 focus:border-blue-400 focus:outline-none transition-colors resize-none"
                    placeholder="ספרו לנו על הפרויקט שלכם..."
                  />
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 glass-button text-gray-800 px-6 py-3 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleWhatsAppClick}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-green-500/80 hover:bg-green-600/90 backdrop-blur-sm border border-green-400/30 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>דברו איתנו עכשיו</span>
                  </motion.button>
                </div>

                {/* Submit Status */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-center font-medium"
                  >
                    ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.
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

                <div className="space-y-6">
                  {/* Phone */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-4 cursor-pointer"
                    onClick={handleCallClick}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 glass-card-dark rounded-full flex items-center justify-center text-blue-400">
                        <PhoneIcon />
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-bold">טלפון</h4>
                        <p className="text-gray-600">050-123-4567</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-4 cursor-pointer"
                    onClick={() => window.open('mailto:info@crystalview.co.il')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 glass-card-dark rounded-full flex items-center justify-center text-blue-400">
                        <EmailIcon />
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-bold">אימייל</h4>
                        <p className="text-gray-600">info@crystalview.co.il</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Address */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 glass-card-dark rounded-full flex items-center justify-center text-blue-400">
                        <LocationIcon />
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-bold">כתובת</h4>
                        <p className="text-gray-600">רחוב הזכוכית 123, תל אביב</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Working Hours */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 glass-card-dark rounded-full flex items-center justify-center text-blue-400">
                        <TimeIcon />
                      </div>
                      <div>
                        <h4 className="text-gray-800 font-bold">שעות פעילות</h4>
                        <p className="text-gray-600">ראשון-חמישי: 8:00-17:00</p>
                        <p className="text-gray-600">ששי: 8:00-14:00</p>
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
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}