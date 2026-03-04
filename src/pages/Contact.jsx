import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, ArrowRight, CheckCircle, RefreshCw } from "lucide-react";
import ContactImage from "../assets/Contactpageimage.png";
import { database } from '../firebase';
import { ref, push, set } from "firebase/database";


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
  const [honeypot, setHoneypot] = useState(''); // Hidden field for bots
  const [securityError, setSecurityError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Generate smart security question on mount
  useEffect(() => {
    generateSecurityQuestion();
  }, []);

  const generateSecurityQuestion = () => {
    const types = ['math', 'logic', 'logic']; // Increase logic probability
    const type = types[Math.floor(Math.random() * types.length)];
    
    let q = '', a = '';

    if (type === 'math') {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        
        // Randomly pick operation
        const ops = ['+', '-', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        
        // Randomly use words for numbers to confuse scrapers
        const numWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
        const useWord = Math.random() > 0.5;
        const n1Display = useWord && n1 <= 10 ? numWords[n1] : n1;

        if (op === '+') {
            q = `What is ${n1Display} plus ${n2}?`;
            a = (n1 + n2).toString();
        } else if (op === '-') {
            // Ensure positive result for simplicity
            const big = Math.max(n1, n2);
            const small = Math.min(n1, n2);
            q = `Subtract ${small} from ${big}?`;
            a = (big - small).toString();
        } else {
             q = `Multiply ${n1} by ${n2}?`;
             a = (n1 * n2).toString();
        }
    } else {
        // Logic Questions (Harder for basic bots)
        const logicQuestions = [
            { q: "Which is bigger: 2 or 100?", a: "100" },
            { q: "Type the first letter of 'APPLE'", a: "A" },
            { q: "10 minus 0 equals?", a: "10" },
            { q: "Are fire trucks red or blue?", a: "red" },
            { q: "Which is a fruit: Apple or Car?", a: "Apple" },
            { q: "How many legs does a dog have?", a: "4" }
        ];
        const selected = logicQuestions[Math.floor(Math.random() * logicQuestions.length)];
        q = selected.q;
        a = selected.a; // Logic questions answer should be lower case match in validation
    }

    setSecurity({ question: q, answer: a.toString().toLowerCase() });
    setUserAnswer('');
    setSecurityError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSecurityError(false);

    // 1. Honeypot check (Bots fill this invisible field)
    if (honeypot) {
        // Silently fail for bots
        return; 
    }

    // 2. Initial Security Check
    if (userAnswer.toLowerCase().trim() !== security.answer) {
      setSecurityError(true);
      if (Math.random() > 0.5) generateSecurityQuestion(); // Regenerate sometimes to prevent brute force
      return;
    }

    setIsSubmitting(true);

    try {
      // Save directly to Firebase Realtime Database
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
      generateSecurityQuestion(); // Reset for next time
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
      title: "Call",
      details: "+1 (555) 123-4567",
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@sterlingresearch.com",
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: MapPin,
      title: "Visit",
      details: "123 Market St, NY",
      color: "text-green-600 dark:text-green-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans pt-20 pb-8 flex items-center">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section - More Compact */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 lg:mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Get In Touch</span>
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
             We are here to help you navigate your financial journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Clean Image (No Carding) */}
          <motion.div 
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6 }}
             className="relative flex justify-center lg:justify-end order-2 lg:order-1"
          >
             {/* Simple Responsive Image without heavy card styling */}
             <div className="relative w-full max-w-md lg:max-w-full">
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl transform scale-75"></div>
                <img 
                  src={ContactImage} 
                  alt="Contact Us" 
                  className="relative z-10 w-full h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />
             </div>
          </motion.div>

          {/* Right Column: Compact Contact Form */}
          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="order-1 lg:order-2"
          >
             <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Name</label>
                              <input 
                                type="text" 
                                required
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:text-white"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Mobile</label>
                              <input 
                                type="tel" 
                                required
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:text-white"
                                placeholder="Mobile No."
                                value={formData.mobile}
                                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                              />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Email</label>
                            <input 
                              type="email" 
                              required
                              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:text-white"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Subject</label>
                            <input 
                              type="text" 
                              required
                              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:text-white"
                              placeholder="Inquiry Subject"
                              value={formData.subject}
                              onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Message</label>
                            <textarea 
                              rows="3" 
                              required
                              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm dark:text-white"
                              placeholder="How can we help?"
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                        </div>
                        
                        {/* Hidden Honeypot Field */}
                        <div className="hidden" aria-hidden="true">
                           <label htmlFor="bot-field">Don't fill this out if you're human:</label>
                           <input 
                             name="bot-field" 
                             type="text" 
                             id="bot-field"
                             autoComplete="off" 
                             value={honeypot} 
                             onChange={(e) => setHoneypot(e.target.value)} 
                             tabIndex="-1" 
                           />
                        </div>

                        {/* Smart Security Question */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50 space-y-2">
                           <div className="flex justify-between items-center">
                              <label className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                Security Check: {security.question}
                              </label>
                              <button 
                                type="button" 
                                onClick={generateSecurityQuestion}
                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1 rounded-full hover:bg-white/50 dark:hover:bg-white/10"
                                title="Get New Question"
                              >
                                <RefreshCw size={12} />
                              </button>
                           </div>
                           <input 
                              type="text" 
                              required
                              className={`w-full px-3 py-2 bg-white/80 dark:bg-gray-900/80 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:text-white transition-all ${securityError ? 'border-red-500 ring-1 ring-red-200' : 'border-gray-200 dark:border-gray-700'}`}
                              placeholder="Your answer..."
                              value={userAnswer}
                              onChange={(e) => setUserAnswer(e.target.value)}
                           />
                        </div>
                        {securityError && <p className="text-red-500 text-[10px] font-bold text-right -mt-1 animate-pulse">That doesn't seem right. Try again.</p>}
                        
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="group w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all duration-300 text-sm"
                        >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">Securely Sending... <RefreshCw className="animate-spin" size={16}/></span>
                            ) : (
                              <>Send Message <Send size={16} className="group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Received!</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        We'll be in touch soon.
                      </p>
                      <button 
                        onClick={() => {
                          setSubmitted(false);
                          generateSecurityQuestion();
                        }}
                        className="text-blue-600 font-bold text-sm hover:underline"
                      >
                         New Message
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
             
             {/* Mini Contact Info below form */}
             <div className="flex justify-between mt-6 px-2">
                 {contactInfo.map((info, idx) => (
                     <div key={idx} className="flex flex-col items-center gap-1">
                         <div className={`p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm ${info.color}`}>
                             <info.icon size={16} />
                         </div>
                         <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">{info.title}</span>
                         <span className="text-[10px] sm:text-xs text-gray-900 dark:text-white font-semibold">{info.details.split(',')[0]}</span>
                     </div>
                 ))}
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
