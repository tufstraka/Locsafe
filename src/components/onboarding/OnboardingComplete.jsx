import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../../contexts/onboardingContext';
import {
  FaRocket,
  FaCheckCircle,
  FaTrophy,
  FaBook,
  FaHeadset,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaArrowRight,
  FaDownload,
  FaPlay,
  FaGraduationCap,
  FaStar
} from 'react-icons/fa';
import {
  HiSparkles,
  HiLightningBolt,
  HiDocumentText,
  HiCube
} from 'react-icons/hi';
import { IoMdCheckmarkCircle } from 'react-icons/io';

const OnboardingComplete = () => {
  const navigate = useNavigate();
  const { completeOnboarding, onboardingData } = useOnboarding();
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionStats, setCompletionStats] = useState({
    profileComplete: false,
    organizationComplete: false,
    integrationsConnected: 0,
    preferencesSet: false
  });

  useEffect(() => {
    // Calculate completion stats
    const stats = {
      profileComplete: !!onboardingData.profile?.fullName && !!onboardingData.profile?.phoneNumber,
      organizationComplete: !!onboardingData.organization?.name && !!onboardingData.organization?.type,
      integrationsConnected: Object.values(onboardingData.integrations || {})
        .filter(integration => integration.enabled).length,
      preferencesSet: !!onboardingData.preferences?.dashboardLayout
    };
    setCompletionStats(stats);
  }, [onboardingData]);

  const handleCompleteSetup = async () => {
    setIsCompleting(true);
    const success = await completeOnboarding();
    
    if (success) {
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } else {
      setIsCompleting(false);
      // Handle error
    }
  };

  const nextSteps = [
    {
      icon: FaUsers,
      title: 'Invite Team Members',
      description: 'Add your team to collaborate on shipments',
      action: 'Invite Team',
      color: 'from-blue-500 to-cyan-500',
      path: '/settings'
    },
    {
      icon: FaTrophy,
      title: 'Create First Shipment',
      description: 'Start tracking your first delivery',
      action: 'New Shipment',
      color: 'from-green-500 to-teal-500',
      path: '/dashboard'
    },
    {
      icon: HiCube,
      title: 'Generate Digital Passport',
      description: 'Create blockchain-verified product passports',
      action: 'Create DPP',
      color: 'from-purple-500 to-pink-500',
      path: '/dpp-generator'
    },
    {
      icon: FaChartLine,
      title: 'Explore Analytics',
      description: 'View insights and performance metrics',
      action: 'View Analytics',
      color: 'from-orange-500 to-red-500',
      path: '/insights'
    }
  ];

  const resources = [
    {
      icon: FaBook,
      title: 'Documentation',
      description: 'Complete guide to all features',
      link: '/docs'
    },
    {
      icon: FaPlay,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      link: '/tutorials'
    },
    {
      icon: FaGraduationCap,
      title: 'Training Center',
      description: 'Interactive learning modules',
      link: '/training'
    },
    {
      icon: FaHeadset,
      title: '24/7 Support',
      description: 'Get help when you need it',
      link: '/support'
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

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Animated Sparkles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -10,
              opacity: 0
            }}
            animate={{
              y: window.innerHeight + 10,
              opacity: [0, 1, 1, 0],
              rotate: 360,
              scale: [0, 1, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Celebration Header */}
        <motion.div 
          variants={itemVariants} 
          className="text-center"
        >
          <motion.div
            animate={floatingAnimation}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
              <FaRocket className="text-4xl text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-4xl font-bold text-slate-900 dark:text-white mb-3"
          >
            🎉 Congratulations!
          </motion.h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Your Locsafe account is ready to revolutionize your supply chain
          </p>
        </motion.div>

        {/* Setup Summary */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-teal-200 dark:border-teal-800"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <IoMdCheckmarkCircle className="text-green-500 text-xl" />
            Setup Complete
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                completionStats.profileComplete 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-500'
              }`}>
                <FaCheckCircle />
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Profile Setup
              </p>
            </div>
            
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                completionStats.organizationComplete 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-500'
              }`}>
                <FaCheckCircle />
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Organization
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center mb-2">
                <span className="font-bold">{completionStats.integrationsConnected}</span>
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Integrations
              </p>
            </div>
            
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                completionStats.preferencesSet 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-500'
              }`}>
                <FaCheckCircle />
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Preferences
              </p>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <HiLightningBolt className="text-yellow-500" />
            Quick Start Actions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(step.path)}
                className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <step.icon className="text-xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {step.description}
                    </p>
                    <button className="text-sm font-medium text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 flex items-center gap-1">
                      {step.action}
                      <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Resources */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <HiDocumentText className="text-purple-500" />
            Helpful Resources
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {resources.map((resource, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                <resource.icon className="text-2xl text-slate-600 dark:text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {resource.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {resource.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Premium Features */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <HiSparkles className="text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Unlock Premium Features
                </h3>
                <p className="text-sm text-white/90">
                  Get advanced analytics, priority support, and unlimited integrations
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium hover:bg-white/30 transition-all">
              Upgrade Now
            </button>
          </div>
        </motion.div>

        {/* Success Tips */}
        <motion.div 
          variants={itemVariants}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-3">
            <FaStar className="text-green-500 text-xl flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                Tips for Success
              </h4>
              <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                <li>• Complete your first shipment within 24 hours to familiarize yourself</li>
                <li>• Set up automated alerts for critical shipment events</li>
                <li>• Invite key team members to collaborate effectively</li>
                <li>• Explore the analytics dashboard to gain insights</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <button
            onClick={() => navigate('/docs')}
            className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all flex items-center gap-2"
          >
            <FaDownload />
            Download Setup Guide
          </button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCompleteSetup}
            disabled={isCompleting}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            {isCompleting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Launching Dashboard...
              </>
            ) : (
              <>
                Go to Dashboard
                <FaArrowRight />
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Security Badge */}
        <motion.div 
          variants={itemVariants}
          className="text-center pt-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-full">
            <FaShieldAlt className="text-green-500" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Your data is secured with enterprise-grade encryption
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OnboardingComplete;