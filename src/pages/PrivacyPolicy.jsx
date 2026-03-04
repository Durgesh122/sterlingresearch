import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
            <p>
              Effective Date: March 3, 2026 <br/>
              Sterling Research ("we", "our", "us") values your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">1. Information We Collect</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and payment information when you subscribe.</li>
              <li><strong>Usage Data:</strong> Information on how you interact with our website, including IP address, browser type, and pages visited.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">2. How We Use Your Information</h3>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide and maintain our services.</li>
              <li>Process payments and manage subscriptions.</li>
              <li>Send you administrative information, such as updates to our terms and policies.</li>
              <li>Respond to your inquiries and support requests.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">3. Data Security</h3>
            <p>
              We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">4. Third-Party Sharing</h3>
            <p>
              We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and advertisers.
            </p>

             <h3 className="text-xl font-semibold text-gray-800 dark:text-white">5. Cookies</h3>
            <p>
              Our website uses "cookies" to enhance the user experience. You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
