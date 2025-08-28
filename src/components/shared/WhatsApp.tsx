'use client';

import { motion } from 'framer-motion';
import { WhatsAppIcon } from '@/lib/icons';

export default function WhatsApp() {
  const phoneNumber = '972501234567'; // Replace with actual WhatsApp number
  const message = 'שלום, אני מעוניין לשמוע עוד על שירותי Crystal View';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      aria-label="צור קשר בוואטסאפ"
    >
      {/* WhatsApp Icon */}
      <div className="text-white">
        <WhatsAppIcon />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 sm:px-3 sm:py-1 bg-crystal-dark text-crystal-white text-xs sm:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        צור קשר בוואטסאפ
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-crystal-dark"></div>
      </div>

      {/* Pulse animation */}
      <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
    </motion.button>
  );
}