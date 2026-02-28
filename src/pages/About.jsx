import React from 'react';
import RevealOnScroll from "../components/common/RevealOnScroll";

const About = () => {
  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <RevealOnScroll>
        <h1 className="text-4xl font-bold text-gray-900 mb-6 dark:text-white">About Sterling Research</h1>
        <p className="text-lg text-gray-700 mb-4 dark:text-gray-300">
          Sterling Research is a premier financial advisory firm dedicated to helping individuals and businesses achieve their financial goals.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Our team of expert analysts and advisors work tirelessly to provide you with the most accurate and profitable market insights.
        </p>
      </RevealOnScroll>
    </div>
  );
};

export default About;
