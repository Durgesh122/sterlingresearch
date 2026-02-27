import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Briefcase, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
          >
            Unlock Your <span className="text-blue-400">Financial Future</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto"
          >
            Expert stock market advisory and wealth management solutions tailored for your growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/services"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center mx-auto w-fit"
            >
              Explore Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Premium Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Comprehensive financial solutions designed for every investor.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ServiceCard
              icon={<TrendingUp className="h-12 w-12 text-blue-500" />}
              title="Stock Advisory"
              description="Real-time stock recommendations and market analysis to maximize your returns."
            />
            <ServiceCard
              icon={<BarChart2 className="h-12 w-12 text-green-500" />}
              title="Mutual Funds"
              description="Expertly curated mutual fund portfolios aligned with your risk profile and goals."
            />
            <ServiceCard
              icon={<Briefcase className="h-12 w-12 text-purple-500" />}
              title="Portfolio Management"
              description="Dedicated portfolio managers to optimize and rebalance your investments tailored to you."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 pr-0 md:pr-10">
               <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Financial Growth" className="rounded-lg shadow-2xl" />
            </div>
            <div className="md:w-1/2">
               <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Sterling Research?</h2>
               <ul className="space-y-4">
                  <FeatureItem text="Proven Track Record of Success" />
                  <FeatureItem text="Certified Financial Analysts" />
                  <FeatureItem text="Personalized Investment Strategies" />
                  <FeatureItem text="24/7 Market Monitoring & Support" />
               </ul>
            </div>
         </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Wealth?</h2>
          <p className="text-xl mb-10">Join thousands of satisfied investors who trust Sterling Research.</p>
          <Link
             to="/contact"
             className="bg-white text-blue-600 font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
             Contact Us Today
          </Link>
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
