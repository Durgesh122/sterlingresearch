import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

const UnderConstruction = ({ title }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-xl max-w-lg w-full"
      >
        <div className="bg-blue-100 dark:bg-blue-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          This page is currently under development. check back soon for updates!
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;