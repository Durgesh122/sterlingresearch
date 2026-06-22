import React from 'react';
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e5631] via-[#14472a] to-[#1e5631]" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#f0a500]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#1e5631]/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0a500]/10 border border-[#fde68a] rounded-full text-[#d4920a] text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-[#f0b429] rounded-full animate-pulse" />
            Research Support Available
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Start Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Research Service
            </span>{" "}
            Today
          </h2>

          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Connect with Sterling Research for SEBI-registered market research support. 
            Discuss your requirements with our team today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-[#f0a500] to-[#d4920a] hover:from-[#f0b429] hover:to-[#f0a500] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#f0a500]/25 hover:shadow-[#f0a500]/40 hover:scale-105 text-base"
            >
              <PhoneCall className="w-5 h-5" />
              Call Now – Talk to Research Desk
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#1e5631] hover:bg-[#184628] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#1e5631]/20 hover:scale-105 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#1e5631] rounded-full" />
              No Hidden Charges
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#f0b429] rounded-full" />
              SEBI Registered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#d4920a] rounded-full" />
              Fixed Fee Structure
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              Risk Management Focused
            </span>
          </div>

          <p className="text-white/35 text-xs mt-6">
            * Investments in securities market are subject to market risks. Read all related documents carefully before investing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
