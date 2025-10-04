import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../contexts/onboardingContext';
import {
  FaPlug,
  FaKey,
  FaLink,
  FaCheck,
  FaExclamationTriangle,
  FaBell,
  FaDatabase,
  FaSlack,
  FaMicrosoft,
  FaEye,
  FaEyeSlash,
  FaCode
} from 'react-icons/fa';
import { SiSap, SiOracle } from 'react-icons/si';
import { HiCube, HiChip } from 'react-icons/hi';

const IntegrationSetup = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [showSecrets, setShowSecrets] = useState({});
  const [testingIntegration, setTestingIntegration] = useState(null);
  
  const [integrations, setIntegrations] = useState({
    erp: {
      enabled: onboardingData.integrations?.erp?.enabled || false,
      type: onboardingData.integrations?.erp?.type || '',
      apiKey: onboardingData.integrations?.erp?.apiKey || '',
      endpoint: onboardingData.integrations?.erp?.endpoint || ''
    },
    wms: {
      enabled: onboardingData.integrations?.wms?.enabled || false,
      type: onboardingData.integrations?.wms?.type || '',
      credentials: onboardingData.integrations?.wms?.credentials || {}
    },
    fleet: {
      enabled: onboardingData.integrations?.fleet?.enabled || false,
      provider: onboardingData.integrations?.fleet?.provider || '',
      apiKey: onboardingData.integrations?.fleet?.apiKey || ''
    },
    payments: {
      enabled: onboardingData.integrations?.payments?.enabled || false,
      provider: onboardingData.integrations?.payments?.provider || '',
      publicKey: onboardingData.integrations?.payments?.publicKey || '',
      secretKey: onboardingData.integrations?.payments?.secretKey || ''
    },
    notifications: {
      slack: {
        enabled: onboardingData.integrations?.notifications?.slack?.enabled || false,
        webhookUrl: onboardingData.integrations?.notifications?.slack?.webhookUrl || ''
      },
      teams: {
        enabled: onboardingData.integrations?.notifications?.teams?.enabled || false,
        webhookUrl: onboardingData.integrations?.notifications?.teams?.webhookUrl || ''
      },
      webhook: {
        enabled: onboardingData.integrations?.notifications?.webhook?.enabled || false,
        url: onboardingData.integrations?.notifications?.webhook?.url || '',
        secret: onboardingData.integrations?.notifications?.webhook?.secret || ''
      }
    }
  });

  const erpSystems = [
    { value: 'sap', label: 'SAP', icon: SiSap },
    { value: 'oracle', label: 'Oracle NetSuite', icon: SiOracle },
    { value: 'dynamics', label: 'Microsoft Dynamics', icon: FaMicrosoft },
    { value: 'odoo', label: 'Odoo', icon: HiCube },
    { value: 'custom', label: 'Custom API', icon: HiChip }
  ];


  const handleToggleIntegration = (category, subcategory = null) => {
    setIntegrations(prev => {
      const updated = { ...prev };
      
      if (subcategory) {
        updated[category][subcategory].enabled = !updated[category][subcategory].enabled;
      } else {
        updated[category].enabled = !updated[category].enabled;
      }
      
      updateOnboardingData('integrations', updated);
      return updated;
    });
  };

  const handleInputChange = (category, field, value, subcategory = null) => {
    setIntegrations(prev => {
      const updated = { ...prev };
      
      if (subcategory) {
        updated[category][subcategory][field] = value;
      } else {
        updated[category][field] = value;
      }
      
      updateOnboardingData('integrations', updated);
      return updated;
    });
  };

  const toggleShowSecret = (key) => {
    setShowSecrets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const testConnection = async (integration) => {
    setTestingIntegration(integration);
    // Simulate API test
    setTimeout(() => {
      setTestingIntegration(null);
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Introduction */}
      <motion.div variants={itemVariants} className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Connect Your Tools
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Integrate Locsafe with your existing systems for seamless operations
        </p>
      </motion.div>

      {/* ERP Integration */}
      <motion.div 
        variants={itemVariants} 
        className={`border-2 rounded-xl p-6 transition-all ${
          integrations.erp.enabled 
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
            : 'border-slate-200 dark:border-slate-600'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              integrations.erp.enabled 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}>
              <FaDatabase className="text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                ERP System
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Connect your enterprise resource planning system
              </p>
            </div>
          </div>
          <button
            onClick={() => handleToggleIntegration('erp')}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${
              integrations.erp.enabled 
                ? 'bg-green-500' 
                : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <motion.div
              className="w-4 h-4 bg-white rounded-full"
              animate={{ x: integrations.erp.enabled ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </button>
        </div>

        {integrations.erp.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                ERP System Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {erpSystems.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => handleInputChange('erp', 'type', value)}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                      integrations.erp.type === value
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-green-300'
                    }`}
                  >
                    {Icon && <Icon className="text-lg" />}
                    <span className="text-sm font-medium">{label}</span>
                    {integrations.erp.type === value && (
                      <FaCheck className="ml-auto text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {integrations.erp.type && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type={showSecrets['erp-key'] ? 'text' : 'password'}
                      value={integrations.erp.apiKey}
                      onChange={(e) => handleInputChange('erp', 'apiKey', e.target.value)}
                      placeholder="Enter your API key"
                      className="w-full pl-10 pr-12 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowSecret('erp-key')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showSecrets['erp-key'] ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    API Endpoint
                  </label>
                  <div className="relative">
                    <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      value={integrations.erp.endpoint}
                      onChange={(e) => handleInputChange('erp', 'endpoint', e.target.value)}
                      placeholder="https://api.example.com/v1"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <button
                  onClick={() => testConnection('erp')}
                  disabled={testingIntegration === 'erp'}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {testingIntegration === 'erp' ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Testing...
                    </span>
                  ) : (
                    'Test Connection'
                  )}
                </button>
              </>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Notification Channels */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <FaBell className="text-teal-500" />
          Notification Channels
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Slack */}
          <div className={`border rounded-lg p-4 ${
            integrations.notifications.slack.enabled
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : 'border-slate-200 dark:border-slate-600'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaSlack className="text-2xl text-purple-600" />
                <span className="font-medium">Slack</span>
              </div>
              <button
                onClick={() => handleToggleIntegration('notifications', 'slack')}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  integrations.notifications.slack.enabled 
                    ? 'bg-green-500' 
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full"
                  animate={{ x: integrations.notifications.slack.enabled ? 16 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </button>
            </div>
            {integrations.notifications.slack.enabled && (
              <input
                type="url"
                value={integrations.notifications.slack.webhookUrl}
                onChange={(e) => handleInputChange('notifications', 'webhookUrl', e.target.value, 'slack')}
                placeholder="https://hooks.slack.com/..."
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              />
            )}
          </div>

          {/* Custom Webhook */}
          <div className={`border rounded-lg p-4 ${
            integrations.notifications.webhook.enabled
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-slate-200 dark:border-slate-600'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FaCode className="text-2xl text-purple-600" />
                <span className="font-medium">Custom Webhook</span>
              </div>
              <button
                onClick={() => handleToggleIntegration('notifications', 'webhook')}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  integrations.notifications.webhook.enabled 
                    ? 'bg-purple-500' 
                    : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <motion.div
                  className="w-4 h-4 bg-white rounded-full"
                  animate={{ x: integrations.notifications.webhook.enabled ? 16 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </button>
            </div>
            {integrations.notifications.webhook.enabled && (
              <input
                type="url"
                value={integrations.notifications.webhook.url}
                onChange={(e) => handleInputChange('notifications', 'url', e.target.value, 'webhook')}
                placeholder="https://your-webhook-url.com/..."
                className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700"
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Info Message */}
      <motion.div 
        variants={itemVariants}
        className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <FaPlug className="text-green-500 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm font-medium text-green-900 dark:text-green-100">
              Integrations Optional
            </p>
            <p className="text-xs text-green-700 dark:text-green-300 mt-1">
              You can skip this step and configure integrations later from your dashboard settings.
              All integrations support sandbox/test modes for safe testing.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Security Notice */}
      <motion.div 
        variants={itemVariants}
        className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <FaExclamationTriangle className="text-amber-500 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
              Security Notice
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
              All API keys and credentials are encrypted and stored securely. We recommend using 
              environment-specific keys (development/production) and regularly rotating credentials.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IntegrationSetup;