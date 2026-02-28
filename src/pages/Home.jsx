import { motion } from "framer-motion";
import { BarChart2, Briefcase, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import RevealOnScroll from "../components/common/RevealOnScroll";
import Hero from "../components/sections/Hero";

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Services Preview Section */}
      <section className="py-12 md:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <RevealOnScroll>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Premium Services</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">Comprehensive financial solutions designed for every investor.</p>
            </RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            <RevealOnScroll delay={0.1}>
              <ServiceCard
                icon={<TrendingUp className="h-12 w-12 text-blue-500" />}
                title="Stock Advisory"
                description="Real-time stock recommendations and market analysis to maximize your returns."
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.3}>
              <ServiceCard
                icon={<BarChart2 className="h-12 w-12 text-green-500" />}
                title="Mutual Funds"
                description="Expertly curated mutual fund portfolios aligned with your risk profile and goals."
              />
            </RevealOnScroll>
            <RevealOnScroll delay={0.5}>
              <ServiceCard
                icon={<Briefcase className="h-12 w-12 text-purple-500" />}
                title="Portfolio Management"
                description="Dedicated portfolio managers to optimize and rebalance your investments tailored to you."
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-gray-100 dark:bg-gray-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-0">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-10">
               <RevealOnScroll>
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Financial Growth" className="w-full h-auto rounded-lg shadow-2xl object-cover" />
               </RevealOnScroll>
            </div>
            <div className="w-full md:w-1/2">
               <RevealOnScroll delay={0.2}>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center md:text-left">Why Choose Sterling Research?</h2>
                  <ul className="space-y-4">
                     <FeatureItem text="Proven Track Record of Success" />
                     <FeatureItem text="Certified Financial Analysts" />
                     <FeatureItem text="Personalized Investment Strategies" />
                     <FeatureItem text="24/7 Market Monitoring & Support" />
                  </ul>
               </RevealOnScroll>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Grow Your Wealth?</h2>
            <p className="text-lg md:text-xl mb-8 md:mb-10">Join thousands of satisfied investors who trust Sterling Research.</p>
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </Link>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-600"
  >
    <div className="mb-6">{icon}</div>
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

const FeatureItem = ({ text }) => (
   <li className="flex items-center text-lg text-gray-700 dark:text-gray-300">
      <span className="bg-green-100 text-green-600 p-1 rounded-full mr-3">
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      </span>
      {text}
   </li>
);

export default Home;
