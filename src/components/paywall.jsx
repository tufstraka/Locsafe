import { useState } from 'react';
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
  FaMobileAlt,
  FaCheckCircle,
  FaArrowRight,
  FaInfoCircle,
  FaShieldAlt
} from 'react-icons/fa';
import getOAuthToken from '../utils/darajaAuth';
import { Base64 } from 'js-base64';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Paywall = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumber = searchParams.get('phoneNumber');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 'Ksh 4,500',
      period: '/month',
      description: 'Perfect for small businesses',
      assets: 'Up to 200 assets',
      features: [
        'Real-time GPS tracking',
        'Basic analytics',
        'Email support',
        'Mobile app access',
        'Data export'
      ],
      gradient: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: 'Ksh 9,500',
      period: '/month',
      description: 'For growing enterprises',
      assets: 'Up to 1000 assets',
      features: [
        'Everything in Basic',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Custom alerts',
        'Digital Product Passports'
      ],
      gradient: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Unlimited scalability',
      assets: 'Unlimited assets',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        '24/7 phone support',
        'Custom integrations',
        'SLA guarantee',
        'Training & onboarding'
      ],
      gradient: 'from-orange-500 to-red-500',
      popular: false
    }
  ];

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

  const handlePayment = () => {
    if (selectedPlan === 'enterprise') {
      window.location.href = '/contact';
      return;
    }

    setLoading(true);

    const businessShortCode = 174379;
    const passKey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919';
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    const timestamp = `${year}${month}${date}${hour}${minute}${second}`;    
    const password = Base64.encode(`${businessShortCode}${passKey}${timestamp}`);

    const amount = selectedPlan === 'basic' ? 4500 : 9500;
    const planName = selectedPlan === 'basic' ? 'Basic Package' : 'Pro Package';

    getOAuthToken()
      .then(token => {
        const requestData = {
          BusinessShortCode: businessShortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: businessShortCode,
          PhoneNumber: phoneNumber,
          CallBackURL: 'https://loc-safe.com/payment-callback',
          AccountReference: 'Locsafe',
          TransactionDesc: planName,
          token: token
        };

        axios
          .post('https://zxs-klzo.onrender.com/api/stkpush', requestData)
          .then(response => {
            setLoading(false);
            setResponse(response.data.CustomerMessage);
            if (response.data.ResponseCode === '0') {
              setShowSuccess(true);
              setTimeout(() => setShowSuccess(false), 5000);
            }
          })
          .catch(error => {
            console.log('Payment error:', error);
            setLoading(false);
            setResponse('Payment failed. Please try again.');
          });
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
        setResponse('Authentication failed. Please try again.');
      });
  };

  const features = [
    { icon: HiLightningBolt, text: 'Instant activation' },
    { icon: HiShieldCheck, text: 'Secure payment' },
    { icon: HiOutlineClock, text: '24/7 support' },
    { icon: HiOutlineGlobe, text: 'Global coverage' }
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
                
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="text-slate-600 ml-1">{plan.period}</span>
                </div>

                <div className="bg-slate-50 rounded-lg px-4 py-3 mb-6">
                  <p className="text-sm font-semibold text-slate-700">{plan.assets}</p>
                </div>

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
            </div>

            {phoneNumber && (
              <div className="bg-slate-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-600 mb-1">Payment will be sent to:</p>
                <p className="font-semibold text-slate-900">{phoneNumber}</p>
              </div>
            )}

            <motion.button
              onClick={handlePayment}
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
                  <FaMobileAlt />
                  {selectedPlan === 'enterprise' ? 'Contact Sales' : 'Pay with M-Pesa'}
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
                <span className="text-xs">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <FaShieldAlt className="text-blue-600" />
                <span className="text-xs">SSL Encrypted</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">Trusted by 500+ businesses across Kenya</p>
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
          <p className="text-slate-600">Everything you need to know about our pricing</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {[
            {
              q: "Can I change my plan later?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle."
            },
            {
              q: "Is there a free trial?",
              a: "Yes, we offer a 14-day free trial for all new customers. No credit card required."
            },
            {
              q: "What payment methods do you accept?",
              a: "We accept M-Pesa, credit cards, and bank transfers for enterprise customers."
            },
            {
              q: "Is my data secure?",
              a: "Absolutely. We use bank-grade encryption and are ISO 27001 certified."
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
