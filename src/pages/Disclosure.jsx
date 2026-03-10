import React from 'react';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { FileText, Info, Scale, ShieldAlert, CheckCircle, MessageSquare, Briefcase, Zap, UserCheck } from "lucide-react";

const Disclosure = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Disclosure Document
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Essential information regarding the Research and Recommendation Services offered by Sterling Research.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-8">
            
            {/* 1. Purpose & 2. About */}
            <div className="grid md:grid-cols-2 gap-8">
                <RevealOnScroll delay={0.1}>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 h-full">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <FileText className="text-blue-500" /> 1. Purpose of This Document
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            This document is intended to provide essential information regarding the Research and Recommendation Services offered by Sterling Research (Research Analyst). The objective is to assist prospective clients in making an informed decision before engaging in our services and undertaking any investment activity.
                        </p>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.2}>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-purple-500 h-full">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Info className="text-purple-500" /> 2. About Sterling Research
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Sterling Research (Research Analyst) provides research and recommendation services in the securities market. Our analysts strive to align their interests with those of clients and aim to offer services best suited to the client's investment profile and objectives.
                        </p>
                    </div>
                </RevealOnScroll>
            </div>

            {/* 3. Terms and Conditions */}
            <RevealOnScroll delay={0.3}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Scale className="text-indigo-500" /> 3. Terms & Conditions of Services
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                         <TermCard 
                            title="Official Communication" 
                            icon={<MessageSquare size={20} />}
                            desc="All recommendations are shared strictly through official and registered communication channels. No separate recommendations are provided via phone calls."
                         />
                         <TermCard 
                            title="Nature of Services" 
                            icon={<Briefcase size={20} />}
                            desc="Services are purely research-based professional opinions subject to market fluctuations. Opinions may differ from other experts."
                         />
                         <TermCard 
                            title="Client Responsibility" 
                            icon={<UserCheck size={20} />}
                            desc="Clients voluntarily agree to consider our inputs. Investment decisions are at the sole discretion and risk of the client."
                         />
                         <TermCard 
                            title="No Guarantee of Returns" 
                            icon={<Zap size={20} />}
                            desc="Sterling Research does not guarantee any returns or profits. The stock market is inherently subject to risk."
                         />
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Limitation of Liability & Modification</h3>
                        <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            <li>Company not liable for financial loss, health/wealth loss, or connectivity failures.</li>
                            <li>Company reserves the right to modify policies or terminate subscriptions without prior notice.</li>
                            <li>Continued use implies acceptance of updated terms.</li>
                        </ul>
                    </div>
                </div>
            </RevealOnScroll>

            {/* 4. Disclosures */}
            <RevealOnScroll delay={0.4}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="text-green-500" /> 4. Disclosures
                    </h2>
                    <div className="space-y-4">
                        <DisclosureItem title="Financial Interest / Ownership" desc="Sterling Research or its employees may have financial interest or beneficial ownership in the securities recommended. Relevant disclosures will be provided at the time of advice." />
                        <DisclosureItem title="Conflict of Interest" desc="There are no actual or potential conflicts of interest arising from any association with issuers of recommended securities that would compromise objectivity or independence." />
                        <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-800">
                            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Compensation Disclosures (Past 12 Months)</h3>
                            <ul className="space-y-2 text-sm text-green-700 dark:text-green-400">
                                <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5 flex-shrink-0" /> No compensation received from the subject company.</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5 flex-shrink-0" /> No compensation for investment banking, merchant banking, or brokerage services.</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5 flex-shrink-0" /> No benefits received from subject company or third party in connection with the report.</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5 flex-shrink-0" /> Subject company was not a client during the preceding 12 months.</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5 flex-shrink-0" /> No service as officers, directors, or employees of the subject company.</li>
                                <li className="flex gap-2"><CheckCircle size={16} className="mt-0.5 flex-shrink-0" /> No market-making activities engaged for the subject company.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* 5. Risk Disclaimer */}
            <RevealOnScroll delay={0.5}>
                <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-200 dark:border-red-800">
                    <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4 flex items-center gap-2">
                        <ShieldAlert /> 5. Risk Disclaimer
                    </h2>
                    <p className="text-red-800 dark:text-red-300 font-medium">
                        Stock market investments and trading are subject to market risks, including the possibility of full or partial loss of capital. Past performance is not indicative of future results. Clients are advised to assess their risk appetite and financial suitability before acting on any recommendation.
                    </p>
                </div>
            </RevealOnScroll>

        </div>
      </div>
    </div>
  );
};

// Helper Components
const TermCard = ({ title, icon, desc }) => (
    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2">
            <span className="text-indigo-500">{icon}</span> {title}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
);

const DisclosureItem = ({ title, desc }) => (
    <div className="border-b last:border-0 border-gray-100 dark:border-gray-700 pb-4 last:pb-0">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
);

export default Disclosure;
