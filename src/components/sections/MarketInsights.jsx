import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaChartBar, FaRegClock, FaRegNewspaper, FaArrowCircleRight } from 'react-icons/fa';

const fallbackInsights = [
  {
    title: 'Market Sentiment: Bullish vs Bearish',
    description: 'Global markets show mixed signals as investors weigh inflation data against central bank policies. Risk appetite remains cautious but opportunistic.',
    url: '#',
    source: 'Monexaa Analysis',
    published_at: new Date().toISOString()
  },
  {
    title: 'Top Movers & Momentum Stocks',
    description: 'Tech and Banking sectors lead the rally while potential breakout stocks show high volume activity. Watch for key resistance levels.',
    url: '#',
    source: 'Market Watch',
    published_at: new Date().toISOString()
  },
  {
    title: 'Sector Rotation Strategies',
    description: 'Capital is flowing from defensive to cyclical sectors. Energy and Auto indices are showing strong relative strength this week.',
    url: '#',
    source: 'Sector Focus',
    published_at: new Date().toISOString()
  },
  {
    title: 'Global Macro Trends',
    description: 'Upcoming Federal Reserve meeting minutes and ECB decisions are likely to drive short-term volatility in currency and bond markets.',
    url: '#',
    source: 'Macro Brief',
    published_at: new Date().toISOString()
  },
  {
    title: 'Earnings Season Highs & Lows',
    description: 'Q3 earnings reports are exceeding expectations for major blue-chip companies, providing support for broader market indices.',
    url: '#',
    source: 'Earnings Report',
    published_at: new Date().toISOString()
  },
  {
    title: 'Volatility & Option Data',
    description: 'Implied volatility remains low despite geopolitical tensions. Put/Call ratios suggest a balanced market outlook for the near term.',
    url: '#',
    source: 'Derivatives Desk',
    published_at: new Date().toISOString()
  },
];


export default function MarketInsights() {
  // Memoize fallbackInsights to avoid unnecessary recalculation
  const insights = useMemo(() => fallbackInsights, []);
  const loading = false;

  // Unique gradients for each card
  const cardGradients = [
    "from-blue-400/80 via-indigo-200/60 to-white/60",
    "from-pink-400/80 via-red-200/60 to-white/60",
    "from-green-400/80 via-green-200/60 to-white/60",
    "from-yellow-400/80 via-yellow-200/60 to-white/60",
    "from-purple-400/80 via-purple-200/60 to-white/60",
    "from-cyan-400/80 via-cyan-200/60 to-white/60",
  ];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-200 via-indigo-100 to-white opacity-60 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 right-0 w-[320px] h-[320px] rounded-full bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-100 opacity-50 blur-2xl animate-pulse-slower" />
        <div className="absolute bottom-0 left-1/2 w-[260px] h-[260px] rounded-full bg-gradient-to-br from-emerald-200 via-cyan-100 to-white opacity-40 blur-2xl animate-pulse-slowest" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10 px-2 md:px-0">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-white bg-gradient-to-r from-[#6366f1] via-[#0ea5e9] to-[#22d3ee] px-7 py-2 rounded-full shadow-lg mb-3 border-2 border-[#6366f1]/30 animate-gradient-x bg-[length:200%_200%]"
          >
            <FaChartBar className="text-lg drop-shadow" />
            <span className="font-bold tracking-wide text-base">Live Market Pulse</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#312e81] via-[#6366f1] to-[#0ea5e9] text-center mb-2 font-serif drop-shadow-sm animate-gradient-x bg-[length:200%_200%]"
          >
            Insights & News Highlights
          </motion.h2>
          <div className="h-2 w-32 bg-gradient-to-r from-[#6366f1] via-[#0ea5e9] to-[#22d3ee] rounded-full mb-4 shadow-md animate-gradient-x bg-[length:200%_200%]" />
          <p className="text-gray-700 text-center max-w-2xl text-lg">
            Get the latest market trends, expert commentary, and actionable news in a vibrant, interactive format.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-white/40 backdrop-blur-md shadow-2xl border border-white/30 p-7 h-72 flex flex-col animate-pulse">
                <div className="h-5 bg-[#6366f1]/30 rounded w-1/3 mb-4"></div>
                <div className="h-7 bg-[#0ea5e9]/10 rounded w-full mb-3"></div>
                <div className="h-6 bg-[#0ea5e9]/10 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-[#0ea5e9]/10 rounded w-full mb-2"></div>
                <div className="h-3 bg-[#6366f1]/20 rounded w-2/3 mb-2"></div>
                <div className="mt-auto flex gap-2 items-center">
                  <div className="h-9 w-9 bg-[#6366f1]/10 rounded-full"></div>
                  <div className="h-4 w-20 bg-[#0ea5e9]/20 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            insights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.07,
                  y: -12,
                  rotate: [0, 2, -2, 0],
                  boxShadow: '0 24px 56px 0 rgba(99,102,241,0.18)',
                  filter: 'brightness(1.06)',
                  transition: { type: 'spring', stiffness: 220, damping: 18 }
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 18, delay: idx * 0.04 }}
                className={`relative rounded-3xl border border-white/40 shadow-xl group transition-all duration-300 overflow-hidden flex flex-col h-full backdrop-blur-xl bg-opacity-70 min-h-[340px] bg-gradient-to-br ${cardGradients[idx % cardGradients.length]}`}
                style={{ WebkitBackdropFilter: 'blur(14px)', backdropFilter: 'blur(14px)' }}
              >
                {/* Accent bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#6366f1] via-[#a5b4fc] to-[#0ea5e9] opacity-80"></div>
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-2 text-xs font-bold text-[#0ea5e9] uppercase bg-[#e0f2fe]/80 px-3 py-1 rounded-full shadow-sm">
                      <span className="bg-[#6366f1] text-white rounded-full p-1 mr-1"><FaRegNewspaper /></span>
                      {item.source || 'News'}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#6366f1] bg-[#e0e7ff]/80 px-2 py-1 rounded-full">
                      <FaRegClock />
                      {item.published_at ? new Date(item.published_at).toLocaleDateString() : 'Now'}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#312e81] mb-3 leading-tight line-clamp-2 transition-all duration-300 group-hover:text-[#6366f1] group-hover:tracking-wide group-hover:scale-105">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-base mb-6 flex-1 line-clamp-3">
                    {item.description || item.excerpt || 'Click to read more...'}
                  </p>
                  <div className="mt-auto pt-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-[#6366f1] to-[#0ea5e9] px-4 py-2 rounded-full font-semibold shadow hover:from-[#0ea5e9] hover:to-[#6366f1] hover:text-[#312e81] transition-all duration-200 text-sm group"
                    >
                      Read More <FaArrowCircleRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
