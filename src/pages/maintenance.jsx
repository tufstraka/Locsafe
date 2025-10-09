import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import {
  IoMenu, IoSearch, IoAdd, IoWarning,
  IoCalendarOutline, IoTimeOutline, IoConstructOutline
} from 'react-icons/io5';
import {
  FiTool, FiAlertCircle, FiClock, FiCalendar,
  FiCheckCircle
} from 'react-icons/fi';
import {
  MdLocalCarWash, MdTireRepair, MdBatteryChargingFull,
  MdFilterAlt, MdEngineering, MdSchedule
} from 'react-icons/md';
import { FaTools, FaWrench, FaCarBattery, FaOilCan } from 'react-icons/fa';

const Maintenance = () => {
  const { showNav, toggleNav } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [viewMode, setViewMode] = useState('upcoming');

  // Sample maintenance data
  const [maintenanceRecords] = useState([
    {
      id: 1,
      vehicleId: 'KBA 123X',
      vehicleName: 'Delivery Truck Alpha',
      type: 'scheduled',
      service: 'Regular Service',
      status: 'pending',
      dueDate: '2025-10-15',
      mileage: 45000,
      estimatedCost: 'KES 12,500',
      priority: 'high',
      items: ['Oil Change', 'Filter Replacement', 'Tire Rotation'],
      icon: FaOilCan,
      color: '#FF9800'
    },
    {
      id: 2,
      vehicleId: 'KBB 456Y',
      vehicleName: 'Van Beta',
      type: 'repair',
      service: 'Brake System Repair',
      status: 'in-progress',
      startDate: '2025-10-08',
      mechanic: 'John Mechanic',
      estimatedCompletion: '2025-10-10',
      cost: 'KES 25,000',
      priority: 'critical',
      icon: FiAlertCircle,
      color: '#F44336'
    },
    {
      id: 3,
      vehicleId: 'KBC 789Z',
      vehicleName: 'Sedan Gamma',
      type: 'scheduled',
      service: 'Battery Check',
      status: 'completed',
      completedDate: '2025-10-05',
      mileage: 32000,
      cost: 'KES 3,500',
      nextService: '2025-12-05',
      priority: 'low',
      icon: FaCarBattery,
      color: '#4CAF50'
    },
    {
      id: 4,
      vehicleId: 'KBD 012A',
      vehicleName: 'Motorcycle Delta',
      type: 'inspection',
      service: 'Safety Inspection',
      status: 'overdue',
      dueDate: '2025-10-01',
      lastService: '2025-07-01',
      priority: 'high',
      items: ['Brake Check', 'Light Test', 'Tire Inspection'],
      icon: MdEngineering,
      color: '#9C27B0'
    },
    {
      id: 5,
      vehicleId: 'KBE 345B',
      vehicleName: 'Truck Echo',
      type: 'scheduled',
      service: 'Tire Replacement',
      status: 'scheduled',
      scheduledDate: '2025-10-20',
      mileage: 67000,
      estimatedCost: 'KES 45,000',
      priority: 'medium',
      icon: MdTireRepair,
      color: '#2196F3'
    }
  ]);

  const categories = [
    { id: 'all', label: 'All Services', count: maintenanceRecords.length, icon: FiTool },
    { id: 'scheduled', label: 'Scheduled', count: maintenanceRecords.filter(m => m.type === 'scheduled').length, icon: IoCalendarOutline },
    { id: 'repair', label: 'Repairs', count: maintenanceRecords.filter(m => m.type === 'repair').length, icon: FaWrench },
    { id: 'inspection', label: 'Inspections', count: maintenanceRecords.filter(m => m.type === 'inspection').length, icon: MdEngineering }
  ];

  const statusOptions = [
    { id: 'pending', label: 'Pending', color: 'text-warning-500', bgColor: 'bg-warning-100 dark:bg-warning-900/20' },
    { id: 'in-progress', label: 'In Progress', color: 'text-info-500', bgColor: 'bg-info-100 dark:bg-info-900/20' },
    { id: 'completed', label: 'Completed', color: 'text-success-500', bgColor: 'bg-success-100 dark:bg-success-900/20' },
    { id: 'overdue', label: 'Overdue', color: 'text-error-500', bgColor: 'bg-error-100 dark:bg-error-900/20' },
    { id: 'scheduled', label: 'Scheduled', color: 'text-primary-500', bgColor: 'bg-primary-100 dark:bg-primary-900/20' }
  ];

  const maintenanceTypes = [
    { type: 'Oil Change', icon: FaOilCan, interval: '5,000 km', lastDone: '40,000 km' },
    { type: 'Tire Rotation', icon: MdTireRepair, interval: '10,000 km', lastDone: '35,000 km' },
    { type: 'Battery Check', icon: MdBatteryChargingFull, interval: '6 months', lastDone: '3 months ago' },
    { type: 'Filter Replace', icon: MdFilterAlt, interval: '15,000 km', lastDone: '30,000 km' },
    { type: 'Brake Service', icon: FiAlertCircle, interval: '20,000 km', lastDone: '25,000 km' },
    { type: 'Car Wash', icon: MdLocalCarWash, interval: 'Weekly', lastDone: '3 days ago' }
  ];

  const getStatusStyle = (status) => {
    const option = statusOptions.find(opt => opt.id === status);
    return option || statusOptions[0];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'critical': 'text-error-500 bg-error-100 dark:bg-error-900/20',
      'high': 'text-warning-500 bg-warning-100 dark:bg-warning-900/20',
      'medium': 'text-info-500 bg-info-100 dark:bg-info-900/20',
      'low': 'text-success-500 bg-success-100 dark:bg-success-900/20'
    };
    return colors[priority] || colors.medium;
  };

  const filteredRecords = maintenanceRecords.filter(record => {
    const matchesCategory = selectedCategory === 'all' || record.type === selectedCategory;
    const matchesSearch = record.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesView = viewMode === 'all' || 
                        (viewMode === 'upcoming' && (record.status === 'pending' || record.status === 'scheduled')) ||
                        (viewMode === 'overdue' && record.status === 'overdue') ||
                        (viewMode === 'completed' && record.status === 'completed');
    return matchesCategory && matchesSearch && matchesView;
  });

  const upcomingCount = maintenanceRecords.filter(r => r.status === 'pending' || r.status === 'scheduled').length;
  const overdueCount = maintenanceRecords.filter(r => r.status === 'overdue').length;
  const inProgressCount = maintenanceRecords.filter(r => r.status === 'in-progress').length;

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

      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between px-4 sm:px-6 py-4 bg-surface-light/95 dark:bg-surface-elevated-dark/95 backdrop-blur-xl shadow-elevation-1 dark:shadow-elevation-dark-1"
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
              <h1 className="headline-6 sm:headline-5 text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
                <FaTools className="text-primary-500" />
                Maintenance Schedule
              </h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium hidden sm:block">
                Track and manage vehicle maintenance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowScheduleModal(!showScheduleModal)}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1 md:hidden"
            >
              <IoSearch className="text-xl text-gray-600 dark:text-gray-400" />
            </motion.button>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <IoSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search maintenance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-48 lg:w-64 text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* Schedule Maintenance Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowScheduleModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              <IoAdd className="text-xl" />
              <span className="hidden sm:inline">Schedule</span>
            </motion.button>
          </div>
        </motion.header>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showScheduleModal && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <IoSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search maintenance..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm flex-1 text-gray-700 dark:text-gray-300"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View Mode Tabs */}
        <div className="px-4 sm:px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'upcoming', label: 'Upcoming', count: upcomingCount },
                { id: 'overdue', label: 'Overdue', count: overdueCount, alert: true },
                { id: 'completed', label: 'Completed', count: null },
                { id: 'all', label: 'All Records', count: maintenanceRecords.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                    viewMode === tab.id
                      ? 'bg-primary-500 text-white shadow-elevation-1'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      viewMode === tab.id 
                        ? 'bg-white/20' 
                        : tab.alert 
                          ? 'bg-error-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Stats - Hidden on mobile */}
          <div className="hidden lg:block w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
            {/* Quick Stats */}
            <div className="mb-6 space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-gradient-to-r from-warning-500 to-warning-600 text-white rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Overdue Services</p>
                    <p className="text-3xl font-bold">{overdueCount}</p>
                  </div>
                  <IoWarning className="text-4xl text-white/50" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 bg-gradient-to-r from-info-500 to-info-600 text-white rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">In Progress</p>
                    <p className="text-3xl font-bold">{inProgressCount}</p>
                  </div>
                  <IoConstructOutline className="text-4xl text-white/50" />
                </div>
              </motion.div>
            </div>

            {/* Service Categories */}
            <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-3">Categories</h3>
            <div className="space-y-1 mb-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
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
                      <Icon className="text-xl" />
                      <span className="subtitle-2">{category.label}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-primary-200 dark:bg-primary-800'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Maintenance Types */}
            <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-3">Service Types</h3>
            <div className="space-y-2">
              {maintenanceTypes.map((type, index) => {
                const Icon = type.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {type.type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {type.interval}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last: {type.lastDone}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Maintenance Records Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredRecords.map((record, index) => {
                const Icon = record.icon;
                const statusStyle = getStatusStyle(record.status);
                return (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 hover:shadow-elevation-3 transition-all overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${record.color}20` }}
                          >
                            <Icon className="text-2xl" style={{ color: record.color }} />
                          </div>
                          <div>
                            <h3 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">
                              {record.vehicleName}
                            </h3>
                            <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                              {record.vehicleId}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${statusStyle.bgColor} ${statusStyle.color}`}>
                          {statusStyle.label}
                        </span>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="p-4 space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.service}
                        </p>
                        <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getPriorityColor(record.priority)}`}>
                          {record.priority} priority
                        </span>
                      </div>

                      {/* Date/Time Info */}
                      <div className="space-y-2 text-sm">
                        {record.dueDate && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FiCalendar className="text-gray-400" />
                            <span>Due: {new Date(record.dueDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {record.scheduledDate && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <MdSchedule className="text-gray-400" />
                            <span>Scheduled: {new Date(record.scheduledDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {record.completedDate && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FiCheckCircle className="text-gray-400" />
                            <span>Completed: {new Date(record.completedDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {record.estimatedCompletion && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <FiClock className="text-gray-400" />
                            <span>Est. Completion: {new Date(record.estimatedCompletion).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Cost Info */}
                      {(record.cost || record.estimatedCost) && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {record.cost ? 'Cost' : 'Est. Cost'}
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {record.cost || record.estimatedCost}
                          </span>
                        </div>
                      )}

                      {/* Service Items */}
                      {record.items && (
                        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Service Items:</p>
                          <div className="space-y-1">
                            {record.items.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 px-3 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
                        >
                          View Details
                        </motion.button>
                        {record.status === 'pending' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            <IoTimeOutline className="text-lg" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredRecords.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <FiTool className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="headline-6 text-gray-600 dark:text-gray-400 mb-2">
                  No maintenance records found
                </h3>
                <p className="body-2 text-gray-500 dark:text-gray-500">
                  Try adjusting your filters or search query
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Maintenance;