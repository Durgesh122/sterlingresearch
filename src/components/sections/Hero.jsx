import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BarChart2, ShieldCheck, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] bg-purple-600/20 rounded-full blur-[80px] animate-pulse delay-700" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      
      {/* Subtle Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/40 border border-blue-500/30 text-blue-300 mb-6 backdrop-blur-sm"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium tracking-wide">#1 Market Research Firm</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Navigate the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Markets with Confidence
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Data-driven insights, expert advisory, and personalized wealth management strategies designed to maximize your returns in a volatile world.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-blue-600 rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </Link>
            
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full text-white font-semibold text-lg border border-gray-600 hover:border-white transition-colors backdrop-blur-sm"
              >
                Book Consultation
              </motion.button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 text-gray-400">
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-3xl font-bold text-white">5K+</span>
              <span className="text-sm">Active Clients</span>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-3xl font-bold text-white">98%</span>
              <span className="text-sm">Success Rate</span>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-3xl font-bold text-white">24/7</span>
              <span className="text-sm">Expert Support</span>
            </div>
          </div>
        </motion.div>

        {/* Visual Content (Floating Cards/3D effect) */}
        <div className="relative h-[500px] hidden lg:block perspective-1000">
          {/* Main Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl p-6 flex flex-col justify-between z-20"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-500/20 rounded-2xl">
                <TrendingUp className="text-blue-400 w-8 h-8" />
              </div>
              <span className="text-green-400 font-bold text-sm bg-green-400/10 px-2 py-1 rounded-full">+24.5%</span>
            </div>
            <div>
              <div className="h-32 w-full bg-gradient-to-t from-blue-500/20 to-transparent rounded-xl mb-4 relative overflow-hidden">
                 {/* Mock Chart Line */}
                 <svg className="absolute bottom-0 left-0 w-full h-full p-2" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M0,50 L10,45 L20,30 L30,35 L40,25 L50,40 L60,15 L70,20 L80,5 L90,10 L100,0 V50 Z" fill="url(#grad)" fillOpacity="0.3" />
                    <path d="M0,50 L10,45 L20,30 L30,35 L40,25 L50,40 L60,15 L70,20 L80,5 L90,10 L100,0" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <defs>
                       <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                       </linearGradient>
                    </defs>
                 </svg>
              </div>
              <h3 className="text-white text-xl font-bold">Growth Portfolio</h3>
              <p className="text-gray-400 text-sm">Monthly Performance</p>
            </div>
          </motion.div>

          {/* Floating Orbiting Elements */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 z-10 p-4 bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl"
          >
            <BarChart2 className="w-6 h-6 text-purple-400" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 left-10 z-30 p-4 bg-gray-800/80 backdrop-blur-md rounded-2xl border border-gray-700 shadow-xl"
          >
             <ShieldCheck className="w-6 h-6 text-green-400" />
          </motion.div>
          
          <motion.div
             animate={{ x: [0, 15, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
             className="absolute top-1/3 left-0 z-0 p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
          >
             <Globe className="w-5 h-5 text-indigo-400" />
          </motion.div>

          {/* Decorative Circle Behind */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
