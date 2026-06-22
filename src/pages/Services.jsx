import React from 'react';
import { motion } from "framer-motion";
import { TrendingUp, BarChart2, Briefcase, DollarSign, ShieldCheck, LineChart, CheckCircle, ArrowRight, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: TrendingUp,
    title: "Equity Cash",
    color: "from-blue-500 to-blue-700",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
    badge: "Most Popular",
    desc: "Expert intraday and short-term delivery research on equity stocks with clear entry, target and stop-loss levels.",
    features: ["Intraday Trading Calls", "Short-Term Delivery Research", "Weekly Market Outlook", "SMS & WhatsApp Alerts"]
  },
  {
    icon: BarChart2,
    title: "Stock Futures",
    color: "from-purple-500 to-purple-700",
    lightBg: "bg-purple-50",
    iconColor: "text-purple-600",
    badge: null,
    desc: "Research-based recommendations for stock futures trading with defined risk-reward strategy and proper hedging.",
    features: ["Stock F&O Research", "Positional Calls", "Risk-Reward Analysis", "Hedging Strategies"]
  },
  {
    icon: LineChart,
    title: "Nifty & BankNifty",
    color: "from-emerald-500 to-emerald-700",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    badge: "High Returns",
    desc: "Index option strategies in Nifty and BankNifty with proper risk-reward ratio, expiry strategies and hedging.",
    features: ["Nifty Option Calls", "BankNifty Research Support", "Expiry Day Strategy", "Option Chain Analysis"]
  },
  {
    icon: DollarSign,
    title: "Commodity (MCX)",
    color: "from-amber-500 to-amber-700",
    lightBg: "bg-amber-50",
    iconColor: "text-[#d4920a]",
    badge: null,
    desc: "Technical and fundamental analysis for Gold, Silver, Crude Oil, and other MCX commodities.",
    features: ["Gold & Silver Research", "Crude Oil Analysis", "Natural Gas Calls", "Daily MCX Report"]
  },
  {
    icon: Briefcase,
    title: "HNI Services",
    color: "from-rose-500 to-rose-700",
    lightBg: "bg-rose-50",
    iconColor: "text-rose-600",
    badge: "Premium",
    desc: "Dedicated premium research and support for High Net-worth Individuals with personalized portfolio guidance.",
    features: ["Dedicated Relationship Manager", "Portfolio Review", "Risk Profiling", "Priority Support"]
  },
  {
    icon: ShieldCheck,
    title: "Portfolio Advisory",
    color: "from-cyan-500 to-cyan-700",
    lightBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    badge: null,
    desc: "Comprehensive portfolio management advice with risk profiling, capital protection and long-term wealth building.",
    features: ["Portfolio Analysis", "Asset Allocation", "Rebalancing Guidance", "Long-Term Planning"]
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-[#f8faff]">
      {/* Hero Banner */}
      <div className="bg-[#1e5631] py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0a500]/10 border border-[#f0a500]/30 rounded-full text-[#f0b429] text-sm font-semibold mb-4"
          >
            Our Services
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            Research Services We Offer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-blue-200/70 text-lg max-w-2xl mx-auto"
          >
            SEBI Registered expert research across all market segments. Choose the service that best matches your trading style.
          </motion.p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group relative"
            >
              <div className={`h-1.5 w-full bg-gradient-to-r ${service.color}`} />
              {service.badge && (
                <div className="absolute top-5 right-5">
                  <span className="px-2 py-0.5 bg-[#fef3c7] text-[#b45309] text-xs font-bold rounded-full border border-[#fde68a]">
                    {service.badge}
                  </span>
                </div>
              )}
              <div className="p-6">
                <div className={`w-12 h-12 ${service.lightBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <h2 className="text-xl font-bold text-[#1e5631] mb-2">{service.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#d4920a] hover:text-[#b45309]"
                >
                  Subscribe Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#1e5631] rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0a500]/5 rounded-full blur-3xl" />
          <h2 className="text-3xl font-extrabold text-white mb-3">Not sure which service is right for you?</h2>
          <p className="text-slate-100 mb-8 max-w-xl mx-auto">Our expert team will help you choose the best plan based on your risk profile and investment goals.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#f0a500] to-[#d4920a] hover:from-[#f0b429] hover:to-[#f0a500] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#f0a500]/25 hover:scale-105"
          >
            <PhoneCall className="w-5 h-5" />
            Contact Research Desk
          </Link>
          <p className="text-slate-100 text-xs mt-4">* Investments in securities market are subject to market risks. Read all related documents carefully.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
