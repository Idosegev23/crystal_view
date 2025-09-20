'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations';
import { PhoneIcon, EmailIcon, LocationIcon, TimeIcon } from '@/lib/icons';

export default function ContactPage() {
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
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-20">
        <div className="section-padding">
          <div className="container-max">
            <motion.div
              initial="initial"
              animate="animate"
              className="text-center mb-12 sm:mb-16 px-4 sm:px-0"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight"
              >
                בואו נתחיל את הפרויקט שלכם
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-crystal-silver max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
              >
                נשמח לשמוע על החזון שלכם ולהראות איך אפשר להפוך אותו למציאות.
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                השאירו פרטים ונחזור אליכם בהקדם, או דברו איתנו ישירות ב-WhatsApp.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 lg:py-20">
        <div className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 px-4 sm:px-0">
              
              {/* Contact Form */}
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInLeft}
                className="bg-gradient-to-br from-crystal-dark to-gray-900 p-6 sm:p-8 lg:p-12 rounded-2xl glass-effect"
              >
                <h3 className="text-3xl font-bold text-gray-800 mb-8">
                  שלחו לנו הודעה
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-crystal-silver font-medium mb-2">
                        שם מלא *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-crystal-dark/50 border border-crystal-silver/30 rounded-lg text-crystal-white placeholder-crystal-silver/60 focus:border-crystal-blue focus:outline-none transition-colors"
                        placeholder="הכניסו את שמכם המלא"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-crystal-silver font-medium mb-2">
                        טלפון *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-crystal-dark/50 border border-crystal-silver/30 rounded-lg text-crystal-white placeholder-crystal-silver/60 focus:border-crystal-blue focus:outline-none transition-colors"
                        placeholder="050-123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-crystal-silver font-medium mb-2">
                      אימייל *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-crystal-dark/50 border border-crystal-silver/30 rounded-lg text-crystal-white placeholder-crystal-silver/60 focus:border-crystal-blue focus:outline-none transition-colors"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-crystal-silver font-medium mb-2">
                      הודעה
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-crystal-dark/50 border border-crystal-silver/30 rounded-lg text-crystal-white placeholder-crystal-silver/60 focus:border-crystal-blue focus:outline-none transition-colors resize-none"
                      placeholder="ספרו לנו על הפרויקט שלכם..."
                    />
                  </div>

                  {/* Form Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark px-6 py-3 rounded-lg font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={handleWhatsAppClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2"
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
                animate="animate"
                variants={fadeInRight}
                className="space-y-8"
              >
                <div className="bg-gradient-to-br from-crystal-dark to-gray-900 p-8 rounded-2xl glass-effect">
                  <h3 className="text-3xl font-bold text-gray-800 mb-8">
                    פרטי קשר
                  </h3>

                  <div className="space-y-6">
                    {/* Phone */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-crystal-dark/50 rounded-lg cursor-pointer"
                      onClick={handleCallClick}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-crystal-blue to-crystal-silver rounded-full flex items-center justify-center text-crystal-dark">
                        <PhoneIcon />
                      </div>
                      <div>
                        <h4 className="text-crystal-silver font-bold">טלפון</h4>
                        <p className="text-crystal-silver">050-123-4567</p>
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-crystal-dark/50 rounded-lg cursor-pointer"
                      onClick={() => window.open('mailto:info@crystalview.co.il')}
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-crystal-blue to-crystal-silver rounded-full flex items-center justify-center text-crystal-dark">
                        <EmailIcon />
                      </div>
                      <div>
                        <h4 className="text-crystal-silver font-bold">אימייל</h4>
                        <p className="text-crystal-silver">info@crystalview.co.il</p>
                      </div>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-crystal-dark/50 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-crystal-blue to-crystal-silver rounded-full flex items-center justify-center text-crystal-dark">
                        <LocationIcon />
                      </div>
                      <div>
                        <h4 className="text-crystal-silver font-bold">כתובת</h4>
                        <p className="text-crystal-silver">רחוב הזכוכית 123, תל אביב</p>
                      </div>
                    </motion.div>

                    {/* Working Hours */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 bg-crystal-dark/50 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-crystal-blue to-crystal-silver rounded-full flex items-center justify-center text-crystal-dark">
                        <TimeIcon />
                      </div>
                      <div>
                        <h4 className="text-crystal-silver font-bold">שעות פעילות</h4>
                        <p className="text-crystal-silver">ראשון-חמישי: 8:00-17:00</p>
                        <p className="text-crystal-silver">ששי: 8:00-14:00</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-gradient-to-br from-crystal-dark to-gray-900 p-8 rounded-2xl glass-effect">
                  <h3 className="text-xl font-bold text-crystal-silver mb-4">
                    המיקום שלנו
                  </h3>
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.344927853457!2d34.7817676!3d32.0852999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4ca6193b7c1f%3A0x6b5a7cf9a3a7b8c1!2sTel%20Aviv-Yafo%2C%20Israel!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}