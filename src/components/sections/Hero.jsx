import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, ShieldCheck, Briefcase, ArrowRight } from "lucide-react";

const serviceCards = [
  {
    title: "Equity & F&O Research Calls",
    desc: "Clear entry, target and stop-loss with disciplined trade planning.",
    icon: TrendingUp,
  },
  {
    title: "SEBI-Compliant Research Process",
    desc: "Structured and risk-aware recommendation framework.",
    icon: ShieldCheck,
  },
  {
    title: "Dedicated Research Support",
    desc: "Fast query handling and service assistance.",
    icon: Briefcase,
  },
];

const Hero = () => {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -top-20 left-0 h-64 w-64 rounded-full bg-[#dcfce7] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-14 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              Start Trading with
              <span className="block text-[#16a34a]">More Confidence.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Sterling Research provides research analyst services for traders.
              We provide research analyst services only, focused on actionable market research and disciplined execution support.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
              <Link
                to="/contact-us"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3 text-sm sm:text-base font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Start Consultation
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-7 py-3 text-sm sm:text-base font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
              >
                View Research Services
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {serviceCards.map((card) => (
                <div key={card.title} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-left">
                  <div className="w-9 h-9 rounded-lg bg-[#f0fdf4] flex items-center justify-center mb-3">
                    <card.icon className="w-4 h-4 text-[#16a34a]" aria-hidden="true" />
                  </div>
                  <h2 className="text-sm font-bold text-slate-900 leading-tight">{card.title}</h2>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="flex items-end justify-center lg:justify-end gap-4 sm:gap-6"
            aria-label="Mobile style research preview"
          >
            <div className="hidden sm:flex w-[130px] h-[230px] rounded-[28px] border-[6px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden flex-col p-3">
              <div className="h-4 w-16 bg-slate-800 rounded-full mx-auto mb-3" />
              <div className="text-[10px] text-slate-400">Learn & Execute</div>
              <div className="text-xs font-semibold text-white mt-1">Research Basics</div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="h-12 rounded-lg bg-[#0f2a1a] border border-[#1f6b42]" />
                <div className="h-12 rounded-lg bg-[#2b1f0f] border border-[#8a6a26]" />
              </div>
              <div className="mt-3 h-20 rounded-lg bg-slate-900 border border-slate-700" />
            </div>

            <div className="w-[170px] sm:w-[220px] h-[300px] sm:h-[368px] rounded-[34px] border-[7px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden p-4">
              <div className="h-5 w-24 bg-slate-800 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-300">Research Desk</p>
                <p className="text-[10px] text-[#16a34a]">Live Setup</p>
              </div>
              <div className="mt-3 rounded-xl border border-[#1f6b42] bg-[#0f2a1a] p-3">
                <p className="text-[10px] text-slate-400">NIFTY Setup</p>
                <p className="text-lg font-bold text-white mt-1">Buy Above 24,180</p>
                <p className="text-[11px] text-[#22c55e] mt-1">SL 24,060 | TGT 24,320</p>
              </div>
              <div className="mt-4 h-24 rounded-xl border border-[#1f6b42] bg-gradient-to-b from-[#0f2a1a] to-[#0b1d13] p-3 flex items-end gap-1">
                {[28, 40, 26, 50, 35, 62, 44, 58].map((h, idx) => (
                  <span key={idx} className={`w-full rounded-t ${idx % 2 === 0 ? "bg-[#22c55e]" : "bg-[#d4a22a]"}`} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-slate-400">
                <span className="text-[#22c55e]">1D</span>
                <span>1W</span>
                <span>1M</span>
              </div>
            </div>

            <div className="hidden sm:flex w-[130px] h-[230px] rounded-[28px] border-[6px] border-slate-900 bg-slate-950 shadow-2xl overflow-hidden flex-col p-3">
              <div className="h-4 w-16 bg-slate-800 rounded-full mx-auto mb-3" />
              <div className="text-[10px] text-slate-400">Options Call</div>
              <div className="text-xs font-semibold text-white mt-1">BANKNIFTY</div>
              <div className="mt-3 rounded-lg border border-[#1f6b42] bg-[#0f2a1a] p-2">
                <div className="text-[10px] text-slate-400">Strike</div>
                <div className="text-xl font-bold text-white">52000 CE</div>
                <div className="text-[10px] text-[#22c55e] mt-1">Entry 315 | TGT 380</div>
              </div>
              <div className="mt-3 h-20 rounded-lg bg-slate-900 border border-slate-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
