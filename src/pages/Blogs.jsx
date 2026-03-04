import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ref, get } from "firebase/database";
import { database } from '../firebase';
import { 
  FaSearch, FaUser, FaCalendarAlt, FaTag, FaChevronRight, FaRegClock,
  FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp,
  FaArrowRight, FaLeaf, FaFire, FaChartLine, FaNewspaper, FaEnvelope,
  FaLock, FaSpinner, FaExclamationTriangle
} from 'react-icons/fa';
import RevealOnScroll from "../components/common/RevealOnScroll";

// Fallback data in case API limit is reached or fails
const FALLBACK_POSTS = [
  {
    title: "Market Outlook: Navigating the Volatility of 2026",
    description: "As Q1 comes to a close, global markets are signaling a shift. We analyze the technical indicators and macroeconomic drivers shaping the next quarter.",
    category: "business",
    author: "Monexaa Team",
    published_at: "2026-03-02T10:00:00Z",
    image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000",
    url: "#",
    source: "Internal Research"
  },
  {
    title: "The Rise of DeFi in Traditional Banking",
    description: "Decentralized Finance is no longer just a buzzword. Major institutions are adopting blockchain protocols faster than anticipated.",
    category: "technology",
    author: "Sarah Jenkins",
    published_at: "2026-02-28T09:30:00Z",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000",
    url: "#",
    source: "Tech Daily"
  },
  {
    title: "Sector Rotation: Why Energy is the New Tech",
    description: "With AI energy demands skyrocketing, the energy sector is seeing unprecedented capital inflows. Here is our deep dive.",
    category: "general",
    author: "David Chen",
    published_at: "2026-02-25T14:15:00Z",
    image: "https://images.unsplash.com/photo-1473341304170-5799a28c3c2e?auto=format&fit=crop&q=80&w=1000",
    url: "#",
    source: "Market Watch"
  },
  {
    title: "Global Supply Chains: The New Normal",
    description: "Post-pandemic recovery has settled into a new equilibrium. How efficient are today's logistics networks really?",
    category: "business",
    author: "Global Desk",
    published_at: "2026-02-20T11:00:00Z",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
    url: "#",
    source: "Economy Today"
  },
  {
     title: "AI in Healthcare: A Revolution",
     description: "Artificial Intelligence is transforming how we diagnose and treat diseases. The future of medicine is here.",
     category: "health",
     author: "Dr. Emily Ray",
     published_at: "2026-02-18T08:45:00Z", 
     image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
     url: "#",
     source: "Health News"
  },
  {
      title: "Space Exploration: The Next Frontier",
      description: "Private companies are racing to Mars. What does this mean for the future of humanity and the economy?",
      category: "science",
      author: "SpaceX Fan",
      published_at: "2026-02-15T16:20:00Z",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
      url: "#",
      source: "Science Daily"
  }
];

const CATEGORIES = [
  { name: "all", label: "All News" },
  { name: "business", label: "Business" },
  { name: "technology", label: "Technology" },
  { name: "general", label: "General" },
  { name: "science", label: "Science" },
  { name: "health", label: "Health" }
];

const POPULAR_TAGS = [
  "StockMarket", "Finance", "Investing", "Nifty50", "Economy", "BankNifty", "Business", "Sensex"
];

