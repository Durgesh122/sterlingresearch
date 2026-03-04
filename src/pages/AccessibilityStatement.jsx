import React from 'react';
import { motion } from 'framer-motion';

const AccessibilityStatement = () => {
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
            Accessibility Statement
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
            <p>
              Sterling Research is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Measures to support accessibility</h3>
            <p>
              Sterling Research takes the following measures to ensure accessibility of our website:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Include accessibility as part of our mission statement.</li>
              <li>Integrate accessibility into our procurement practices.</li>
              <li>Provide continual accessibility training for our staff.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Conformance status</h3>
            <p>
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Sterling Research is partially conformant with WCAG 2.1 level AA.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Feedback</h3>
            <p>
              We welcome your feedback on the accessibility of Sterling Research. Please let us know if you encounter accessibility barriers on our website.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityStatement;
