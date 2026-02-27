import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
   return (
      <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
         <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden"
         >
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 md:w-1/3 flex flex-col justify-between">
               <div>
                  <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                  <p className="text-blue-100 mb-8">
                     Let's talk about your financial future. Our team is ready to assist you.
                  </p>
                  <div className="space-y-6">
                     <div className="flex items-center space-x-4">
                        <Phone className="h-6 w-6" />
                        <span>+1 (555) 123-4567</span>
                     </div>
                     <div className="flex items-center space-x-4">
                        <Mail className="h-6 w-6" />
                        <span>info@sterlingresearch.com</span>
                     </div>
                     <div className="flex items-center space-x-4">
                        <MapPin className="h-6 w-6" />
                        <span>123 Market St, NY 10005</span>
                     </div>
                  </div>
               </div>
               <div className="mt-12 text-blue-200 text-sm">
                  &copy; {new Date().getFullYear()} Sterling Research
               </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 md:p-12 w-full md:w-2/3 bg-gray-50 dark:bg-gray-800">
               <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 md:mb-8">Send us a Message</h2>
               <form className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">Full Name</label>
                        <input type="text" id="name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="John Doe" />
                     </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 md:mb-2">Email Address</label>
                        <input type="email" id="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="john@example.com" />
                     </div>
                  </div>
                  <div>
                     <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                     <input type="text" id="subject" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow outline-none" placeholder="Investment Inquiry" />
                  </div>
                  <div>
                     <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                     <textarea id="message" rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow outline-none resize-none" placeholder="Tell us about your financial goals..."></textarea>
                  </div>
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg flex items-center justify-center transition-colors"
                  >
                     <Send className="mr-2 h-5 w-5" /> Send Message
                  </motion.button>
               </form>
            </div>
         </motion.div>
      </div>
   );
};

export default Contact;
