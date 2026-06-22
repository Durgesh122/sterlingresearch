import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Phone, RefreshCw, Send, UserRound } from 'lucide-react';
import { database } from '../../firebase';
import { push, ref, set } from 'firebase/database';
import { contactDetails } from '../../utils/data';

const HomeContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
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
        source: 'home-quick-contact',
        submittedAt: new Date().toISOString(),
        read: false,
      });

      setSubmitted(true);
      setFormData({ name: '', mobile: '', email: '', subject: '', message: '' });
      setUserAnswer('');
      generateSecurityQuestion();
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting home form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const contactPills = [
    { icon: Phone, label: 'Call Desk', value: contactDetails.phone },
    { icon: Mail, label: 'Email Support', value: contactDetails.email },
  ];

  const serviceSubjectOptions = [
    'SUPER CASH PACK',
    'SUPER INDEX OPTION PACK',
    'SUPER FUTURE PACK',
    'SUPER MCX PACK',
    'SUPER OPTION PACK',
    'SUPREME POWER PACK',
    'General Enquiry',
  ];

  return (
    <section className='relative overflow-hidden bg-white py-16'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,86,49,0.08),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(240,180,41,0.10),transparent_34%)]' />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-10 text-center'
        >
          <h2 className='text-3xl font-black text-[#1e5631] md:text-4xl'>Quick Contact for Service Enquiry</h2>
          <p className='mx-auto mt-3 max-w-2xl text-slate-600'>
            Aap service select karne se pehle yahin enquiry bhej sakte hain. Team same official channels se contact karegi.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1.6fr]'>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='rounded-[24px] border border-[#dbe9de] bg-[#f8fcf8] p-6'
          >
            <div className='inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f5ef] text-[#1e5631]'>
              <UserRound className='h-5 w-5' />
            </div>
            <h3 className='mt-4 text-xl font-extrabold text-[#1e5631]'>Talk to Sterling Team</h3>
            <p className='mt-2 text-sm leading-relaxed text-slate-600'>
              Form submit karte hi request log ho jayegi. Aapko response official contact details par diya jayega.
            </p>

            <div className='mt-6 space-y-3'>
              {contactPills.map((item) => (
                <div key={item.label} className='rounded-xl border border-[#d9e8de] bg-white px-4 py-3'>
                  <p className='text-xs font-bold uppercase tracking-wider text-[#2f6e42]'>{item.label}</p>
                  <p className='mt-1 text-sm font-semibold text-slate-700'>{item.value}</p>
                </div>
              ))}
            </div>

            <p className='mt-5 text-xs text-slate-500'>
              Investment in securities market is subject to market risks. Read all related documents carefully.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className='rounded-[24px] border border-[#dbe7de] bg-white p-5 shadow-[0_18px_36px_rgba(15,23,42,0.08)] md:p-6'
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <input
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                placeholder='Full Name'
                className='rounded-xl border border-[#dce7df] px-4 py-3 text-sm outline-none transition focus:border-[#1e5631]'
              />
              <input
                name='mobile'
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder='Mobile Number'
                className='rounded-xl border border-[#dce7df] px-4 py-3 text-sm outline-none transition focus:border-[#1e5631]'
              />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='Email Address'
                className='rounded-xl border border-[#dce7df] px-4 py-3 text-sm outline-none transition focus:border-[#1e5631]'
              />
              <select
                id='home-contact-subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                required
                aria-labelledby='home-contact-subject-label'
                className='rounded-xl border border-[#dce7df] bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1e5631]'
              >
                <option value='' disabled>
                  Select Service Type
                </option>
                {serviceSubjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label id='home-contact-subject-label' htmlFor='home-contact-subject' className='sr-only'>
                Service Type
              </label>
            </div>

            <textarea
              name='message'
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder='Write your message'
              className='mt-4 w-full rounded-xl border border-[#dce7df] px-4 py-3 text-sm outline-none transition focus:border-[#1e5631]'
            />

            <input
              type='text'
              name='bot-field'
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className='hidden'
              tabIndex={-1}
              autoComplete='off'
            />

            <div className='mt-4 rounded-xl border border-[#e3eadf] bg-[#f9fcf8] p-3'>
              <div className='flex items-center justify-between gap-3'>
                <p className='text-sm font-semibold text-slate-700'>{security.question}</p>
                <button
                  type='button'
                  onClick={generateSecurityQuestion}
                  className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#d7e4da] bg-white text-[#1e5631]'
                  aria-label='Refresh question'
                >
                  <RefreshCw className='h-4 w-4' />
                </button>
              </div>
              <input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                required
                placeholder='Your answer'
                className='mt-3 w-full rounded-lg border border-[#dce7df] px-3 py-2 text-sm outline-none transition focus:border-[#1e5631]'
              />
              {securityError && <p className='mt-2 text-xs font-semibold text-red-600'>Incorrect answer. Please try again.</p>}
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1e5631] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#184628] disabled:opacity-70'
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
              <Send className='h-4 w-4' />
            </button>

            {submitted && (
              <div className='mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700'>
                <CheckCircle className='h-4 w-4' />
                Your enquiry has been submitted successfully.
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
