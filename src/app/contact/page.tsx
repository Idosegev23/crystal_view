'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/contexts/ToastContext';

export default function ContactPage() {
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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'שם הוא שדה חובה';
    if (!formData.phone.trim()) {
      newErrors.phone = 'טלפון הוא שדה חובה';
    } else if (!/^[0-9\-\s\+\(\)]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת אימייל לא תקינה';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('אנא תקן את השגיאות בטופס', 'error');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'שגיאה בשליחת ההודעה');
      showToast(data.message || 'ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.', 'success');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'אירעה שגיאה. נסה שוב.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/972533366101?text=${encodeURIComponent(`שלום, אני ${formData.name || '[שם]'} ואני מעוניין לשמוע עוד על שירותי Crystal View.`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <main id="main-content" role="main" className="min-h-screen bg-gradient-to-b from-glass-frost via-glass-white to-glass-ice">
      {/* Hero Section */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        {/* Subtle blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-glass-blue/5 via-transparent to-glass-accent/5" />
        
        <div className="container-max text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="glass-subheading mb-4">יצירת קשר</p>
            <h1 className="glass-heading-lg mb-6">בואו נתחיל את <span className="text-glass-blue">הפרויקט</span></h1>
            <div className="glass-divider mx-auto mb-6" />
            <p className="glass-body max-w-2xl mx-auto">
              נשמח לשמוע על החזון שלכם ולהפוך אותו למציאות
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div 
                className="glass-card p-8 lg:p-10 border-t-4 border-glass-blue"
                style={{ borderRadius: '0 20px 20px 20px' }}
              >
                <h2 className="glass-heading-sm mb-8">שלחו הודעה</h2>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-glass-charcoal mb-2">
                        שם מלא <span className="text-glass-blue">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-glass-ice/50 border border-glass-mist text-glass-charcoal placeholder-glass-steel/50 focus:ring-2 focus:ring-glass-blue focus:border-glass-blue focus:outline-none transition-all"
                        style={{ borderRadius: '0 12px 12px 12px' }}
                        placeholder="הכניסו את שמכם"
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-glass-charcoal mb-2">
                        טלפון <span className="text-glass-blue">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-glass-ice/50 border border-glass-mist text-glass-charcoal placeholder-glass-steel/50 focus:ring-2 focus:ring-glass-blue focus:border-glass-blue focus:outline-none transition-all"
                        style={{ borderRadius: '12px 0 12px 12px' }}
                        placeholder="050-000-0000"
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-glass-charcoal mb-2">
                      אימייל
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-glass-ice/50 border border-glass-mist text-glass-charcoal placeholder-glass-steel/50 focus:ring-2 focus:ring-glass-blue focus:border-glass-blue focus:outline-none transition-all"
                      style={{ borderRadius: '12px 12px 0 12px' }}
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-glass-charcoal mb-2">
                      הודעה
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-glass-ice/50 border border-glass-mist text-glass-charcoal placeholder-glass-steel/50 focus:ring-2 focus:ring-glass-blue focus:border-glass-blue focus:outline-none transition-all resize-none"
                      style={{ borderRadius: '12px 12px 12px 0' }}
                      placeholder="ספרו לנו על הפרויקט..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="glass-btn flex-1 disabled:opacity-50"
                      style={{ borderRadius: '0 16px 16px 16px' }}
                    >
                      {isSubmitting ? 'שולח...' : 'שלח הודעה'}
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppClick}
                      className="flex-1 bg-[#25D366] hover:bg-[#20BD5C] text-white font-semibold py-3 px-6 transition-all"
                      style={{ borderRadius: '16px 0 16px 16px' }}
                    >
                      WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Contact Card */}
              <div 
                className="glass-card p-8 bg-gradient-to-br from-glass-charcoal to-glass-dark text-white"
                style={{ borderRadius: '20px 0 20px 20px' }}
              >
                <h2 className="text-xl font-bold mb-6 text-glass-accent">פרטי קשר</h2>

                <div className="space-y-5">
                  <a 
                    href="tel:+972533366101" 
                    className="block p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                    style={{ borderRadius: '0 12px 12px 12px' }}
                  >
                    <p className="text-xs text-glass-accent mb-1">טלפון</p>
                    <p className="text-xl font-semibold" dir="ltr">053-3366101</p>
                  </a>

                  <a 
                    href="mailto:crystalview202@gmail.com" 
                    className="block p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all"
                    style={{ borderRadius: '12px 0 12px 12px' }}
                  >
                    <p className="text-xs text-glass-accent mb-1">אימייל</p>
                    <p className="text-white break-all">crystalview202@gmail.com</p>
                  </a>

                  <div 
                    className="p-4 bg-white/10 backdrop-blur-sm"
                    style={{ borderRadius: '12px 12px 0 12px' }}
                  >
                    <p className="text-xs text-glass-accent mb-1">כתובת</p>
                    <address className="not-italic text-white/90 leading-relaxed">
                      המחוגה 2, איזור תעשייה צפוני, אשקלון
                    </address>
                  </div>

                  <div 
                    className="p-4 bg-white/10 backdrop-blur-sm"
                    style={{ borderRadius: '12px 12px 12px 0' }}
                  >
                    <p className="text-xs text-glass-accent mb-1">שעות פעילות</p>
                    <p className="text-white/90">א׳–ה׳: 8:00–17:00</p>
                    <p className="text-white/60 text-sm">ו׳–ש׳: סגור</p>
                  </div>
                </div>
              </div>

              {/* Map Link */}
              <a
                href="https://maps.google.com/?q=המחוגה+2+איזור+תעשייה+צפוני+אשקלון"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-btn-outline w-full justify-center border-glass-blue text-glass-blue hover:bg-glass-blue hover:text-white"
                style={{ borderRadius: '16px 16px 0 16px' }}
              >
                פתח במפות
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
