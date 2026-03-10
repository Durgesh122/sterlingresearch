import React from 'react';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { CreditCard, AlertOctagon, RefreshCw, Mail, CheckCircle, HelpCircle, Shield, Scale } from "lucide-react";

const RefundPolicy = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <RevealOnScroll>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                            Refund Policy
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Committed to transparency and fair practices. Please read our refund terms carefully.
                        </p>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={0.1}>
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-8 border-l-4 border-l-blue-500">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg hidden sm:block">
                                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Commitment</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                    We at Sterling Research (Research Analyst) value our clients and are committed to providing unsurpassed services. While we take our accuracy seriously, our clients also need to realize that we do not offer a 100% guarantee on our recommendation.
                                </p>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                <div className="grid gap-8">
                    {/* Service & Communications */}
                    <RevealOnScroll delay={0.2}>
                         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 text-indigo-500" /> Service Activation & Communication
                            </h3>
                            <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                <p>Once a service has been subscribed to and payment has been made for the same, the client will start receiving the Recommendation that they asked for. If for some unforeseen reason, the client is not satisfied with our services, they may contact us to seek oversight on future Recommendations.</p>
                                <p>We at Sterling Research will put our best effort to increase the satisfaction levels in such cases. However, in the unlikely event that the client is not able to receive communications on the contact details provided (for example, due to DND or account settings), and our service provider logs indicate that communications were sent to those details, it will be deemed as delivery of service from our end and will not entitle the client to a refund for non-delivery.</p>
                                <p className="font-medium text-indigo-600 dark:text-indigo-400">We advise clients to ensure their registered contact channel can receive service communications before or as soon as the service is started.</p>
                            </div>
                        </div>
                    </RevealOnScroll>

                    {/* Sales Final */}
                    <RevealOnScroll delay={0.3}>
                         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <AlertOctagon className="w-5 h-5 text-red-500" /> Sales Final & No Refund
                            </h3>
                             <p className="text-gray-600 dark:text-gray-300">
                                All sales are final, and we do not offer refunds for the paid period of services already availed by the client. Complaints or dissatisfaction regarding the quality of services during the paid period shall not entitle the client to any refund or compensation.
                            </p>
                        </div>
                    </RevealOnScroll>

                     {/* SEBI Guidelines */}
                     <RevealOnScroll delay={0.4}>
                         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Scale className="w-5 h-5 text-green-500" /> SEBI Guidelines for Cancellation
                            </h3>
                            <div className="space-y-3 text-gray-600 dark:text-gray-300">
                                <p>As per SEBI guidelines, if a client requests to cancel the subscription, a refund shall only be issued for the unused portion of the subscription period. The refund will be calculated on a pro-rata basis, deducting the charges for the services already availed, including applicable taxes and administrative fees.</p>
                                <p>Refunds will not be provided for the period of services already availed, irrespective of the client’s satisfaction with the recommendations or the outcome of trades.</p>
                            </div>
                        </div>
                    </RevealOnScroll>

                     {/* Market Risks */}
                     <RevealOnScroll delay={0.5}>
                         <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-orange-500" /> Market Risks & User Acknowledgement
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Investment in securities markets are subject to market risks. Profits and losses incurred due to the use of our recommendations are solely the responsibility of the client.</li>
                                <li>By subscribing to our services and making payment, the client acknowledges that they have read, understood, and agreed to the refund policy, as well as the disclaimer, disclosure, and other terms mentioned on our website.</li>
                            </ul>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Contact Section */}
                <RevealOnScroll delay={0.6}>
                    <div className="mt-12 text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                         <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex justify-center items-center gap-2">
                            <HelpCircle className="w-6 h-6 text-blue-500" /> Need Assistance?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">For any questions or assistance regarding our refund policy, please contact us at:</p>
                        
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                             <a href="tel:917415152600" className="flex items-center gap-2 bg-white dark:bg-gray-700 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow text-gray-800 dark:text-white font-medium">
                                <span>📱</span> 91-74151 52600
                             </a>
                             <a href="mailto:support@sterlingresearch.co.in" className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors font-medium">
                                <span>📧</span> support@sterlingresearch.co.in
                             </a>
                        </div>
                    </div>
                </RevealOnScroll>
                
                 <p className="mt-12 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-6">
                    &copy; {new Date().getFullYear()} Sterling Research. All Rights Reserved.
                 </p>
            </div>
        </div>
    );
};

export default RefundPolicy;
