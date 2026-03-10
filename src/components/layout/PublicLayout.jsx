import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from '../common/FloatingButtons';
import FloatingChatBot from '../common/FloatingChatBot';
import PopupDisclaimer from '../common/PopupDisclaimer';
import PopupForm from '../common/PopupForm';
import OfferPopup from '../common/OfferPopup';
// import StockTicker from "./StockTicker";

const PublicLayout = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const location = useLocation();
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const checkSettings = () => {
      try {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
          const settings = JSON.parse(saved);
          setAnimationsEnabled(!settings.stopAnimations);
        } else {
            setAnimationsEnabled(true);
        }
      } catch (e) {
        setAnimationsEnabled(true);
      }
    };
    checkSettings();
    window.addEventListener('accessibility-settings-changed', checkSettings);
    return () => window.removeEventListener('accessibility-settings-changed', checkSettings);
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FABE2C] origin-left z-[9999]"
        style={{ scaleX }}
      />
      <Navbar />
      <div className="pt-20 md:pt-32">
         {/* <StockTicker /> */}
      </div>
      <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
      </main>
      
      <Footer />

      <OfferPopup triggerOpen={showOffer} onClose={() => setShowOffer(false)} />
      <PopupDisclaimer onAccept={() => setShowForm(true)} />
      <PopupForm isOpen={showForm} onClose={() => { setShowForm(false); setShowOffer(true); }} />
      <FloatingButtons />
      <div className="hidden lg:block relative z-[9999]">
         <FloatingChatBot />
      </div>
    </div>
  );
};

export default PublicLayout;
