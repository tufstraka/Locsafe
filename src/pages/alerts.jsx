import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import { IoMenu, IoSearch, IoFilterSharp, IoClose } from 'react-icons/io5';
import { MdWarning, MdError, MdInfo, MdCheckCircle, MdNotifications, MdDelete, MdArchive } from 'react-icons/md';
import { HiDotsVertical } from 'react-icons/hi';

const Alerts = () => {
  const { showNav, toggleNav } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Sample alerts data
  const [alerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'System Outage Detected',
      description: 'Primary server experiencing downtime. Immediate action required.',
      timestamp: new Date(Date.now() - 5 * 60000),
      status: 'active',
      source: 'System Monitor',
      priority: 'high',
      location: 'Nairobi DC',
      affectedAssets: 12,
      icon: MdError,
      color: 'error'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Temperature Excursion Alert',
      description: 'Cold chain breach detected in shipment #KE2024-789. Temperature exceeded threshold.',
      timestamp: new Date(Date.now() - 30 * 60000),
      status: 'active',
      source: 'IoT Sensors',
      priority: 'high',
      location: 'Transit - Mombasa',
      affectedAssets: 1,
      icon: MdWarning,
      color: 'warning'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      description: 'System maintenance scheduled for tonight from 2:00 AM to 4:00 AM EAT.',
      timestamp: new Date(Date.now() - 2 * 3600000),
      status: 'acknowledged',
      source: 'Admin',
      priority: 'low',
      location: 'All Locations',
      affectedAssets: 0,
      icon: MdInfo,
      color: 'info'
    },
    {
      id: 4,
      type: 'success',
      title: 'Delivery Completed Successfully',
      description: 'Shipment #KE2024-788 delivered on time to Nairobi warehouse.',
      timestamp: new Date(Date.now() - 3 * 3600000),
      status: 'resolved',
      source: 'Delivery System',
      priority: 'low',
      location: 'Nairobi',
      affectedAssets: 1,
      icon: MdCheckCircle,
      color: 'success'
    },
    {
      id: 5,
      type: 'warning',
      title: 'Route Deviation Detected',
      description: 'Vehicle KBA 123X deviated from planned route. Monitoring in progress.',
      timestamp: new Date(Date.now() - 4 * 3600000),
      status: 'active',
      source: 'GPS Tracking',
      priority: 'medium',
      location: 'Nakuru Highway',
      affectedAssets: 1,
      icon: MdWarning,
      color: 'warning'
    },
    {
      id: 6,
      type: 'critical',
      title: 'Unauthorized Access Attempt',
      description: 'Multiple failed login attempts detected from unknown IP address.',
      timestamp: new Date(Date.now() - 5 * 3600000),
      status: 'active',
      source: 'Security System',
      priority: 'high',
      location: 'System',
      affectedAssets: 0,
      icon: MdError,
      color: 'error'
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Alerts', count: alerts.length, icon: MdNotifications },
    { id: 'critical', label: 'Critical', count: alerts.filter(a => a.type === 'critical').length, icon: MdError, color: 'text-error-500' },
    { id: 'warning', label: 'Warnings', count: alerts.filter(a => a.type === 'warning').length, icon: MdWarning, color: 'text-warning-500' },
    { id: 'info', label: 'Information', count: alerts.filter(a => a.type === 'info').length, icon: MdInfo, color: 'text-info-500' },
    { id: 'success', label: 'Resolved', count: alerts.filter(a => a.type === 'success').length, icon: MdCheckCircle, color: 'text-success-500' }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesCategory = selectedCategory === 'all' || alert.type === selectedCategory;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAlertSelection = (alertId) => {
    setSelectedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const getAlertStyles = (type) => {
    switch(type) {
      case 'critical':
        return 'border-l-4 border-error-500 bg-error-50 dark:bg-error-900/20';
      case 'warning':
        return 'border-l-4 border-warning-500 bg-warning-50 dark:bg-warning-900/20';
      case 'info':
        return 'border-l-4 border-info-500 bg-info-50 dark:bg-info-900/20';
      case 'success':
        return 'border-l-4 border-success-500 bg-success-50 dark:bg-success-900/20';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getIconColor = (color) => {
    switch(color) {
      case 'error': return 'text-error-500';
      case 'warning': return 'text-warning-500';
      case 'info': return 'text-info-500';
      case 'success': return 'text-success-500';
      default: return 'text-gray-500';
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
              <h1 className="headline-5 text-on-surface-light dark:text-on-surface-dark">Alert Center</h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                {filteredAlerts.length} active alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <IoSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-48 text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* Filter Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all"
            >
              <IoFilterSharp className="text-xl text-gray-600 dark:text-gray-400" />
            </motion.button>

            {/* Bulk Actions */}
            {selectedAlerts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/20 rounded-lg"
              >
                <span className="caption text-primary-700 dark:text-primary-300">
                  {selectedAlerts.length} selected
                </span>
                <button className="p-1 hover:bg-primary-200 dark:hover:bg-primary-800 rounded">
                  <MdArchive className="text-primary-600 dark:text-primary-400" />
                </button>
                <button className="p-1 hover:bg-primary-200 dark:hover:bg-primary-800 rounded">
                  <MdDelete className="text-primary-600 dark:text-primary-400" />
                </button>
                <button 
                  onClick={() => setSelectedAlerts([])}
                  className="p-1 hover:bg-primary-200 dark:hover:bg-primary-800 rounded"
                >
                  <IoClose className="text-primary-600 dark:text-primary-400" />
                </button>
              </motion.div>
            )}
          </div>
        </motion.header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Categories */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-y-auto"
          >
            <h2 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">Categories</h2>
            <div className="space-y-1">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <category.icon className={`text-xl ${category.color || ''}`} />
                    <span className="subtitle-2">{category.label}</span>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.count}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl">
              <h3 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-3">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Response Rate</span>
                  <span className="caption font-semibold text-success-600 dark:text-success-400">98.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Avg. Resolution</span>
                  <span className="caption font-semibold text-info-600 dark:text-info-400">12 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Active Issues</span>
                  <span className="caption font-semibold text-warning-600 dark:text-warning-400">3</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Alerts List */}
          <div className="flex-1 overflow-y-auto p-6">
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Priority</label>
                      <select className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none">
                        <option>All Priorities</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Status</label>
                      <select className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Acknowledged</option>
                        <option>Resolved</option>
                      </select>
                    </div>
                    <div>
                      <label className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">Time Range</label>
                      <select className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>All Time</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-4">
              {filteredAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className={`relative p-4 rounded-xl shadow-elevation-2 hover:shadow-elevation-3 transition-all ${getAlertStyles(alert.type)}`}
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={() => toggleAlertSelection(alert.id)}
                      className="mt-1 w-4 h-4 text-primary-600 rounded"
                    />

                    {/* Icon */}
                    <div className={`p-2 rounded-lg bg-white dark:bg-gray-800 ${getIconColor(alert.color)}`}>
                      <alert.icon className="text-2xl" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                            {alert.title}
                          </h3>
                          <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">
                            {alert.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                              📍 {alert.location}
                            </span>
                            <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                              🎯 {alert.source}
                            </span>
                            {alert.affectedAssets > 0 && (
                              <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                                📦 {alert.affectedAssets} assets
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              alert.priority === 'high' ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400' :
                              alert.priority === 'medium' ? 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400' :
                              'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {alert.priority.toUpperCase()}
                            </span>
                            <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium mt-2">
                              {getTimeAgo(alert.timestamp)}
                            </p>
                          </div>
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                            <HiDotsVertical className="text-gray-400" />
                          </button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                        >
                          Acknowledge
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          Dismiss
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          Details
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
