import React, { useState, useEffect } from 'react';
import FloatingButtons from './components/common/FloatingButtons';
import FloatingChatBot from './components/common/FloatingChatBot';
import PopupDisclaimer from './components/common/PopupDisclaimer';
import PopupForm from './components/common/PopupForm';
import OfferPopup from './components/common/OfferPopup';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import StockTicker from "./components/layout/StockTicker";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
// Company Pages
import VisionMission from "./pages/VisionMission";
import RefundPolicy from "./pages/RefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import TermsConditions from "./pages/TermsConditions";
import Disclosure from "./pages/Disclosure";
// Insights Pages
import Blogs from "./pages/Blogs";
import MarketNews from "./pages/MarketNews";
import ComplaintBoard from "./pages/ComplaintBoard";
import GrievanceRedressal from "./pages/GrievanceRedressal";
// Accessibility Pages
import AccessibilityStatement from "./pages/AccessibilityStatement";
import AccessibilityFeedback from "./pages/AccessibilityFeedback";
import AccessibilityMedia from "./pages/AccessibilityMedia";
// Dashboard Pages
import InvestorHandbook from "./pages/InvestorHandbook";
import AntiMoneyLaundering from "./pages/AntiMoneyLaundering";
import Job from "./pages/Job";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UnderConstruction from "./components/common/UnderConstruction";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Dummy Page Components
const Company = () => <UnderConstruction title="Company Profile" />;
const Insights = () => <UnderConstruction title="Market Insights" />;
const Accessibility = () => <UnderConstruction title="Accessibility Statement" />;
const Dashboard = () => <UnderConstruction title="Client Dashboard" />;
const Payment = () => <UnderConstruction title="Secure Payment Portal" />;
const ComplaintBox = () => <UnderConstruction title="Customer Complaint Box" />;
const ResearchReports = () => <UnderConstruction title="Premium Research Reports" />;
const EsignConsent = () => <UnderConstruction title="E-Sign Consent Form" />;
const FAQs = () => <UnderConstruction title="Frequently Asked Questions" />;
// const AdminLogin = () => <UnderConstruction title="Admin Login Portal" />;

import './App.css';

function App() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const checkSettings = () => {
      try {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
          const settings = JSON.parse(saved);
          setAnimationsEnabled(!settings.stopAnimations);
        } else {
            setAnimationsEnabled(true);
        }
      } catch (e) {
        setAnimationsEnabled(true);
      }
    };
    checkSettings();
    window.addEventListener('accessibility-settings-changed', checkSettings);
    return () => window.removeEventListener('accessibility-settings-changed', checkSettings);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <div className="pt-20 md:pt-32">
           {/* <StockTicker /> */}
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact-us" element={<Contact />} />
            
            {/* Company Pages */}
            <Route path="/vision-mission" element={<VisionMission />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/disclosure" element={<Disclosure />} />
            
            {/* Insights Pages */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/market-news" element={<MarketNews />} />
            <Route path="/complaint-board" element={<ComplaintBoard />} />
            <Route path="/grievance-redressal" element={<GrievanceRedressal />} />
            
            {/* Accessibility Pages */}
            <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
            <Route path="/accessibility-feedback" element={<AccessibilityFeedback />} />
            <Route path="/accessibility-media" element={<AccessibilityMedia />} />

            {/* Dashboard Pages */}
            <Route path="/investor-handbook" element={<InvestorHandbook />} />
            <Route path="/anti-money-laundering" element={<AntiMoneyLaundering />} />

            {/* New Routes */}
            <Route path="/company" element={<Company />} />
            <Route path="/job" element={<Job />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/complaint-box" element={<ComplaintBox />} />
            <Route path="/research-reports" element={<ResearchReports />} />
            <Route path="/esign-consent" element={<EsignConsent />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        
        <Footer />

        <OfferPopup triggerOpen={showOffer} onClose={() => setShowOffer(false)} />
        <PopupDisclaimer onAccept={() => setShowForm(true)} />
        <PopupForm isOpen={showForm} onClose={() => { setShowForm(false); setShowOffer(true); }} />
        <FloatingButtons />
        <FloatingChatBot />
      </div>
    </Router>
  );
}

export default App;
