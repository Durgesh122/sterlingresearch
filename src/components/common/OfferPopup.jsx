import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase'; // Adjust path if needed
import { X } from 'lucide-react';

const OfferPopup = ({ triggerOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [offerData, setOfferData] = useState({
    imageUrl: '',
    linkUrl: '',
    isVisible: false
  });
  const [hasClosed, setHasClosed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Session storage check to not annoy users if they closed it once per session
    // Or we can just let it show every time they visit home if that's the requirement. 
    // Let's stick to session storage for better UX.
    const closedSession = sessionStorage.getItem('sterling_offer_closed');
    if (closedSession) setHasClosed(true);

    const offerRef = ref(database, 'admin/offerPopup');
    const unsubscribe = onValue(offerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOfferData({
          imageUrl: data.imageUrl || '',
          linkUrl: data.linkUrl || '',
          isVisible: data.isVisible || false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // strict check: if not visible or no image, force close
    if (!offerData.isVisible || !offerData.imageUrl) {
        setIsOpen(false);
        return;
    }

    // Show only when triggered AND on Home page
    if (triggerOpen && location.pathname === '/') {
      // Small delay for smooth transition
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [triggerOpen, location.pathname, offerData]);

  const handleClose = () => {
    setIsOpen(false);
    // We still mark it as closed in session, but we don't use it to block the trigger anymore.
    setHasClosed(true);
    sessionStorage.setItem('sterling_offer_closed', 'true');
    if (onClose) onClose(); 
  };

  if (!isOpen) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
        >
            <motion.div
                className="relative bg-transparent max-w-4xl w-full outline-none mx-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button - Outside top right or inside depending on design. Outside is cleaner for images. */}
                <button 
                    onClick={handleClose}
                    className="absolute -top-10 right-0 md:-right-10 text-white hover:text-gray-200 transition-colors bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-md"
                >
                    <X size={24} />
                </button>

                {offerData.linkUrl ? (
                    <a href={offerData.linkUrl} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                        <img 
                            src={offerData.imageUrl} 
                            alt="Special Offer" 
                            className="w-full h-auto rounded-lg shadow-2xl object-contain max-h-[80vh] mx-auto"
                        />
                    </a>
                ) : (
                    <img 
                        src={offerData.imageUrl} 
                        alt="Special Offer" 
                        className="w-full h-auto rounded-lg shadow-2xl object-contain max-h-[80vh] mx-auto"
                    />
                )}
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

export default OfferPopup;
