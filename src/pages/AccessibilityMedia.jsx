import React from 'react';
import { motion } from 'framer-motion';
import { FaPlayCircle, FaFileAudio } from 'react-icons/fa';
import { ShieldCheck, Captions, Headphones, HandMetal } from 'lucide-react';

const AccessibilityMedia = () => {
  const mediaItems = [
    {
      title: 'How to Use Our Trading Platform',
      description: 'A guided tutorial with closed captions and audio description.',
      badge: 'Video + CC',
      icon: <FaPlayCircle size={48} className="group-hover:scale-110 transition-transform duration-300" />,
      tags: ['Captions', 'Audio Desc'],
    },
    {
      title: 'Market Outlook 2026 - Audio Summary',
      description: 'Listen to key highlights of our annual market outlook report.',
      badge: 'Audio',
      icon: <FaFileAudio size={48} className="group-hover:scale-110 transition-transform duration-300" />,
      tags: ['Transcript Available'],
    },
    {
      title: 'Welcome to Sterling Research',
      description: 'Introduction video with Indian Sign Language (ISL) interpretation.',
      badge: 'Sign Language',
      icon: <FaPlayCircle size={48} className="group-hover:scale-110 transition-transform duration-300" />,
      tags: ['ISL Support'],
    },
  ];

  return (
    <div className="compliance-theme min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff3d8] text-[#8f1038] text-xs font-bold tracking-wider uppercase mb-4 border border-[#eadfc8]">
              <ShieldCheck size={14} /> Inclusive Content Library
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-center mb-4 text-gray-900 dark:text-white tracking-tight">
              Accessibility <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8f1038] to-[#d8a136]">Media</span>
            </h1>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore our collection of accessible media resources, including audio descriptions, transcripts, and sign language interpretations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center"><Captions size={18} /></div>
              <div>
                <p className="text-xs text-gray-500">Caption Ready</p>
                <p className="text-sm font-bold text-gray-800">Closed Captions</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center"><Headphones size={18} /></div>
              <div>
                <p className="text-xs text-gray-500">Audio Friendly</p>
                <p className="text-sm font-bold text-gray-800">Narration + Summaries</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center"><HandMetal size={18} /></div>
              <div>
                <p className="text-xs text-gray-500">Inclusive Access</p>
                <p className="text-sm font-bold text-gray-800">ISL Supported</p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mediaItems.map((item) => (
              <div key={item.title} className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-[#eadfc8]">
                <div className="h-48 bg-gradient-to-br from-[#fff7e7] to-[#fff3d8] flex items-center justify-center relative cursor-pointer text-[#8f1038]">
                  {item.icon}
                  <span className="absolute bottom-2 right-2 bg-[#8f1038] text-white text-xs px-2 py-1 rounded">{item.badge}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-[#fff3d8] text-[#8f1038] px-2 py-1 rounded border border-[#eadfc8] font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityMedia;
