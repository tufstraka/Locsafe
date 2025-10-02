
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { IoIosNotificationsOutline, IoMdTrendingUp, IoMdTrendingDown } from 'react-icons/io';
import { IoMenu, IoClose, IoSettingsSharp, IoLogOutOutline, IoSearch } from 'react-icons/io5';
import { FaUserCircle, FaTruck, FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaQrcode, FaHistory, FaChevronRight } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiCube, HiDocumentText } from 'react-icons/hi';
import { BsPersonFill, BsPeopleFill, BsGraphUp } from 'react-icons/bs';
import { GiCargoShip } from 'react-icons/gi';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Map from '../components/map.jsx';
import Sidebar from '../components/sidebar.jsx';
import { useNavigation } from '../contexts/navigationContext';
import ShipmentsContainer from '../components/shipments-container';
import BlockchainLedgerSummary from '../components/blockchainledger.jsx';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

import PropTypes from 'prop-types';

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
  const { showNav, toggleNav } = useNavigation();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Chart data
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

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Delay in Shipment #KE2024-789',
      description: 'Expected delay of 2 hours due to traffic',
      time: '5 mins ago',
      icon: FaExclamationTriangle,
      color: 'text-yellow-500'
    },
    {
      id: 2,
      type: 'success',
      title: 'Delivery Completed #KE2024-788',
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
    <div className='flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 overflow-hidden'>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500 z-50 origin-left"
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
        {/* Enhanced Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className='flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-20'
        >
          <div className='flex items-center gap-4'>
            <motion.button 
              onClick={toggleNav}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors'
              aria-label='Toggle navigation'
            >
              {showNav ? <IoClose size={24} /> : <IoMenu size={24} />}
            </motion.button>

            {/* Search Bar */}
            <div className='hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg'>
              <IoSearch className='text-slate-400' />
              <input
                type='text'
                placeholder='Search shipments, customers...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='bg-transparent outline-none text-sm w-64 text-slate-700 dark:text-slate-300'
              />
              <kbd className='px-2 py-0.5 text-xs bg-white dark:bg-slate-600 rounded'>⌘K</kbd>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            {/* Period Selector */}
            <div className='hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg'>
              {['Today', 'Week', 'Month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period.toLowerCase())}
                  className={`px-3 py-1 text-sm rounded-md transition-all ${
                    selectedPeriod === period.toLowerCase()
                      ? 'bg-white dark:bg-slate-600 shadow text-teal-600 dark:text-teal-400'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Notifications */}
            <div className='relative'>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                className='relative p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all'
                aria-label='Notifications'
              >
                <IoIosNotificationsOutline className='w-6 h-6' />
                <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse'></span>
              </motion.button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className='absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden'
                  >
                    <div className='p-4 border-b border-slate-200 dark:border-slate-700'>
                      <h3 className='font-semibold text-slate-900 dark:text-white'>Notifications</h3>
                    </div>
                    <div className='max-h-96 overflow-y-auto'>
                      {notifications.map((notif) => (
                        <motion.div
                          key={notif.id}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          className={`p-4 border-b border-slate-100 dark:border-slate-700 cursor-pointer ${
                            notif.unread ? 'bg-teal-50/50 dark:bg-teal-900/20' : ''
                          }`}
                        >
                          <p className='text-sm text-slate-700 dark:text-slate-300'>{notif.text}</p>
                          <p className='text-xs text-slate-500 dark:text-slate-400 mt-1'>{notif.time}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className='p-3 text-center border-t border-slate-200 dark:border-slate-700'>
                      <button className='text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300'>
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className='relative'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className='flex items-center gap-3 px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-all'
              >
                <div className='text-right hidden md:block'>
                  <p className='text-sm font-medium text-slate-900 dark:text-white'>
                    {user ? user.displayName || 'Admin User' : 'Guest'}
                  </p>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>
                    {user ? user.email : 'Not logged in'}
                  </p>
                </div>
                <img
                  className='w-10 h-10 rounded-full border-2 border-teal-500'
                  src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email || 'Guest'}&background=14b8a6&color=fff`}
                  alt='Profile'
                />
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className='absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden'
                  >
                    <div className='p-4 border-b border-slate-200 dark:border-slate-700'>
                      <div className='flex items-center gap-3'>
                        <img
                          className='w-12 h-12 rounded-full'
                          src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.email || 'Guest'}&background=14b8a6&color=fff`}
                          alt='Profile'
                        />
                        <div>
                          <p className='font-medium text-slate-900 dark:text-white'>
                            {user ? user.displayName || 'Admin' : 'Guest'}
                          </p>
                          <p className='text-xs text-slate-500 dark:text-slate-400'>
                            {user ? user.email : 'Not logged in'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='p-2'>
                      <button className='w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors'>
                        <FaUserCircle />
                        Profile Settings
                      </button>
                      <button className='w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors'>
                        <IoSettingsSharp />
                        Preferences
                      </button>
                      <hr className='my-2 border-slate-200 dark:border-slate-700' />
                      <button className='w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors'>
                        <IoLogOutOutline />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className='flex-grow overflow-y-auto'>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className='p-6 space-y-6'
          >
            {/* Welcome Section */}
            <motion.div variants={itemVariants} className='flex justify-between items-center'>
              <div>
                <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>
                  Welcome back, {user ? user.displayName || 'Admin' : 'Guest'} 👋
                </h1>
                <p className='text-slate-600 dark:text-slate-400 mt-1'>
                  Here&apos;s what&apos;s happening with your supply chain today
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='hidden lg:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/25 hover:shadow-xl transition-all'
              >
                <FaQrcode />
                Generate DPP
              </motion.button>
            </motion.div>

            {/* Stats Cards */}
            <motion.div 
              variants={itemVariants}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className='relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all overflow-hidden'
                >
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
                  
                  <div className='relative'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <stat.icon className='text-white text-xl' />
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                        stat.trend === 'up' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                        {stat.trend === 'up' ? <IoMdTrendingUp /> : <IoMdTrendingDown />}
                        {Math.abs(stat.change)}%
                      </div>
                    </div>
                    
                    <h3 className='text-sm font-medium text-slate-600 dark:text-slate-400 mb-1'>
                      {stat.title}
                    </h3>
                    <p className='text-2xl font-bold text-slate-900 dark:text-white'>
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className='text-xs text-slate-500 dark:text-slate-400 mt-2'>
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts Section */}
            <motion.div variants={itemVariants} className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              {/* Line Chart */}
              <div className='lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg'>
                <div className='flex items-center justify-between mb-6'>
                  <div>
                    <h2 className='text-lg font-semibold text-slate-900 dark:text-white'>Performance Overview</h2>
                    <p className='text-sm text-slate-600 dark:text-slate-400'>Weekly shipment trends</p>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 bg-teal-500 rounded-full'></div>
                      <span className='text-sm text-slate-600 dark:text-slate-400'>Shipments</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
                      <span className='text-sm text-slate-600 dark:text-slate-400'>Deliveries</span>
                    </div>
                  </div>
                </div>
                <div className='h-64'>
                  <Line data={lineChartData} options={chartOptions} />
                </div>
              </div>

              {/* Doughnut Chart */}
              <div className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg'>
                <h2 className='text-lg font-semibold text-slate-900 dark:text-white mb-6'>Shipment Status</h2>
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
                      <span className='text-xs text-slate-600 dark:text-slate-400'>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions & Recent Alerts */}
            <motion.div variants={itemVariants} className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Quick Actions */}
              <div className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg'>
                <h2 className='text-lg font-semibold text-slate-900 dark:text-white mb-4'>Quick Actions</h2>
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
                      className='flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all'
                    >
                      <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className='text-white text-lg' />
                      </div>
                      <span className='text-sm font-medium text-slate-700 dark:text-slate-300'>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recent Alerts */}
              <div className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-lg font-semibold text-slate-900 dark:text-white'>Recent Alerts</h2>
                  <button className='text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300'>
                    View all
                  </button>
                </div>
                <div className='space-y-3'>
                  {recentAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      whileHover={{ x: 5 }}
                      className='flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer'
                    >
                      <div className={`mt-1 ${alert.color}`}>
                        <alert.icon className='w-5 h-5' />
                      </div>
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-slate-900 dark:text-white'>{alert.title}</p>
                        <p className='text-xs text-slate-600 dark:text-slate-400 mt-1'>{alert.description}</p>
                        <p className='text-xs text-slate-500 dark:text-slate-500 mt-2'>{alert.time}</p>
                      </div>
                      <FaChevronRight className='text-slate-400' />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Digital Product Passport Section */}
            <motion.div variants={itemVariants} className='bg-gradient-to-r from-purple-500 to-teal-500 rounded-2xl p-8 shadow-xl text-white'>
              <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
                <div className='flex-1'>
                  <div className='flex items-center gap-2 mb-4'>
                    <HiSparkles className='text-2xl' />
                    <h2 className='text-2xl font-bold'>Digital Product Passports</h2>
                  </div>
                  <p className='text-white/90 mb-6'>
                    Create blockchain-verified digital passports for your products with complete lifecycle tracking
                  </p>
                  <div className='grid grid-cols-3 gap-4'>
                    <div>
                      <p className='text-3xl font-bold'>1M+</p>
                      <p className='text-sm text-white/80'>Passports Issued</p>
                    </div>
                    <div>
                      <p className='text-3xl font-bold'>100%</p>
                      <p className='text-sm text-white/80'>Traceability</p>
                    </div>
                    <div>
                      <p className='text-3xl font-bold'>0.1s</p>
                      <p className='text-sm text-white/80'>Verification</p>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-8 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2'
                >
                  <FaQrcode className='text-xl' />
                  Create New Passport
                </motion.button>
              </div>
            </motion.div>

            {/* Map and Blockchain Ledger */}
            <motion.div variants={itemVariants} className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {/* Map Section */}
              <div className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-lg font-semibold text-slate-900 dark:text-white'>Live Tracking</h2>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                    <span className='text-sm text-slate-600 dark:text-slate-400'>Live</span>
                  </div>
                </div>
                <div className='h-64 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden'>
                  <Map />
                </div>
                <div className='grid grid-cols-4 gap-4 mt-4'>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-slate-900 dark:text-white'>24</p>
                    <p className='text-xs text-slate-600 dark:text-slate-400'>Active</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-slate-900 dark:text-white'>156</p>
                    <p className='text-xs text-slate-600 dark:text-slate-400'>Today</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-slate-900 dark:text-white'>98%</p>
                    <p className='text-xs text-slate-600 dark:text-slate-400'>On Time</p>
                  </div>
                  <div className='text-center'>
                    <p className='text-2xl font-bold text-slate-900 dark:text-white'>12</p>
                    <p className='text-xs text-slate-600 dark:text-slate-400'>Delayed</p>
                  </div>
                </div>
              </div>

              {/* Blockchain Ledger */}
              <div className='bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg'>
                <div className='flex items-center justify-between mb-4'>
                  <h2 className='text-lg font-semibold text-slate-900 dark:text-white'>Blockchain Activity</h2>
                  <div className='flex items-center gap-2'>
                    <HiCube className='text-teal-500' />
                    <span className='text-sm text-slate-600 dark:text-slate-400'>Verified</span>
                  </div>
                </div>
                <div className='h-80 overflow-hidden'>
                  <BlockchainLedgerSummary />
                </div>
              </div>
            </motion.div>

            {/* Shipments Container */}
            <motion.div variants={itemVariants}>
              <ShipmentsContainer />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full shadow-xl shadow-teal-500/25 flex items-center justify-center text-white z-50'
      >
        <HiLightningBolt className='text-2xl' />
      </motion.button>

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
