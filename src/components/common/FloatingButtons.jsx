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

  const railButtonClass = "relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <>
    <AccessibilityMenu isOpen={isAccessibilityOpen} onClose={() => setIsAccessibilityOpen(false)} />
    
    <div
      className="floating-buttons-root fixed bottom-6 right-4 z-[9000] flex flex-col items-end gap-2 pointer-events-none"
      role="complementary"
      aria-label="Quick accessibility and contact actions"
    >
      <motion.div
        initial={false}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 16, scale: isVisible ? 1 : 0.96 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={`pointer-events-auto ${isVisible ? '' : 'pointer-events-none'}`}
      >
        <div className="relative flex flex-col items-end gap-2.5">
          <motion.a
            href="https://wa.me/917415152600?text=Hello%20Sterling%20Research,%20I%20am%20interested%20in%20your%20services.%20Please%20guide%20me."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.06 }}
            className={`${railButtonClass} bg-gradient-to-br from-[#25D366] to-[#17964b] text-white focus:ring-[#25D366]/40 border-2 border-white`}
            title="Chat on WhatsApp"
          >
            <span className="absolute -inset-1 rounded-full border border-emerald-300/70 animate-pulse"></span>
            <FaWhatsapp className="relative z-10 text-xl" />
          </motion.a>

          <button
            onClick={() => setIsAccessibilityOpen(true)}
            className={`${railButtonClass} bg-gradient-to-br from-[#1e5631] to-[#103d20] text-white focus:ring-[#1e5631]/40 border-2 border-white`}
            title="Accessibility Options"
            aria-label="Open Accessibility Menu"
          >
            <FaUniversalAccess className="text-lg" />
          </button>

          <button
            onClick={() => setIsOpen((v) => !v)}
            className={`${railButtonClass} ${isOpen
              ? 'bg-slate-700 text-white focus:ring-slate-500/40'
              : 'bg-gradient-to-r from-[#8f1038] to-[#d8a136] text-white focus:ring-[#8f1038]/40'
            } border-2 border-white`}
            aria-label={isOpen ? 'Close Menu' : 'Open Actions Menu'}
            title="More actions"
          >
            <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
              <FaPlus className="text-base" />
            </motion.span>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-1 mr-14 space-y-2"
            >
              <button
                className={`flex items-center gap-2.5 pl-3 pr-3.5 py-2 rounded-full border shadow-md backdrop-blur ${
                  isAutoSpeak
                    ? 'bg-emerald-800 border-emerald-900 text-white hover:bg-emerald-900'
                    : 'bg-amber-800 border-amber-900 text-white hover:bg-amber-900'
                }`}
                title={isAutoSpeak ? 'Turn Off Auto Speak' : 'Turn On Auto Speak'}
                onClick={toggleAutoSpeak}
              >
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center border border-black/5 text-slate-900">
                  {isAutoSpeak ? <FaVolumeUp className="text-xs" /> : <FaVolumeMute className="text-xs" />}
                </span>
                <span className="text-sm font-semibold whitespace-nowrap">{isAutoSpeak ? 'Voice On' : 'Voice Off'}</span>
              </button>

              <a
                href="tel:+917415152600"
                className="flex items-center gap-2.5 pl-3 pr-3.5 py-2 rounded-full border border-blue-900 bg-blue-800 text-white hover:bg-blue-900 shadow-md backdrop-blur"
                title="Call Us"
              >
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center border border-black/5 text-slate-900">
                  <FaPhone className="text-xs" />
                </span>
                <span className="text-sm font-semibold whitespace-nowrap">Call Support</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Visibility Toggle Button (Chevron) */}
      <div className="pointer-events-auto mt-1 flex justify-center w-full">
        <button
            onClick={() => setIsVisible(!isVisible)}
            className="w-8 h-8 bg-slate-800/85 backdrop-blur text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-all shadow-md"
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