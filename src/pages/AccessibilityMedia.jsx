import React from 'react';
import { motion } from 'framer-motion';
import { FaPlayCircle, FaFileAudio } from 'react-icons/fa';

const AccessibilityMedia = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Accessibility <span className="text-blue-600">Media</span>
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Explore our collection of accessible media resources, including audio descriptions, transcripts, and sign language interpretations.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Media Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative group cursor-pointer text-gray-400">
                 <FaPlayCircle size={48} className="group-hover:scale-110 transition-transform duration-300" />
                 <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Video + CC</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How to use our Trading Platform</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  A guided tutorial with closed captions and audio description.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded dark:bg-blue-900 dark:text-blue-200">Captions</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded dark:bg-green-900 dark:text-green-200">Audio Desc</span>
                </div>
              </div>
            </div>

             {/* Media Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative group cursor-pointer text-gray-400">
                 <FaFileAudio size={48} className="group-hover:scale-110 transition-transform duration-300" />
                 <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Audio</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Market Outlook 2026 - Audio Summary</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Listen to the key highlights of our annual market outlook report.
                </p>
                <div className="flex gap-2">
                   <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded dark:bg-purple-900 dark:text-purple-200">Transcript Available</span>
                </div>
              </div>
            </div>

             {/* Media Card 3 */}
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative group cursor-pointer text-gray-400">
                 <FaPlayCircle size={48} className="group-hover:scale-110 transition-transform duration-300" />
                 <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Sign Language</span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Welcome to Sterling Research</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Introduction video with Indian Sign Language (ISL) interpretation.
                </p>
                <div className="flex gap-2">
                   <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded dark:bg-orange-900 dark:text-orange-200">ISL</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityMedia;
