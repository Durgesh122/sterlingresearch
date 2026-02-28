import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import SterlingLogo from "../../assets/Starlinglogo4.png";
import RevealOnScroll from "../common/RevealOnScroll";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16 overflow-hidden">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <motion.img 
              src={SterlingLogo} 
              alt="Sterling Research Logo" 
              className="h-[8rem] w-auto mb-4 origin-left scale-150"
              whileHover={{ scale: 1.2, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <p className="text-gray-400 mt-6 ml-2">
              Empowering your financial future with expert insights and cutting-edge research.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Stock Advisory</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Mutual Funds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Portfolio Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Market Analysis</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">123 Market Street, Financial District</li>
              <li className="text-gray-400">New York, NY 10005</li>
              <li className="text-gray-400">Email: info@sterlingresearch.com</li>
              <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
      </RevealOnScroll>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Sterling Research. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
