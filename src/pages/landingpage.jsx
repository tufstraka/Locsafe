
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaRocket, FaStar, FaChevronDown, FaChevronUp, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiChip } from 'react-icons/hi';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import DashboardImage from '/Locsafe-Dashboard.png';
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);

  // Parallax transformations with Material Motion
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Supply Chain Director, TechCorp",
      content: "Locsafe transformed our entire supply chain operation. The blockchain transparency has reduced disputes by 87% and increased customer trust dramatically.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Rodriguez",
      role: "CEO, Global Logistics Inc",
      content: "The AI-powered analytics have given us insights we never had before. We've optimized routes and reduced costs by 45% in just 6 months.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3"
    },
    {
      name: "Emma Williams",
      role: "Operations Manager, FastShip",
      content: "Real-time tracking and smart alerts have revolutionized how we manage our fleet. Customer satisfaction is at an all-time high.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=5"
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
    { value: 10000, suffix: '+', label: 'Active Shipments Daily', icon: 'local_shipping', isMaterial: true },
    { value: 98, suffix: '%', label: 'Delivery Accuracy', icon: 'verified_user', isMaterial: true },
    { value: 500, suffix: '+', label: 'Enterprise Clients', icon: 'business', isMaterial: true },
    { value: 150, suffix: '+', label: 'Countries Covered', icon: 'public', isMaterial: true }
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

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <main className="relative min-h-screen bg-background-light dark:bg-background-dark text-on-surface-light dark:text-on-surface-dark overflow-x-hidden" role="main">
      <Helmet>
        <title>Locsafe - Supply Chain Intelligence Platform</title>
        <meta
          name="description"
          content="Transform your supply chain with AI-powered blockchain technology. Real-time tracking, predictive analytics, and complete transparency for modern logistics."
        />
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

      {/* Material Design Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-30 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, var(--md-primary) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, var(--md-secondary) 0%, transparent 50%)`,
          filter: 'blur(100px)',
        }} />
      </div>

      {/* Progress Bar with Material Design */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 z-50 origin-left shadow-elevation-2"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative z-10">
        <Header />
        
        {/* Hero Section with Material Design */}
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-6 pt-32 pb-24 relative"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center"
          >
            <div className="space-y-8">
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
              
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex flex-wrap gap-3">
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

                <div className="flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/register"
                      className="group ripple relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300"
                      aria-label="Start your free trial"
                      role="button"
                    >
                      <span className="flex items-center gap-3">
                        Start Free Trial
                        <span className="material-icons text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="#demo"
                      className="group ripple inline-flex items-center justify-center px-8 py-4 bg-surface-light dark:bg-surface-elevated-dark text-on-surface-light dark:text-on-surface-dark font-medium rounded-full shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 border border-primary-200 dark:border-primary-800"
                      aria-label="Watch product demo"
                      role="button"
                    >
                      <span className="material-icons mr-3 text-primary-500 group-hover:scale-110 transition-transform">play_circle</span>
                      Watch Demo
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-6 pt-8"
                >
                  <div className="flex -space-x-3">
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
                  <div className="flex flex-col">
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
                      Trusted by <span className="font-semibold text-on-surface-light dark:text-on-surface-dark">10,000+</span> businesses
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl" />
                <img
                  className="w-full relative z-10 rounded-2xl shadow-elevation-5"
                  src={DashboardImage}
                  alt="Locsafe Supply Chain Dashboard"
                />
                {/* Material Design Floating Action Cards */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-8 right-8 px-5 py-3 bg-surface-light/95 dark:bg-surface-elevated-dark/95 backdrop-blur-md rounded-xl shadow-elevation-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse shadow-elevation-1"></div>
                    <span className="font-medium">Live Tracking</span>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                  className="absolute bottom-8 left-8 px-5 py-3 bg-surface-light/95 dark:bg-surface-elevated-dark/95 backdrop-blur-md rounded-xl shadow-elevation-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-icons text-secondary-500">deployed_code</span>
                    <span className="font-medium">Blockchain Secured</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Stats Section with Material Design Cards */}
        <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 relative overflow-hidden">
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

        {/* Partners Section with Material Design */}
        <section className="py-24 bg-surface-light dark:bg-surface-dark">
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
                {/* Partner Logo Cards with Material Design */}
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
                  <p className="text-4xl font-heading font-bold text-secondary-500">500+</p>
                  <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">Enterprise Clients</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-bold text-primary-500">99.9%</p>
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
        <section className="py-24 relative bg-background-light dark:bg-background-dark">
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
        <section className="py-24 relative bg-gradient-to-br from-primary-900 to-secondary-900 overflow-hidden">
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
                          <p className="font-mono text-white">DPP-2024-XK9-7B2M</p>
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
                    <Link
                      to="/features"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-medium rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-300"
                    >
                      <span>Explore Digital Passports</span>
                      <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Bottom Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-3xl shadow-elevation-3 border border-white/10"
              >
                {[
                  { value: "1M+", label: "Digital Passports Issued" },
                  { value: "100%", label: "Traceability Coverage" },
                  { value: "50+", label: "Supported Standards" },
                  { value: "0.1s", label: "Verification Time" }
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

        {/* Testimonials Carousel with Material Design */}
        <section className="py-24 bg-gradient-to-br from-surface-light to-primary-50 dark:from-surface-dark dark:to-primary-900/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="overline text-secondary-600 dark:text-secondary-400 mb-4 block">
                TESTIMONIALS
              </span>
              <h2 className="headline-3 font-heading mb-6">
                Loved by Teams
                <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"> Worldwide</span>
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.95 }}
                    className="bg-surface-light dark:bg-surface-elevated-dark rounded-3xl shadow-elevation-4 p-8 lg:p-12"
                  >
                    <div className="flex items-start gap-2 mb-6">
                      <FaQuoteLeft className="text-4xl text-secondary-500/20" />
                      <span className="material-icons text-4xl text-secondary-500/20">format_quote</span>
                    </div>
                    <p className="body-1 text-on-surface-light dark:text-on-surface-dark mb-8 leading-relaxed text-lg">
                      {testimonials[activeTestimonial].content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          className="w-14 h-14 rounded-full shadow-elevation-2"
                        />
                        <div>
                          <h4 className="headline-6">{testimonials[activeTestimonial].name}</h4>
                          <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium">
                            {testimonials[activeTestimonial].role}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <FaStar className="w-5 h-5 text-warning-500" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Material Design Pagination Dots */}
                <div className="flex justify-center gap-3 mt-8">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveTestimonial(index)}
                      className={`transition-all duration-300 ${
                        index === activeTestimonial
                          ? 'w-8 h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full shadow-elevation-2'
                          : 'w-3 h-3 bg-primary-200 dark:bg-primary-800 rounded-full'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Material Design */}
        <section className="py-24 bg-background-light dark:bg-background-dark">
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
        <section className="py-24 relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600">
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
                Join thousands of companies already using Locsafe to revolutionize their logistics
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="ripple inline-flex items-center justify-center px-10 py-5 bg-white text-primary-700 font-medium rounded-full shadow-elevation-5 hover:shadow-elevation-4 transition-all duration-300"
                  >
                    Start Your Free Trial
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
