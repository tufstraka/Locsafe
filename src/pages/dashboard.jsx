
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoMdTrendingUp, IoMdTrendingDown } from 'react-icons/io';
import { FaTruck, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaQrcode, FaHistory, FaChevronRight, FaLightbulb, FaStar, FaExpand, FaCompress } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiCube, HiDocumentText, HiTrendingUp, HiChip } from 'react-icons/hi';
import { BsPersonFill, BsPeopleFill, BsGraphUp } from 'react-icons/bs';
import { GiCargoShip } from 'react-icons/gi';
import { MdAutoGraph, MdWarning } from 'react-icons/md';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Map from '../components/map.jsx';
import Sidebar from '../components/sidebar.jsx';
import { useNavigation } from '../contexts/navigationContext';
import ShipmentsContainer from '../components/shipments-container';
import BlockchainLedgerSummary from '../components/blockchainledger.jsx';
import { Line, Doughnut, Bar, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

import PropTypes from 'prop-types';

// Material Design Card Component
const MaterialCard = ({ children, elevation = 2, className = '', onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`bg-surface-light dark:bg-surface-elevated-dark rounded-xl ${className} ${
        elevation === 1 ? 'shadow-elevation-1 dark:shadow-elevation-dark-1' :
        elevation === 2 ? 'shadow-elevation-2 dark:shadow-elevation-dark-2' :
        elevation === 3 ? 'shadow-elevation-3 dark:shadow-elevation-dark-3' :
        elevation === 4 ? 'shadow-elevation-4 dark:shadow-elevation-dark-4' :
        'shadow-elevation-5 dark:shadow-elevation-dark-5'
      } ${onClick ? 'cursor-pointer ripple' : ''}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

MaterialCard.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const stepValue = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += stepValue;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string,
  prefix: PropTypes.string
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const { showNav, toggleNav } = useNavigation();
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Enhanced Chart Data
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Shipments',
        data: [65, 78, 90, 82, 95, 89, 102],
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Deliveries',
        data: [45, 52, 68, 75, 88, 79, 95],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Returns',
        data: [5, 8, 12, 9, 7, 10, 8],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const doughnutData = {
    labels: ['In Transit', 'Delivered', 'Pending', 'Delayed'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          'rgba(20, 184, 166, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  // Team Performance Radar Chart
  const radarData = {
    labels: ['Efficiency', 'Speed', 'Accuracy', 'Communication', 'Safety', 'Innovation'],
    datasets: [
      {
        label: 'Current Performance',
        data: [85, 92, 88, 78, 95, 72],
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        borderColor: 'rgb(20, 184, 166)',
        pointBackgroundColor: 'rgb(20, 184, 166)',
      },
      {
        label: 'Target',
        data: [90, 90, 90, 85, 95, 80],
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
      }
    ]
  };

  // Supply Chain Flow Bar Chart
  const barChartData = {
    labels: ['Sourcing', 'Manufacturing', 'Warehousing', 'Distribution', 'Delivery', 'Returns'],
    datasets: [
      {
        label: 'Efficiency %',
        data: [88, 92, 85, 90, 94, 78],
        backgroundColor: 'rgba(20, 184, 166, 0.8)',
      },
      {
        label: 'Cost Optimization %',
        data: [75, 82, 88, 85, 80, 65],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        }
      }
    }
  };

  const stats = [
    {
      title: 'Total Customers',
      value: 380200,
      change: 12.5,
      trend: 'up',
      icon: BsPersonFill,
      gradient: 'from-blue-500 to-cyan-500',
      suffix: '',
      description: '3,467 joined this month'
    },
    {
      title: 'Active Transporters',
      value: 15600,
      change: 8.2,
      trend: 'up',
      icon: BsPeopleFill,
      gradient: 'from-teal-500 to-green-500',
      suffix: '',
      description: '892 verified today'
    },
    {
      title: 'Total Shipments',
      value: 348900,
      change: -2.4,
      trend: 'down',
      icon: GiCargoShip,
      gradient: 'from-purple-500 to-pink-500',
      suffix: '',
      description: '1,234 in transit'
    },
    {
      title: 'Success Rate',
      value: 98.7,
      change: 0.5,
      trend: 'up',
      icon: BsGraphUp,
      gradient: 'from-orange-500 to-red-500',
      suffix: '%',
      description: 'Above industry average'
    }
  ];

  // AI Insights Data
  const aiInsights = [
    {
      id: 1,
      type: 'optimization',
      title: 'Route Optimization Opportunity',
      description: 'AI detected potential 23% reduction in delivery time for Eastern routes',
      impact: 'High',
      icon: MdAutoGraph,
      color: 'text-green-500',
      action: 'Apply Optimization'
    },
    {
      id: 2,
      type: 'prediction',
      title: 'Demand Surge Predicted',
      description: 'Expected 45% increase in orders for next week based on historical patterns',
      impact: 'Medium',
      icon: HiTrendingUp,
      color: 'text-blue-500',
      action: 'Prepare Resources'
    },
    {
      id: 3,
      type: 'anomaly',
      title: 'Unusual Pattern Detected',
      description: 'Abnormal delay patterns in Northern corridor require investigation',
      impact: 'High',
      icon: MdWarning,
      color: 'text-yellow-500',
      action: 'Investigate'
    },
    {
      id: 4,
      type: 'recommendation',
      title: 'Cost Saving Opportunity',
      description: 'Consolidating shipments could save $12,450 this month',
      impact: 'Medium',
      icon: FaLightbulb,
      color: 'text-purple-500',
      action: 'Review Details'
    }
  ];

  // Team Performance Data
  const teamMembers = [
    { name: 'John Kamau', role: 'Driver', rating: 4.8, deliveries: 234, onTime: 98, avatar: 'JK' },
    { name: 'Sarah Wanjiru', role: 'Dispatcher', rating: 4.9, tasks: 456, efficiency: 95, avatar: 'SW' },
    { name: 'Peter Ochieng', role: 'Driver', rating: 4.7, deliveries: 198, onTime: 96, avatar: 'PO' },
    { name: 'Mary Njeri', role: 'Coordinator', rating: 4.9, tasks: 324, efficiency: 97, avatar: 'MN' },
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Delay in Shipment #KE2025-789',
      description: 'Expected delay of 2 hours due to traffic',
      time: '5 mins ago',
      icon: FaExclamationTriangle,
      color: 'text-yellow-500'
    },
    {
      id: 2,
      type: 'success',
      title: 'Delivery Completed #KE2025-788',
      description: 'Successfully delivered to Nairobi warehouse',
      time: '1 hour ago',
      icon: FaCheckCircle,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Route Optimization Available',
      description: 'AI suggests 15% faster route for recurring shipments',
      time: '3 hours ago',
      icon: FaInfoCircle,
      color: 'text-blue-500'
    },
    {
      id: 4,
      type: 'error',
      title: 'Temperature Excursion Alert',
      description: 'Cold chain breach detected in unit #CC-456',
      time: '5 hours ago',
      icon: FaExclamationTriangle,
      color: 'text-red-500'
    }
  ];

  const notifications = [
    { id: 1, text: 'New shipment request from Mombasa', time: '2 mins ago', unread: true },
    { id: 2, text: 'Driver John completed delivery', time: '15 mins ago', unread: true },
    { id: 3, text: 'System maintenance scheduled', time: '1 hour ago', unread: false },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className='flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden'>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Sidebar */}
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:relative z-40 h-full"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {showNav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleNav}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <div className='flex flex-col flex-grow'>
        {/* Enhanced Material Design Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className='flex items-center justify-between px-6 py-4 bg-surface-light/95 dark:bg-surface-elevated-dark/95 backdrop-blur-xl shadow-elevation-1 dark:shadow-elevation-dark-1 sticky top-0 z-20'
        >
          <div className='flex items-center gap-4'>
            <motion.button 
              onClick={toggleNav}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200 ripple'
              aria-label='Toggle navigation'
            >
              <span className="material-icons text-2xl text-on-surface-light dark:text-on-surface-dark">
                {showNav ? 'close' : 'menu'}
              </span>
            </motion.button>

            {/* Search Bar with Material Design */}
            <div className='hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full'>
              <span className="material-icons text-gray-400">search</span>
              <input
                type='text'
                placeholder='Search shipments, customers...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-transparent outline-none text-sm w-64 text-gray-700 dark:text-gray-300'
              />
              <kbd className='px-2 py-0.5 text-xs bg-white dark:bg-gray-700 rounded-md caption'>⌘K</kbd>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            {/* Period Selector with Material Design */}
            <div className='hidden lg:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-full'>
              {['Today', 'Week', 'Month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period.toLowerCase())}
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-200 ${
                    selectedPeriod === period.toLowerCase()
                      ? 'bg-primary-500 text-white shadow-elevation-2'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Notifications with Material Badge */}
            <div className='relative'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className='relative p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all ripple'
                aria-label='Notifications'
              >
                <span className="material-icons-outlined text-2xl">notifications</span>
                <span className='absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full animate-pulse'></span>
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className='absolute right-0 mt-2 w-80 bg-surface-light dark:bg-surface-elevated-dark rounded-xl shadow-elevation-4 dark:shadow-elevation-dark-4 overflow-hidden'
                  >
                    <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                      <h3 className='headline-6 text-on-surface-light dark:text-on-surface-dark'>Notifications</h3>
                    </div>
                    <div className='max-h-96 overflow-y-auto'>
                      {notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer ${
                            notif.unread ? 'bg-primary-50/50 dark:bg-primary-900/20' : ''
                          }`}
                        >
                          <p className='body-2 text-on-surface-light dark:text-on-surface-dark'>{notif.text}</p>
                          <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1'>{notif.time}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className='p-3 text-center border-t border-gray-200 dark:border-gray-700'>
                      <button className='button-text text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'>
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown with Material Design */}
            <div className='relative'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className='flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all ripple'
              >
                <div className='text-right hidden md:block'>
                  <p className='subtitle-2 text-on-surface-light dark:text-on-surface-dark'>
                    {user ? user.displayName || 'Admin User' : 'Guest'}
                  </p>
                  <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>
                    {user ? user.email : 'Not logged in'}
                  </p>
                </div>
                <img
                  className='w-10 h-10 rounded-full border-2 border-primary-500'
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email || 'Guest'}&background=2196F3&color=fff`}
                  alt='Profile'
                />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className='absolute right-0 mt-2 w-64 bg-surface-light dark:bg-surface-elevated-dark rounded-xl shadow-elevation-4 dark:shadow-elevation-dark-4 overflow-hidden'
                  >
                    <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
                      <div className='flex items-center gap-3'>
                        <img
                          className='w-12 h-12 rounded-full'
                          src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email || 'Guest'}&background=2196F3&color=fff`}
                          alt='Profile'
                        />
                        <div>
                          <p className='subtitle-1 text-on-surface-light dark:text-on-surface-dark'>
                            {user ? user.displayName || 'Admin' : 'Guest'}
                          </p>
                          <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>
                            {user ? user.email : 'Not logged in'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='p-2'>
                      <button className='w-full flex items-center gap-3 px-3 py-2 text-left body-2 text-on-surface-light dark:text-on-surface-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'>
                        <span className="material-icons text-xl">account_circle</span>
                        Profile Settings
                      </button>
                      <button className='w-full flex items-center gap-3 px-3 py-2 text-left body-2 text-on-surface-light dark:text-on-surface-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'>
                        <span className="material-icons text-xl">settings</span>
                        Preferences
                      </button>
                      <hr className='my-2 border-gray-200 dark:border-gray-700' />
                      <button className='w-full flex items-center gap-3 px-3 py-2 text-left body-2 text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20 rounded-lg transition-colors'>
                        <span className="material-icons text-xl">logout</span>
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>

        {/* Main Content with Material Design Grid */}
        <div className='flex-grow overflow-y-auto'>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='p-6 space-y-6'
          >
            {/* Welcome Section with Material Typography */}
            <motion.div variants={itemVariants} className='flex justify-between items-center'>
              <div>
                <h1 className='headline-4 text-on-surface-light dark:text-on-surface-dark'>
                  Welcome back, {user ? user.displayName || 'Admin' : 'Guest'} 👋
                </h1>
                <p className='body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1'>
                  Here&apos;s what&apos;s happening with your supply chain today
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dpp-generator')}
                className='hidden lg:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-full font-medium shadow-elevation-3 hover:shadow-elevation-4 transition-all md-button'
              >
                <FaQrcode />
                <span className="button-text">Generate DPP</span>
              </motion.button>
            </motion.div>

            {/* Key Metrics Cards with Material Design */}
            <motion.div 
              variants={itemVariants}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
            >
              {stats.map((stat, index) => (
                <MaterialCard key={index} elevation={2} className="p-6">
                  <div className='flex items-start justify-between mb-4'>
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-elevation-2`}>
                      <stat.icon className='text-white text-xl' />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                      stat.trend === 'up' 
                        ? 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400' 
                        : 'bg-error-100 dark:bg-error-900/30 text-error-600 dark:text-error-400'
                    }`}>
                      {stat.trend === 'up' ? <IoMdTrendingUp /> : <IoMdTrendingDown />}
                      {Math.abs(stat.change)}%
                    </div>
                  </div>
                  
                  <h3 className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium mb-1'>
                    {stat.title}
                  </h3>
                  <p className='headline-5 text-on-surface-light dark:text-on-surface-dark'>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium mt-2'>
                    {stat.description}
                  </p>
                </MaterialCard>
              ))}
            </motion.div>

            {/* AI Insights Section - New Comprehensive Section */}
            <motion.div variants={itemVariants}>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='headline-5 text-on-surface-light dark:text-on-surface-dark flex items-center gap-2'>
                  <HiChip className='text-primary-500' />
                  AI Insights & Predictions
                </h2>
                <button className='button-text text-primary-600 dark:text-primary-400'>
                  View All
                </button>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
                {aiInsights.map((insight) => (
                  <MaterialCard key={insight.id} elevation={2} className='p-4'>
                    <div className='flex items-start gap-3'>
                      <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${insight.color}`}>
                        <insight.icon className='text-xl' />
                      </div>
                      <div className='flex-1'>
                        <span className={`caption px-2 py-1 rounded-full text-xs ${
                          insight.impact === 'High' ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400' :
                          insight.impact === 'Medium' ? 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400' :
                          'bg-info-100 text-info-700 dark:bg-info-900/30 dark:text-info-400'
                        }`}>
                          {insight.impact} Impact
                        </span>
                        <h3 className='subtitle-2 text-on-surface-light dark:text-on-surface-dark mt-2'>
                          {insight.title}
                        </h3>
                        <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1'>
                          {insight.description}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className='mt-3 px-3 py-1 bg-primary-500 text-white rounded-full text-xs font-medium hover:bg-primary-600 transition-colors'
                        >
                          {insight.action}
                        </motion.button>
                      </div>
                    </div>
                  </MaterialCard>
                ))}
              </div>
            </motion.div>

            {/* Charts Section with Supply Chain Flow */}
            <motion.div variants={itemVariants} className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              {/* Performance Chart */}
              <MaterialCard elevation={2} className='lg:col-span-2 p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <div>
                    <h2 className='headline-6 text-on-surface-light dark:text-on-surface-dark'>Performance Overview</h2>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Weekly shipment trends</p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 bg-teal-500 rounded-full'></div>
                      <span className='caption'>Shipments</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                      <span className='caption'>Deliveries</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                      <span className='caption'>Returns</span>
                    </div>
                  </div>
                </div>
                <div className='h-64'>
                  <Line data={lineChartData} options={chartOptions} />
                </div>
              </MaterialCard>

              {/* Status Distribution */}
              <MaterialCard elevation={2} className='p-6'>
                <h2 className='headline-6 text-on-surface-light dark:text-on-surface-dark mb-6'>Shipment Status</h2>
                <div className='h-48'>
                  <Doughnut data={doughnutData} />
                </div>
                <div className='grid grid-cols-2 gap-2 mt-4'>
                  {['In Transit', 'Delivered', 'Pending', 'Delayed'].map((label, index) => (
                    <div key={index} className='flex items-center gap-2'>
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-teal-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-purple-500' : 'bg-red-500'
                      }`}></div>
                      <span className='caption'>{label}</span>
                    </div>
                  ))}
                </div>
              </MaterialCard>
            </motion.div>

            {/* Team Performance Section - New Comprehensive Section */}
            <motion.div variants={itemVariants} className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Team Performance Radar */}
              <MaterialCard elevation={2} className='p-6'>
                <h2 className='headline-6 text-on-surface-light dark:text-on-surface-dark mb-4'>
                  Team Performance Metrics
                </h2>
                <div className='h-64'>
                  <Radar data={radarData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: true } } }} />
                </div>
              </MaterialCard>

              {/* Top Performers */}
              <MaterialCard elevation={2} className='p-6'>
                <h2 className='headline-6 text-on-surface-light dark:text-on-surface-dark mb-4'>
                  Top Performers
                </h2>
                <div className='space-y-3'>
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className='flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold'>
                          {member.avatar}
                        </div>
                        <div>
                          <p className='subtitle-2 text-on-surface-light dark:text-on-surface-dark'>{member.name}</p>
                          <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>{member.role}</p>
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='flex items-center gap-1'>
                          <FaStar className='text-yellow-500 text-sm' />
                          <span className='subtitle-2'>{member.rating}</span>
                        </div>
                        <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>
                          {member.deliveries ? `${member.deliveries} deliveries` : `${member.tasks} tasks`}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </MaterialCard>
            </motion.div>

            {/* Supply Chain Flow Section - New Comprehensive Section */}
            <motion.div variants={itemVariants}>
              <MaterialCard elevation={2} className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='headline-6 text-on-surface-light dark:text-on-surface-dark'>
                    Supply Chain Flow Analysis
                  </h2>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 bg-teal-500 rounded-full'></div>
                      <span className='caption'>Efficiency</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                      <span className='caption'>Cost Optimization</span>
                    </div>
                  </div>
                </div>
                <div className='h-64'>
                  <Bar data={barChartData} options={chartOptions} />
                </div>
                <div className='grid grid-cols-6 gap-4 mt-6 text-center'>
                  {['Sourcing', 'Manufacturing', 'Warehousing', 'Distribution', 'Delivery', 'Returns'].map((stage, index) => (
                    <div key={index}>
                      <div className='relative'>
                        <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                          <div
                            className='bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full'
                            style={{ width: `${barChartData.datasets[0].data[index]}%` }}
                          />
                        </div>
                        <p className='caption mt-2'>{stage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </MaterialCard>
            </motion.div>

            {/* Quick Actions & Recent Alerts */}
            <motion.div variants={itemVariants} className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Quick Actions */}
              <MaterialCard elevation={2} className='p-6'>
                <h2 className='headline-6 text-on-surface-light dark:text-on-surface-dark mb-4'>Quick Actions</h2>
                <div className='grid grid-cols-2 gap-3'>
                  {[
                    { icon: FaTruck, label: 'New Shipment', color: 'from-teal-500 to-green-500' },
                    { icon: FaQrcode, label: 'Scan QR', color: 'from-blue-500 to-cyan-500' },
                    { icon: HiDocumentText, label: 'Reports', color: 'from-purple-500 to-pink-500' },
                    { icon: FaHistory, label: 'Track History', color: 'from-orange-500 to-red-500' }
                  ].map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-elevation-2 transition-all ripple'
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center shadow-elevation-1`}>
                        <action.icon className='text-white text-lg' />
                      </div>
                      <span className='subtitle-2 text-on-surface-light dark:text-on-surface-dark'>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </MaterialCard>

              {/* Recent Alerts with Priority */}
              <MaterialCard elevation={2} className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='headline-6 text-on-surface-light dark:text-on-surface-dark'>Recent Alerts</h2>
                  <button className='button-text text-primary-600 dark:text-primary-400'>
                    View all
                  </button>
                </div>
                <div className='space-y-3'>
                  {recentAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      whileHover={{ x: 5 }}
                      className='flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all cursor-pointer'
                    >
                      <div className={`mt-1 ${alert.color}`}>
                        <alert.icon className='w-5 h-5' />
                      </div>
                      <div className='flex-1'>
                        <p className='subtitle-2 text-on-surface-light dark:text-on-surface-dark'>{alert.title}</p>
                        <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1'>{alert.description}</p>
                        <p className='caption text-on-surface-light-disabled dark:text-on-surface-dark-disabled mt-2'>{alert.time}</p>
                      </div>
                      <FaChevronRight className='text-gray-400' />
                    </motion.div>
                  ))}
                </div>
              </MaterialCard>
            </motion.div>

            {/* Digital Product Passport Section */}
            <motion.div variants={itemVariants}>
              <MaterialCard elevation={3} className='bg-gradient-to-r from-purple-500 to-teal-500 p-8 text-white'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-4'>
                      <HiSparkles className='text-2xl' />
                      <h2 className='headline-5'>Digital Product Passports</h2>
                    </div>
                    <p className='body-1 text-white/90 mb-6'>
                      Create blockchain-verified digital passports for your products with complete lifecycle tracking
                    </p>
                    <div className='grid grid-cols-3 gap-4'>
                      <div>
                        <p className='headline-4'>1M+</p>
                        <p className='caption text-white/80'>Passports Issued</p>
                      </div>
                      <div>
                        <p className='headline-4'>100%</p>
                        <p className='caption text-white/80'>Traceability</p>
                      </div>
                      <div>
                        <p className='headline-4'>0.1s</p>
                        <p className='caption text-white/80'>Verification</p>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/dpp-generator')}
                    className='px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2 md-button'
                  >
                    <FaQrcode className='text-xl' />
                    <span className='button-text'>Create New Passport</span>
                  </motion.button>
                </div>
              </MaterialCard>
            </motion.div>

            {/* Map and Blockchain Ledger */}
            <motion.div variants={itemVariants} className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Map Section with Fullscreen */}
              <MaterialCard elevation={2} className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='headline-6 text-on-surface-light dark:text-on-surface-dark'>Live Tracking</h2>
                  <div className='flex items-center gap-3'>
                    <div className='flex items-center gap-2'>
                      <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                      <span className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Live</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMapFullscreen(true)}
                      className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
                      aria-label='Fullscreen map'
                    >
                      <FaExpand className='text-gray-600 dark:text-gray-400' />
                    </motion.button>
                  </div>
                </div>
                <div className='h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative'>
                  <Map />
                </div>
                <div className='grid grid-cols-4 gap-4 mt-4'>
                  <div className='text-center'>
                    <p className='headline-6 text-on-surface-light dark:text-on-surface-dark'>24</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Active</p>
                  </div>
                  <div className='text-center'>
                    <p className='headline-6 text-on-surface-light dark:text-on-surface-dark'>156</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Today</p>
                  </div>
                  <div className='text-center'>
                    <p className='headline-6 text-on-surface-light dark:text-on-surface-dark'>98%</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>On Time</p>
                  </div>
                  <div className='text-center'>
                    <p className='headline-6 text-on-surface-light dark:text-on-surface-dark'>12</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Delayed</p>
                  </div>
                </div>
              </MaterialCard>

              {/* Blockchain Ledger */}
              <MaterialCard elevation={2} className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='headline-6 text-on-surface-light dark:text-on-surface-dark'>Blockchain Activity</h2>
                  <div className='flex items-center gap-2'>
                    <HiCube className='text-teal-500' />
                    <span className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Verified</span>
                  </div>
                </div>
                <div className='h-80 overflow-hidden'>
                  <BlockchainLedgerSummary />
                </div>
              </MaterialCard>
            </motion.div>

            {/* Shipments Container */}
            <motion.div variants={itemVariants}>
              <ShipmentsContainer />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button with Material Design */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-elevation-4 hover:shadow-elevation-5 flex items-center justify-center text-white z-40'
      >
        <HiLightningBolt className='text-2xl' />
      </motion.button>

      {/* Fullscreen Map Modal */}
      <AnimatePresence>
        {isMapFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4'
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className='relative w-full h-full max-w-7xl bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-elevation-5'
            >
              <div className='absolute top-4 right-4 z-10 flex gap-2'>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMapFullscreen(false)}
                  className='p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-all'
                  aria-label='Exit fullscreen'
                >
                  <FaCompress className='text-gray-700 dark:text-gray-300 text-lg' />
                </motion.button>
              </div>
              
              {/* Map Statistics Bar */}
              <div className='absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4'>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                  <div className='text-center'>
                    <p className='headline-5 text-primary-600 dark:text-primary-400'>24</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Active Vehicles</p>
                  </div>
                  <div className='text-center'>
                    <p className='headline-5 text-success-600 dark:text-success-400'>156</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Deliveries Today</p>
                  </div>
                  <div className='text-center'>
                    <p className='headline-5 text-info-600 dark:text-info-400'>98%</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>On-Time Rate</p>
                  </div>
                  <div className='text-center'>
                    <p className='headline-5 text-warning-600 dark:text-warning-400'>12</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Delayed</p>
                  </div>
                  <div className='text-center'>
                    <p className='headline-5 text-purple-600 dark:text-purple-400'>234km</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Total Distance</p>
                  </div>
                  <div className='text-center'>
                    <p className='headline-5 text-teal-600 dark:text-teal-400'>45min</p>
                    <p className='caption text-on-surface-light-medium dark:text-on-surface-dark-medium'>Avg. Delivery</p>
                  </div>
                </div>
              </div>

              {/* Fullscreen Map */}
              <div className='w-full h-full'>
                <Map />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
