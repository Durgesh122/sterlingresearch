import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  RefreshCw,
  User,
  FileText,
  Smartphone,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Clock3,
  BadgeCheck,
} from 'lucide-react';
import { database } from '../firebase';
import { ref, push, set } from 'firebase/database';
import { contactDetails } from '../utils/data';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
  });

  const [security, setSecurity] = useState({ question: '', answer: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [securityError, setSecurityError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    generateSecurityQuestion();
  }, []);

  const generateSecurityQuestion = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;

    let question = '';
    let answer = '';

    if (op === '+') {
      question = `What is ${n1} + ${n2}?`;
      answer = String(n1 + n2);
    } else if (op === '-') {
      const big = Math.max(n1, n2);
      const small = Math.min(n1, n2);
      question = `What is ${big} - ${small}?`;
      answer = String(big - small);
    } else {
      question = `What is ${n1} x ${n2}?`;
      answer = String(n1 * n2);
    }

    setSecurity({ question, answer });
    setUserAnswer('');
    setSecurityError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSecurityError(false);

    if (honeypot) return;

    if (userAnswer.trim() !== security.answer) {
      setSecurityError(true);
      generateSecurityQuestion();
      return;
    }

    setIsSubmitting(true);

    try {
      const messagesRef = ref(database, 'messages');
      const newMessageRef = push(messagesRef);
      await set(newMessageRef, {
        ...formData,
        submittedAt: new Date().toISOString(),
        read: false,
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
      setUserAnswer('');
      generateSecurityQuestion();
      setTimeout(() => setSubmitted(false), 3200);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Call Desk', value: contactDetails.phone },
    { icon: Mail, label: 'Mail Support', value: contactDetails.email },
    { icon: MapPin, label: 'Office Base', value: contactDetails.address },
  ];

  const advisoryHighlights = [
    { icon: BadgeCheck, label: 'SEBI-aligned communication' },
    { icon: ShieldCheck, label: 'Only official payment channels' },
    { icon: Clock3, label: 'Response within 24 working hours' },
  ];

  const chartBars = [22, 44, 38, 62, 58, 74, 68, 82];

  const inputBase =
    'w-full rounded-xl border border-[#e7ddc7] bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-[#1e5631] focus:ring-4 focus:ring-[#1e5631]/10';

  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-[#fffdf7] via-[#fdfaf1] to-[#f4faf5] pt-24 pb-14'>
      <div
        className='pointer-events-none absolute inset-0 opacity-45'
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,86,49,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(30,86,49,0.055) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
      />
      <div className='pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-[#f0b429]/20 blur-3xl' />
      <div className='pointer-events-none absolute bottom-0 -left-14 h-72 w-72 rounded-full bg-[#1e5631]/20 blur-3xl' />

      <div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-12'>
          <motion.div
            className='lg:col-span-5 space-y-6'
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <div className='inline-flex items-center gap-2 rounded-full border border-[#e9ddbf] bg-white/95 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1e5631]'>
              <Sparkles className='h-3.5 w-3.5 text-[#f0b429]' />
              Sterling Concierge Desk
            </div>

            <div>
              <h1 className='text-4xl md:text-5xl font-black leading-tight text-slate-900'>
                Let us design your
                <span className='block bg-gradient-to-r from-[#1e5631] via-[#2f7a46] to-[#f0b429] bg-clip-text text-transparent'>
                  next market move
                </span>
              </h1>
              <p className='mt-4 max-w-xl text-base md:text-lg leading-relaxed text-slate-600'>
                This page is crafted for serious investors who want clear process, transparent communication and quick response from an accountable research team.
              </p>
            </div>

            <div className='relative overflow-hidden rounded-3xl border border-[#e8deca] bg-gradient-to-br from-[#173f2a] via-[#1f5a37] to-[#286c44] p-5 text-white shadow-[0_18px_36px_rgba(15,23,42,0.22)]'>
              <div className='pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#f0b429]/30 blur-2xl' />
              <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-white/20' />

              <div className='relative z-10'>
                <div className='inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]'>
                  <TrendingUp className='h-3.5 w-3.5 text-[#f8cc63]' />
                  Live Advisory Snapshot
                </div>

                <div className='mt-4 grid grid-cols-8 items-end gap-2'>
                  {chartBars.map((height, idx) => (
                    <div key={`bar-${idx}`} className='relative h-24 rounded-lg bg-white/10'>
                      <div
                        className='absolute inset-x-1 bottom-1 rounded-md bg-gradient-to-t from-[#f0b429] to-[#ffe6a6]'
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>

                <div className='mt-4 space-y-2'>
                  {advisoryHighlights.map((point) => {
                    const Icon = point.icon;
                    return (
                      <div key={point.label} className='flex items-center gap-2 text-sm text-white/90'>
                        <Icon className='h-4 w-4 text-[#f8cc63]' />
                        {point.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className='flex items-center gap-4 rounded-2xl border border-[#e8deca] bg-white/92 px-4 py-3 shadow-sm'
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                  >
                    <span className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fef4d8] text-[#1e5631]'>
                      <Icon className='h-4.5 w-4.5' />
                    </span>
                    <div>
                      <p className='text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500'>{item.label}</p>
                      <p className='text-sm md:text-base font-semibold text-slate-800'>{item.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className='lg:col-span-7'
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <div className='relative overflow-hidden rounded-3xl border border-[#e6dbc4] bg-white/95 p-6 md:p-8 shadow-[0_24px_52px_rgba(15,23,42,0.10)]'>
              <div className='absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#1e5631] via-[#f0b429] to-[#2f7a46]' />

              <div className='mb-6'>
                <h2 className='text-2xl md:text-3xl font-extrabold text-slate-900'>Book a Consultation Message</h2>
                <p className='mt-1 text-sm text-slate-600'>Tell us your requirement and our team will connect with the next action plan.</p>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700'
                >
                  <CheckCircle className='h-4.5 w-4.5' />
                  Message sent successfully. We will contact you shortly.
                </motion.div>
              )}

              <form className='space-y-5' onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                  <div>
                    <label className='mb-1.5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700'>
                      <User className='h-4 w-4 text-[#1e5631]' /> Full Name
                    </label>
                    <input
                      type='text'
                      required
                      placeholder='Your full name'
                      className={inputBase}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className='mb-1.5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700'>
                      <Smartphone className='h-4 w-4 text-[#1e5631]' /> Phone Number
                    </label>
                    <input
                      type='tel'
                      required
                      placeholder='+91 98765 43210'
                      className={inputBase}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    />
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
                  <div>
                    <label className='mb-1.5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700'>
                      <Mail className='h-4 w-4 text-[#1e5631]' /> Email Address
                    </label>
                    <input
                      type='email'
                      required
                      placeholder='you@example.com'
                      className={inputBase}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className='mb-1.5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700'>
                      <FileText className='h-4 w-4 text-[#1e5631]' /> Subject
                    </label>
                    <input
                      type='text'
                      required
                      placeholder='Service you need help with'
                      className={inputBase}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className='mb-1.5 inline-flex items-center gap-2 text-sm font-semibold text-slate-700'>
                    <Send className='h-4 w-4 text-[#1e5631]' /> Message
                  </label>
                  <textarea
                    rows='4'
                    required
                    placeholder='Write your requirement in detail...'
                    className={inputBase}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <input
                  type='text'
                  name='bot-field'
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className='hidden'
                  tabIndex='-1'
                  autoComplete='off'
                />

                <div className='rounded-xl border border-[#e8deca] bg-[#fff9eb] p-3.5'>
                  <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex items-center gap-2'>
                      <button
                        type='button'
                        onClick={generateSecurityQuestion}
                        className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#e0d6c0] bg-white text-[#1e5631] transition-transform hover:rotate-180'
                        aria-label='Refresh security question'
                      >
                        <RefreshCw className='h-4 w-4' />
                      </button>
                      <span className='text-sm font-semibold text-slate-700'>{security.question}</span>
                    </div>

                    <input
                      type='number'
                      required
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder='Answer'
                      className='w-full sm:w-32 rounded-lg border border-[#e0d6c0] bg-white px-3 py-2 text-center text-sm font-bold tracking-wide text-slate-800 outline-none transition focus:border-[#1e5631]'
                    />
                  </div>
                  {securityError && (
                    <p className='mt-2 text-xs font-semibold text-rose-600'>Incorrect answer. Please try again.</p>
                  )}
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1e5631] to-[#14472a] px-6 py-3.5 text-base font-bold text-white shadow-[0_12px_24px_rgba(30,86,49,0.35)] transition-all duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70'
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className='h-4.5 w-4.5' />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
