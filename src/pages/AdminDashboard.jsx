import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Activity, 
  DollarSign, 
  MessageSquare,
  Bell 
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser); // Initialize with currentUser if available
  const [inactivityTimer, setInactivityTimer] = useState(0);

  // Security: Auto-logout after 15 minutes of inactivity
  useEffect(() => {
    // Force logout function
    const forceLogout = async () => {
        try {
          await signOut(auth);
          navigate('/admin/login');
        } catch (error) {
          console.error("Auto-logout error:", error);
        }
    };

    const handleActivity = () => setInactivityTimer(0);
    
    // Listen for user interactions
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);

    // Timer logic
    const interval = setInterval(() => {
      setInactivityTimer((prev) => {
        if (prev >= 900) { // 900 seconds = 15 minutes
           forceLogout();
           return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(interval);
    };
  }, [navigate]);

  useEffect(() => {
    // We already check in ProtectedRoute, but double security here for safety
    if (!auth.currentUser) {
       navigate('/admin/login');
    }
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
       setUser(currentUser);
       
       // Example of reading user-isolated data securely: 
       // const userRef = ref(database, 'users/' + currentUser.uid);
       // ...
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500', trend: '+12%' },
    { title: 'Active Reports', value: '42', icon: FileText, color: 'bg-green-500', trend: '+5%' },
    { title: 'Revenue', value: '$12.5k', icon: DollarSign, color: 'bg-purple-500', trend: '+18%' },
    { title: 'Support Tickets', value: '8', icon: MessageSquare, color: 'bg-orange-500', trend: '-2%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      
      {/* Top Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
           {/* Notification Bell */}
           <motion.button 
             whileHover={{ rotate: 15 }}
             className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
           >
             <Bell className="w-5 h-5" />
             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
           </motion.button>

           {/* User Profile */}
           <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{user?.email}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                {user?.email?.[0].toUpperCase()}
              </div>
           </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar (Simple Version) */}
        <aside className="w-64 hidden lg:block h-[calc(100vh-73px)] sticky top-[73px] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 space-y-2">
            {[
              { label: 'Overview', icon: Activity, active: true },
              { label: 'Users', icon: Users },
              { label: 'Reports', icon: FileText },
              { label: 'Messages', icon: MessageSquare },
              { label: 'Settings', icon: Settings },
            ].map((item, idx) => (
              <button 
                key={idx}
                className={`flex items-center w-full px-4 py-3 rounded-xl gap-3 text-sm font-medium transition-colors ${
                  item.active 
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}

            <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-700">
               <button 
                 onClick={handleLogout}
                 className="flex items-center w-full px-4 py-3 rounded-xl gap-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
               >
                 <LogOut className="w-5 h-5" />
                 Sign Out
               </button>
            </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-800 dark:text-white"
            >
              Welcome back, Admin! 👋
            </motion.h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Here is what is happening with your projects today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                   <stat.icon size={80} />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg shadow-${stat.color.replace('bg-', '')}/30`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.trend.startsWith('+') 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30'
                  }`}>
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity / Placeholder Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             {/* Graph Placeholder */}
             <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[300px]">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-6">Revenue Analytics</h3>
                <div className="w-full h-64 bg-gray-50 dark:bg-gray-700/30 rounded-xl flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 text-gray-400">
                  <TrendingUp className="w-8 h-8 mr-2" />
                  <span>Chart Visualization Placeholder</span>
                </div>
             </div>

             {/* Recent Users List */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-4">Recent Users</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">User Name {item}</p>
                        <p className="text-xs text-gray-500">user{item}@example.com</p>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;