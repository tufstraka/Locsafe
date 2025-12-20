
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaRocket, FaStar, FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiChip } from 'react-icons/hi';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import DashboardImage from '../../LocsafeDashboard.png';
import Microsoft from '../assets/microsoft.svg';
import AWSLogo from '../assets/awws.svg';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
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
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string
};

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const [openFAQ, setOpenFAQ] = useState(null);

  // Parallax transformations with Material Motion
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  const enterprises = [
    {
      name: "Twiga Foods",
      industry: "Agricultural Distribution",
      description: "Fresh produce supply chain across East Africa",
      icon: "agriculture"
    },
    {
      name: "KPLC",
      industry: "Energy & Utilities",
      description: "Asset tracking for power infrastructure",
      icon: "bolt"
    },
    {
      name: "Kenya Airways",
      industry: "Aviation & Cargo",
      description: "Cargo and baggage tracking solutions",
      icon: "flight"
    },
    {
      name: "Safaricom",
      industry: "Telecommunications",
      description: "Equipment and fleet management",
      icon: "cell_tower"
    }
  ];

  const faqs = [
    {
      question: "How does blockchain improve supply chain transparency?",
      answer: "Our blockchain technology creates an immutable record of every transaction and movement in your supply chain. This means every stakeholder can verify the authenticity and journey of products, reducing fraud and increasing accountability."
    },
    {
      question: "What kind of AI analytics does Locsafe provide?",
      answer: "Our AI analyzes patterns in your supply chain data to predict potential delays, optimize routes, identify inefficiencies, and provide actionable insights for cost reduction and performance improvement."
    },
    {
      question: "How quickly can we implement Locsafe?",
      answer: "Most businesses can be fully operational within 2-4 weeks. Our team provides comprehensive onboarding, training, and 24/7 support to ensure a smooth transition."
    },
    {
      question: "Is Locsafe suitable for small businesses?",
      answer: "Absolutely! Our platform scales to businesses of all sizes. We offer flexible pricing plans and features that grow with your business needs."
    }
  ];

  const stats = [
    { value: 850, suffix: '+', label: 'Active Shipments Daily', icon: 'local_shipping', isMaterial: true },
    { value: 97, suffix: '%', label: 'Delivery Accuracy', icon: 'verified_user', isMaterial: true },
    { value: 45, suffix: '+', label: 'Business Clients', icon: 'business', isMaterial: true },
    { value: 3, suffix: '', label: 'Countries Covered', icon: 'public', isMaterial: true }
  ];

  const features = [
    {
      icon: 'location_on',
      isMaterial: true,
      title: "Global Traceability",
      description: "Track your products and assets at every stage, from production to delivery with pinpoint accuracy.",
      color: "secondary",
      gradient: "from-secondary-500 to-secondary-600"
    },
    {
      icon: 'lock_outline',
      isMaterial: true,
      title: "Enhanced Security",
      description: "Immutable blockchain records that reduce fraud risks and increase accountability across the supply chain.",
      color: "primary",
      gradient: "from-primary-500 to-primary-600"
    },
    {
      icon: 'notifications_active',
      isMaterial: true,
      title: "Smart Alerts",
      description: "Get instant AI-powered notifications for any supply chain discrepancies or important updates.",
      color: "warning",
      gradient: "from-warning-500 to-warning-600"
    },
    {
      icon: 'hub',
      isMaterial: true,
      title: "Decentralized Network",
      description: "Maintain complete transparency across global supply chains without central authority dependency.",
      color: "error",
      gradient: "from-error-500 to-error-600"
    },
    {
      icon: 'analytics',
      isMaterial: true,
      title: "Advanced Analytics",
      description: "Gain actionable insights with AI-powered supply chain analytics and predictive modeling.",
      color: "success",
      gradient: "from-success-500 to-success-600"
    },
    {
      icon: 'event_note',
      isMaterial: true,
      title: "Custom Workflows",
      description: "Set up personalized notification rules and workflows based on your specific business needs.",
      color: "info",
      gradient: "from-info-500 to-info-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    <main className="relative min-h-screen bg-background-light dark:bg-background-dark text-on-surface-light dark:text-on-surface-dark overflow-x-hidden" role="main" itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>Locsafe - AI-Powered Supply Chain & Asset Tracking Platform | Real-Time GPS Tracking</title>
        <meta
          name="description"
          content="Transform your supply chain with Locsafe's AI-powered tracking technology. Real-time GPS tracking, digital product passports, cold chain monitoring, and fleet management. Trusted by 45+ businesses across East Africa."
        />
        <meta name="keywords" content="supply chain management, asset tracking, GPS tracking, fleet management, cold chain monitoring, digital product passport, blockchain logistics, AI analytics, inventory management, real-time tracking, Kenya logistics" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/" />
        <meta property="og:title" content="Locsafe - AI-Powered Supply Chain & Asset Tracking Platform" />
        <meta property="og:description" content="Transform your supply chain with AI-powered blockchain technology. Real-time GPS tracking, digital product passports, and predictive analytics for modern logistics." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        <meta property="og:site_name" content="Locsafe" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://locsafe.org/" />
        <meta name="twitter:title" content="Locsafe - AI-Powered Supply Chain & Asset Tracking Platform" />
        <meta name="twitter:description" content="Transform your supply chain with AI-powered blockchain technology. Real-time GPS tracking and predictive analytics." />
        <meta name="twitter:image" content="https://locsafe.org/og-image.png" />
        <meta name="twitter:site" content="@Locsafe" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://locsafe.org/" />
        
        {/* Structured Data - WebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Locsafe - AI-Powered Supply Chain Intelligence Platform",
            "description": "Transform your supply chain with AI-powered blockchain technology. Real-time GPS tracking, digital product passports, and predictive analytics.",
            "url": "https://locsafe.org/",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Locsafe",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "25000",
                "priceCurrency": "KES",
                "description": "One-time installation fee starting from KES 25,000"
              }
            }
          })}
        </script>
        
        {/* Structured Data - FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does blockchain improve supply chain transparency?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our blockchain technology creates an immutable record of every transaction and movement in your supply chain. This means every stakeholder can verify the authenticity and journey of products, reducing fraud and increasing accountability."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of AI analytics does Locsafe provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI analyzes patterns in your supply chain data to predict potential delays, optimize routes, identify inefficiencies, and provide actionable insights for cost reduction and performance improvement."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly can we implement Locsafe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most businesses can be fully operational within 2-4 weeks. Our team provides comprehensive onboarding, training, and 24/7 support to ensure a smooth transition."
                }
              },
              {
                "@type": "Question",
                "name": "Is Locsafe suitable for small businesses?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Our platform scales to businesses of all sizes. We offer flexible pricing plans and features that grow with your business needs."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        className="mt-16"
        toastClassName="rounded-lg shadow-elevation-3"
      />

      <div className="fixed inset-0 z-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--md-primary) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, var(--md-secondary) 0%, transparent 50%)`,
          filter: 'blur(100px)',
        }} />
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 z-50 origin-left shadow-elevation-2"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative z-10">
        <Header />
        
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-6 pt-32 pb-24 relative"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div className="space-y-6 lg:space-y-8">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-secondary-50 to-primary-50 dark:from-secondary-900/20 dark:to-primary-900/20 rounded-full shadow-elevation-2 border border-secondary-200 dark:border-secondary-800"
              >
                <HiSparkles className="text-secondary-600 dark:text-secondary-400 text-xl animate-pulse" />
                <span className="text-secondary-700 dark:text-secondary-400 font-medium">AI-Powered Supply Chain Intelligence</span>
                <span className="px-3 py-1 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-xs font-bold rounded-full shadow-elevation-1">NEW</span>
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-heading font-bold leading-[1.1]"
                role="heading"
                aria-level="1"
              >
                The Future of
                <span className="block bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                  Supply Chain
                </span>
                <span className="block">Intelligence</span>
              </motion.h1>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-on-surface-light-medium dark:text-on-surface-dark-medium leading-relaxed"
              >
                Harness the power of blockchain and AI to create unprecedented transparency, security, and efficiency in your global supply chain operations.
              </motion.p>
              
              <motion.div variants={itemVariants} className="space-y-4 lg:space-y-6">
                <div className="flex flex-wrap gap-2 lg:gap-3">
                  {[
                    { icon: 'security', text: "Bank-Grade Security", isMaterial: true },
                    { Component: HiLightningBolt, text: "Real-Time Tracking", isMaterial: false },
                    { Component: HiChip, text: "AI Analytics", isMaterial: false }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-3 px-5 py-3 bg-surface-light dark:bg-surface-elevated-dark rounded-xl shadow-elevation-2 dark:shadow-elevation-dark-2 border border-primary-100 dark:border-primary-900"
                    >
                      {item.isMaterial ? (
                        <span className="material-icons text-primary-500 dark:text-primary-400">{item.icon}</span>
                      ) : (
                        <item.Component className="text-xl text-primary-500 dark:text-primary-400" />
                      )}
                      <span className="font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 lg:gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/register"
                      className="group ripple relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300"
                      aria-label="Start your free trial"
                      role="button"
                    >
                      <span className="flex items-center gap-3">
                        Get Started
                        <span className="material-icons text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="https://demo.locsafe.org/admin/dashboard"
                      className="group ripple inline-flex items-center justify-center px-8 py-4 bg-surface-light dark:bg-surface-elevated-dark text-on-surface-light dark:text-on-surface-dark font-medium rounded-full shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 border border-primary-200 dark:border-primary-800"
                      aria-label="Watch product demo"
                      role="button"
                    >
                      <span className="material-icons mr-3 text-primary-500 group-hover:scale-110 transition-transform">play_circle</span>
                      Interactive Demo
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8"
                >
                  <div className="flex -space-x-3 w-full sm:w-auto justify-start">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.img
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1 * i, type: "spring" }}
                        src={`https://i.pravatar.cc/40?img=${i}`}
                        alt={`Customer ${i}`}
                        className="w-12 h-12 rounded-full border-3 border-surface-light dark:border-surface-dark shadow-elevation-2"
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col pr-4 sm:pr-0 w-full sm:w-auto mt-4 sm:mt-0">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ delay: 0.05 * i, type: "spring" }}
                        >
                          <FaStar className="w-4 h-4 text-warning-500" />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-sm text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">
                      Trusted by <span className="font-semibold text-on-surface-light dark:text-on-surface-dark">45+</span> businesses
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative order-first lg:order-last"
            >
              {/* Modern SVG Graphic - Supply Chain Network Visualization */}
              <div className="relative">
                <svg
                  viewBox="0 0 600 500"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))' }}
                >
                  <defs>
                    {/* Enhanced gradients */}
                    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
                    </linearGradient>
                    
                    <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="1" />
                    </linearGradient>
                    
                    <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="1" />
                    </linearGradient>
                    
                    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                    </radialGradient>
                    
                    {/* Enhanced filters */}
                    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    
                    <filter id="nodeDropShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15"/>
                    </filter>
                  </defs>
                  
                  {/* Background subtle pattern */}
                  <pattern id="dotPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <circle cx="25" cy="25" r="1" fill="currentColor" className="text-primary-200 dark:text-primary-800" opacity="0.3" />
                  </pattern>
                  <rect width="600" height="500" fill="url(#dotPattern)" opacity="0.5" />
                  
                  {/* Animated background glow */}
                  <motion.circle
                    cx="300" cy="250"
                    r="200"
                    fill="url(#glowGradient)"
                    initial={{ r: 150, opacity: 0 }}
                    animate={{
                      r: [150, 250, 150],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Network connections */}
                  <g opacity="0.6">
                    {/* Animated flow paths */}
                    <motion.path
                      d="M 100 250 Q 300 150, 500 250"
                      stroke="url(#primaryGradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="10,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        pathLength: { duration: 3, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                    />
                    
                    <motion.path
                      d="M 100 250 Q 300 350, 500 250"
                      stroke="url(#successGradient)"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="10,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{
                        pathLength: { duration: 3.5, repeat: Infinity, ease: "linear", delay: 0.5 },
                        opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                      }}
                    />
                    
                    {/* Central connections */}
                    <motion.line
                      x1="300" y1="100" x2="300" y2="400"
                      stroke="url(#secondaryGradient)"
                      strokeWidth="2"
                      strokeDasharray="5,10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                  </g>
                  
                  {/* Main nodes */}
                  <g filter="url(#nodeDropShadow)">
                    {/* Source Node - Factory */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <motion.circle
                        cx="100" cy="250" r="45"
                        fill="url(#primaryGradient)"
                        filter="url(#softGlow)"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <circle cx="100" cy="250" r="38" fill="white" opacity="0.2" />
                      <foreignObject x="70" y="220" width="60" height="60">
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="material-icons text-white text-3xl drop-shadow-lg">precision_manufacturing</span>
                        </div>
                      </foreignObject>
                    </motion.g>
                    
                    {/* Central Hub - Processing */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    >
                      <motion.circle
                        cx="300" cy="250" r="55"
                        fill="url(#successGradient)"
                        filter="url(#softGlow)"
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 360]
                        }}
                        transition={{
                          scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                        }}
                      />
                      <circle cx="300" cy="250" r="48" fill="white" opacity="0.2" />
                      <foreignObject x="265" y="215" width="70" height="70">
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="material-icons text-white text-4xl drop-shadow-lg">hub</span>
                        </div>
                      </foreignObject>
                    </motion.g>
                    
                    {/* Destination Node - Delivery */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                    >
                      <motion.circle
                        cx="500" cy="250" r="45"
                        fill="url(#secondaryGradient)"
                        filter="url(#softGlow)"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      />
                      <circle cx="500" cy="250" r="38" fill="white" opacity="0.2" />
                      <foreignObject x="470" y="220" width="60" height="60">
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="material-icons text-white text-3xl drop-shadow-lg">storefront</span>
                        </div>
                      </foreignObject>
                    </motion.g>
                    
                    {/* Satellite features */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}
                    >
                      <circle cx="300" cy="100" r="35" fill="#F59E0B" opacity="0.8" filter="url(#softGlow)" />
                      <foreignObject x="275" y="75" width="50" height="50">
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="material-icons text-white text-2xl">local_shipping</span>
                        </div>
                      </foreignObject>
                    </motion.g>
                    
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                    >
                      <circle cx="300" cy="400" r="35" fill="#EF4444" opacity="0.8" filter="url(#softGlow)" />
                      <foreignObject x="275" y="375" width="50" height="50">
                        <div className="flex items-center justify-center w-full h-full">
                          <span className="material-icons text-white text-2xl">analytics</span>
                        </div>
                      </foreignObject>
                    </motion.g>
                  </g>
                  
                  {/* Data flow particles */}
                  <motion.circle
                    r="6"
                    fill="#3B82F6"
                    filter="url(#softGlow)"
                    animate={{
                      x: [100, 300, 500, 300, 100],
                      y: [250, 150, 250, 350, 250]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <animate attributeName="opacity" values="0;1;1;1;0" dur="6s" repeatCount="indefinite" />
                  </motion.circle>
                  
                  <motion.circle
                    r="6"
                    fill="#10B981"
                    filter="url(#softGlow)"
                    animate={{
                      x: [100, 300, 500],
                      y: [250, 350, 250]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <animate attributeName="opacity" values="0;1;1;1;0" dur="4s" repeatCount="indefinite" begin="1s" />
                  </motion.circle>
                  
                  <motion.circle
                    r="6"
                    fill="#8B5CF6"
                    filter="url(#softGlow)"
                    animate={{
                      x: [500, 300, 100],
                      y: [250, 100, 250]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  >
                    <animate attributeName="opacity" values="0;1;1;1;0" dur="5s" repeatCount="indefinite" begin="2s" />
                  </motion.circle>
                  
                  {/* Connection indicators */}
                  <g>
                    {[
                      { cx: 200, cy: 200 },
                      { cx: 400, cy: 200 },
                      { cx: 200, cy: 300 },
                      { cx: 400, cy: 300 }
                    ].map((pos, index) => (
                      <motion.circle
                        key={index}
                        cx={pos.cx}
                        cy={pos.cy}
                        r="10"
                        fill="#06B6D4"
                        opacity="0.6"
                        filter="url(#softGlow)"
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.4, 0.8, 0.4]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      />
                    ))}
                  </g>
                </svg>
                
                {/* Floating labels */}
                <motion.div
                  className="absolute top-0 left-0 px-3 py-1 bg-primary-500/10 backdrop-blur-sm rounded-full border border-primary-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <span className="text-xs font-medium text-primary-700 dark:text-primary-300">Real-time Tracking</span>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-0 right-0 px-3 py-1 bg-secondary-500/10 backdrop-blur-sm rounded-full border border-secondary-500/20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">AI Powered</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Dashboard Showcase Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-b from-background-light to-surface-light dark:from-background-dark dark:to-surface-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>
          
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              {/* Section Header */}
              <div className="text-center mb-16">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-full shadow-elevation-2 mb-6"
                >
                  <span className="material-icons text-primary-600 dark:text-primary-400">dashboard</span>
                  <span className="text-primary-700 dark:text-primary-400 font-medium">Powerful Dashboard</span>
                </motion.span>
                
                <h2 className="headline-3 font-heading mb-6">
                  See Everything at a
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"> Glance</span>
                </h2>
                <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium max-w-3xl mx-auto">
                  Our intuitive dashboard provides real-time insights into your entire supply chain, helping you make data-driven decisions instantly.
                </p>
              </div>
              
              {/* Large Dashboard Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative group"
              >
                {/* Background glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 rounded-3xl blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Main image container */}
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-primary-200/20 dark:border-primary-800/20">
                  <img
                    className="w-full h-auto"
                    src={DashboardImage}
                    alt="Locsafe Dashboard - Complete Supply Chain Visibility"
                    loading="eager"
                  />
                  
                  {/* Hover overlay with features */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-transparent flex items-end p-8 lg:p-12 pointer-events-none"
                  >
                    <div className="text-white">
                      <h3 className="headline-5 mb-3">Key Features</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          "Real-time Tracking",
                          "AI Analytics",
                          "Route Optimization",
                          "Inventory Management",
                          "Alert System",
                          "Performance Metrics"
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-2"
                          >
                            <span className="material-icons text-sm text-secondary-300">check_circle</span>
                            <span className="text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
              >
                {[
                  { icon: "speed", label: "Lightning Fast", value: "< 100ms" },
                  { icon: "security", label: "Secure", value: "256-bit SSL" },
                  { icon: "devices", label: "Responsive", value: "All Devices" },
                  { icon: "update", label: "Real-time", value: "Live Updates" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="text-center p-4 bg-surface-light dark:bg-surface-elevated-dark rounded-xl shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300"
                  >
                    <span className="material-icons text-3xl text-primary-500 mb-2">{item.icon}</span>
                    <p className="font-semibold text-sm mb-1">{item.label}</p>
                    <p className="text-xs text-on-surface-light-medium dark:text-on-surface-dark-medium">{item.value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 relative overflow-hidden">
          <div className="container mx-auto px-6 relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-surface-light dark:bg-surface-elevated-dark rounded-2xl p-6 text-center shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className={`material-icons text-3xl text-primary-600 dark:text-primary-400`} aria-hidden="true">
                      {stat.icon}
                    </span>
                  </div>
                  <div className="text-4xl font-heading font-bold mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-on-surface-light-medium dark:text-on-surface-dark-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-surface-light dark:bg-surface-dark">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="overline text-on-surface-light-medium dark:text-on-surface-dark-medium mb-2">
                Trusted by Industry Leaders
              </p>
              <h3 className="headline-4 font-heading mb-12">
                Powering Supply Chains for Global Enterprises
              </h3>
            </motion.div>
            
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center p-8 bg-surface-light dark:bg-surface-elevated-dark rounded-xl shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300"
                >
                  <img
                    src={Microsoft}
                    alt="Microsoft Partner"
                    className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 dark:brightness-200"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center p-8 bg-surface-light dark:bg-surface-elevated-dark rounded-xl shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300"
                >
                  <img
                    src={AWSLogo}
                    alt="AWS Partner"
                    className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 dark:brightness-200"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center p-8 bg-surface-light dark:bg-surface-elevated-dark rounded-xl shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300"
                >
                  <div className="text-2xl font-heading font-bold text-on-surface-light-medium dark:text-on-surface-dark-medium">
                    Oracle
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center p-8 bg-surface-light dark:bg-surface-elevated-dark rounded-xl shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300"
                >
                  <div className="text-2xl font-heading font-bold text-on-surface-light-medium dark:text-on-surface-dark-medium">
                    SAP
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Stats under partners with Material Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 mt-16 text-center"
              >
                <div>
                  <p className="text-4xl font-heading font-bold text-secondary-500">45+</p>
                  <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">Business Clients</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-bold text-primary-500">99.5%</p>
                  <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">Uptime SLA</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-bold text-info-500">24/7</p>
                  <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">Support Available</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section with Material Design Cards */}
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="overline text-secondary-600 dark:text-secondary-400 mb-4 block">
                FEATURES
              </span>
              <h2 className="headline-3 font-heading mb-6">
                Everything You Need for
                <span className="text-secondary-600 dark:text-secondary-400"> Modern Logistics</span>
              </h2>
              <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium">
                Comprehensive tools powered by cutting-edge blockchain and AI technology
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="h-full p-6 bg-surface-light dark:bg-surface-elevated-dark rounded-2xl shadow-elevation-1 hover:shadow-elevation-4 transition-all duration-300 overflow-hidden relative">
                    {/* Gradient accent in corner */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
                    
                    <div className="relative">
                      {/* Hybrid Icon Design */}
                      <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-elevation-2`}>
                        <span className="material-icons text-3xl text-white">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="headline-6 mb-3">{feature.title}</h3>
                      <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mb-4">
                        {feature.description}
                      </p>
                      <Link
                        to="#"
                        className={`inline-flex items-center text-${feature.color}-600 dark:text-${feature.color}-400 font-medium hover:gap-3 transition-all`}
                      >
                        Learn more
                        <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Product Passport Section with Material Design */}
        <section className="py-16 lg:py-24 relative bg-gradient-to-br from-primary-900 to-secondary-900 overflow-hidden">
          {/* Material Design Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              {/* Section Header */}
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 shadow-elevation-2"
                >
                  <span className="material-icons text-white animate-pulse">verified_user</span>
                  <span className="text-white font-medium">Revolutionary Technology</span>
                  <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">DPP</span>
                </motion.div>
                
                <h2 className="headline-2 font-heading text-white mb-6">
                  Digital Product Passports
                  <span className="block text-secondary-200 mt-2">
                    Complete Product Lifecycle Transparency
                  </span>
                </h2>
                <p className="body-1 text-white/90 max-w-3xl mx-auto">
                  Every product gets a unique digital identity on the blockchain, creating an immutable record from manufacturing to end-of-life, ensuring authenticity and compliance.
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Interactive Demo */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative bg-surface-dark/50 backdrop-blur-xl rounded-3xl p-8 shadow-elevation-5 border border-white/10">
                    {/* QR Code Scanner Animation */}
                    <motion.div
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="w-48 h-48 mx-auto mb-8 relative preserve-3d"
                    >
                      <div className="absolute inset-0 bg-secondary-500/20 rounded-2xl blur-xl"></div>
                      <div className="relative bg-white rounded-2xl p-6 shadow-elevation-5">
                        <span className="material-icons text-[120px] text-primary-900">qr_code_2</span>
                      </div>
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                        className="absolute -inset-4 border-2 border-secondary-400 rounded-2xl"
                      />
                    </motion.div>

                    {/* Product Info Cards */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 p-4 bg-primary-900/20 rounded-xl border border-primary-500/20"
                      >
                        <span className="material-icons text-2xl text-primary-300">fingerprint</span>
                        <div>
                          <p className="caption text-white/60">Product ID</p>
                          <p className="font-mono text-white">DPP-2025-XK9-7B2M</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4 p-4 bg-secondary-900/20 rounded-xl border border-secondary-500/20"
                      >
                        <span className="material-icons text-2xl text-secondary-300">workspace_premium</span>
                        <div>
                          <p className="caption text-white/60">Certification</p>
                          <p className="font-medium text-white">ISO 9001:2015 Verified</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4 p-4 bg-info-900/20 rounded-xl border border-info-500/20"
                      >
                        <span className="material-icons text-2xl text-info-300">history</span>
                        <div>
                          <p className="caption text-white/60">Lifecycle Stage</p>
                          <p className="font-medium text-white">In Transit - 72% Complete</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Features */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="grid gap-6">
                    {[
                      {
                        icon: 'qr_code',
                        title: "Unique Digital Identity",
                        description: "Every product receives a blockchain-verified digital passport with complete manufacturing details, certifications, and origin data.",
                        color: "primary"
                      },
                      {
                        icon: 'description',
                        title: "Regulatory Compliance",
                        description: "Automatically meet global compliance requirements with built-in documentation for customs, sustainability, and quality standards.",
                        color: "secondary"
                      },
                      {
                        icon: 'verified',
                        title: "Authenticity Verification",
                        description: "Instant verification prevents counterfeiting and ensures customers receive genuine products with complete transparency.",
                        color: "success"
                      },
                      {
                        icon: 'timeline',
                        title: "Complete Lifecycle Tracking",
                        description: "Track products from raw materials through manufacturing, distribution, use, and recycling with immutable blockchain records.",
                        color: "info"
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="group relative"
                      >
                        <div className="relative p-6 bg-surface-dark/30 backdrop-blur-sm rounded-2xl shadow-elevation-2 hover:shadow-elevation-4 border border-white/10 hover:border-white/20 transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-${feature.color}-600/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                              <span className={`material-icons text-xl text-${feature.color}-300`}>{feature.icon}</span>
                            </div>
                            <div>
                              <h3 className="headline-6 text-white mb-2">{feature.title}</h3>
                              <p className="body-2 text-white/70">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="pt-4"
                  >
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-3xl shadow-elevation-3 border border-white/10"
              >
                {[
                  { value: "12K+", label: "Digital Passports Issued" },
                  { value: "100%", label: "Traceability Coverage" },
                  { value: "15+", label: "Supported Standards" },
                  { value: "0.3s", label: "Verification Time" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <motion.p
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                      className="text-3xl font-heading font-bold text-secondary-300"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="caption text-white/60 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enterprise Clients Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-surface-light to-primary-50 dark:from-surface-dark dark:to-primary-900/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="overline text-secondary-600 dark:text-secondary-400 mb-4 block">
                ENTERPRISE CLIENTS
              </span>
              <h2 className="headline-3 font-heading mb-6">
                Trusted by Leading
                <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"> Enterprises</span>
              </h2>
              <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium">
                Industry leaders across East Africa rely on Locsafe for their supply chain operations
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {enterprises.map((enterprise, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group"
                  >
                    <div className="h-full p-6 bg-surface-light dark:bg-surface-elevated-dark rounded-2xl shadow-elevation-2 hover:shadow-elevation-4 transition-all duration-300 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-icons text-3xl text-primary-600 dark:text-primary-400">
                          {enterprise.icon}
                        </span>
                      </div>
                      <h3 className="headline-6 mb-2">{enterprise.name}</h3>
                      <p className="caption text-secondary-600 dark:text-secondary-400 font-medium mb-2">
                        {enterprise.industry}
                      </p>
                      <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium">
                        {enterprise.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Material Design */}
        <section className="py-16 lg:py-24 bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="overline text-primary-600 dark:text-primary-400 mb-4 block">
                FAQ
              </span>
              <h2 className="headline-3 font-heading mb-6">
                Frequently Asked
                <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"> Questions</span>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-surface-light dark:bg-surface-elevated-dark rounded-2xl shadow-elevation-2 hover:shadow-elevation-4 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors group"
                  >
                    <h3 className="headline-6 flex items-center gap-3">
                      <span className="material-icons text-primary-500 group-hover:scale-110 transition-transform">
                        help_outline
                      </span>
                      {faq.question}
                    </h3>
                    <div className="flex items-center gap-2">
                      {openFAQ === index ? (
                        <>
                          <FaChevronUp className="text-primary-500 transition-transform" />
                          <span className="material-icons text-primary-500">expand_less</span>
                        </>
                      ) : (
                        <>
                          <FaChevronDown className="text-on-surface-light-medium dark:text-on-surface-dark-medium transition-transform" />
                          <span className="material-icons text-on-surface-light-medium dark:text-on-surface-dark-medium">expand_more</span>
                        </>
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-8 pb-6"
                      >
                        <div className="pl-9">
                          <p className="body-1 text-on-surface-light-medium dark:text-on-surface-dark-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section with Material Design */}
        <section className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600">
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            />
          </div>
          
          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
                className="w-20 h-20 mx-auto mb-8 relative"
              >
                <FaRocket className="w-full h-full opacity-20" />
                <span className="material-icons absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                  rocket_launch
                </span>
              </motion.div>
              
              <h2 className="headline-2 font-heading mb-6">
                Ready to Transform Your Supply Chain?
              </h2>
              <p className="body-1 mb-10 text-white/90 text-xl">
                Join 45+ businesses already using Locsafe to transform their logistics operations
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="ripple inline-flex items-center justify-center px-10 py-5 bg-white text-primary-700 font-medium rounded-full shadow-elevation-5 hover:shadow-elevation-4 transition-all duration-300"
                  >
                    Get Started
                    <FaArrowRight className="ml-3" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="ripple inline-flex items-center justify-center px-10 py-5 bg-transparent text-white font-medium rounded-full border-2 border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                  >
                    <span className="material-icons mr-3">calendar_today</span>
                    Schedule a Demo
                  </Link>
                </motion.div>
              </div>
              
              <p className="mt-8 caption text-white/70">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default LandingPage;
