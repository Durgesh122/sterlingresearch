import React from 'react';
import { motion } from 'framer-motion';
import { FaUserShield, FaFileContract, FaBan } from 'react-icons/fa';
import AML1 from '../assets/aml1.png';
import AML2 from '../assets/aml2.png';

const AntiMoneyLaundering = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 border-b pb-6 border-gray-200 dark:border-gray-700">
            <div className="p-4 bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/40 dark:to-red-900/20 rounded-2xl text-red-600 shadow-sm">
               <FaUserShield size={32} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Anti-Money Laundering (AML) Policy
              </h1>
              <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium">Protecting the financial system through vigilance and compliance.</p>
            </div>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-8 leading-relaxed">
            <div className="bg-gray-50 dark:bg-gray-700/20 p-6 rounded-2xl border-l-4 border-red-500">
              <p className="font-medium text-gray-800 dark:text-gray-200 m-0">
                <span className="font-bold text-red-600 dark:text-red-400">Anti-Money Laundering (AML)</span> is a set of policies, procedures, and technologies that prevents money laundering. It is implemented within government systems and large financial institutions to monitor potentially fraudulent activity.
              </p>
            </div>
            
            <p>
              AML policies are guidelines and processes developed by financial organizations to detect, prevent, and report potential money laundering activities. These rules maintain regulatory compliance and contribute to worldwide efforts to prevent financial crime.
            </p>

            <div className="flex justify-center my-8">
              <img src={AML1} alt="AML Overview" className="rounded-xl shadow-lg w-full max-w-2xl hover:scale-[1.02] transition-transform duration-300" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6 border-l-4 border-blue-500 pl-4">Money Laundering — Overview</h3>
            <p className="leading-relaxed">
              There are three major steps in money laundering: <span className="font-semibold text-blue-600 dark:text-blue-400">placement, layering, and integration</span>. The process typically involves placing illicit funds into the financial system (placement), carrying out transactions to disguise the origin (layering), and returning the cleaned funds to the economy (integration).
            </p>
            <p className="leading-relaxed">
               Financial institutions apply various controls to monitor suspicious activity that could be involved in money laundering. Common controls include customer due diligence, software filtering, transaction monitoring and holding periods.
            </p>

            <div className="flex justify-center my-8">
              <img src={AML2} alt="AML Controls" className="rounded-xl shadow-lg w-full max-w-2xl hover:scale-[1.02] transition-transform duration-300" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6 border-l-4 border-blue-500 pl-4">Anti-Money Laundering — Controls</h3>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
               <div className="bg-white dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                 <strong className="text-lg text-blue-600 dark:text-blue-400 block mb-2">1. Criminalization</strong>
                 <p className="text-sm sm:text-base">Many governments, financial institutions, and businesses impose controls to prevent money laundering. Criminalization by authorities enables prosecution of individuals involved in laundering schemes and is supported by international agreements such as the United Nations conventions.</p>
               </div>
               
               <div className="bg-white dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                 <strong className="text-lg text-blue-600 dark:text-blue-400 block mb-2">2. Know Your Customer (KYC)</strong>
                 <p className="text-sm sm:text-base">Financial institutions must implement KYC policies to verify and monitor customer identities, understand normal transaction behavior, and identify transactions that raise red flags. Suspicious activity must be reported to the appropriate financial investigation unit.</p>
               </div>

               <div className="bg-white dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                 <strong className="text-lg text-blue-600 dark:text-blue-400 block mb-2">3. Record Management & Software Filtering</strong>
                 <p className="text-sm sm:text-base">Institutions keep detailed transaction records and use software to flag suspicious activity. Customer data may be classified by risk level and transactions blocked or reviewed when certain criteria are met.</p>
               </div>

               <div className="bg-white dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                 <strong className="text-lg text-blue-600 dark:text-blue-400 block mb-2">4. Holding Periods</strong>
                 <p className="text-sm sm:text-base">Some banks require deposits to remain in an account for a designated number of days (commonly around five) to reduce the speed at which funds are moved and to help detect suspicious flows.</p>
               </div>

               <div className="bg-white dark:bg-gray-700/30 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                 <strong className="text-lg text-blue-600 dark:text-blue-400 block mb-2">5. New Technology</strong>
                 <p className="text-sm sm:text-base">Emerging technologies such as AI and big-data analytics improve detection accuracy. They enable sophisticated pattern recognition and real-time monitoring to identify laundering techniques more effectively.</p>
               </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 mt-12 text-center shadow-inner">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Commitment to Compliance</h3>
              <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                By combining legal frameworks, careful customer screening, robust record-keeping, technology-driven monitoring, and staff training, our AML programs help reduce financial crime and ensure compliance with regulatory requirements.
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AntiMoneyLaundering;
