import React, { useState, useEffect } from 'react';
import { ref, onValue, push, remove } from 'firebase/database';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, Trash2, Eye, CheckCircle, AlertTriangle, 
  Calendar, Search, Filter, Shield
} from 'lucide-react';
import { database, auth } from '../../firebase';
import LoadingSpinner from './LoadingSpinner';

// Constants
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const REPORT_CATEGORIES = ['Market', 'Technical', 'Financial', 'Competitor', 'General'];

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ReportManager = () => {
  // State
  const [reports, setReports] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(WEEK_DAYS[0]);
  
  // Upload Form State
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    category: 'Market',
    file: null,
    day: WEEK_DAYS[0] // Default to Monday
  });
  const [isUploading, setIsUploading] = useState(false);
  const [lastUploadedOtp, setLastUploadedOtp] = useState(null);

  // Delete Modal State
  const [deleteData, setDeleteData] = useState({ open: false, id: null, title: '' });

  // Load Reports
  useEffect(() => {
    const reportsRef = ref(database, 'reports');
    const unsubscribe = onValue(reportsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const grouped = WEEK_DAYS.reduce((acc, day) => ({ ...acc, [day]: [] }), {});
      
      Object.entries(data).forEach(([key, value]) => {
        if (value.day && grouped[value.day]) {
          grouped[value.day].push({ id: key, ...value });
        } else if (value.day) {
             // Handle edge case if day isn't in standard list
             grouped[value.day] = grouped[value.day] || [];
             grouped[value.day].push({ id: key, ...value });
        }
      });
      
      // Sort reports by timestamp desc (newest first)
      Object.keys(grouped).forEach(day => {
          grouped[day].sort((a, b) => b.timestamp - a.timestamp);
      });

      setReports(grouped);
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading reports:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handlers
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewReport({ ...newReport, file: e.target.files[0] });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!newReport.file || !newReport.title) {
        alert("Please provide a title and select a PDF file.");
        return;
    }

    // Size Helper (Max 5MB)
    if (newReport.file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
    }

    setIsUploading(true);
    setLastUploadedOtp(null);

    try {
        const fileDataUrl = await toBase64(newReport.file);
        const otp = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit OTP

        const payload = {
            title: newReport.title,
            description: newReport.description,
            category: newReport.category,
            day: newReport.day,
            filename: newReport.file.name,
            fileData: fileDataUrl,
            size: `${(newReport.file.size / 1024 / 1024).toFixed(2)} MB`,
            timestamp: Date.now(),
            otp: otp,
            author: auth.currentUser ? auth.currentUser.email : 'Admin'
        };

        await push(ref(database, 'reports'), payload);

        setLastUploadedOtp(otp);
        setNewReport({
            title: '',
            description: '',
            category: 'Market',
            file: null,
            day: activeDay // Keep current day selected
        });
        
        // Reset file input visually
        const fileInput = document.getElementById('report-file-upload');
        if(fileInput) fileInput.value = '';

    } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed. Please try again.");
    } finally {
        setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteData.id) {
        try {
            await remove(ref(database, `reports/${deleteData.id}`));
            setDeleteData({ open: false, id: null, title: '' });
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete report.");
        }
    }
  };

  const handlePreview = (fileData) => {
      const win = window.open();
      if (win) {
          win.document.write(
              `<iframe src="${fileData}" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"></iframe>`
          );
      }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header & Rules */}
      <div className="flex flex-col xl:flex-row gap-6">
          {/* Title Section */}
          <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="text-indigo-600 dark:text-indigo-400" />
                  Premium Research Manager
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                  Upload proprietary market research PDF reports here. Reports are OTP-protected by default.
              </p>
          </div>

          {/* Quick Rules Card */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl p-4 flex gap-3 max-w-xl">
             <Shield className="text-indigo-600 dark:text-indigo-400 mt-1 flex-shrink-0" size={20} />
             <div className="text-xs text-indigo-800 dark:text-indigo-200">
                <span className="font-bold block mb-1">Secure Upload Protocols:</span>
                <ul className="list-disc pl-4 space-y-1 opacity-80">
                    <li>Only <strong>PDF</strong> files are allowed (Max 5MB).</li>
                    <li>System automatically generates a unique <strong>6-digit OTP</strong> for each file.</li>
                    <li>Files are accessible to clients only after entering the correct OTP.</li>
                    <li>Deleted reports are permanently removed from the database.</li>
                </ul>
             </div>
          </div>
      </div>

      {/* Main Content Layout: Upload Form (Left/Top) + List (Right/Bottom) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Upload Form */}
          <div className="xl:col-span-4 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                      Upload New Report
                  </h3>

                  <form onSubmit={handleUpload} className="space-y-4">
                      {/* Day Selection */}
                      <div>
                          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1.5 ml-1">Pubishing Day</label>
                          <select 
                            value={newReport.day}
                            onChange={(e) => setNewReport({...newReport, day: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer"
                          >
                              {WEEK_DAYS.map(day => <option key={day} value={day}>{day}</option>)}
                          </select>
                      </div>

                      {/* Title */}
                      <div>
                          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1.5 ml-1">Report Title</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Nifty 50 Mid-Day Analysis"
                            value={newReport.title}
                            onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          />
                      </div>

                      {/* Category */}
                      <div>
                          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1.5 ml-1">Category</label>
                          <div className="flex flex-wrap gap-2">
                              {REPORT_CATEGORIES.map(cat => (
                                  <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setNewReport({...newReport, category: cat})}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                        newReport.category === cat 
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                  >
                                      {cat}
                                  </button>
                              ))}
                          </div>
                      </div>

                      {/* File Upload */}
                      <div>
                          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1.5 ml-1">Report File (PDF)</label>
                          <div className="relative group">
                              <input 
                                id="report-file-upload"
                                type="file" 
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className={`w-full p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
                                  newReport.file 
                                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                                  : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400 bg-gray-50 dark:bg-gray-900/50'
                              }`}>
                                  {newReport.file ? (
                                      <>
                                        <FileText className="text-indigo-600 mb-2" size={24} />
                                        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 truncate max-w-[200px]">{newReport.file.name}</p>
                                        <p className="text-xs text-indigo-500">{(newReport.file.size / 1024 / 1024).toFixed(2)} MB</p>
                                      </>
                                  ) : (
                                      <>
                                        <Upload className="text-gray-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Click to upload PDF</p>
                                      </>
                                  )}
                              </div>
                          </div>
                      </div>

                      {/* Description */}
                      <div>
                          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1.5 ml-1">Description (Optional)</label>
                          <textarea 
                            rows="2"
                            placeholder="Brief summary..."
                            value={newReport.description}
                            onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 border-none ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                          />
                      </div>

                      <button 
                        type="submit"
                        disabled={isUploading}
                        className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                          {isUploading ? <LoadingSpinner size="sm" color="white" /> : <><Upload size={18} /> Upload Report</>}
                      </button>
                  </form>
              </div>

              {/* Success Token Display */}
              <AnimatePresence>
                  {lastUploadedOtp && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-6 rounded-2xl text-center space-y-2 shadow-sm"
                      >
                          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-300 mb-2">
                              <CheckCircle size={24} />
                          </div>
                          <h4 className="text-emerald-800 dark:text-emerald-200 font-bold text-lg">Report Uploaded!</h4>
                          <p className="text-emerald-700 dark:text-emerald-300 text-sm">Use this OTP to access the file:</p>
                          <div className="bg-white dark:bg-gray-800 py-3 px-6 rounded-xl border border-emerald-200 dark:border-emerald-700 inline-block mt-2">
                              <span className="font-mono text-2xl font-bold tracking-[0.2em] text-emerald-600 dark:text-emerald-400">{lastUploadedOtp}</span>
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Report List */}
          <div className="xl:col-span-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col overflow-hidden">
                  
                  {/* Tabs Header */}
                  <div className="flex items-center overflow-x-auto p-2 border-b border-gray-100 dark:border-gray-700 custom-scrollbar">
                      {WEEK_DAYS.map(day => {
                          const count = reports[day]?.length || 0;
                          const isActive = activeDay === day;
                          return (
                              <button
                                key={day}
                                onClick={() => setActiveDay(day)}
                                className={`
                                    flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all font-medium text-sm
                                    ${isActive 
                                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' 
                                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}
                                `}
                              >
                                  {day}
                                  {count > 0 && (
                                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? 'bg-indigo-200 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                          {count}
                                      </span>
                                  )}
                              </button>
                          )
                      })}
                  </div>

                  {/* Reports Grid */}
                  <div className="flex-1 p-6 overflow-y-auto max-h-[800px] min-h-[400px]">
                      {isLoading ? (
                          <div className="h-full flex items-center justify-center">
                              <LoadingSpinner />
                          </div>
                      ) : (reports[activeDay] || []).length > 0 ? (
                          <div className="space-y-3">
                              {(reports[activeDay] || []).map((report, idx) => (
                                  <motion.div
                                    key={report.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 rounded-xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md transition-all gap-4"
                                  >
                                      <div className="flex items-start gap-4 overflow-hidden">
                                          <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                                              <FileText size={20} />
                                          </div>
                                          <div className="min-w-0">
                                              <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base truncate pr-2">{report.title}</h4>
                                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">{report.category}</span>
                                                  <span className="text-xs text-gray-400">•</span>
                                                  <span className="text-xs text-gray-500">{new Date(report.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                  <span className="text-xs text-gray-400">•</span>
                                                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-800">
                                                      OTP: {report.otp}
                                                  </span>
                                              </div>
                                              {report.description && (
                                                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{report.description}</p>
                                              )}
                                          </div>
                                      </div>

                                      <div className="flex items-center gap-2 pl-14 sm:pl-0">
                                          <button 
                                            onClick={() => handlePreview(report.fileData)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                            title="Preview PDF"
                                          >
                                              <Eye size={18} />
                                          </button>
                                          <button 
                                            onClick={() => setDeleteData({ open: true, id: report.id, title: report.title })}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete File"
                                          >
                                              <Trash2 size={18} />
                                          </button>
                                      </div>
                                  </motion.div>
                              ))}
                          </div>
                      ) : (
                          <div className="h-full flex flex-col items-center justify-center text-gray-400 min-h-[300px]">
                              <p className="text-sm font-medium">No reports uploaded for {activeDay}</p>
                              <p className="text-xs opacity-60 mt-1">Select another day or upload a new file.</p>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
          {deleteData.open && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100 dark:border-gray-700"
                  >
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mb-4 mx-auto">
                          <AlertTriangle size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">Delete Report?</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-6">
                          Are you sure you want to delete <br/>
                          <span className="font-semibold text-gray-900 dark:text-white">"{deleteData.title}"</span>?
                          <br/>This action cannot be undone.
                      </p>
                      <div className="flex gap-3">
                          <button 
                            onClick={() => setDeleteData({ open: false, id: null, title: '' })}
                            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                              Cancel
                          </button>
                          <button 
                            onClick={handleDelete}
                            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-500/30 transition-colors"
                          >
                              Delete
                          </button>
                      </div>
                  </motion.div>
              </div>
          )}
      </AnimatePresence>

    </div>
  );
};

export default ReportManager;