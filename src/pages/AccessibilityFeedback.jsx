import React from 'react';
import { motion } from 'framer-motion';
import { FaUniversalAccess } from 'react-icons/fa';

const AccessibilityFeedback = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-4 mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
             <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
               <FaUniversalAccess size={24} />
             </div>
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Accessibility Feedback
             </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We value your input. If you have any suggestions or encountered any barriers while using our website, please fill out the form below.
          </p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name (Optional)</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email (Optional)</label>
                <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="your@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description of Issue</label>
              <textarea rows="5" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Please describe the accessibility barrier you encountered..."></textarea>
            </div>

            <button type="button" className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              Submit Feedback
            </button>
          </form> 
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityFeedback;
