import React, { useState, useEffect, useRef, useCallback } from "react";
import Hero from "../components/sections/Hero";
import StatsSection from "../components/sections/StatsSection";
import AboutSection from "../components/sections/AboutSection";
import ServicesSection from "../components/sections/ServicesSection";
import ProcessSection from "../components/sections/ProcessSection";
import HomeContactSection from "../components/sections/HomeContactSection";
import FAQSection from "../components/sections/FAQSection";
import CTASection from "../components/sections/CTASection";
import PopupDisclaimer from "../components/common/PopupDisclaimer";

const Home = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const disclaimerTimeout = useRef();

  useEffect(() => {
    disclaimerTimeout.current = setTimeout(() => {
      setShowDisclaimer(true);
    }, 1000);

    return () => clearTimeout(disclaimerTimeout.current);
  }, []);

  const handleDisclaimerClose = useCallback(() => {
    setShowDisclaimer(false);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <PopupDisclaimer isOpen={showDisclaimer} onClose={handleDisclaimerClose} />

      <div>
        <Hero />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <HomeContactSection />
        <FAQSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Home;
