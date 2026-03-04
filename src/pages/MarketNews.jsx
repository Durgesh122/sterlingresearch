import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Helmet } from 'react-helmet-async'; 
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaUser, 
  FaCalendarAlt, 
  FaTag, 
  FaChevronRight, 
  FaRegClock,
  FaShareAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaArrowRight,
  FaLeaf,
  FaFire,
  FaChartLine,
  FaNewspaper,
  FaEnvelope,
  FaLock,
  FaSpinner,
  FaList,
  FaThLarge,
  FaBolt,
  FaChartBar,
  FaEye,
  FaRedoAlt,
  FaTimes
} from 'react-icons/fa';
import RevealOnScroll from "../components/common/RevealOnScroll";

// ==========================================
// CONFIGURATION & CONSTANTS
// ==========================================

const API_KEY = "a75cd5c17277b76a94b3a426f7966eaf";
const BASE_URL = "https://api.mediastack.com/v1/news";

const CATEGORIES = [
  { name: "business", label: "Business" },
  { name: "technology", label: "Tech" },
  { name: "general", label: "General" },
  { name: "science", label: "Science" },
  { name: "health", label: "Health" },
  { name: "sports", label: "Sports" },
  { name: "entertainment", label: "Entertainment" }
];

const POPULAR_TAGS = [
  "StockMarket", "Nifty50", "Sensex", "BankNifty", "IPO", "Crypto", "Economy", "Forex", "Gold", "Oil", "Results", "RBI"
];

const MOCK_MARKET_INDICES = [
  { name: "NIFTY 50", value: "24,852.15", change: "+125.30", percent: "+0.51%", isUp: true },
  { name: "SENSEX", value: "81,345.60", change: "+350.25", percent: "+0.43%", isUp: true },
  { name: "BANK NIFTY", value: "52,100.40", change: "-85.10", percent: "-0.16%", isUp: false },
  { name: "USD/INR", value: "83.45", change: "+0.05", percent: "+0.06%", isUp: true },
];

const MOCK_NEWS = [
  {
    title: "Sensex, Nifty hit fresh record highs on global cues",
    description: "Indian equity benchmarks Sensex and Nifty 50 settled at fresh record closing highs on Friday, tracking gains in global peers.",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Sterling Bureau",
    category: "business",
    url: "#"
  },
  {
    title: "RBI keeps repo rate unchanged at 6.5% for eighth consecutive time",
    description: "The Reserve Bank of India's Monetary Policy Committee (MPC) decided to keep the policy repo rate unchanged at 6.5 per cent.",
    image: "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Sterling Bureau",
    category: "economy",
    url: "#"
  },
  {
    title: "Tech giants rally as AI adoption accelerates across industries",
    description: "Major technology stocks saw significant gains today as new reports indicate faster-than-expected adoption of artificial intelligence solutions.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Tech Daily",
    category: "technology",
    url: "#"
  },
  {
    title: "Gold prices surge amidst geopolitical tensions",
    description: "Safe-haven demand has pushed gold prices to a near-term high as investors react to ongoing geopolitical uncertainties.",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Commodity Watch",
    category: "business",
    url: "#"
  },
  {
    title: "Green energy sector sees record investment in Q3",
    description: "Renewable energy companies are reporting record inflows of capital as governments worldwide push for faster decarbonization.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1000",
    published_at: new Date().toISOString(),
    source: "Green Future",
    category: "business",
    url: "#"
  }
];

// ==========================================
// HELPER COMPONENTS
// ==========================================

