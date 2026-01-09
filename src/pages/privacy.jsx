import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaUserShield,
  FaLock,
  FaCookie,
  FaDatabase,
  FaUserLock,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowLeft,
  FaGlobe,
  FaServer,
  FaKey,
  FaExclamationTriangle,
  FaCheckCircle,
  FaRegClock,
  FaUsers
} from 'react-icons/fa';
import {
  HiOutlineDocumentText,
  HiOutlineBadgeCheck,
  HiOutlineFingerPrint,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlineUserGroup,
  HiOutlineCog
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import { useState } from 'react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('overview');

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

  const tableOfContents = [
    { id: 'overview', title: 'Overview', icon: FaInfoCircle },
    { id: 'information', title: 'Information We Collect', icon: FaDatabase },
    { id: 'usage', title: 'How We Use Your Data', icon: HiOutlineCog },
    { id: 'sharing', title: 'Data Sharing', icon: FaUsers },
    { id: 'security', title: 'Data Security', icon: FaShieldAlt },
    { id: 'cookies', title: 'Cookies & Tracking', icon: FaCookie },
    { id: 'rights', title: 'Your Rights', icon: FaUserShield },
    { id: 'retention', title: 'Data Retention', icon: FaRegClock },
    { id: 'children', title: 'Children\'s Privacy', icon: HiOutlineUserGroup },
    { id: 'changes', title: 'Policy Changes', icon: HiOutlineDocumentText },
    { id: 'contact', title: 'Contact Us', icon: FaEnvelope }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const privacyPrinciples = [
    {
      icon: HiOutlineLockClosed,
      title: "Privacy by Design",
      description: "Privacy is built into everything we do",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: HiOutlineFingerPrint,
      title: "Minimal Collection",
      description: "We only collect what's necessary",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Maximum Protection",
      description: "Bank-grade security for your data",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: HiOutlineBadgeCheck,
      title: "Full Transparency",
      description: "Clear about how we use your data",
      color: "from-orange-500 to-red-500"
    }
  ];

  const dataTypes = [
    {
      category: "Account Information",
      items: ["Name and contact details", "Company information", "Payment information", "Account credentials"],
      icon: FaUserLock,
      color: "text-blue-500"
    },
    {
      category: "Asset Data",
      items: ["Asset locations", "Movement history", "Asset metadata", "Sensor readings"],
      icon: FaDatabase,
      color: "text-green-500"
    },
    {
      category: "Usage Information",
      items: ["Service interactions", "Feature usage", "Performance data", "Error reports"],
      icon: HiOutlineCog,
      color: "text-purple-500"
    },
    {
      category: "Device Information",
      items: ["IP addresses", "Browser type", "Device identifiers", "Operating system"],
      icon: FaServer,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-16" itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>Privacy Policy | Data Protection & GDPR Compliance - Locsafe</title>
        <meta
          name="description"
          content="Learn how Locsafe protects your privacy with bank-grade encryption, GDPR compliance, and transparent data practices. We never sell your personal data. Effective October 2025."
        />
        <meta name="keywords" content="privacy policy, data protection, GDPR compliance, data security, locsafe privacy, information security, user data" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/privacy" />
        <meta property="og:title" content="Privacy Policy - Locsafe" />
        <meta property="og:description" content="Learn how Locsafe protects your privacy with bank-grade encryption and GDPR compliance." />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy - Locsafe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://locsafe.org/privacy" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "Locsafe Privacy Policy - Data Protection and GDPR Compliance",
            "url": "https://locsafe.org/privacy",
            "publisher": {
              "@type": "Organization",
              "name": "Locsafe"
            },
            "dateModified": "2025-10-02",
            "about": {
              "@type": "Thing",
              "name": "Data Protection",
              "description": "How Locsafe handles and protects user data"
            }
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
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          </motion.div>

          <div className="relative container mx-auto px-4 py-20 lg:py-28">
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30 mb-6"
              >
                <FaShieldAlt className="text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Your Privacy Matters</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                Protecting your data is our top priority
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt />
                  Effective: October 2, 2025
                </span>
                <span className="hidden md:block">•</span>
                <span className="flex items-center gap-2">
                  <HiOutlineBadgeCheck />
                  GDPR Compliant
                </span>
                <span className="hidden md:block">•</span>
                <span className="flex items-center gap-2">
                  <FaGlobe />
                  Global Standards
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Principles */}
        <section className="container mx-auto px-4 py-12 -mt-16 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {privacyPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-slate-200"
              >
                <div className={`inline-flex p-3 bg-gradient-to-r ${principle.color} rounded-lg shadow-lg mb-4`}>
                  <principle.icon className="text-2xl text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{principle.title}</h3>
                <p className="text-sm text-slate-600">{principle.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1">
                <FaArrowLeft className="text-xs" />
                Home
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-medium">Privacy Policy</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents - Sticky Sidebar */}
            <motion.aside
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-20 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <HiOutlineDocumentText className="text-purple-500" />
                  Quick Navigation
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((section) => (
                    <motion.button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      whileHover={{ x: 5 }}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <section.icon className="text-sm flex-shrink-0" />
                      <span className="text-sm">{section.title}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.aside>

            {/* Privacy Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 space-y-8"
            >
              {/* Overview */}
              <motion.section
                id="overview"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <FaInfoCircle className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Privacy Overview</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    At Locsafe™, we understand that your privacy is important. This Privacy Policy explains how we collect, 
                    use, disclose, and safeguard your information when you use our asset tracking and supply chain management platform.
                  </p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                    <h3 className="text-purple-900 font-semibold mb-2">Our Commitment</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-purple-500 mt-1 flex-shrink-0" />
                        <span>We never sell your personal data to third parties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-purple-500 mt-1 flex-shrink-0" />
                        <span>We use industry-standard encryption to protect your data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-purple-500 mt-1 flex-shrink-0" />
                        <span>You have full control over your personal information</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Information We Collect */}
              <motion.section
                id="information"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <FaDatabase className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Information We Collect</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-slate-600 leading-relaxed">
                    We collect information to provide better services to our users. The types of information we collect include:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {dataTypes.map((type, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                          <type.icon className={`text-xl ${type.color}`} />
                          <h4 className="font-semibold text-slate-900">{type.category}</h4>
                        </div>
                        <ul className="space-y-1 text-sm text-slate-600">
                          {type.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-slate-400 mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* How We Use Your Data */}
              <motion.section
                id="usage"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <HiOutlineCog className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">How We Use Your Data</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    We use the information we collect for the following purposes:
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-green-900 mb-3">Service Delivery</h4>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>• Provide asset tracking services</li>
                          <li>• Process transactions</li>
                          <li>• Send service notifications</li>
                          <li>• Maintain your account</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-900 mb-3">Service Improvement</h4>
                        <ul className="space-y-2 text-sm text-slate-700">
                          <li>• Analyze usage patterns</li>
                          <li>• Develop new features</li>
                          <li>• Improve user experience</li>
                          <li>• Provide customer support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Data Sharing */}
              <motion.section
                id="sharing"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FaUsers className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Data Sharing & Disclosure</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h3 className="font-semibold text-indigo-900 mb-3">We may share your data with:</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-indigo-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-800">Service Providers</p>
                          <p className="text-sm text-slate-600">Trusted partners who help us operate our services</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-indigo-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-800">Legal Requirements</p>
                          <p className="text-sm text-slate-600">When required by law or to protect rights</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaCheckCircle className="text-indigo-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-800">With Your Consent</p>
                          <p className="text-sm text-slate-600">Only when you explicitly authorize us</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-900 font-medium">
                      <FaExclamationTriangle className="inline mr-2" />
                      We NEVER sell your personal data to third parties
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Data Security */}
              <motion.section
                id="security"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                    <FaShieldAlt className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Data Security</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    We implement robust security measures to protect your data:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <FaLock className="text-teal-600 text-xl mb-2" />
                      <h4 className="font-semibold text-slate-900 mb-2">Encryption</h4>
                      <p className="text-sm text-slate-600">256-bit SSL/TLS encryption for data in transit and AES-256 for data at rest</p>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <FaKey className="text-teal-600 text-xl mb-2" />
                      <h4 className="font-semibold text-slate-900 mb-2">Access Control</h4>
                      <p className="text-sm text-slate-600">Strict access controls and multi-factor authentication</p>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <FaServer className="text-teal-600 text-xl mb-2" />
                      <h4 className="font-semibold text-slate-900 mb-2">Infrastructure</h4>
                      <p className="text-sm text-slate-600">Secure data centers with 24/7 monitoring</p>
                    </div>
                    <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                      <HiOutlineBadgeCheck className="text-teal-600 text-xl mb-2" />
                      <h4 className="font-semibold text-slate-900 mb-2">Compliance</h4>
                      <p className="text-sm text-slate-600">ISO 27001 certified and GDPR compliant</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Contact Information */}
              <motion.section
                id="contact"
                variants={itemVariants}
                className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg p-8 text-white"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold">Contact Our Privacy Team</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-white/90">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h3 className="font-semibold mb-3">Privacy Office</h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <FaEnvelope className="text-white/80" />
                          privacy@locsafe.org
                        </p>
                        <p className="flex items-center gap-2">
                          <FaPhone className="text-white/80" />
                          +254 (0) 700 000 000
                        </p>
                        <p className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-white/80" />
                          Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h3 className="font-semibold mb-3">Data Protection Officer</h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <FaUserShield className="text-white/80" />
                          DPO@locsafe.org
                        </p>
                        <p className="flex items-center gap-2">
                          <HiOutlineBadgeCheck className="text-white/80" />
                          GDPR Inquiries
                        </p>
                        <p className="flex items-center gap-2">
                          <FaGlobe className="text-white/80" />
                          www.locsafe.org/privacy
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Agreement Notice */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl p-6 border border-slate-200 text-center"
              >
                <p className="text-slate-600 text-sm">
                  By continuing to use Locsafe™, you acknowledge that you have read and understood this Privacy Policy.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <Link
                    to="/terms"
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    Terms of Service →
                  </Link>
                  <span className="text-slate-400">|</span>
                  <Link
                    to="/contact"
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    Contact Support →
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default PrivacyPolicy;