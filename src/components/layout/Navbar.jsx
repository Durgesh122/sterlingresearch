import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Lightbulb, LightbulbOff } from "lucide-react";
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
    { name: "Company", path: "/company", icon: <FaBuilding /> },
    { name: "Job", path: "/job", icon: <FaBriefcase /> },
    { name: "Insights", path: "/insights", icon: <FaChartLine /> },
    { name: "Accessibility", path: "/accessibility", icon: <FaUniversalAccess /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Payment", path: "/payment", icon: <FaCreditCard /> },
    { name: "Complaint Box", path: "/complaint-box", icon: <FaCommentDots /> },
    { name: "Research Reports", path: "/research-reports", icon: <FaFileAlt /> },
    { name: "E-Sign Consent", path: "/esign-consent", icon: <FaFileSignature /> },
    { name: "Contact Us", path: "/contact-us", icon: <FaEnvelope /> },
    { name: "FAQ's", path: "/faqs", icon: <FaQuestionCircle /> },
  ];

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 dark:bg-gray-900/95 dark:border-gray-800 transition-all duration-300">
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

          {/* Desktop Navigation - Scrollable Container */}
          <div className="hidden xl:flex flex-1 items-center justify-center px-8 overflow-hidden">
             <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide py-2 px-2 mask-linear">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
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
                      const isActive = location.pathname === link.path;
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
