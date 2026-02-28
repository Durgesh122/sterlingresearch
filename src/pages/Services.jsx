import { motion } from "framer-motion";
import { TrendingUp, BarChart2, Briefcase, Calculator, Users, ShieldCheck } from "lucide-react";
import RevealOnScroll from "../components/common/RevealOnScroll";

const services = [
  { icon: <TrendingUp className="h-10 w-10 text-blue-500" />, title: "Stock Advisory", desc: "Expert stock picks and market analysis." },
  { icon: <BarChart2 className="h-10 w-10 text-green-500" />, title: "Mutual Funds", desc: "Curated mutual fund portfolios." },
  { icon: <Briefcase className="h-10 w-10 text-purple-500" />, title: "Wealth Management", desc: "Customized wealth growth strategies." },
  { icon: <Calculator className="h-10 w-10 text-yellow-500" />, title: "Financial Planning", desc: "Comprehensive financial roadmaps." },
  { icon: <Users className="h-10 w-10 text-indigo-500" />, title: "Retirement Planning", desc: "Secure your future with smart planning." },
  { icon: <ShieldCheck className="h-10 w-10 text-red-500" />, title: "Risk Management", desc: "Protect your assets against market volatility." },
];

const Services = () => {
  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <RevealOnScroll>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">Our Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Tailored financial solutions for every stage of your life.</p>
        </RevealOnScroll>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <RevealOnScroll key={index} delay={index * 0.1}>
            <motion.div
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 h-full"
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.desc}</p>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default Services;
