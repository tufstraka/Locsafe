import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import { IoMenu, IoQrCode, IoShield, IoCheckmarkCircle } from 'react-icons/io5';
import { FaCertificate } from 'react-icons/fa';
import { MdVerified, MdQrCodeScanner, MdBatchPrediction } from 'react-icons/md';
import { HiTemplate } from 'react-icons/hi';
import { BiImport } from 'react-icons/bi';
import { FaLink } from 'react-icons/fa';
import QRCode from 'react-qr-code';

const DPPGenerator = () => {
  const { showNav, toggleNav } = useNavigation();
  const [activeTab, setActiveTab] = useState('single');
  const [generationStep, setGenerationStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('pharmaceutical');
  
  const [dppData, setDppData] = useState({
    productName: '',
    productId: '',
    batchNumber: '',
    manufacturer: '',
    manufactureDate: '',
    expiryDate: '',
    category: 'pharmaceutical',
    origin: '',
    certifications: [],
    sustainability: {
      carbonFootprint: '',
      recyclable: false,
      biodegradable: false,
      energyEfficient: false
    },
    supplyChain: {
      manufacturer: '',
      distributor: '',
      retailer: '',
      currentLocation: ''
    },
    compliance: {
      gdp: false,
      gmp: false,
      iso9001: false,
      halal: false,
      organic: false
    }
  });

  const templates = [
    {
      id: 'pharmaceutical',
      name: 'Pharmaceutical',
      icon: '💊',
      fields: ['temperature', 'humidity', 'GDP', 'GMP'],
      color: 'blue'
    },
    {
      id: 'food',
      name: 'Food & Beverage',
      icon: '🍎',
      fields: ['organic', 'halal', 'expiry', 'allergens'],
      color: 'green'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: '📱',
      fields: ['warranty', 'serial', 'compliance', 'recycling'],
      color: 'purple'
    },
    {
      id: 'textiles',
      name: 'Textiles',
      icon: '👕',
      fields: ['material', 'care', 'origin', 'sustainability'],
      color: 'pink'
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: '🚗',
      fields: ['VIN', 'parts', 'service', 'warranty'],
      color: 'red'
    },
    {
      id: 'custom',
      name: 'Custom Template',
      icon: '⚙️',
      fields: [],
      color: 'gray'
    }
  ];

  const recentDPPs = [
    {
      id: 'DPP-2025-001',
      product: 'COVID-19 Vaccine Batch',
      date: '2025-01-25',
      status: 'verified',
      blockchain: 'ETH-0x742d35Cc6634C0532925a3b844Bc9e7595f0bFAA'
    },
    {
      id: 'DPP-2025-002',
      product: 'Insulin Shipment',
      date: '2025-01-24',
      status: 'verified',
      blockchain: 'ETH-0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed'
    },
    {
      id: 'DPP-2025-003',
      product: 'Medical Equipment Set',
      date: '2025-01-23',
      status: 'pending',
      blockchain: 'Processing...'
    }
  ];

  const blockchainNetworks = [
    { id: 'ethereum', name: 'Ethereum', icon: '⟠', status: 'connected', latency: '12ms' },
    { id: 'polygon', name: 'Polygon', icon: '🟣', status: 'connected', latency: '8ms' },
    { id: 'binance', name: 'Binance Smart Chain', icon: '🟡', status: 'offline', latency: '--' },
    { id: 'hyperledger', name: 'Hyperledger', icon: '🔷', status: 'connected', latency: '15ms' }
  ];

  const generateDPP = () => {
    setGenerationStep(2);
    setTimeout(() => setGenerationStep(3), 1500);
    setTimeout(() => setGenerationStep(4), 3000);
  };

  const handleInputChange = (field, value) => {
    setDppData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  // Generation Steps Modal
  const GenerationModal = () => (
    <AnimatePresence>
      {generationStep > 1 && generationStep < 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-md w-full mx-4"
          >
            <div className="text-center">
              {generationStep === 2 && (
                <>
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
                  <h3 className="headline-6 mb-2">Generating DPP...</h3>
                  <p className="body-2 text-gray-600 dark:text-gray-400">Creating unique identifier</p>
                </>
              )}
              {generationStep === 3 && (
                <>
                  <div className="animate-pulse">
                    <FaLink className="text-5xl text-blue-500 mx-auto mb-4" />
                  </div>
                  <h3 className="headline-6 mb-2">Writing to Blockchain...</h3>
                  <p className="body-2 text-gray-600 dark:text-gray-400">Securing on Ethereum network</p>
                </>
              )}
              {generationStep === 4 && (
                <>
                  <IoCheckmarkCircle className="text-5xl text-green-500 mx-auto mb-4" />
                  <h3 className="headline-6 mb-2">DPP Generated!</h3>
                  <p className="body-2 text-gray-600 dark:text-gray-400 mb-4">Successfully created and verified</p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
                    <p className="caption text-gray-600 dark:text-gray-400">Transaction Hash</p>
                    <p className="font-mono text-xs">0x742d35Cc6634C0532925a3b844Bc9e7595f0bFAA</p>
                  </div>
                  <button
                    onClick={() => setGenerationStep(1)}
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg font-medium"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

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
                <FaCertificate className="text-primary-500" />
                Digital Product Passport Generator
              </h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                Create verifiable digital identities for your products
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all flex items-center gap-2"
            >
              <BiImport className="text-lg" />
              <span className="hidden md:inline">Import CSV</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all flex items-center gap-2"
            >
              <HiTemplate className="text-lg" />
              <span className="hidden md:inline">Templates</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg shadow-elevation-2 hover:shadow-elevation-3 transition-all flex items-center gap-2"
            >
              <MdBatchPrediction className="text-lg" />
              <span className="hidden md:inline">Batch Generate</span>
            </motion.button>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow-elevation-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="caption opacity-90">Total DPPs</p>
                  <p className="headline-6">12,456</p>
                  <p className="caption opacity-75">+23% this month</p>
                </div>
                <IoQrCode className="text-4xl opacity-50" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl shadow-elevation-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="caption opacity-90">Verified</p>
                  <p className="headline-6">11,892</p>
                  <p className="caption opacity-75">95.5% rate</p>
                </div>
                <MdVerified className="text-4xl opacity-50" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl shadow-elevation-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="caption opacity-90">Blockchain</p>
                  <p className="headline-6">8,234</p>
                  <p className="caption opacity-75">On-chain</p>
                </div>
                <FaLink className="text-4xl opacity-50" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl shadow-elevation-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="caption opacity-90">Scans</p>
                  <p className="headline-6">45.2K</p>
                  <p className="caption opacity-75">This week</p>
                </div>
                <MdQrCodeScanner className="text-4xl opacity-50" />
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            {['single', 'batch', 'templates', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 capitalize font-medium transition-all ${
                  activeTab === tab
                    ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab === 'single' && 'Single DPP'}
                {tab === 'batch' && 'Batch Generation'}
                {tab === 'templates' && 'Templates'}
                {tab === 'history' && 'History'}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          {activeTab === 'single' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Panel - Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Template Selection */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6"
                >
                  <h2 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                    Select Template
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {templates.map((template) => (
                      <motion.button
                        key={template.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTemplate(template.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedTemplate === template.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="text-2xl mb-2">{template.icon}</div>
                        <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">
                          {template.name}
                        </p>
                        <p className="caption text-gray-500 dark:text-gray-400">
                          {template.fields.length || 'Custom'} fields
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Product Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6"
                >
                  <h2 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                    Product Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="caption text-gray-600 dark:text-gray-400">Product Name*</label>
                      <input
                        type="text"
                        value={dppData.productName}
                        onChange={(e) => handleInputChange('productName', e.target.value)}
                        className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., COVID-19 Vaccine"
                      />
                    </div>
                    <div>
                      <label className="caption text-gray-600 dark:text-gray-400">Product ID*</label>
                      <input
                        type="text"
                        value={dppData.productId}
                        onChange={(e) => handleInputChange('productId', e.target.value)}
                        className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., PRD-2025-001"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Supply Chain Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6"
                >
                  <h2 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                    Supply Chain Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="caption text-gray-600 dark:text-gray-400">Manufacturer</label>
                      <input
                        type="text"
                        value={dppData.manufacturer}
                        onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                        className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none"
                        placeholder="e.g., Pfizer Inc."
                      />
                    </div>
                    <div>
                      <label className="caption text-gray-600 dark:text-gray-400">Current Location</label>
                      <input
                        type="text"
                        className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none"
                        placeholder="e.g., Nairobi Warehouse"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Panel - Preview */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6"
                >
                  <h2 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                    DPP Preview
                  </h2>
                  
                  {/* QR Code */}
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg flex justify-center mb-4">
                    <QRCode
                      value={`https://locsafe.com/dpp/${dppData.productId || 'SAMPLE'}`}
                      size={180}
                      bgColor="transparent"
                      fgColor={document.documentElement.classList.contains('dark') ? '#ffffff' : '#000000'}
                    />
                  </div>

                  {/* Generate Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generateDPP}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-medium shadow-elevation-2 hover:shadow-elevation-3 transition-all flex items-center justify-center gap-2"
                  >
                    <IoShield className="text-xl" />
                    Generate DPP
                  </motion.button>
                </motion.div>

                {/* Blockchain Networks */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6"
                >
                  <h2 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                    Blockchain Networks
                  </h2>
                  <div className="space-y-3">
                    {blockchainNetworks.map((network) => (
                      <div
                        key={network.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{network.icon}</span>
                          <div>
                            <p className="subtitle-2">{network.name}</p>
                            <p className="caption text-gray-500 dark:text-gray-400">
                              Latency: {network.latency}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          network.status === 'connected' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                          {network.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* History Tab Content */}
          {activeTab === 'history' && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-6">
              <h2 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">
                Recent DPP Generation History
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4">DPP ID</th>
                      <th className="text-left py-3 px-4">Product</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Blockchain</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDPPs.map((dpp) => (
                      <tr key={dpp.id} className="border-b border-gray-100 dark:border-gray-800">
                        <td className="py-3 px-4 font-mono text-sm">{dpp.id}</td>
                        <td className="py-3 px-4">{dpp.product}</td>
                        <td className="py-3 px-4">{dpp.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            dpp.status === 'verified'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}>
                            {dpp.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-xs">{dpp.blockchain}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generation Modal */}
      <GenerationModal />
    </div>
  );
};

export default DPPGenerator;