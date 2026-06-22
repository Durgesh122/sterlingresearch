import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, BarChart3, Target, CircleCheckBig } from 'lucide-react';

const serviceConfig = {
  'super-cash-pack': {
    title: 'SUPER CASH PACK',
    subtitle: 'Equity research service in the NSE cash segment for precision intraday opportunities.',
    coverage: '2-3 carefully selected pure intraday stock recommendations daily in the NSE cash segment.',
    description:
      'Sterling Research Analyst offers equity research services in the NSE cash segment, backed by a team of experienced research analysts who conduct comprehensive technical and fundamental market analysis. Our research-driven recommendations are designed to help traders capitalize on intraday market opportunities with precision and confidence. We focus exclusively on intraday trading strategies and advise clients to avoid carrying positions overnight. Our service provides 2-3 carefully selected intraday stock recommendations daily in the NSE cash segment, aiming to deliver consistent trading opportunities. Providing research analysis, investment recommendations, market insights, and equity research services for stocks traded in the cash market.',
    features: [
      '2-3 daily pure intraday stock recommendations through SMS (as per market conditions).',
      'All recommendations include 2 targets with proper stop-loss.',
      'Timely follow-ups on all trade signals.',
      'Proper timing guidance for entry and exit in recommendations.',
      'Careful analysis of market direction before trade ideas.',
      'Complete customer support.',
    ],
    pricing: {
      headers: ['Pack', 'Monthly', 'Quarterly'],
      rows: [['Super Cash Pack', '12499/-', '34999/-']],
    },
  },
  'super-index-option-pack': {
    title: 'SUPER INDEX OPTION PACK',
    subtitle: 'Specialized research and recommendation service designed exclusively for index option traders.',
    coverage: '1-2 carefully selected intraday/positional opportunities in Nifty, Bank Nifty Options and Sensex.',
    description:
      'Super Index Option Pack is a specialized research and recommendation service designed exclusively for Index Option traders seeking timely trading opportunities backed by in-depth technical analysis. Our expert research team delivers 1-2 carefully selected intraday recommendations daily in Nifty, Bank Nifty Options and Sensex, based on prevailing market conditions and momentum. The service combines advanced technical analysis, derivatives market tracking, sector-wise developments, and key national and international market events to identify potential trading opportunities with precise entry and exit levels. Our recommendations are generated and shared in a timely manner, allowing traders sufficient time to execute trades effectively. Super Index Option Service provides a convenient and disciplined approach to intraday index option trading. With a focus on quality over quantity, we aim to help traders capitalize on market movements through well-researched and actionable recommendations.',
    features: [
      '1-2 daily intraday/positional Index Option recommendations through SMS (as per market conditions).',
      'All recommendations include 2 targets with proper stop-loss.',
      'Timely follow-ups on all trade signals.',
      'Proper timing guidance for entry and exit in recommendations.',
      'Careful analysis of market direction before trade ideas.',
      'Complete customer support.',
    ],
    pricing: {
      headers: ['Pack', 'Monthly', 'Quarterly'],
      rows: [['Super Index Option Pack', '12499/-', '34999/-']],
    },
  },
  'super-future-pack': {
    title: 'SUPER FUTURE PACK',
    subtitle: 'Intraday trading research service to help traders capture market opportunities with confidence.',
    coverage: '2-3 carefully researched intraday/positional opportunities in NSE-listed stocks and derivatives.',
    description:
      'Super Future is an intraday trading research service designed to help traders capitalize on market opportunities with confidence. We provide 2-3 carefully researched intraday recommendations daily in NSE-listed stocks and derivatives. Our recommendations are generated through a strategic combination of technical analysis, market sentiment, and fundamental research, ensuring timely trade opportunities with sufficient entry and exit windows. Backed by a dedicated team of experienced analysts, we continuously monitor the F&O segment, major market sectors, and key national and global developments that influence market movements. This comprehensive approach enables us to identify potential opportunities and deliver actionable trading insights. If you are seeking reliable market recommendations without spending hours analyzing charts and news, Super Future is an ideal solution to simplify your trading journey and enhance your market participation.',
    features: [
      '2-3 daily intraday/positional stock future recommendations through SMS (as per market conditions).',
      'All recommendations include 2 targets with proper stop-loss.',
      'Timely follow-ups on all trade signals.',
      'Proper timing guidance for entry and exit in recommendations.',
      'Careful analysis of market direction before trade ideas.',
      'Complete customer support.',
    ],
    pricing: {
      headers: ['Pack', 'Monthly', 'Quarterly'],
      rows: [['Super Future Pack', '12499/-', '34999/-']],
    },
  },
  'super-mcx-pack': {
    title: 'SUPER MCX PACK',
    subtitle: 'Comprehensive commodity market recommendations in the F&O segment.',
    coverage: 'Major MCX-traded commodity opportunities with disciplined intraday and positional guidance.',
    description:
      'Super MCX Pack delivers comprehensive commodity market recommendations in the F&O segment through a disciplined blend of technical charts, price action analysis, and fundamental market research. Covering major MCX-traded commodities, the service provides 2-3 intraday/positional trading opportunities daily, supported by expert research analysis and market intelligence to help traders navigate volatile commodity markets effectively.',
    features: [
      '2-3 daily intraday/positional MCX Future and Option recommendations through SMS (as per market conditions).',
      'All recommendations include 2 targets with proper stop-loss.',
      'Timely follow-ups on all trade signals.',
      'Proper timing guidance for entry and exit in recommendations.',
      'Careful analysis of market direction before trade ideas.',
      'Complete customer support.',
    ],
    pricing: {
      headers: ['Pack', 'Monthly', 'Quarterly'],
      rows: [['Super MCX Pack', '12499/-', '34999/-']],
    },
  },
  'super-option-pack': {
    title: 'SUPER OPTION PACK',
    subtitle: 'Specialized options research support for short-term market opportunities.',
    coverage: 'Intraday and positional stock option opportunities with disciplined execution guidance.',
    description:
      'Super Options is a specialized research service designed for options traders seeking to capitalize on short-term market opportunities. Our expert research team continuously monitors the Futures & Options (F&O) segment, analyzes key domestic and global market developments, and evaluates sector-specific trends to identify potential trading opportunities. By combining advanced technical analysis with fundamental market research, Sterling Research delivers timely and actionable recommendations that help traders make informed decisions and optimize their trading strategies. Our objective is to provide timely insights that enable traders to enter and exit positions with confidence.',
    features: [
      '2-3 daily intraday/positional stock option recommendations through SMS (as per market conditions).',
      'All recommendations include 2 targets with proper stop-loss.',
      'Timely follow-ups on all trade signals.',
      'Proper timing guidance for entry and exit in recommendations.',
      'Careful analysis of market direction before trade ideas.',
      'Complete customer support.',
    ],
    pricing: {
      headers: ['Pack', 'Monthly', 'Quarterly'],
      rows: [['Super Option Pack', '12499/-', '34999/-']],
    },
  },
  'supreme-power-pack': {
    title: 'SUPREME POWER PACK',
    subtitle: 'Supreme Power F&O Trading Service with carefully researched NSE intraday and positional opportunities.',
    coverage: 'Intraday and positional Futures & Options setups with disciplined execution support.',
    description:
      'Supreme Power F&O Trading Service provides carefully researched intraday Futures & Options trading opportunities in the NSE market. Our expert analysts combine advanced technical indicators, market sentiment, and price action analysis to identify timely trades. Every recommendation includes a defined entry price, target levels, and stop-loss to help traders with timely entry and exit. We focus on quality setups rather than excessive trading, ensuring disciplined and timely recommendations.',
    features: [
      '3-4 daily intraday/positional F&O recommendations through SMS (as per market conditions).',
      'All recommendations include 2 targets with proper stop-loss.',
      'Timely follow-ups on all trade signals.',
      'Proper timing guidance for entry and exit in recommendations.',
      'Careful analysis of market direction before trade ideas.',
      'Complete customer support.',
    ],
    pricing: {
      headers: ['Pack', 'Quarterly'],
      rows: [['Supreme Power Pack', '149999/-']],
    },
  },
};

