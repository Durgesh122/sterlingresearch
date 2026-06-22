import React, { useState, useEffect, useMemo } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebase'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, FileText, Download, X, Lock, CheckCircle,
  ChevronRight, Calendar, ShieldCheck, Sparkles, BarChart3
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
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#eadfc8] rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#8f1038] border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p className="mt-4 text-[#8f1038] font-semibold tracking-wide animate-pulse">Loading Premium Insights...</p>
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
          className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#fffdf8] dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden relative border border-[#eadfc8]"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-[#eadfc8] bg-white/90 dark:bg-gray-800">
              <div className="flex items-center gap-3 overflow-hidden">
                 <div className="p-2 bg-[#fff3d8] rounded-lg text-[#8f1038]">
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
            <div className="flex-1 bg-[#faf5ea] dark:bg-gray-950 relative">
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
                          className="px-6 py-3 bg-[#8f1038] text-white rounded-xl font-medium shadow-lg hover:bg-[#7a122f] transition-all"
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
            <div className="p-4 border-t border-[#eadfc8] bg-white dark:bg-gray-800 flex justify-between items-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline-block">
                 Secure Preview • Sterling Research
              </span>
              <div className="flex gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  {onDownload && (
                    <button
                      onClick={() => onDownload(report)}
                      className="px-5 py-2.5 bg-gradient-to-r from-[#8f1038] to-[#d8a136] hover:from-[#7a122f] hover:to-[#c9932c] text-white rounded-xl font-medium shadow-lg shadow-[#8f1038]/30 transition-all flex items-center gap-2"
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
              ? 'text-white shadow-lg shadow-[#8f1038]/30 transform scale-105'
              : 'bg-[#fffdf8] text-gray-700 hover:bg-white border border-[#eadfc8]'
          }`}
        >
          {activeDay === day && (
             <motion.div 
               layoutId="activeDayBg"
               className="absolute inset-0 bg-gradient-to-r from-[#8f1038] to-[#b31b49]"
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
    className="mb-8 flex flex-col md:flex-row gap-4 bg-[#fffdf8] p-4 rounded-2xl shadow-sm border border-[#eadfc8] items-center max-w-5xl mx-auto"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="relative flex-grow w-full md:w-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search report title..."
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-none ring-1 ring-[#eadfc8] focus:ring-2 focus:ring-[#8f1038] text-gray-900 placeholder-gray-400 outline-none transition-all"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
    
    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar">
       <button 
         onClick={() => setSelectedCategory('All')}
         className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${selectedCategory === 'All' ? 'bg-[#8f1038] text-white' : 'bg-white text-gray-600 border border-[#eadfc8] hover:bg-[#fff3d8]'}`}
       >
         All
       </button>
       {CATEGORIES.map(cat => (
         <button 
           key={cat}
           onClick={() => setSelectedCategory(cat)}
           className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${selectedCategory === cat ? 'bg-[#8f1038] text-white' : 'bg-white text-gray-600 border border-[#eadfc8] hover:bg-[#fff3d8]'}`}
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
        <section className="min-h-screen bg-[#fffcf7] dark:bg-[#0B1120] pt-28 pb-20 relative overflow-hidden transition-colors duration-300">
            {/* Background Decorations */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 12% 12%, rgba(216,161,54,0.16) 0, transparent 35%), radial-gradient(circle at 85% 22%, rgba(143,16,56,0.14) 0, transparent 32%), linear-gradient(180deg, #fffdf8 0%, #fff9ef 55%, #fffdf8 100%)'
          }} />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#d8a136]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-40 left-0 w-[300px] h-[300px] bg-[#8f1038]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fff3d8] text-[#8f1038] text-xs font-bold tracking-wider uppercase mb-4 border border-[#eadfc8]">
                      <ShieldCheck size={14} /> Sterling Intelligence Desk
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                      Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8f1038] to-[#d8a136]">Reports</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Stay ahead of the market with our daily proprietary analysis. Securely access in-depth technical and fundamental reports.
                    </p>
                </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7"
                  >
                    <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center"><Sparkles size={18} /></div>
                      <div>
                        <p className="text-xs text-gray-500">Access Model</p>
                        <p className="text-sm font-bold text-gray-800">OTP Protected</p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center"><BarChart3 size={18} /></div>
                      <div>
                        <p className="text-xs text-gray-500">Coverage</p>
                        <p className="text-sm font-bold text-gray-800">Weekday Market Packs</p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[#eadfc8] bg-white/90 px-4 py-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#fff3d8] text-[#8f1038] flex items-center justify-center"><ShieldCheck size={18} /></div>
                      <div>
                        <p className="text-xs text-gray-500">Security</p>
                        <p className="text-sm font-bold text-gray-800">Secure PDF Preview</p>
                      </div>
                    </div>
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
                                      className="group relative bg-white/95 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-[#eadfc8] dark:border-gray-700 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                                    >
                                        {/* Status / Category Tag */}
                                        <div className="flex justify-between items-start mb-4">
                                        <span className="px-3 py-1 rounded-lg bg-[#fff3d8] text-xs font-bold text-[#8f1038] uppercase tracking-wide border border-[#eadfc8]">
                                                {report.category}
                                            </span>
                                        <div className="p-2 bg-[#fff3d8] text-[#8f1038] rounded-lg">
                                                <Lock size={16} strokeWidth={2.5} />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-[#8f1038] transition-colors">
                                                {report.title}
                                          </h2>
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
                                              className="flex items-center gap-2 pl-4 pr-3 py-2 bg-gradient-to-r from-[#8f1038] to-[#b31b49] text-white rounded-full font-bold text-sm hover:from-[#7a122f] hover:to-[#8f1038] transition-all group/btn shadow-md shadow-[#8f1038]/20"
                                            >
                                                Unlock <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>

                                        {/* Decorative Gradient Border on Hover */}
                                          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[#8f1038]/15 pointer-events-none transition-colors" />
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
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">No reports found</h2>
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
                        className="bg-[#fffdf8] dark:bg-gray-900 rounded-3xl w-full max-w-sm p-8 shadow-2xl relative overflow-hidden border border-[#eadfc8]"
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                        >
                             {/* Decorative Background inside Modal */}
                         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#8f1038] to-[#d8a136]"></div>

                            <div className="flex flex-col items-center text-center relative z-10">
                          <div className="w-16 h-16 bg-[#fff3d8] text-[#8f1038] rounded-2xl flex items-center justify-center mb-6 ring-4 ring-[#fff3d8]">
                                    <Lock size={32} />
                                </div>
                                
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Restricted Access</h2>
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
                                        className={`w-full text-center text-3xl tracking-[0.4em] font-mono font-bold py-4 rounded-xl border-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-4 transition-all placeholder-gray-300 dark:placeholder-gray-700
                                            ${authError 
                                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' 
                                            : 'border-[#eadfc8] dark:border-gray-700 focus:border-[#8f1038] focus:ring-[#8f1038]/10'
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
                                      className="py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#8f1038] hover:bg-[#7a122f] shadow-lg shadow-[#8f1038]/30 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
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