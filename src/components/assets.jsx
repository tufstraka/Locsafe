
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from './sidebar';
import { IoMenu, IoSearch, IoAdd, IoLocationSharp } from 'react-icons/io5';
import { FaTruck, FaWarehouse, FaBox, FaShippingFast, FaTemperatureHigh } from 'react-icons/fa';
import { MdInventory, MdLocalShipping, MdTrendingUp, MdWarning, MdEdit, MdDelete } from 'react-icons/md';
import { HiChip, HiCube, HiTruck, HiOutlineDocumentReport } from 'react-icons/hi';
import { BiRfid } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// CSS for hiding scrollbars
const styles = `
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

const Assets = () => {
  const { showNav, toggleNav } = useNavigation();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Sample asset data
  const assets = [
    {
      id: 'FLEET-001',
      name: 'Delivery Truck Alpha',
      type: 'vehicle',
      status: 'active',
      location: 'Warehouse A',
      temperature: '22°C',
      lastUpdate: '5 mins ago',
      driver: 'John Doe',
      capacity: '5 tons',
      utilization: 75,
      icon: FaTruck,
      color: '#4CAF50',
      trackingEnabled: true,
      maintenanceStatus: 'good'
    },
    {
      id: 'CONT-002',
      name: 'Cold Storage Container #12',
      type: 'container',
      status: 'in-transit',
      location: 'Route to Client XYZ',
      temperature: '-18°C',
      lastUpdate: '2 mins ago',
      cargo: 'Pharmaceuticals',
      capacity: '20ft',
      utilization: 90,
      icon: FaBox,
      color: '#2196F3',
      trackingEnabled: true,
      maintenanceStatus: 'excellent'
    },
    {
      id: 'WH-003',
      name: 'Main Distribution Center',
      type: 'warehouse',
      status: 'operational',
      location: 'Industrial Zone B',
      temperature: '25°C',
      lastUpdate: '1 min ago',
      capacity: '10,000 sqft',
      utilization: 65,
      icon: FaWarehouse,
      color: '#9C27B0',
      trackingEnabled: false,
      maintenanceStatus: 'good'
    },
    {
      id: 'IOT-004',
      name: 'Smart Pallet #45',
      type: 'iot-device',
      status: 'idle',
      location: 'Loading Bay 3',
      temperature: '23°C',
      lastUpdate: '10 mins ago',
      battery: '87%',
      capacity: '2 tons',
      utilization: 0,
      icon: HiChip,
      color: '#FF9800',
      trackingEnabled: true,
      maintenanceStatus: 'excellent'
    },
    {
      id: 'FLEET-005',
      name: 'Refrigerated Van Beta',
      type: 'vehicle',
      status: 'maintenance',
      location: 'Service Center',
      temperature: '4°C',
      lastUpdate: '30 mins ago',
      driver: 'Jane Smith',
      capacity: '3 tons',
      utilization: 0,
      icon: FaShippingFast,
      color: '#f44336',
      trackingEnabled: false,
      maintenanceStatus: 'needs-service'
    },
    {
      id: 'RFID-006',
      name: 'RFID Scanner Unit #7',
      type: 'scanner',
      status: 'active',
      location: 'Receiving Dock',
      lastUpdate: '3 mins ago',
      scansToday: 342,
      battery: '92%',
      utilization: 45,
      icon: BiRfid,
      color: '#00BCD4',
      trackingEnabled: false,
      maintenanceStatus: 'excellent'
    }
  ];

  const assetCategories = [
    { id: 'all', label: 'All Assets', count: assets.length, icon: MdInventory },
    { id: 'vehicle', label: 'Vehicles', count: 2, icon: FaTruck },
    { id: 'container', label: 'Containers', count: 1, icon: FaBox },
    { id: 'warehouse', label: 'Warehouses', count: 1, icon: FaWarehouse },
    { id: 'iot-device', label: 'IoT Devices', count: 1, icon: HiChip },
    { id: 'scanner', label: 'Scanners', count: 1, icon: BiRfid }
  ];

  const quickActions = [
    {
      title: 'Register Vehicle',
      description: 'Add new vehicle to fleet',
      icon: HiTruck,
      color: 'from-blue-500 to-blue-600',
      link: '/vehicles/register'
    },
    {
      title: 'Add Container',
      description: 'Register shipping container',
      icon: HiCube,
      color: 'from-green-500 to-green-600',
      link: '/containers/add'
    },
    {
      title: 'Deploy IoT Device',
      description: 'Setup tracking device',
      icon: HiChip,
      color: 'from-purple-500 to-purple-600',
      link: '/iot/deploy'
    },
    {
      title: 'Generate Report',
      description: 'Asset utilization report',
      icon: HiOutlineDocumentReport,
      color: 'from-orange-500 to-orange-600',
      link: '/reports/assets'
    }
  ];

  const filteredAssets = activeTab === 'all' 
    ? assets.filter(asset => asset.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : assets.filter(asset => 
        asset.type === activeTab && 
        asset.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      'in-transit': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
      'operational': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
      'idle': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
      'maintenance': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[status] || colors.idle;
  };

  const getMaintenanceIcon = (status) => {
    if (status === 'excellent') return '✅';
    if (status === 'good') return '👍';
    return '⚠️';
  };

  return (
    <>
      <style>{styles}</style>
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
          className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white dark:bg-gray-900 shadow-elevation-2 sticky top-0 z-20"
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <motion.button
              onClick={toggleNav}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200 flex-shrink-0"
            >
              <IoMenu className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300" />
            </motion.button>
            
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 truncate">
                <MdInventory className="text-primary-500 flex-shrink-0" />
                <span className="hidden sm:inline">Asset Management</span>
                <span className="sm:hidden">Assets</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                <span className="hidden md:inline">Track and manage supply chain assets</span>
                <span className="md:hidden">Manage assets</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Mobile Search Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <IoSearch className="text-lg text-gray-600 dark:text-gray-400" />
            </motion.button>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <IoSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-64"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
              >
                List
              </button>
            </div>

            {/* Add Asset Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg flex items-center gap-1 sm:gap-2 hover:from-primary-600 hover:to-primary-700 transition-all shadow-elevation-1 text-sm"
            >
              <IoAdd className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Add Asset</span>
              <span className="sm:hidden">Add</span>
            </motion.button>
          </div>
        </motion.header>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 sm:px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <IoSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl shadow-elevation-2 hover:shadow-elevation-3 transition-all"
              >
                <Link to={action.link}>
                  <div className={`bg-gradient-to-r ${action.color} p-3 sm:p-4 text-white`}>
                    <action.icon className="text-2xl sm:text-3xl mb-1 sm:mb-2 opacity-90" />
                    <h3 className="text-sm sm:text-base font-semibold">{action.title}</h3>
                    <p className="text-xs sm:text-sm opacity-90 line-clamp-2">{action.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Asset Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Assets</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{assets.length}</p>
                  <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                    <MdTrendingUp />
                    <span className="hidden sm:inline">+12% from last month</span>
                    <span className="sm:hidden">+12%</span>
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MdInventory className="text-2xl sm:text-3xl text-primary-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Active Assets</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {assets.filter(a => a.status === 'active' || a.status === 'in-transit').length}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {Math.round((assets.filter(a => a.status === 'active' || a.status === 'in-transit').length / assets.length) * 100)}% utilization
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MdLocalShipping className="text-2xl sm:text-3xl text-green-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Maintenance</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {assets.filter(a => a.status === 'maintenance').length}
                  </p>
                  <p className="text-xs sm:text-sm text-orange-600 dark:text-orange-400 flex items-center gap-1 mt-1">
                    <MdWarning />
                    <span className="hidden sm:inline">Requires attention</span>
                    <span className="sm:hidden">Attention</span>
                  </p>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaTemperatureHigh className="text-2xl sm:text-3xl text-orange-500" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Mobile View Mode Toggle */}
          <div className="sm:hidden flex justify-center mb-4">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded text-sm ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded text-sm ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
              >
                List
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 no-scrollbar">
            {assetCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all flex-shrink-0 ${
                    activeTab === category.id
                      ? 'bg-primary-500 text-white shadow-elevation-2'
                      : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="text-base sm:text-lg" />
                  <span className="text-xs sm:text-sm font-medium hidden sm:inline">{category.label}</span>
                  <span className="text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">
                    {category.count}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Assets Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredAssets.map((asset, index) => {
                const Icon = asset.icon;
                return (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedAsset(asset)}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 hover:shadow-elevation-3 p-4 sm:p-5 cursor-pointer transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${asset.color}20` }}
                        >
                          <Icon className="text-xl sm:text-2xl" style={{ color: asset.color }} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                            {asset.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            ID: {asset.id}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <IoLocationSharp className="text-gray-400 flex-shrink-0" />
                        <span className="truncate">{asset.location}</span>
                      </div>
                      {asset.temperature && (
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <FaTemperatureHigh className="text-gray-400 flex-shrink-0" />
                          <span>{asset.temperature}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span className="truncate">Capacity: {asset.capacity}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        {asset.trackingEnabled && (
                          <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-1.5 sm:px-2 py-1 rounded flex-shrink-0">
                            <span className="hidden sm:inline">GPS Active</span>
                            <span className="sm:hidden">GPS</span>
                          </span>
                        )}
                        <span className="text-xs flex-shrink-0">
                          {getMaintenanceIcon(asset.maintenanceStatus)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                          {asset.lastUpdate}
                        </p>
                        {asset.utilization > 0 && (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                            <svg className="transform -rotate-90 w-10 h-10 sm:w-12 sm:h-12">
                              <circle
                                cx="20"
                                cy="20"
                                r="16"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                className="text-gray-200 dark:text-gray-700 sm:hidden"
                              />
                              <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                className="text-gray-200 dark:text-gray-700 hidden sm:block"
                              />
                              <circle
                                cx="20"
                                cy="20"
                                r="16"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${asset.utilization * 1.01} 101`}
                                className="text-primary-500 sm:hidden"
                              />
                              <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={`${asset.utilization * 1.26} 126`}
                                className="text-primary-500 hidden sm:block"
                              />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                              {asset.utilization}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Asset
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">
                        Type
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                        Location
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                        Utilization
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAssets.map((asset) => {
                    const Icon = asset.icon;
                    return (
                      <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${asset.color}20` }}
                            >
                              <Icon className="text-lg sm:text-xl" style={{ color: asset.color }} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                                {asset.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {asset.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {asset.type}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className={`px-1.5 sm:px-2 py-1 text-xs rounded-full ${getStatusColor(asset.status)}`}>
                            {asset.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {asset.location}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <div className="w-16 sm:w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-primary-500 h-2 rounded-full"
                                style={{ width: `${asset.utilization}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {asset.utilization}%
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button className="text-gray-400 hover:text-primary-500 transition-colors">
                              <MdEdit className="text-base sm:text-lg" />
                            </button>
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                              <MdDelete className="text-base sm:text-lg" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Asset Details Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAsset(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${selectedAsset.color}20` }}
                    >
                      <selectedAsset.icon className="text-3xl" style={{ color: selectedAsset.color }} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedAsset.name}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Asset ID: {selectedAsset.id}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedAsset.status)}`}>
                    {selectedAsset.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                    <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <IoLocationSharp className="text-primary-500" />
                      {selectedAsset.location}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Last Update</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedAsset.lastUpdate}
                    </p>
                  </div>
                  {selectedAsset.temperature && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Temperature</p>
                      <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <FaTemperatureHigh className="text-orange-500" />
                        {selectedAsset.temperature}
                      </p>
                    </div>
                  )}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Capacity</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {selectedAsset.capacity}
                    </p>
                  </div>
                </div>

                {/* Utilization Progress */}
                {selectedAsset.utilization !== undefined && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Utilization</p>
                      <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                        {selectedAsset.utilization}%
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all"
                        style={{ width: `${selectedAsset.utilization}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Additional Details */}
                <div className="space-y-3 mb-6">
                  {selectedAsset.driver && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Driver</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedAsset.driver}
                      </span>
                    </div>
                  )}
                  {selectedAsset.cargo && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Cargo</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedAsset.cargo}
                      </span>
                    </div>
                  )}
                  {selectedAsset.battery && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Battery</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedAsset.battery}
                      </span>
                    </div>
                  )}
                  {selectedAsset.scansToday && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Scans Today</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedAsset.scansToday}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tracking</span>
                    <span className={`text-sm font-medium ${
                      selectedAsset.trackingEnabled
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {selectedAsset.trackingEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Maintenance Status</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {getMaintenanceIcon(selectedAsset.maintenanceStatus)} {selectedAsset.maintenanceStatus}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
                    <MdEdit />
                    Edit Asset
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                    <MdDelete />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Asset Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-4 max-w-md w-full p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Add New Asset
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { type: 'Vehicle', icon: FaTruck, color: 'from-blue-500 to-blue-600' },
                  { type: 'Container', icon: FaBox, color: 'from-green-500 to-green-600' },
                  { type: 'Warehouse', icon: FaWarehouse, color: 'from-purple-500 to-purple-600' },
                  { type: 'IoT Device', icon: HiChip, color: 'from-orange-500 to-orange-600' },
                  { type: 'Scanner', icon: BiRfid, color: 'from-cyan-500 to-cyan-600' },
                  { type: 'Other', icon: MdInventory, color: 'from-gray-500 to-gray-600' }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gradient-to-r ${item.color} text-white rounded-lg p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-all`}
                    >
                      <Icon className="text-3xl" />
                      <span className="text-sm font-medium">{item.type}</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
};

export default Assets;
