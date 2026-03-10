import React from 'react';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { Shield, Headphones, UserCheck, Clock, Mail, Phone, MapPin, AlertCircle, Gavel, FileText, CheckCircle } from "lucide-react";

const GrievanceRedressal = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-4">
              Grievance Redressal Matrix
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We believe that investor service is a vital element for sustained business growth. Our commitment is to ensure that investors receive exemplary service across all touchpoints.
            </p>
          </div>
        </RevealOnScroll>

        {/* Commitment Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
            <RevealOnScroll delay={0.1}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-blue-500 h-full">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Shield className="text-blue-500" /> Our Commitment
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        As an organization operating under a Direct-to-Investor model, we place significant emphasis on building strong, transparent, and long-term relationships. Prompt and efficient service is essential for maintaining trust.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        Investor queries and complaints represent an important voice of our investors. We view them as opportunities to improve and strengthen our processes.
                    </p>
                </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-cyan-500 h-full">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                         <CheckCircle className="text-cyan-500" /> Policy Principles
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex gap-3">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0"></span>
                            <span className="text-gray-600 dark:text-gray-300">Investors will be treated fairly at all times.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0"></span>
                            <span className="text-gray-600 dark:text-gray-300">Complaints raised by Investors will be dealt with courtesy and in a timely manner.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0"></span>
                            <span className="text-gray-600 dark:text-gray-300">Queries and Complaints will be treated efficiently and fairly.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0"></span>
                            <span className="text-gray-600 dark:text-gray-300">Working in good faith and without prejudice, towards the interests of the Investors.</span>
                        </li>
                    </ul>
                </div>
            </RevealOnScroll>
        </div>

        {/* Escalation Matrix Table */}
        <RevealOnScroll delay={0.3}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-16 border border-gray-100 dark:border-gray-700">
                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FileText className="text-indigo-500" /> Escalation Matrix
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b dark:border-gray-700 font-semibold">Designation</th>
                                <th className="p-4 border-b dark:border-gray-700 font-semibold">Contact Person</th>
                                <th className="p-4 border-b dark:border-gray-700 font-semibold">Address</th>
                                <th className="p-4 border-b dark:border-gray-700 font-semibold">Contact / Email</th>
                                <th className="p-4 border-b dark:border-gray-700 font-semibold">Working Hours</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <TableRow 
                                role="Customer Care" 
                                person="Support Team" 
                                address="Indore" 
                                contact="+91 74151 52600"
                                email="support@sterlingresearch.co.in"
                                hours="Mon-Fri 09:30 AM – 05:00 PM"
                            />
                            <TableRow 
                                role="Head of Customer Care" 
                                person="Support Head" 
                                address="Indore" 
                                contact="+91 74151 52600"
                                email="support@sterlingresearch.co.in"
                                hours="Mon-Fri 09:30 AM – 05:00 PM"
                            />                            <TableRow 
                                role="Compliance Officer" 
                                person="Compliance Team" 
                                address="Indore" 
                                contact="+91 74151 52600"
                                email="compliance@sterlingresearch.co.in"
                                hours="Mon-Fri 11:00 AM – 05:00 PM"
                            />
                            <TableRow 
                                role="CEO / Principal Officer" 
                                person="Management" 
                                address="Indore" 
                                contact="+91 74151 52600"
                                email="compliance@sterlingresearch.co.in"
                                hours="Mon-Fri 11:00 AM – 05:00 PM"
                            />                            <TableRow 
                                role="Compliance Officer" 
                                person="Compliance Team" 
                                address="Indore" 
                                contact="+91 74151 52600"
                                email="compliance@sterlingresearch.co.in"
                                hours="Mon-Fri 11:00 AM – 05:00 PM"
                            />
                             <TableRow 
                                role="CEO / Principal Officer" 
                                person="Management" 
                                address="Indore" 
                                contact="+91 74151 52600"
                                email="compliance@sterlingresearch.co.in"
                                hours="Mon-Fri 11:00 AM – 05:00 PM"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </RevealOnScroll>

        {/* Escalation Process Steps */}
        <div className="mb-16">
            <RevealOnScroll>
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Step-by-Step Escalation Process</h2>
            </RevealOnScroll>
            
            <div className="space-y-6">
                <StepCard 
                    level="01"
                    title="Initial Query or Complaint"
                    description="You can seek clarification or lodge a complaint in writing, orally, telephonically, or by filling out the complaint box available on our website."
                    contact="+91 74151 52600"
                    email="support@sterlingresearch.co.in"
                    time="Within 7 business days"
                    color="blue"
                />
                
                <StepCard 
                    level="02"
                    title="Escalation to Head of Customer Care"
                    description="If you do not receive a response within 7 business days, you may escalate the issue to the Head of Customer Care."
                    contact="+91 74151 52600"
                    email="support@sterlingresearch.co.in"
                    time="Within 7 business days"
                    color="indigo"
                />

                <StepCard 
                    level="03"
                    title="Escalation to Compliance Officer"
                    description="If unresolved after 14 business days, escalate the matter to the Compliance Officer/ Principal Officer."
                    contact="+91 74151 52600"
                    email="compliance@sterlingresearch.co.in"
                    time="Within 7 business days"
                    color="purple"
                />
            </div>
        </div>

        {/* External Escalation */}
        <RevealOnScroll delay={0.4}>
             <div className="grid md:grid-cols-2 gap-6">
                <a href="https://www.scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all text-center h-full flex flex-col items-center justify-center">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            <Gavel size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Unsatisfied? Lodge a complaint on SCORES</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">www.scores.sebi.gov.in</p>
                    </div>
                </a>

                <a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="group block">
                     <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-green-500 dark:hover:border-green-400 transition-all text-center h-full flex flex-col items-center justify-center">
                        <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full text-green-600 mb-4 group-hover:scale-110 transition-transform">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Online Dispute Resolution (ODR)</h3>
                        <p className="text-green-600 dark:text-green-400 font-medium">https://smartodr.in</p>
                    </div>
                </a>
             </div>
        </RevealOnScroll>

      </div>
    </div>
  );
};

