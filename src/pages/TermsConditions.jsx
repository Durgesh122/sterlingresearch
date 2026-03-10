import React from 'react';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { FileText, Shield, AlertTriangle, CreditCard, Scale, Lock, UserCheck, HelpCircle } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Please read these terms carefully before using our services. Your use of Sterling Research services constitutes your agreement to these terms.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
            <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                    <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Sterling Research</h2>
                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    <strong>Dear Client,</strong><br/>
                    By accessing our website and any of its pages, you agree to comply with and be bound by the following Terms & Conditions. Sterling Research (Research Analyst) reserves the right to modify, alter, or update these terms at any time without prior notice or liability.
                  </p>
                </div>
            </div>
          </div>
        </RevealOnScroll>
          
        <div className="space-y-6">
            {/* Section 1 */}
            <RevealOnScroll delay={0.2}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" /> 1. Nature of Services
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        <li>All trading recommendations are provided with proper stop loss levels.</li>
                        <li>It is mandatory for clients to maintain the provided stop loss in every trade.</li>
                        <li>Sterling Research (Research Analyst) shall not be liable for any losses resulting from failure to maintain prescribed stop loss levels.</li>
                        <li>Services and recommendations are shared through official registered communication channels only.</li>
                        <li>Telephonic support (where applicable as per package) is provided strictly for clarification purposes.</li>
                    </ul>
                </div>
            </RevealOnScroll>

            {/* Section 2 */}
            <RevealOnScroll delay={0.2}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-purple-500" /> 2. Communication & Technical Delays
                    </h3>
                    <div className="text-gray-600 dark:text-gray-300 space-y-2">
                         <p>Sterling Research (Research Analyst) shall not be held responsible for delays in communication due to third-party technical failures, including telecom or internet disruptions.</p>
                        <p>For assistance, contact: <a href="mailto:support@sterlingresearch.co.in" className="text-blue-600 dark:text-blue-400 hover:underline">support@sterlingresearch.co.in</a></p>
                    </div>
                </div>
             </RevealOnScroll>

            {/* Section 3 */}
            <RevealOnScroll delay={0.2}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" /> 3. Trading Responsibility
                    </h3>
                     <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        <li>Clients are advised to execute all trading calls provided for optimal results.</li>
                        <li>Clients must strictly follow all technical levels and instructions.</li>
                        <li>Investments in NSE/BSE/MCX/Stock Market are subject to market risks.</li>
                        <li>Sterling Research (Research Analyst) does not provide:
                            <ul className="list-[circle] pl-5 mt-1 space-y-1 text-sm">
                                <li>Guaranteed returns</li>
                                <li>Fixed profit commitments</li>
                                <li>Profit-sharing services</li>
                                <li>Portfolio management services</li>
                            </ul>
                        </li>
                    </ul>
                    <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium">All trading and investment decisions are undertaken at the client’s own risk.</p>
                </div>
            </RevealOnScroll>

             {/* Section 4 */}
            <RevealOnScroll delay={0.2}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-yellow-500" /> 4. Payment & Refund Policy
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                        <li>Subscription fees must be paid in advance.</li>
                        <li>Services commence only after successful KYC completion.</li>
                        <li>Subscription fees are non-refundable for availed service as per refund policy.</li>
                        <li>Refund requests (if any) may be reviewed only under company terms and conditions.</li>
                        <li>Profit or loss incurred from trading will be borne entirely by the client.</li>
                    </ul>
                     <p className="mt-2 text-gray-600 dark:text-gray-300">Exceptional cases do not include:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Market-related losses</li>
                        <li>Client unavailability</li>
                        <li>Capital-related constraints</li>
                    </ul>
                </div>
            </RevealOnScroll>

             {/* Section 5 & 6 */}
             <div className="grid md:grid-cols-2 gap-6">
                <RevealOnScroll delay={0.3}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-red-500 hover:shadow-lg transition-shadow h-full">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                             <Lock className="w-5 h-5 text-red-500" /> 5. Account & Security
                        </h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Do not share your Demat login ID or password with anyone, including company employees.</li>
                            <li>Sterling Research (Research Analyst) is not responsible for losses due to credential sharing.</li>
                            <li>Clients must ensure no unauthorized person uses their payment instruments.</li>
                        </ul>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.3}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-lg transition-shadow h-full">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                             <AlertTriangle className="w-5 h-5 text-indigo-500" /> 6. No Liability Clause
                        </h3>
                         <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Market losses</li>
                            <li>Website unavailability</li>
                            <li>Misrepresentation by third parties</li>
                            <li>Declined payment transactions due to bank/card limits</li>
                            <li>Downloaded or modified website content</li>
                            <li>Suspension or modification of services</li>
                        </ul>
                        <p className="mt-2 text-sm italic text-gray-500">Sterling Research reserves the right to modify or discontinue services at any time.</p>
                    </div>
                </RevealOnScroll>
             </div>

             {/* Section 7, 8, 9, 10 */}
             <RevealOnScroll delay={0.2}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">7. Loan Disclaimer</h3>
                             <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Sterling Research does not recommend taking loans for investment purposes as markets carry inherent risks.</p>
                             
                             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">8. Jurisdiction</h3>
                             <p className="text-gray-600 dark:text-gray-300 text-sm">Any dispute shall be subject exclusively to the jurisdiction of the Courts at Indore, Madhya Pradesh (India).</p>
                        </div>
                        <div>
                             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">9. Registration & KYC</h3>
                             <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">To access services, clients must provide required personal information and complete KYC formalities as per regulatory norms.</p>
                             
                             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">10. Acceptance of Terms</h3>
                             <p className="text-gray-600 dark:text-gray-300 text-sm">By making payment or accessing the website, you acknowledge that you have read, understand, and agree to these Terms & Conditions.</p>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
         </div>

        {/* Most Important Section */}
        <RevealOnScroll delay={0.4}>
          <div className="mt-12 bg-gray-50 dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl border-2 border-red-100 dark:border-red-900/30">
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6 flex items-center gap-3">
                <Scale className="w-8 h-8" />
                Most Important Terms and Conditions
            </h3>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <ol className="list-decimal pl-5 space-y-4 marker:text-red-500 marker:font-bold">
                    <li>These terms and conditions, and consent thereon are for the research services provided by the Research Analyst (RA) and RA cannot execute/carry out any trade (purchase/sell transaction) on behalf of, the client. Thus, the clients are advised not to permit RA to execute any trade on their behalf.</li>
                    <li>The fee charged by RA to the client will be subject to the maximum of amount prescribed by SEBI/ Research Analyst Administration and Supervisory Body (RAASB) from time to time (applicable only for Individual and HUF Clients).
                        <p className="mt-2 text-sm bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-700/30">
                            <strong>Note:</strong><br/>
                            • The current fee limit is Rs 1,51,000/- per annum per family of client for all research services of the RA.<br/>
                            • The fee limit does not include statutory charges.<br/>
                            • The fee limits do not apply to a non-individual client / accredited investor.
                        </p>
                    </li>
                    <li>RA may charge fees in advance if agreed by the client. Such advance shall not exceed the period stipulated by SEBI; presently it is one quarter. In case of pre mature termination of the RA services by either the client or the RA, the client shall be entitled to seek refund of proportionate fees only for unexpired period.</li>
                    <li>Fees to RA may be paid by the client through any of the specified modes like cheque, online bank transfer, UPI, etc. Cash payment is not allowed. Optionally the client can make payments through Centralized Fee Collection Mechanism (CeFCoM) managed by BSE Limited (i.e. currently recognized RAASB).</li>
                    <li>The RA is required to abide by the applicable regulations/ circulars/ directions specified by SEBI and RAASB from time to time in relation to disclosure and mitigation of any actual or potential conflict of interest. The RA will endeavor to promptly inform the client of any conflict of interest that may affect the services being rendered to the client.</li>
                    <li>Any assured/guaranteed/fixed returns schemes or any other schemes of similar nature are prohibited by law. No scheme of this nature shall be offered to the client by the RA.</li>
                    <li>The RA cannot guarantee returns, profits, accuracy, or risk-free investments from the use of the RA’s research services. All opinions, projections, estimates of the RA are based on the analysis of available data under certain assumptions as of the date of preparation/publication of research report.</li>
                    <li>Any investment made based on recommendations in research reports are subject to market risks, and recommendations do not provide any assurance of returns. There is no recourse to claim any losses incurred on the investments made based on the recommendations in the research report. Any reliance placed on the research report provided by the RA shall be as per the client’s own judgement and assessment of the conclusions contained in the research report.</li>
                    <li>The SEBI registration, Enlistment with RAASB, and NISM certification do not guarantee the performance of the RA or assure any returns to the client.</li>
                    <li>
                        <strong>Grievance Redressal:</strong>
                        <div className="mt-2 grid md:grid-cols-3 gap-4 text-sm">
                            <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                <strong>Step 1:</strong> Contact RA<br/>
                                <a href="mailto:support@sterlingresearch.co.in" className="text-blue-600 hover:underline">support@sterlingresearch.co.in</a><br/>
                                Mobile: 917415152600
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                <strong>Step 2:</strong> SEBI SCORES<br/>
                                <a href="http://www.scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.scores.sebi.gov.in</a>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                <strong>Step 3:</strong> Smart ODR<br/>
                                <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://smartodr.in</a>
                            </div>
                        </div>
                    </li>
                    <li>Clients are required to keep contact details, including email id and mobile number/s updated with the RA at all times.</li>
                    <li>The RA shall never ask for the client’s login credentials and OTPs for the client’s Trading Account Demat Account and Bank Account. Never share such information with anyone including RA.</li>
                </ol>
             </div>
             <p className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Sterling Research. All Rights Reserved.
             </p>
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
};

export default TermsConditions;
