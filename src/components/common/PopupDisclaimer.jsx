import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SterlingLogo from '../../assets/SterlingLogoNew.svg';
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  ArrowRight,
  X,
  UserX,
  MessageSquareText,
  Landmark,
  Globe,
} from 'lucide-react';
import { contactDetails, complianceDetails } from '../../utils/data';

const copy = {
  en: {
    badge: 'Official Disclosure',
    title: 'Important Client Advisory / महत्वपूर्ण ग्राहक सलाह',
    greeting: 'Dear Client,',
    subtitle:
      'Please read the following guidelines carefully to ensure your safety and compliance while availing our services.',
    items: [
      {
        title: 'Do Not Share Demat Details',
        description:
          'Do not share your Demat Account details with any employee or executive. Sterling Research will not be responsible for losses arising from such disclosure. Responsibility will remain solely with the client.',
      },
      {
        title: 'Act Only On Official Recommendations',
        description:
          'Follow only trading tips and recommendations sent through our official communication channels (including official SMS updates). Please strictly follow the prescribed entry and exit levels in each recommendation.',
      },
      {
        title: 'No Liability For Unofficial Tips',
        description:
          'The company will not be responsible for any loss if you act on tips from unofficial sources or fail to follow instructions issued in official recommendations.',
      },
      {
        title: 'Payment Advisory For Minors And Senior Citizens',
        description:
          'Minors and senior citizens above 60 years of age are advised not to make payments to the company or its representatives without proper due diligence and family supervision.',
      },
      {
        title: 'Pay Only To Official Company Account',
        description:
          'Make payments only to the official company account mentioned on our website. We are not responsible for payments made to personal or third-party accounts.',
      },
      {
        title: 'Review Website Before Payment',
        description:
          'Please make payments only after reviewing our official website for service details, terms, and policies.',
      },
    ],
    supportLabel: 'For any queries or support:',
    regards: 'Warm Regards,',
    company: 'Sterling Research',
    cta: 'I Understand & Proceed',
  },
  hi: {
    badge: 'आधिकारिक प्रकटीकरण',
    title: 'Important Client Advisory / महत्वपूर्ण ग्राहक सलाह',
    greeting: 'प्रिय ग्राहक,',
    subtitle:
      'हमारी सेवाओं का उपयोग करते समय आपकी सुरक्षा और अनुपालन सुनिश्चित करने के लिए कृपया निम्नलिखित दिशानिर्देश ध्यान से पढ़ें।',
    items: [
      {
        title: 'डीमैट विवरण साझा न करें',
        description:
          'अपने डीमैट खाते की जानकारी किसी भी कर्मचारी या प्रतिनिधि के साथ साझा न करें। ऐसी जानकारी साझा करने से होने वाले नुकसान के लिए Sterling Research जिम्मेदार नहीं होगा। इसकी जिम्मेदारी पूरी तरह ग्राहक की होगी।',
      },
      {
        title: 'केवल आधिकारिक सुझावों पर कार्य करें',
        description:
          'केवल आधिकारिक संचार माध्यमों (आधिकारिक SMS अपडेट सहित) से प्राप्त ट्रेडिंग टिप्स और सिफारिशों पर ही कार्य करें। प्रत्येक सिफारिश में दिए गए एंट्री और एग्जिट स्तरों का सख्ती से पालन करें।',
      },
      {
        title: 'अनौपचारिक टिप्स पर कंपनी जिम्मेदार नहीं',
        description:
          'यदि आप अन्य स्रोतों से टिप्स लेकर ट्रेड करते हैं या कंपनी द्वारा दिए गए निर्देशों का पालन नहीं करते हैं, तो होने वाले नुकसान के लिए कंपनी जिम्मेदार नहीं होगी।',
      },
      {
        title: 'नाबालिग और 60+ के लिए भुगतान सलाह',
        description:
          'नाबालिग और 60 वर्ष से अधिक आयु के वरिष्ठ नागरिकों को बिना उचित जांच और पारिवारिक निगरानी के कंपनी या उसके प्रतिनिधियों को भुगतान करने से बचना चाहिए।',
      },
      {
        title: 'भुगतान केवल आधिकारिक खाते में करें',
        description:
          'भुगतान केवल हमारी वेबसाइट पर दिए गए आधिकारिक कंपनी खाते में करें। किसी व्यक्तिगत या तृतीय-पक्ष खाते में किए गए भुगतान के लिए कंपनी जिम्मेदार नहीं होगी।',
      },
      {
        title: 'भुगतान से पहले वेबसाइट अवश्य देखें',
        description:
          'कृपया भुगतान करने से पहले हमारी आधिकारिक वेबसाइट पर सेवा विवरण, नियम और नीतियां अवश्य पढ़ें।',
      },
    ],
    supportLabel: 'किसी भी प्रश्न या सहायता के लिए:',
    regards: 'सादर,',
    company: 'Sterling Research',
    cta: 'मैं समझता हूं और आगे बढ़ता हूं',
  },
};

