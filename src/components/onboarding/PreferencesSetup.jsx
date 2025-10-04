import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../contexts/onboardingContext';
import {
  FaCog,
  FaPalette,
  FaCalendarAlt,
  FaClock,
  FaRulerCombined,
  FaMapMarkedAlt,
  FaDatabase,
  FaShieldAlt,
  FaDollarSign,
  FaChartLine,
  FaCheck,
  FaSun,
  FaMoon,
  FaDesktop
} from 'react-icons/fa';
import { HiViewGrid, HiViewList, HiCollection } from 'react-icons/hi';
import { IoMdGlobe } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';

const PreferencesSetup = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  
  const [preferences, setPreferences] = useState({
    dashboardLayout: onboardingData.preferences?.dashboardLayout || 'default',
    defaultView: onboardingData.preferences?.defaultView || 'overview',
    currency: onboardingData.preferences?.currency || 'KES',
    dateFormat: onboardingData.preferences?.dateFormat || 'DD/MM/YYYY',
    timeFormat: onboardingData.preferences?.timeFormat || '24h',
    measurementUnit: onboardingData.preferences?.measurementUnit || 'metric',
    mapProvider: onboardingData.preferences?.mapProvider || 'google',
    theme: onboardingData.preferences?.theme || 'light',
    complianceRegion: onboardingData.preferences?.complianceRegion || 'Kenya',
    dataRetention: onboardingData.preferences?.dataRetention || '3years'
  });

  const dashboardLayouts = [
    { 
      value: 'default', 
      label: 'Default', 
      icon: HiViewGrid,
      description: 'Balanced view with all widgets'
    },
    { 
      value: 'compact', 
      label: 'Compact', 
      icon: HiViewList,
      description: 'Space-efficient layout'
    },
    { 
      value: 'analytics', 
      label: 'Analytics Focus', 
      icon: FaChartLine,
      description: 'Emphasis on data visualization'
    },
    { 
      value: 'operations', 
      label: 'Operations Focus', 
      icon: HiCollection,
      description: 'Shipment-centric view'
    }
  ];

  const themes = [
    { value: 'light', label: 'Light', icon: FaSun },
    { value: 'dark', label: 'Dark', icon: FaMoon },
    { value: 'auto', label: 'Auto', icon: FaDesktop }
  ];

  const currencies = [
    { value: 'KES', label: 'Kenya Shilling (KES)', symbol: 'KSh' },
    { value: 'USD', label: 'US Dollar (USD)', symbol: '$' },
    { value: 'EUR', label: 'Euro (EUR)', symbol: '€' },
    { value: 'GBP', label: 'British Pound (GBP)', symbol: '£' },
    { value: 'NGN', label: 'Nigerian Naira (NGN)', symbol: '₦' },
    { value: 'ZAR', label: 'South African Rand (ZAR)', symbol: 'R' },
    { value: 'UGX', label: 'Ugandan Shilling (UGX)', symbol: 'USh' },
    { value: 'TZS', label: 'Tanzanian Shilling (TZS)', symbol: 'TSh' }
  ];

  const dateFormats = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY', example: '31/12/2024' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY', example: '12/31/2024' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD', example: '2024-12-31' },
    { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY', example: '31-12-2024' }
  ];

  const timeFormats = [
    { value: '12h', label: '12-hour', example: '3:30 PM' },
    { value: '24h', label: '24-hour', example: '15:30' }
  ];

  const measurementUnits = [
    { value: 'metric', label: 'Metric', description: 'Kilometers, Kilograms, Celsius' },
    { value: 'imperial', label: 'Imperial', description: 'Miles, Pounds, Fahrenheit' }
  ];

  const mapProviders = [
    { value: 'google', label: 'Google Maps' },
    { value: 'mapbox', label: 'Mapbox' },
    { value: 'openstreet', label: 'OpenStreetMap' }
  ];

  const complianceRegions = [
    { value: 'Kenya', label: 'Kenya', flag: '🇰🇪' },
    { value: 'EAC', label: 'East African Community', flag: '🌍' },
    { value: 'COMESA', label: 'COMESA Region', flag: '🌍' },
    { value: 'EU', label: 'European Union', flag: '🇪🇺' },
    { value: 'US', label: 'United States', flag: '🇺🇸' },
    { value: 'Global', label: 'Global Standards', flag: '🌐' }
  ];

  const dataRetentionPeriods = [
    { value: '1year', label: '1 Year', description: 'Minimum retention' },
    { value: '3years', label: '3 Years', description: 'Recommended' },
    { value: '5years', label: '5 Years', description: 'Extended retention' },
    { value: '7years', label: '7 Years', description: 'Maximum retention' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => {
      const updated = { ...prev, [key]: value };
      updateOnboardingData('preferences', updated);
      return updated;
    });
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
      {/* Dashboard Layout */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <MdDashboard className="text-orange-500 text-xl" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Dashboard Layout
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dashboardLayouts.map(({ value, label, icon: Icon, description }) => (
            <motion.div
              key={value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePreferenceChange('dashboardLayout', value)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                preferences.dashboardLayout === value
                  ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                  : 'border-slate-200 dark:border-slate-600 hover:border-orange-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  preferences.dashboardLayout === value
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  <Icon className="text-xl" />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    preferences.dashboardLayout === value
                      ? 'text-orange-700 dark:text-orange-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {description}
                  </p>
                </div>
                {preferences.dashboardLayout === value && (
                  <FaCheck className="text-orange-500 flex-shrink-0" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Theme Selection */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <FaPalette className="text-purple-500 text-xl" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Theme
          </h3>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => handlePreferenceChange('theme', value)}
              className={`p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                preferences.theme === value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-slate-200 dark:border-slate-600 hover:border-purple-300'
              }`}
            >
              <Icon className={`text-lg ${
                preferences.theme === value
                  ? 'text-purple-600 dark:text-purple-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`} />
              <span className={`text-sm font-medium ${
                preferences.theme === value
                  ? 'text-purple-700 dark:text-purple-300'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Regional Settings */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <IoMdGlobe className="text-blue-500 text-xl" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Regional Settings
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <FaDollarSign className="inline mr-1" />
              Currency
            </label>
            <select
              value={preferences.currency}
              onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              {currencies.map(({ value, label, symbol }) => (
                <option key={value} value={value}>
                  {label} ({symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Date Format */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <FaCalendarAlt className="inline mr-1" />
              Date Format
            </label>
            <select
              value={preferences.dateFormat}
              onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              {dateFormats.map(({ value, label, example }) => (
                <option key={value} value={value}>
                  {label} (e.g., {example})
                </option>
              ))}
            </select>
          </div>

          {/* Time Format */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <FaClock className="inline mr-1" />
              Time Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              {timeFormats.map(({ value, label, example }) => (
                <button
                  key={value}
                  onClick={() => handlePreferenceChange('timeFormat', value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    preferences.timeFormat === value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    preferences.timeFormat === value
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {example}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Measurement Units */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <FaRulerCombined className="inline mr-1" />
              Measurement Units
            </label>
            <div className="grid grid-cols-2 gap-3">
              {measurementUnits.map(({ value, label, description }) => (
                <button
                  key={value}
                  onClick={() => handlePreferenceChange('measurementUnit', value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    preferences.measurementUnit === value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    preferences.measurementUnit === value
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Map Provider */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <FaMapMarkedAlt className="text-green-500 text-xl" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Map Provider
          </h3>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {mapProviders.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handlePreferenceChange('mapProvider', value)}
              className={`p-3 rounded-lg border-2 transition-all ${
                preferences.mapProvider === value
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-slate-200 dark:border-slate-600 hover:border-green-300'
              }`}
            >
              <span className={`text-sm font-medium ${
                preferences.mapProvider === value
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Compliance & Data */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <FaShieldAlt className="text-teal-500 text-xl" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Compliance & Data Management
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Compliance Region */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Compliance Region
            </label>
            <select
              value={preferences.complianceRegion}
              onChange={(e) => handlePreferenceChange('complianceRegion', e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none"
            >
              {complianceRegions.map(({ value, label, flag }) => (
                <option key={value} value={value}>
                  {flag} {label}
                </option>
              ))}
            </select>
          </div>

          {/* Data Retention */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <FaDatabase className="inline mr-1" />
              Data Retention Period
            </label>
            <div className="grid grid-cols-2 gap-2">
              {dataRetentionPeriods.map(({ value, label, description }) => (
                <button
                  key={value}
                  onClick={() => handlePreferenceChange('dataRetention', value)}
                  className={`p-2 rounded-lg border-2 transition-all ${
                    preferences.dataRetention === value
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : 'border-slate-200 dark:border-slate-600 hover:border-teal-300'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    preferences.dataRetention === value
                      ? 'text-teal-700 dark:text-teal-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Message */}
      <motion.div 
        variants={itemVariants}
        className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <FaCog className="text-orange-500 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm font-medium text-orange-900 dark:text-orange-100">
              Preferences can be changed anytime
            </p>
            <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
              All these settings can be modified later from your account settings page.
              Your preferences will be applied immediately after setup completion.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreferencesSetup;