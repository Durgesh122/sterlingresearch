import React from 'react';
import { motion } from "framer-motion";
import { UserPlus, PhoneCall, BarChart2, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    step: "01",
    icon: PhoneCall,
    title: "Contact Us",
    desc: "Call or WhatsApp us to get a free initial consultation with our expert research team.",
    color: "text-[#f0a500]",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    step: "02",
    icon: UserPlus,
    title: "Risk Profiling",
    desc: "We understand your investment goals, risk appetite and capital to suggest the best suitable service.",
    color: "text-[#1e5631]",
    bg: "bg-[#fffaf0]",
    border: "border-blue-100",
  },
  {
    step: "03",
    icon: BarChart2,
    title: "Subscribe a Plan",
    desc: "Choose your preferred research service plan with transparent fixed fee. No hidden charges.",
    color: "text-[#d4920a]",
    bg: "bg-[#f8fbf4]",
    border: "border-emerald-100",
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Receive Research Tips",
    desc: "Get timely research calls on WhatsApp & SMS with proper entry, target and stop-loss levels.",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    step: "05",
    icon: CheckCircle,
    title: "Book Profits",
    desc: "Follow our research recommendations with proper risk management and book consistent profits.",
    color: "text-rose-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-16 bg-[#f8faff] relative overflow-hidden" id="process">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#e9f5ef] text-[#1e5631] rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-[#cfe3d8]"
          >
            How It Works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-[#1e5631] mb-4"
          >
            Simple Process to Get Started
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-base"
          >
            Getting started with Sterling Research is quick and simple. Follow these easy steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-200 via-blue-200 to-amber-200 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              {/* Step Icon */}
              <div className={`w-16 h-16 ${step.bg} border-2 ${step.border} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm bg-white`}>
                <step.icon className={`w-7 h-7 ${step.color}`} />
              </div>

              {/* Step Number */}
              <div className={`text-xs font-bold ${step.color} mb-2 tracking-widest`}>
                STEP {step.step}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-[#1e5631] mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f0a500] to-[#d4920a] hover:from-[#f0b429] hover:to-[#f0a500] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#f0a500]/25 hover:scale-105"
          >
            <PhoneCall className="w-5 h-5" />
            Get Started Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
