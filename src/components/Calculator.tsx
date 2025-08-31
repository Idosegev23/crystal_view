'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-blue-400">
          <rect x="3" y="3" width="18" height="18" strokeWidth="2" />
          <line x1="3" y1="12" x2="21" y2="12" strokeWidth="2" />
          <line x1="12" y1="3" x2="12" y2="21" strokeWidth="2" />
        </svg>
      ),
    },
    {
      key: 'דלת',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-blue-400">
          <rect x="6" y="3" width="12" height="18" strokeWidth="2" />
          <circle cx="17" cy="12" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      key: 'פרגולה',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-16 h-16 text-blue-400">
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
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 rounded-2xl shadow-2xl mt-12 text-white">
      <motion.h1
        className="text-4xl font-bold text-center mb-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        מחשבון בנייה
      </motion.h1>

      {/* Step 1: Customer Info */}
      {!showCalculator && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="bg-gray-800 p-6 rounded-2xl shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-center">פרטי לקוח</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                placeholder="שם מלא"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && <p className="text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="טלפון"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.phone && <p className="text-red-400 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="אימייל"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-400 mt-1">{errors.email}</p>}
            </div>
            <button
              onClick={handleCustomerSubmit}
              className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-full font-bold text-lg shadow-lg transition-all transform hover:scale-105"
            >
              המשך למחשבון
            </button>
            {infoSaved && <p className="text-green-400 text-center mt-2">פרטי הלקוח נשמרו בהצלחה!</p>}
          </div>
        </motion.div>
      )}

      {/* Step 2: Calculator */}
      {showCalculator && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mt-6">
          {/* Option Cards */}
          <div className="flex justify-around mb-8 flex-wrap gap-4">
            {options.map((opt) => (
              <motion.div
                key={opt.key}
                onClick={() => setSelectedOption(opt.key)}
                whileHover={{ scale: 1.1 }}
                animate={{
                  scale: selectedOption === opt.key ? 1.1 : 1,
                  boxShadow:
                    selectedOption === opt.key
                      ? '0 0 20px rgba(59, 130, 246,0.7)'
                      : '0 0 10px rgba(0,0,0,0.2)',
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`cursor-pointer flex flex-col items-center p-4 rounded-xl border-2 ${
                  selectedOption === opt.key
                    ? 'border-blue-400 bg-gray-800'
                    : 'border-gray-600 bg-gray-900'
                }`}
              >
                {opt.icon}
                <span className="mt-2 text-lg font-bold">{opt.key}</span>
              </motion.div>
            ))}
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-2 font-medium">רוחב (ס"מ)</label>
              <input
                type="number"
                value={width}
                onChange={(e) =>
                  setWidth(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder="הכנס רוחב בסנטימטרים"
                className="w-full p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">גובה (ס"מ)</label>
              <input
                type="number"
                value={height}
                onChange={(e) =>
                  setHeight(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder="הכנס גובה בסנטימטרים"
                className="w-full p-3 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Result */}
          <AnimatePresence>
            {area > 0 && price > 0 && selectedOption && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-6 rounded-2xl shadow-2xl text-center mb-6"
              >
                <p className="text-xl">בחירה: <span className="font-bold">{selectedOption}</span></p>
                <p className="text-2xl mt-2">שטח: <span className="font-extrabold">{area} מ"ר</span></p>
                <p className="text-3xl font-extrabold mt-2 text-yellow-300">מחיר משוער: {price.toLocaleString()} ₪</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Confirmation */}
          {infoSaved && (
            <p className="text-green-400 text-center mb-4">פרטי הלקוח כבר שמורים, ניצור איתך קשר בהקדם</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
