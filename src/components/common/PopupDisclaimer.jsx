import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import SterlingLogo from '../../assets/SterlingLogo2.png';
import { X, Globe, CheckCircle } from 'lucide-react';
import { contactDetails } from "../../utils/data";

// Modified for Sterling Research
const PopupDisclaimer = ({ onAccept }) => {
  const [visible, setVisible] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);
  
  // Language state: 'en' or 'hi'
  const [lang, setLang] = useState('en');
  const location = useLocation();

  // Show on initial mount (refresh) ONLY if on Home page
  useEffect(() => {
    if (location.pathname === '/') {
        setVisible(true);
    }
  }, [location.pathname]);

  // Show when navigating to home page, if not currently visible
  /* 
  useEffect(() => {
    if (location.pathname === '/' && !visible && hasShownThisSession) {
        setVisible(true);
    }
  }, [location.pathname]);
  */


  // Mark as shown once accepted/closed so we can track session behavior if needed
  useEffect(() => {
     if (visible) {
         setHasShownThisSession(true);
     }
  }, [visible]);

  const setEnglish = () => setLang('en');
  const setHindi = () => setLang('hi');

  // Lock body scroll when popup is open, restore when closed
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    if (onAccept) onAccept();
  };

  if (!visible) return null;

  const content = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
          <motion.div
          className="relative rounded-2xl shadow-2xl bg-white w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
          initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-4 sm:p-6 flex items-center justify-between shadow-md relative z-10 shrink-0">
             <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg p-1.5 shadow-lg shrink-0 flex items-center justify-center"
                >
                   <img src={SterlingLogo} alt="Sterling Research" className="max-w-full max-h-full object-contain" />
                </motion.div>
                <div className="overflow-hidden">
                   <motion.h2 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.3 }}
                     className="text-lg sm:text-2xl font-bold text-white tracking-tight"
                   >
                     STERLING RESEARCH
                   </motion.h2>
                   <motion.p 
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.4 }}
                     className="text-blue-200 text-xs sm:text-sm font-medium"
                   >
                     {lang === 'en' ? 'Important Investment Disclosure' : 'महत्वपूर्ण निवेश सूचना'}
                   </motion.p>
                </div>
             </div>

             <button 
               onClick={handleClose}
               className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
             >
                <X size={24} />
             </button>
          </div>
          
          {/* Language Toggle */}
           <div className="bg-gray-50 border-b border-gray-200 px-6 py-2 flex justify-end shrink-0">
             <div className="flex bg-gray-200 rounded-lg p-1">
                <button
                  onClick={setEnglish}
                  className={`px-3 py-1 text-sm rounded-md transition-all font-medium flex items-center gap-1 ${lang === 'en' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Globe size={14} /> English
                </button>
                <button
                  onClick={setHindi}
                  className={`px-3 py-1 text-sm rounded-md transition-all font-medium flex items-center gap-1 ${lang === 'hi' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  हिंदी
                </button>
             </div>
          </div>


          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto text-gray-700 leading-relaxed text-sm sm:text-base space-y-4 bg-white grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.5, duration: 0.5 }}
             >
            {lang === 'en' ? (
                <>
                  <p className="font-semibold text-gray-900 text-lg">
                    Welcome to Sterling Research. Before proceeding, please read the following disclaimer carefully.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md text-sm text-blue-900 my-4 shadow-sm">
                    <strong>Note:</strong> We are a research-based company providing market analysis. We do not guarantee returns or profit-sharing.
                  </div>

                  <p>
                    <strong>Investment Risk:</strong> Trading in the stock market involves a significant risk of loss. The information provided on this website is for educational and informational purposes only and should not be construed as investment advice. Past performance is not indicative of future results.
                  </p>

                  <p>
                    <strong>No Liability:</strong> Sterling Research and its analysts are not liable for any losses incurred as a result of using our research or recommendations. Please consult with a certified financial advisor before making any investment decisions.
                  </p>

                  <p className="bg-red-50 p-3 rounded border border-red-100 text-red-800 text-sm">
                    <strong>Fraud Alert:</strong> We NEVER ask for personal details like your DEMAT account password or OTP. We only accept payments through our official website or official company bank accounts. Beware of fraudulent calls or messages asking for personal payments.
                  </p>

                  <p className="text-gray-500 text-xs mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500"/> Contact: {contactDetails.phone} | Email: {contactDetails.email}
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-gray-900 text-lg">
                    स्टर्लिंग रिसर्च में आपका स्वागत है। आगे बढ़ने से पहले, कृपया निम्नलिखित अस्वीकरण को ध्यान से पढ़ें।
                  </p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md text-sm text-blue-900 my-4 shadow-sm">
                    <strong>नोट:</strong> हम एक शोध-आधारित कंपनी हैं जो बाजार विश्लेषण प्रदान करती है। हम रिटर्न या लाभ-साझाकरण (profit-sharing) की गारंटी नहीं देते हैं।
                  </div>
                  
                  <p>
                    <strong>निवेश जोखिम:</strong> शेयर बाजार में ट्रेडिंग में नुकसान का महत्वपूर्ण जोखिम शामिल है। इस वेबसाइट पर प्रदान की गई जानकारी केवल शैक्षिक और सूचनात्मक उद्देश्यों के लिए है और इसे निवेश सलाह के रूप में नहीं माना जाना चाहिए। पिछला प्रदर्शन भविष्य के परिणामों का संकेत नहीं है।
                  </p>

                  <p>
                    <strong>दायित्व नहीं:</strong> स्टर्लिंग रिसर्च और इसके विश्लेषक हमारे शोध या सिफारिशों का उपयोग करने के परिणामस्वरूप हुए किसी भी नुकसान के लिए उत्तरदायी नहीं हैं। कोई भी निवेश निर्णय लेने से पहले कृपया एक प्रमाणित वित्तीय सलाहकार से परामर्श लें।
                  </p>

                  <p className="bg-red-50 p-3 rounded border border-red-100 text-red-800 text-sm">
                    <strong>धोखाधड़ी चेतावनी:</strong> हम कभी भी आपके डीमैट खाते का पासवर्ड या ओटीपी जैसे व्यक्तिगत विवरण नहीं मांगते हैं। हम केवल अपनी आधिकारिक वेबसाइट या आधिकारिक कंपनी बैंक खातों के माध्यम से भुगतान स्वीकार करते हैं। व्यक्तिगत भुगतान मांगने वाले फर्जी कॉल या संदेशों से सावधान रहें।
                  </p>

                  <p className="text-gray-500 text-xs mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <CheckCircle size={12} className="text-green-500"/> संपर्क: {contactDetails.phone} | ईमेल: {contactDetails.email}
                  </p>
                </>
              )}
             </motion.div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex justify-end shrink-0">
             <button
                onClick={handleClose}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle size={20} />
                {lang === 'en' ? 'I Have Read & Agree' : 'मैं सहमत हूँ'}
              </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }
  return content;
};

export default PopupDisclaimer;