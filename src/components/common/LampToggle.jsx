import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const LampToggle = () => {
  const { theme, toggleTheme } = useTheme();

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

export default LampToggle;
