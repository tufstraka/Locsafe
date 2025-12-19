
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoSpeedometer, IoLocation, IoWarning, IoCheckmarkCircle } from 'react-icons/io5';
import { FaTruck, FaGasPump, FaTools, FaUserCog } from 'react-icons/fa';
import { MdSpeed, MdEngineering, MdDashboard } from 'react-icons/md';
import { BiTachometer, BiTime, BiDollar } from 'react-icons/bi';
import { RiAlertLine } from 'react-icons/ri';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
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
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FleetManagementSolution = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Fleet performance data
  const fleetUtilization = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Fleet Utilization %',
        data: [85, 92, 88, 94, 91, 78, 72],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Target',
        data: [90, 90, 90, 90, 90, 90, 90],
        borderColor: 'rgb(34, 197, 94)',
        borderDash: [5, 5],
        pointRadius: 0,
      }
    ]
  };

  const fuelConsumption = {
    labels: ['Truck A', 'Truck B', 'Truck C', 'Van D', 'Van E', 'Bike F'],
    datasets: [
      {
        label: 'Current Month (L)',
        data: [450, 380, 420, 280, 260, 45],
        backgroundColor: 'rgba(251, 146, 60, 0.8)',
      },
      {
        label: 'Previous Month (L)',
        data: [480, 360, 440, 290, 270, 48],
        backgroundColor: 'rgba(148, 163, 184, 0.8)',
      }
    ]
  };

  const vehicleHealth = {
    labels: ['Engine', 'Brakes', 'Tires', 'Battery', 'Transmission', 'Suspension'],
    datasets: [
      {
        label: 'Fleet Average Health Score',
        data: [92, 88, 75, 95, 90, 82],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(34, 197, 94)',
      }
    ]
  };

  const costBreakdown = {
    labels: ['Fuel', 'Maintenance', 'Insurance', 'Driver Wages', 'Depreciation'],
    datasets: [
      {
        data: [35, 20, 15, 25, 5],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  const features = [
    {
      icon: IoLocation,
      title: 'Real-Time GPS Tracking',
      description: 'Track your entire fleet with precision GPS and geofencing',
      stats: '99.9% uptime',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: FaGasPump,
      title: 'Fuel Management',
      description: 'Monitor fuel consumption and detect unusual patterns',
      stats: '25% fuel savings',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: FaTools,
      title: 'Predictive Maintenance',
      description: 'AI-powered maintenance scheduling to prevent breakdowns',
      stats: '40% less downtime',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: FaUserCog,
      title: 'Driver Behavior Analytics',
      description: 'Monitor and improve driver safety and efficiency',
      stats: '35% safer driving',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: MdSpeed,
      title: 'Route Optimization',
      description: 'AI-optimized routing for maximum efficiency',
      stats: '30% shorter routes',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: MdDashboard,
      title: 'Fleet Analytics',
      description: 'Comprehensive insights and performance metrics',
      stats: 'Real-time KPIs',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ];

  const liveVehicles = [
    {
      id: 'KBA-123X',
      type: 'Truck',
      status: 'active',
      speed: 65,
      location: 'Mombasa Road',
      driver: 'John Kamau',
      fuel: 75,
      health: 92,
      nextMaintenance: '5 days'
    },
    {
      id: 'KCA-456Y',
      type: 'Van',
      status: 'active',
      speed: 45,
      location: 'Thika Highway',
      driver: 'Mary Wanjiru',
      fuel: 60,
      health: 88,
      nextMaintenance: '12 days'
    },
    {
      id: 'KDA-789Z',
      type: 'Truck',
      status: 'idle',
      speed: 0,
      location: 'Depot - Nairobi',
      driver: 'Peter Ochieng',
      fuel: 90,
      health: 85,
      nextMaintenance: '3 days'
    },
    {
      id: 'KEA-321A',
      type: 'Bike',
      status: 'maintenance',
      speed: 0,
      location: 'Service Center',
      driver: 'N/A',
      fuel: 50,
      health: 65,
      nextMaintenance: 'In Progress'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      vehicle: 'KBA-123X',
      message: 'Harsh braking detected - Mombasa Road',
      time: '5 mins ago',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'maintenance',
      vehicle: 'KDA-789Z',
      message: 'Oil change due in 500km',
      time: '1 hour ago',
      priority: 'low'
    },
    {
      id: 3,
      type: 'fuel',
      vehicle: 'KCA-456Y',
      message: 'Unusual fuel consumption detected',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 4,
      type: 'success',
      vehicle: 'KEA-321A',
      message: 'Maintenance completed successfully',
      time: '3 hours ago',
      priority: 'info'
    }
  ];

  const caseStudy = {
    company: 'SafariLogistics Kenya',
    fleet: '150+ vehicles',
    challenge: 'High operational costs and frequent vehicle breakdowns affecting delivery schedules',
    solution: 'Implemented comprehensive fleet management system with IoT sensors and AI analytics',
    results: [
      { metric: 'Fuel Costs', reduction: '28%', savings: '$45,000/month' },
      { metric: 'Vehicle Downtime', reduction: '42%', improvement: '15 days → 8.7 days' },
      { metric: 'Delivery On-Time', increase: '35%', current: '94.5%' },
      { metric: 'Maintenance Costs', reduction: '31%', savings: '$22,000/month' }
    ]
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'idle': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'maintenance': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return <RiAlertLine className="text-yellow-500" />;
      case 'maintenance': return <FaTools className="text-blue-500" />;
      case 'fuel': return <FaGasPump className="text-orange-500" />;
      case 'success': return <IoCheckmarkCircle className="text-green-500" />;
      default: return <IoWarning className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>Fleet Management Solution | GPS Tracking & Analytics - Locsafe</title>
        <meta
          name="description"
          content="Master your fleet operations with Locsafe's comprehensive fleet management solution. Real-time GPS tracking, fuel management, predictive maintenance, and driver behavior analytics. Reduce costs by 30% and downtime by 40%."
        />
        <meta name="keywords" content="fleet management, GPS tracking, vehicle tracking, fuel management, predictive maintenance, driver analytics, fleet optimization, Kenya fleet, transport management" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/solutions/fleet" />
        <meta property="og:title" content="Fleet Management Solution | GPS Tracking & Analytics - Locsafe" />
        <meta property="og:description" content="Master your fleet operations with real-time GPS tracking, fuel management, and predictive maintenance. Reduce costs by 30%." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fleet Management Solution - Locsafe" />
        <meta name="twitter:description" content="Real-time GPS tracking, fuel management, and predictive maintenance for your fleet." />
        
        {/* Canonical */}
        <link rel="canonical" href="https://locsafe.org/solutions/fleet" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Fleet Management Solution",
            "description": "Comprehensive fleet management with GPS tracking, fuel management, and predictive maintenance",
            "provider": {
              "@type": "Organization",
              "name": "Locsafe"
            },
            "serviceType": "Fleet Management",
            "areaServed": {
              "@type": "Country",
              "name": "Kenya"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Fleet Services",
              "itemListElement": [
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Real-Time GPS Tracking"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Fuel Management"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Predictive Maintenance"}},
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Driver Behavior Analytics"}}
              ]
            }
          })}
        </script>
      </Helmet>
      
      {/* Header with Material Design elevation */}
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
                  <FaTruck className="text-primary-500" />
                  Fleet Management
                </h1>
                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                  Complete fleet visibility and control
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium shadow-elevation-2"
            >
              Request Demo
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Glassmorphism */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="headline-3 text-on-surface-light dark:text-on-surface-dark mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
              Master Your Fleet Operations
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-8">
              Transform your fleet into a high-performance, cost-efficient operation with real-time tracking, 
              predictive maintenance, and AI-powered analytics. Reduce costs by up to 30% while improving safety and reliability.
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-medium shadow-elevation-3 hover:shadow-elevation-4 transition-all"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 rounded-full font-medium shadow-elevation-2 hover:shadow-elevation-3 transition-all"
              >
                View Live Demo
              </motion.button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-elevation-2"
              >
                <BiDollar className="text-3xl text-green-500 mb-2" />
                <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">30%</p>
                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Cost Reduction</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-elevation-2"
              >
                <BiTachometer className="text-3xl text-blue-500 mb-2" />
                <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">99.9%</p>
                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Tracking Uptime</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-elevation-2"
              >
                <BiTime className="text-3xl text-purple-500 mb-2" />
                <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">40%</p>
                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Less Downtime</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-elevation-2"
              >
                <IoSpeedometer className="text-3xl text-orange-500 mb-2" />
                <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">25%</p>
                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Fuel Savings</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Fleet Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevation-3 overflow-hidden"
          >
            {/* Dashboard Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex space-x-8 px-8 pt-6">
                {['overview', 'vehicles', 'analytics', 'alerts'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 border-b-2 transition-all capitalize ${
                      activeTab === tab
                        ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                        : 'border-transparent text-on-surface-light-medium dark:text-on-surface-dark-medium hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      {/* Fleet Utilization Chart */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                        <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                          Fleet Utilization Trend
                        </h4>
                        <div className="h-64">
                          <Line data={fleetUtilization} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                      </div>

                      {/* Cost Breakdown */}
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                        <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                          Operating Cost Breakdown
                        </h4>
                        <div className="h-64">
                          <Doughnut data={costBreakdown} options={{ responsive: true, maintainAspectRatio: false }} />
                        </div>
                      </div>
                    </div>

                    {/* Fuel Consumption */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-8">
                      <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                        Fuel Consumption Analysis
                      </h4>
                      <div className="h-64">
                        <Bar data={fuelConsumption} options={{ responsive: true, maintainAspectRatio: false }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'vehicles' && (
                  <motion.div
                    key="vehicles"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="space-y-4">
                      {liveVehicles.map((vehicle) => (
                        <motion.div
                          key={vehicle.id}
                          whileHover={{ x: 5 }}
                          className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl cursor-pointer hover:shadow-elevation-2 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                                <FaTruck className="text-white text-xl" />
                              </div>
                              <div>
                                <div className="flex items-center gap-3">
                                  <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                                    {vehicle.id}
                                  </h3>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                                    {vehicle.status}
                                  </span>
                                </div>
                                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                                  {vehicle.type} • {vehicle.driver} • {vehicle.location}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-4 gap-6">
                              <div className="text-center">
                                <IoSpeedometer className="text-2xl text-blue-500 mx-auto mb-1" />
                                <p className="subtitle-2">{vehicle.speed} km/h</p>
                                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Speed</p>
                              </div>
                              <div className="text-center">
                                <FaGasPump className="text-2xl text-orange-500 mx-auto mb-1" />
                                <p className="subtitle-2">{vehicle.fuel}%</p>
                                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Fuel</p>
                              </div>
                              <div className="text-center">
                                <MdEngineering className="text-2xl text-green-500 mx-auto mb-1" />
                                <p className="subtitle-2">{vehicle.health}%</p>
                                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Health</p>
                              </div>
                              <div className="text-center">
                                <FaTools className="text-2xl text-purple-500 mx-auto mb-1" />
                                <p className="subtitle-2">{vehicle.nextMaintenance}</p>
                                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Service</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'analytics' && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                      <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                        Vehicle Health Metrics
                      </h4>
                      <div className="h-96">
                        <Radar data={vehicleHealth} options={{ responsive: true, maintainAspectRatio: false }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'alerts' && (
                  <motion.div
                    key="alerts"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="space-y-3">
                      {recentAlerts.map((alert) => (
                        <motion.div
                          key={alert.id}
                          whileHover={{ x: 5 }}
                          className={`flex items-center justify-between p-4 rounded-lg border-l-4 ${
                            alert.priority === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-red-500' :
                            alert.priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                            alert.priority === 'low' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' :
                            'bg-green-50 dark:bg-green-900/20 border-green-500'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {getAlertIcon(alert.type)}
                            <div>
                              <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">
                                {alert.vehicle} - {alert.message}
                              </p>
                              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                                {alert.time}
                              </p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium hover:shadow-elevation-2 transition-all">
                            View Details
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid with Modern Cards */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="headline-4 text-on-surface-light dark:text-on-surface-dark mb-4">
              Comprehensive Fleet Solutions
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium max-w-2xl mx-auto">
              Everything you need to optimize, monitor, and manage your fleet operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-elevation-2 hover:shadow-elevation-4 transition-all overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                <div className="relative">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-3">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="caption text-primary-600 dark:text-primary-400 font-semibold">
                      {feature.stats}
                    </span>
                    <motion.span
                      className="text-primary-600 dark:text-primary-400"
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </div>
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
            className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8"
          >
            <h3 className="headline-5 text-on-surface-light dark:text-on-surface-dark mb-8 text-center">
              Success Story: {caseStudy.company}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Fleet Size</p>
                  <p className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">{caseStudy.fleet}</p>
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
                <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">
                  Measurable Results
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {caseStudy.results.map((result, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-elevation-2"
                    >
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mb-2">
                        {result.metric}
                      </p>
                      <p className="headline-6 text-primary-600 dark:text-primary-400">
                        ↓ {result.reduction || `↑ ${result.increase}`}
                      </p>
                      <p className="caption text-on-surface-light dark:text-on-surface-dark">
                        {result.savings || result.improvement || result.current}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Partners */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
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
              Connect with your existing tools and systems for a unified fleet management experience
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['GPS Providers', 'Fuel Cards', 'Maintenance', 'Telematics'].map((integration, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-elevation-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MdDashboard className="text-white text-xl" />
                  </div>
                  <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">
                    {integration}
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
            className="text-center bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="headline-4 mb-6">
                Take Control of Your Fleet Today
              </h2>
              <p className="body-1 mb-8 max-w-2xl mx-auto opacity-95">
                Join thousands of fleet managers who have transformed their operations with Locsafe
              </p>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-primary-600 rounded-full font-medium shadow-elevation-3 hover:shadow-elevation-4 transition-all"
                >
                  Start 30-Day Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all"
                >
                  Schedule Demo
                </motion.button>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-12 flex justify-center items-center gap-8">
                <div>
                  <p className="headline-5">500+</p>
                  <p className="caption opacity-90">Fleet Operators</p>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div>
                  <p className="headline-5">50,000+</p>
                  <p className="caption opacity-90">Vehicles Tracked</p>
                </div>
                <div className="w-px h-12 bg-white/30"></div>
                <div>
                  <p className="headline-5">$5M+</p>
                  <p className="caption opacity-90">Saved Monthly</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FleetManagementSolution;