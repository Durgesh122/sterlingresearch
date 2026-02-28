import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { ShieldAlert } from 'lucide-react';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white space-y-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="animate-pulse text-sm font-mono text-gray-400">Verifying Security Protocols...</p>
      </div>
    );
  }

  if (!user) {
    // User is not logged in
    return <Navigate to="/admin/login" replace />;
  }

  // Optional: Add specific email check for "Only Me" security
  // const allowedAdmins = ['your-email@example.com'];
  // if (!allowedAdmins.includes(user.email)) {
  //   return (
  //      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-red-500 p-8 text-center">
  //        <ShieldAlert size={64} className="mb-4" />
  //        <h1 className="text-3xl font-bold mb-2">ACCESS DENIED</h1> 
  //        <p className="text-gray-400">Your account does not have administrative privileges.</p>
  //        <p className="text-xs text-gray-600 mt-8">IP Address Logged & Reported</p>
  //      </div>
  //   );
  // }

  return children;
};

export default ProtectedRoute;