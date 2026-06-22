import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ListChecks, BadgeCheck, MessageSquare } from 'lucide-react';

const AccessibilityStatement = () => {
  return (
    <div className="compliance-theme min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-[#eadfc8]"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff3d8] text-[#8f1038] text-xs font-bold tracking-wider uppercase mb-4 border border-[#eadfc8]">
              <ShieldCheck size={14} /> Inclusion Commitment
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">
              Accessibility <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8f1038] to-[#d8a136]">Statement</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Sterling Research is committed to building an accessible experience for every user, regardless of ability or assistive technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center"><ListChecks size={18} /></div>
              <div>
                <p className="text-xs text-gray-500">Standard</p>
                <p className="text-sm font-bold text-gray-800">WCAG 2.1</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center"><BadgeCheck size={18} /></div>
              <div>
                <p className="text-xs text-gray-500">Conformance</p>
                <p className="text-sm font-bold text-gray-800">Partially AA</p>
              </div>
            </div>
            <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center"><MessageSquare size={18} /></div>
              <div>
                <p className="text-xs text-gray-500">Feedback Channel</p>
                <p className="text-sm font-bold text-gray-800">Always Open</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-5 text-gray-600 dark:text-gray-300">
            <div className="rounded-2xl border border-[#eadfc8] bg-[#fffdf8] p-5">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Our Commitment</h2>
              <p className="leading-relaxed">
              Sterling Research is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadfc8] bg-[#fffdf8] p-5">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Measures to Support Accessibility</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Include accessibility as part of our mission statement.</li>
                <li>Integrate accessibility into our procurement practices.</li>
                <li>Provide continual accessibility training for our staff.</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[#eadfc8] bg-[#fffdf8] p-5">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Conformance Status</h2>
              <p className="leading-relaxed">
                The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Sterling Research is partially conformant with WCAG 2.1 level AA.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadfc8] bg-[#fffdf8] p-5">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Feedback</h2>
              <p className="leading-relaxed">
                We welcome your feedback on the accessibility of Sterling Research. Please let us know if you encounter accessibility barriers on our website.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityStatement;
