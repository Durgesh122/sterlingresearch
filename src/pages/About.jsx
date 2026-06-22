import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  ArrowRight,
  CheckCircle2,
  Target,
  LineChart,
  Scale,
  Sparkles,
  FileCheck2,
  PhoneCall,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { complianceDetails } from '../utils/data';

const trustPoints = [
  'SEBI Registered Research Analyst framework',
  'Risk-first advisory process with practical execution levels',
  'Transparent fee model with no profit sharing promises',
  'Client communication only through official channels',
  'Research built on disciplined technical and fundamental analysis',
  'Clear suitability and responsible market participation guidance',
];

const workingModel = [
  {
    title: 'Research Foundation',
    text: 'Market structure, trend behavior, sector strength and risk levels are mapped before every recommendation.',
    icon: LineChart,
  },
  {
    title: 'Strategy Translation',
    text: 'Insights are converted into actionable plans with entries, exits and risk boundaries that are practical to follow.',
    icon: Target,
  },
  {
    title: 'Compliance Discipline',
    text: 'Every client interaction follows documented processes and communication standards aligned with regulations.',
    icon: Scale,
  },
];

const About = () => {
  return (
    <div className='relative overflow-hidden bg-gradient-to-b from-[#fffdf7] via-[#fcf9ef] to-[#f4faf5]'>
      <div
        className='pointer-events-none absolute inset-0 opacity-40'
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,86,49,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,86,49,0.05) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className='pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-[#f0b429]/25 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-[#1e5631]/20 blur-3xl' />

      <section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
          <motion.div
            className='lg:col-span-7'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className='inline-flex items-center gap-2 rounded-full border border-[#e8ddc2] bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1e5631]'>
              <Sparkles className='h-3.5 w-3.5 text-[#f0b429]' />
              About Sterling Research
            </div>

            <h1 className='mt-4 text-4xl md:text-5xl font-black leading-tight text-slate-900'>
              Research built for
              <span className='block bg-gradient-to-r from-[#1e5631] via-[#2f7a46] to-[#f0b429] bg-clip-text text-transparent'>
                clarity, discipline and trust
              </span>
            </h1>

            <p className='mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-slate-600'>
              Sterling Research helps traders and investors with structured market insights across Equity, Derivatives and Commodity segments. The focus is simple: clear logic, transparent communication and accountable advisory conduct.
            </p>

            <div className='mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3'>
              {[
                { icon: Users, value: '500+', label: 'Active Clients' },
                { icon: TrendingUp, value: '10K+', label: 'Research Calls' },
                { icon: ShieldCheck, value: 'SEBI', label: 'Registered RA' },
              ].map((stat) => (
                <div key={stat.label} className='rounded-2xl border border-[#e6dbc2] bg-white/95 px-4 py-4 shadow-sm'>
                  <stat.icon className='h-5 w-5 text-[#1e5631]' />
                  <p className='mt-2 text-2xl font-black text-slate-900'>{stat.value}</p>
                  <p className='text-xs uppercase tracking-wider font-semibold text-slate-500'>{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className='lg:col-span-5'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <div className='rounded-3xl border border-[#e6dbc4] bg-white/95 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.10)]'>
              <div className='inline-flex items-center gap-2 rounded-full bg-[#fff6dd] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1e5631]'>
                <FileCheck2 className='h-3.5 w-3.5 text-[#f0b429]' />
                Regulatory Snapshot
              </div>

              <div className='mt-4 space-y-2'>
                {[
                  { label: 'Registered Name', value: complianceDetails.registeredName },
                  { label: 'Registration Type', value: complianceDetails.registrationType },
                  { label: 'SEBI Registration No', value: complianceDetails.sebiRegistrationNo },
                  { label: 'Validity', value: complianceDetails.validity },
                ].map((row) => (
                  <div key={row.label} className='rounded-xl border border-[#efe4cb] bg-[#fffdf7] px-3 py-2'>
                    <p className='text-[11px] uppercase tracking-[0.12em] font-semibold text-slate-500'>{row.label}</p>
                    <p className='mt-0.5 text-sm font-semibold text-slate-800'>{row.value}</p>
                  </div>
                ))}
              </div>

              <p className='mt-4 text-xs leading-relaxed text-slate-500'>
                We do not guarantee fixed returns and do not operate on profit-sharing commitments.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
          <motion.div
            className='lg:col-span-7 rounded-3xl border border-[#e6dbc4] bg-white/95 p-6 md:p-7 shadow-sm'
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h2 className='text-2xl font-extrabold text-slate-900'>Why clients work with us</h2>
            <div className='mt-5 space-y-3'>
              {trustPoints.map((point) => (
                <div key={point} className='flex items-start gap-3'>
                  <CheckCircle2 className='h-5 w-5 text-[#1e5631] mt-0.5' />
                  <p className='text-sm md:text-base text-slate-600 leading-relaxed'>{point}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className='lg:col-span-5 rounded-3xl border border-[#e6dbc4] bg-gradient-to-br from-[#19482f] via-[#205e3b] to-[#2b7548] p-6 md:p-7 text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)]'
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <h2 className='text-2xl font-extrabold'>Our Working Model</h2>
            <p className='mt-2 text-sm text-white/85'>A disciplined advisory flow designed for consistency and better decision support.</p>

            <div className='mt-5 space-y-4'>
              {workingModel.map((item) => (
                <div key={item.title} className='rounded-xl border border-white/20 bg-white/10 p-3.5'>
                  <div className='flex items-center gap-2'>
                    <item.icon className='h-4.5 w-4.5 text-[#f8cc63]' />
                    <h3 className='text-sm font-bold'>{item.title}</h3>
                  </div>
                  <p className='mt-1.5 text-sm text-white/85 leading-relaxed'>{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14'>
        <motion.div
          className='rounded-3xl border border-[#e3d7be] bg-white/95 p-6 md:p-8 shadow-sm'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <h3 className='text-2xl font-extrabold text-slate-900'>Discuss your requirement with our team</h3>
              <p className='mt-1 text-slate-600 text-sm md:text-base'>Get clear consultation, service suitability guidance and onboarding support.</p>
            </div>

            <div className='flex items-center gap-3'>
              <a
                href={`tel:${String('+91 74151 52600').replace(/\s+/g, '')}`}
                className='inline-flex items-center gap-2 rounded-xl border border-[#e4d9bf] bg-[#fff8e7] px-4 py-2.5 text-sm font-semibold text-[#1e5631]'
              >
                <PhoneCall className='h-4 w-4' />
                Call Now
              </a>

              <Link
                to='/contact-us'
                className='inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1e5631] to-[#14472a] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(30,86,49,0.35)]'
              >
                Contact Us
                <ArrowRight className='h-4 w-4' />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
