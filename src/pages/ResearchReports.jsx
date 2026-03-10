import React, { useState, useEffect, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Eye, FileText, Download, X, Lock, CheckCircle, 
  ChevronRight, Calendar, Filter, ShieldCheck 
} from 'lucide-react';

// Constants
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const CATEGORIES = ['Market', 'Technical', 'Financial', 'Competitor', 'Other'];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.05 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } },
};

// Loading spinner component
const LoadingSpinner = () => (
  <motion.div
    className="flex flex-col justify-center items-center py-20"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 dark:border-indigo-900 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">Loading Insights...</p>
  </motion.div>
);

// Report preview modal with robust PDF embedding
const ReportPreviewModal = ({ isOpen, onClose, report = null, onDownload = null }) => {
  const isMobile = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }, []);
  
  const { previewUrl, revoke } = useMemo(() => {
    const fileSource = report?.file || report?.fileData || '';
    try {
      if (!fileSource) return { previewUrl: null, revoke: () => {} };

      // If http(s), use directly
      if (/^https?:\/\//i.test(fileSource)) {
        return { previewUrl: fileSource, revoke: () => {} };
      }

      const toBlobUrl = (bytes, mime = 'application/pdf') => {
        const blob = new Blob([bytes], { type: mime });
        const objectUrl = URL.createObjectURL(blob);
        return { previewUrl: objectUrl, revoke: () => URL.revokeObjectURL(objectUrl) };
      };

      // Data URL
      if (fileSource.startsWith('data:')) {
        const [meta, base64] = fileSource.split(',');
        const mimeMatch = meta.match(/data:([^;]+);base64/);
        const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
        const bin = atob(base64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return toBlobUrl(bytes, mime);
      }

      // Raw base64
      const bin = atob(fileSource);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      return toBlobUrl(bytes, 'application/pdf');
    } catch (e) {
      return { previewUrl: null, revoke: () => {} };
    }
  }, [report]);

  useEffect(() => revoke, [revoke]);

  return (
    <AnimatePresence>
      {isOpen && report && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden relative border border-gray-700"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center gap-3 overflow-hidden">
                 <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                    <FileText size={20} />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate" title={report.title}>{report.title}</h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* PDF Viewer Area */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-950 relative">
              {previewUrl ? (
                isMobile ? (
                  <iframe
                    src={previewUrl}
                    title={report?.title || 'Report preview'}
                    className="w-full h-full border-0"
                    allow="fullscreen"
                  />
                ) : (
                  <object data={previewUrl} type="application/pdf" className="w-full h-full">
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                        <FileText size={48} className="text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-300 mb-4">Your browser doesn't support PDF preview.</p>
                        <a 
                            href={previewUrl} 
                            target="_blank" 
                            rel="noreferrer"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg hover:bg-indigo-700 transition-all"
                        >
                            Open PDF in new tab
                        </a>
                    </div>
                  </object>
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-8">
                  <FileText size={64} className="mb-4 opacity-30" />
                  <p>Preview unavailable. Please download the file to view.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline-block">
                 Secure Preview • Sterling Research
              </span>
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  {onDownload && (
                    <button
                      onClick={() => onDownload(report)}
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
                    >
                      <Download size={18} /> <span className="hidden sm:inline">Download</span>
                    </button>
                  )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Day selector component
const DaySelector = ({ activeDay, setActiveDay }) => (
  <motion.div
    className="mb-8"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    <div className="flex justify-center flex-wrap gap-2 md:gap-4 p-2">
      {WEEK_DAYS.map((day) => (
        <button
          key={day}
          onClick={() => setActiveDay(day)}
          className={`relative px-4 md:px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 overflow-hidden group ${
            activeDay === day
              ? 'text-white shadow-lg shadow-indigo-500/40 transform scale-105'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
          }`}
        >
          {activeDay === day && (
             <motion.div 
               layoutId="activeDayBg"
               className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600"
               initial={false}
               transition={{ type: "spring", stiffness: 500, damping: 30 }}
             />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {day} 
            {activeDay === day && <CheckCircle size={14} className="opacity-80" />}
          </span>
        </button>
      ))}
    </div>
  </motion.div>
);

// Search and filter component
const SearchFilter = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => (
  <motion.div
    className="mb-8 flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 items-center max-w-4xl mx-auto"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="relative flex-grow w-full md:w-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search report title..."
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    
    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
       <button 
         onClick={() => setSelectedCategory('All')}
         className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === 'All' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400 hover:bg-gray-100'}`}
       >
         All
       </button>
       {CATEGORIES.map(cat => (
         <button 
           key={cat}
           onClick={() => setSelectedCategory(cat)}
           className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400 hover:bg-gray-100'}`}
         >
           {cat}
         </button>
       ))}
    </div>
  </motion.div>
);

const ResearchReports = () => {
    const [activeDay, setActiveDay] = useState(() => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        return WEEK_DAYS.includes(today) ? today : 'Monday';
    });
    const [reports, setReports] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    
    // Preview & OTP States
    const [selectedReport, setSelectedReport] = useState(null);
    const [pendingReport, setPendingReport] = useState(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [isOtpOpen, setIsOtpOpen] = useState(false);
    const [otpInput, setOtpInput] = useState('');
    const [authError, setAuthError] = useState(false);

    // Fetch reports
    useEffect(() => {
        setIsLoading(true);
        const reportsRef = ref(database, 'reports');
        const unsubscribe = onValue(reportsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const reportList = Object.entries(data).map(([key, value]) => ({
                    id: key,
                    ...value,
                }));
                const groupedReports = WEEK_DAYS.reduce((acc, day) => {
                    acc[day] = reportList.filter((report) => report.day === day);
                    return acc;
                }, {});
                setReports(groupedReports);
            } else {
                setReports(WEEK_DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {}));
            }
            setIsLoading(false);
        }, (error) => {
            console.error('Error fetching reports:', error);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const currentDayReports = reports[activeDay] || [];
    const filteredReports = currentDayReports.filter((report) => {
        const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handlePreviewClick = (report) => {
        setPendingReport(report);
        setOtpInput('');
        setAuthError(false);
        setIsOtpOpen(true);
    };

    const verifyOtpAndOpen = () => {
        if (!otpInput.trim()) {
            setAuthError(true);
            return;
        }
        
        const expectedOtp = String(pendingReport?.otp || '');
        if (!expectedOtp) {
            toast.error('System Error: Report configuration invalid.');
            return;
        }

        if (otpInput.trim() === expectedOtp.trim()) {
            setSelectedReport(pendingReport);
            setIsPreviewOpen(true);
            setIsOtpOpen(false);
            setPendingReport(null);
            setOtpInput('');
            toast.success('Access Granted Successfully');
        } else {
            setAuthError(true);
            toast.error('Invalid Access Code');
            
            // Shake effect logic handled by framer-motion variants on input
        }
    };

    const handleDownload = (report) => {
        try {
            const fileSource = report?.file || report?.fileData;
            const filename = report?.filename || `${report?.title || 'report'}.pdf`;

            if (!fileSource) return;

            const link = document.createElement('a');
            link.href = fileSource;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Download failed.');
        }
    };

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-[#0B1120] pt-28 pb-20 relative overflow-hidden font-sans transition-colors duration-300">
            <ToastContainer position="bottom-right" theme="colored" />
            
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-950/20 dark:to-transparent pointer-events-none" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold tracking-wider uppercase mb-4">
                        <ShieldCheck size={14} /> Premium Access
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Reports</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Stay ahead of the market with our daily proprietary analysis. Securely access in-depth technical and fundamental reports.
                    </p>
                </motion.div>

                {/* Main Content Card */}
                <div className="flex flex-col items-center">
                    
                    <DaySelector activeDay={activeDay} setActiveDay={setActiveDay} />
                    
                    <SearchFilter 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />

                    {/* Results Grid */}
                    <div className="w-full min-h-[400px]">
                        {isLoading ? (
                            <LoadingSpinner />
                        ) : filteredReports.length > 0 ? (
                            <motion.div 
                              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                            >
                                {filteredReports.map((report) => (
                                    <motion.div
                                        key={report.id}
                                        variants={itemVariants}
                                        className="group relative bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                    >
                                        {/* Status / Category Tag */}
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                                                {report.category}
                                            </span>
                                            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
                                                <Lock size={16} strokeWidth={2.5} />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {report.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-6">
                                                {report.description || 'Comprehensive market analysis report focusing on key sector movements and technical indicators.'}
                                            </p>
                                        </div>

                                        {/* Footer / Action */}
                                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                                <Calendar size={12} />
                                                <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                                            </div>
                                            <button
                                                onClick={() => handlePreviewClick(report)}
                                                className="flex items-center gap-2 pl-4 pr-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold text-sm hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all group/btn"
                                            >
                                                Unlock <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>

                                        {/* Decorative Gradient Border on Hover */}
                                        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-500/10 pointer-events-none transition-colors" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700"
                            >
                                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                                    <Search size={32} className="text-gray-400 dark:text-gray-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">No reports found</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Check back later for {activeDay}'s updates.
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* OTP Modal */}
            <AnimatePresence>
                {isOtpOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-sm p-8 shadow-2xl relative overflow-hidden"
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                        >
                             {/* Decorative Background inside Modal */}
                             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-blue-500"></div>

                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 ring-4 ring-indigo-50 dark:ring-indigo-900/10">
                                    <Lock size={32} />
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Restricted Access</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-xs px-4 mb-8">
                                    This is a premium document. Please enter the 6-digit access code provided to you.
                                </p>
                                
                                <div className="w-full relative group mb-6">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={otpInput}
                                        onChange={(e) => {
                                            setOtpInput(e.target.value.replace(/[^0-9]/g, ''));
                                            setAuthError(false);
                                        }}
                                        onKeyDown={(e) => e.key === 'Enter' && verifyOtpAndOpen()}
                                        placeholder="• • • • • •"
                                        className={`w-full text-center text-3xl tracking-[0.4em] font-mono font-bold py-4 rounded-xl border-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all placeholder-gray-300 dark:placeholder-gray-700
                                            ${authError 
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                                                : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500/10'
                                            }
                                        `}
                                        autoFocus
                                    />
                                    {authError && (
                                        <motion.p 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-red-500 text-xs font-semibold mt-2 absolute -bottom-6 left-0 w-full"
                                        >
                                            Incorrect Code. Please try again.
                                        </motion.p>
                                    )}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3 w-full mt-2">
                                    <button
                                        onClick={() => {
                                            setIsOtpOpen(false);
                                            setAuthError(false);
                                        }}
                                        className="py-3 px-4 rounded-xl font-bold text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={verifyOtpAndOpen}
                                        disabled={otpInput.length !== 6}
                                        className="py-3 px-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                                    >
                                        Unlock Document
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ReportPreviewModal
                isOpen={isPreviewOpen}
                onClose={() => setIsPreviewOpen(false)}
                report={selectedReport}
                onDownload={handleDownload}
            />
        </section>
    );
};

export default ResearchReports;