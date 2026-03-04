import React from 'react';
import { motion } from 'framer-motion';

const RefundPolicy = () => {
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
            Refund & Cancellation Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
            <p>
              At Sterling Research, we are committed to providing high-quality research and analysis services. Please read our refund policy carefully before subscribing to any of our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">1. No Refund Policy</h3>
            <p>
              Due to the nature of our services (digital content, real-time research, and financial analysis), <strong>all sales are final</strong>. We do not offer refunds or cancellations once a subscription has been activated and services have commenced.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">2. Free Trials & Evaluation</h3>
            <p>
              We may offer free content or trial periods to help you evaluate our services before making a purchase. We strongly encourage you to go through our free resources, track records, and past performance to ensure our services meet your requirements.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">3. Exceptional Circumstances</h3>
            <p>
              In rare cases of technical errors (e.g., double payment), please contact our support team immediately at <a href="mailto:support@sterlingresearch.com" className="text-blue-600 hover:underline">support@sterlingresearch.com</a>. Such cases will be reviewed on an individual basis, and refunds, if approved, will be processed within 7-10 business days.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">4. User Responsibility</h3>
            <p>
              It is the client's responsibility to understand the risks involved in stock market trading. Past performance is not indicative of future results. Subscription fees are for research services only and do not guarantee profits.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;
