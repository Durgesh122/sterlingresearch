import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareHeart, Phone, Mail, ShieldCheck } from 'lucide-react';

const AccessibilityFeedback = () => {
  return (
    <div className="compliance-theme min-h-screen pt-24 pb-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff3d8] text-[#8f1038] text-xs font-bold tracking-wider uppercase mb-4 border border-[#eadfc8]">
              <ShieldCheck size={14} /> Accessibility Support Desk
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
              Accessibility <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8f1038] to-[#d8a136]">Feedback</span>
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We value your input. Share any accessibility issue or suggestion so we can continuously improve your experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-7">
            <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center">
                <MessageSquareHeart size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Response Window</p>
                <p className="text-sm font-bold text-gray-800">Within 2 Business Days</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Support</p>
                <p className="text-sm font-bold text-gray-800">support@sterlingresearch.co.in</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Call Assistance</p>
                <p className="text-sm font-bold text-gray-800">+91 74151 52600</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#eadfc8] bg-white/95 shadow-xl overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#8f1038] to-[#b31b49] text-white">
              <h2 className="text-lg font-bold">Submit Accessibility Feedback</h2>
              <p className="text-xs mt-1 text-white/85">Please share details clearly so our team can resolve the issue quickly.</p>
            </div>

            <form className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Name (Optional)</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-[#eadfc8] bg-white focus:ring-2 focus:ring-[#8f1038]/20 focus:border-[#8f1038] focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-[#eadfc8] bg-white focus:ring-2 focus:ring-[#8f1038]/20 focus:border-[#8f1038] focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description of Issue</label>
                <textarea
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border border-[#eadfc8] bg-white focus:ring-2 focus:ring-[#8f1038]/20 focus:border-[#8f1038] focus:outline-none"
                  placeholder="Please describe the accessibility barrier you encountered..."
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full md:w-auto py-3 px-7 bg-gradient-to-r from-[#8f1038] to-[#d8a136] hover:from-[#7a122f] hover:to-[#c9932c] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#8f1038]/20"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityFeedback;
