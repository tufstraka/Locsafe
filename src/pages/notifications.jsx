import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import { IoMenu, IoNotifications, IoClose, IoFilter, IoSettingsSharp } from 'react-icons/io5';
import { FaArchive, FaStar } from 'react-icons/fa';
import { MdNotificationsActive, MdNotificationsNone, MdMarkEmailRead, MdDelete } from 'react-icons/md';
import { HiOutlineBell } from 'react-icons/hi';
import { BiTime, BiCheck } from 'react-icons/bi';

const Notifications = () => {
  const { showNav, toggleNav } = useNavigation();
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    inApp: true,
    sound: false
  });

  // Sample notifications data
  const [notifications] = useState([
    {
      id: 1,
      type: 'shipment',
      title: 'Shipment Delivered Successfully',
      message: 'Shipment #KE2024-789 has been delivered to Nairobi warehouse.',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      important: true,
      icon: '📦',
      category: 'deliveries',
      action: { label: 'View Details', link: '/shipments/KE2024-789' }
    },
    {
      id: 2,
      type: 'alert',
      title: 'Temperature Alert',
      message: 'Cold chain temperature exceeded threshold for shipment #VAC2024-001.',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      important: true,
      icon: '🌡️',
      category: 'alerts',
      action: { label: 'Take Action', link: '/alerts' }
    },
    {
      id: 3,
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'System maintenance will be performed tonight from 2:00 AM to 4:00 AM EAT.',
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: true,
      important: false,
      icon: '🔧',
      category: 'system',
      action: null
    },
    {
      id: 4,
      type: 'report',
      title: 'Monthly Report Ready',
      message: 'Your January 2024 performance report is ready for download.',
      timestamp: new Date(Date.now() - 3 * 3600000),
      read: false,
      important: false,
      icon: '📊',
      category: 'reports',
      action: { label: 'Download', link: '/reports/january-2024' }
    },
    {
      id: 5,
      type: 'driver',
      title: 'Driver Check-in',
      message: 'Driver John Kamau has checked in for delivery route #RT-456.',
      timestamp: new Date(Date.now() - 4 * 3600000),
      read: true,
      important: false,
      icon: '🚚',
      category: 'drivers',
      action: { label: 'View Route', link: '/routes/RT-456' }
    },
    {
      id: 6,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of KES 45,000 received from QuickMart Kenya.',
      timestamp: new Date(Date.now() - 5 * 3600000),
      read: false,
      important: true,
      icon: '💰',
      category: 'finance',
      action: { label: 'View Invoice', link: '/invoices/INV-2024-089' }
    },
    {
      id: 7,
      type: 'compliance',
      title: 'Compliance Update',
      message: 'New GDP compliance requirements effective from February 1, 2024.',
      timestamp: new Date(Date.now() - 24 * 3600000),
      read: false,
      important: true,
      icon: '📋',
      category: 'compliance',
      action: { label: 'Learn More', link: '/compliance/gdp-2024' }
    },
    {
      id: 8,
      type: 'customer',
      title: 'Customer Feedback',
      message: 'New 5-star review from MediPharma Kenya for recent delivery.',
      timestamp: new Date(Date.now() - 2 * 24 * 3600000),
      read: true,
      important: false,
      icon: '⭐',
      category: 'feedback',
      action: { label: 'View Review', link: '/reviews/234' }
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Notifications', icon: HiOutlineBell, count: notifications.length },
    { id: 'unread', label: 'Unread', icon: MdNotificationsActive, count: notifications.filter(n => !n.read).length },
    { id: 'important', label: 'Important', icon: FaStar, count: notifications.filter(n => n.important).length },
    { id: 'deliveries', label: 'Deliveries', icon: '📦', count: notifications.filter(n => n.category === 'deliveries').length },
    { id: 'alerts', label: 'Alerts', icon: '🚨', count: notifications.filter(n => n.category === 'alerts').length },
    { id: 'system', label: 'System', icon: '⚙️', count: notifications.filter(n => n.category === 'system').length },
    { id: 'finance', label: 'Finance', icon: '💳', count: notifications.filter(n => n.category === 'finance').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = 
      selectedTab === 'all' || 
      (selectedTab === 'unread' && !notification.read) ||
      (selectedTab === 'important' && notification.important) ||
      notification.category === selectedTab;
    
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const toggleNotificationSelection = (notificationId) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId) 
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return timestamp.toLocaleDateString();
  };

  const markAsRead = (ids) => {
    // Implementation for marking notifications as read
    console.log('Marking as read:', ids);
  };

  const deleteNotifications = (ids) => {
    // Implementation for deleting notifications
    console.log('Deleting:', ids);
  };

  const archiveNotifications = (ids) => {
    // Implementation for archiving notifications
    console.log('Archiving:', ids);
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
                <IoNotifications className="text-primary-500" />
                Notifications Center
              </h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                {filteredNotifications.filter(n => !n.read).length} unread notifications
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <span className="material-icons text-gray-400">search</span>
              <input
                type="text"
                placeholder="Search notifications..."
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
              <IoFilter className="text-xl text-gray-600 dark:text-gray-400" />
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-all"
            >
              <IoSettingsSharp className="text-xl text-gray-600 dark:text-gray-400" />
            </motion.button>

            {/* Bulk Actions */}
            {selectedNotifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/20 rounded-lg"
              >
                <span className="caption text-primary-700 dark:text-primary-300">
                  {selectedNotifications.length} selected
                </span>
                <button 
                  onClick={() => markAsRead(selectedNotifications)}
                  className="p-1 hover:bg-primary-200 dark:hover:bg-primary-800 rounded"
                >
                  <MdMarkEmailRead className="text-primary-600 dark:text-primary-400" />
                </button>
                <button 
                  onClick={() => archiveNotifications(selectedNotifications)}
                  className="p-1 hover:bg-primary-200 dark:hover:bg-primary-800 rounded"
                >
                  <FaArchive className="text-primary-600 dark:text-primary-400" />
                </button>
                <button 
                  onClick={() => deleteNotifications(selectedNotifications)}
                  className="p-1 hover:bg-primary-200 dark:hover:bg-primary-800 rounded"
                >
                  <MdDelete className="text-primary-600 dark:text-primary-400" />
                </button>
                <button 
                  onClick={() => setSelectedNotifications([])}
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
                  onClick={() => setSelectedTab(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    selectedTab === category.id
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {typeof category.icon === 'string' ? (
                      <span className="text-xl">{category.icon}</span>
                    ) : (
                      <category.icon className="text-xl" />
                    )}
                    <span className="subtitle-2">{category.label}</span>
                  </div>
                  {category.count > 0 && (
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      selectedTab === category.id
                        ? 'bg-primary-200 dark:bg-primary-800 text-primary-800 dark:text-primary-200'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {category.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Notification Settings */}
            <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl">
              <h3 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-3">Quick Settings</h3>
              <div className="space-y-2">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="caption capitalize">{key} Notifications</span>
                    <button
                      onClick={() => setNotificationSettings(prev => ({ ...prev, [key]: !value }))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        value ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-5' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="caption text-gray-600 dark:text-gray-400">Today</span>
                <span className="caption font-semibold">12 new</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="caption text-gray-600 dark:text-gray-400">This week</span>
                <span className="caption font-semibold">84 total</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="caption text-gray-600 dark:text-gray-400">Response rate</span>
                <span className="caption font-semibold text-green-600 dark:text-green-400">98%</span>
              </div>
            </div>
          </motion.div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="caption text-gray-600 dark:text-gray-400">Type</label>
                      <select className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none">
                        <option>All Types</option>
                        <option>Shipments</option>
                        <option>Alerts</option>
                        <option>System</option>
                        <option>Finance</option>
                      </select>
                    </div>
                    <div>
                      <label className="caption text-gray-600 dark:text-gray-400">Priority</label>
                      <select className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none">
                        <option>All Priorities</option>
                        <option>Important</option>
                        <option>Normal</option>
                      </select>
                    </div>
                    <div>
                      <label className="caption text-gray-600 dark:text-gray-400">Date Range</label>
                      <select className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none">
                        <option>All Time</option>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                      </select>
                    </div>
                    <div>
                      <label className="caption text-gray-600 dark:text-gray-400">Status</label>
                      <select className="mt-1 w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg outline-none">
                        <option>All Status</option>
                        <option>Read</option>
                        <option>Unread</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notifications */}
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className={`relative p-4 rounded-xl shadow-elevation-2 hover:shadow-elevation-3 transition-all ${
                      !notification.read 
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                        : 'bg-white dark:bg-gray-900'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => toggleNotificationSelection(notification.id)}
                        className="mt-1 w-4 h-4 text-primary-600 rounded"
                      />

                      {/* Icon */}
                      <div className="text-2xl">{notification.icon}</div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                                {notification.title}
                              </h3>
                              {notification.important && (
                                <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 text-xs rounded-full">
                                  Important
                                </span>
                              )}
                              {!notification.read && (
                                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="body-2 text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 mt-3">
                              <span className="caption text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <BiTime />
                                {getTimeAgo(notification.timestamp)}
                              </span>
                              {notification.action && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="px-3 py-1 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                                >
                                  {notification.action.label}
                                </motion.button>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <button 
                                onClick={() => markAsRead([notification.id])}
                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                                title="Mark as read"
                              >
                                <BiCheck className="text-gray-600 dark:text-gray-400" />
                              </button>
                            )}
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors" title="Archive">
                              <FaArchive className="text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors" title="Delete">
                              <MdDelete className="text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <MdNotificationsNone className="text-6xl text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                  <h3 className="subtitle-1 text-gray-600 dark:text-gray-400 mb-2">No notifications</h3>
                  <p className="body-2 text-gray-500 dark:text-gray-500">You&apos;re all caught up!</p>
                </div>
              )}
            </div>

            {/* Load More */}
            {filteredNotifications.length > 0 && (
              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg font-medium shadow-elevation-2 hover:shadow-elevation-3 transition-all"
                >
                  Load More Notifications
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;