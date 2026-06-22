import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingButtons from "../common/FloatingButtons";
import FloatingChatBot from "../common/FloatingChatBot";

const PublicLayout = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 z-[60] origin-left" style={{ scaleX }} />
      <Navbar />
      <main className="min-h-[60vh] pt-[128px] md:pt-[132px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingButtons />
      <FloatingChatBot />
    </div>
  );
};

export default PublicLayout;
