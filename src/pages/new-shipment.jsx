import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import { IoMenu, IoCheckmarkCircle } from 'react-icons/io5';
import { FaTruck, FaBox, FaMapMarkerAlt, FaUser, FaBarcode, FaDollarSign } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

const NewShipment = () => {
  const { showNav, toggleNav } = useNavigation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [shipmentData, setShipmentData] = useState({
    // Basic Information
    trackingId: `SHP-${Date.now().toString().slice(-8)}`,
    type: 'standard',
    priority: 'medium',
    
    // Sender Information
    senderName: '',
    senderCompany: '',
    senderPhone: '',
    senderEmail: '',
    senderAddress: '',
    senderCity: '',
    senderCountry: 'Kenya',
    
    // Receiver Information
    receiverName: '',
    receiverCompany: '',
    receiverPhone: '',
    receiverEmail: '',
    receiverAddress: '',
    receiverCity: '',
    receiverCountry: 'Kenya',
    
    // Package Details
    packages: [{
      description: '',
      quantity: 1,
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      value: '',
      fragile: false,
      hazardous: false
    }],
    
    // Delivery Options
    deliveryDate: new Date(),
    deliveryTime: '',
    insurance: false,
    insuranceAmount: '',
    specialInstructions: '',
    
    // Payment
    paymentMethod: 'credit_card',
    estimatedCost: 0
  });

  const steps = [
    { id: 1, label: 'Sender Info', icon: FaUser, description: 'Sender details' },
    { id: 2, label: 'Receiver Info', icon: FaMapMarkerAlt, description: 'Delivery address' },
    { id: 3, label: 'Package Details', icon: FaBox, description: 'What to ship' },
    { id: 4, label: 'Delivery Options', icon: FaTruck, description: 'When & how' },
    { id: 5, label: 'Review & Pay', icon: FaDollarSign, description: 'Confirm order' }
  ];

  const shipmentTypes = [
    { id: 'standard', name: 'Standard', icon: '📦', time: '3-5 days', price: 'KES 500' },
    { id: 'express', name: 'Express', icon: '🚀', time: '1-2 days', price: 'KES 1,200' },
    { id: 'same-day', name: 'Same Day', icon: '⚡', time: 'Today', price: 'KES 2,500' },
    { id: 'cold-chain', name: 'Cold Chain', icon: '❄️', time: '2-3 days', price: 'KES 3,000' }
  ];

  const handleInputChange = (field, value) => {
    setShipmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const calculateEstimate = () => {
    // Simple cost calculation
    const basePrice = shipmentData.type === 'standard' ? 500 : 
                     shipmentData.type === 'express' ? 1200 :
                     shipmentData.type === 'same-day' ? 2500 : 3000;
    
    const totalWeight = shipmentData.packages.reduce((sum, pkg) => 
      sum + (parseFloat(pkg.weight) || 0) * pkg.quantity, 0
    );
    
    const weightCost = totalWeight * 50; // KES 50 per kg
    const insuranceCost = shipmentData.insurance ? parseFloat(shipmentData.insuranceAmount) * 0.02 : 0;
    
    return basePrice + weightCost + insuranceCost;
  };

  const handleSubmit = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <AnimatePresence>
        {showNav && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed lg:relative z-40 h-full"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {showNav && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleNav}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      <div className="flex flex-col flex-grow">
        {/* Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between px-6 py-4 bg-surface-light/95 dark:bg-surface-elevated-dark/95 backdrop-blur-xl shadow-elevation-1 dark:shadow-elevation-dark-1 sticky top-0 z-20"
        >
          <div className="flex items-center gap-4">
            <motion.button 
              onClick={toggleNav}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200"
              aria-label="Toggle navigation"
            >
              <IoMenu className="text-2xl text-on-surface-light dark:text-on-surface-dark" />
            </motion.button>
            
            <div>
              <h1 className="headline-5 text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
                <MdLocalShipping className="text-primary-500" />
                Create New Shipment
              </h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                Tracking ID: {shipmentData.trackingId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg shadow-elevation-2 hover:shadow-elevation-3 transition-all flex items-center gap-2"
            >
              <FaBarcode />
              Save Draft
            </motion.button>
          </div>
        </motion.header>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Progress Steps */}
          <div className="max-w-6xl mx-auto mb-8">
            <div className="hidden sm:flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep > step.id ? 'bg-green-500 text-white' :
                      currentStep === step.id ? 'bg-primary-500 text-white shadow-elevation-3' :
                      'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      {currentStep > step.id ? (
                        <IoCheckmarkCircle className="text-2xl" />
                      ) : (
                        <step.icon className="text-xl" />
                      )}
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max hidden lg:block">
                      <p className={`caption font-medium text-xs lg:text-sm ${
                        currentStep >= step.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-4xl mx-auto mt-8 sm:mt-12">
            <AnimatePresence mode="wait">
              {/* Step 5: Review & Payment */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Summary Card */}
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6">
                    <h2 className="headline-6 text-on-surface-light dark:text-on-surface-dark mb-6">
                      Shipment Summary
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="caption text-gray-500 dark:text-gray-400 mb-2">From</p>
                          <p className="subtitle-2">{shipmentData.senderName || 'Not specified'}</p>
                          <p className="caption">{shipmentData.senderCity || 'Not specified'}</p>
                        </div>
                        <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="caption text-gray-500 dark:text-gray-400 mb-2">To</p>
                          <p className="subtitle-2">{shipmentData.receiverName || 'Not specified'}</p>
                          <p className="caption">{shipmentData.receiverCity || 'Not specified'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4">
                        <div className="p-3 sm:p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                          <p className="caption text-gray-500 dark:text-gray-400 mb-2">Estimated Cost</p>
                          <p className="headline-5 text-primary-600 dark:text-primary-400">
                            KES {calculateEstimate().toLocaleString()}
                          </p>
                        </div>
                        <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="caption text-gray-500 dark:text-gray-400 mb-2">Delivery</p>
                          <p className="subtitle-2">
                            {shipmentTypes.find(t => t.id === shipmentData.type)?.name}
                          </p>
                          <p className="caption">
                            {shipmentTypes.find(t => t.id === shipmentData.type)?.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6">
                    <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'credit_card', name: 'Credit Card', icon: '💳' },
                        { id: 'mpesa', name: 'M-Pesa', icon: '📱' },
                        { id: 'invoice', name: 'Invoice', icon: '📄' }
                      ].map(method => (
                        <button
                          key={method.id}
                          onClick={() => handleInputChange('paymentMethod', method.id)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            shipmentData.paymentMethod === method.id
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <div className="text-2xl mb-2">{method.icon}</div>
                          <p className="subtitle-2">{method.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium shadow-elevation-3 hover:shadow-elevation-4 transition-all"
                  >
                    Create Shipment & Pay
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8">
              {currentStep > 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={prevStep}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Previous
                </motion.button>
              )}
              
              {currentStep < steps.length && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="ml-auto px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Next
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-5 p-6 sm:p-8 max-w-md w-full mx-4 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <IoCheckmarkCircle className="text-6xl text-green-500 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Shipment Created!</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                Your shipment has been successfully created.
              </p>
              <p className="text-base sm:text-lg font-medium mb-6">
                Tracking ID: <span className="font-mono text-sm sm:text-base">{shipmentData.trackingId}</span>
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Redirecting to dashboard...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewShipment;