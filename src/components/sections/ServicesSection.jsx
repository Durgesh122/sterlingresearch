import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CandlestickChart, CircleDollarSign, Gem, ShieldCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    slug: 'super-cash-pack',
    title: 'SUPER CASH PACK',
    desc: 'NSE cash segment focused research support for disciplined intraday and short-term trade planning.',
    icon: TrendingUp,
    accent: 'from-[#1e5631] to-[#2f7a46]',
    hoverGlow: 'group-hover:shadow-[0_24px_45px_rgba(30,86,49,0.24)]',
    chip: 'Equity Cash',
  },
  {
    slug: 'super-index-option-pack',
    title: 'SUPER INDEX OPTION PACK',
    desc: 'Structured index option guidance designed for Nifty and BankNifty opportunities with risk-defined approach.',
    icon: CandlestickChart,
    accent: 'from-[#0d9488] to-[#0f766e]',
    hoverGlow: 'group-hover:shadow-[0_24px_45px_rgba(13,148,136,0.22)]',
    chip: 'Index Options',
  },
  {
    slug: 'super-future-pack',
    title: 'SUPER FUTURE PACK',
    desc: 'Futures market research support for intraday and positional setups with clear execution discipline.',
    icon: BarChart3,
    accent: 'from-[#2563eb] to-[#1d4ed8]',
    hoverGlow: 'group-hover:shadow-[0_24px_45px_rgba(37,99,235,0.22)]',
    chip: 'Stock Futures',
  },
  {
    slug: 'super-mcx-pack',
    title: 'SUPER MCX PACK',
    desc: 'Commodity segment recommendations across key MCX contracts with focused risk management view.',
    icon: CircleDollarSign,
    accent: 'from-[#b45309] to-[#92400e]',
    hoverGlow: 'group-hover:shadow-[0_24px_45px_rgba(180,83,9,0.22)]',
    chip: 'Commodity',
  },
  {
    slug: 'super-option-pack',
    title: 'SUPER OPTION PACK',
    desc: 'Options-focused research service for short-term opportunities using practical strategy filters.',
    icon: ShieldCheck,
    accent: 'from-[#7c3aed] to-[#6d28d9]',
    hoverGlow: 'group-hover:shadow-[0_24px_45px_rgba(124,58,237,0.22)]',
    chip: 'Options',
  },
  {
    slug: 'supreme-power-pack',
    title: 'SUPREME POWER PACK',
    desc: 'Multi-segment premium research support crafted for active traders needing broader market coverage.',
    icon: Gem,
    accent: 'from-[#db2777] to-[#be185d]',
    hoverGlow: 'group-hover:shadow-[0_24px_45px_rgba(219,39,119,0.22)]',
    chip: 'Premium Combo',
  },
];

const ServicesSection = () => {
  return (
    <section id='services' className='relative overflow-hidden bg-[linear-gradient(180deg,#f8faff_0%,#f4fbf4_100%)] py-16'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,86,49,0.08),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(240,180,41,0.10),transparent_34%)]' />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-12 max-w-3xl text-center'>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='mb-4 inline-flex items-center gap-2 rounded-full border border-[#d9e8de] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1e5631]'
          >
            <TrendingUp className='h-3.5 w-3.5' />
            Our Service Packs
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className='mb-4 text-3xl font-extrabold text-[#1e5631] md:text-4xl'
          >
            Sterling Research ke 6 flagship services
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className='mx-auto max-w-2xl text-base leading-relaxed text-slate-600'
          >
            Aapke trading style ke hisaab se segment-wise research packs. Har pack mein clear communication, structured support, aur disciplined market approach.
          </motion.p>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.45 }}
                whileHover={{ y: -8 }}
                className={`group relative overflow-hidden rounded-[24px] border border-[#dbe7de] bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-500 ${service.hoverGlow}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                <div className='absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#f0b429] via-[#1e5631] to-[#f0b429] opacity-70' />

                <div className='relative z-10'>
                  <div className='mb-5 flex items-center justify-between'>
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: -6 }}
                      className='inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3f8f4] text-[#1e5631] transition-colors duration-500 group-hover:bg-white/20 group-hover:text-white'
                    >
                      <Icon className='h-6 w-6' />
                    </motion.div>

                    <span className='rounded-full border border-[#dbe8de] bg-[#f8fcf9] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2f6e42] transition-colors duration-500 group-hover:border-white/35 group-hover:bg-white/15 group-hover:text-white'>
                      {service.chip}
                    </span>
                  </div>

                  <h3 className='text-lg font-extrabold leading-snug text-[#17432a] transition-colors duration-500 group-hover:text-white'>
                    {service.title}
                  </h3>

                  <p className='mt-3 text-sm leading-relaxed text-slate-600 transition-colors duration-500 group-hover:text-white/90'>
                    {service.desc}
                  </p>

                  <Link
                    to={`/services/${service.slug}`}
                    className='mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#1e5631] transition-colors duration-500 group-hover:text-white'
                  >
                    View Service Details
                    <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5' />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mt-10 text-center'
        >
          <Link
            to='/pricing'
            className='inline-flex items-center gap-2 rounded-xl bg-[#1e5631] px-8 py-4 text-sm font-bold text-white shadow-[0_14px_28px_rgba(30,86,49,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#184628]'
          >
            Compare All Plans
            <ArrowRight className='h-5 w-5' />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
