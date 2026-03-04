import React from 'react';
import { motion } from 'framer-motion';

const Disclaimer = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-yellow-500"
        >
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
            Disclaimer
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
            <p className="font-semibold text-red-500">
              Investing in the stock market involves a significant risk of loss. Please read this disclaimer carefully.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">1. Not Financial Advice</h3>
            <p>
              The information provided by Sterling Research is for educational and informational purposes only. It should not be construed as professional financial advice, an offer to sell, or a solicitation of an offer to buy any securities.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">2. Risk of Loss</h3>
            <p>
              Stock trading and investing are subject to market risks. You should be aware that you could lose some or all of your capital. Sterling Research is not responsible for any financial losses or damages incurred from the use of our research or recommendations.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">3. Accuracy of Information</h3>
            <p>
              While we strive to provide accurate and up-to-date information, we do not warrant the completeness or accuracy of the data provided. Market conditions change rapidly, and past performance is not a guarantee of future returns.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">4. SEBI Registration</h3>
            <p>
              Sterling Research is a SEBI Registered Research Analyst (Registration No: INHXXXXXXXXX). However, registration does not imply a guarantee of performance or returns.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Disclaimer;
