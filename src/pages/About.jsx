import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Sterling Research</h1>
        <p className="text-lg text-gray-700 mb-4">
          Sterling Research is a premier financial advisory firm dedicated to helping individuals and businesses achieve their financial goals.
        </p>
        <p className="text-lg text-gray-700">
          Our team of expert analysts and advisors work tirelessly to provide you with the most accurate and profitable market insights.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
