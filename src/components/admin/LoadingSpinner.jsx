import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-full min-h-[200px] w-full">
            <motion.div
                className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingSpinner;