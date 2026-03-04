import React from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaFileContract, FaBan } from 'react-icons/fa';

const AntiMoneyLaundering = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-4 mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600">
               <FaUserShield size={28} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Anti-Money Laundering (AML) Policy
            </h1>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-8">
            <p>
              Sterling Research is committed to the highest standards of Anti-Money Laundering (AML) and Combating the Financing of Terrorism (CFT) compliance. We have implemented a comprehensive framework to prevent our services from being used for money laundering or terrorist financing.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FaFileContract className="text-blue-500" /> KYC Verification
                </h3>
                <p className="text-sm">
                  We adhere to strict Know Your Customer (KYC) norms. All clients must undergo identity verification before accessing our premium services. This includes valid government ID, address proof, and PAN card verification.
                </p>
              </div>

               <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FaBan className="text-red-500" /> Suspicious Activities
                </h3>
                <p className="text-sm">
                  We continuously monitor transactions for suspicious patterns. Any activity suspected of being related to money laundering or illegal financing will be reported to the relevant regulatory authorities immediately.
                </p>
              </div>
            </div>

            <div>
               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Policy Objectives</h3>
               <ul className="list-disc pl-5 space-y-2">
                 <li>To prevent criminal elements from using our facilities for money laundering activities.</li>
                 <li>To enable Sterling Research to know and understand its customers and their financial dealings better which, in turn, would help it to manage its risks prudently.</li>
                 <li>To put in place appropriate controls for detection and reporting of suspicious activities in accordance with applicable laws/laid down procedures.</li>
               </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Compliance Officer Contact</h3>
              <p>
                For any queries regarding our AML policy or to report suspicious activity, please contact:
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400 mt-2">
                Compliance Officer Name<br/>
                Email: compliance@sterlingresearch.com
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AntiMoneyLaundering;
