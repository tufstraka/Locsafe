import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  FaCloud,
  FaMobileAlt,
  FaShieldAlt,
  FaLock,
  FaBolt,
  FaGlobe,
  FaUserShield,
  FaDatabase,
  FaSatellite,
  FaCheck,
  FaArrowRight
} from 'react-icons/fa';
import {
  HiCube,
  HiLightningBolt,
  HiSparkles,
  HiQrcode
} from 'react-icons/hi';
import { BiNetworkChart } from 'react-icons/bi';
import { IoMdAnalytics } from 'react-icons/io';
import Footer from '../components/footer';
import Header from '../components/header';

const FeaturesPage = () => {
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

  const mainFeatures = [
    {
      icon: FaSatellite,
      title: "Real-Time GPS Tracking",
      description: "Track your assets anywhere in the world with precision GPS technology and live updates.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Live location updates", "Historical route playback", "Multi-asset tracking"]
    },
    {
      icon: HiQrcode,
      title: "Digital Product Passports",
      description: "Create blockchain-verified digital identities for your products with complete lifecycle tracking.",
      gradient: "from-purple-500 to-pink-500",
      features: ["Blockchain verification", "QR code generation", "Tamper-proof records"]
    },
    {
      icon: IoMdAnalytics,
      title: "AI-Powered Analytics",
      description: "Harness artificial intelligence to predict trends, optimize routes, and prevent losses.",
      gradient: "from-teal-500 to-green-500",
      features: ["Predictive maintenance", "Route optimization", "Anomaly detection"]
    },
    {
      icon: FaShieldAlt,
      title: "Enterprise Security",
      description: "Bank-grade encryption and multi-layer security protocols protect your sensitive data.",
      gradient: "from-orange-500 to-red-500",
      features: ["256-bit encryption", "Two-factor authentication", "ISO 27001 compliant"]
    }
  ];

  const additionalFeatures = [
    {
      icon: FaCloud,
      title: "Cloud Infrastructure",
      description: "Scalable cloud platform that grows with your business needs.",
      color: "text-blue-500"
    },
    {
      icon: FaMobileAlt,
      title: "Mobile Applications",
      description: "Native iOS and Android apps for tracking on the go.",
      color: "text-green-500"
    },
    {
      icon: HiLightningBolt,
      title: "Instant Alerts",
      description: "Real-time notifications for critical events and anomalies.",
      color: "text-yellow-500"
    },
    {
      icon: BiNetworkChart,
      title: "API Integration",
      description: "Seamlessly integrate with your existing business systems.",
      color: "text-purple-500"
    },
    {
      icon: FaDatabase,
      title: "Data Backup",
      description: "Automated backups ensure your data is always safe.",
      color: "text-indigo-500"
    },
    {
      icon: FaUserShield,
      title: "Role Management",
      description: "Granular access controls for team members.",
      color: "text-red-500"
    }
  ];

  const comparisonFeatures = [
    "Unlimited asset tracking",
    "Real-time GPS monitoring",
    "Digital Product Passports",
    "AI-powered predictions",
    "Custom geofencing",
    "Advanced analytics dashboard",
    "24/7 customer support",
    "API access"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50" itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>Asset Tracking Features | GPS, AI Analytics & Digital Passports - Locsafe</title>
        <meta
          name="description"
          content="Discover Locsafe's powerful asset tracking features: Real-time GPS tracking, AI-powered analytics, digital product passports, blockchain verification, and enterprise-grade security. Start your 14-day free trial."
        />
        <meta name="keywords" content="GPS tracking, AI analytics, digital product passport, blockchain verification, asset management, supply chain features, real-time tracking, fleet management, cold chain monitoring" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/features" />
        <meta property="og:title" content="Asset Tracking Features | GPS, AI Analytics & Digital Passports - Locsafe" />
        <meta property="og:description" content="Discover Locsafe's powerful asset tracking features: Real-time GPS tracking, AI-powered analytics, digital product passports, and blockchain verification." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Asset Tracking Features - Locsafe" />
        <meta name="twitter:description" content="Real-time GPS tracking, AI analytics, digital product passports, and blockchain verification." />
        
        {/* Canonical */}
        <link rel="canonical" href="https://locsafe.org/features" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Locsafe Features",
            "description": "Comprehensive asset tracking and supply chain management features",
            "numberOfItems": 10,
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "Real-Time GPS Tracking", "description": "Track assets anywhere with precision GPS technology"},
              {"@type": "ListItem", "position": 2, "name": "Digital Product Passports", "description": "Blockchain-verified digital identities for products"},
              {"@type": "ListItem", "position": 3, "name": "AI-Powered Analytics", "description": "Predictive maintenance and route optimization"},
              {"@type": "ListItem", "position": 4, "name": "Enterprise Security", "description": "Bank-grade 256-bit encryption"},
              {"@type": "ListItem", "position": 5, "name": "Cloud Infrastructure", "description": "Scalable cloud platform"},
              {"@type": "ListItem", "position": 6, "name": "Mobile Applications", "description": "Native iOS and Android apps"}
            ]
          })}
        </script>
      </Helmet>
      <Header/>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="absolute inset-0 bg-grid-white/5"></div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
          </motion.div>

          <div className="relative container mx-auto px-4 py-24 lg:py-32">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full border border-teal-500/30 mb-6"
              >
                <HiSparkles className="text-teal-400" />
                <span className="text-sm font-medium text-teal-300">Next-Gen Asset Tracking</span>
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent">
                Powerful Features
              </h1>
              <p className="text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed">
                Enterprise-grade asset tracking with cutting-edge technology that transforms how you manage your supply chain
              </p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/25 transition-all transform hover:scale-105">
                  Start Free Trial
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all">
                  View Demo
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>
        </section>

        {/* Main Features Grid */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4"
            >
              Core Capabilities
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
            >
              Everything you need to track, monitor, and secure your assets in one powerful platform
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
                
                <div className="relative p-8">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex p-4 bg-gradient-to-r ${feature.gradient} rounded-xl shadow-lg mb-6`}
                  >
                    <feature.icon className="text-3xl text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-6">{feature.description}</p>
                  
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <FaCheck className="text-teal-500 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient}`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Additional Features */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                And So Much More
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Comprehensive features designed for modern supply chain management
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-slate-100"
                >
                  <div className={`${feature.color} mb-4`}>
                    <feature.icon className="text-3xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-3xl p-12 text-white shadow-2xl"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">
                  Why Choose Locsafe?
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  Join thousands of businesses that trust Locsafe for their critical asset tracking needs.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {comparisonFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <FaCheck className="text-xs" />
                      </div>
                      <span className="text-white/90">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Get Started Now
                  <FaArrowRight />
                </motion.button>
              </div>

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                    >
                      <HiCube className="text-3xl mb-3" />
                      <p className="font-semibold">1M+ Assets</p>
                      <p className="text-sm text-white/70">Tracked Daily</p>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                    >
                      <FaGlobe className="text-3xl mb-3" />
                      <p className="font-semibold">150+ Countries</p>
                      <p className="text-sm text-white/70">Global Coverage</p>
                    </motion.div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, delay: 1, repeat: Infinity }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                    >
                      <FaBolt className="text-3xl mb-3" />
                      <p className="font-semibold">99.9% Uptime</p>
                      <p className="text-sm text-white/70">Reliability</p>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, delay: 1.5, repeat: Infinity }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                    >
                      <FaLock className="text-3xl mb-3" />
                      <p className="font-semibold">Bank-Grade</p>
                      <p className="text-sm text-white/70">Security</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container mx-auto px-4 text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Asset Management?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join the future of supply chain tracking with Locsafe&apos;s powerful features
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-teal-500/25 transition-all"
              >
                Start 14-Day Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer/>
    </div>
  );
};

export default FeaturesPage;
