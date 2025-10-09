import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoTime, IoSpeedometer, IoPeople } from 'react-icons/io5';
import { FaRoute, FaBoxes, FaCheckCircle, FaMobile } from 'react-icons/fa';
import { MdLocalShipping, MdDeliveryDining, MdTrackChanges } from 'react-icons/md';
import { HiOutlineClock } from 'react-icons/hi';
import { BiPackage } from 'react-icons/bi';
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

const LastMileSolution = () => {
  //const [selectedMetric, setSelectedMetric] = useState('efficiency');

  // Delivery performance data
  const deliveryData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Successful Deliveries',
        data: [145, 189, 176, 201, 198, 220, 185],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
      {
        label: 'Failed Attempts',
        data: [12, 8, 15, 10, 7, 12, 9],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      }
    ]
  };

  const timeDistribution = {
    labels: ['6-9 AM', '9-12 PM', '12-3 PM', '3-6 PM', '6-9 PM'],
    datasets: [
      {
        data: [15, 30, 25, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  const routeEfficiency = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Planned Routes',
        data: [85, 88, 90, 92],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
      {
        label: 'AI Optimized',
        data: [92, 94, 95, 97],
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const features = [
    {
      icon: FaRoute,
      title: 'AI Route Optimization',
      description: 'Dynamic routing based on traffic, weather, and delivery priorities',
      stats: '32% faster deliveries'
    },
    {
      icon: MdTrackChanges,
      title: 'Real-Time Tracking',
      description: 'Live location updates for customers and dispatchers',
      stats: '95% tracking accuracy'
    },
    {
      icon: FaMobile,
      title: 'Driver Mobile App',
      description: 'Intuitive app for drivers with navigation and proof of delivery',
      stats: '4.8★ driver rating'
    },
    {
      icon: HiOutlineClock,
      title: 'Predictive ETAs',
      description: 'Machine learning powered arrival time predictions',
      stats: '±5 min accuracy'
    }
  ];

  const useCases = [
    {
      title: 'E-Commerce Deliveries',
      icon: FaBoxes,
      description: 'Same-day and next-day delivery for online orders',
      metrics: {
        volume: '10,000+ daily',
        success: '98.5%',
        time: '< 4 hours avg'
      },
      clients: ['Jumia', 'Kilimall', 'Sky Garden']
    },
    {
      title: 'Food & Grocery',
      icon: MdDeliveryDining,
      description: 'Quick commerce and restaurant deliveries',
      metrics: {
        volume: '5,000+ daily',
        success: '96.8%',
        time: '< 30 min avg'
      },
      clients: ['Uber Eats', 'Glovo', 'Carrefour']
    },
    {
      title: 'Courier Services',
      icon: BiPackage,
      description: 'Document and parcel delivery for businesses',
      metrics: {
        volume: '3,000+ daily',
        success: '99.2%',
        time: '< 2 hours avg'
      },
      clients: ['DHL', 'FedEx', 'G4S Courier']
    }
  ];

  const liveMetrics = [
    {
      label: 'Active Deliveries',
      value: '234',
      change: '+12%',
      icon: MdLocalShipping,
      color: 'text-blue-500'
    },
    {
      label: 'On-Time Rate',
      value: '94.5%',
      change: '+2.3%',
      icon: IoTime,
      color: 'text-green-500'
    },
    {
      label: 'Avg. Delivery Time',
      value: '28 min',
      change: '-3 min',
      icon: IoSpeedometer,
      color: 'text-purple-500'
    },
    {
      label: 'Customer Rating',
      value: '4.7★',
      change: '+0.2',
      icon: IoPeople,
      color: 'text-yellow-500'
    }
  ];

  const caseStudy = {
    company: 'QuickMart Kenya',
    challenge: 'Struggling with last-mile delivery efficiency in Nairobi\'s congested traffic',
    implementation: [
      'Deployed AI-powered route optimization',
      'Integrated real-time traffic data',
      'Implemented dynamic delivery slots',
      'Launched customer tracking portal'
    ],
    results: [
      { metric: 'Delivery Time', before: '45 min', after: '28 min', improvement: '38%' },
      { metric: 'Success Rate', before: '85%', after: '98.5%', improvement: '15.9%' },
      { metric: 'Cost per Delivery', before: 'KES 250', after: 'KES 165', improvement: '34%' },
      { metric: 'Customer Satisfaction', before: '3.8★', after: '4.7★', improvement: '23.7%' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Header */}
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
                  <MdLocalShipping className="text-primary-500" />
                  Last-Mile Delivery
                </h1>
                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                  AI-powered final delivery optimization
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium shadow-elevation-2"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20" />
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="headline-3 text-on-surface-light dark:text-on-surface-dark mb-6">
              Revolutionize Your Last-Mile Delivery
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-8">
              Optimize the final and most critical leg of your supply chain with AI-powered routing, real-time tracking, and predictive analytics. 
              Reduce delivery times by up to 40% while improving customer satisfaction.
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium shadow-elevation-2"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg font-medium shadow-elevation-2"
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevation-3 p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="headline-5 text-on-surface-light dark:text-on-surface-dark">
                Live Delivery Operations
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Live</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {liveMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
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

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-4">
                  Weekly Delivery Performance
                </h4>
                <div className="h-64">
                  <Bar data={deliveryData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
              <div>
                <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-4">
                  Delivery Time Distribution
                </h4>
                <div className="h-64">
                  <Doughnut data={timeDistribution} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </div>

            {/* Route Efficiency */}
            <div className="mt-8">
              <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-4">
                Route Optimization Impact
              </h4>
              <div className="h-48">
                <Line data={routeEfficiency} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="headline-4 text-on-surface-light dark:text-on-surface-dark mb-4">
              Powerful Features
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium max-w-2xl mx-auto">
              Everything you need to optimize last-mile delivery operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2 hover:shadow-elevation-3 transition-all"
              >
                <feature.icon className="text-4xl text-primary-500 mb-4" />
                <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-2">
                  {feature.title}
                </h3>
                <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-3">
                  {feature.description}
                </p>
                <p className="caption text-primary-600 dark:text-primary-400 font-semibold">
                  {feature.stats}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="headline-4 text-on-surface-light dark:text-on-surface-dark mb-4">
              Industry Solutions
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium max-w-2xl mx-auto">
              Tailored last-mile solutions for different industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <useCase.icon className="text-3xl text-primary-500" />
                    <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                      {useCase.title}
                    </h3>
                  </div>
                  <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-4">
                    {useCase.description}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Volume</p>
                      <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">{useCase.metrics.volume}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Success</p>
                      <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">{useCase.metrics.success}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Time</p>
                      <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">{useCase.metrics.time}</p>
                    </div>
                  </div>

                  <div>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mb-2">Trusted by:</p>
                    <div className="flex flex-wrap gap-2">
                      {useCase.clients.map((client, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevation-3 p-8"
          >
            <h3 className="headline-5 text-on-surface-light dark:text-on-surface-dark mb-8 text-center">
              Success Story: {caseStudy.company}
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                  The Challenge
                </h4>
                <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-6">
                  {caseStudy.challenge}
                </p>
                
                <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                  Our Solution
                </h4>
                <ul className="space-y-2">
                  {caseStudy.implementation.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1" />
                      <span className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                  The Results
                </h4>
                <div className="space-y-3">
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                          {result.metric}
                        </span>
                        <span className="caption text-green-600 dark:text-green-400 font-semibold">
                          ↑ {result.improvement}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 line-through">{result.before}</span>
                        <span className="text-sm">→</span>
                        <span className="subtitle-2 text-primary-600 dark:text-primary-400">{result.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
            className="text-center"
          >
            <h2 className="headline-4 text-on-surface-light dark:text-on-surface-dark mb-6">
              Transform Your Last-Mile Delivery Today
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses optimizing their delivery operations with Locsafe
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium shadow-elevation-3"
              >
                Start 14-Day Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg font-medium shadow-elevation-2"
              >
                Calculate ROI
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LastMileSolution;