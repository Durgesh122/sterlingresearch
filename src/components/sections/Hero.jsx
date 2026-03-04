import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BarChart2, ShieldCheck, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import HeroImage from '../../assets/Herosection2ndimage.png';

// Reusable Glow Component for Hover Effects
const GlowWrapper = ({ children, className = "" }) => {
  return (
    <motion.div 
      className={`relative group ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        variants={{
          rest: { opacity: 0, scale: 0.95 },
          hover: { opacity: 1, scale: 1.1 }
        }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-4 bg-blue-500/10 dark:bg-blue-400/20 blur-2xl rounded-xl -z-10 pointer-events-none"
      />
      {children}
    </motion.div>
  );
};

const Hero = () => {
  // Animation variants for text staggered reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="relative w-full min-h-[100dvh] lg:h-screen flex items-center justify-center bg-white dark:bg-gray-900 overflow-x-hidden px-4 sm:px-6 lg:px-8 transition-colors duration-300 py-20 lg:py-0">
      {/* NEW ANIMATED STOCK MARKET BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        
        {/* 1. Dynamic Gradient Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full blur-[120px] animate-pulse delay-1000" />

        {/* 2. Moving Grid & Data Stream */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]">
            <motion.div 
               className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent w-1/2 h-full -skew-x-12"
               animate={{ x: ['-100%', '200%'] }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
             />
          </div>
        </div>

        {/* 3. Rising Growth Particles & Data Flow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           {/* Floating + and • symbols rising implies growth */}
           {[...Array(15)].map((_, i) => (
             <motion.div
                key={i}
                className="absolute text-blue-400/20 dark:text-blue-500/20 font-bold select-none"
                style={{
                  fontSize: Math.random() * 24 + 12 + 'px',
                  left: Math.random() * 100 + '%',
                }}
                initial={{ y: '100vh', opacity: 0 }}
                animate={{ 
                  y: '-10vh',
                  opacity: [0, 1, 0],
                  rotate: Math.random() * 90
                }}
                transition={{ 
                  duration: Math.random() * 15 + 10, 
                  repeat: Infinity, 
                  delay: Math.random() * 5,
                  ease: "linear" 
                }}
             >
                {Math.random() > 0.6 ? '+' : '•'}
             </motion.div>
           ))}
           
           {/* Subtle Horizontal Data Lines */}
           {[...Array(3)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent w-full"
                style={{ top: `${25 * (i + 1)}%` }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i
                }}
              />
           ))}
        </div>

        {/* 4. Twinkling Stars (Dark Mode Only) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-1000">
           {[...Array(50)].map((_, i) => (
             <motion.div
                key={`star-${i}`}
                className="absolute bg-white rounded-full shadow-[0_0_2px_#fff]"
                style={{
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  width: Math.random() * 2 + 1 + 'px',
                  height: Math.random() * 2 + 1 + 'px',
                }}
                animate={{ 
                  opacity: [0.1, 1, 0.1],
                  scale: [1, 1.5, 1] 
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
             />
           ))}
        </div>

        {/* 5. Animated Candlestick Bars (Bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end justify-between px-4 sm:px-10 opacity-20 dark:opacity-30 gap-1 sm:gap-2">
            {[...Array(30)].map((_, i) => {
               const height = 20 + Math.random() * 60;
               const isGreen = Math.random() > 0.4; // Slightly biased to green
               return (
                 <motion.div
                    key={i}
                    className={`w-full max-w-[20px] rounded-t-sm ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}
                    initial={{ height: `${height}%` }}
                    animate={{ height: [`${height}%`, `${Math.random() * 90 + 10}%`, `${height}%`] }}
                    transition={{ 
                      duration: 2 + Math.random() * 4, 
                      repeat: Infinity, 
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: Math.random() * 2 
                    }}
                 />
               );
            })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-block">
            <GlowWrapper>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 mb-4 lg:mb-6 cursor-default">
                <span className="relative flex h-2 sm:h-3 w-2 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 sm:h-3 w-2 sm:w-3 bg-blue-600 dark:bg-blue-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">Trusted Market Research</span>
              </div>
            </GlowWrapper>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlowWrapper>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-4 lg:mb-6 tracking-tight cursor-default">
                Navigate the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                  Markets with Insight
                </span>
              </h1>
            </GlowWrapper>
          </motion.div>

          <motion.div variants={itemVariants}>
            <GlowWrapper>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-4 lg:mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light cursor-default">
                Comprehensive market analysis and research reports designed to help you make informed investment decisions.
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 italic leading-tight">
                Start investing with a plan. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
              </p>
            </GlowWrapper>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-blue-600 rounded-full text-white font-bold text-lg shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 flex items-center">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
            
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-gray-700 dark:text-gray-300 font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-gray-800 transition-colors"
              >
                Book Consultation
              </motion.button>
            </Link>
          </motion.div>


        </motion.div>

        {/* Visual Content - Holographic Market Scanner */}
        <div className="relative h-auto min-h-[300px] sm:h-[450px] lg:h-[600px] w-full flex items-center justify-center perspective-1000 mt-12 sm:mt-16 lg:mt-0 mb-10 lg:mb-0">
           
           {/* Scaling Wrapper for Responsiveness */}
           <div className="relative w-full h-full flex items-center justify-center transform scale-110 sm:scale-90 lg:scale-100 origin-center transition-transform duration-500">
             
             {/* Rotating Rings Background */}
             <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] border border-blue-100 dark:border-blue-900/30 rounded-full absolute border-dashed opacity-60 sm:opacity-100"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] border border-indigo-100 dark:border-indigo-900/30 rounded-full absolute opacity-40 sm:opacity-50"
              />
           </div>

           {/* Hero Image - No Card Container */}
           <div className="relative z-10 w-full flex justify-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="w-full max-w-4xl"
             >
                <img 
                  src={HeroImage}
                  alt="Stock Market Analytics"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
             </motion.div>
           </div>



             {/* Decorative Orb Behind */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
           
           </div> {/* End Scaling Wrapper */}

        </div>
      </div>
    </section>
  );
};

export default Hero;
