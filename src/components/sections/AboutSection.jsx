import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import stockMarketLogo from '../../assets/stockmarketlogo.png';

const assurancePills = [
  'Equity, F&O and commodity research support',
  'Official support channels and disciplined follow-ups',
  'Risk-aware guidance for responsible market participation',
];

const trustItems = [
  'Defined trade communication with proper execution clarity',
  'Fixed-fee service model with transparent support process',
  'Quality-focused research instead of excessive signal noise',
];

const tickerRows = [
  { name: 'Equity Research', value: 'Illustrative' },
  { name: 'F&O Strategy', value: 'Sample View' },
  { name: 'Commodity Desk', value: 'Demo Panel' },
];

const AboutSection = () => {
  return (
    <section id='about' className='relative overflow-hidden border-b border-gray-100 bg-white py-16'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,180,41,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(30,86,49,0.10),transparent_34%)]' />
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.035]'
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,86,49,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(30,86,49,0.22) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.02fr_1.18fr] lg:gap-14'>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className='relative mx-auto w-full max-w-[38rem]'
          >
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className='relative overflow-hidden rounded-[34px] border border-[#d7ddcb] bg-gradient-to-br from-[#0f3e2c] via-[#124a35] to-[#0b2c1f] p-5 md:p-6 shadow-[0_28px_56px_rgba(7,19,14,0.34)]'
            >
              <div className='pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-[#f0b429]/20 blur-3xl' />
              <div className='pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-[#64b56c]/20 blur-3xl' />

              <div className='relative z-10 rounded-[24px] border border-white/15 bg-[#0f2f22]/75 p-4 backdrop-blur-sm sm:p-5'>
                <div className='flex items-center justify-between gap-3 border-b border-white/10 pb-3'>
                  <div>
                    <p className='text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c8ddc7]'>Sterling Research Terminal</p>
                    <p className='mt-1 text-sm font-semibold text-white/95'>Research Snapshot</p>
                  </div>
                  <motion.div
                    animate={{ opacity: [0.45, 1, 0.45], scale: [0.92, 1.08, 0.92] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className='inline-flex items-center gap-2 rounded-full border border-[#78c67d]/60 bg-[#1d5a3f]/70 px-3 py-1 text-[11px] font-semibold text-[#d9f4d8]'
                  >
                    <span className='h-1.5 w-1.5 rounded-full bg-[#97f59d]' />
                    Illustrative
                  </motion.div>
                </div>

                <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1.35fr_0.85fr]'>
                  <div className='rounded-2xl border border-[#7ba67f]/40 bg-gradient-to-b from-[#124734] to-[#0f3628] p-3'>
                    <div className='flex items-center justify-between text-[11px] font-semibold text-[#c6dfc5]'>
                      <span>Sector Strength</span>
                      <span>Sample</span>
                    </div>
                    <div className='mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#0b261b]/80 p-2'>
                      <img
                        src={stockMarketLogo}
                        alt='Stock market logo'
                        className='h-40 w-full rounded-lg object-cover'
                      />
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className='rounded-2xl border border-[#89b48c]/40 bg-[#123f2e]/85 p-3'
                    >
                      <p className='text-[11px] font-semibold uppercase tracking-wider text-[#c6dfc5]'>Research Calls</p>
                      <p className='mt-2 text-2xl font-black text-[#f8d056]'>246</p>
                      <p className='text-xs text-[#d5ead2]'>Active tracking this quarter</p>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, -5, 0], rotate: [0, -0.8, 0] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      className='rounded-2xl border border-[#89b48c]/40 bg-[#0f3526]/85 p-3'
                    >
                      <p className='text-[11px] font-semibold uppercase tracking-wider text-[#c6dfc5]'>Risk Guard</p>
                      <p className='mt-2 text-xl font-black text-[#9ee184]'>92%</p>
                      <p className='text-xs text-[#d5ead2]'>Trades with defined stop framework</p>
                    </motion.div>
                  </div>
                </div>

                <div className='mt-4 grid grid-cols-1 gap-2'>
                  {tickerRows.map((row, index) => (
                    <motion.div
                      key={row.name}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.15 + index * 0.08, duration: 0.35 }}
                      className='flex items-center justify-between rounded-xl border border-white/10 bg-[#123a2a]/75 px-3 py-2'
                    >
                      <div className='flex items-center gap-2'>
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
                          className='h-2 w-2 rounded-full bg-[#8ee68e]'
                        />
                        <span className='text-[12px] font-semibold tracking-wide text-[#e3f4de]'>{row.name}</span>
                      </div>
                      <span className='text-[12px] font-bold text-[#d4ebd2]'>{row.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className='mb-5 inline-flex items-center gap-2 rounded-full border border-[#cfe3d8] bg-[#e9f5ef] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1e5631]'
            >
              <BadgeCheck className='h-3.5 w-3.5 text-[#1e5631]' />
              About Us
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className='text-3xl font-black leading-tight text-slate-900 md:text-5xl'
            >
              Research-led guidance for
              <span className='block bg-gradient-to-r from-[#1e5631] via-[#2d7744] to-[#f0b429] bg-clip-text text-transparent'>
                serious market participation
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.5 }}
              className='mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg'
            >
              Sterling Research focuses on actionable market research across equity, futures, options and commodities. Our approach combines analysis discipline, clear communication and service transparency so clients can act with better understanding.
            </motion.p>

            <div className='mt-6 flex flex-wrap gap-3'>
              {assurancePills.map((pill, index) => (
                <motion.div
                  key={pill}
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18 + index * 0.07, duration: 0.35 }}
                  className='rounded-full border border-[#e5dbc5] bg-[#fffaf0] px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm'
                >
                  {pill}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.45 }}
              className='mt-8 rounded-[28px] border border-[#ece1ca] bg-white p-6 shadow-[0_16px_30px_rgba(15,23,42,0.06)]'
            >
              <h3 className='text-lg font-extrabold text-slate-900'>What clients value here</h3>
              <div className='mt-4 space-y-3'>
                {trustItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.32 + index * 0.07, duration: 0.35 }}
                    className='flex items-start gap-3'
                  >
                    <span className='mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#f3f9f4] text-[#1e5631]'>
                      <ArrowRight className='h-4 w-4' />
                    </span>
                    <p className='text-sm leading-relaxed text-slate-600'>{item}</p>
                  </motion.div>
                ))}
              </div>

              <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3'>
                <div className='rounded-xl border border-[#dfeadf] bg-[#f8fcf8] px-3 py-2 text-center'>
                  <ShieldCheck className='mx-auto h-4 w-4 text-[#1e5631]' />
                  <p className='mt-1 text-xs font-semibold text-slate-700'>Compliance-first</p>
                </div>
                <div className='rounded-xl border border-[#f0e5cc] bg-[#fffaf0] px-3 py-2 text-center'>
                  <TrendingUp className='mx-auto h-4 w-4 text-[#a8790a]' />
                  <p className='mt-1 text-xs font-semibold text-slate-700'>Research-backed</p>
                </div>
                <div className='rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3 py-2 text-center'>
                  <Sparkles className='mx-auto h-4 w-4 text-slate-700' />
                  <p className='mt-1 text-xs font-semibold text-slate-700'>Clear execution</p>
                </div>
              </div>

              <div className='mt-6 flex flex-wrap gap-3'>
                <Link
                  to='/about'
                  className='inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1e5631] to-[#14472a] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(30,86,49,0.26)] transition-all hover:brightness-110'
                >
                  Learn More
                  <ArrowRight className='h-4 w-4' />
                </Link>
                <Link
                  to='/contact-us'
                  className='inline-flex items-center gap-2 rounded-xl border border-[#e7dcc4] bg-[#fff9ed] px-5 py-3 text-sm font-bold text-[#1e5631] transition-colors hover:bg-[#fff4dd]'
                >
                  Talk to Our Team
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
