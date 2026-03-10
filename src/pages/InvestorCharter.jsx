import React from 'react';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { Eye, Target, Briefcase, ListCheck, AlertCircle, ThumbsUp, ThumbsDown, ShieldCheck } from "lucide-react";

const InvestorCharter = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Investor Charter
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              In Respect of Research Analysts (RAs)
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-12">
            
            {/* A. Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-8">
                 <RevealOnScroll delay={0.1}>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 h-full">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600">
                                <Eye size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Vision</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg italic">
                            "Invest with knowledge & safety."
                        </p>
                    </div>
                 </RevealOnScroll>

                 <RevealOnScroll delay={0.2}>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-t-4 border-purple-500 h-full">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600">
                                <Target size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mission</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Every investor should be able to invest in right investment products based on their needs, manage and monitor them to meet their goals, access reports and enjoy financial wellness.
                        </p>
                    </div>
                 </RevealOnScroll>
            </div>

            {/* B. Details of Business */}
            <RevealOnScroll delay={0.3}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <Briefcase className="text-indigo-500" /> Details of Business Transacted
                    </h2>
                    <ul className="grid md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                         <ListItem text="Publish research reports based on research activities." />
                         <ListItem text="Provide independent unbiased views on securities." />
                         <ListItem text="Offer unbiased recommendations, disclosing financial interests." />
                         <ListItem text="Provide recommendations based on analysis of publicly available info." />
                         <ListItem text="Conduct annual audits." />
                         <ListItem text="Ensure advertisements adhere to the Advertisement Code." />
                         <ListItem text="Maintain records of interactions with all clients." />
                    </ul>
                </div>
            </RevealOnScroll>

            {/* C. Services Provided */}
            <RevealOnScroll delay={0.4}>
                 <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                         <ListCheck className="text-green-500" /> Details of Services Provided
                    </h2>
                    
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 bg-gray-100 dark:bg-gray-700 p-2 rounded inline-block">Onboarding of Clients</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                            <li>Sharing of terms and conditions of research services.</li>
                            <li>Completing KYC of fee-paying clients.</li>
                        </ul>
                    </div>

                    <div>
                         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 bg-gray-100 dark:bg-gray-700 p-2 rounded inline-block">Disclosure to Clients</h3>
                         <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                             <ListItem text="Disclose material info (business activity, disciplinary history, terms, risk, conflicts)." />
                             <ListItem text="Disclose extent of AI usage in research services." />
                             <ListItem text="Disclose conflicts of interest for third-party reports." />
                             <ListItem text="Disclose conflicts between research and other activities." />
                             <ListItem text="Distribute reports without discrimination." />
                             <ListItem text="Maintain confidentiality of reports until public." />
                             <ListItem text="Respect data privacy and protect confidential info." />
                             <ListItem text="Disclose timelines for services." />
                             <ListItem text="Provide clear guidance/caution for high-risk products." />
                             <ListItem text="Treat all clients with honesty and integrity." />
                         </ul>
                    </div>
                </div>
            </RevealOnScroll>
            
            {/* D. Grievance Redressal */}
            <RevealOnScroll delay={0.5}>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-md border border-orange-100 dark:border-gray-700">
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                         <AlertCircle className="text-orange-500" /> Grievance Redressal Mechanism
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                             <h3 className="font-bold text-lg mb-3 dark:text-white">1. Filing with Research Analyst</h3>
                             <p className="text-gray-600 dark:text-gray-300">Investor may approach the concerned Research Analyst. We strive to redress the grievance immediately, but not later than <span className="font-bold text-orange-600">21 days</span>.</p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                             <h3 className="font-bold text-lg mb-3 dark:text-white">2. Filing on SCORES or RAASB</h3>
                             <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                 <li><strong>SCORES 2.0:</strong> <a href="https://scores.sebi.gov.in" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">https://scores.sebi.gov.in</a></li>
                                 <li><strong>First Review:</strong> Designated Body (RAASB)</li>
                                 <li><strong>Second Review:</strong> SEBI</li>
                             </ul>
                        </div>

                         <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
                             <h3 className="font-bold text-lg mb-3 dark:text-white">3. ODR Platform</h3>
                             <p className="text-gray-600 dark:text-gray-300">If unsatisfied, file a complaint on <strong>SMARTODR</strong> for online conciliation/arbitration.</p>
                        </div>
                        
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                            Physical Complaints: Office of Investor Assistance and Education, SEBI Bhavan, Mumbai-400051
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* E. Rights */}
             <RevealOnScroll delay={0.6}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                         <ShieldCheck className="text-blue-500" /> Rights of Investors
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <RightCard title="Privacy & Confidentiality" />
                        <RightCard title="Transparent Practices" />
                        <RightCard title="Adequate Information" />
                        <RightCard title="Initial & Continuing Disclosure" />
                        <RightCard title="Statutory & Regulatory Disclosures" />
                        <RightCard title="Service Parameters & Turnaround Times" />
                        <RightCard title="Heard & Satisfactory Grievance Redressal" />
                        <RightCard title="Timely Redressal" />
                        <RightCard title="Exit from Financial Product/Service" />
                        <RightCard title="Clear Guidance on High-Risk Products" />
                        <RightCard title="Suitable Access for Differently Abled" />
                        <RightCard title="Provide Feedback" />
                    </div>
                </div>
             </RevealOnScroll>

             {/* F. Do's and Don'ts */}
             <div className="grid md:grid-cols-2 gap-8">
                <RevealOnScroll delay={0.7}>
                    <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl border border-green-200 dark:border-green-800 h-full">
                        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6 flex items-center gap-3">
                            <ThumbsUp /> Do's
                        </h2>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                             <ListItem text="Always deal with SEBI registered Research Analyst." />
                             <ListItem text="Ensure valid registration certificate & check SEBI number." />
                             <ListItem text="Check list of SEBI registered RAs on SEBI website." />
                             <ListItem text="Pay attention to disclosures in research reports." />
                             <ListItem text="Pay through banking channels only (maintain receipts)." />
                             <ListItem text="Check for research recommendation before buying/selling." />
                             <ListItem text="Ask relevant questions/clear doubts before acting." />
                             <ListItem text="Seek clarifications on complex/high-risk products." />
                             <ListItem text="Be aware of right to stop availing service." />
                             <ListItem text="Be aware of right to provide feedback." />
                             <ListItem text="Inform SEBI about assured/guaranteed returns." />
                        </ul>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.8}>
                    <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl border border-red-200 dark:border-red-800 h-full">
                        <h2 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-6 flex items-center gap-3">
                            <ThumbsDown /> Don'ts
                        </h2>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
                             <ListItem text="Do not provide funds for investment to the Research Analyst." icon={<span className="text-red-500 mr-2">✕</span>} />
                             <ListItem text="Don’t fall prey to luring advertisements or market rumors." icon={<span className="text-red-500 mr-2">✕</span>} />
                             <ListItem text="Do not get attracted to limited period discounts/gifts." icon={<span className="text-red-500 mr-2">✕</span>} />
                             <ListItem text="Do not share login credentials/password of trading/demat/bank accounts." icon={<span className="text-red-500 mr-2">✕</span>} />
                        </ul>
                    </div>
                </RevealOnScroll>
             </div>
        
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ListItem = ({ text, icon }) => (
    <li className="flex items-start">
        {icon || <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>}
        <span>{text}</span>
    </li>
);

const RightCard = ({ title }) => (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center font-medium text-gray-700 dark:text-gray-200 text-sm shadow-sm transition-transform hover:scale-105">
        {title}
    </div>
);

export default InvestorCharter;
