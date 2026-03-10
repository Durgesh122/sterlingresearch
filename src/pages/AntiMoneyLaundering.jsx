import React from 'react';
import RevealOnScroll from '../components/common/RevealOnScroll';
import { ShieldAlert, Search, FileText, Lock, RefreshCw, Database, Scale, UserCheck } from "lucide-react";
import AML1 from '../assets/aml1.png';
import AML2 from '../assets/aml2.png';

const AntiMoneyLaundering = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-6">
              Anti-Money Laundering Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Protecting the financial system through vigilance, compliance, and advanced monitoring technologies.
            </p>
          </div>
        </RevealOnScroll>
        
        {/* Intro Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <RevealOnScroll delay={0.1}>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-l-4 border-blue-500 h-full flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                        <ShieldAlert className="text-blue-500" size={28} /> What is AML?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Anti-Money Laundering (AML)</span> refers to the laws, regulations, and procedures intended to prevent criminals from disguising illegally obtained funds as legitimate income. It is a critical component of the global financial systems integrity.
                    </p>
                </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
                 <div className="rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                    <img src={AML1} alt="AML Concept" className="w-full h-full object-cover" />
                 </div>
            </RevealOnScroll>
        </div>

        {/* The Process */}
        <RevealOnScroll delay={0.3}>
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">The Laundering Process</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <ProcessCard 
                        step="1" 
                        title="Placement" 
                        desc="Introducing illegal profits into the financial system." 
                        icon={<Database className="text-blue-500" />}
                    />
                    <ProcessCard 
                        step="2" 
                        title="Layering" 
                        desc="Complex transactions to disguise the audit trail and source." 
                        icon={<RefreshCw className="text-purple-500" />}
                    />
                    <ProcessCard 
                        step="3" 
                        title="Integration" 
                        desc="Funds re-enter economy as legitimate wealth." 
                        icon={<Lock className="text-green-500" />}
                    />
                </div>
            </div>
        </RevealOnScroll>

        {/* Controls Section */}
        <div className="mb-16">
             <RevealOnScroll>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Key AML Controls</h2>
             </RevealOnScroll>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ControlCard 
                    title="Criminalization" 
                    desc="Strict laws and international agreements (like UN conventions) that enable prosecution of money laundering offenses."
                    icon={<Scale size={24} />}
                    color="red"
                />
                <ControlCard 
                    title="Know Your Customer (KYC)" 
                    desc="Mandatory identity verification, risk assessment, and monitoring of customer behavior to detect anomalies."
                    icon={<UserCheck size={24} />}
                    color="blue"
                />
                <ControlCard 
                    title="Record Management" 
                    desc="maintaining detailed records of transactions and customer data for audit trails and regulatory reporting."
                    icon={<FileText size={24} />}
                    color="green"
                />
                <ControlCard 
                    title="Software Filtering" 
                    desc="Automated systems that screen transactions against blacklists and sanction lists in real-time."
                    icon={<Search size={24} />}
                    color="purple"
                />
                <ControlCard 
                    title="Holding Periods" 
                    desc="Mandatory waiting periods for deposits to prevent rapid movement of funds through accounts."
                    icon={<Lock size={24} />}
                    color="orange"
                />
                 <ControlCard 
                    title="New Technology" 
                    desc="Utilization of AI and Big Data analytics to identify complex patterns and suspicious networks."
                    icon={<RefreshCw size={24} />}
                    color="indigo"
                />
             </div>
        </div>
        
        <RevealOnScroll delay={0.4}>
             <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                 <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                    <img src={AML2} alt="AML Controls Visual" className="w-full h-full object-cover" />
                 </div>
                 <div className="order-1 md:order-2 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl text-white">
                    <h3 className="text-2xl font-bold mb-4">Our Commitment</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        Sterling Research is fully committed to adhering to all Anti-Money Laundering regulations. We employ a combination of strict policy frameworks, staff training, and advanced technology to ensure our platform is not used for illicit activities.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-400 bg-gray-800/50 p-4 rounded-lg">
                        <ShieldAlert size={20} className="text-green-400" />
                        <span>Zero Tolerance Policy for Financial Crimes</span>
                    </div>
                 </div>
            </div>
        </RevealOnScroll>

      </div>
    </div>
  );
};

// Helper Components
const ProcessCard = ({ step, title, desc, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md text-center border border-gray-100 dark:border-gray-700 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent group-hover:via-blue-500 transition-colors"></div>
        <div className="w-16 h-16 mx-auto bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <div className="text-4xl font-black text-gray-100 dark:text-gray-700 absolute top-4 right-4 -z-0 select-none">
            0{step}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm relative z-10">{desc}</p>
    </div>
);

const ControlCard = ({ title, desc, icon, color }) => {
    const colors = {
        red: "text-red-500 bg-red-50 dark:bg-red-900/10",
        blue: "text-blue-500 bg-blue-50 dark:bg-blue-900/10",
        green: "text-green-500 bg-green-50 dark:bg-green-900/10",
        purple: "text-purple-500 bg-purple-50 dark:bg-purple-900/10",
        orange: "text-orange-500 bg-orange-50 dark:bg-orange-900/10",
        indigo: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/10",
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colors[color]}`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
        </div>
    );
};

export default AntiMoneyLaundering;
