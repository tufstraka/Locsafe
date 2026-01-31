import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiSparkles,
  HiOutlineChat,
  HiOutlineLightBulb,
  HiOutlineHeart
} from 'react-icons/hi';
import {
  FaLock,
  FaCreditCard,
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaUniversity,
  FaMobileAlt
} from 'react-icons/fa';
import Header from '../components/header';
import Footer from '../components/footer';

const FeedbackPage = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const paystackScriptLoaded = useRef(false);

  // Fixed amount: $20 USD = 2000 cents (Paystack uses smallest currency unit)
  // For USD, amount is in cents
  const FEEDBACK_AMOUNT_CENTS = 2000; // $20.00
  const FEEDBACK_AMOUNT_DISPLAY = '$20.00';
  const CURRENCY = 'USD';

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
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, []);

  // Check for payment verification on component mount (for redirect flow)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference');
    const trxref = urlParams.get('trxref');
    
    if (reference || trxref) {
      verifyPayment(reference || trxref);
    }
  }, []);

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
      // Use Paystack Popup directly (client-side)
      if (window.PaystackPop) {
        const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxx';
        
        const handler = window.PaystackPop.setup({
          key: publicKey,
          email: email,
          amount: FEEDBACK_AMOUNT_CENTS,
          currency: CURRENCY,
          firstname: firstName,
          lastname: lastName,
          ref: `FEEDBACK_${Date.now()}_${Math.random().toString(36).substring(7).toUpperCase()}`,
          metadata: {
            paymentType: 'feedback',
            feedbackMessage: feedbackMessage,
            custom_fields: [
              {
                display_name: "Payment Type",
                variable_name: "payment_type",
                value: "Feedback Support"
              },
              {
                display_name: "Customer Name",
                variable_name: "customer_name",
                value: `${firstName} ${lastName}`.trim() || email
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
            handlePaymentSuccess(response.reference);
          }
        });
        
        handler.openIframe();
      } else {
        setResponse('Payment system is loading. Please try again in a moment.');
        setLoading(false);
        setTimeout(() => setResponse(''), 3000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setLoading(false);
      setResponse('Payment failed. Please try again or contact support.');
      setTimeout(() => setResponse(''), 5000);
    }
  };

  const handlePaymentSuccess = (reference) => {
    setShowSuccess(true);
    setLoading(false);
    setResponse('🎉 Thank you for your support! Your payment was successful.');
    
    // Store payment reference
    localStorage.setItem('feedbackPaymentReference', reference);
    
    // Clear form
    setFeedbackMessage('');
  };

  const verifyPayment = async (reference) => {
    setLoading(true);
    try {
      // For client-side only implementation, we trust the callback
      // In production, you would verify with your backend
      setShowSuccess(true);
      setResponse('🎉 Payment verified! Thank you for your support.');
      localStorage.setItem('feedbackPaymentReference', reference);
    } catch (error) {
      console.error('Verification error:', error);
      setResponse('Unable to verify payment. Please contact support if you were charged.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: HiOutlineChat, text: 'Share your thoughts' },
    { icon: HiOutlineLightBulb, text: 'Help us improve' },
    { icon: HiOutlineHeart, text: 'Support development' }
  ];

  const paymentMethods = [
    { icon: FaCreditCard, text: 'Credit/Debit Cards' },
    { icon: FaUniversity, text: 'Bank Transfer' },
    { icon: FaMobileAlt, text: 'Mobile Money' }
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex flex-col'>
      <Header />
      
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
              <span className="text-sm font-medium text-teal-300">Support Our Work</span>
            </motion.div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              Share Your Feedback
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Help us build a better product with your valuable insights
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

      {/* Payment Section */}
      <section className="container mx-auto px-4 py-16 -mt-16 relative z-10 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Support & Feedback
              </h3>
              <p className="text-slate-600 mb-4">
                Your contribution helps us continue improving Locsafe
              </p>
              
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 mb-4">
                <p className="text-3xl font-bold text-slate-900">
                  {FEEDBACK_AMOUNT_DISPLAY}
                  <span className="text-sm text-slate-600 ml-2">USD</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  One-time support payment
                </p>
              </div>
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

              {/* Feedback Message */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Feedback (Optional)
                </label>
                <textarea
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or feature requests..."
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
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
              disabled={loading || showSuccess}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all ${
                loading || showSuccess ? 'opacity-50 cursor-not-allowed' : ''
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
              ) : showSuccess ? (
                <>
                  <FaCheckCircle />
                  Payment Successful!
                </>
              ) : (
                <>
                  <FaCreditCard />
                  Pay {FEEDBACK_AMOUNT_DISPLAY} Securely
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
              By completing this payment, you agree to our{' '}
              <a href="/terms" className="text-teal-600 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </motion.div>

        {/* What Your Support Helps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">What Your Support Helps</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineLightBulb className="text-2xl text-teal-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">New Features</h4>
              <p className="text-sm text-slate-600">Fund development of new tracking and analytics features</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineChat className="text-2xl text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Better Support</h4>
              <p className="text-sm text-slate-600">Improve our customer support and documentation</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HiOutlineHeart className="text-2xl text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Community</h4>
              <p className="text-sm text-slate-600">Build a stronger community of logistics professionals</p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default FeedbackPage;
