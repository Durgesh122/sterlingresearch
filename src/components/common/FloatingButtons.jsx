import React, { useState, useEffect } from 'react';
import { FaPlus, FaUniversalAccess, FaWhatsapp, FaPhone, FaVolumeUp, FaChevronDown, FaChevronUp, FaVolumeMute } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AccessibilityMenu from './AccessibilityMenu';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [isAutoSpeak, setIsAutoSpeak] = useState(() => {
    return localStorage.getItem('autoSpeak') === 'true';
  });
  const location = useLocation();

  const getPageDescription = (path, langInput = 'en') => {
    // Basic mapping based on paths
    // Define descriptions and language logic again for closure integrity
    const descriptions = {
      en: {
        '/': "Welcome to the Home page of Sterling Research. We provide expert financial advice and market insights.",
        '/about': "This is the About Us page. Learn about our company history, our team.",
        '/contact': "This is the Contact Us page. Phone, email, or visit our office.",
        '/services': "This is the Services page. Explore our wide range of trading and investment services.",
        '/blogs': "This is the Blogs page. Read expert articles.",
        '/market-news': "This is the Market News page.",
        '/accessibility-statement': "This is the Accessibility Statement page.",
        '/disclaimer': "This is the Disclaimer page. Please read our terms regarding investment risks.",
        '/privacy-policy': "This is the Privacy Policy page.",
        '/terms-conditions': "This is the Terms and Conditions page.",
      },
      hi: {
        '/': "स्टर्लिंग रिसर्च के होम पेज पर आपका स्वागत है।",
        '/about': "यह हमारे बारे में (About Us) पेज है।",
        '/contact': "यह संपर्क (Contact Us) पेज है।",
        '/services': "यह सेवाएँ (Services) पेज है।",
        '/blogs': "यह ब्लॉग पेज है।",
        '/market-news': "यह मार्केट न्यूज़ पेज है।",
        '/accessibility-statement': "यह एक्सेसिबिलिटी स्टेटमेंट पेज है।",
        '/disclaimer': "यह अस्वीकरण (Disclaimer) पेज है।",
      }
    };
    
    // Normalize path
    let normalized = path.toLowerCase();
    if (normalized.length > 1 && normalized.endsWith('/')) {
        normalized = normalized.slice(0, -1);
    }

    if (descriptions[langInput] && descriptions[langInput][normalized]) {
        return descriptions[langInput][normalized];
    }
    
    // Fallback logic
    const pathName = normalized.replace('/', '').replace(/-/g, ' ');
    const readableName = pathName ? pathName.charAt(0).toUpperCase() + pathName.slice(1) : 'Home';

    if (langInput === 'hi') {
        return `आप वर्तमान में ${readableName} पेज पर हैं।`;
    }
    return `You are currently on the ${readableName} page. Explore content to learn more.`;
  };

  const speakPageInfo = () => {
    try {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();

      const bodyText = (document.body && document.body.innerText) ? document.body.innerText.slice(0, 1000) : '';
      const hasHindi = /[\u0900-\u097F]/.test(bodyText);
      const lang = hasHindi ? 'hi' : 'en';

      const description = getPageDescription(location.pathname, lang);
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('TTS speak failed:', err);
    }
  };

  // Effect to handle auto-speak on page change
  useEffect(() => {
    if (isAutoSpeak) {
      // Small delay to allow page content to load/update for language detection
      const timer = setTimeout(() => {
        speakPageInfo();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isAutoSpeak]);

  const toggleAutoSpeak = () => {
    const newState = !isAutoSpeak;
    setIsAutoSpeak(newState);
    localStorage.setItem('autoSpeak', newState);
    
    if (newState) {
      speakPageInfo();
    } else {
      try { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); } catch (err) { }
    }
  };

  const buttonClass = "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <>
    <AccessibilityMenu isOpen={isAccessibilityOpen} onClose={() => setIsAccessibilityOpen(false)} />
    
    <div className="fixed bottom-6 right-4 z-[9000] flex flex-col items-end gap-2 pointer-events-none">
      
      {/* Container for Buttons - Pointer events auto enables clicks */}
      <div className={`flex flex-col items-center gap-3 transition-all duration-300 pointer-events-auto ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        
        {/* Expanded Menu Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="flex flex-col gap-3 items-center mb-2"
            >
              {/* Auto Speak Toggle */}
              <button 
                className={`${buttonClass} ${isAutoSpeak ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500'} text-white`}
                title={isAutoSpeak ? "Turn Off Auto Speak" : "Turn On Auto Speak"}
                onClick={toggleAutoSpeak}
              >
                {isAutoSpeak ? <FaVolumeMute className="text-sm md:text-base" /> : <FaVolumeUp className="text-sm md:text-base" />}
              </button>
              
              {/* Phone */}
              <a 
                href="tel:+916232678136" 
                className={`${buttonClass} bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500`}
                title="Call Us"
              >
                <FaPhone className="text-sm md:text-base" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WhatsApp Button (Premium Ripple Animation) */}
        <motion.a
          href="https://wa.me/6232678136?text=Hello%20Sterling%20Research,%20I%20am%20interested%20in%20your%20services.%20Please%20guide%20me."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 100, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.5)] border-2 border-white mb-3 hover:bg-[#20bd5a] transition-all z-50"
          title="Chat on WhatsApp"
        >
          {/* Continuous Ripple/Ping Animation */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping duration-[2000ms]"></span>
          
          <FaWhatsapp className="relative z-10 text-2xl md:text-3xl drop-shadow-sm" />
        </motion.a>

        {/* Accessibility Button (Always Visible) */}
        <button
          onClick={() => setIsAccessibilityOpen(true)}
          className={`${buttonClass} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 mb-2`}
          title="Accessibility Options"
          aria-label="Open Accessibility Menu"
        >
          <FaUniversalAccess className="text-lg md:text-xl" />
        </button>

        {/* Main Toggle Button (Plus / Close) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${buttonClass} ${isOpen ? 'bg-gray-700 rotate-45' : 'bg-blue-600 hover:bg-blue-700 animate-pulse hover:animate-none'} text-white focus:ring-gray-500`}
          aria-label={isOpen ? "Close Menu" : "Open Actions Menu"}
        >
          <FaPlus className="text-lg md:text-xl" />
        </button>
      </div>

      {/* Visibility Toggle Button (Chevron) */}
      <div className="pointer-events-auto mt-1 flex justify-center w-full">
        <button
            onClick={() => setIsVisible(!isVisible)}
            className="w-8 h-8 bg-gray-800/80 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-all shadow-md"
            title={isVisible ? "Hide Widgets" : "Show Widgets"}
        >
            {isVisible ? <FaChevronDown size={12} /> : <FaChevronUp size={12} />}
        </button>
      </div>

    </div>
    </>
  );
};

export default FloatingButtons;