const itemIcons = [ShieldCheck, MessageSquareText, AlertTriangle, UserX, Landmark, Globe];
const itemAccent = [
  'text-emerald-600',
  'text-[#1e5631]',
  'text-[#d39b17]',
  'text-rose-500',
  'text-sky-600',
  'text-violet-600',
];

const PopupDisclaimer = ({ isOpen, onClose }) => {
  const [lang, setLang] = useState('en');
  const text = copy[lang];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className='fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity' />

          <motion.div
            className='relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#e8dfc6] bg-gradient-to-b from-[#fffdf8] via-white to-[#f9fdf8] shadow-[0_30px_80px_rgba(15,23,42,0.25)] flex flex-col max-h-[90vh]'
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='shrink-0 border-b border-[#ede5d2] bg-gradient-to-r from-[#fff8e8] via-white to-[#f3f9f2] px-6 py-4'>
              <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                <div className='flex items-center'>
                  <img src={SterlingLogo} alt='Sterling Research' className='h-14 sm:h-16 w-auto object-contain' />
                </div>

                <div className='flex items-center gap-2 self-start md:self-center'>
                  <div className='flex rounded-lg border border-[#e7e0cf] bg-white p-1'>
                    <button
                      type='button'
                      onClick={() => setLang('en')}
                      className={`rounded-md px-3 py-1 text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-[#1e5631] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      EN
                    </button>
                    <button
                      type='button'
                      onClick={() => setLang('hi')}
                      className={`rounded-md px-3 py-1 text-[10px] font-bold transition-all ${lang === 'hi' ? 'bg-[#1e5631] text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      HI
                    </button>
                  </div>

                  <button
                    type='button'
                    onClick={onClose}
                    className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e7e0cf] bg-white text-slate-500 transition-colors hover:text-slate-800'
                    aria-label='Close disclosure popup'
                  >
                    <X className='h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>

            <div className='custom-scrollbar flex-1 overflow-y-auto px-6 py-5'>
              <div className='rounded-xl border border-[#efe5d0] bg-white/85 p-4'>
                <h3 className='text-base font-bold text-slate-900'>{text.title}</h3>
                <p className='mt-2 text-sm font-semibold text-slate-700'>{text.greeting}</p>
                <p className='mt-1 text-sm leading-relaxed text-slate-600'>{text.subtitle}</p>
              </div>

              <div className='mt-4 space-y-3'>
                {text.items.map((item, index) => {
                  const Icon = itemIcons[index] || Lock;
                  return (
                    <div key={item.title} className='rounded-xl border border-[#eee4cf] bg-white px-4 py-3 shadow-sm'>
                      <div className='flex items-start gap-3'>
                        <span className='mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#fff4d5]'>
                          <Icon className={`h-4 w-4 ${itemAccent[index] || 'text-slate-600'}`} />
                        </span>
                        <div>
                          <h4 className='text-xs font-bold uppercase tracking-wide text-slate-800'>{item.title}</h4>
                          <p className='mt-1 text-xs leading-relaxed text-slate-600'>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className='mt-4 rounded-xl border border-[#eee3ce] bg-[#fffaf0] p-3 text-xs text-slate-600'>
                <p className='font-semibold text-slate-800'>{text.supportLabel}</p>
                <p className='mt-1'>Email: {contactDetails.email}</p>
                <p>Phone: {contactDetails.phone}</p>
                <p className='mt-2 text-slate-700'>{text.regards}</p>
                <p className='font-semibold text-slate-800'>{complianceDetails.registeredName}</p>
              </div>
            </div>

            <div className='shrink-0 border-t border-[#ede4d1] bg-white/90 px-4 py-4 backdrop-blur-sm'>
              <button
                type='button'
                onClick={onClose}
                className='w-full rounded-xl bg-gradient-to-r from-[#1e5631] to-[#25703e] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-200 hover:brightness-110 active:scale-[0.99] flex items-center justify-center gap-2'
              >
                {text.cta}
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return content;
};

export default PopupDisclaimer;