const commonPoints = [
  'SEBI-aligned communication approach',
  'Transparent guidance with no profit-sharing commitments',
  'Actionable levels with risk-first discipline',
  'Support through official company communication channels',
];

const ServicePackPage = () => {
  const { slug } = useParams();
  const service = serviceConfig[slug];

  if (!service) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center px-4 text-center'>
        <div>
          <h1 className='text-3xl font-extrabold text-slate-900'>Service Not Found</h1>
          <p className='mt-2 text-slate-600'>The requested service package is not available.</p>
          <Link
            to='/services'
            className='mt-5 inline-flex items-center gap-2 rounded-xl bg-[#1e5631] px-5 py-2.5 text-sm font-bold text-white'
          >
            Back to Services
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-[#fffdf7] via-[#fcf9ef] to-[#f4faf5] py-14'>
      <div className='pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-[#f0b429]/20 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-[#1e5631]/20 blur-3xl' />

      <div className='relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className='rounded-3xl border border-[#e4d8bf] bg-white/95 p-6 md:p-8 shadow-[0_20px_45px_rgba(15,23,42,0.10)]'
        >
          <div className='inline-flex items-center gap-2 rounded-full border border-[#e9ddc2] bg-[#fff6df] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1e5631]'>
            <ShieldCheck className='h-3.5 w-3.5 text-[#f0b429]' />
            Sterling Services
          </div>

          <h1 className='mt-4 text-3xl md:text-4xl font-black text-slate-900'>{service.title}</h1>
          <p className='mt-2 text-base md:text-lg text-slate-600 leading-relaxed'>{service.subtitle}</p>

          <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='rounded-2xl border border-[#eadfc8] bg-[#fffdf7] p-4'>
              <BarChart3 className='h-5 w-5 text-[#1e5631]' />
              <p className='mt-2 text-sm font-semibold text-slate-800'>Coverage</p>
              <p className='mt-1 text-sm text-slate-600'>{service.coverage}</p>
            </div>
            <div className='rounded-2xl border border-[#eadfc8] bg-[#fffdf7] p-4'>
              <Target className='h-5 w-5 text-[#1e5631]' />
              <p className='mt-2 text-sm font-semibold text-slate-800'>Approach</p>
              <p className='mt-1 text-sm text-slate-600'>Structured calls with clear entry, target and stop-loss discipline.</p>
            </div>
            <div className='rounded-2xl border border-[#eadfc8] bg-[#fffdf7] p-4'>
              <ShieldCheck className='h-5 w-5 text-[#1e5631]' />
              <p className='mt-2 text-sm font-semibold text-slate-800'>Trust Layer</p>
              <p className='mt-1 text-sm text-slate-600'>Compliance-first communication and transparent support process.</p>
            </div>
          </div>

          {service.description && (
            <div className='mt-7 rounded-2xl border border-[#e6dbc4] bg-white p-5'>
              <h2 className='text-xl font-extrabold text-slate-900'>Service Overview</h2>
              <p className='mt-3 text-sm md:text-base leading-relaxed text-slate-600'>{service.description}</p>
            </div>
          )}

          {service.features && (
            <div className='mt-7 rounded-2xl border border-[#e6dbc4] bg-white p-5'>
              <h2 className='text-xl font-extrabold text-slate-900'>Service Features</h2>
              <div className='mt-4 space-y-2.5'>
                {service.features.map((feature) => (
                  <div key={feature} className='flex items-start gap-2.5'>
                    <CircleCheckBig className='mt-0.5 h-4.5 w-4.5 text-[#1e5631]' />
                    <p className='text-sm text-slate-600'>{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.pricing ? (
            <div className='mt-7 rounded-2xl border border-[#e6dbc4] bg-white p-5'>
              <h2 className='text-xl font-extrabold text-slate-900'>Pricing</h2>
              <div className='mt-4 overflow-x-auto'>
                <table className='w-full min-w-[320px] border-collapse rounded-xl overflow-hidden'>
                  <thead>
                    <tr className='bg-[#f8f1de] text-slate-800'>
                      {service.pricing.headers.map((header) => (
                        <th key={header} className='text-left px-4 py-3 text-sm font-bold border border-[#e6dbc4]'>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {service.pricing.rows.map((row, idx) => (
                      <tr key={`price-row-${idx}`} className='bg-white'>
                        {row.map((cell, cellIdx) => (
                          <td
                            key={`cell-${idx}-${cellIdx}`}
                            className={`px-4 py-3 text-sm border border-[#e6dbc4] ${
                              cellIdx === row.length - 1 ? 'font-extrabold text-[#1e5631]' : 'font-semibold text-slate-700'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className='mt-7 rounded-2xl border border-[#e6dbc4] bg-white p-5'>
              <h2 className='text-xl font-extrabold text-slate-900'>What you can expect</h2>
              <div className='mt-4 space-y-2.5'>
                {commonPoints.map((point) => (
                  <div key={point} className='flex items-start gap-2.5'>
                    <CircleCheckBig className='mt-0.5 h-4.5 w-4.5 text-[#1e5631]' />
                    <p className='text-sm text-slate-600'>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='mt-7 flex flex-wrap items-center gap-3'>
            <Link
              to='/contact-us'
              className='inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1e5631] to-[#14472a] px-5 py-2.5 text-sm font-bold text-white'
            >
              Enquire This Service
              <ArrowRight className='h-4 w-4' />
            </Link>
            <Link
              to='/services'
              className='inline-flex items-center gap-2 rounded-xl border border-[#e2d6bc] bg-[#fff9ea] px-5 py-2.5 text-sm font-semibold text-[#1e5631]'
            >
              View All Services
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePackPage;
