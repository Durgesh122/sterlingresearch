import React, { useState } from "react";
import { FaChartLine, FaBitcoin, FaOilCan, FaDollarSign, FaArrowUp, FaArrowDown, FaBuilding } from "react-icons/fa";
import { SiAirtable } from "react-icons/si";
import { motion } from "framer-motion";
// import TradingViewTicker from './TradingViewTicker'; // Uncomment if you have this component

const MARKET_DATA = [
  { id: "nifty", name: "NIFTY 50", price: 24852.15, change: 125.30, percent: 0.51, icon: FaChartLine, gradient: "from-green-400/80 via-green-200/60 to-white/60" },
  { id: "banknifty", name: "BANK NIFTY", price: 52100.40, change: -85.10, percent: -0.16, icon: SiAirtable, gradient: "from-pink-400/80 via-red-200/60 to-white/60" },
  { id: "sensex", name: "SENSEX", price: 81345.60, change: 350.25, percent: 0.43, icon: FaChartLine, gradient: "from-blue-400/80 via-blue-200/60 to-white/60" },
  { id: "gold", name: "GOLD (10g)", price: 72450.00, change: 120.00, percent: 0.17, icon: FaBitcoin, gradient: "from-yellow-400/80 via-yellow-200/60 to-white/60" },
  { id: "crude", name: "CRUDE OIL", price: 6450.00, change: -45.00, percent: -0.69, icon: FaOilCan, gradient: "from-gray-700/80 via-gray-400/60 to-white/60" },
  { id: "usdinr", name: "USD/INR", price: 83.45, change: 0.05, percent: 0.06, icon: FaDollarSign, gradient: "from-blue-600/80 via-blue-200/60 to-white/60" },
  { id: "reliance", name: "RELIANCE", price: 2985.50, change: 15.20, percent: 0.51, icon: FaBuilding, gradient: "from-emerald-400/80 via-emerald-200/60 to-white/60" },
  { id: "tcs", name: "TCS", price: 4120.30, change: -20.10, percent: -0.49, icon: FaBuilding, gradient: "from-purple-400/80 via-purple-200/60 to-white/60" },
  { id: "hdfc", name: "HDFCBANK", price: 1650.75, change: 10.50, percent: 0.64, icon: FaBuilding, gradient: "from-cyan-400/80 via-cyan-200/60 to-white/60" },
  { id: "icici", name: "ICICIBANK", price: 1120.35, change: 5.15, percent: 0.46, icon: FaBuilding, gradient: "from-orange-400/80 via-orange-200/60 to-white/60" },
];


export default function LiveMarketDemo() {
  const [marketData] = useState(MARKET_DATA);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(value).replace('₹', '');
  };

  return (
    <section
      className="relative py-14 sm:py-20 overflow-hidden"
      id="live-market"
    >
      {/* Animated Gradient Background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-green-300 via-blue-200 to-yellow-100 opacity-60 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 right-0 w-[340px] h-[340px] rounded-full bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 opacity-50 blur-2xl animate-pulse-slower" />
        <div className="absolute bottom-0 left-1/2 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-emerald-200 via-cyan-100 to-white opacity-40 blur-2xl animate-pulse-slowest" />
      </motion.div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-red-100 via-yellow-100 to-green-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 animate-pulse"></span>
            Live Market Status
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#003E29] via-[#F59E0B] to-[#003E29] mb-4 font-serif drop-shadow-lg"
          >
            Market Pulse
          </motion.h2>
          <div className="h-1.5 w-28 bg-gradient-to-r from-[#003E29] via-[#F59E0B] to-[#003E29] mx-auto rounded-full mb-6 shadow-md"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg font-medium">
            Real-time tracking of major indices and stocks. Stay updated with every tick.
          </p>
        </div>

        {/* Market Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {marketData.map((item, idx) => (
            <MarketCard key={item.id} data={item} formatCurrency={formatCurrency} idx={idx} />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 text-center text-xs text-gray-400">
          * Data provided for informational purposes only. Prices are delayed by 15 mins.
        </div>
      </div>
    </section>
  );
}

function MarketCard({ data, formatCurrency, idx }) {
  const isPositive = data.change >= 0;
  // Unique glassmorphism + gradient for each card
  const glassGradient = `bg-gradient-to-br ${data.gradient}`;
  // Subtle floating/tilt animation
  const floatVariants = {
    initial: { opacity: 0, y: 24, rotate: 0 },
    animate: { opacity: 1, y: 0, rotate: [0, 2, -2, 0] },
    hover: { y: -10, scale: 1.05, rotate: [0, 3, -3, 0], boxShadow: "0 12px 32px -4px rgba(0,0,0,0.13)", filter: "brightness(1.07)" },
  };
  return (
    <motion.div
      layout
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      variants={floatVariants}
      transition={{ type: "spring", stiffness: 180, damping: 18, delay: idx * 0.04 }}
      className={`relative rounded-2xl p-5 border border-white/40 shadow-xl group transition-all duration-300 ${glassGradient} backdrop-blur-xl bg-opacity-70 overflow-hidden min-h-[140px] flex flex-col justify-between`}
      style={{
        boxShadow: "0 4px 32px 0 rgba(0,0,0,0.07)",
      }}
    >
      {/* Glow effect */}
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/30 rounded-full blur-2xl opacity-60 z-0" />
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg shadow-md ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} transition-all duration-200`}>
            <data.icon size={20} />
          </div>
          <span className="font-bold text-gray-800 text-sm drop-shadow-sm tracking-wide">
            {data.name}
          </span>
        </div>
        <FaChartLine className={`text-xs opacity-50 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
      </div>
      <div className="flex flex-col relative z-10">
        <div className="text-xl font-extrabold text-gray-900 flex items-center gap-1 drop-shadow-sm">
          <span className="text-xs text-gray-400 font-normal">₹</span>
          {formatCurrency(data.price)}
        </div>
        <div className={`text-xs font-semibold flex items-center mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <FaArrowUp className="mr-1" size={10} /> : <FaArrowDown className="mr-1" size={10} />}
          {Math.abs(data.change).toFixed(2)} ({Math.abs(data.percent).toFixed(2)}%)
        </div>
      </div>
    </motion.div>
  );
}