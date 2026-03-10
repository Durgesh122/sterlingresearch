import React from 'react';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { AlertTriangle, FileText, ShieldOff, TrendingDown, WifiOff, Link as LinkIcon, Lock, Gavel, RefreshCw, CreditCard, CheckSquare, Info } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Disclaimer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Please read this disclaimer carefully before using our services.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-yellow-500 mb-8">
                 <div className="flex gap-4 items-start">
                    <div className="mt-1 flex-shrink-0">
                      <Info className="text-yellow-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                        Sterling Research (Research Analyst) believes that the information and recommendations provided through its website, research reports, and services are reliable. However, we do not represent or warrant the accuracy, completeness, or reliability of any information contained in our research material. Investors are strictly advised to independently evaluate market conditions and risks.
                    </p>
                 </div>
            </div>
        </RevealOnScroll>

        <div className="space-y-8">
            
            {/* 1. Nature of Research */}
            <RevealOnScroll delay={0.2}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FileText className="text-blue-500" /> 1. Nature of Research Information
                    </h2>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300 list-disc pl-5">
                        <li>The Research Information is not an exhaustive statement of the financial instruments, issuers, markets, or developments referred to.</li>
                        <li>Opinions expressed are subject to change without notice.</li>
                        <li>The analysis is based on numerous assumptions; different assumptions may result in materially different outcomes.</li>
                        <li>Research reports are provided strictly for the private use of the recipient and carry no liability whatsoever on the part of the company.</li>
                        <li>The material published does not constitute an offer or solicitation to buy or sell securities.</li>
                    </ul>
                </div>
            </RevealOnScroll>

            {/* 2 & 3 Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                 <RevealOnScroll delay={0.3}>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 h-full">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <ShieldOff className="text-indigo-500" /> 2. No Warranty & Limitation
                        </h2>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                            <li className="flex gap-2"><span className="text-indigo-500">•</span> We do not accept responsibility or liability for any errors of fact or opinion.</li>
                            <li className="flex gap-2"><span className="text-indigo-500">•</span> We do not guarantee the timeliness, accuracy, or quality of electronic content.</li>
                            <li className="flex gap-2"><span className="text-indigo-500">•</span> We are not responsible for any financial losses incurred.</li>
                            <li className="flex gap-2"><span className="text-indigo-500">•</span> SEBI registration and NISM certification do not guarantee performance or returns.</li>
                        </ul>
                    </div>
                 </RevealOnScroll>

                 <RevealOnScroll delay={0.4}>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 h-full">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <TrendingDown className="text-orange-500" /> 3. Investment Risk
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            Investment and trading in securities markets involve inherent risks. Predictions may prove incorrect.
                        </p>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                            <li className="flex gap-2"><span className="text-orange-500">•</span> Share price projections are not indicative of future performance.</li>
                            <li className="flex gap-2"><span className="text-orange-500">•</span> Investors must rely on their own judgment.</li>
                            <li className="flex gap-2"><span className="text-orange-500">•</span> Investments discussed may not be suitable for all investors.</li>
                        </ul>
                    </div>
                 </RevealOnScroll>
            </div>
            
            {/* 4. Electronic Risks */}
            <RevealOnScroll delay={0.5}>
                 <div className="bg-gray-50 dark:bg-gray-700/30 p-8 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <WifiOff className="text-gray-500" /> 4. Electronic & Technical Risks
                    </h2>
                     <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Risks associated with internet-based research dissemination services include hardware/software failure, network issues, or delays.
                     </p>
                     <div className="flex flex-wrap gap-2">
                        {['Hardware Failure', 'Network Issues', 'Delays', 'Malfunction', 'Unauthorized Access', 'Viruses'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-white dark:bg-gray-800 text-xs font-semibold rounded-full text-gray-500 border border-gray-200 dark:border-gray-700">{tag}</span>
                        ))}
                     </div>
                 </div>
            </RevealOnScroll>
            
            {/* 5, 6, 7 Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                <SimpleCard icon={<LinkIcon className="text-blue-500"/>} title="5. Third-Party Content">
                    Linked websites are not under our control. Inclusion of links does not imply endorsement. We do not endorse advertisers displayed on our website.
                </SimpleCard>
                <SimpleCard icon={<Lock className="text-purple-500"/>} title="6. Confidentiality">
                    Clients may not forward, share, or distribute our calls, reports, or research information. Unauthorized sharing may result in legal action.
                </SimpleCard>
                 <SimpleCard icon={<Gavel className="text-yellow-600"/>} title="7. Jurisdiction">
                    Subject exclusively to the jurisdiction of the courts of Indore, India. Disputes resolved through mediation/arbitration in Indore.
                </SimpleCard>
            </div>
            
            {/* 8 & 9 */}
            <div className="grid md:grid-cols-2 gap-6">
                 <SimpleCard icon={<RefreshCw className="text-green-500"/>} title="8. Website Modifications">
                    Sterling Research reserves the right to modify website content, terms, and disclaimers at any time without prior notice.
                </SimpleCard>
                 <SimpleCard icon={<CreditCard className="text-indigo-500"/>} title="9. Merchant Liability">
                    We shall not be liable for any loss arising from the decline of authorization of any transaction due to the cardholder exceeding preset limits.
                </SimpleCard>
            </div>

            {/* Acceptance */}
            <RevealOnScroll delay={0.6}>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white text-center shadow-xl">
                    <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                        <CheckSquare /> Acceptance of Terms
                    </h2>
                    <p className="mb-4">
                        By accessing this website, you confirm that you have read, understood, and agree to be legally bound by these terms.
                    </p>
                    <p className="text-sm opacity-80">
                         If you do not agree with any part of this disclaimer, please discontinue use of the website immediately.
                    </p>
                </div>
            </RevealOnScroll>

        </div>
      </div>
    </div>
  );
};

const SimpleCard = ({ icon, title, children }) => (
    <RevealOnScroll>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full hover:shadow-md transition-shadow">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                {icon} {title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {children}
            </p>
        </div>
    </RevealOnScroll>
);

export default Disclaimer;
