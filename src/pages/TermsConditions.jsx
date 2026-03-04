import React from 'react';
import { motion } from 'framer-motion';

const TermsConditions = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
            Terms & Conditions
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
            <p>
              Welcome to Sterling Research. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">1. Use of Services</h3>
            <p>
              Our services are intended for personal, non-commercial use only. You may not reproduce, distribute, or modify any content from our website without prior written consent.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">2. Subscription & Payments</h3>
            <p>
              All subscription fees must be paid in advance. Prices are subject to change without notice. We reserve the right to terminate your subscription if payment is not received or if you violate our terms.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">3. Intellectual Property</h3>
            <p>
              All content provided by Sterling Research, including reports, charts, and analysis, is the intellectual property of Sterling Research and is protected by copyright laws.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">4. Governing Law</h3>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in [Your City/State].
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditions;
