import React from 'react';
import { motion } from 'framer-motion';

const VisionMission = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Vision & <span className="text-blue-600">Mission</span>
          </h1>

          <div className="space-y-12">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                Our Vision
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                To be the most trusted and insightful financial research partner for investors, 
                empowering them with data-driven strategies and cutting-edge market analysis to achieve sustainable wealth creation.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                Our Mission
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>To provide accurate, timely, and actionable financial research that simplifies complex market dynamics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>To maintain the highest standards of integrity, transparency, and compliance in all our recommendations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>To foster financial literacy and educate investors to make informed trading decisions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span>To continuously innovate our analytical tools and methodologies for superior performance.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisionMission;
