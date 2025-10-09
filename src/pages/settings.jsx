
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import { IoMenu, IoSave, IoShieldCheckmark, IoMoon, IoSunny } from 'react-icons/io5';
import { FaUser, FaBell, FaPalette, FaDatabase, FaShieldAlt } from 'react-icons/fa';
import { MdPrivacyTip, MdBusinessCenter, MdApi } from 'react-icons/md';
import { HiOutlineCog, HiOutlineDatabase, HiOutlineCloudUpload } from 'react-icons/hi';
import { BiExport, BiImport } from 'react-icons/bi';
import PropTypes from 'prop-types';

const Settings = () => {
  const { showNav, toggleNav } = useNavigation();
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    alerts: true,
    reports: true,
    updates: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    shareData: false,
    analytics: true,
    marketing: false
  });
  const [hasChanges, setHasChanges] = useState(false);

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'account', label: 'Account', icon: MdBusinessCenter },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'appearance', label: 'Appearance', icon: FaPalette },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'privacy', label: 'Privacy', icon: MdPrivacyTip },
    { id: 'integrations', label: 'Integrations', icon: MdApi },
    { id: 'data', label: 'Data Management', icon: FaDatabase }
  ];

  const integrations = [
    {
      id: 1,
      name: 'Google Analytics',
      description: 'Track and analyze website traffic',
      icon: '📊',
      connected: true,
      lastSync: '2 hours ago'
    },
    {
      id: 2,
      name: 'Slack',
      description: 'Send notifications to Slack channels',
      icon: '💬',
      connected: true,
      lastSync: '5 minutes ago'
    },
    {
      id: 3,
      name: 'Salesforce',
      description: 'Sync customer data with Salesforce CRM',
      icon: '☁️',
      connected: false,
      lastSync: null
    },
    {
      id: 4,
      name: 'QuickBooks',
      description: 'Integrate financial data',
      icon: '💰',
      connected: false,
      lastSync: null
    },
    {
      id: 5,
      name: 'Zapier',
      description: 'Connect with 3000+ apps',
      icon: '⚡',
      connected: true,
      lastSync: '1 day ago'
    }
  ];

  const handleToggle = (setting, key) => {
    if (setting === 'notifications') {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    } else if (setting === 'privacy') {
      setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    }
    setHasChanges(true);
  };

  const handleSave = () => {
    // Save settings logic here
    setHasChanges(false);
  };

  const ToggleSwitch = ({ enabled, onChange, label }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span className="sr-only">{label}</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  ToggleSwitch.propTypes = {
    enabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Personal Information</h3>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="relative">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin+User&background=2196F3&color=fff"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-primary-500"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-primary-500 text-white rounded-full shadow-elevation-2 hover:bg-primary-600 transition-colors">
                    <HiOutlineCloudUpload className="text-sm" />
                  </button>
                </div>
                <div>
                  <h4 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">Admin User</h4>
                  <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium">System Administrator</p>
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Member since Jan 2023</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">First Name</label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Last Name</label>
                  <input
                    type="text"
                    defaultValue="User"
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Email</label>
                  <input
                    type="email"
                    defaultValue="admin@locsafe.com"
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+254 700 000000"
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="Experienced supply chain manager with expertise in logistics optimization."
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'account':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Organization Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Company Name</label>
                  <input
                    type="text"
                    defaultValue="Locsafe Logistics"
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Industry</label>
                  <select 
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option>Supply Chain & Logistics</option>
                    <option>Manufacturing</option>
                    <option>Retail</option>
                    <option>Healthcare</option>
                  </select>
                </div>
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Tax ID</label>
                  <input
                    type="text"
                    defaultValue="KE123456789"
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Time Zone</label>
                  <select 
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option>Africa/Nairobi (UTC+3)</option>
                    <option>Europe/London (UTC+0)</option>
                    <option>America/New_York (UTC-5)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Address</label>
                  <textarea
                    rows={2}
                    defaultValue="123 Logistics Avenue, Nairobi, Kenya"
                    onChange={() => setHasChanges(true)}
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Subscription & Billing</h3>
              
              <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Enterprise Plan</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Unlimited users, all features</p>
                  </div>
                  <span className="px-3 py-1 bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400 text-sm font-semibold rounded-full">
                    Active
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Next billing date: Feb 1, 2024</span>
                  <button className="text-primary-600 dark:text-primary-400 text-sm hover:text-primary-700 dark:hover:text-primary-300">
                    Manage Subscription
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Email Notifications</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Receive updates via email</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.email}
                    onChange={() => handleToggle('notifications', 'email')}
                    label="Email notifications"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Push Notifications</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Browser push notifications</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.push}
                    onChange={() => handleToggle('notifications', 'push')}
                    label="Push notifications"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">SMS Notifications</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Critical alerts via SMS</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.sms}
                    onChange={() => handleToggle('notifications', 'sms')}
                    label="SMS notifications"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">System Alerts</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Important system notifications</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.alerts}
                    onChange={() => handleToggle('notifications', 'alerts')}
                    label="System alerts"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Report Notifications</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">When reports are ready</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.reports}
                    onChange={() => handleToggle('notifications', 'reports')}
                    label="Report notifications"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Product Updates</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">New features and updates</p>
                  </div>
                  <ToggleSwitch
                    enabled={notifications.updates}
                    onChange={() => handleToggle('notifications', 'updates')}
                    label="Product updates"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'appearance':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Theme Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-4">Color Theme</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setIsDarkMode(false)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        !isDarkMode ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <IoSunny className="text-2xl mx-auto mb-2 text-yellow-500" />
                      <span className="text-sm">Light</span>
                    </button>
                    <button
                      onClick={() => setIsDarkMode(true)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isDarkMode ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <IoMoon className="text-2xl mx-auto mb-2 text-gray-700 dark:text-gray-300" />
                      <span className="text-sm">Dark</span>
                    </button>
                    <button className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                      <HiOutlineCog className="text-2xl mx-auto mb-2 text-gray-500" />
                      <span className="text-sm">System</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-4">Accent Color</h4>
                  <div className="flex gap-3">
                    {['bg-blue-500', 'bg-teal-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-green-500'].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full ${color} hover:scale-110 transition-transform`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-4">Font Size</h4>
                  <select 
                    onChange={() => setHasChanges(true)}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option>Small</option>
                    <option>Medium (Default)</option>
                    <option>Large</option>
                    <option>Extra Large</option>
                  </select>
                </div>

                <div>
                  <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-4">Language</h4>
                  <select 
                    onChange={() => setHasChanges(true)}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Swahili</option>
                    <option>French</option>
                    <option>Spanish</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'security':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Password & Authentication</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Current Password</label>
                  <input
                    type="password"
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">New Password</label>
                  <input
                    type="password"
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Confirm New Password</label>
                  <input
                    type="password"
                    className="mt-1 w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
                  Update Password
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-4">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <IoShieldCheckmark className="text-2xl text-success-500" />
                    <div>
                      <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">2FA Enabled</p>
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Extra layer of security</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Active Sessions</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💻</span>
                    <div>
                      <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">MacBook Pro - Chrome</p>
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Nairobi, Kenya • Current session</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400 text-xs font-semibold rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">iPhone 14 - Safari</p>
                      <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Nairobi, Kenya • 2 hours ago</p>
                    </div>
                  </div>
                  <button className="text-error-600 dark:text-error-400 text-sm hover:text-error-700 dark:hover:text-error-300">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'privacy':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Privacy Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Profile Visibility</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Make your profile visible to others</p>
                  </div>
                  <ToggleSwitch
                    enabled={privacy.profileVisible}
                    onChange={() => handleToggle('privacy', 'profileVisible')}
                    label="Profile visibility"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Data Sharing</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Share data with partners</p>
                  </div>
                  <ToggleSwitch
                    enabled={privacy.shareData}
                    onChange={() => handleToggle('privacy', 'shareData')}
                    label="Data sharing"
                  />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Analytics</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Help us improve with usage data</p>
                  </div>
                  <ToggleSwitch
                    enabled={privacy.analytics}
                    onChange={() => handleToggle('privacy', 'analytics')}
                    label="Analytics"
                  />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Marketing Communications</h4>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Receive promotional emails</p>
                  </div>
                  <ToggleSwitch
                    enabled={privacy.marketing}
                    onChange={() => handleToggle('privacy', 'marketing')}
                    label="Marketing"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'integrations':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Connected Integrations</h3>
              
              <div className="space-y-4">
                {integrations.map(integration => (
                  <div key={integration.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{integration.icon}</span>
                      <div>
                        <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">{integration.name}</h4>
                        <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">{integration.description}</p>
                        {integration.lastSync && (
                          <p className="caption text-success-600 dark:text-success-400 mt-1">Last sync: {integration.lastSync}</p>
                        )}
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      integration.connected
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        : 'bg-primary-500 text-white hover:bg-primary-600'
                    }`}>
                      {integration.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'data':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Data Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <BiExport className="text-2xl text-primary-500 mb-2" />
                  <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Export Data</h4>
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">Download all your data</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <BiImport className="text-2xl text-primary-500 mb-2" />
                  <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Import Data</h4>
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">Bulk import from CSV/Excel</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <HiOutlineDatabase className="text-2xl text-primary-500 mb-2" />
                  <h4 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Backup</h4>
                  <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">Create data backup</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-error-50 dark:bg-error-900/20 rounded-lg hover:bg-error-100 dark:hover:bg-error-900/30 transition-all"
                >
                  <MdPrivacyTip className="text-2xl text-error-500 mb-2" />
                  <h4 className="subtitle-2 text-error-700 dark:text-error-400">Delete Account</h4>
                  <p className="caption text-error-600 dark:text-error-300 mt-1">Permanently delete all data</p>
                </motion.button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-elevation-2">
              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-6">Storage Usage</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Used: 45.2 GB</span>
                    <span>Total: 100 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full" style={{ width: '45.2%' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-on-surface-light dark:text-on-surface-dark">12.3 GB</p>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Documents</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-on-surface-light dark:text-on-surface-dark">8.7 GB</p>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Reports</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-on-surface-light dark:text-on-surface-dark">15.4 GB</p>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Analytics</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-on-surface-light dark:text-on-surface-dark">8.8 GB</p>
                    <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Backups</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
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
                <HiOutlineCog className="text-primary-500" />
                Settings
              </h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                Manage your account and preferences
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1 bg-warning-100 dark:bg-warning-900/20 text-warning-700 dark:text-warning-400 rounded-full text-sm font-medium"
              >
                Unsaved changes
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={!hasChanges}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-elevation-2 transition-all ${
                hasChanges
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-elevation-3'
                  : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              <IoSave />
              Save Changes
            </motion.button>
          </div>
        </motion.header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-y-auto"
          >
            <div className="space-y-1">
              {settingsTabs.map(tab => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <tab.icon className="text-lg" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;