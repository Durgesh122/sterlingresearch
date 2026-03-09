import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push, set } from "firebase/database";
import { database } from '../../firebase';
import { X, CheckCircle, Shield, AlertCircle, Loader2 } from 'lucide-react';
import SterlingLogo from '../../assets/Starlinglogo4.png'; // Using the logo as requested

const PopupForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    segment: 'Equity (Cash)', // Default
    investment: '',
    experience: ''
  });

  const [security, setSecurity] = useState({ question: '', answer: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [securityError, setSecurityError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  // Sync internal visibility with prop
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      generateSecurityQuestion();
    } else {
      const timer = setTimeout(() => setVisible(false), 300); // Allow exit animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const generateSecurityQuestion = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    const ops = ['+', '*', '-'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    
    let q = '', a = 0;
    if (op === '+') { q = `${n1} + ${n2}`; a = n1 + n2; }
    else if (op === '-') { 
        // Ensure positive result for simplicity
        const max = Math.max(n1, n2); 
        const min = Math.min(n1, n2);
        q = `${max} - ${min}`; 
        a = max - min; 
    }
    else if (op === '*') { q = `${n1} x ${n2}`; a = n1 * n2; }

    setSecurity({ question: q, answer: a.toString() });
    setUserAnswer('');
    setSecurityError(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSecurityError(false);

    // Math Check
    if (userAnswer.trim() !== security.answer) {
      setSecurityError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const leadsRef = ref(database, 'leads');
      const newLeadRef = push(leadsRef);
      await set(newLeadRef, {
        ...formData,
        submittedAt: new Date().toISOString(),
        status: 'New'
      });

      setSubmitSuccess(true);
      
      // Close after delay
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({ name: '', mobile: '', address: '', segment: 'Equity', investment: '', experience: '' });
        onClose();
      }, 3000);

    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!visible && !isOpen) return null;

  const modalContent = (
     <AnimatePresence>
      {isOpen && (
        <motion.div
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with decorative background */}
                <div className="relative bg-white p-4 pt-5 pb-2 md:p-6 md:pt-8 text-center overflow-hidden border-b border-gray-100 shrink-0">
                     <button 
                        onClick={onClose} 
                        className="absolute top-2 right-2 md:top-3 md:right-3 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-20"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex justify-center mb-2 md:mb-3">
                         <img src={SterlingLogo} alt="Sterling Research" className="h-12 md:h-16 object-contain" />
                    </div>

                    <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-1 relative z-10 font-serif tracking-wide text-indigo-900">PREMIUM MARKET RESEARCH</h2>
                    <p className="text-gray-500 text-[10px] md:text-xs relative z-10 max-w-xs mx-auto px-4">
                        Get professional insights and research-backed strategies for your portfolio.
                    </p>
                </div>

                {submitSuccess ? (
                    <div className="p-10 flex flex-col items-center justify-center text-center space-y-4 flex-grow">
                        <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2"
                        >
                            <CheckCircle size={48} />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-gray-800">Thank You!</h3>
                        <p className="text-gray-500">
                            Your inquiry has been received. Our expert will contact you shortly.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-3 md:space-y-4 relative bg-slate-50 overflow-y-auto">
                        <div className="space-y-3 md:space-y-4">
                            {/* Name & Mobile */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Full Name" 
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile Number</label>
                                    <input 
                                        type="tel" 
                                        name="mobile"
                                        required
                                        pattern="[0-9]{10}"
                                        title="Please enter a valid 10-digit mobile number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="10-digit Mobile" 
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                                    />
                                </div>
                            </div>

                             {/* Location */}
                             <div className="space-y-1">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location / City</label>
                                <input 
                                    type="text" 
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="e.g. Mumbai, Delhi" 
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                                />
                            </div>

                             {/* Segment & Investment */}
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Preferred Segment</label>
                                    <select 
                                        name="segment" 
                                        value={formData.segment} 
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                                    >
                                        <option value="Select Segment">Select Segment</option>
                                        <option value="Equity (Cash)">Equity (Cash)</option>
                                        <option value="Derivatives (F&O)">Derivatives (F&O)</option>
                                        <option value="Commodity (MCX)">Commodity (MCX)</option>
                                        <option value="Portfolio Management">Portfolio Management</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Investment Capital</label>
                                    <select
                                        name="investment"
                                        value={formData.investment}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                                    >
                                        <option value="" disabled>Select Amount</option>
                                        <option value="Below 1L">Below ₹1 Lakh</option>
                                        <option value="1L - 5L">₹1 Lakh - ₹5 Lakh</option>
                                        <option value="5L - 10L">₹5 Lakh - ₹10 Lakh</option>
                                        <option value="Above 10L">Above ₹10 Lakh</option>
                                    </select>
                                </div>
                            </div>

                            {/* Math CAPTCHA */}
                            <div className="bg-white p-3 rounded-lg border border-indigo-100 shadow-sm flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-700 font-medium">
                                    <Shield size={18} className="text-indigo-500" />
                                    <span>Solve: <span className="font-bold text-lg">{security.question} = ?</span></span>
                                </div>
                                <input 
                                    type="number" 
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="Answer"
                                    className={`w-24 px-3 py-1.5 rounded border outline-none text-center font-bold ${securityError ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-indigo-500'}`}
                                />
                            </div>
                            {securityError && (
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                    <AlertCircle size={12} /> Incorrect answer. Please try again.
                                </p>
                            )}

                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2.5 md:py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} /> Submitting...
                                </>
                            ) : (
                                "Get Free Strategy Now"
                            )}
                        </button>

                        <p className="text-center text-[10px] text-gray-400 mt-2">
                            By clicking submit, you agree to receive market updates & calls via SMS/WhatsApp.
                        </p>
                    </form>
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