import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ref, push, onValue, query, limitToLast, orderByKey } from 'firebase/database';
import { database } from '../firebase';
import {
  FaExclamationTriangle,
  FaPaperPlane,
  FaCheckCircle,
  FaRegClock,
  FaUserTie,
  FaShieldAlt,
  FaHistory,
  FaListAlt,
  FaSearch
} from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri';
import RevealOnScroll from "../components/common/RevealOnScroll";

const ComplaintBoard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    complaintType: '',
    description: '',
    resolution: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // SEO: Update Document Title
  useEffect(() => {
    document.title = "Complaint Board - Sterling Research | Grievance Redressal";
    window.scrollTo(0, 0);
  }, []);

  const complaintTypes = [
    "Service Delay", "Research Quality", "Miscommunication",
    "Refund Request", "Technical Issue", "Billing Problem", "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Save complaint to RTDB
    try {
      const newComplaint = {
        ...formData,
        timestamp: Date.now(),
        status: 'Pending', // Initial status
        ticketId: `SR-${Date.now().toString().slice(-6)}`
      };
      
      await push(ref(database, 'complaints'), newComplaint);
      
      // Simulate slight delay for better UX
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false);
        setCurrentStep(4);
      }, 1500);

    } catch (err) {
      console.error('Error saving complaint:', err);
      setError('Failed to submit complaint. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans pt-24 pb-16 px-4 py-8">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-5 border border-blue-200 dark:border-blue-800 shadow-sm">
               <FaShieldAlt /> Grievance Redressal
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
               Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Support Center</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
               We are committed to resolving your concerns promptly and transparently. Your feedback helps us serve you better.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        
        {/* Left Col: Submission Form */}
        <div className="lg:col-span-8">
          <motion.section
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
              {/* Card */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 sm:p-10 relative overflow-hidden ring-1 ring-gray-900/5 dark:ring-white/10">
                
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                {/* Header inside card */}
                {!submitted && (
                  <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-8 relative z-10"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl mb-4 shadow-inner ring-4 ring-white dark:ring-gray-800">
                      <RiCustomerService2Fill className="text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Lodge a Complaint
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Expected resolution time: <span className="font-bold text-blue-600 dark:text-blue-400">7 working days</span>.
                    </p>
                  </motion.div>
                )}

                {/* Progress Bar */}
                {!submitted && (
                  <div className="mb-10 relative z-10 px-4">
                    <div className="flex justify-between relative max-w-md mx-auto">
                      {/* Background Line */}
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 -translate-y-1/2 rounded-full"></div>
                      {/* Active Line - Animated width based on step */}
                      <div 
                        className="absolute top-1/2 left-0 h-1 bg-blue-600 dark:bg-blue-500 -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                      ></div>
                      
                      {[1, 2, 3].map((step) => (
                        <div key={step} className="relative z-10 flex flex-col items-center group cursor-default">
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-4 ${
                              currentStep >= step 
                                ? 'bg-blue-600 border-blue-100 dark:border-blue-900 text-white shadow-lg shadow-blue-500/30 scale-110' 
                                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-400'
                            }`}
                          >
                            {currentStep > step ? <FaCheckCircle /> : step}
                          </div>
                          <span className={`mt-2 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                            currentStep >= step ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-600'
                          }`}>
                            {['Details', 'Complaint', 'Review'][step - 1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  {!submitted ? (
                      <motion.form
                          key="form"
                          className="relative z-10"
                          onSubmit={handleSubmit}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                      >
                          {/* Step 1: Personal Info */}
                          {currentStep === 1 && (
                              <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                              >
                                  <div className="space-y-5">
                                      <div className="group">
                                          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide ml-1">Full Name</label>
                                          <div className="relative">
                                            <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                                placeholder="Enter your full name"
                                            />
                                          </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="group">
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide ml-1">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="group">
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide ml-1">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                                placeholder="+91 74151 52600"
                                            />
                                        </div>
                                      </div>
                                  </div>

                                  <div className="flex justify-end pt-4">
                                      <button
                                          type="button"
                                          onClick={nextStep}
                                          disabled={!formData.name || !formData.email || !formData.mobile}
                                          className="group flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:translate-x-1"
                                      >
                                          Next Step
                                          <FaHistory className="rotate-180 group-hover:block hidden" /> {/* Arrow icon workaround */}
                                      </button>
                                  </div>
                              </motion.div>
                          )}

                          {/* Step 2: Complaint Details */}
                          {currentStep === 2 && (
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }} 
                                className="space-y-6"
                              >
                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide ml-1">Nature of Complaint</label>
                                      <div className="relative">
                                        <FaExclamationTriangle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                        <select
                                            name="complaintType"
                                            value={formData.complaintType}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select complaint type</option>
                                            {complaintTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                      </div>
                                  </div>

                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide ml-1">Detailed Description</label>
                                      <textarea
                                          name="description"
                                          value={formData.description}
                                          onChange={handleChange}
                                          required
                                          rows={5}
                                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none placeholder-gray-400 dark:placeholder-gray-600"
                                          placeholder="Please describe the issue, including dates and any relevant transaction IDs..."
                                      />
                                  </div>
                                  
                                  <div>
                                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide ml-1">Expected Resolution (Optional)</label>
                                      <input
                                          type="text"
                                          name="resolution"
                                          value={formData.resolution}
                                          onChange={handleChange}
                                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                                          placeholder="How would you like this to be resolved?"
                                      />
                                  </div>

                                  <div className="flex justify-between pt-4">
                                      <button
                                          type="button"
                                          onClick={prevStep}
                                          className="px-6 py-3 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                                      >
                                          Back
                                      </button>
                                      <button
                                          type="button"
                                          onClick={nextStep}
                                          disabled={!formData.complaintType || !formData.description}
                                          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:translate-x-1"
                                      >
                                          Review
                                      </button>
                                  </div>
                              </motion.div>
                          )}

                          {/* Step 3: Review */}
                          {currentStep === 3 && (
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                              >
                                  <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700/50 space-y-4">
                                      <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3 mb-4 flex items-center gap-2">
                                          Summary
                                      </h3>
                                      
                                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 text-sm">
                                          <div>
                                              <dt className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Full Name</dt>
                                              <dd className="font-semibold text-gray-900 dark:text-white text-base">{formData.name}</dd>
                                          </div>
                                          <div>
                                              <dt className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Contact Info</dt>
                                              <dd className="font-semibold text-gray-900 dark:text-white text-base">{formData.email}</dd>
                                              <dd className="text-gray-600 dark:text-gray-400">{formData.mobile}</dd>
                                          </div>
                                          <div className="sm:col-span-2">
                                              <dt className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Complaint Type</dt>
                                              <dd className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                                                {formData.complaintType}
                                              </dd>
                                          </div>
                                          <div className="sm:col-span-2">
                                              <dt className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Description</dt>
                                              <dd className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">{formData.description}</dd>
                                          </div>
                                          {formData.resolution && (
                                            <div className="sm:col-span-2">
                                                <dt className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wide mb-1">Expected Resolution</dt>
                                                <dd className="text-gray-700 dark:text-gray-300 italic">"{formData.resolution}"</dd>
                                            </div>
                                          )}
                                      </dl>
                                  </div>
                                  
                                  <div className="flex items-start gap-3 px-2">
                                      <div className="flex bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg w-full">
                                        <FaCheckCircle className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                        <p className="ml-3 text-xs text-blue-800 dark:text-blue-200">
                                            By submitting this form, you confirm that the information provided is accurate. Your complaint will be logged in our system for immediate review.
                                        </p>
                                      </div>
                                  </div>

                                  {error && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm text-center">
                                      {error}
                                    </div>
                                  )}

                                  <div className="flex justify-between pt-2">
                                      <button
                                          type="button"
                                          onClick={prevStep}
                                          disabled={isSubmitting}
                                          className="px-6 py-3 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                                      >
                                          Back
                                      </button>
                                      <button
                                          type="submit"
                                          disabled={isSubmitting}
                                          className="relative min-w-[160px] px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-wait"
                                      >
                                          {isSubmitting ? (
                                            <>
                                              <FaPaperPlane className="animate-bounce mr-2" /> Processing...
                                            </>
                                          ) : (
                                            "Submit Complaint"
                                          )}
                                      </button>
                                  </div>
                              </motion.div>
                          )}
                      </motion.form>
                  ) : (
                      <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-10 relative z-10"
                      >
                          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-[bounce_1s_ease-in-out_1]">
                              <FaCheckCircle className="text-5xl" />
                          </div>
                          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Complaint Registered!</h2>
                          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                              Thank you for reaching out. Your ticket ID is <span className="font-mono font-bold bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-800 dark:text-white">SR-{Date.now().toString().slice(-6)}</span>. Our support team will review your case and respond within 7 working days.
                          </p>
                          <button
                              onClick={() => {
                                  setSubmitted(false);
                                  setCurrentStep(1);
                                  setFormData({ name: '', email: '', mobile: '', complaintType: '', description: '', resolution: '' });
                              }}
                              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-colors"
                          >
                              Return to Dashboard
                          </button>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
          </motion.section>
        </div>

        {/* Right Col: Info / Recent Complaints (if permited) */}
        <div className="lg:col-span-4 space-y-8">
            {/* Info Widget */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <FaShieldAlt className="text-blue-600" /> Support Policy
               </h3>
               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  We value your trust. All complaints are handled by our dedicated grievance officer in compliance with SEBI regulations.
               </p>
               <ul className="space-y-3">
                  {[
                    "Acknowledgement within 24 hours",
                    "Resolution within 7 working days",
                    "Dedicated escalation matrix",
                    "Transparent tracking"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                       <FaCheckCircle className="text-green-500" size={12} /> {item}
                    </li>
                  ))}
               </ul>
            </div>

            {/* Recent Public Complaints (Removed as requested) */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-2">Track Your Status</h3>
                <p className="text-xs text-blue-700 dark:text-blue-300 mb-4">
                  For updates on your submitted tickets, please check your registered email address or contact support.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintBoard;
