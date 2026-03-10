import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import PublicLayout from './components/layout/PublicLayout';

// Pages
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
import ComplaintData from "./pages/ComplaintData";
import GrievanceRedressal from "./pages/GrievanceRedressal";
// Accessibility Pages
import AccessibilityStatement from "./pages/AccessibilityStatement";
import AccessibilityFeedback from "./pages/AccessibilityFeedback";
import AccessibilityMedia from "./pages/AccessibilityMedia";
// Dashboard Pages
import InvestorCharter from "./pages/InvestorCharter";
import AntiMoneyLaundering from "./pages/AntiMoneyLaundering";
import Job from "./pages/Job";
import ResearchReports from "./pages/ResearchReports";

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
const EsignConsent = () => <UnderConstruction title="E-Sign Consent Form" />;
const FAQs = () => <UnderConstruction title="Frequently Asked Questions" />;
// const AdminLogin = () => <UnderConstruction title="Admin Login Portal" />;

import './App.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      
      <Routes>
        {/* Admin Routes - Standalone (No Layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Public Routes - Wrapped in PublicLayout */}
        <Route element={<PublicLayout />}>
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
            <Route path="/complaint-data" element={<ComplaintData />} />
            <Route path="/grievance-redressal" element={<GrievanceRedressal />} />
            
            {/* Accessibility Pages */}
            <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
            <Route path="/accessibility-feedback" element={<AccessibilityFeedback />} />
            <Route path="/accessibility-media" element={<AccessibilityMedia />} />

            {/* Dashboard Pages */}
            <Route path="/investor-charter" element={<InvestorCharter />} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
