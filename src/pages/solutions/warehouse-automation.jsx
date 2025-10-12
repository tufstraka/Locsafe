
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoSpeedometer } from 'react-icons/io5';
import { FaWarehouse, FaShippingFast, FaBarcode } from 'react-icons/fa';
import { MdInventory, MdAutoGraph, MdPrecisionManufacturing, MdDashboard } from 'react-icons/md';
import { BiPackage, BiTime, BiTrendingUp, BiDollar } from 'react-icons/bi';
import { RiRobotLine, RiDashboard3Line } from 'react-icons/ri';
import { HiOutlineClipboardList, HiOutlineViewGrid } from 'react-icons/hi';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WarehouseAutomation = () => {
  const [activeView, setActiveView] = useState('overview');

  // Warehouse performance data
  const throughputData = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
    datasets: [
      {
        label: 'Orders Processed',
        data: [120, 245, 380, 420, 510, 340],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Target',
        data: [350, 350, 350, 350, 350, 350],
        borderColor: 'rgb(34, 197, 94)',
        borderDash: [5, 5],
        pointRadius: 0,
      }
    ]
  };

  const inventoryUtilization = {
    labels: ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E'],
    datasets: [
      {
        label: 'Current Capacity %',
        data: [85, 72, 91, 68, 78],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Optimal Level %',
        data: [80, 80, 80, 80, 80],
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      }
    ]
  };

  const pickingEfficiency = {
    labels: ['Picking', 'Packing', 'Sorting', 'Shipping', 'Returns'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  const roboticsPerformance = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Robot Utilization %',
        data: [92, 88, 95, 91, 89, 78, 72],
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Manual Operations %',
        data: [45, 48, 35, 42, 38, 55, 60],
        borderColor: 'rgb(251, 146, 60)',
        backgroundColor: 'rgba(251, 146, 60, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ]
  };

  const features = [
    {
      icon: RiRobotLine,
      title: 'Autonomous Robots',
      description: 'AI-powered robots for picking, packing, and material handling',
      stats: '70% faster fulfillment',
      gradient: 'from-purple-500 to-indigo-600',
      details: 'AGVs, AMRs, and cobots working 24/7'
    },
    {
      icon: MdInventory,
      title: 'Smart Inventory Management',
      description: 'Real-time inventory tracking with predictive restocking',
      stats: '99.9% accuracy',
      gradient: 'from-blue-500 to-cyan-600',
      details: 'RFID, IoT sensors, and AI forecasting'
    },
    {
      icon: HiOutlineViewGrid,
      title: 'Dynamic Slotting',
      description: 'AI-optimized product placement for maximum efficiency',
      stats: '40% space savings',
      gradient: 'from-green-500 to-teal-600',
      details: 'Heat mapping and ABC analysis'
    },
    {
      icon: FaBarcode,
      title: 'Automated Scanning',
      description: 'Vision systems and RFID for instant item identification',
      stats: '0.01% error rate',
      gradient: 'from-orange-500 to-red-600',
      details: 'Computer vision and ML recognition'
    },
    {
      icon: MdAutoGraph,
      title: 'Predictive Analytics',
      description: 'Forecast demand and optimize warehouse operations',
      stats: '35% cost reduction',
      gradient: 'from-pink-500 to-rose-600',
      details: 'Machine learning demand forecasting'
    },
    {
      icon: MdPrecisionManufacturing,
      title: 'AS/RS Integration',
      description: 'Automated Storage and Retrieval Systems for high-density storage',
      stats: '85% space utilization',
      gradient: 'from-indigo-500 to-purple-600',
      details: 'Vertical lift modules and shuttle systems'
    }
  ];

  const warehouseZones = [
    {
      id: 'zone-a',
      name: 'Receiving Area',
      status: 'active',
      utilization: 85,
      temperature: 22,
      humidity: 45,
      robots: 4,
      workers: 8,
      throughput: '450 items/hr'
    },
    {
      id: 'zone-b',
      name: 'Storage Area',
      status: 'optimal',
      utilization: 72,
      temperature: 20,
      humidity: 40,
      robots: 12,
      workers: 3,
      throughput: '280 items/hr'
    },
    {
      id: 'zone-c',
      name: 'Picking Area',
      status: 'busy',
      utilization: 91,
      temperature: 21,
      humidity: 42,
      robots: 8,
      workers: 12,
      throughput: '620 items/hr'
    },
    {
      id: 'zone-d',
      name: 'Packing Station',
      status: 'active',
      utilization: 68,
      temperature: 23,
      humidity: 48,
      robots: 6,
      workers: 15,
      throughput: '380 items/hr'
    },
    {
      id: 'zone-e',
      name: 'Shipping Dock',
      status: 'optimal',
      utilization: 78,
      temperature: 24,
      humidity: 50,
      robots: 3,
      workers: 10,
      throughput: '520 items/hr'
    }
  ];

  const liveMetrics = [
    {
      label: 'Orders/Hour',
      value: '1,245',
      change: '+12.5%',
      icon: BiPackage,
      color: 'text-blue-500'
    },
    {
      label: 'Picking Accuracy',
      value: '99.8%',
      change: '+0.3%',
      icon: MdInventory,
      color: 'text-green-500'
    },
    {
      label: 'Robot Fleet',
      value: '33/35',
      change: 'Active',
      icon: RiRobotLine,
      color: 'text-purple-500'
    },
    {
      label: 'Avg. Fulfillment',
      value: '1.8 hrs',
      change: '-22 min',
      icon: BiTime,
      color: 'text-orange-500'
    }
  ];

  const caseStudy = {
    company: 'TechMart Distribution',
    size: '500,000 sq ft facility',
    challenge: 'Manual processes causing delays, high error rates, and increased labor costs',
    solution: 'Deployed end-to-end warehouse automation with 50+ robots and AI-powered WMS',
    implementation: [
      'Installed 35 AMRs for material transport',
      'Deployed AS/RS for high-density storage',
      'Implemented vision-based quality control',
      'Integrated predictive analytics platform'
    ],
    results: [
      { metric: 'Order Fulfillment Speed', improvement: '3x faster', before: '6 hours', after: '2 hours' },
      { metric: 'Picking Accuracy', improvement: '99.9%', before: '94.5%', after: '99.9%' },
      { metric: 'Labor Costs', improvement: '45% reduction', before: '$2.8M/year', after: '$1.54M/year' },
      { metric: 'Storage Capacity', improvement: '60% increase', before: '50,000 SKUs', after: '80,000 SKUs' }
    ]
  };

  const getZoneStatusColor = (status) => {
    switch(status) {
      case 'optimal': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'busy': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'alert': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header with Material Design 3 elevation */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-surface-light/95 dark:bg-surface-elevated-dark/95 backdrop-blur-xl shadow-elevation-1 dark:shadow-elevation-dark-1 sticky top-0 z-20"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/"
                className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
              >
                <IoArrowBack className="text-xl" />
              </Link>
              <div>
                <h1 className="headline-5 text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
                  <FaWarehouse className="text-primary-500" />
                  Warehouse Automation
                </h1>
                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                  Intelligent automation for modern warehouses
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium shadow-elevation-2"
            >
              Schedule Demo
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Modern Gradient and Animations */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full"
            >
              <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                🚀 Next-Gen Warehouse Technology
              </span>
            </motion.div>
            
            <h2 className="headline-3 text-on-surface-light dark:text-on-surface-dark mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 dark:from-primary-400 dark:via-purple-400 dark:to-secondary-400">
                Revolutionize Your Warehouse
              </span>
              <br />
              with AI-Powered Automation
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-8">
              Transform your warehouse into a smart, efficient operation with robotics, AI, and IoT. 
              Achieve 3x faster fulfillment, 99.9% accuracy, and reduce operational costs by up to 50%.
            </p>
            
            <div className="flex justify-center gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-medium shadow-elevation-3 hover:shadow-elevation-4 transition-all"
              >
                Get Started Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 rounded-full font-medium shadow-elevation-2 hover:shadow-elevation-3 transition-all border border-primary-200 dark:border-primary-800"
              >
                Watch Video Tour
              </motion.button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { value: '3x', label: 'Faster Fulfillment', icon: FaShippingFast },
                { value: '99.9%', label: 'Accuracy Rate', icon: MdInventory },
                { value: '50%', label: 'Cost Reduction', icon: BiTrendingUp },
                { value: '24/7', label: 'Operations', icon: RiDashboard3Line }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-elevation-2"
                >
                  <stat.icon className="text-3xl text-primary-500 mb-2" />
                  <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">{stat.value}</p>
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Warehouse Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevation-3 overflow-hidden"
          >
            {/* Dashboard Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="headline-5 text-on-surface-light dark:text-on-surface-dark">
                  Warehouse Operations Center
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Live</span>
                </div>
              </div>
            </div>

            {/* View Selector */}
            <div className="flex gap-4 p-6 border-b border-gray-200 dark:border-gray-700">
              {['overview', 'zones', 'robotics', 'analytics'].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-2 rounded-lg capitalize transition-all ${
                    activeView === view
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-on-surface-light-medium dark:text-on-surface-dark-medium'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeView === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Live Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      {liveMetrics.map((metric, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -5 }}
                          className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 rounded-xl"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                              {metric.label}
                            </span>
                            <metric.icon className={`${metric.color} text-xl`} />
                          </div>
                          <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">
                            {metric.value}
                          </p>
                          <p className="caption text-green-600 dark:text-green-400">
                            {metric.change}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                        <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                          Hourly Throughput
                        </h4>
                        <div className="h-64">
                          <Line data={throughputData} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                        <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                          Process Distribution
                        </h4>
                        <div className="h-64">
                          <Doughnut data={pickingEfficiency} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeView === 'zones' && (
                  <motion.div
                    key="zones"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="space-y-4">
                      {warehouseZones.map((zone) => (
                        <motion.div
                          key={zone.id}
                          whileHover={{ x: 5 }}
                          className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 rounded-xl cursor-pointer hover:shadow-elevation-2 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                                  {zone.name}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getZoneStatusColor(zone.status)}`}>
                                  {zone.status}
                                </span>
                              </div>
                              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                                {zone.robots} robots • {zone.workers} workers • {zone.throughput}
                              </p>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-6">
                              <div className="text-center">
                                <IoSpeedometer className="text-2xl text-blue-500 mx-auto mb-1" />
                                <p className="subtitle-2">{zone.utilization}%</p>
                                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Utilization</p>
                              </div>
                              <div className="text-center">
                                <RiRobotLine className="text-2xl text-purple-500 mx-auto mb-1" />
                                <p className="subtitle-2">{zone.robots}</p>
                                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Robots</p>
                              </div>
                              <div className="text-center">
                                <BiPackage className="text-2xl text-green-500 mx-auto mb-1" />
                                <p className="subtitle-2">{zone.throughput}</p>
                                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Throughput</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeView === 'robotics' && (
                  <motion.div
                    key="robotics"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6">
                      <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                        Robotics vs Manual Operations
                      </h4>
                      <div className="h-64">
                        <Line data={roboticsPerformance} options={{ responsive: true, maintainAspectRatio: false }} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/30 rounded-xl">
                        <RiRobotLine className="text-3xl text-purple-500 mb-2" />
                        <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">33 Active</p>
                        <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Robots Operating</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/30 rounded-xl">
                        <MdAutoGraph className="text-3xl text-green-500 mb-2" />
                        <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">94.5%</p>
                        <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Avg. Utilization</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/30 rounded-xl">
                        <BiTime className="text-3xl text-blue-500 mb-2" />
                        <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">99.8%</p>
                        <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Uptime</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeView === 'analytics' && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                      <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                        Zone Capacity Utilization
                      </h4>
                      <div className="h-64">
                        <Bar data={inventoryUtilization} options={{ responsive: true, maintainAspectRatio: false }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid with Modern UI */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="headline-4 text-on-surface-light dark:text-on-surface-dark mb-4">
              Cutting-Edge Automation Solutions
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium max-w-2xl mx-auto">
              Deploy advanced technologies to transform your warehouse operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-elevation-2 hover:shadow-elevation-4 transition-all overflow-hidden"
              >
                {/* Animated Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <feature.icon className="text-white text-3xl" />
                  </div>
                  <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-3">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="caption text-primary-600 dark:text-primary-400 font-bold">
                      {feature.stats}
                    </span>
                    <motion.span
                      className="text-primary-600 dark:text-primary-400"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </div>
                  <p className="caption text-on-surface-light-disabled dark:text-on-surface-dark-disabled">
                    {feature.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-8 lg:p-12"
          >
            <h3 className="headline-4 text-on-surface-light dark:text-on-surface-dark mb-8 text-center">
              Success Story: {caseStudy.company}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="mb-6">
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Facility Size</p>
                  <p className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">{caseStudy.size}</p>
                </div>
                <div className="mb-6">
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Challenge</p>
                  <p className="body-1 text-on-surface-light dark:text-on-surface-dark">{caseStudy.challenge}</p>
                </div>
                <div>
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Solution</p>
                  <p className="body-1 text-on-surface-light dark:text-on-surface-dark">{caseStudy.solution}</p>
                </div>
              </div>
              
              <div>
                <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                  Implementation Steps
                </h4>
                <ul className="space-y-3 mb-6">
                  {caseStudy.implementation.map((step, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">{index + 1}</span>
                      </div>
                      <span className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium">
                        {step}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Results Grid */}
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6 text-center">
                Transformational Results
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {caseStudy.results.map((result, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2"
                  >
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mb-2">
                      {result.metric}
                    </p>
                    <p className="headline-5 text-primary-600 dark:text-primary-400 mb-2">
                      {result.improvement}
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <span className="text-gray-500 line-through">{result.before}</span>
                      <span>→</span>
                      <span className="text-green-600 dark:text-green-400 font-semibold">{result.after}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="headline-4 text-on-surface-light dark:text-on-surface-dark mb-4">
              Calculate Your ROI
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-8 max-w-2xl mx-auto">
              See how much you could save with warehouse automation
            </p>
            
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevation-3 p-8 max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BiDollar className="text-white text-4xl" />
                  </div>
                  <p className="headline-5 text-on-surface-light dark:text-on-surface-dark">$2.5M</p>
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Annual Savings</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BiTime className="text-white text-4xl" />
                  </div>
                  <p className="headline-5 text-on-surface-light dark:text-on-surface-dark">18 months</p>
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">ROI Period</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BiTrendingUp className="text-white text-4xl" />
                  </div>
                  <p className="headline-5 text-on-surface-light dark:text-on-surface-dark">185%</p>
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Productivity Gain</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium shadow-elevation-2"
              >
                Get Custom ROI Analysis
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="headline-4 text-on-surface-light dark:text-on-surface-dark mb-4">
              Seamless Integrations
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-8 max-w-2xl mx-auto">
              Connect with your existing WMS, ERP, and automation systems
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'SAP', icon: MdInventory },
                { name: 'Oracle WMS', icon: MdDashboard },
                { name: 'Manhattan', icon: HiOutlineClipboardList },
                { name: 'Blue Yonder', icon: MdAutoGraph }
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-elevation-2 hover:shadow-elevation-3 transition-all"
                >
                  <partner.icon className="text-4xl text-primary-500 mx-auto mb-3" />
                  <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">
                    {partner.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 rounded-3xl p-12 text-white overflow-hidden"
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            </div>
            
            <div className="relative text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <RiRobotLine className="text-6xl mx-auto mb-6 opacity-90" />
              </motion.div>
              
              <h2 className="headline-4 mb-6">
                Ready to Automate Your Warehouse?
              </h2>
              <p className="body-1 mb-8 max-w-2xl mx-auto opacity-95">
                Join industry leaders who have transformed their warehouses with Locsafe&apos;s intelligent automation platform
              </p>
              
              <div className="flex justify-center gap-4 mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary-600 rounded-full font-medium shadow-elevation-3 hover:shadow-elevation-4 transition-all"
                >
                  Start Your Journey
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  Book Consultation
                </motion.button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div>
                  <p className="headline-5">1000+</p>
                  <p className="caption opacity-90">Warehouses Automated</p>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div>
                  <p className="headline-5">50M+</p>
                  <p className="caption opacity-90">Items Processed Daily</p>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div>
                  <p className="headline-5">99.9%</p>
                  <p className="caption opacity-90">System Uptime</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WarehouseAutomation;