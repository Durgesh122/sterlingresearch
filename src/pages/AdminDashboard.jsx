import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { ref, push, onValue, remove, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, database, storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { 
  Users, FileText, Briefcase, Plus, Trash2, 
  LogOut, Activity, Search, X, CheckCircle, Clock, Image as ImageIcon, MessageSquare, Shield, AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Delete Confirmation State
  const [deleteData, setDeleteData] = useState({ open: false, id: null, type: null, title: '' });

  // New Job Form State
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    type: 'Full-time',
    location: '',
    experience: '',
    description: '',
    tags: ''
  });

  // New Blog Form State
  const [newBlog, setNewBlog] = useState({
    title: '',
    category: 'general',
    description: '',
    author: 'Admin',
    image: null,
    source: 'Sterling Research'
  });

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) navigate('/admin/login');
    });

    // Fetch Jobs
    const jobsRef = ref(database, 'jobs');
    const unsubscribeJobs = onValue(jobsRef, (snapshot) => {
      const data = snapshot.val();
      const jobList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setJobs(jobList);
    });

    // Fetch Blogs
    const blogsRef = ref(database, 'blogs');
    const unsubscribeBlogs = onValue(blogsRef, (snapshot) => {
      const data = snapshot.val();
      const blogList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      // Sort by date desc
      blogList.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      setBlogs(blogList);
    });

    // Fetch Applications
    const appsRef = ref(database, 'applications');
    const unsubscribeApps = onValue(appsRef, (snapshot) => {
      const data = snapshot.val();
      const appList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      // Sort by date desc
      appList.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
      setApplications(appList);
      setLoading(false);
    });

    // Fetch Messages
    const messagesRef = ref(database, 'messages');
    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messageList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      // Sort by date desc
      messageList.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
      setMessages(messageList);
      setLoading(false);
    });

    // Fetch Complaints
    const complaintsRef = ref(database, 'complaints');
    const unsubscribeComplaints = onValue(complaintsRef, (snapshot) => {
      const data = snapshot.val();
      const complaintList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      // Sort by date desc
      complaintList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setComplaints(complaintList);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeJobs();
      unsubscribeBlogs();
      unsubscribeApps();
      unsubscribeMessages();
      unsubscribeComplaints();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const jobsRef = ref(database, 'jobs');
      const tagsArray = newJob.tags.split(',').map(tag => tag.trim());
      await push(jobsRef, { 
        ...newJob, 
        tags: tagsArray, 
        createdAt: new Date().toISOString() 
      });
      setShowJobModal(false);
      setNewJob({ title: '', department: '', type: 'Full-time', location: '', experience: '', description: '', tags: '' });
      alert("Job Posted Successfully!");
    } catch (error) {
      console.error("Error creating job:", error);
      alert("Failed to post job.");
    }
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = null;
      if (newBlog.image) {
        const imageRef = storageRef(storage, `blogs/${Date.now()}_${newBlog.image.name}`);
        const snapshot = await uploadBytes(imageRef, newBlog.image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const blogsRef = ref(database, 'blogs');
      await push(blogsRef, { 
        ...newBlog, 
        image: imageUrl || "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000",
        published_at: new Date().toISOString() 
      });
      setShowBlogModal(false);
      setNewBlog({ title: '', category: 'general', description: '', author: 'Admin', image: null, source: 'Sterling Research' });
      alert("Blog Published Successfully!");
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to publish blog.");
    }
  };

  const handleDeleteBlog = (id) => {
    setDeleteData({ open: true, id, type: 'blog', title: 'Delete Blog Post' });
  };

  const handleDeleteJob = (id) => {
    setDeleteData({ open: true, id, type: 'job', title: 'Delete Job Posting' });
  };

  const handleDeleteMessage = (id) => {
    setDeleteData({ open: true, id, type: 'message', title: 'Delete Message' });
  };

  const handleDeleteComplaint = (id) => {
    setDeleteData({ open: true, id, type: 'complaint', title: 'Delete Complaint' });
  };

  const handleDeleteApplication = (id) => {
    setDeleteData({ open: true, id, type: 'application', title: 'Delete Application' });
  };

  const confirmDelete = async () => {
    const { id, type } = deleteData;
    if (!id || !type) return;

    try {
      let path = '';
      switch (type) {
        case 'blog': path = `blogs/${id}`; break;
        case 'job': path = `jobs/${id}`; break;
        case 'message': path = `messages/${id}`; break;
        case 'complaint': path = `complaints/${id}`; break;
        case 'application': path = `applications/${id}`; break;
        default: return;
      }
      
      await remove(ref(database, path));
      setDeleteData({ open: false, id: null, type: null, title: '' });
    } catch (error) {
       console.error("Error deleting item:", error);
       alert("Failed to delete item.");
    }
  };

  const activeTabClass = "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400";
  const inactiveTabClass = "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50";

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'complaints', label: 'Complaints', icon: Shield },
    { id: 'jobs', label: 'Manage Jobs', icon: Briefcase },
    { id: 'blogs', label: 'Manage Blogs', icon: FileText },
    { id: 'applications', label: 'Applications', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300 flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-3 rounded-xl gap-3 text-sm font-medium transition-colors ${
                activeTab === item.id
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-xl gap-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen p-6 lg:p-8">
        
        {/* Header (Mobile Toggle could go here) */}
        <div className="mb-8 flex justify-between items-center">
           <div>
             <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
               {activeTab.replace('-', ' ')}
             </h2>
             <p className="text-gray-500 text-sm">Manage your recruitment pipeline</p>
           </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Active Jobs</p>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{jobs.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Applications</p>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{applications.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Published Blogs</p>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{blogs.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Messages</p>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{messages.length}</h3>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-xl">
                      <Shield size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Complaints</p>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{complaints.length}</h3>
                    </div>
                  </div>
                </div>
             </div>
          )}

          {/* COMPLAINTS TAB */}
          {activeTab === 'complaints' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800">
                    <tr>
                      <th className="px-6 py-4">Ticket ID</th>
                      <th className="px-6 py-4">Complainant</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {complaints.length > 0 ? (
                      complaints.map((complaint) => (
                        <tr key={complaint.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                            {complaint.ticketId || 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col text-xs text-gray-500">
                              <span className="text-gray-900 dark:text-gray-300 font-medium">{complaint.name}</span>
                              <span>{complaint.email}</span>
                              <span>{complaint.mobile}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                            {complaint.complaintType}
                          </td>
                           <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate" title={complaint.description}>
                            {complaint.description}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              complaint.status === 'Resolved' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}>
                              {complaint.status || 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-500">
                            {new Date(complaint.timestamp).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                             <button 
                               onClick={() => handleDeleteComplaint(complaint.id)}
                               className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                               title="Delete Complaint"
                             >
                               <Trash2 size={18} />
                             </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-gray-400">
                          <Shield size={48} className="mx-auto mb-4 opacity-50" />
                          <p>No complaints lodged yet.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* JOBS TAB */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-end mb-6">
                <button 
                  onClick={() => setShowJobModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                >
                  <Plus size={18} /> Post New Job
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {jobs.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {jobs.map((job) => (
                      <div key={job.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">{job.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs uppercase font-semibold">{job.department}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <button 
                             onClick={() => handleDeleteJob(job.id)}
                             className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                             title="Delete Job"
                           >
                             <Trash2 size={20} />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-gray-400">
                    <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No active job postings found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div>
              <div className="flex justify-end mb-6">
                <button 
                  onClick={() => setShowBlogModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg shadow-green-500/30 transition-all active:scale-95"
                >
                  <Plus size={18} /> Publish New Blog
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {blogs.length > 0 ? (
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                           </div>
                           <div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-lg line-clamp-1">{blog.title}</h3>
                            <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs uppercase font-semibold">{blog.category}</span>
                              <span>•</span>
                              <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{blog.author}</span>
                            </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-3">
                           <button 
                             onClick={() => handleDeleteBlog(blog.id)}
                             className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                             title="Delete Blog"
                           >
                             <Trash2 size={20} />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-gray-400">
                    <FileText size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No blog posts published yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* APPLICATIONS TAB */}
          {activeTab === 'applications' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4">Applicant</th>
                      <th className="px-6 py-4">Position</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Applied</th>
                      <th className="px-6 py-4">Resume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {app.fullName}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {app.jobTitle}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col text-xs text-gray-500">
                            <span className="text-gray-900 dark:text-gray-300 font-medium">{app.mobile}</span>
                            <span>{app.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {new Date(app.appliedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <a 
                            href={app.resumeData} 
                            download={app.fileName || `resume_${app.id}.pdf`}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Download Resume
                          </a>
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                          No applications received yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 font-medium border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Message</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {messages.length > 0 ? (
                      messages.map((msg) => (
                        <tr key={msg.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {msg.name}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col text-xs text-gray-500">
                              <span className="text-gray-900 dark:text-gray-300 font-medium">{msg.phone}</span>
                              <span>{msg.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                            {msg.subject}
                          </td>
                           <td className="px-6 py-4 text-gray-600 dark:text-gray-300 max-w-xs truncate" title={msg.message}>
                            {msg.message}
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(msg.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                             <button 
                               onClick={() => handleDeleteMessage(msg.id)}
                               className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                               title="Delete Message"
                             >
                               <Trash2 size={18} />
                             </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                          <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                          <p>No messages received yet.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Create Job Modal */}
      <AnimatePresence>
        {showJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Post New Job</h3>
                <button onClick={() => setShowJobModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleCreateJob} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={newJob.title}
                      onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                    <select 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none"
                      value={newJob.department}
                      onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                    >
                      <option value="">Select Department</option>
                      <option value="Research">Research</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Support">Support</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Type</label>
                    <select 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none"
                      value={newJob.type}
                      onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Mumbai / Remote"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 active:ring-2 focus:ring-blue-500 outline-none" 
                      value={newJob.location}
                      onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Experience Required</label>
                   <input 
                      required 
                      type="text" 
                      placeholder="e.g. 3-5 Years"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={newJob.experience}
                      onChange={(e) => setNewJob({...newJob, experience: e.target.value})}
                    />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea 
                    required 
                    rows="4" 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                  ></textarea>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (comma separated)</label>
                   <input 
                      type="text" 
                      placeholder="e.g. Equity, Sales, CRM"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={newJob.tags}
                      onChange={(e) => setNewJob({...newJob, tags: e.target.value})}
                    />
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowJobModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Blog Modal */}
      <AnimatePresence>
        {showBlogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Publish New Blog</h3>
                <button onClick={() => setShowBlogModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleCreateBlog} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Blog Title</label>
                    <input 
                      required 
                      type="text" 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none" 
                      value={newBlog.title}
                      onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                    />
                  </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select 
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 outline-none"
                      value={newBlog.category}
                      onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                    >
                      <option value="business">Business</option>
                      <option value="technology">Technology</option>
                      <option value="general">General</option>
                      <option value="science">Science</option>
                      <option value="health">Health</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Research Team"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 active:ring-2 focus:ring-green-500 outline-none" 
                      value={newBlog.author}
                      onChange={(e) => setNewBlog({...newBlog, author: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Image</label>
                   <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-800 text-center cursor-pointer relative hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                      <input 
                        required
                        type="file" 
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setNewBlog({...newBlog, image: e.target.files[0]})}
                      />
                      <div className="pointer-events-none flex flex-col items-center gap-2">
                        {newBlog.image ? (
                           <>
                            <CheckCircle className="text-green-500" size={24} />
                            <span className="text-sm font-medium text-green-600 truncate max-w-[200px]">{newBlog.image.name}</span>
                           </>
                        ) : (
                           <>
                            <ImageIcon className="text-gray-400" size={24} />
                            <span className="text-sm text-gray-500">Click to upload cover image</span>
                           </>
                        )}
                      </div>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content / Description</label>
                  <textarea 
                    required 
                    rows="6" 
                    placeholder="Write your blog content here..."
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
                    value={newBlog.description}
                    onChange={(e) => setNewBlog({...newBlog, description: e.target.value})}
                  ></textarea>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source (Optional)</label>
                   <input 
                      type="text" 
                      placeholder="e.g. Sterling Research"
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-green-500 outline-none" 
                      value={newBlog.source}
                      onChange={(e) => setNewBlog({...newBlog, source: e.target.value})}
                    />
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setShowBlogModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30"
                  >
                    Publish Post
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteData.open && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm p-6 text-center"
             >
               <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                 <AlertTriangle size={32} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{deleteData.title}</h3>
               <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
                 Are you sure? This action cannot be undone and will permanently remove this item from the database.
               </p>
               <div className="flex gap-4">
                 <button 
                   onClick={() => setDeleteData({ ...deleteData, open: false })}
                   className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={confirmDelete}
                   className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
                 >
                   Yes, Delete
                 </button>
               </div>
             </motion.div>
           </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
