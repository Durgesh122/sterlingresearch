import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  UserCheck,
  Phone,
  BadgeCheck,
  CircleDollarSign,
  ArrowRight,
  Sparkles,
  Landmark,
  Headset,
  LineChart,
  WalletCards,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: ShieldCheck,
    eyebrow: 'Compliance First',
    label: 'SEBI Registered Framework',
    desc: 'Advisory communication aligned with registered research analyst standards and structured disclosure practices.',
    tone: 'from-[#fff7df] to-white',
    iconWrap: 'bg-[#fff1c9] text-[#d79a12]',
    border: 'border-[#f1dfac]',
    wide: true,
  },
  {
    icon: UserCheck,
    eyebrow: 'Client Suitability',
    label: 'Risk Profiling',
    desc: 'Service guidance shaped around client profile, segment preference and risk appetite.',
    tone: 'from-[#f5fbf5] to-white',
    iconWrap: 'bg-[#e8f6eb] text-[#1e5631]',
    border: 'border-[#d7eadb]',
  },
  {
    icon: CircleDollarSign,
    eyebrow: 'Pricing Clarity',
    label: 'Transparent Fixed Fee',
    desc: 'No profit-sharing promises. No hidden fee structure. Just clear pricing.',
    tone: 'from-[#fff8eb] to-white',
    iconWrap: 'bg-[#fff0d2] text-[#1e5631]',
    border: 'border-[#efdfbd]',
  },
  {
    icon: LineChart,
    eyebrow: 'Execution Logic',
    label: 'Defined Trade Levels',
    desc: 'Recommendations are shared with practical entry, target and stop-loss clarity.',
    tone: 'from-[#f5fbf6] to-white',
    iconWrap: 'bg-[#e9f6ec] text-[#1e5631]',
    border: 'border-[#d9eadb]',
  },
  {
    icon: Headset,
    eyebrow: 'Support Layer',
    label: 'Dedicated Assistance',
    desc: 'Official support channels stay available for service guidance and follow-ups.',
    tone: 'from-[#f8f1ff] to-white',
    iconWrap: 'bg-[#efe2ff] text-[#7c3aed]',
    border: 'border-[#e7d8ff]',
  },
  {
    icon: WalletCards,
    eyebrow: 'Process Discipline',
    label: 'Responsible Advisory Flow',
    desc: 'Quality setups, timely follow-ups and disciplined communication remain the focus.',
    tone: 'from-[#f4faf5] to-white',
    iconWrap: 'bg-[#e6f4ea] text-[#1e5631]',
    border: 'border-[#d5e8d9]',
  },
];

const assurancePoints = [
  { icon: Landmark, text: 'Official communication channels only' },
  { icon: BadgeCheck, text: 'Defined stop-loss and target framework' },
  { icon: Sparkles, text: 'Transparent fixed-fee service structure' },
];

const StatsSection = () => {
  return (
    <section className='relative overflow-hidden border-b border-[#eee4cf] bg-gradient-to-b from-[#fffdf7] via-white to-[#f7fbf5] py-16'>
      <div
        className='pointer-events-none absolute inset-0 opacity-35'
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,86,49,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,86,49,0.05) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className='pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-[#f0b429]/20 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 -left-16 h-72 w-72 rounded-full bg-[#1e5631]/18 blur-3xl' />

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-[1.02fr_1.58fr] lg:items-start'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className='lg:sticky lg:top-28'
          >
            <div className='inline-flex items-center gap-2 rounded-full border border-[#eadfbe] bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1e5631]'>
              <BadgeCheck className='h-3.5 w-3.5 text-[#f0b429]' />
              Trusted Research Framework
            </div>

            <h2 className='mt-4 text-3xl md:text-4xl font-black leading-tight text-slate-900'>
              Why serious traders choose
              <span className='block bg-gradient-to-r from-[#1e5631] via-[#2d7744] to-[#f0b429] bg-clip-text text-transparent'>
                Sterling Research
              </span>
            </h2>

            <p className='mt-4 max-w-xl text-base md:text-lg leading-relaxed text-slate-600'>
              We built this platform for clients who value compliance, process clarity and practical market guidance over noisy promises and random tip flows.
            </p>

            <div className='mt-6 rounded-[28px] border border-[#e4d9c0] bg-white/95 p-5 shadow-sm'>
              <p className='text-sm font-semibold text-slate-800'>What stays standard across every service</p>
              <div className='mt-4 space-y-3'>
                {assurancePoints.map((item) => (
                  <div key={item.text} className='flex items-start gap-3'>
                    <span className='inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#f6fbf6] text-[#1e5631]'>
                      <item.icon className='h-4.5 w-4.5' />
                    </span>
                    <p className='pt-1 text-sm text-slate-600'>{item.text}</p>
                  </div>
                ))}
              </div>

              <Link
                to='/pricing'
                className='mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1e5631] to-[#14472a] px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(30,86,49,0.28)] transition-all hover:brightness-110'
              >
                Explore Pricing
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className={`group relative overflow-hidden rounded-[30px] border ${feature.border} bg-gradient-to-br ${feature.tone} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.10)] ${feature.wide ? 'md:col-span-2' : ''}`}
              >
                <div className='pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-[#f0b429]/8 blur-2xl' />
                <div className='relative z-10 flex items-start gap-4'>
                  <div className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${feature.iconWrap} ring-1 ring-black/5`}>
                    <feature.icon className='h-6 w-6' />
                  </div>
                  <div className='min-w-0'>
                    <p className='text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500'>{feature.eyebrow}</p>
                    <h3 className='mt-1 text-lg font-extrabold text-slate-900'>{feature.label}</h3>
                    <p className='mt-2 text-sm leading-relaxed text-slate-600'>{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
