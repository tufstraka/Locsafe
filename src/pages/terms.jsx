import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt,
  FaUserShield,
  FaLock,
  FaBalanceScale,
  FaHandshake,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowLeft
} from 'react-icons/fa';
import { 
  HiOutlineDocumentText,
  HiOutlineBadgeCheck,
  HiOutlineGlobe,
  HiOutlineScale
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import { useState } from 'react';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('introduction');

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
    { id: 'introduction', title: 'Introduction', icon: FaInfoCircle },
    { id: 'acceptance', title: 'Acceptance of Terms', icon: FaCheckCircle },
    { id: 'services', title: 'Services Description', icon: HiOutlineGlobe },
    { id: 'account', title: 'Account Terms', icon: FaUserShield },
    { id: 'privacy', title: 'Privacy & Data', icon: FaLock },
    { id: 'payment', title: 'Payment Terms', icon: FaBalanceScale },
    { id: 'intellectual', title: 'Intellectual Property', icon: HiOutlineBadgeCheck },
    { id: 'liability', title: 'Limitation of Liability', icon: FaExclamationTriangle },
    { id: 'termination', title: 'Termination', icon: HiOutlineDocumentText },
    { id: 'contact', title: 'Contact Information', icon: FaEnvelope }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50" itemScope itemType="https://schema.org/WebPage">
      <Helmet>
        <title>Terms of Service | Legal Agreement - Locsafe</title>
        <meta
          name="description"
          content="Read Locsafe's Terms of Service to understand your rights and responsibilities when using our asset tracking and supply chain management platform. Last updated October 2025."
        />
        <meta name="keywords" content="terms of service, locsafe terms, user agreement, service agreement, legal terms, asset tracking terms" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/terms" />
        <meta property="og:title" content="Terms of Service - Locsafe" />
        <meta property="og:description" content="Read our Terms of Service to understand your rights and responsibilities when using Locsafe." />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service - Locsafe" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://locsafe.org/terms" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service",
            "description": "Locsafe Terms of Service and User Agreement",
            "url": "https://locsafe.org/terms",
            "publisher": {
              "@type": "Organization",
              "name": "Locsafe"
            },
            "dateModified": "2025-10-02"
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
            <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full border border-teal-500/30 mb-6"
              >
                <HiOutlineScale className="text-teal-400" />
                <span className="text-sm font-medium text-teal-300">Legal Agreement</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-xl text-slate-300 mb-6">
                Please read these terms carefully before using our services
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <FaCalendarAlt />
                  Last Updated: October 2, 2025
                </span>
                <span className="hidden md:block">•</span>
                <span className="flex items-center gap-2">
                  <HiOutlineDocumentText />
                  Version 2.0
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-slate-600 hover:text-teal-600 transition-colors flex items-center gap-1">
                <FaArrowLeft className="text-xs" />
                Home
              </Link>
              <span className="text-slate-400">/</span>
              <span className="text-slate-900 font-medium">Terms of Service</span>
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
                  <HiOutlineDocumentText className="text-teal-500" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((section) => (
                    <motion.button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      whileHover={{ x: 5 }}
                      className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg'
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

            {/* Terms Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3 space-y-8"
            >
              {/* Introduction */}
              <motion.section
                id="introduction"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <FaInfoCircle className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Introduction</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    Welcome to Locsafe™ (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) 
                    govern your use of our asset tracking and supply chain management platform, including our website, 
                    mobile applications, and related services (collectively, the &quot;Services&quot;).
                  </p>
                  <p className="text-slate-600 leading-relaxed mt-4">
                    By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any 
                    part of these terms, then you may not access the Services.
                  </p>
                </div>
              </motion.section>

              {/* Acceptance of Terms */}
              <motion.section
                id="acceptance"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <FaCheckCircle className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Acceptance of Terms</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">By using our Services, you confirm that:</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span>You are at least 18 years of age or have parental consent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span>You have the legal capacity to enter into binding contracts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span>You are not prohibited from using our Services under applicable laws</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                        <span>You will comply with all applicable laws and regulations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Services Description */}
              <motion.section
                id="services"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <HiOutlineGlobe className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Services Description</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    Locsafe™ provides a comprehensive asset tracking and supply chain management platform that includes:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Core Services</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>• Real-time GPS asset tracking</li>
                        <li>• Digital Product Passports</li>
                        <li>• Supply chain analytics</li>
                        <li>• Geofencing capabilities</li>
                      </ul>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Additional Features</h4>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>• Mobile applications</li>
                        <li>• API integrations</li>
                        <li>• Custom reporting</li>
                        <li>• 24/7 customer support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Account Terms */}
              <motion.section
                id="account"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FaUserShield className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Account Terms</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900 mb-3">Account Responsibilities</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">1.</span>
                        <span>You are responsible for maintaining the confidentiality of your account credentials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">2.</span>
                        <span>You must provide accurate and complete information during registration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">3.</span>
                        <span>You are responsible for all activities that occur under your account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">4.</span>
                        <span>You must notify us immediately of any unauthorized use of your account</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Privacy & Data */}
              <motion.section
                id="privacy"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <FaLock className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Privacy & Data Protection</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by reference, 
                    explains how we collect, use, and protect your information.
                  </p>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h3 className="font-semibold text-indigo-900 mb-2">Data Security Measures</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-700">
                        <FaShieldAlt className="text-indigo-500" />
                        <span>256-bit encryption</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <FaLock className="text-indigo-500" />
                        <span>Secure data centers</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <FaUserShield className="text-indigo-500" />
                        <span>GDPR compliant</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <HiOutlineBadgeCheck className="text-indigo-500" />
                        <span>ISO 27001 certified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Payment Terms */}
              <motion.section
                id="payment"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <FaBalanceScale className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Payment Terms</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-900 mb-3">Billing & Payments</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li>• Subscription fees are billed in advance on a monthly or annual basis</li>
                      <li>• All fees are non-refundable unless otherwise stated</li>
                      <li>• You authorize us to charge your payment method for all fees</li>
                      <li>• Prices may change with 30 days&apos; notice</li>
                      <li>• Late payments may result in service suspension</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-sm text-slate-600">
                      <strong>Payment Methods:</strong> We accept major credit cards, debit cards, and M-Pesa payments. 
                      All payment processing is handled by secure third-party payment processors.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Intellectual Property */}
              <motion.section
                id="intellectual"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                    <HiOutlineBadgeCheck className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Intellectual Property Rights</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    All content, features, and functionality of our Services, including but not limited to text, graphics, 
                    logos, icons, images, audio clips, digital downloads, data compilations, and software, are the exclusive 
                    property of Locsafe™ or its licensors and are protected by intellectual property laws.
                  </p>
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <h3 className="font-semibold text-teal-900 mb-2">Permitted Uses</h3>
                    <p className="text-slate-700">
                      You may access and use the Services for your internal business purposes only. You may not:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      <li>• Copy, modify, or distribute our content without permission</li>
                      <li>• Use our trademarks without written consent</li>
                      <li>• Reverse engineer or attempt to extract source code</li>
                      <li>• Use the Services for any unlawful purpose</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Limitation of Liability */}
              <motion.section
                id="liability"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <FaExclamationTriangle className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Limitation of Liability</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">Disclaimer</h3>
                    <p className="text-slate-700 text-sm">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, LOCSAFE™ SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                      SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, 
                      USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                    </p>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Our total liability to you for any damages arising out of or related to these Terms or the Services 
                    will not exceed the amount you have paid to us in the twelve (12) months preceding the claim.
                  </p>
                </div>
              </motion.section>

              {/* Termination */}
              <motion.section
                id="termination"
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl flex items-center justify-center">
                    <HiOutlineDocumentText className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Termination</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    These Terms remain in effect until terminated by either party. You may terminate your account at any 
                    time by contacting us or through your account settings.
                  </p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">We may terminate or suspend your account if:</h3>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li>• You violate these Terms</li>
                      <li>• You engage in fraudulent or illegal activities</li>
                      <li>• You fail to pay applicable fees</li>
                      <li>• We discontinue the Services</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Contact Information */}
              <motion.section
                id="contact"
                variants={itemVariants}
                className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl shadow-lg p-8 text-white"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-white/90">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h3 className="font-semibold mb-3">Legal Department</h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <FaEnvelope className="text-white/80" />
                          legal@locsafe.org
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
                      <h3 className="font-semibold mb-3">Support</h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <FaEnvelope className="text-white/80" />
                          support@locsafe.org
                        </p>
                        <p className="flex items-center gap-2">
                          <FaHandshake className="text-white/80" />
                          24/7 Customer Support
                        </p>
                        <p className="flex items-center gap-2">
                          <HiOutlineGlobe className="text-white/80" />
                          www.locsafe.org
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
                  By continuing to use Locsafe™, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <Link
                    to="/privacy"
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm"
                  >
                    Privacy Policy →
                  </Link>
                  <span className="text-slate-400">|</span>
                  <Link
                    to="/contact"
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm"
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

export default TermsOfService;