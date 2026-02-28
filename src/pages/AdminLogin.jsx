import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  // Security: If user is already logged in, redirect them to dashboard directly
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
       if (user) {
         navigate('/admin/dashboard');
       }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Particle background effect
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('loading');
    setErrorMsg('');

    try {
      // Input Validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Security Check: Only allow specific admin email
      // Although database rules enforce this, we check here for better UX
      const ADMIN_EMAIL = 'durgeshrathor05@gmail.com';
      if (formData.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        throw new Error('Access Denied: You are not authorized as an admin.');
      }

      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Allow login and redirect to dashboard
      // We removed the strict UID check on frontend to avoid lockout if UID changes.
      // Database rules still enforce security on the backend.
      
      setStatus('success');
      setTimeout(() => {
         // Navigate to Admin Dashboard
         navigate('/admin/dashboard');
      }, 800);
    } catch (err) {
      console.error(err);
      setStatus('error');
      // Customize error messages
      console.error(err);
      if (err.message) {
         setErrorMsg(err.message);
      } else if (err.code === 'auth/invalid-email') {
        setErrorMsg('Invalid email address format.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
         setErrorMsg('Invalid email or password.');
      } else if (err.code === 'auth/too-many-requests') {
         setErrorMsg('Too many failed attempts. Try again later.');
      } else if (err.code === 'auth/invalid-credential') {
        setErrorMsg('Invalid credentials provided.');
      } else {
        setErrorMsg('Authentication failed. Please try again.');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2], 
              y: [0, -100], 
              x: Math.sin(p.id) * 20 
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.id % 2 === 0 ? '#3b82f6' : '#6366f1',
              filter: 'blur(1px)' // Soft glow
            }}
          />
        ))}
        
        {/* Large Gradient Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"
        />
      </div>

      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-8 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          {/* Top Line Gradient Animation */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          
          {/* Header Section */}
          <div className="flex flex-col items-center mb-8 relative">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 ring-4 ring-white/10"
            >
              <ShieldCheck className="w-12 h-12 text-white" strokeWidth={1.5} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
            <p className="text-gray-400 text-sm mt-2">Restricted Access Area</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Message */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/50 rounded-xl overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-3 text-red-200 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <div className="space-y-1 group/field">
              <label className="text-xs font-semibold text-gray-400 ml-1 uppercase tracking-wider group-focus-within/field:text-blue-400 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within/field:text-blue-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="admin@sterling.com"
                  className="w-full bg-black/20 border border-gray-700 text-white rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:bg-black/40 transition-all placeholder:text-gray-600"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1 group/field">
              <label className="text-xs font-semibold text-gray-400 ml-1 uppercase tracking-wider group-focus-within/field:text-blue-400 transition-colors">
                Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-500 group-focus-within/field:text-blue-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••••••"
                  className="w-full bg-black/20 border border-gray-700 text-white rounded-xl py-3 pl-12 pr-12 outline-none focus:border-blue-500 focus:bg-black/40 transition-all placeholder:text-gray-600 tracking-widest"
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-500 hover:text-white transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || status === 'success'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full relative overflow-hidden rounded-xl py-4 font-bold text-white shadow-lg transition-all
                ${status === 'success' 
                  ? 'bg-green-600 hover:bg-green-700 shadow-green-500/20' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-blue-500/30'
                } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {status === 'loading' ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : status === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Access Granted</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
              
              {/* Shine Effect Animation */}
              {!isLoading && status !== 'success' && (
                <motion.div
                  className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"
                  animate={{ left: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1, ease: "easeInOut" }}
                />
              )}
            </motion.button>
          </form>

          {/* Footer Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs flex items-center justify-center gap-1.5">
              <Lock className="w-3 h-3" />
              <span>End-to-End Encrypted Session</span>
            </p>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;