import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, ChevronDown, Lightbulb, LightbulbOff, 
  Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaHome, FaServicestack, FaBuilding, FaBriefcase, FaChartLine, 
  FaUniversalAccess, FaTachometerAlt, FaCreditCard, FaCommentDots, 
  FaFileAlt, FaFileSignature, FaEnvelope, FaQuestionCircle, FaUserLock,
  FaLightbulb
} from "react-icons/fa";
import SterlingLogo from '../../assets/Starlinglogo4.png';


const LampToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="relative flex flex-col items-center -mt-4 mr-2 group z-50">
      {/* The Cord */}
      <motion.div
        className="flex flex-col items-center cursor-pointer"
        onClick={toggleTheme}
        whileTap={{ y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Wire */}
        <div className="w-0.5 h-8 bg-gray-800 dark:bg-gray-400" />
        
        {/* Lamp Shade/Holder */}
        <div className={`w-8 h-8 rounded-t-full rounded-b-lg border-2 border-gray-800 dark:border-gray-400 relative z-10 flex items-center justify-center transition-colors duration-300 ${theme === 'dark' ? 'bg-yellow-100' : 'bg-gray-200'}`}>
           <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,1)]' : 'bg-gray-400'}`} />
        </div>
        
        {/* Pull String */}
        <div className="flex flex-col items-center -mt-1">
           <div className="w-0.5 h-6 bg-gray-400" />
           <div className={`w-2 h-2 rounded-full border border-gray-400 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-gray-300'}`} />
        </div>

        {/* Shine/Glow Effect (Only when Dark Mode/Light ON) */}
        <AnimatePresence>
          {theme === "dark" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-8 w-24 h-24 bg-yellow-400/20 blur-xl rounded-full pointer-events-none -z-10"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // NavLink constant declaration was removed, reusing existing array

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Services", path: "/services", icon: <FaServicestack /> },
    { 
      name: "Company", 
      path: "#", 
      icon: <FaBuilding />,
      submenu: [
        { name: "About Us", path: "/about" },
        { name: "Vision & Mission", path: "/vision-mission" },
        { name: "Refund Policy", path: "/refund-policy" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Disclaimer", path: "/disclaimer" },
        { name: "Terms & Conditions", path: "/terms-conditions" },
        { name: "Disclosure", path: "/disclosure" },
      ]
    },
    { name: "Job", path: "/job", icon: <FaBriefcase /> },
    { 
      name: "Insights", 
      path: "#", 
      icon: <FaChartLine />,
      submenu: [
        { name: "Blogs", path: "/blogs" },
        { name: "Market News", path: "/market-news" },
        { name: "Complaint Board", path: "/complaint-board" },
        { name: "Grievance Redressal", path: "/grievance-redressal" },
      ]
    },
    { 
      name: "Accessibility", 
      path: "#", 
      icon: <FaUniversalAccess /> ,
      submenu: [
        { name: "Accessibility Statement", path: "/accessibility-statement" },
        { name: "Accessibility Feedback", path: "/accessibility-feedback" },
        { name: "Accessibility Media", path: "/accessibility-media" },
      ]
    },
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <FaTachometerAlt />,
      submenu: [
        { name: "Investor Handbook", path: "/investor-handbook" },
        { name: "Anti-Money Laundering", path: "/anti-money-laundering" },
      ]
    },
    { name: "Payment", path: "/payment", icon: <FaCreditCard /> },
    { name: "Complaint Box", path: "/complaint-board", icon: <FaCommentDots /> },
    { name: "Research Reports", path: "/research-reports", icon: <FaFileAlt /> },
    { name: "E-Sign Consent", path: "/esign-consent", icon: <FaFileSignature /> },
    { name: "Contact Us", path: "/contact-us", icon: <FaEnvelope /> },
    { name: "FAQ's", path: "/faqs", icon: <FaQuestionCircle /> },
  ];

  return (
    <>
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 flex flex-col">
      {/* Top Contact Bar */}
      <div className="bg-gray-900 text-gray-300 text-xs py-2 px-4 border-b border-gray-800 hidden md:block w-full">
         <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
            {/* Contact Info */}
            <div className="flex items-center gap-6">
               <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <div className="p-1 bg-gray-800 rounded-full group-hover:bg-blue-600 transition-colors">
                    <Phone size={12} className="text-blue-400 group-hover:text-white" /> 
                  </div>
                  <span className="font-medium tracking-wide">+91 98765 43210</span>
               </a>
               <a href="mailto:info@sterlingresearch.com" className="flex items-center gap-2 hover:text-white transition-colors group">
                  <div className="p-1 bg-gray-800 rounded-full group-hover:bg-blue-600 transition-colors">
                    <Mail size={12} className="text-blue-400 group-hover:text-white" /> 
                  </div>
                  <span className="font-medium tracking-wide">info@sterlingresearch.com</span>
               </a>
            </div>
            
            {/* Social Links & Info */}
             <div className="flex items-center gap-6">
               <div className="hidden lg:flex items-center gap-4 text-gray-400 border-r border-gray-700 pr-6 mr-2">
                  <Link to="/market-news" className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors text-[11px] font-medium tracking-wide">
                    MARKET NEWS
                  </Link>
                  <Link to="/job" className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors text-[11px] font-medium tracking-wide">
                    CAREERS
                  </Link>
                  <Link to="/contact-us" className="flex items-center gap-1 hover:text-blue-400 cursor-pointer transition-colors text-[11px] font-medium tracking-wide">
                    CONTACT
                  </Link>
               </div>
               <div className="flex items-center gap-3">
                 <a href="#" className="p-1.5 bg-gray-800 rounded-full hover:bg-[#1877F2] hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-0.5"><Facebook size={14} /></a>
                 <a href="#" className="p-1.5 bg-gray-800 rounded-full hover:bg-[#1DA1F2] hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-0.5"><Twitter size={14} /></a>
                 <a href="#" className="p-1.5 bg-gray-800 rounded-full hover:bg-[#0A66C2] hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-0.5"><Linkedin size={14} /></a>
                 <a href="#" className="p-1.5 bg-gray-800 rounded-full hover:bg-[#E4405F] hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-0.5"><Instagram size={14} /></a>
                 <a href="#" className="p-1.5 bg-gray-800 rounded-full hover:bg-[#FF0000] hover:text-white text-gray-400 transition-all duration-300 transform hover:-translate-y-0.5"><Youtube size={14} /></a>
               </div>
             </div>
         </div>
      </div>

    <nav className="bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 dark:bg-gray-900/95 dark:border-gray-800 w-full relative">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-4">
            <Link to="/" className="flex items-center group">
              <img 
                src={SterlingLogo} 
                alt="Sterling Research Logo" 
                className="h-[6rem] md:h-[8rem] w-auto origin-left transition-transform duration-300 group-hover:scale-105 object-contain" 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex flex-1 items-center justify-center px-4 overflow-visible z-50">
             <div className="flex items-center space-x-1 overflow-visible py-2 px-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.submenu && link.submenu.some(sub => sub.path === location.pathname));
                
                if (link.submenu) {
                  return (
                    <div key={link.name} className="relative group">
                      <button
                        className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 whitespace-nowrap gap-1 focus:outline-none focus:ring-0 cursor-default
                          ${isActive 
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm transform scale-105' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400'
                          }`}
                      >
                        <span className={`text-xl mb-0.5 transition-all duration-300 group-hover:-translate-y-0.5 ${isActive ? 'scale-110' : ''} relative ${theme === 'dark' ? 'text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]' : ''}`}>
                          {link.icon}
                        </span>
                        <span className={`flex items-center gap-1 relative transition-all duration-300 ${theme === 'dark' ? 'text-yellow-100 drop-shadow-[0_0_10px_rgba(253,224,71,0.3)]' : ''}`}>
                          {link.name}
                          <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-300" />
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute bottom-0 w-1/2 h-0.5 bg-blue-600 rounded-full"
                          />
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[200px]">
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                          {link.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-none"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex flex-col items-center justify-center px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group whitespace-nowrap gap-1 focus:outline-none focus:ring-0
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-sm transform scale-105' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 hover:text-blue-600 dark:hover:bg-gray-800 dark:hover:text-blue-400'
                      }`}
                  >
                    <span className={`text-xl mb-0.5 transition-all duration-300 group-hover:-translate-y-0.5 ${isActive ? 'scale-110' : ''} relative ${theme === 'dark' ? 'text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]' : ''}`}>
                      {link.icon}
                    </span>
                    <span className={`relative transition-all duration-300 ${theme === 'dark' ? 'text-yellow-100 drop-shadow-[0_0_10px_rgba(253,224,71,0.3)]' : ''}`}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 w-1/2 h-0.5 bg-blue-600 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Actions: Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
             {/* Custom Hanging Lamp Toggle */}
             <div className="relative z-50 -mt-2">
               <motion.button
                 onClick={toggleTheme}
                 whileTap={{ y: 10 }}
                 transition={{ type: "spring", stiffness: 400, damping: 15 }}
                 className="flex flex-col items-center focus:outline-none group relative"
                 aria-label="Pull to toggle theme"
               >
                 {/* The Wire */}
                 <div className="w-0.5 h-4 bg-gray-400 dark:bg-gray-600 mb-0" />
                 
                 {/* The Lamp Shade */}
                 <div className={`w-8 h-8 rounded-t-full relative z-10 flex items-center justify-center transition-colors duration-300 shadow-md
                   ${theme === 'dark' ? 'bg-amber-100 border-2 border-amber-300' : 'bg-gray-200 border-2 border-gray-300'}`}
                 >
                    {/* The Bulb (Glows in Dark Mode) */}
                    <div className={`w-4 h-4 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)]' : 'bg-gray-400'}`} />
                 </div>

                   {/* The Pull Cord */}
                   <div className="flex flex-col items-center -mt-1 relative z-0">
                      <motion.div 
                        className="w-0.5 h-6 bg-gray-300 dark:bg-gray-600 origin-top"
                        animate={{ height: [24, 32, 24] }} 
                      />
                      <div className={`w-2.5 h-2.5 rounded-full border border-gray-400 ${theme === 'dark' ? 'bg-yellow-500' : 'bg-gray-300'}`} />
                   </div>
  
                   {/* Ambient Light Cone (Visible in Dark Mode) */}
                   <AnimatePresence>
                     {theme === 'dark' && (
                       <motion.div
                         initial={{ opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1.2 }}
                         exit={{ opacity: 0, scale: 0.8 }}
                         className="absolute top-8 pointer-events-none"
                       >
                         <div className="w-20 h-20 bg-yellow-400/20 blur-xl rounded-full" />
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </motion.button>
               </div>
  
               {/* Login Button */}
               <div className="hidden lg:block">
                  <Link
                    to="/admin/login"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
                  >
                    <span>Login</span>
                    <FaUserLock className="text-white" />
                  </Link>
               </div>
  
              {/* Mobile Menu Toggle */}
            <div className="xl:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </header>
      {/* Mobile Menu Overlay (Full Screen / Side Drawer) - Moved Outside Nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] xl:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-[70] overflow-y-auto border-l border-gray-200 dark:border-gray-800"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    Menu
                  </span>
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Drawer Links */}
                <div className="flex-1 overflow-y-auto py-4 px-3">
                  <div className="space-y-1">
                    {navLinks.map((link, index) => {
                      const isActive = location.pathname === link.path || (link.submenu && link.submenu.some(sub => sub.path === location.pathname));
                      
                      if (link.submenu) {
                        return (
                          <div key={link.name}>
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                                isActive
                                  ? "bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
                              }`}
                            >
                              <span className={`text-xl ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`}>
                                {link.icon}
                              </span>
                              <span className={`text-base font-semibold ${isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-200"}`}>
                                {link.name}
                              </span>
                            </motion.div>
                            
                            {/* Submenu Items */}
                            <div className="pl-12 pr-2 space-y-1 mt-1 border-l-2 border-gray-100 dark:border-gray-800 ml-6">
                              {link.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.path}
                                  onClick={toggleMenu}
                                  className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                                    location.pathname === subItem.path
                                      ? "text-blue-600 dark:text-blue-400 font-medium bg-blue-50/50 dark:bg-blue-900/10"
                                      : "text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={link.path}
                            onClick={toggleMenu}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
                              isActive
                                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-semibold shadow-sm"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-1"
                            }`}
                          >
                            <span className={`text-xl ${isActive ? "text-blue-500" : "text-gray-400 group-hover:text-blue-500"}`}>
                              {link.icon}
                            </span>
                            <span className="text-base">{link.name}</span>
                            {isActive && (
                               <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 space-y-4">
                  
                  {/* Mobile Contact Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                     <a href="tel:+919876543210" className="flex items-center justify-center gap-2 py-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl font-semibold text-sm hover:bg-green-100 transition-colors">
                        <Phone size={16} /> Call
                     </a>
                     <a href="mailto:info@sterlingresearch.com" className="flex items-center justify-center gap-2 py-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-semibold text-sm hover:bg-blue-100 transition-colors">
                        <Mail size={16} /> Email
                     </a>
                  </div>

                  {/* Mobile Social Links */}
                  <div className="flex justify-center gap-4 py-2">
                     <a href="#" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-blue-600 hover:scale-110 transition-transform"><Facebook size={20} /></a>
                     <a href="#" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-sky-500 hover:scale-110 transition-transform"><Twitter size={20} /></a>
                     <a href="#" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-blue-700 hover:scale-110 transition-transform"><Linkedin size={20} /></a>
                     <a href="#" className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-pink-600 hover:scale-110 transition-transform"><Instagram size={20} /></a>
                  </div>

                  <Link
                    to="/admin/login"
                    onClick={toggleMenu}
                    className="flex items-center justify-center w-full bg-slate-900 dark:bg-blue-600 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-slate-500/30 dark:hover:shadow-blue-500/30 active:scale-95 gap-2"
                  >
                    <FaUserLock />
                    <span>Admin Login</span>
                  </Link>
                  
                  <p className="text-center text-xs text-gray-400 dark:text-gray-500">
                    © 2026 Sterling Research
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
