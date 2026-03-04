import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const RevealOnScroll = ({ children, width = "100%", delay = 0.25 }) => { // Default delay slightly adjusted
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Trigger when element is 100px from bottom viewport
  const mainControls = useAnimation();
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    const checkSettings = () => {
        try {
            const saved = localStorage.getItem('accessibility-settings');
            if (saved) {
                const settings = JSON.parse(saved);
                setAnimationsEnabled(!settings.stopAnimations);
            }
        } catch (e) {
            // ignore
        }
    };
    checkSettings();
    window.addEventListener('accessibility-settings-changed', checkSettings);
    return () => window.removeEventListener('accessibility-settings-changed', checkSettings);
  }, []);

  useEffect(() => {
    if (!animationsEnabled) {
        // If animations are stopped, show content immediately without animation
        mainControls.set("visible");
        return;
    }

    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls, animationsEnabled]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}> {/* overflow visible to not clip children animations */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={animationsEnabled ? { duration: 0.6, delay: delay, ease: "easeOut" } : { duration: 0 }} // Disable transition if needed
      >
        {children}
      </motion.div>
    </div>
  );
};

export default RevealOnScroll;