// Helper Components
const TableRow = ({ role, person, address, contact, email, hours }) => (
    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 last:border-0">
        <td className="p-4 font-medium text-gray-900 dark:text-white">{role}</td>
        <td className="p-4">{person}</td>
        <td className="p-4">{address}</td>
        <td className="p-4">
            <div className="flex flex-col gap-1 text-sm">
                <span className="flex items-center gap-1"><Phone size={12} className="text-blue-500"/> {contact}</span>
                <span className="flex items-center gap-1"><Mail size={12} className="text-blue-500"/> {email}</span>
            </div>
        </td>
        <td className="p-4 text-sm">{hours}</td>
    </tr>
);

const StepCard = ({ level, title, description, contact, email, time, color }) => {
    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300",
        indigo: "bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300",
        purple: "bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300",
    };

    return (
        <RevealOnScroll>
            <div className={`relative p-6 md:p-8 rounded-2xl border ${colorClasses[color].replace("text", "border")} bg-white dark:bg-gray-800 shadow-sm flex flex-col md:flex-row gap-6 items-start`}>
                <div className={`text-4xl font-bold opacity-20 absolute top-4 right-4 ${colorClasses[color]}`}>
                    {level}
                </div>
                
                <div className="flex-1">
                    <h3 className={`text-xl font-bold mb-3 ${colorClasses[color].split(" ")[3]} dark:${colorClasses[color].split(" ")[4]}`}>{title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                            <Mail size={14} /> {email}
                        </span>
                        <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                            <Phone size={14} /> {contact}
                        </span>
                        <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-green-600 dark:text-green-400">
                            <Clock size={14} /> {time}
                        </span>
                    </div>
                </div>
            </div>
        </RevealOnScroll>
    );
};


export default GrievanceRedressal;
