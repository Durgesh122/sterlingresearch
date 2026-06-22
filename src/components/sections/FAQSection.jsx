import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Are you a SEBI Registered Research Analyst?",
    answer: "Yes, Sterling Research is a SEBI Registered Research Analyst firm. We strictly adhere to all SEBI regulations and guidelines to ensure transparency and ethical practices."
  },
  {
    question: "Do you offer guaranteed returns or profit sharing?",
    answer: "No, strictly not. As per SEBI regulations, no SEBI registered intermediary can guarantee returns or ask for profit sharing. Investment in the securities market is subject to market risks."
  },
  {
    question: "How can I subscribe to your services?",
    answer: "You can subscribe by visiting our website or contacting our support team. We only accept payments through official banking channels. We do not accept cash deposits."
  },
  {
    question: "What is your risk profiling process?",
    answer: "Before providing any recommendations, we conduct a mandatory risk profiling to understand your risk appetite and investment goals. Services are offered based on this assessment."
  },
  {
    question: "How do I receive research alerts?",
    answer: "Once subscribed, you will receive real-time research alerts via SMS and Instant Messenger as per regulatory guidelines."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#fef3c7] text-[#d4920a] rounded-xl mb-4">
             <HelpCircle size={24} />
          </div>
           <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Frequently Asked Questions</h2>
           <p className="text-gray-700 text-sm md:text-base">
             Common queries regarding our services and compliance.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border border-gray-200 rounded-xl overflow-hidden transition-colors duration-300 ${activeIndex === index ? 'bg-amber-50/50 border-[#fde68a]' : 'bg-white hover:border-amber-100'}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
              >
                <span className={`font-semibold text-sm md:text-base ${activeIndex === index ? 'text-[#1e5631]' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-[#1e5631]' : 'text-gray-400'}`}>
                   {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 md:p-5 pt-0 text-sm md:text-base text-gray-600 leading-relaxed border-t border-blue-100/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
