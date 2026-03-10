import React from 'react';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { Shield, Eye, Database, Mail, Bell, FileText, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Sterling Research (Research Analyst) values the privacy and preferences of our online visitors and customers.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-8 border-l-4 border-l-blue-500">
                <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg hidden sm:block">
                        <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Commitment</h2>
                         <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            This Privacy Policy explains how we collect, use, and protect your information when you visit our website: <a href="https://www.sterlingresearch.co.in/" className="text-blue-600 hover:underline">https://www.sterlingresearch.co.in/</a>.
                        </p>
                    </div>
                </div>
            </div>
        </RevealOnScroll>

        <div className="space-y-6">
            {/* 1. Feedback */}
            <RevealOnScroll delay={0.2}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-500" /> 1. Feedback, Surveys, and Polls
                    </h3>
                    <div className="space-y-2 text-gray-600 dark:text-gray-300">
                        <p>From time to time, we may request your feedback to evaluate and improve the services provided by Sterling Research. You may be invited to participate in surveys or polls posted on our website or shared with you directly.</p>
                        <p className="font-medium text-gray-800 dark:text-gray-200">Participation in any survey or poll is entirely voluntary.</p>
                    </div>
                </div>
            </RevealOnScroll>

            {/* 2. Website Visits */}
            <RevealOnScroll delay={0.3}>
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-green-500" /> 2. Website Visits
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        You may browse our website anonymously and access information about our organization, products, and services without providing any personal information such as your name, phone number, postal address, or email address.
                    </p>
                </div>
            </RevealOnScroll>

            {/* 3. Personal Information */}
            <RevealOnScroll delay={0.4}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Database className="w-5 h-5 text-purple-500" /> 3. Personal Information
                    </h3>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>In certain areas of our website, we may request personal information to enhance your experience or to follow up with you after your visit. Providing this information is completely optional.</p>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">We may collect info when you:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                    <li>Register on <span className="text-blue-500">sterlingresearch.co.in</span></li>
                                    <li>Conduct transactions through the website</li>
                                    <li>Subscribe to services or offers</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Information requested may include:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Telephone number</li>
                                    <li>Postal address</li>
                                    <li>Other relevant details</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            {/* 4. Use of Personal Information */}
            <RevealOnScroll delay={0.5}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-red-500" /> 4. Use of Personal Information
                    </h3>
                    <div className="space-y-4 text-gray-600 dark:text-gray-300">
                        <p>Any personal information you provide will be kept confidential and used to support and enhance our relationship with you.</p>
                        <div>
                            <p className="mb-2">We may use your information to:</p>
                             <ul className="list-disc pl-5 space-y-1">
                                <li>Respond to your inquiries</li>
                                <li>Provide requested services</li>
                                <li>Inform you about special offers, upgrades, or additional services that may be of interest to you</li>
                            </ul>
                        </div>
                         <p className="font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-2 rounded">
                            We do not sell or rent your personal information to third parties.
                        </p>
                    </div>
                </div>
            </RevealOnScroll>
            
             {/* 5. Changes */}
            <RevealOnScroll delay={0.6}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow border-gray-100 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-yellow-500" /> 5. Changes to This Policy
                    </h3>
                     <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Sterling Research may update this Privacy Policy from time to time. When changes are made, we will post the revised policy on this page.
                    </p>
                     <p className="text-gray-600 dark:text-gray-300">
                         We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                     </p>
                </div>
            </RevealOnScroll>

            {/* 6. Contact */}
              <RevealOnScroll delay={0.7}>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 p-8 rounded-2xl shadow-md border border-blue-100 dark:border-gray-700 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex justify-center items-center gap-2">
                        <Mail className="w-6 h-6 text-blue-600" /> 6. Contact Us
                    </h3>
                     <p className="text-gray-600 dark:text-gray-300 mb-6">
                        If you have any questions or concerns regarding this Privacy Policy, please contact us at:
                    </p>
                    <a href="mailto:support@sterlingresearch.co.in" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors font-medium">
                        <span>📧</span> support@sterlingresearch.co.in
                    </a>
                </div>
            </RevealOnScroll>

        </div>
        
         <p className="mt-12 text-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-6">
            &copy; {new Date().getFullYear()} Sterling Research. All Rights Reserved.
         </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
