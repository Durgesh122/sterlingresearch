import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, MapPin, Clock, Search, Send, CheckCircle, X, Loader, Award, Users, Globe, ArrowRight,
  TrendingUp, Star, Zap, Coffee 
} from 'lucide-react';
import { ref, onValue, push } from "firebase/database";
import { database } from '../firebase';
import JobImage from '../assets/JobImage.png';

const Job = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  
  // Application Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    coverLetter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const jobsRef = ref(database, 'jobs');
    const unsubscribe = onValue(jobsRef, (snapshot) => {
      const data = snapshot.val();
      const jobList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setJobs(jobList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
        alert("Please upload your resume.");
        return;
    }

    if (resumeFile.size > 5 * 1024 * 1024) {
      alert("File size is too large. Please upload a PDF smaller than 5MB.");
      return;
    }
    
    setSubmitting(true);

    try {
        const base64Resume = await convertFileToBase64(resumeFile);

        const appsRef = ref(database, 'applications');
        await push(appsRef, {
            jobId: selectedJob.id,
            jobTitle: selectedJob.title,
            ...formData,
            resumeData: base64Resume,
            fileName: resumeFile.name,
            appliedAt: new Date().toISOString()
        });

        setSelectedJob(null);
        setFormData({ fullName: '', email: '', mobile: '', coverLetter: '' });
        setResumeFile(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);

    } catch (error) {
        console.error("Error submitting application:", error);
        alert("Failed to submit application. Please try again.");
    } finally {
        setSubmitting(false);
    }
  };

  const filteredJobs = activeTab === 'all' 
    ? jobs 
    : jobs.filter(job => job.department.toLowerCase() === activeTab.toLowerCase());

  const stats = [
    { label: "Active Roles", value: jobs.length, icon: Briefcase },
    { label: "Global Reach", value: "5+", icon: Globe },
    { label: "Growth Rate", value: "200%", icon: TrendingUp },
    { label: "Experts", value: "50+", icon: Users },
  ];

  const values = [
    { 
      icon: Star, 
      title: "Excellence", 
      desc: "Aiming for world-class in every research report." 
    },
    { 
      icon: Zap, 
      title: "Innovation", 
      desc: "Embracing new technologies and methodologies fast." 
    },
    { 
      icon: Users, 
      title: "Collaboration", 
      desc: "Success is a team sport. Every voice is valued." 
    },
    { 
      icon: Coffee, 
      title: "Balance", 
      desc: "Flexible schedules for creative and rested minds." 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      
      {/* 1. Compact Hero Section */}
      <header className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-blue-50/50 to-transparent dark:from-blue-900/10 -z-10 rounded-bl-[80px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-gradient-to-tr from-purple-50/50 to-transparent dark:from-purple-900/10 -z-10 rounded-tr-[80px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-blue-100 dark:border-gray-700 shadow-sm mb-6 mx-auto lg:mx-0">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                </span>
                <span className="text-xs font-bold tracking-wide uppercase text-gray-800 dark:text-gray-200">Hiring Exceptional Talent</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                Architect the Future of <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Financial Intelligence</span>
              </h1>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-normal max-w-xl mx-auto lg:mx-0 font-light">
                At Sterling Research, we define markets. Join a team of visionaries and strategists building the next generation of financial tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-blue-600 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 group text-base"
                >
                  Explore Careers <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.1 }}
               className="flex-1 w-full max-w-md mx-auto lg:max-w-none relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="aspect-[4/3] relative">
                    <img 
                    src={JobImage} 
                    alt="Sterling Research Team" 
                    className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 max-w-[200px]">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Join us</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">World Class Team</p>
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </header>


      {/* 2. Compact Stats Strip */}
      <div className="border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200 dark:divide-gray-800">
            {stats.map((stat, idx) => (
              <div key={idx} className="py-6 text-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-default">
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-0.5">{stat.value}</p>
                <div className="flex justify-center items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  <stat.icon size={14} className="text-blue-600 dark:text-blue-400" />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Company Values (Reduced Padding) */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Why Sterling Research?</h2>
            <p className="text-base text-gray-600 dark:text-gray-300">
              We are building a culture where ambition meets support.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl hover:bg-white dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-900 group"
              >
                <div className="w-10 h-10 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <item.icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Hiring Process (Compact) */}
      <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="mb-10 text-center md:text-left">
             <h2 className="text-2xl font-bold">Your Journey</h2>
             <p className="text-gray-400 text-sm mt-1">Simple, transparent, and fast.</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Apply", desc: "Submit resume" },
                { step: "2", title: "Chat", desc: "HR Screening" },
                { step: "3", title: "Task", desc: "Skill check" },
                { step: "4", title: "Offer", desc: "Welcome!" }
              ].map((step, i) => (
                <div key={i} className="relative pl-6 border-l-2 border-gray-700 hover:border-blue-500 transition-colors">
                  <span className="text-2xl font-black text-gray-800 absolute -top-3 right-2 select-none">{step.step}</span>
                  <h4 className="text-lg font-bold mb-1 text-blue-400">{step.title}</h4>
                  <p className="text-gray-400 text-xs">{step.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. Job Listings (Compact Layout) */}
      <section id="openings" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Open Positions</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Join our mission.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['All', 'Research', 'Sales', 'Marketing', 'Support'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {loading ? (
             <div className="flex justify-center py-20">
               <Loader className="animate-spin text-blue-600 w-8 h-8" />
             </div>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-100 dark:border-blue-800">
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-medium text-green-600 dark:text-green-400">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </span>
                        Hiring
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                        {job.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                      <span className="flex items-center gap-1"><Briefcase size={12} /> {job.experience}</span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                       {Array.isArray(job.tags) && job.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-[10px] font-semibold rounded">
                          #{tag}
                        </span>
                       ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
                    <button
                      className="w-full md:w-auto px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 dark:hover:bg-gray-200 transition-all text-sm shadow-md"
                      onClick={() => setSelectedJob(job)}
                    >
                      Apply <Send size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
              <Search size={32} className="mx-auto text-gray-400 mb-2" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No positions found</h3>
            </div>
          )}
        </div>
      </section>

      {/* Compact CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-8">
        <div className="bg-gray-900 rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join our talent pool</h2>
            <p className="text-gray-400 mb-8 text-base">
              Don't see a fit? Send us your resume anyway.
            </p>
            <button 
              onClick={() => setSelectedJob({ id: 'general', title: 'General Application', department: 'General Talent Pool' })}
              className="inline-flex items-center px-8 py-3 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all text-sm border-2 border-white"
            >
              Submit General Application <Send size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Application Modal (Preserved Functionality) */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800"
             >
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                   <div>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white">Apply Now</h3>
                     <p className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate max-w-[200px]">{selectedJob.title}</p>
                   </div>
                   <button onClick={() => setSelectedJob(null)} className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500">
                     <X size={20} />
                   </button>
                </div>
                
                <div className="p-6 overflow-y-auto custom-scrollbar">
                  <form onSubmit={handleApply} className="space-y-4">
                    <div className="space-y-4">
                       <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Full Name</label>
                          <input 
                            required 
                            type="text" 
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" 
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Email</label>
                          <input 
                            required 
                            type="email" 
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                       </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Mobile</label>
                        <input 
                          required 
                          type="tel" 
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" 
                          value={formData.mobile}
                          onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        />
                     </div>

                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">Resume (PDF)</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer relative group">
                          <input 
                            required 
                            type="file" 
                            accept=".pdf,.doc,.docx"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            onChange={(e) => setResumeFile(e.target.files[0])}
                          />
                          <div className="flex flex-col items-center gap-2">
                             {resumeFile ? (
                               <>
                                 <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600">
                                    <CheckCircle size={18} />
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{resumeFile.name}</p>
                                 </div>
                               </>
                             ) : (
                               <>
                                 <Briefcase size={20} className="text-gray-400" />
                                 <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Upload Resume</p>
                                    <p className="text-xs text-gray-400">Max 5MB</p>
                                 </div>
                               </>
                             )}
                          </div>
                        </div>
                     </div>
                     
                     <div className="pt-2">
                       <button 
                         type="submit" 
                         disabled={submitting}
                         className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2 text-base"
                       >
                         {submitting ? <Loader className="animate-spin w-5 h-5" /> : "Submit"}
                       </button>
                     </div>
                  </form>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >
               <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                  <CheckCircle size={32} />
               </div>
               
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Sent!</h3>
               <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm">
                 We've received your details successfully. Our team will review your profile and contact you shortly.
               </p>
               
               <button 
                 onClick={() => setShowSuccess(false)}
                 className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all"
               >
                 Close
               </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Job;
