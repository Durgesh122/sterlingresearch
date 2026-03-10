import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, RefreshCw, User, FileText, Smartphone } from "lucide-react";
import ContactImage from "../assets/Contactpageimage.png";
import { database } from '../firebase';
import { ref, push, set } from "firebase/database";
import { contactDetails } from "../utils/data";
import RevealOnScroll from "../components/common/RevealOnScroll";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
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
    // Only Math equations as requested
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;

    let q = '', a = '';
    
    if (op === '+') {
        q = `What is ${n1} + ${n2}?`;
        a = (n1 + n2).toString();
    } else if (op === '-') {
        const big = Math.max(n1, n2);
        const small = Math.min(n1, n2);
        q = `What is ${big} - ${small}?`;
        a = (big - small).toString();
    } else {
         q = `What is ${n1} x ${n2}?`;
         a = (n1 * n2).toString();
    }

    setSecurity({ question: q, answer: a });
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
        read: false
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', mobile: '', subject: '', message: '' });
      setUserAnswer('');
      generateSecurityQuestion();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: contactDetails.phone,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: contactDetails.email,
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: contactDetails.address,
      color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 font-sans pt-24 pb-12 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Side: Text -> Image -> Contact Details */}
          <motion.div 
             initial={{ opacity: 0, x: -50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32"
          >
             <div>
               <motion.span 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold tracking-wide mb-4 border border-blue-200 dark:border-blue-800"
               >
                 GET IN TOUCH
               </motion.span>
               <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
                  Let’s Start a <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
                    Conversation
                  </span>
               </h1>
               <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
                 Have questions about our financial services? Need expert market advice? We're here to guide you towards financial success.
               </p>
             </div>

             {/* IMAGE PLACED HERE - Between Text and Details */}
             <div className="relative group w-full max-w-sm mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-xl transform rotate-3 scale-95 group-hover:rotate-6 transition-transform duration-500"></div>
                <img 
                  src={ContactImage} 
                  alt="Contact Support" 
                  className="relative z-10 w-full rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700 transform transition-transform group-hover:-translate-y-2 duration-500"
                />
             </div>

             <div className="grid gap-4">
               {contactInfo.map((info, idx) => (
                 <RevealOnScroll key={idx} delay={idx * 0.1}>
                    <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group">
                        <div className={`p-3.5 rounded-xl border ${info.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                            <info.icon size={24} strokeWidth={2} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">{info.title}</p>
                            <p className="font-bold text-gray-900 dark:text-white text-base md:text-lg">{info.details}</p>
                        </div>
                    </div>
                 </RevealOnScroll>
               ))}
             </div>

          </motion.div>

          {/* Right Side: Premium Glassmorphism Form */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="lg:col-span-7 w-full"
          >
             <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-8 md:p-10 border border-gray-100 dark:border-gray-700 relative overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/10">
                
                {/* Decorative Top Border Gradient */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                
                <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                     Send us a Message
                     <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                     </span>
                   </h2>
                   <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                     Fill out the form below and our team will get back to you within 24 hours.
                   </p>
                </div>

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Name Input */}
                         <div className="space-y-2 group">
                           <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 group-focus-within:text-blue-600 transition-colors">
                             <User size={16} className="text-blue-500" /> Full Name
                           </label>
                           <input 
                             type="text" 
                             required
                             className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                             placeholder="John Doe"
                             value={formData.name}
                             onChange={(e) => setFormData({...formData, name: e.target.value})}
                           />
                         </div>

                         {/* Mobile Input */}
                         <div className="space-y-2 group">
                           <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 group-focus-within:text-green-600 transition-colors">
                             <Smartphone size={16} className="text-green-500" /> Phone Number
                           </label>
                           <input 
                             type="tel" 
                             required
                             className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                             placeholder="+91 98765 43210"
                             value={formData.mobile}
                             onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                           />
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Email Input */}
                         <div className="space-y-2 group">
                           <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 group-focus-within:text-purple-600 transition-colors">
                             <Mail size={16} className="text-purple-500" /> Email Address
                           </label>
                           <input 
                             type="email" 
                             required
                             className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                             placeholder="john@example.com"
                             value={formData.email}
                             onChange={(e) => setFormData({...formData, email: e.target.value})}
                           />
                         </div>

                         {/* Subject Input */}
                         <div className="space-y-2 group">
                           <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 group-focus-within:text-orange-600 transition-colors">
                             <FileText size={16} className="text-orange-500" /> Subject
                           </label>
                           <input 
                             type="text" 
                             required
                             className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                             placeholder="I need help with..."
                             value={formData.subject}
                             onChange={(e) => setFormData({...formData, subject: e.target.value})}
                           />
                         </div>
                      </div>

                      {/* Message Input */}
                      <div className="space-y-2 group">
                           <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2 group-focus-within:text-pink-600 transition-colors">
                             <Send size={16} className="text-pink-500 -rotate-45" /> Your Message
                           </label>
                           <textarea 
                             rows="4" 
                             required
                             className="w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all resize-none dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-medium"
                             placeholder="Tell us more about your requirements..."
                             value={formData.message}
                             onChange={(e) => setFormData({...formData, message: e.target.value})}
                           ></textarea>
                      </div>

                      {/* Honeypot */}
                      <input 
                        type="text" 
                        name="bot-field" 
                        className="hidden" 
                        tabIndex="-1" 
                        autoComplete="off" 
                        value={honeypot} 
                        onChange={(e) => setHoneypot(e.target.value)} 
                      />

                      {/* Security Question (Math Only) */}
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-800/30 flex flex-col sm:flex-row gap-4 items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm text-blue-600 border border-blue-100 dark:border-blue-900/50">
                             <RefreshCw size={18} className="cursor-pointer hover:rotate-180 transition-transform duration-500" onClick={generateSecurityQuestion} />
                           </div>
                           <label className="text-sm font-bold text-gray-700 dark:text-gray-300 select-none">
                             {security.question}
                           </label>
                         </div>
                         <input 
                            type="number"
                            required
                            className={`w-full sm:w-32 px-3 py-2 bg-white dark:bg-gray-950 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:text-white text-center font-bold tracking-wider ${securityError ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 dark:border-gray-700'}`}
                            placeholder="Answer"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                         />
                      </div>
                      {securityError && <p className="text-red-500 text-xs font-bold text-center animate-pulse bg-red-50 dark:bg-red-900/20 p-2 rounded-lg border border-red-100 dark:border-red-800/30">Incorrect math answer. Please try again.</p>}

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95 transition-all duration-300 text-lg"
                      >
                          {isSubmitting ? (
                            <>Sending Securely <RefreshCw className="animate-spin" size={20}/></>
                          ) : (
                            <>Send Message <Send size={20} className="group-hover:translate-x-1 transition-transform" /></>
                          )}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-16 text-center h-full"
                    >
                      <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-green-200 dark:shadow-green-900/20 shadow-xl">
                        <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Message Sent Successfully!</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-sm text-lg">
                        Thank you for reaching out. Our expert team will review your inquiry and get back to you within 24 hours.
                      </p>
                      <button 
                        onClick={() => {
                          setSubmitted(false);
                          generateSecurityQuestion();
                        }}
                        className="px-8 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
                      >
                         Send Another Message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
