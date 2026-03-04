import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaLightbulb, FaShieldAlt } from 'react-icons/fa';

const InvestorHandbook = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Investor <span className="text-blue-600">Handbook</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your comprehensive guide to understanding the stock market, trading basics, and smart investing strategies.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Chapter 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-blue-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                  <FaBookOpen size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Basics of Stock Market</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Understand the fundamental concepts of stocks, exchanges, indices (Sensex, Nifty), and how trading works in India.
              </p>
              <button className="text-blue-600 font-semibold hover:underline">Read Chapter →</button>
            </div>

            {/* Chapter 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-green-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600">
                  <FaLightbulb size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investing vs Trading</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Learn the key differences between long-term investing for wealth creation and short-term trading for income generation.
              </p>
              <button className="text-green-600 font-semibold hover:underline">Read Chapter →</button>
            </div>

            {/* Chapter 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-purple-500">
               <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600">
                  <FaShieldAlt size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Risk Management</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Discover essential strategies to protect your capital, including stop-losses, diversification, and position sizing.
              </p>
              <button className="text-purple-600 font-semibold hover:underline">Read Chapter →</button>
            </div>

            {/* Chapter 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-orange-500">
               <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600">
                  <FaBookOpen size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Do's and Don'ts</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                A checklist of best practices and common pitfalls to avoid when participating in the financial markets.
              </p>
              <button className="text-orange-600 font-semibold hover:underline">Read Chapter →</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestorHandbook;
