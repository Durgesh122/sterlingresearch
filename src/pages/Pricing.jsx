import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ShieldCheck } from 'lucide-react';

const pricingData = [
  {
    name: 'SUPER CASH PACK',
    tagline: 'Pure intraday NSE cash calls',
    description: 'Focused equity research in the NSE cash segment for precision intraday opportunities.',
    monthly: '12,499/-',
    quarterly: '34,999/-',
    highlights: [
      '2-3 daily pure intraday stock recommendations',
      '2 targets with proper stop-loss per trade',
      'Timely follow-ups on all signals',
      'Research-driven market analysis',
      'Complete customer support',
    ],
    link: '/services/super-cash-pack',
  },
  {
    name: 'SUPER INDEX OPTION PACK',
    tagline: 'Nifty, Bank Nifty, Sensex options',
    description: 'Specialized index option trading service for Nifty, Bank Nifty and Sensex.',
    monthly: '12,499/-',
    quarterly: '34,999/-',
    highlights: [
      '1-2 daily index option recommendations',
      '2 targets with proper stop-loss per trade',
      'Advanced technical analysis backed',
      'Timely trade execution windows',
      'Complete customer support',
    ],
    link: '/services/super-index-option-pack',
  },
  {
    name: 'SUPER FUTURE PACK',
    tagline: 'Intraday and positional futures',
    description: 'Intraday trading research service for NSE-listed stocks and derivatives.',
    monthly: '12,499/-',
    quarterly: '34,999/-',
    highlights: [
      '2-3 daily intraday/positional futures calls',
      '2 targets with proper stop-loss per trade',
      'Fundamental and technical research',
      'Timely follow-ups on signals',
      'Complete customer support',
    ],
    link: '/services/super-future-pack',
  },
  {
    name: 'SUPER MCX PACK',
    tagline: 'Commodity F&O opportunities',
    description: 'Comprehensive commodity market recommendations in the F&O segment.',
    monthly: '12,499/-',
    quarterly: '34,999/-',
    highlights: [
      '2-3 daily MCX Future and Option calls',
      '2 targets with proper stop-loss per trade',
      'Technical charts + price action analysis',
      'Timely market intelligence updates',
      'Complete customer support',
    ],
    link: '/services/super-mcx-pack',
  },
  {
    name: 'SUPER OPTION PACK',
    tagline: 'Stock option setups',
    description: 'Specialized research service for stock options traders.',
    monthly: '12,499/-',
    quarterly: '34,999/-',
    highlights: [
      '2-3 daily stock option recommendations',
      '2 targets with proper stop-loss per trade',
      'Advanced technical + fundamental analysis',
      'Timely trade execution guidance',
      'Complete customer support',
    ],
    link: '/services/super-option-pack',
  },
  {
    name: 'SUPREME POWER PACK',
    tagline: 'Premium F&O high-conviction desk',
    description: 'Premium multi-segment F&O advisory service with careful research.',
    quarterly: '1,49,999/-',
    highlights: [
      '3-4 daily intraday/positional F&O calls',
      '2 targets with proper stop-loss per trade',
      'Comprehensive market analysis coverage',
      'Timely follow-ups and expert guidance',
      'Dedicated customer support',
    ],
    link: '/services/supreme-power-pack',
    premium: true,
  },
];