const Blogs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // SEO: Update Document Title
  useEffect(() => {
    document.title = "Market Insights - Sterling Research | Financial News & Analysis";
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    let allPosts = [];

    // Helper: Sort posts by date descending
    const sortPosts = (posts) => {
        return posts.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    };

    try {
      // 1. Fetch Internal Blogs from Firebase
      const blogsRef = ref(database, 'blogs');
      const snapshot = await get(blogsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        let firebasePosts = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
          source: data[key].source || "Sterling Research",
          isInternal: true,
          url: "#" // For now internal blogs link to #
        }));

        if (activeCategory !== 'all') {
             firebasePosts = firebasePosts.filter(post => post.category === activeCategory);
        }
        allPosts = [...firebasePosts];
      }
    } catch (firebaseErr) {
        console.error("Firebase fetch error:", firebaseErr);
    }

    try {
      // 2. Fetch External News from API
      // Using the provided API key
      const apiKey = 'a75cd5c17277b76a94b3a426f7966eaf';
      let url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&languages=en&limit=100`;
      
      if (activeCategory !== 'all') {
        url += `&categories=${activeCategory}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.data && data.data.length > 0) {
        allPosts = [...allPosts, ...data.data];
      } else {
         // If API returns empty or error, add fallback
         console.warn("API returned no data or error, utilizing fallback data.");
         let filteredFallback = activeCategory === 'all' 
            ? FALLBACK_POSTS 
            : FALLBACK_POSTS.filter(post => post.category === activeCategory);
         
         allPosts = [...allPosts, ...filteredFallback];

         if (data.error) {
             console.error("API Error Details:", data.error);
         }
      }
    } catch (err) {
      console.error("Failed to fetch news, utilizing fallback data:", err);
      // Fallback on catch
      let filteredFallback = activeCategory === 'all' 
        ? FALLBACK_POSTS 
        : FALLBACK_POSTS.filter(post => post.category === activeCategory);
      allPosts = [...allPosts, ...filteredFallback];
    } finally {
      // Set sorted posts
      setPosts(sortPosts(allPosts));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // Auto-refresh every hour
    const intervalId = setInterval(fetchNews, 3600000);
    return () => clearInterval(intervalId);
  }, [activeCategory]);

  // Client-side Search Filter
  const filteredPosts = posts.filter(post => {
    const titleMatch = post.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const descMatch = post.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || descMatch;
  });

  // Pagination Logic
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans pt-20 pb-12">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <RevealOnScroll>
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200 dark:border-blue-800">
               <FaChartLine /> Market Intelligence
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
               Sterling <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Research Hub</span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
               Real-time financial news, expert analysis, and market insights powered by global data sources.
            </p>
          </div>
        </RevealOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            
            {/* Featured Post (First item) */}
            {activeCategory === 'all' && !searchTerm && currentPage === 1 && posts.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-10 group relative rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 ring-1 ring-gray-900/5 dark:ring-white/10"
              >
                <div className="relative h-64 md:h-96 overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10"></div>
                   <img 
                     src={posts[0].image || "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000"} 
                     alt={posts[0].title}
                     className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                     onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000"}}
                   />
                   <div className="absolute top-4 left-4 z-20">
                      <span className="bg-red-500 text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg border border-red-400">
                        <FaFire /> Breaking News
                      </span>
                   </div>
                   
                   <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 text-white w-full">
                      <div className="flex items-center gap-3 mb-3 text-xs md:text-sm text-gray-300 font-medium">
                        <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-blue-400"/> {formatDate(posts[0].published_at)}</span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span className="flex items-center gap-1.5"><FaRegClock className="text-blue-400"/> 5 min read</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight group-hover:text-blue-200 transition-colors">
                        {posts[0].title}
                      </h2>
                      <p className="text-gray-200 line-clamp-2 mb-6 max-w-3xl text-sm md:text-base leading-relaxed hidden sm:block">
                        {posts[0].description}
                      </p>
                      <a href={posts[0].url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-500/30 text-sm">
                         Read Full Article <FaArrowRight className="ml-2" />
                      </a>
                   </div>
                </div>
              </motion.div>
            )}

            {/* Filter Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 border-b border-gray-200 dark:border-gray-700 pb-4">
               <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                 <FaLeaf className="text-blue-600" /> 
                 {searchTerm ? 'Search Results' : 'Latest Stories'}
               </h3>
               <div className="lg:hidden w-full sm:w-auto relative group">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-xs"/>
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white transition-all"
                  />
               </div>
            </div>

            {/* Posts Grid */}
            {loading ? (
               <div className="flex flex-col items-center justify-center py-20">
                  <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Loading market insights...</p>
               </div>
            ) : (
              <div className="grid gap-6">
                {currentPosts.length > 0 ? (
                   currentPosts.map((post, index) => (
                     <motion.div 
                       key={index}
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: index * 0.05 }}
                       className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col md:flex-row group h-auto"
                     >
                        <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                           <img 
                             src={post.image || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000"} 
                             alt={post.title}
                             className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                             onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1000"}}
                           />
                           <div className="absolute top-3 left-3">
                              <span className="bg-white/95 dark:bg-gray-900/95 backdrop-blur text-[10px] font-bold px-2.5 py-1 rounded shadow-sm text-gray-800 dark:text-gray-100 uppercase tracking-wide border border-gray-100 dark:border-gray-700">
                                 {post.category}
                              </span>
                           </div>
                        </div>
                        
                        <div className="p-5 md:w-2/3 flex flex-col justify-between">
                           <div>
                              <div className="flex items-center gap-3 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                                 <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-blue-500"/> {formatDate(post.published_at)}</span>
                                 <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                                 <span className="flex items-center gap-1.5"><FaNewspaper className="text-blue-500"/> {post.source || "Unknown Source"}</span>
                              </div>
                              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                 {post.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                                 {post.description}
                              </p>
                           </div>
                           
                           <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
                              <div className="flex items-center gap-2">
                                 <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-gray-300">
                                    <FaUser />
                                 </div>
                                 <span className="text-xs font-bold text-gray-700 dark:text-gray-300 truncate max-w-[120px]">{post.author || "Research Team"}</span>
                              </div>
                              <a 
                                 href={post.url} 
                                 target={post.isInternal ? "_self" : "_blank"} 
                                 rel="noopener noreferrer" 
                                 onClick={(e) => {
                                    if (post.isInternal) {
                                       e.preventDefault();
                                       setSelectedPost(post);
                                    }
                                 }}
                                 className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline transition-all cursor-pointer"
                              >
                                 Read More <FaChevronRight size={10} />
                              </a>
                           </div>
                        </div>
                     </motion.div>
                   ))
                ) : (
                   <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                      <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <FaSearch className="text-xl text-gray-400 dark:text-gray-500" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">No articles found</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-xs max-w-xs mx-auto mb-4">Try adjusting your filters or search query.</p>
                      <button onClick={() => {setSearchTerm(''); setActiveCategory('all');}} className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors text-xs shadow-md">
                         Clear All Filters
                      </button>
                   </div>
                )}
              </div>
            )}

            {/* Pagination Controls */}
            {filteredPosts.length > postsPerPage && (
               <div className="flex justify-center mt-10 gap-2">
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                     <FaChevronRight className="rotate-180" size={10} />
                  </button>
                  {[...Array(Math.min(5, totalPages))].map((_, i) => ( 
                     <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
                     >
                        {i + 1}
                     </button>
                  ))}
                  <button 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                     <FaChevronRight size={10} />
                  </button>
               </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
             
             {/* Search Widget */}
             <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hidden lg:block">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                   <FaSearch className="text-blue-600" /> Search
                </h4>
                <div className="relative group">
                   <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-xs" />
                   <input 
                     type="text" 
                     placeholder="Search topics..." 
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm dark:text-white placeholder-gray-400"
                   />
                </div>
             </div>

             {/* Categories Widget */}
             <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
                   <FaChartLine className="text-blue-600" /> Categories
                </h4>
                <ul className="space-y-1">
                   {CATEGORIES.map((cat) => (
                      <li key={cat.name}>
                         <button 
                           onClick={() => {setActiveCategory(cat.name); setCurrentPage(1);}}
                           className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                              activeCategory === cat.name 
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold translate-x-1' 
                              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:translate-x-1'
                           }`}
                         >
                            <span className="flex items-center gap-2">
                               <span className={`w-1.5 h-1.5 rounded-full ${activeCategory === cat.name ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}></span>
                               {cat.label}
                            </span>
                            {activeCategory === cat.name && <FaChevronRight size={10} />}
                         </button>
                      </li>
                   ))}
                </ul>
             </div>

             {/* Newsletter Widget */}
             <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-6 rounded-2xl text-white relative overflow-hidden shadow-lg ring-1 ring-blue-800">
                 <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                 <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
                 
                 <FaEnvelope className="text-blue-400 text-2xl mb-3 relative z-10" />
                 <h4 className="text-lg font-bold mb-2 relative z-10">Market Watch</h4>
                 <p className="text-blue-100/80 text-xs mb-5 leading-relaxed relative z-10">
                    Get our daily "Best of West" market analysis delivered straight to you.
                 </p>
                 <div className="space-y-3 relative z-10">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 placeholder-blue-200/50 text-white outline-none focus:bg-white/20 focus:border-blue-300 transition-all text-sm"
                    />
                    <button className="w-full py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20 text-xs uppercase tracking-wide">
                       Subscribe Now
                    </button>
                 </div>
                 <p className="text-[10px] text-blue-200/50 mt-4 flex items-center justify-center gap-1 relative z-10">
                    <FaLock size={8} /> Secure subscription.
                 </p>
             </div>

             {/* Popular Tags */}
             <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                   <FaTag className="text-blue-600" /> Trending Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                   {POPULAR_TAGS.map(tag => (
                      <span key={tag} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-semibold rounded-md hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors cursor-pointer border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                         #{tag}
                      </span>
                   ))}
                </div>
             </div>

             {/* Social Links */}
             <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 text-center">Join Our Community</h4>
                <div className="flex justify-center gap-3">
                   {[
                      { icon: FaFacebookF, color: "bg-[#1877F2]" },
                      { icon: FaTwitter, color: "bg-black dark:bg-white dark:text-black" },
                      { icon: FaLinkedinIn, color: "bg-[#0A66C2]" },
                      { icon: FaWhatsapp, color: "bg-[#25D366]" }
                   ].map((social, i) => (
                      <a key={i} href="#" className={`w-10 h-10 rounded-xl ${social.color} text-white flex items-center justify-center hover:scale-110 hover:shadow-lg transition-all duration-300`}>
                         <social.icon size={14} />
                      </a>
                   ))}
                </div>
             </div>

          </div>
        </div>
      </div>
      
      {/* Blog Details Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="relative h-64 md:h-96 w-full group">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-6 right-6 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur transition-all border border-white/10"
                  >
                     <FaSearch className="rotate-45" size={20} />
                  </button>
                  <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                     <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block shadow-lg tracking-wide border border-blue-400">
                        {selectedPost.category}
                     </span>
                     <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                        {selectedPost.title}
                     </h1>
                     <div className="flex items-center gap-6 text-sm text-gray-300 font-medium">
                        <span className="flex items-center gap-2"><FaCalendarAlt className="text-blue-400"/> {formatDate(selectedPost.published_at)}</span>
                        <span className="flex items-center gap-2"><FaUser className="text-blue-400"/> {selectedPost.author}</span>
                     </div>
                  </div>
               </div>
               
               <div className="p-8 md:p-12">
                  <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-line prose-a:text-blue-600 hover:prose-a:text-blue-500">
                     {selectedPost.description}
                  </div>
                  <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                     <span className="text-sm text-gray-500 dark:text-gray-400 italic font-medium">Source: {selectedPost.source}</span>
                     <div className="flex gap-4">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"><FaFacebookF size={20}/></button>
                        <button className="text-gray-400 hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"><FaTwitter size={20}/></button>
                        <button className="text-gray-400 hover:text-green-500 transition-colors p-2 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg"><FaWhatsapp size={20}/></button>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Blogs;
