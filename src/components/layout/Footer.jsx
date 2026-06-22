import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ShieldCheck, FileText, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FooterLogo from "../../assets/SterlingLogoNew.svg";
import { contactDetails, complianceDetails } from "../../utils/data";

const quick = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Research Reports", path: "/research-reports" },
  { name: "Contact", path: "/contact-us" },
];

const legal = [
  { name: "Disclosure", path: "/disclosure" },
  { name: "Disclaimer", path: "/disclaimer" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms-conditions" },
  { name: "Refund Policy", path: "/refund-policy" },
  { name: "Investor Charter", path: "/investor-charter" },
];

const regulatoryRows = [
  { label: "Registered Name", value: complianceDetails.registeredName, icon: FileText },
  { label: "Principal Officer / Compliance Officer", value: complianceDetails.principalOfficer, icon: ShieldCheck },
  { label: "GST No", value: complianceDetails.gstNo, icon: FileText },
  { label: "Type of Registration", value: complianceDetails.registrationType, icon: ShieldCheck },
  { label: "SEBI Registration No", value: complianceDetails.sebiRegistrationNo, icon: ShieldCheck },
  { label: "BSE Enlistment No", value: complianceDetails.bseEnlistmentNo, icon: FileText },
  { label: "Validity", value: complianceDetails.validity, icon: FileText },
  { label: "Toll Free", value: complianceDetails.sebiTollFree, icon: Phone },
  { label: "Registered Address", value: complianceDetails.registeredAddress, icon: MapPin, wide: true },
  { label: "SEBI Office Details", value: complianceDetails.sebiOfficeDetails, icon: MapPin, wide: true },
];

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#fffdf6] via-[#fff8ea] to-[#f8fbf4] text-slate-800 border-t border-[#f0a500]/25 mt-12 overflow-hidden">
      <div className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(240,165,0,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(240,165,0,0.10) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#f0a500]/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <img src={FooterLogo} alt="Sterling Research" className="h-14 w-auto object-contain mb-4 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200" />
            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              Sterling Research is a SEBI Registered Research Analyst firm providing equity, derivatives and commodity market research.
            </p>
            <div className="space-y-2 text-sm text-slate-600">
              <a href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 hover:text-[#1e5631]">
                <Phone className="w-4 h-4 text-[#f0b429]" /> {contactDetails.phone}
              </a>
              <a href={`mailto:${contactDetails.email}`} className="block inline-flex items-center gap-2 hover:text-[#1e5631]">
                <Mail className="w-4 h-4 text-[#f0b429]" /> {contactDetails.email}
              </a>
              <div className="inline-flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-[#f0b429]" /> {contactDetails.address}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <h2 className="text-lg font-bold mb-4 text-slate-900">Quick Links</h2>
            <div className="space-y-2">
              {quick.map((item) => (
                <Link key={item.path} to={item.path} className="block text-slate-600 hover:text-[#1e5631] text-sm transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h2 className="text-lg font-bold mb-4 text-slate-900">Compliance</h2>
            <div className="space-y-2">
              {legal.map((item) => (
                <Link key={item.path} to={item.path} className="block text-slate-600 hover:text-[#1e5631] text-sm transition-colors">
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
            <h2 className="text-lg font-bold mb-4 text-slate-900">Start With Us</h2>
            <p className="text-slate-600 text-sm mb-5">Get expert market guidance from our research team through official communication channels.</p>
            <Link to="/contact-us" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#1e5631] hover:bg-[#184628] text-white font-semibold text-sm transition-colors">
              Contact Team <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-6 space-y-2 text-xs text-slate-500">
              <div className="inline-flex items-center gap-2 text-slate-600">
                <ShieldCheck className="w-4 h-4 text-[#f0b429]" /> SEBI Registered Research Analyst
              </div>
              <div className="inline-flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4 text-[#f0b429]" /> Investments are subject to market risks
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 pt-8 border-t border-[#e7dfcb]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold mb-2 text-slate-900">Regulatory Information</h2>
          <p className="text-sm text-slate-600 mb-5">Official details as per SEBI and BSE records</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {regulatoryRows.map(({ label, value, icon: Icon, wide }) => (
              <div
                key={label}
                className={`py-2 border-b border-[#ece4d2] ${wide ? "md:col-span-2" : ""}`}
              >
                <p className="text-slate-500 text-xs uppercase tracking-wide font-semibold inline-flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#f0b429]" />
                  {label}
                </p>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <div className="relative z-10 border-t border-[#e7dfcb] bg-gradient-to-r from-[#1b4f2d] via-[#205f36] to-[#1a4a2b] text-[#e8f3ea]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-xs sm:text-sm font-semibold tracking-wide">
            <span>© {new Date().getFullYear()} Sterling Research. All rights reserved.</span>
            <p className="mt-1 text-[11px] sm:text-xs text-[#d3e5d6]">SEBI Registered RA | Transparent Fee | No Profit Sharing</p>
          </div>

          <div className="text-xs sm:text-sm text-[#f5f9f6]">
            <span tabIndex={0} className="group relative inline-flex flex-col items-start outline-none md:items-end">
              <span className="font-semibold cursor-default md:cursor-pointer">Developed by Durgesh</span>
              <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-max max-w-[18rem] translate-y-1 rounded-lg border border-[#d0e5d4]/35 bg-[#123a24]/95 px-3 py-2 text-[11px] text-[#d6ead9] opacity-0 shadow-[0_12px_28px_rgba(0,0,0,0.25)] transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 md:left-auto md:right-0 sm:text-xs">
                <a href="tel:+917879946775" className="block hover:text-white transition-colors">Mobile: +91 7879946775</a>
                <a href="mailto:durgeshrathor05@gmail.com" className="mt-1 block hover:text-white transition-colors">Email: durgeshrathor05@gmail.com</a>
              </div>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
