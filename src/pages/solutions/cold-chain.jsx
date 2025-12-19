import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoThermometerSharp, IoShieldCheckmark, IoTime, IoWarning } from 'react-icons/io5';
import { FaTemperatureLow, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { MdLocalPharmacy, MdRestaurant, MdSensors } from 'react-icons/md';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { BiLineChart } from 'react-icons/bi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  Title,
  Tooltip,
  Legend,
  Filler
);

const ColdChainSolution = () => {
  //const [activeTab, setActiveTab] = useState('overview');

  // Temperature monitoring data
  const temperatureData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Actual Temperature',
        data: [2.5, 2.8, 3.2, 2.9, 2.7, 3.1, 2.8],
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Upper Limit',
        data: [8, 8, 8, 8, 8, 8, 8],
        borderColor: 'rgb(239, 68, 68)',
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: 'Lower Limit',
        data: [2, 2, 2, 2, 2, 2, 2],
        borderColor: 'rgb(59, 130, 246)',
        borderDash: [5, 5],
        pointRadius: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    }
  };

  const features = [
    {
      icon: IoThermometerSharp,
      title: 'Real-Time Temperature Monitoring',
      description: '24/7 monitoring with instant alerts for temperature excursions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MdSensors,
      title: 'IoT Sensor Integration',
      description: 'Advanced sensors for temperature, humidity, and location tracking',
      color: 'from-teal-500 to-green-500'
    },
    {
      icon: IoShieldCheckmark,
      title: 'Compliance Assurance',
      description: 'Meet GDP, GMP, and FDA requirements with automated documentation',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: HiOutlineDocumentReport,
      title: 'Automated Reporting',
      description: 'Generate compliance reports and temperature logs automatically',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const industries = [
    {
      icon: MdLocalPharmacy,
      name: 'Pharmaceuticals',
      description: 'Vaccines, biologics, and temperature-sensitive medicines',
      requirements: '2-8°C for vaccines, -20°C for certain biologics',
      stats: { compliance: '99.8%', shipments: '12,450', savings: '$2.3M' }
    },
    {
      icon: MdRestaurant,
      name: 'Food & Beverage',
      description: 'Fresh produce, dairy, frozen foods, and beverages',
      requirements: '0-4°C for fresh, -18°C for frozen',
      stats: { compliance: '98.5%', shipments: '45,000', savings: '$1.8M' }
    }
  ];

  const caseStudy = {
    client: 'MediPharma Kenya',
    industry: 'Pharmaceutical Distribution',
    challenge: 'Managing temperature-sensitive vaccine distribution across 47 counties',
    solution: 'Implemented end-to-end cold chain monitoring with IoT sensors and real-time alerts',
    results: [
      { metric: 'Temperature Excursions', value: '73% Reduction', trend: 'down' },
      { metric: 'Compliance Rate', value: '99.8%', trend: 'up' },
      { metric: 'Product Waste', value: '65% Reduction', trend: 'down' },
      { metric: 'Delivery Time', value: '24% Faster', trend: 'up' }
    ]
  };

  const realTimeAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Temperature approaching upper limit - Truck KBA 456Y',
      time: '2 mins ago',
      action: 'Adjust cooling'
    },
    {
      id: 2,
      type: 'success',
      message: 'Shipment #VAC2025-001 delivered within temperature range',
      time: '15 mins ago',
      action: 'View report'
    },
    {
      id: 3,
      type: 'info',
      message: 'Scheduled maintenance for Cooling Unit #3',
      time: '1 hour ago',
      action: 'Schedule'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>Cold Chain Management Solution | Temperature Monitoring - Locsafe</title>
        <meta
          name="description"
          content="Protect temperature-sensitive products with Locsafe's cold chain management solution. Real-time temperature monitoring, IoT sensors, compliance automation, and 24/7 alerts for pharmaceuticals and food logistics."
        />
        <meta name="keywords" content="cold chain management, temperature monitoring, pharmaceutical logistics, vaccine tracking, food cold chain, IoT temperature sensors, GDP compliance, cold storage monitoring, Kenya cold chain" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/solutions/cold-chain" />
        <meta property="og:title" content="Cold Chain Management Solution | Temperature Monitoring - Locsafe" />
        <meta property="og:description" content="Protect temperature-sensitive products with real-time temperature monitoring, IoT sensors, and compliance automation." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cold Chain Management - Locsafe" />
        <meta name="twitter:description" content="Real-time temperature monitoring for pharmaceuticals and food logistics." />
        
        {/* Canonical */}
        <link rel="canonical" href="https://locsafe.org/solutions/cold-chain" />
        
        {/* Structured Data - Service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Cold Chain Management Solution",
            "description": "End-to-end temperature-controlled logistics monitoring for pharmaceuticals, vaccines, and perishable goods",
            "provider": {
              "@type": "Organization",
              "name": "Locsafe"
            },
            "serviceType": "Cold Chain Monitoring",
            "areaServed": {
              "@type": "Country",
              "name": "Kenya"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Cold Chain Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Real-Time Temperature Monitoring"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "IoT Sensor Integration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Compliance Automation"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
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
                  <FaTemperatureLow className="text-primary-500" />
                  Cold Chain Management
                </h1>
                <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                  End-to-end temperature-controlled logistics
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
        <div className="absolute inset-0 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="headline-3 text-on-surface-light dark:text-on-surface-dark mb-6">
              Protect Temperature-Sensitive Products
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-8">
              From pharmaceuticals to fresh produce, ensure your products maintain the perfect temperature throughout the entire supply chain. 
              Our advanced cold chain solution combines IoT sensors, real-time monitoring, and predictive analytics to eliminate temperature excursions and ensure compliance.
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium shadow-elevation-2"
              >
                Request Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg font-medium shadow-elevation-2"
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Monitoring Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevation-3 p-8"
          >
            <h3 className="headline-5 text-on-surface-light dark:text-on-surface-dark mb-6">
              Live Temperature Monitoring
            </h3>
            
            {/* Real-time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Active Shipments</span>
                  <BiLineChart className="text-primary-500" />
                </div>
                <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">24</p>
                <p className="caption text-success-600 dark:text-success-400">All within range</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Avg. Temperature</span>
                  <IoThermometerSharp className="text-blue-500" />
                </div>
                <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">3.2°C</p>
                <p className="caption text-blue-600 dark:text-blue-400">Optimal range</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Compliance Rate</span>
                  <IoShieldCheckmark className="text-green-500" />
                </div>
                <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">99.8%</p>
                <p className="caption text-green-600 dark:text-green-400">Above target</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Active Alerts</span>
                  <IoWarning className="text-yellow-500" />
                </div>
                <p className="headline-6 text-on-surface-light dark:text-on-surface-dark">2</p>
                <p className="caption text-yellow-600 dark:text-yellow-400">Action required</p>
              </div>
            </div>

            {/* Temperature Chart */}
            <div className="h-64 mb-8">
              <Line data={temperatureData} options={chartOptions} />
            </div>

            {/* Real-time Alerts */}
            <div className="space-y-3">
              <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-3">Recent Alerts</h4>
              {realTimeAlerts.map(alert => (
                <motion.div
                  key={alert.id}
                  whileHover={{ x: 5 }}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500' :
                    alert.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' :
                    'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {alert.type === 'warning' ? <FaExclamationTriangle className="text-yellow-500" /> :
                     alert.type === 'success' ? <FaCheckCircle className="text-green-500" /> :
                     <IoTime className="text-blue-500" />}
                    <div>
                      <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">{alert.message}</p>
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">{alert.time}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium hover:shadow-elevation-2 transition-all">
                    {alert.action}
                  </button>
                </motion.div>
              ))}
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
              Key Features
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium max-w-2xl mx-auto">
              Advanced technology to ensure product integrity throughout the cold chain
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
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-2">
                  {feature.title}
                </h3>
                <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="headline-4 text-on-surface-light dark:text-on-surface-dark mb-4">
              Industry Applications
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium max-w-2xl mx-auto">
              Tailored solutions for different industries with specific temperature requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                      <industry.icon className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                        {industry.name}
                      </h3>
                      <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mb-1">
                      Temperature Requirements
                    </p>
                    <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">
                      {industry.requirements}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="headline-6 text-primary-600 dark:text-primary-400">{industry.stats.compliance}</p>
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Compliance</p>
                    </div>
                    <div className="text-center">
                      <p className="headline-6 text-primary-600 dark:text-primary-400">{industry.stats.shipments}</p>
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Shipments</p>
                    </div>
                    <div className="text-center">
                      <p className="headline-6 text-primary-600 dark:text-primary-400">{industry.stats.savings}</p>
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Savings</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevation-3 p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="headline-5 text-on-surface-light dark:text-on-surface-dark mb-6">
                  Real-World Success Story
                </h3>
                <div className="mb-6">
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Client</p>
                  <p className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">{caseStudy.client}</p>
                </div>
                <div className="mb-6">
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Industry</p>
                  <p className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">{caseStudy.industry}</p>
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
                  Results Achieved
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {caseStudy.results.map((result, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mb-1">
                        {result.metric}
                      </p>
                      <p className={`headline-6 ${
                        result.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {result.value}
                      </p>
                    </motion.div>
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
              Ready to Protect Your Cold Chain?
            </h2>
            <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-8 max-w-2xl mx-auto">
              Join leading companies that trust Locsafe for their temperature-sensitive logistics
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium shadow-elevation-3"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg font-medium shadow-elevation-2"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ColdChainSolution;