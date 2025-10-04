import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../contexts/onboardingContext';
import { 
  FaUser, 
  FaBuilding, 
  FaPlug, 
  FaCog, 
  FaCheck, 
  FaChevronRight, 
  FaChevronLeft,
  FaRocket,
  FaLock,
  FaShieldAlt
} from 'react-icons/fa';
import {
  HiSparkles,
  HiLightningBolt,
  HiXCircle
} from 'react-icons/hi';
import ProfileSetup from '../components/onboarding/ProfileSetup';
import OrganizationSetup from '../components/onboarding/OrganizationSetup';
import IntegrationSetup from '../components/onboarding/IntegrationSetup';
import PreferencesSetup from '../components/onboarding/PreferencesSetup';
import OnboardingComplete from '../components/onboarding/OnboardingComplete';

const Onboarding = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    completedSteps,
    goToStep,
    nextStep,
    previousStep,
    isOnboardingComplete
  } = useOnboarding();

  const [isLoading] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  // Redirect if onboarding is already complete
  useEffect(() => {
    if (isOnboardingComplete()) {
      navigate('/admin/dashboard');
    }
  }, [navigate, isOnboardingComplete]);

  const steps = [
    {
      id: 1,
      title: 'Profile Setup',
      subtitle: 'Tell us about yourself',
      icon: FaUser,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      component: ProfileSetup
    },
    {
      id: 2,
      title: 'Organization',
      subtitle: 'Configure your company details',
      icon: FaBuilding,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      component: OrganizationSetup
    },
    {
      id: 3,
      title: 'Integrations',
      subtitle: 'Connect your tools',
      icon: FaPlug,
      color: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      component: IntegrationSetup
    },
    {
      id: 4,
      title: 'Preferences',
      subtitle: 'Customize your experience',
      icon: FaCog,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      component: PreferencesSetup
    },
    {
      id: 5,
      title: 'All Set!',
      subtitle: 'Welcome to Locsafe',
      icon: FaRocket,
      color: 'from-teal-500 to-blue-500',
      bgColor: 'bg-teal-50 dark:bg-teal-900/20',
      borderColor: 'border-teal-200 dark:border-teal-800',
      component: OnboardingComplete
    }
  ];

  const currentStepData = steps[currentStep - 1];
  const StepComponent = currentStepData.component;
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  const handleSkip = () => {
    if (currentStep < steps.length) {
      nextStep();
    }
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    navigate('/admin/dashboard');
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-1 z-40 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/favicon.png" alt="Locsafe" className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Welcome to Locsafe
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Let&apos;s get your account set up
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FaShieldAlt className="text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-700 dark:text-green-300">
                  Secure Setup
                </span>
              </div>
              <button
                onClick={handleExit}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Save & Exit
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Steps Navigation */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Setup Progress
              </h2>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const isActive = step.id === currentStep;
                const isCompleted = completedSteps.includes(step.id);
                const isPast = step.id < currentStep;
                
                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <button
                      onClick={() => (isPast || isCompleted) && goToStep(step.id)}
                      disabled={!isPast && !isCompleted}
                      className={`relative flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                        isActive 
                          ? `${step.bgColor} ${step.borderColor} border-2` 
                          : isPast || isCompleted
                          ? 'hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${step.color} shadow-lg`
                          : isCompleted
                          ? 'bg-green-500'
                          : 'bg-slate-200 dark:bg-slate-600'
                      }`}>
                        {isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <FaCheck className="text-white text-lg" />
                          </motion.div>
                        ) : (
                          <step.icon className={`text-lg ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        )}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-white"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ opacity: 0.3 }}
                          />
                        )}
                      </div>
                      
                      <div className="hidden md:block text-center">
                        <p className={`text-sm font-medium ${
                          isActive 
                            ? 'text-slate-900 dark:text-white' 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {step.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </button>
                    
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-2 transition-all ${
                        isPast || (isCompleted && index < currentStep - 1)
                          ? 'bg-green-500'
                          : 'bg-slate-200 dark:bg-slate-600'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Step Header */}
              <div className={`bg-gradient-to-r ${currentStepData.color} p-8 text-white`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <currentStepData.icon className="text-3xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
                    <p className="text-white/90 mt-1">{currentStepData.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Step Component */}
              <div className="p-8">
                <StepComponent />
              </div>

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="px-8 pb-8">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={previousStep}
                      disabled={currentStep === 1}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                        currentStep === 1
                          ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-700 text-slate-400'
                          : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <FaChevronLeft />
                      Previous
                    </button>

                    <div className="flex items-center gap-3">
                      {currentStep < 4 && (
                        <button
                          onClick={handleSkip}
                          className="px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                          Skip for now
                        </button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextStep}
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r ${currentStepData.color} text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all`}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                            Saving...
                          </>
                        ) : (
                          <>
                            Continue
                            <FaChevronRight />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Tips & Help */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <HiSparkles className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    Quick Tip
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    You can always come back to complete or update these settings later from your dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FaLock className="text-green-500 text-xl flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    Your Data is Secure
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    All information is encrypted and stored securely. We never share your data.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <HiLightningBolt className="text-purple-500 text-xl flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    Need Help?
                  </p>
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                    Our support team is available 24/7. Click the chat icon for assistance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowExitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                  <HiXCircle className="text-orange-600 dark:text-orange-400 text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Save and Exit?
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your progress will be saved
                  </p>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Don&apos;t worry! You can continue the setup process anytime from your dashboard.
                All your entered information will be saved.
              </p>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Continue Setup
                </button>
                <button
                  onClick={confirmExit}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Save & Exit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;