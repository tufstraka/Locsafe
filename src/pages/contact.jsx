import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/header';
import Footer from '../components/footer';
import { Helmet } from 'react-helmet';
import {
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowRight,
  FaHeadset,
  FaQuestionCircle,
  FaRocket,
  FaUserTie
} from 'react-icons/fa';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineSupport,
  HiSparkles,
  HiOutlineGlobe,
  HiOutlineUser,
  HiOutlinePencilAlt
} from 'react-icons/hi';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    department: 'sales',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('sales');

  const LAMBDA_ENDPOINT = 'https://t930qv3xji.execute-api.us-east-1.amazonaws.com/dev/contact';

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
    setFormData({
      ...formData,
      department: dept
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    
    try {
      const response = await fetch(LAMBDA_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_name: formData.from_name,
          from_email: formData.from_email,
          department: formData.department,
          message: formData.message
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setFormData({
          from_name: '',
          from_email: '',
          department: 'sales',
          message: ''
        });
        setSelectedDepartment('sales');
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        console.error('Contact form error:', result.error);
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: HiOutlineMail,
      title: "Email Us",
      description: "Get a response within 24 hours",
      contact: "support@locsafe.org",
      link: "mailto:support@locsafe.org",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: HiOutlinePhone,
      title: "Call Us",
      description: "Mon-Fri from 8am to 6pm",
      contact: "+254 701 746 774",
      link: "tel:+254701746774",
      color: "from-teal-500 to-green-500"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      description: "Quick support on WhatsApp",
      contact: "+254 701 746 774",
      link: "https://wa.me/254701746774",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const departments = [
    { id: 'sales', name: 'Sales', icon: FaRocket, description: 'New business inquiries' },
    { id: 'support', name: 'Support', icon: HiOutlineSupport, description: 'Technical assistance' },
    { id: 'billing', name: 'Billing', icon: FaUserTie, description: 'Payment & invoices' },
    { id: 'general', name: 'General', icon: FaQuestionCircle, description: 'Other inquiries' }
  ];

  const faqs = [
    {
      question: "What are your support hours?",
      answer: "Our support team is available Monday to Friday, 8:00 AM to 6:00 PM EAT. For urgent issues, we offer 24/7 emergency support for Pro and Enterprise customers."
    },
    {
      question: "How quickly will I get a response?",
      answer: "We typically respond to all inquiries within 24 hours. Priority support customers receive responses within 2 hours during business hours."
    },
    {
      question: "Do you offer on-site support?",
      answer: "Yes, we offer on-site support for Enterprise customers. Please contact our sales team for more information about this service."
    },
    {
      question: "Can I schedule a demo?",
      answer: "Absolutely! You can schedule a personalized demo by filling out the contact form or calling our sales team directly."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 pt-16" itemScope itemType="https://schema.org/ContactPage">
      <Helmet>
        <title>Contact Us | Get Support & Schedule a Demo - Locsafe</title>
        <meta
          name="description"
          content="Contact Locsafe for asset tracking support, sales inquiries, or schedule a demo. Available 24/7 via email, phone (+254 701 746 774), or WhatsApp. Offices in Nairobi, Mombasa, and Kampala."
        />
        <meta name="keywords" content="contact locsafe, asset tracking support, supply chain demo, Kenya logistics support, fleet management help, GPS tracking support" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://locsafe.org/contact" />
        <meta property="og:title" content="Contact Us | Get Support & Schedule a Demo - Locsafe" />
        <meta property="og:description" content="Contact Locsafe for asset tracking support, sales inquiries, or schedule a demo. Available 24/7 via email, phone, or WhatsApp." />
        <meta property="og:image" content="https://locsafe.org/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Locsafe - Get Support & Demo" />
        <meta name="twitter:description" content="Contact us for asset tracking support, sales inquiries, or schedule a demo." />
        
        {/* Canonical */}
        <link rel="canonical" href="https://locsafe.org/contact" />
        
        {/* Structured Data - LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Locsafe",
            "description": "AI-powered supply chain and asset tracking platform",
            "url": "https://locsafe.org",
            "telephone": "+254-701-746-774",
            "email": "support@locsafe.org",
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "Westlands",
                "addressLocality": "Nairobi",
                "addressCountry": "Kenya"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "Nyali",
                "addressLocality": "Mombasa",
                "addressCountry": "Kenya"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "Kololo",
                "addressLocality": "Kampala",
                "addressCountry": "Uganda"
              }
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "18:00"
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+254-701-746-774",
                "contactType": "sales",
                "availableLanguage": ["English", "Swahili"]
              },
              {
                "@type": "ContactPoint",
                "telephone": "+254-701-746-774",
                "contactType": "customer support",
                "availableLanguage": ["English", "Swahili"]
              }
            ],
            "sameAs": [
              "https://twitter.com/Locsafe",
              "https://linkedin.com/company/locsafe",
              "https://facebook.com/locsafe"
            ]
          })}
        </script>
      </Helmet>
      <Header />
      
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
                <HiSparkles className="text-teal-400" />
                <span className="text-sm font-medium text-teal-300">We&apos;re Here to Help</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                >
                  <FaClock className="text-teal-400" />
                  <span className="text-sm">24-hour response time</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                >
                  <HiOutlineGlobe className="text-blue-400" />
                  <span className="text-sm">Available globally</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="container mx-auto px-4 py-12 -mt-16 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-all group"
              >
                <div className={`inline-flex p-3 bg-gradient-to-r ${method.color} rounded-lg shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <method.icon className="text-2xl text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{method.title}</h3>
                <p className="text-xs text-slate-500 mb-2">{method.description}</p>
                <p className="text-sm font-medium text-teal-600 group-hover:text-teal-700 flex items-center gap-1">
                  {method.contact}
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </p>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* Main Contact Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                
                {/* Department Selection */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-slate-700 mb-3 block">Select Department</label>
                  <div className="grid grid-cols-2 gap-3">
                    {departments.map((dept) => (
                      <motion.button
                        key={dept.id}
                        type="button"
                        onClick={() => handleDepartmentChange(dept.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedDepartment === dept.id
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <dept.icon className="text-xl mb-1 mx-auto" />
                        <p className="text-sm font-medium">{dept.name}</p>
                        <p className="text-xs text-slate-500">{dept.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Your Name</label>
                    <div className="relative">
                      <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        id="from_name"
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Email Address</label>
                    <div className="relative">
                      <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        id="from_email"
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">Message</label>
                    <div className="relative">
                      <HiOutlinePencilAlt className="absolute left-3 top-3 text-slate-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Tell us how we can help you..."
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                        required
                      ></textarea>
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FaArrowRight />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Status Messages */}
                <AnimatePresence>
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
                        status === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {status === 'success' ? (
                        <>
                          <FaCheckCircle className="text-green-600" />
                          Message sent successfully! We&apos;ll get back to you soon.
                        </>
                      ) : (
                        <>
                          <FaExclamationTriangle className="text-red-600" />
                          Failed to send message. Please try again.
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Connect With Us */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <p className="text-white/90 mb-6">
                  Follow us on social media for updates, tips, and industry insights.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: FaLinkedin, link: '#', name: 'LinkedIn' },
                    { icon: FaTwitter, link: '#', name: 'Twitter' },
                    { icon: FaFacebook, link: '#', name: 'Facebook' },
                    { icon: FaWhatsapp, link: '#', name: 'WhatsApp' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-all"
                      title={social.name}
                    >
                      <social.icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-600">Quick answers to common questions</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-lg p-6 shadow-md border border-slate-200"
                >
                  <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                    <FaQuestionCircle className="text-teal-500 mt-1 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 ml-6">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <p className="text-slate-600 mb-4">Still have questions?</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <FaHeadset />
                Talk to Support
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
