'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

type Option = 'חלון' | 'דלת' | 'פרגולה' | null;

export default function Calculator() {
  // Customer info
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [infoSaved, setInfoSaved] = useState(false);

  // Calculator state
  const [selectedOption, setSelectedOption] = useState<Option>(null);
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [area, setArea] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [showCalculator, setShowCalculator] = useState(false);

  const options: { key: Option; icon: JSX.Element }[] = [
    {
      key: 'חלון',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-crystal-blue">
          <rect x="3" y="3" width="18" height="18" strokeWidth="2" />
          <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" />
          <line x1="12" y1="3" x2="12" y2="21" strokeWidth="2" />
        </svg>
      ),
    },
    {
      key: 'דלת',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-crystal-blue">
          <rect x="6" y="3" width="12" height="18" strokeWidth="2" />
          <circle cx="17" cy="12" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      key: 'פרגולה',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-crystal-blue">
          <rect x="4" y="8" width="16" height="12" strokeWidth="2" />
          <line x1="4" y1="8" x2="20" y2="8" strokeWidth="2" />
          <line x1="8" y1="8" x2="8" y2="20" strokeWidth="2" />
          <line x1="16" y1="8" x2="16" y2="20" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  // instant calculation
  useEffect(() => {
    if (!selectedOption || !width || !height) {
      setArea(0);
      setPrice(0);
      return;
    }
    const calcArea = (width * height) / 10000; // cm² -> m²
    setArea(Number(calcArea.toFixed(2)));
    setPrice(Math.round(calcArea * 1000)); // 1,000 ₪ per m²
  }, [selectedOption, width, height]);

  const handleCustomerSubmit = () => {
    const newErrors: typeof errors = {};
    if (!customerName) newErrors.name = 'אנא מלא שם מלא';
    if (!customerPhone) newErrors.phone = 'אנא מלא טלפון';
    if (!customerEmail) newErrors.email = 'אנא מלא אימייל';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowCalculator(true);
      setInfoSaved(true); // saved
      // TODO: send details to backend if desired
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="bg-gradient-to-br from-crystal-dark to-gray-900 rounded-2xl shadow-2xl glass-effect p-8 lg:p-12"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-crystal-white"
        >
          מחשבון עלות משוערת
        </motion.h1>

        {/* Step 1: Customer Info */}
        {!showCalculator && (
          <motion.div 
            variants={staggerItem}
            className="bg-gradient-to-br from-crystal-dark/50 to-gray-900/50 p-8 rounded-2xl glass-effect backdrop-blur-md"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-2xl sm:text-3xl font-bold mb-8 text-center text-crystal-white"
            >
              פרטי לקוח
            </motion.h2>
            <div className="grid grid-cols-1 gap-6">
              <motion.div variants={staggerItem}>
                <input
                  type="text"
                  placeholder="שם מלא"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-4 bg-crystal-dark/50 border border-crystal-silver/30 rounded-lg text-crystal-white placeholder-crystal-silver/60 focus:border-crystal-blue focus:outline-none transition-colors"
                />
                {errors.name && <p className="text-red-400 mt-2 text-sm">{errors.name}</p>}
              </motion.div>
              <motion.div variants={staggerItem}>
                <input
                  type="tel"
                  placeholder="טלפון"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-4 bg-crystal-dark/50 border border-crystal-silver/30 rounded-lg text-crystal-white placeholder-crystal-silver/60 focus:border-crystal-blue focus:outline-none transition-colors"
                />
                {errors.phone && <p className="text-red-400 mt-2 text-sm">{errors.phone}</p>}
              </motion.div>
              <motion.div variants={staggerItem}>
                <input
                  type="email"
                  placeholder="אימייל"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-4 bg-crystal-dark/50 border border-crystal-silver/30 rounded-lg text-crystal-white placeholder-crystal-silver/60 focus:border-crystal-blue focus:outline-none transition-colors"
                />
                {errors.email && <p className="text-red-400 mt-2 text-sm">{errors.email}</p>}
              </motion.div>
              <motion.button
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCustomerSubmit}
                className="w-full py-4 bg-gradient-to-r from-crystal-blue to-crystal-silver text-crystal-dark rounded-lg font-bold text-lg shadow-2xl transition-all duration-300"
              >
                המשך למחשבון
              </motion.button>
              {infoSaved && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center mt-2"
                >
                  פרטי הלקוח נשמרו בהצלחה!
                </motion.p>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Calculator */}
        {showCalculator && (
          <motion.div 
            variants={staggerItem}
            className="space-y-8"
          >
            {/* Option Cards */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
            >
              {options.map((opt) => (
                <motion.div
                  key={opt.key}
                  variants={staggerItem}
                  onClick={() => setSelectedOption(opt.key)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 ${
                    selectedOption === opt.key
                      ? 'bg-gradient-to-br from-crystal-blue/20 to-crystal-silver/20 border-2 border-crystal-blue'
                      : 'bg-gradient-to-br from-crystal-dark/50 to-gray-900/50 border-2 border-crystal-silver/30 hover:border-crystal-blue/50'
                  } glass-effect backdrop-blur-md`}
                >
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className={`mb-4 p-4 rounded-xl ${
                      selectedOption === opt.key 
                        ? 'bg-crystal-blue/20' 
                        : 'bg-crystal-dark/50 group-hover:bg-crystal-blue/10'
                    } transition-colors duration-300`}>
                      {opt.icon}
                    </div>
                    <span className={`text-lg font-bold ${
                      selectedOption === opt.key 
                        ? 'text-crystal-white' 
                        : 'text-crystal-silver group-hover:text-crystal-white'
                    } transition-colors duration-300`}>
                      {opt.key}
                    </span>
                    {selectedOption === opt.key && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 left-2 w-4 h-4 bg-crystal-blue rounded-full flex items-center justify-center"
                      >
                        <svg className="w-3 h-3 text-crystal-dark" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Inputs */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8"
            >
              <motion.div variants={staggerItem}>
                <label className="block mb-3 font-medium text-crystal-silver">רוחב (ס"מ)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) =>
                    setWidth(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  placeholder="הכנס רוחב בסנטימטרים"
                  className="w-full p-4 bg-crystal-dark/50 border border-crystal-silver/30 rounded-lg text-crystal-white placeholder-crystal-silver/60 focus:border-crystal-blue focus:outline-none transition-colors"
                />
              </motion.div>
              <motion.div variants={staggerItem}>
                <label className="block mb-3 font-medium text-crystal-silver">גובה (ס"מ)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) =>
                    setHeight(e.target.value === '' ? '' : Number(e.target.value))
                  }
                  placeholder="הכנס גובה בסנטימטרים"
                  className="w-full p-4 bg-crystal-dark/50 border border-crystal-silver/30 rounded-lg text-crystal-white placeholder-crystal-silver/60 focus:border-crystal-blue focus:outline-none transition-colors"
                />
              </motion.div>
            </motion.div>

            {/* Result */}
            <AnimatePresence>
              {area > 0 && price > 0 && selectedOption && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.9 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 300 }}
                  className="bg-gradient-to-r from-crystal-blue/20 via-crystal-silver/20 to-crystal-blue/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center mb-8 glass-effect border border-crystal-blue/30"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="w-16 h-16 bg-gradient-to-r from-crystal-blue to-crystal-silver rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <svg className="w-8 h-8 text-crystal-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  
                  <div className="space-y-4">
                    <p className="text-xl text-crystal-silver">בחירה: <span className="font-bold text-crystal-white">{selectedOption}</span></p>
                    <p className="text-2xl text-crystal-silver">שטח: <span className="font-extrabold text-crystal-white">{area} מ"ר</span></p>
                    <motion.p 
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="text-3xl font-extrabold text-crystal-blue"
                    >
                      מחיר משוער: {price.toLocaleString()} ₪
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirmation */}
            {infoSaved && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-6 bg-green-500/20 border border-green-500/30 rounded-lg glass-effect"
              >
                <p className="text-green-400 font-medium">
                  פרטי הלקוח כבר שמורים, ניצור איתך קשר בהקדם
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
