import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SterlingLogo from "../../assets/Starlinglogo4.png";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white pt-12 md:pt-20 pb-10 overflow-hidden font-sans">
      
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1], 
            rotate: [0, 90, 0] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-[128px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 100, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -left-20 w-72 h-72 bg-purple-600 rounded-full blur-[96px]" 
        />
        <motion.div
           animate={{
             y: [0, -20, 0],
             opacity: [0.05, 0.1, 0.05]
           }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           className="absolute bottom-0 right-1/3 w-64 h-64 bg-teal-600 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="block relative max-w-max group">
              {/* Magical Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
              
              {/* Logo Container */}
              <div className="relative bg-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl shadow-2xl flex items-center justify-center">
                <motion.img 
                  src={SterlingLogo} 
                  alt="Sterling Research Logo" 
                  className="h-20 md:h-36 w-auto object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering your financial journey with expert insights, precise market analysis, and cutting-edge research strategies.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { Icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                { Icon: Twitter, href: "#", color: "hover:bg-sky-500" },
                { Icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
                { Icon: Instagram, href: "#", color: "hover:bg-pink-600" }
              ].map(({ Icon, href, color }, index) => (
                <motion.a 
                  key={index}
                  href={href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 bg-gray-800/50 backdrop-blur-sm rounded-lg text-gray-400 hover:text-white transition-all duration-300 ${color} shadow-lg shadow-black/20`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Quick Links
              <motion.span 
                 className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full"
                 initial={{ width: 0 }}
                 whileInView={{ width: 48 }}
                 viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              {["Home", "About Us", "Services", "Market News", "Contact Us"].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-blue-500" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Our Services
              <motion.span 
                 className="absolute -bottom-2 left-0 w-12 h-1 bg-purple-500 rounded-full"
                 initial={{ width: 0 }}
                 whileInView={{ width: 48 }}
                 viewport={{ once: true }}
              />
            </h3>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              {["Stock Advisory", "Mutual Funds", "Portfolio Management", "Market Analysis", "Research Reports"].map((item) => (
                <li key={item}>
                  <Link 
                    to="/services"
                    className="flex items-center gap-2 hover:text-purple-400 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-purple-400 transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
             <h3 className="text-lg font-bold text-white mb-6 relative inline-block">
              Get In Touch
              <motion.span 
                 className="absolute -bottom-2 left-0 w-12 h-1 bg-teal-500 rounded-full"
                 initial={{ width: 0 }}
                 whileInView={{ width: 48 }}
                 viewport={{ once: true }}
              />
            </h3>
            <div className="space-y-6">
               <div className="flex items-start gap-4 text-gray-400 group">
                 <div className="p-2.5 bg-gray-800/50 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors shadow-inner">
                   <MapPin size={20} />
                 </div>
                 <div className="text-sm">
                   <p className="font-semibold text-white mb-1">Head Office</p>
                   123 Financial District, Sterling Tower, Mumbai, India
                 </div>
               </div>

               <div className="flex items-start gap-4 text-gray-400 group">
                 <div className="p-2.5 bg-gray-800/50 rounded-lg group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors shadow-inner">
                   <Phone size={20} />
                 </div>
                 <div className="text-sm">
                   <p className="font-semibold text-white mb-1">Phone</p>
                   <a href="tel:+919876543210" className="hover:text-green-400 transition-colors">+91 98765 43210</a>
                 </div>
               </div>

               <div className="flex items-start gap-4 text-gray-400 group">
                 <div className="p-2.5 bg-gray-800/50 rounded-lg group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors shadow-inner">
                   <Mail size={20} />
                 </div>
                 <div className="text-sm">
                   <p className="font-semibold text-white mb-1">Email</p>
                   <a href="mailto:info@sterlingresearch.com" className="hover:text-purple-400 transition-colors">info@sterlingresearch.com</a>
                 </div>
               </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800/50 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 text-center md:text-left">
                &copy; {new Date().getFullYear()} <span className="text-gray-300 font-semibold">Sterling Research</span>. All rights reserved.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
                <Link to="/terms-conditions" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link>
                <Link to="/disclaimer" className="hover:text-blue-400 transition-colors">Disclaimer</Link>
                <Link to="/disclosure" className="hover:text-blue-400 transition-colors">Disclosure</Link>
              </div>
            </div>
            
            <div className="mt-8 text-center relative z-10 pb-8">
               <div className="inline-block p-[1px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative group cursor-pointer">
                 <div className="bg-gray-900 rounded-full px-4 py-1.5 back relative z-10">
                    <p className="text-xs text-gray-400 flex items-center gap-2">
                      Designed & Developed by 
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300 tracking-wider">
                        DURGESH RATHOR
                      </span>
                    </p>
                 </div>
                 
                 {/* Popup Developer Card */}
                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:-translate-y-2 pointer-events-none z-50">
                    <div className="text-center">
                       <h4 className="text-lg font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Durgesh Rathor</h4>
                       <div className="space-y-2 text-xs text-gray-300">
                          <div className="flex items-center justify-center gap-2 p-1.5 bg-gray-800 rounded-lg">
                             <Phone size={12} className="text-blue-400" />
                             <span>+91 7879946775</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 p-1.5 bg-gray-800 rounded-lg">
                             <Phone size={12} className="text-purple-400" />
                             <span>+91 7770864395</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 p-1.5 bg-gray-800 rounded-lg">
                             <Mail size={12} className="text-pink-400" />
                             <span className="truncate">Durgeshrathor05@gamil.com</span>
                          </div>
                       </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-8 border-transparent border-t-gray-900/95"></div>
                 </div>
               </div>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
