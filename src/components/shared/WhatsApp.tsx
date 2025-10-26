'use client';

import { motion } from 'framer-motion';
import { WhatsAppIcon } from '@/lib/icons';

export default function WhatsApp() {
  const phoneNumber = '972533366101';
  const message = 'שלום, אני מעוניין לשמוע עוד על שירותי Crystal View';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-clean-lg hover:shadow-clean-xl transition-all duration-300 flex items-center justify-center group touch-target"
      aria-label="צור קשר בוואטסאפ - פתיחה בחלון חדש"
    >
      {/* WhatsApp Icon */}
      <div className="text-white">
        <WhatsAppIcon />
      </div>

      {/* Tooltip */}
      <div 
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-clean-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-clean-lg"
        role="tooltip"
      >
        צור קשר בוואטסאפ
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-clean-gray-900" aria-hidden="true" />
      </div>

      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" aria-hidden="true" />
    </motion.button>
  );
}
