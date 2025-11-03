'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, EmailIcon, LocationIcon, TimeIcon } from '@/lib/icons';
import { useToast } from '@/contexts/ToastContext';

export default function ContactPage() {
  console.log('🔵 ContactPage loaded');
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'שם הוא שדה חובה';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'טלפון הוא שדה חובה';
    } else if (!/^[0-9\-\s\+\(\)]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'אימייל הוא שדה חובה';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🟢🟢🟢 CONTACT PAGE - FORM SUBMITTED 🟢🟢🟢');
    console.log('Form data:', formData);
    
    if (!validateForm()) {
      console.log('❌ Validation failed');
      showToast('אנא תקן את השגיאות בטופס', 'error');
      return;
    }
    
    console.log('✅ Validation passed, sending to API...');
    setIsSubmitting(true);
    setErrors({});
    
    try {
      console.log('📡 Fetching /api/contact...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📨 Response status:', response.status);
      const data = await response.json();
      console.log('📦 Response data:', data);

      if (!response.ok) {
        console.log('❌ Response not OK');
        throw new Error(data.error || 'שגיאה בשליחת ההודעה');
      }

      // Success!
      console.log('✅ SUCCESS! Email sent!');
      showToast(data.message || 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.', 'success');
      setFormData({ name: '', phone: '', email: '', message: '' });
      
    } catch (error) {
      console.error('❌ Error caught:', error);
      const errorMessage = error instanceof Error ? error.message : 'אירעה שגיאה בשליחת ההודעה. אנא נסה שוב.';
      showToast(errorMessage, 'error');
    } finally {
      console.log('🏁 Finally - setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '972533366101';
    const message = `שלום, אני ${formData.name || '[שם]'} ואני מעוניין לשמוע עוד על שירותי Crystal View. ${formData.message || 'אשמח לקבל פרטים נוספים.'}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = () => {
    window.open('tel:+972533366101', '_self');
  };

  return (
    <main id="main-content" role="main" className="min-h-screen">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-clean-gray-50">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-lg mb-6">
              בואו נתחיל את הפרויקט שלכם
            </h1>
            <p className="text-body max-w-3xl mx-auto">
              נשמח לשמוע על החזון שלכם ולהראות איך אפשר להפוך אותו למציאות.
              השאירו פרטים ונחזור אליכם בהקדם, או דברו איתנו ישירות ב-WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="clean-section bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="clean-card p-8">
                <h2 className="heading-sm mb-8">
                  שלחו לנו הודעה
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-clean-gray-900 font-semibold mb-2">
                        שם מלא <span className="text-red-500" aria-label="שדה חובה">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-clean-gray-300 rounded-lg text-clean-gray-900 placeholder-clean-gray-500 focus:border-clean-blue focus:outline-none transition-colors touch-target"
                        placeholder="הכניסו את שמכם המלא"
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-clean-gray-900 font-semibold mb-2">
                        טלפון <span className="text-red-500" aria-label="שדה חובה">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-clean-gray-300 rounded-lg text-clean-gray-900 placeholder-clean-gray-500 focus:border-clean-blue focus:outline-none transition-colors touch-target"
                        placeholder="050-123-4567"
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-clean-gray-900 font-semibold mb-2">
                      אימייל <span className="text-red-500" aria-label="שדה חובה">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-clean-gray-300 rounded-lg text-clean-gray-900 placeholder-clean-gray-500 focus:border-clean-blue focus:outline-none transition-colors touch-target"
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-clean-gray-900 font-semibold mb-2">
                      הודעה
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      aria-describedby="message-help"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-clean-gray-300 rounded-lg text-clean-gray-900 placeholder-clean-gray-500 focus:border-clean-blue focus:outline-none transition-colors resize-none"
                      placeholder="ספרו לנו על הפרויקט שלכם..."
                    />
                    <p id="message-help" className="mt-1 text-sm text-clean-gray-600">
                      אופציונלי - ספרו לנו בקצרה על הפרויקט
                    </p>
                  </div>

                  {/* Form Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 clean-btn disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={isSubmitting ? 'שולח הודעה...' : 'שלח הודעה'}
                    >
                      {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 touch-target"
                      aria-label="פתח שיחה ב-WhatsApp"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </button>
                  </div>

                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Contact Details */}
              <div className="clean-card p-8">
                <h2 className="heading-sm mb-8">
                  פרטי קשר
                </h2>

                <div className="space-y-6">
                  {/* Phone */}
                  <a
                    href="tel:+972533366101"
                    className="flex items-center gap-4 p-4 bg-clean-gray-50 rounded-lg hover:bg-clean-gray-100 transition-colors touch-target group"
                    aria-label="התקשר למספר 053-3366101"
                  >
                    <div className="w-12 h-12 bg-clean-blue rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                      <PhoneIcon />
                    </div>
                    <div>
                      <h3 className="text-clean-gray-900 font-bold mb-1">טלפון</h3>
                      <p className="text-clean-gray-700" dir="ltr">053-3366101</p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:crystalview202@gmail.com"
                    className="flex items-center gap-4 p-4 bg-clean-gray-50 rounded-lg hover:bg-clean-gray-100 transition-colors touch-target group"
                    aria-label="שלח אימייל לכתובת crystalview202@gmail.com"
                  >
                    <div className="w-12 h-12 bg-clean-blue rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                      <EmailIcon />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-clean-gray-900 font-bold mb-1">אימייל</h3>
                      <p className="text-clean-gray-700 break-all">crystalview202@gmail.com</p>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-center gap-4 p-4 bg-clean-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-clean-blue rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <LocationIcon />
                    </div>
                    <div>
                      <h3 className="text-clean-gray-900 font-bold mb-1">כתובת</h3>
                      <p className="text-clean-gray-700">המחוגה 2, איזור תעשייה צפוני, אשקלון 78100</p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-center gap-4 p-4 bg-clean-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-clean-blue rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <TimeIcon />
                    </div>
                    <div>
                      <h3 className="text-clean-gray-900 font-bold mb-1">שעות פעילות</h3>
                      <p className="text-clean-gray-700">ראשון-חמישי: 8:00-17:00</p>
                      <p className="text-clean-gray-700">שישי שבת - סגור</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="clean-card p-8">
                <h2 className="text-xl font-bold text-clean-gray-900 mb-4">
                  המיקום שלנו
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=34.56%2C31.66%2C34.58%2C31.68&layer=mapnik&marker=31.667890%2C34.571234"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="מפה של המיקום של Crystal View באשקלון"
                    className="rounded-lg"
                  />
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}
