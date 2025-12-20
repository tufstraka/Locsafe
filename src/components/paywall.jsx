import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiLightningBolt,
  HiShieldCheck,
  HiCube,
  HiSparkles,
  HiOutlineClock,
  HiOutlineGlobe
} from 'react-icons/hi';
import {
  FaLock,
  FaCreditCard,
  FaCheckCircle,
  FaArrowRight,
  FaInfoCircle,
  FaShieldAlt,
  FaUniversity,
  FaMobileAlt
} from 'react-icons/fa';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Paywall = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get('email') || localStorage.getItem('userEmail');
  const phoneNumber = searchParams.get('phoneNumber') || localStorage.getItem('phoneNumber');
  
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [email, setEmail] = useState(userEmail || '');
  const [phone, setPhone] = useState(phoneNumber || '');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const paystackScriptLoaded = useRef(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Plan',
      installationFee: 15000,
      monthlyFee: 3500,
      displayInstallation: 'Ksh 15,000',
      displayMonthly: 'Ksh 3,500',
      description: 'Perfect for personal & small businesses',
      assets: 'Up to 10 assets',
      hardwareNote: 'GPS trackers from Ksh 4,500/unit',
      features: [
        'Real-time GPS tracking',
        'Basic reporting & alerts',
        'Email support',
        'Mobile app access',
        'Data export (CSV)',
        'Geofence notifications'
      ],
      gradient: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'business',
      name: 'Business Plan',
      installationFee: 45000,
      monthlyFee: 12000,
      displayInstallation: 'Ksh 45,000',
      displayMonthly: 'Ksh 12,000',
      description: 'For growing SMEs & fleets',
      assets: 'Up to 50 assets',
      hardwareNote: 'Integrated trackers from Ksh 7,500/unit',
      features: [
        'Advanced analytics dashboard',
        'Custom reports & scheduling',
        'Priority email & phone support',
        'Full API access',
        'Geofencing with alerts',
        'Digital Product Passports',
        'Driver behavior monitoring',
        'Fuel consumption tracking'
      ],
      gradient: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      installationFee: 150000,
      monthlyFee: 35000,
      displayInstallation: 'Ksh 150,000',
      displayMonthly: 'Ksh 35,000',
      description: 'For large fleet operations',
      assets: 'Unlimited assets',
      hardwareNote: 'Premium Teltonika trackers from Ksh 12,000/unit',
      features: [
        'All Business features',
        'Fleet management suite',
        'Dedicated account manager',
        '24/7 phone & on-site support',
        'Custom integrations (ERP, SAP)',
        'SLA guarantee (99.9% uptime)',
        'On-site training & setup',
        'White-label options',
        'Cold chain monitoring'
      ],
      gradient: 'from-orange-500 to-red-500',
      popular: false
    }
  ];

  const [paymentType, setPaymentType] = useState('installation'); // 'installation' or 'maintenance'

  // Load Paystack script on component mount
  useEffect(() => {
    if (!paystackScriptLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v2/inline.js';
      script.async = true;
      script.onload = () => {
        paystackScriptLoaded.current = true;
        console.log('Paystack script loaded');
      };
      document.body.appendChild(script);

      return () => {
        // Cleanup script on unmount if needed
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

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

  const handlePaystackPayment = async () => {
    // Validation
    if (!email) {
      setResponse('Please enter your email address');
      setTimeout(() => setResponse(''), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setResponse('Please enter a valid email address');
      setTimeout(() => setResponse(''), 3000);
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      // Get selected plan details
      const selectedPlanDetails = plans.find(p => p.id === selectedPlan);
      
      // Determine amount based on payment type
      const baseAmount = paymentType === 'installation'
        ? selectedPlanDetails.installationFee
        : selectedPlanDetails.monthlyFee;
      const amount = baseAmount * 100; // Convert to kobo/cents

      // Option 1: Use Paystack Popup directly (Recommended for simplicity)
      if (window.PaystackPop) {
        const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxx';
        
        const handler = window.PaystackPop.setup({
          key: publicKey,
          email: email,
          amount: amount,
          currency: 'KES',
          firstname: firstName,
          lastname: lastName,
          phone: phone,
          metadata: {
            planId: selectedPlan,
            planName: selectedPlanDetails.name,
            paymentType: paymentType,
            isInstallation: paymentType === 'installation',
            custom_fields: [
              {
                display_name: "Plan Type",
                variable_name: "plan_type",
                value: selectedPlanDetails.name
              },
              {
                display_name: "Payment Type",
                variable_name: "payment_type",
                value: paymentType === 'installation' ? 'One-time Installation' : 'Monthly Maintenance'
              },
              {
                display_name: "Assets Limit",
                variable_name: "assets_limit",
                value: selectedPlanDetails.assets
              }
            ]
          },
          onClose: function() {
            setLoading(false);
            if (!showSuccess) {
              setResponse('Payment cancelled. Please try again when ready.');
              setTimeout(() => setResponse(''), 3000);
            }
          },
          callback: function(response) {
            // Payment successful
            console.log('Payment successful:', response);
            verifyPayment(response.reference);
          }
        });
        
        handler.openIframe();
      } else {
        // Option 2: Use backend initialization with Lambda (More secure)
        const lambdaUrl = import.meta.env.VITE_PAYSTACK_LAMBDA_URL || 
                         'https://your-lambda-url.amazonaws.com/paystack/initialize';
        
        const paymentData = {
          email,
          phoneNumber: phone,
          firstName,
          lastName,
          planId: selectedPlan,
          paymentType: paymentType,
          metadata: {
            customerName: `${firstName} ${lastName}`.trim() || email,
            source: 'web_app',
            paymentType: paymentType,
            isInstallation: paymentType === 'installation',
            timestamp: new Date().toISOString()
          }
        };

        const response = await axios.post(lambdaUrl, paymentData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.data.status === 'success' && response.data.data.access_code) {
          // Use PaystackPop to resume transaction with access_code
          if (window.PaystackPop) {
            const popup = new window.PaystackPop();
            popup.resumeTransaction(response.data.data.access_code, {
              onClose: function() {
                setLoading(false);
                if (!showSuccess) {
                  setResponse('Payment cancelled. Please try again when ready.');
                  setTimeout(() => setResponse(''), 3000);
                }
              },
              callback: function(response) {
                // Payment successful 
                console.log('Payment successful:', response);
                verifyPayment(response.reference || response.data.data.reference);
              }
            });
          } else {
            // Fallback to redirect if popup not available
            window.location.href = response.data.data.authorization_url;
          }
        } else if (response.data.status === 'redirect') {
          navigate('/contact');
        } else {
          setResponse(response.data.message || 'Payment initialization failed');
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      setResponse(
        error.response?.data?.message || 
        'Payment failed. Please try again or contact support.'
      );
      setTimeout(() => setResponse(''), 5000);
    }
  };

  // Check for payment verification on component mount (for redirect flow)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference');
    const trxref = urlParams.get('trxref');
    
    if (reference || trxref) {
      verifyPayment(reference || trxref);
    }
  }, []);

  const verifyPayment = async (reference) => {
    setLoading(true);
    try {
      const lambdaUrl = import.meta.env.VITE_PAYSTACK_LAMBDA_URL || 
                       'https://your-lambda-url.amazonaws.com/paystack/verify';
      
      const response = await axios.get(`${lambdaUrl}?reference=${reference}`);
      
      if (response.data.status === 'success') {
        setShowSuccess(true);
        setResponse('🎉 Payment successful! Your subscription has been activated.');
        
        // Store subscription details
        localStorage.setItem('subscriptionPlan', response.data.data.planId);
        localStorage.setItem('subscriptionStatus', 'active');
        localStorage.removeItem('paymentReference');
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        setResponse('Payment verification failed. Please contact support if you were charged.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setResponse('Unable to verify payment. Please contact support for assistance.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: HiLightningBolt, text: 'Instant activation' },
    { icon: HiShieldCheck, text: 'Secure payment' },
    { icon: HiOutlineClock, text: '24/7 support' },
    { icon: HiOutlineGlobe, text: 'Global coverage' }
  ];

  const paymentMethods = [
    { icon: FaCreditCard, text: 'Credit/Debit Cards' },
    { icon: FaUniversity, text: 'Bank Transfer' },
    { icon: FaMobileAlt, text: 'Mobile Money' }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
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
              <span className="text-sm font-medium text-teal-300">Choose Your Plan</span>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              Unlock Asset Tracking
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Start tracking your assets with our powerful platform
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                >
                  <feature.icon className="text-teal-400" />
                  <span className="text-sm text-white/90">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 py-16 -mt-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all ${
                selectedPlan === plan.id ? 'ring-4 ring-teal-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <div className={`inline-flex p-3 bg-gradient-to-r ${plan.gradient} rounded-xl shadow-lg mb-4`}>
                  <HiCube className="text-2xl text-white" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <div className="mb-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Setup & Installation</p>
                    <span className="text-2xl font-bold text-slate-900">{plan.displayInstallation}</span>
                    <p className="text-xs text-slate-400">One-time fee</p>
                  </div>
                  <div className="border-t pt-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Platform Subscription</p>
                    <span className="text-xl font-bold text-teal-600">{plan.displayMonthly}<span className="text-sm font-normal text-slate-500">/month</span></span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg px-4 py-3 mb-4">
                  <p className="text-sm font-semibold text-slate-700">{plan.assets}</p>
                </div>
                
                {plan.hardwareNote && (
                  <div className="bg-blue-50 rounded-lg px-4 py-2 mb-4 border border-blue-100">
                    <p className="text-xs text-blue-700">
                      <span className="font-semibold">Hardware:</span> {plan.hardwareNote}
                    </p>
                  </div>
                )}

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className="text-teal-500 mt-1 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={`w-full h-1 bg-gradient-to-r ${plan.gradient} rounded-full`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Payment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto mt-12"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Complete Your Purchase
              </h3>
              <p className="text-slate-600">
                Selected: <span className="font-semibold text-teal-600">
                  {plans.find(p => p.id === selectedPlan)?.name}
                </span>
              </p>
              
              {/* Payment Type Toggle */}
              <div className="flex justify-center gap-2 mt-4 mb-4">
                <button
                  onClick={() => setPaymentType('installation')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    paymentType === 'installation'
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Installation (One-time)
                </button>
                <button
                  onClick={() => setPaymentType('maintenance')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    paymentType === 'maintenance'
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Monthly Maintenance
                </button>
              </div>

              <p className="text-2xl font-bold text-slate-900 mt-2">
                {paymentType === 'installation'
                  ? plans.find(p => p.id === selectedPlan)?.displayInstallation
                  : plans.find(p => p.id === selectedPlan)?.displayMonthly}
                <span className="text-sm text-slate-600 ml-1">
                  {paymentType === 'installation' ? '(one-time)' : '/month'}
                </span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {paymentType === 'installation'
                  ? 'Platform setup, configuration & training'
                  : 'Platform access, support & updates'}
              </p>
              <p className="text-xs text-amber-600 mt-2 font-medium">
                * GPS tracker hardware priced separately per device
              </p>
            </div>

            {/* Customer Information Form */}
            <div className="space-y-4 mb-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Name Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone Input (Optional) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+254701746774"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Methods Display */}
            <div className="mb-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 mb-3 text-center font-semibold">
                Secure Payment Methods Available
              </p>
              <div className="flex justify-center gap-4">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center gap-1 text-slate-700">
                    <method.icon className="text-lg text-teal-600" />
                    <span className="text-xs font-medium">{method.text}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 text-center mt-2">
                Powered by Paystack - PCI DSS Certified
              </p>
            </div>

            <motion.button
              onClick={handlePaystackPayment}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Processing...
                </>
              ) : (
                <>
                  <FaCreditCard />
                  Pay {paymentType === 'installation' ? 'Installation Fee' : 'Monthly Fee'} Securely
                  <FaArrowRight />
                </>
              )}
            </motion.button>

            {/* Response Message */}
            <AnimatePresence>
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-lg ${
                    showSuccess ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    showSuccess ? 'text-green-800' : 'text-blue-800'
                  }`}>
                    {showSuccess && <FaCheckCircle className="inline mr-2 text-green-600" />}
                    {response}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-slate-600">
                <FaLock className="text-green-600" />
                <span className="text-xs">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <FaShieldAlt className="text-blue-600" />
                <span className="text-xs">PCI DSS Compliant</span>
              </div>
            </div>

            {/* Additional Info */}
            <p className="text-xs text-slate-500 text-center mt-4">
              By completing this purchase, you agree to our{' '}
              <a href="/terms" className="text-teal-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">Trusted by 45+ businesses across East Africa</p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">99.9%</p>
              <p className="text-sm text-slate-600">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">24/7</p>
              <p className="text-sm text-slate-600">Support</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-slate-900">30-day</p>
              <p className="text-sm text-slate-600">Guarantee</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">Everything you need to know about our pricing and payment</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {[
            {
              q: "What payment methods do you accept?",
              a: "We accept all major credit and debit cards (Visa, Mastercard, American Express), bank transfers, and mobile money payments through our secure Paystack payment gateway."
            },
            {
              q: "Is my payment information secure?",
              a: "Absolutely! We use Paystack, a PCI DSS certified payment processor with bank-grade 256-bit SSL encryption. Your card details are never stored on our servers."
            },
            {
              q: "Can I change my plan later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle, and we'll prorate any differences."
            },
            {
              q: "Do you offer a free trial?",
              a: "Yes, we offer a 14-day free trial for all new customers. No credit card required to start your trial."
            },
            {
              q: "How do I get a refund?",
              a: "We offer a 30-day money-back guarantee. Contact our support team within 30 days of purchase to initiate a refund."
            },
            {
              q: "Can I pay annually?",
              a: "Yes! Annual payments come with a 20% discount. Contact our sales team to set up annual billing."
            },
            {
              q: "What currencies do you accept?",
              a: "We primarily accept payments in Kenyan Shillings (KES), but can also process USD, EUR, and GBP for international customers."
            },
            {
              q: "How quickly is my account activated?",
              a: "Your account is activated instantly upon successful payment. You'll receive login credentials via email immediately."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2 flex items-start gap-2">
                <FaInfoCircle className="text-teal-500 mt-1 flex-shrink-0" />
                {faq.q}
              </h3>
              <p className="text-slate-600 ml-6">{faq.a}</p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Paywall;
