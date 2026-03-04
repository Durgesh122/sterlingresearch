import React from 'react';
import { motion } from 'framer-motion';

const Disclosure = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-blue-600"
        >
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 border-gray-200 dark:border-gray-700">
            Disclosure
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Regulatory Disclosure</h3>
            <p>
              Sterling Research is a SEBI Registered Research Analyst entity. We adhere to the regulations and guidelines set forth by the Securities and Exchange Board of India (SEBI).
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Financial Interest</h3>
            <p>
              The Research Analyst or their family members may or may not have financial interest in the companies covered in our research reports. Any such interest will be explicitly disclosed in the respective research report.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Compensation</h3>
            <p>
              Sterling Research or its associates have not received any compensation from the subject company in the past 12 months. We do not engage in any market making activities for the subject company.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Client Confidentiality</h3>
            <p>
              We maintain strict confidentiality of our clients' personal data and trading activity, except where disclosure is required by law or regulatory authorities.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Disclosure;
