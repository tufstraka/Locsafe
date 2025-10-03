
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaLock, FaNetworkWired, FaBell, FaChartLine, FaArrowRight, FaQuoteLeft, FaStar, FaPlay, FaUsers, FaShieldAlt, FaTruck, FaGlobe, FaRocket, FaChevronDown, FaChevronUp, FaQrcode, FaHistory, FaCheckCircle, FaFingerprint, FaCertificate, FaBarcode } from 'react-icons/fa';
import { HiLightningBolt, HiSparkles, HiCube, HiChip, HiDocumentText, HiShieldCheck } from 'react-icons/hi';
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

  // Parallax transformations
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

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
    { value: 10000, suffix: '+', label: 'Active Shipments Daily', icon: FaTruck },
    { value: 98, suffix: '%', label: 'Delivery Accuracy', icon: FaShieldAlt },
    { value: 500, suffix: '+', label: 'Enterprise Clients', icon: FaUsers },
    { value: 150, suffix: '+', label: 'Countries Covered', icon: FaGlobe }
  ];

  const features = [
    {
      icon: FaMapMarkerAlt,
      title: "Global Traceability",
      description: "Track your products and assets at every stage, from production to delivery with pinpoint accuracy.",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: FaLock,
      title: "Enhanced Security",
      description: "Immutable blockchain records that reduce fraud risks and increase accountability across the supply chain.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: FaBell,
      title: "Smart Alerts",
      description: "Get instant AI-powered notifications for any supply chain discrepancies or important updates.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FaNetworkWired,
      title: "Decentralized Network",
      description: "Maintain complete transparency across global supply chains without central authority dependency.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: FaChartLine,
      title: "Advanced Analytics",
      description: "Gain actionable insights with AI-powered supply chain analytics and predictive modeling.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: FaCalendarAlt,
      title: "Custom Workflows",
      description: "Set up personalized notification rules and workflows based on your specific business needs.",
      gradient: "from-indigo-500 to-purple-500"
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
    <main className="relative min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-x-hidden" role="main">
      <Helmet>
        <title>Locsafe - Next-Gen Supply Chain Intelligence Platform</title>
        <meta
          name="description"
          content="Transform your supply chain with AI-powered blockchain technology. Real-time tracking, predictive analytics, and complete transparency for modern logistics."
        />
      </Helmet>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>

      <ToastContainer position="top-left" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />

      {/* Animated Background Elements - More Subtle */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Progress Bar - Solid Color */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-teal-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative z-10">
        <Header />
        
        {/* Hero Section with Parallax */}
        <motion.section 
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-4 pt-32 pb-20 relative"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-full"
              >
                <HiSparkles className="text-teal-600 dark:text-teal-400 animate-pulse" />
                <span className="text-teal-700 dark:text-teal-400 text-sm font-semibold">AI-Powered Supply Chain Intelligence</span>
                <span className="px-2 py-0.5 bg-teal-500 text-white text-xs font-bold rounded-full">NEW</span>
              </motion.div>
              
              <motion.h1
                variants={itemVariants}
                className="text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight"
                role="heading"
                aria-level="1"
              >
                The Future of
                <span className="block text-teal-600 dark:text-teal-400">
                  Supply Chain
                </span>
                <span className="block">Intelligence</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed"
              >
                Harness the power of blockchain and AI to create unprecedented transparency, security, and efficiency in your global supply chain operations.
              </motion.p>
              
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: FaShieldAlt, text: "Bank-Grade Security" },
                    { icon: HiLightningBolt, text: "Real-Time Tracking" },
                    { icon: HiChip, text: "AI Analytics" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50"
                    >
                      <item.icon className="text-teal-500" />
                      <span className="font-medium text-sm">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/register"
                      className="group relative inline-flex items-center justify-center px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      aria-label="Start your free trial"
                      role="button"
                    >
                      <span className="flex items-center gap-2">
                        Start Free Trial
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </span>
                    </Link>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="#demo"
                      className="group inline-flex items-center justify-center px-8 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                      aria-label="Watch product demo"
                      role="button"
                    >
                      <FaPlay className="mr-2 text-teal-500 group-hover:scale-110 transition-transform" aria-hidden="true" />
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
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/40?img=${i}`}
                        alt={`Customer ${i}`}
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800"
                        loading="lazy"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Trusted by <span className="font-bold text-slate-900 dark:text-white">10,000+</span> businesses
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="absolute inset-0 bg-teal-500/10 rounded-3xl blur-3xl" />
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <img
                  className="w-full relative z-10 drop-shadow-2xl rounded-2xl"
                  src={DashboardImage}
                  alt="Locsafe Supply Chain Dashboard"
                />
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-10 right-10 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold">Live Tracking</span>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                  className="absolute bottom-10 left-10 px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <HiCube className="text-teal-500" />
                    <span className="text-sm font-semibold">Blockchain Secured</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Stats Section with Counter Animation */}
        <section className="py-20 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                  <div className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section - Improved Layout */}
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 tracking-wider uppercase">
                Trusted by Industry Leaders
              </p>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-12">
                Powering Supply Chains for Global Enterprises
              </h3>
            </motion.div>
            
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center"
              >
                {/* Partner Logo Cards */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={Microsoft}
                    alt="Microsoft Partner"
                    className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 dark:brightness-200"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={AWSLogo}
                    alt="AWS Partner"
                    className="h-8 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 dark:brightness-200"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-slate-400">
                    Oracle
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-slate-400">
                    SAP
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Stats under partners */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 mt-12 text-center"
              >
                <div>
                  <p className="text-3xl font-bold text-teal-500">500+</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Enterprise Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-500">99.9%</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Uptime SLA</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-500">24/7</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Support Available</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section with 3D Cards */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-sm font-bold rounded-full mb-4">
                FEATURES
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Everything You Need for
                <span className="text-teal-600 dark:text-teal-400"> Modern Logistics</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Comprehensive tools powered by cutting-edge blockchain and AI technology
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="relative p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full -mr-16 -mt-16`}></div>
                    <div className="relative">
                      <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="text-2xl text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-4">{feature.description}</p>
                      <Link to="#" className="inline-flex items-center text-teal-500 font-semibold group-hover:gap-2 transition-all">
                        Learn more
                        <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Product Passport Section - NEW */}
        <section className="py-24 relative bg-slate-900 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-500/10"></div>
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative">
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-full mb-6"
                >
                  <HiShieldCheck className="text-purple-400 animate-pulse" />
                  <span className="text-purple-300 text-sm font-semibold">Revolutionary Technology</span>
                  <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full">DPP</span>
                </motion.div>
                
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Digital Product Passports
                  <span className="block text-purple-400 mt-2">
                    Complete Product Lifecycle Transparency
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
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
                  <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
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
                      <div className="absolute inset-0 bg-purple-500/20 rounded-2xl blur-xl"></div>
                      <div className="relative bg-white rounded-2xl p-6 shadow-2xl">
                        <FaQrcode className="w-full h-full text-slate-900" />
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
                        className="absolute -inset-4 border-2 border-purple-500 rounded-2xl"
                      />
                    </motion.div>

                    {/* Product Info Cards */}
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 p-4 bg-purple-900/20 rounded-xl border border-purple-500/20"
                      >
                        <FaFingerprint className="text-2xl text-purple-400" />
                        <div>
                          <p className="text-sm text-slate-400">Product ID</p>
                          <p className="font-mono text-white">DPP-2024-XK9-7B2M</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4 p-4 bg-teal-900/20 rounded-xl border border-teal-500/20"
                      >
                        <FaCertificate className="text-2xl text-teal-400" />
                        <div>
                          <p className="text-sm text-slate-400">Certification</p>
                          <p className="font-semibold text-white">ISO 9001:2015 Verified</p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4 p-4 bg-blue-900/20 rounded-xl border border-blue-500/20"
                      >
                        <FaHistory className="text-2xl text-blue-400" />
                        <div>
                          <p className="text-sm text-slate-400">Lifecycle Stage</p>
                          <p className="font-semibold text-white">In Transit - 72% Complete</p>
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
                        icon: FaBarcode,
                        title: "Unique Digital Identity",
                        description: "Every product receives a blockchain-verified digital passport with complete manufacturing details, certifications, and origin data.",
                        color: "from-purple-500 to-pink-500"
                      },
                      {
                        icon: HiDocumentText,
                        title: "Regulatory Compliance",
                        description: "Automatically meet global compliance requirements with built-in documentation for customs, sustainability, and quality standards.",
                        color: "from-teal-500 to-green-500"
                      },
                      {
                        icon: FaCheckCircle,
                        title: "Authenticity Verification",
                        description: "Instant verification prevents counterfeiting and ensures customers receive genuine products with complete transparency.",
                        color: "from-blue-500 to-cyan-500"
                      },
                      {
                        icon: FaHistory,
                        title: "Complete Lifecycle Tracking",
                        description: "Track products from raw materials through manufacturing, distribution, use, and recycling with immutable blockchain records.",
                        color: "from-orange-500 to-red-500"
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
                        <div className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                              <feature.icon className="text-xl text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                              <p className="text-slate-400">{feature.description}</p>
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
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <span>Explore Digital Passports</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
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
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 p-8 bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-purple-500/10"
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
                      className="text-3xl font-bold text-purple-400"
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="py-24 bg-slate-50 dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-sm font-bold rounded-full mb-4">
                TESTIMONIALS
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Loved by Teams
                <span className="text-teal-600 dark:text-teal-400"> Worldwide</span>
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 lg:p-12"
                  >
                    <FaQuoteLeft className="text-4xl text-teal-500/20 mb-6" />
                    <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                      {testimonials[activeTestimonial].content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          className="w-14 h-14 rounded-full"
                        />
                        <div>
                          <h4 className="font-bold">{testimonials[activeTestimonial].name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {testimonials[activeTestimonial].role}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                          <FaStar key={i} className="w-5 h-5 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeTestimonial
                          ? 'w-8 bg-teal-500'
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-sm font-bold rounded-full mb-4">
                FAQ
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Frequently Asked
                <span className="text-teal-600 dark:text-teal-400"> Questions</span>
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
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <h3 className="font-bold text-lg">{faq.question}</h3>
                    {openFAQ === index ? (
                      <FaChevronUp className="text-teal-500" />
                    ) : (
                      <FaChevronDown className="text-slate-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFAQ === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-8 pb-6"
                      >
                        <p className="text-slate-600 dark:text-slate-300">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Elegant Minimal */}
        <section className="py-24 relative overflow-hidden bg-teal-600 dark:bg-teal-700">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-8"
              >
                <FaRocket className="w-full h-full opacity-20" />
              </motion.div>
              <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                Ready to Transform Your Supply Chain?
              </h2>
              <p className="text-xl mb-10 text-white/90">
                Join thousands of companies already using Locsafe to revolutionize their logistics
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-900 font-bold rounded-xl shadow-2xl hover:shadow-white/20 transition-all duration-300"
                  >
                    Start Your Free Trial
                    <FaArrowRight className="ml-2" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-10 py-5 bg-transparent text-white font-bold rounded-xl border-2 border-white/50 hover:bg-white/10 transition-all duration-300"
                  >
                    Schedule a Demo
                  </Link>
                </motion.div>
              </div>
              <p className="mt-8 text-sm text-white/70">
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