const NewsTicker = ({ posts }) => {
  return (
    <div className="bg-blue-900 dark:bg-gray-800 text-white py-2 overflow-hidden relative flex items-center border-b border-blue-800 dark:border-gray-700">
      <div className="bg-blue-600 dark:bg-blue-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider ml-2 rounded-sm z-10 shadow-lg flex items-center gap-1">
        <FaBolt className="text-yellow-300" /> Breaking
      </div>
      <div className="whitespace-nowrap animate-marquee flex items-center gap-8 px-4">
        {posts.slice(0, 10).map((post, idx) => (
          <span key={idx} className="text-xs font-medium flex items-center gap-2 text-blue-50/90 dark:text-gray-300 hover:text-white cursor-pointer transition-colors">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
            {post.title}
          </span>
        ))}
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

const SkeletonCard = ({ viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-100 dark:border-gray-700 shadow-sm flex gap-4 animate-pulse">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm animate-pulse">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 w-full"></div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mt-2"></div>
      </div>
    </div>
  );
};

const MarketSentimentWidget = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
        <FaChartBar className="text-blue-600 dark:text-blue-400" /> Market Sentiment
      </h4>
      <div className="relative pt-4 pb-2">
        <div className="h-3 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full w-full"></div>
        <div className="absolute top-2 left-[65%] transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-gray-900 dark:border-t-gray-100"></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-wide">
          <span>Bearish</span>
          <span>Neutral</span>
          <span className="text-green-600 dark:text-green-400">Bullish</span>
        </div>
      </div>
      <p className="text-xs text-center text-gray-600 dark:text-gray-300 mt-2 font-medium">
        Market sentiment is currently <span className="text-green-600 dark:text-green-400 font-bold">Bullish</span> driven by positive global cues.
      </p>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const MarketNews = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Refs for scrolling
  const topRef = useRef(null);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Fetch News Function
  const fetchNews = async (isBackgroundRefresh = false) => {
    if (!isBackgroundRefresh) setLoading(true);
    setError(null);
    
    try {
      let url = `${BASE_URL}?access_key=${API_KEY}&languages=en&limit=${activeCategory === 'all' ? 100 : 20}`;
      
      if (activeCategory !== 'all') {
        url += `&categories=${activeCategory}`;
      }

      const response = await fetch(url);
      
      // Handle Rate Limiting (429) or other server errors
      if (response.status === 429 || !response.ok) {
        console.warn(`API Error ${response.status}: Switching to mock data.`);
        setPosts(MOCK_NEWS);
        setError("Live updates unavailable (High Traffic). Showing latest highlights.");
        setLastUpdated(new Date());
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.data) {
        // Filter out posts without images or titles to improve UI quality
        const validPosts = data.data.filter(post => post.title && post.description);
        setPosts(validPosts.length > 0 ? validPosts : MOCK_NEWS);
        setLastUpdated(new Date());
      } else {
         if (data.error) {
           console.error("API Error:", data.error);
           // Fallback to mock data on API error
           setPosts(MOCK_NEWS);
           if (data.error.code === 'usage_limit_reached') {
             setError("Daily news limit reached. Showing highlights.");
           } else {
             setError("Unable to fetch live news. Showing highlights.");
           }
         } else {
           setPosts(MOCK_NEWS);
         }
      }
    } catch (err) {
      console.error("Failed to fetch news:", err);
      // Fallback to mock data on network error
      setPosts(MOCK_NEWS);
      if (!isBackgroundRefresh) setError("Network issue. Showing offline news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    // Auto-refresh every hour
    const intervalId = setInterval(() => fetchNews(true), 3600000);
    return () => clearInterval(intervalId);
  }, [activeCategory]);

  // Filter Logic
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  // Pagination Logic
  const postsPerPage = viewMode === 'list' ? 10 : 9;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper: Format Date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 pt-16 transition-colors duration-300">
      
      {/* News Ticker */}
      {!loading && posts.length > 0 && <NewsTicker posts={posts} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" ref={topRef}>
        
        {/* Header Section - Modernized */}
        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 border-b border-gray-200 dark:border-gray-700 pb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                Market<span className="text-blue-600 dark:text-blue-400">News</span>
                <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold animate-pulse transform translate-y-[-4px]">Live</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                Stay updated with the latest market trends, insights, and financial news.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64 group">
                <input 
                  type="text" 
                  placeholder="Search headlines..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors text-xs" />
              </div>
              
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
                  title="Grid View"
                >
                  <FaThLarge className="text-sm" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
                  title="List View"
                >
                  <FaList className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Market Indices Strip (Mock) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {MOCK_MARKET_INDICES.map((index, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-24"
            >
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{index.name}</span>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white">{index.value}</span>
                <span className={`text-xs font-bold flex items-center gap-1 ${index.isUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {index.isUp ? <FaChartLine /> : <FaChartLine className="transform rotate-180" />}
                  {index.change} ({index.percent})
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Categories & Filters */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-24">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 font-bold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FaTag className="text-blue-500" /> Categories
              </div>
              <div className="p-3 space-y-1">
                <button 
                  onClick={() => {setActiveCategory('all'); setCurrentPage(1);}}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === 'all' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                >
                  All News 
                  {activeCategory === 'all' && <FaChevronRight className="text-xs" />}
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.name}
                    onClick={() => {setActiveCategory(cat.name); setCurrentPage(1);}}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${activeCategory === cat.name ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    {cat.label}
                    {activeCategory === cat.name && <FaChevronRight className="text-xs" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 font-bold text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FaFire className="text-orange-500" /> Trending Tags
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                {POPULAR_TAGS.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6">
            
            {/* Featured Post */}
            {activeCategory === 'all' && !searchTerm && currentPage === 1 && posts.length > 0 && !loading && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group relative"
              >
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10"></div>
                  <img 
                    src={posts[0].image || "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=1200&q=80"} 
                    alt={posts[0].title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=1200&q=80"}}
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wide">
                      Top Story
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <div className="flex items-center gap-3 text-xs text-gray-300 font-medium mb-3">
                      <span className="text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded uppercase tracking-wider border border-blue-500/30">{posts[0].category}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span>{formatDate(posts[0].published_at)}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors">
                      {posts[0].title}
                    </h2>
                    <p className="text-sm text-gray-300 line-clamp-2 max-w-2xl mb-4 hidden sm:block">
                      {posts[0].description}
                    </p>
                    <a 
                      href={posts[0].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition-colors shadow-lg"
                    >
                      Read Article <FaArrowRight className="text-xs" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* News Grid/List */}
            {loading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} viewMode={viewMode} />)}
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm">
                <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 dark:text-red-400">
                  <FaBolt className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
                <button 
                  onClick={() => fetchNews()}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto shadow-md"
                >
                  <FaRedoAlt /> Try Again
                </button>
              </div>
            ) : currentPosts.length > 0 ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}
              >
                <AnimatePresence mode='wait'>
                  {currentPosts.map((post, index) => (
                    <motion.div 
                      key={`${post.title}-${index}`}
                      variants={itemVariants}
                      layout
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group ${viewMode === 'list' ? 'flex flex-row min-h-[140px]' : 'flex flex-col h-full'}`}
                    >
                      {/* Image Section */}
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/3 sm:w-48 h-auto flex-shrink-0' : 'h-48 w-full'}`}>
                        <img 
                          src={post.image || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"} 
                          alt={post.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80"}}
                        />
                        {viewMode === 'grid' && (
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-gray-200 dark:border-gray-700 uppercase tracking-wide">
                              {post.category}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className={`flex flex-col justify-between ${viewMode === 'list' ? 'p-4 w-full' : 'p-5 flex-1'}`}>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-600 flex items-center gap-1.5 uppercase tracking-wide">
                              <FaRegClock className="text-blue-500" /> {formatDate(post.published_at)}
                            </span>
                            {viewMode === 'list' && (
                              <span className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-bold uppercase">
                                {post.category}
                              </span>
                            )}
                          </div>
                          
                          <h3 className={`font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 ${viewMode === 'list' ? 'text-sm mb-2' : 'text-base mb-3'}`}>
                            <a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
                          </h3>
                          
                          {viewMode === 'grid' && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 leading-relaxed">
                              {post.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50 dark:border-gray-700/50">
                          <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium truncate max-w-[120px] flex items-center gap-1">
                             <FaNewspaper className="text-gray-300 dark:text-gray-600" /> {post.source}
                          </span>
                          <div className="flex items-center gap-3">
                            <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="Share article">
                              <FaShareAlt className="text-sm" />
                            </button>
                            <a 
                              href={post.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                            >
                              Read More
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FaSearch className="text-xl text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-base font-bold text-gray-600 dark:text-gray-300">No news found</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button 
                  onClick={() => {setSearchTerm(''); setActiveCategory('all');}}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredPosts.length > postsPerPage && (
              <div className="flex justify-center mt-12 gap-2">
                <button 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                >
                  &lt;
                </button>
                
                <span className="flex items-center px-4 text-xs font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                  Page {currentPage} of {totalPages}
                </span>

                <button 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Market Sentiment */}
            <MarketSentimentWidget />

             {/* Newsletter (Compact) */}
             <div className="bg-blue-900 dark:bg-blue-950 p-6 rounded-xl shadow-lg text-white relative overflow-hidden ring-1 ring-blue-800">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-2xl"></div>
              
              <h4 className="text-base font-bold mb-2 flex items-center gap-2 relative z-10">
                <FaEnvelope className="text-blue-400" /> Market Insights
              </h4>
              <p className="text-xs text-blue-100 mb-4 relative z-10 leading-relaxed opacity-90">
                Get daily market analysis and stock picks delivered straight to your inbox.
              </p>
              <form className="space-y-3 relative z-10" onSubmit={(e) => { e.preventDefault(); navigate('/contact-us'); }}>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-3 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs placeholder-blue-200/50 focus:bg-white/20 focus:border-blue-400 outline-none transition-all"
                />
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 rounded-lg shadow-md transition-colors uppercase tracking-wide">
                  Subscribe Now
                </button>
              </form>
            </div>

            {/* Most Read (Mock) */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                <FaFire className="text-orange-500" /> Most Read
              </h4>
              <div className="space-y-5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer items-start">
                    <span className="text-2xl font-black text-gray-200 dark:text-gray-700 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors leading-none mt-1">0{i}</span>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-1.5 leading-snug">
                        Sensex crosses 80,000 mark for the first time in history amidst global rally
                      </h5>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">2 hours ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Connect With Us</h4>
              <div className="flex justify-between gap-2">
                <a href="#" className="w-10 h-10 rounded-lg bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1"><FaFacebookF className="text-sm" /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/10 text-gray-800 dark:text-white flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all transform hover:-translate-y-1"><FaTwitter className="text-sm" /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all transform hover:-translate-y-1"><FaLinkedinIn className="text-sm" /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all transform hover:-translate-y-1"><FaWhatsapp className="text-sm" /></a>
              </div>
            </div>

          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-[11px] text-gray-400 dark:text-gray-500 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-gray-500 dark:text-gray-400">Disclaimer:</strong> Sterling Research is a SEBI Registered Research Analyst. The news and information provided here is for educational purposes only. 
            Market data is delayed by at least 15 minutes. Please consult your financial advisor before making any investment decisions based on this information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarketNews;