const Pricing = () => {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-[#fffdf7] via-[#fcf9ef] to-[#f4faf5] py-16'>
      <div className='pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-[#f0b429]/20 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-[#1e5631]/20 blur-3xl' />

      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-12'
        >
          <div className='inline-flex items-center gap-2 rounded-full border border-[#e9ddc2] bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1e5631]'>
            <ShieldCheck className='h-3.5 w-3.5 text-[#f0b429]' />
            Transparent Pricing
          </div>

          <h1 className='mt-5 text-4xl md:text-5xl font-black text-slate-900'>
            Sterling Research Service Pricing
          </h1>
          <p className='mt-4 text-lg text-slate-600 max-w-2xl mx-auto'>
            Choose from our 6 specialized trading research packages. All plans include disciplined analysis, timely follow-ups, and complete customer support.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12'>
          {pricingData.map((pack, idx) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`rounded-3xl border p-6 transition-all ${
                pack.premium
                  ? 'border-[#f0b429] bg-gradient-to-br from-[#19482f] via-[#205e3b] to-[#2b7548] text-white shadow-[0_16px_36px_rgba(30,86,49,0.3)]'
                  : 'border-[#e6dbc4] bg-white/95 shadow-sm hover:shadow-[0_12px_28px_rgba(15,23,42,0.12)]'
              }`}
            >
              {pack.premium && (
                <div className='inline-flex items-center gap-1 rounded-full bg-[#f0b429]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#f8cc63] mb-3'>
                  <ShieldCheck className='h-3 w-3' />
                  Premium
                </div>
              )}

              <h2 className='text-xl font-extrabold'>{pack.name}</h2>
              <p className={`mt-1 text-sm ${pack.premium ? 'text-white/80' : 'text-slate-500'}`}>
                {pack.tagline}
              </p>
              <p className={`mt-2 text-sm leading-relaxed ${pack.premium ? 'text-white/85' : 'text-slate-600'}`}>
                {pack.description}
              </p>

              <div className='mt-5 space-y-2'>
                {pack.monthly && (
                  <div className='flex items-center justify-between rounded-xl bg-emerald-50/10 px-3 py-2'>
                    <span className={`text-xs font-bold uppercase tracking-wider ${pack.premium ? 'text-white/70' : 'text-slate-600'}`}>
                      Monthly
                    </span>
                    <span className={`text-lg font-extrabold ${pack.premium ? 'text-[#f8cc63]' : 'text-[#1e5631]'}`}>
                      {pack.monthly}
                    </span>
                  </div>
                )}
                <div className='flex items-center justify-between rounded-xl bg-amber-50/10 px-3 py-2'>
                  <span className={`text-xs font-bold uppercase tracking-wider ${pack.premium ? 'text-white/70' : 'text-slate-600'}`}>
                    Quarterly
                  </span>
                  <span className={`text-lg font-extrabold ${pack.premium ? 'text-[#f8cc63]' : 'text-[#f0b429]'}`}>
                    {pack.quarterly}
                  </span>
                </div>
              </div>

              <div className='mt-5 space-y-2.5 border-t border-white/20 pt-5'>
                {pack.highlights.map((highlight) => (
                  <div key={highlight} className='flex items-start gap-2.5'>
                    <Check className={`h-4 w-4 ${pack.premium ? 'text-[#f8cc63]' : 'text-[#1e5631]'} mt-0.5`} />
                    <p className={`text-sm leading-snug ${pack.premium ? 'text-white/90' : 'text-slate-600'}`}>
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>

              <div className='mt-6 flex gap-2.5'>
                <Link
                  to={pack.link}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                    pack.premium
                      ? 'bg-[#f0b429] text-slate-900 hover:bg-[#f8cc63]'
                      : 'bg-gradient-to-r from-[#1e5631] to-[#14472a] text-white hover:brightness-110'
                  }`}
                >
                  View Details
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='rounded-3xl border border-[#e6dbc4] bg-white p-6 md:p-8 shadow-sm'
        >
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <h2 className='text-lg font-extrabold text-slate-900'>Why Sterling Research?</h2>
              <ul className='mt-3 space-y-2 text-sm text-slate-600'>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-[#1e5631]' />
                  SEBI-aligned communication
                </li>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-[#1e5631]' />
                  Transparent, no hidden charges
                </li>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-[#1e5631]' />
                  Risk-first advisory approach
                </li>
              </ul>
            </div>
            <div>
              <h2 className='text-lg font-extrabold text-slate-900'>Support</h2>
              <ul className='mt-3 space-y-2 text-sm text-slate-600'>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-[#1e5631]' />
                  SMS-based trade alerts
                </li>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-[#1e5631]' />
                  Timely follow-ups on signals
                </li>
                <li className='flex items-center gap-2'>
                  <Check className='h-4 w-4 text-[#1e5631]' />
                  Complete customer support
                </li>
              </ul>
            </div>
            <div>
              <h2 className='text-lg font-extrabold text-slate-900'>Next Steps</h2>
              <p className='mt-3 text-sm text-slate-600'>
                Ready to get started? Contact our team to discuss which service best fits your trading profile.
              </p>
              <Link
                to='/contact-us'
                className='mt-4 inline-flex items-center gap-2 rounded-xl bg-[#1e5631] px-4 py-2 text-sm font-bold text-white'
              >
                Contact Us
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
