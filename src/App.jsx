import React from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
// import StockTicker from "./components/layout/StockTicker";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UnderConstruction from "./components/common/UnderConstruction";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Dummy Page Components
const Company = () => <UnderConstruction title="Company Profile" />;
const Job = () => <UnderConstruction title="Careers at Sterling" />;
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
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <div className="pt-16">
           {/* <StockTicker /> */}
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact-us" element={<Contact />} />
            
            {/* New Routes */}
            <Route path="/company" element={<Company />} />
            <Route path="/job" element={<Job />} />
            <Route path="/insights" element={<Insights />} />
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
      </div>
    </Router>
  );
}

export default App;
