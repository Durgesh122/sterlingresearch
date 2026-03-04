import React from 'react';
import { motion } from 'framer-motion';

const GrievanceRedressal = () => {
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
            Grievance Redressal Mechanism
          </h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-8">
            <p>
              At Sterling Research, client satisfaction is our priority. If you have any grievance or complaint, please follow the steps below for a quick resolution.
            </p>

            <div>
               <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Level 1: Contact Customer Support</h3>
               <p>
                 You can contact our customer support team for any queries or complaints. We aim to resolve all issues within 24-48 hours.
                 <br/><strong>Email:</strong> support@sterlingresearch.com
                 <br/><strong>Phone:</strong> +91-XXXXXXXXXX
               </p>
            </div>

            <div>
               <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Level 2: Escalate to Compliance Officer</h3>
               <p>
                 If you are not satisfied with the resolution provided at Level 1, you can escalate the matter to our Compliance Officer.
                 <br/><strong>Name:</strong> [Name of Compliance Officer]
                 <br/><strong>Email:</strong> compliance@sterlingresearch.com
                 <br/><strong>Phone:</strong> +91-XXXXXXXXXX
               </p>
            </div>

             <div>
               <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Level 3: SEBI SCORES</h3>
               <p>
                 If your complaint is not resolved within a reasonable time frame or if you are not satisfied with the resolution, you can lodge a complaint with SEBI on SCORES (SEBI Complaints Redress System).
                 <br/><a href="https://scores.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visit SCORES Website</a>
               </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800 mt-6">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Filing Complaints on SCORES – Easy & Quick</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Register on SCORES portal</li>
                <li>Mandatoy details for filing complaints on SCORES: Name, PAN, Address, Mobile Number, Email ID</li>
                <li>Benefits: Effective communication, Speedy redressal of the grievances</li>
              </ul>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GrievanceRedressal;
