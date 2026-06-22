import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push, set } from "firebase/database";
import { database } from '../../firebase';
import { X, CheckCircle, Shield, AlertCircle, Loader2, User, Phone, MapPin, TrendingUp, Info } from 'lucide-react';
import SterlingLogo from '../../assets/SterlingLogo2.png';

const PopupForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    segment: 'Equity', 
    investment: '',
  });

  const [security, setSecurity] = useState({ question: '', answer: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [securityError, setSecurityError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            generateSecurityQuestion();
        } else {
            const timer = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line
    }, [isOpen]);

    // Memoize security question generation
    const generateSecurityQuestion = useCallback(() => {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 10) + 1;
        const ops = ['+', '*'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let q = '', a = 0;
        if (op === '+') { q = `${n1} + ${n2}`; a = n1 + n2; }
        else if (op === '*') { q = `${n1} x ${n2}`; a = n1 * n2; }
        setSecurity({ question: q, answer: a.toString() });
        setUserAnswer('');
        setSecurityError(false);
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSecurityError(false);

    if (userAnswer.trim() !== security.answer) {
      setSecurityError(true);
      return;
    }

    if (!isChecked) {
        alert("Please accept the terms and conditions.");
        return;
    }

    setIsSubmitting(true);

    try {
      const leadsRef = ref(database, 'leads');
      const newLeadRef = push(leadsRef);
      await set(newLeadRef, {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'New',
        source: 'Popup Form'
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({ name: '', mobile: '', address: '', segment: 'Equity', investment: '' });
        setIsChecked(false);
        onClose();
      }, 3000);

    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
    }, [formData, userAnswer, security.answer, isChecked, onClose, generateSecurityQuestion]);

  if (!visible && !isOpen) return null;

  const modalContent = (
     <AnimatePresence>
      {isOpen && (
        <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <motion.div
                className="relative w-full max-w-md bg-white/70 dark:bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] backdrop-blur-xl border border-white/30"
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                style={{ WebkitBackdropFilter: 'blur(16px)', backdropFilter: 'blur(16px)' }}
            >
                {/* Header Section - Premium Glass Gradient */}
                <div className="relative flex flex-col items-center justify-center px-6 pt-8 pb-6 bg-gradient-to-b from-blue-600/80 via-blue-400/60 to-white/0 dark:from-blue-900/80 dark:via-blue-800/60 dark:to-gray-900/0">
                    <button 
                        onClick={onClose}
                        className="absolute top-3 right-3 text-white bg-black/20 hover:bg-black/40 p-1.5 rounded-full shadow-lg transition-colors z-20"
                        aria-label="Close"
                    >
                        <X size={22} />
                    </button>
                    <div className="w-14 h-14 mb-2 rounded-full bg-white/80 shadow-lg flex items-center justify-center ring-2 ring-blue-200 dark:ring-blue-900">
                        <img src={SterlingLogo} alt="Sterling Research" className="w-10 h-10 object-contain" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-white drop-shadow tracking-tight text-center">
                        Sterling Research
                    </h2>
                    <div className="flex items-center gap-1.5 mt-1">
                        <Shield size={14} className="text-emerald-200 drop-shadow" />
                        <span className="text-[11px] font-bold text-emerald-100 uppercase tracking-widest drop-shadow">
                            SEBI Registered Analyst
                        </span>
                    </div>
                </div>

                {/* Body Section */}
                {submitSuccess ? (
                    <div className="p-10 flex flex-col items-center justify-center text-center space-y-6 flex-grow min-h-[300px]">
                        <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2 ring-1 ring-emerald-100"
                        >
                            <CheckCircle size={40} />
                        </motion.div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-gray-900">Request Submitted</h3>
                            <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
                                Thank you for your interest. Our research team will contact you shortly to assist you further.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto bg-white/40 dark:bg-gray-900/30">
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 ml-1">Full Name <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-2.5 text-blue-400 dark:text-blue-300">
                                                <User size={16} />
                                            </div>
                                            <input 
                                                type="text" 
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter Name" 
                                                className="w-full pl-9 pr-3 py-2 bg-white/80 dark:bg-gray-800/80 border border-blue-100 dark:border-blue-900 rounded-xl focus:ring-2 focus:ring-blue-400/20 focus:border-blue-500 outline-none transition-all text-sm placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 ml-1">Mobile Number <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-2.5 text-blue-400 dark:text-blue-300">
                                                <Phone size={16} />
                                            </div>
                                            <input 
                                                type="tel" 
                                                name="mobile"
                                                required
                                                pattern="[0-9]{10}"
                                                title="Please enter a valid 10-digit mobile number"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                placeholder="10-digit Mobile" 
                                                className="w-full pl-9 pr-3 py-2 bg-white/80 dark:bg-gray-800/80 border border-blue-100 dark:border-blue-900 rounded-xl focus:ring-2 focus:ring-blue-400/20 focus:border-blue-500 outline-none transition-all text-sm placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 ml-1">Location</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-2.5 text-blue-400 dark:text-blue-300">
                                            <MapPin size={16} />
                                        </div>
                                        <input 
                                            type="text" 
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Your City" 
                                            className="w-full pl-9 pr-3 py-2 bg-white/80 dark:bg-gray-800/80 border border-blue-100 dark:border-blue-900 rounded-xl focus:ring-2 focus:ring-blue-400/20 focus:border-blue-500 outline-none transition-all text-sm placeholder:text-gray-400"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 ml-1">Product</label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-2.5 text-blue-400 dark:text-blue-300">
                                                <TrendingUp size={16} />
                                            </div>
                                            <select 
                                                name="segment" 
                                                value={formData.segment} 
                                                onChange={handleChange}
                                                className="w-full pl-9 pr-3 py-2 bg-white/80 dark:bg-gray-800/80 border border-blue-100 dark:border-blue-900 rounded-xl focus:ring-2 focus:ring-blue-400/20 focus:border-blue-500 outline-none transition-all text-gray-600 text-sm appearance-none cursor-pointer"
                                            >
                                                <option value="Equity">Equity</option>
                                                <option value="Derivatives">Derivatives</option>
                                                <option value="Commodity">Commodity</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 ml-1">Investment Size</label>
                                        <select
                                            name="investment"
                                            value={formData.investment}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-white/80 dark:bg-gray-800/80 border border-blue-100 dark:border-blue-900 rounded-xl focus:ring-2 focus:ring-blue-400/20 focus:border-blue-500 outline-none transition-all text-sm text-gray-600 appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select Amount</option>
                                            <option value="< 1L">Below ₹1 Lakh</option>
                                            <option value="1L-5L">₹1 Lakh - ₹5 Lakh</option>
                                            <option value="> 5L">Above ₹5 Lakh</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* Human Verification */}
                            <div className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${securityError ? 'bg-red-50 border-red-200' : 'bg-white/80 dark:bg-gray-800/80 border-blue-100 dark:border-blue-900'}`}>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">CAPTCHA</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">What is <span className="font-bold">{security.question}</span> ?</span>
                                </div>
                                <input 
                                    type="number" 
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="?"
                                    className={`w-16 py-1 px-2 rounded border text-center font-bold outline-none text-sm transition-all focus:ring-1 ${securityError ? 'border-red-300 focus:border-red-400' : 'border-blue-100 dark:border-blue-900 focus:border-blue-400'}`}
                                />
                            </div>
                            {/* Consent Checkbox - Critical for compliance */}
                            <div className="flex items-start gap-3 bg-blue-50/60 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100/50 dark:border-blue-900/40">
                                <div className="relative flex items-center mt-0.5">
                                    <input 
                                        type="checkbox" 
                                        required
                                        checked={isChecked}
                                        onChange={() => setIsChecked(!isChecked)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer" 
                                    />
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-gray-300 leading-relaxed text-justify">
                                    I authorize Sterling Research to contact me via Call, SMS, WhatsApp, or Email regarding market updates & services. This consent overrides any DND registration. I have read and agree to the <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Terms & Conditions</span>.
                                </p>
                            </div>
                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                disabled={isSubmitting || !isChecked}
                                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl shadow-xl hover:shadow-2xl transform transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} /> Processing...
                                    </>
                                ) : (
                                    "Submit Enquiry"
                                )}
                            </button>
                            <div className="text-center pt-2 border-t border-blue-100 dark:border-blue-900 mt-2">
                                <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider flex items-center justify-center gap-1">
                                    <AlertCircle size={11} /> Investment in securities market are subject to market risks.
                                </p>
                            </div>
                        </form>
                    </div>
                )}
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
};

export default PopupForm;
