import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import { IoMenu, IoLocationSharp, IoAdd, IoShield } from 'react-icons/io5';
import { FaMapMarkedAlt, FaDrawPolygon, FaRoute, FaSave, FaEdit, FaTrash, FaPlay, FaPause } from 'react-icons/fa';
import { MdMyLocation, MdNotificationImportant } from 'react-icons/md';
import GeofenceMap from '../components/geofence-map.jsx';

const Geofence = () => {
  const { showNav, toggleNav } = useNavigation();
  const [activeTab, setActiveTab] = useState('active');
  const [selectedZone, setSelectedZone] = useState(null);
  const [isCreatingZone, setIsCreatingZone] = useState(false);
  const [zoneType, setZoneType] = useState('circular');
  const [createdShapes, setCreatedShapes] = useState([]);
  
  const [geofences, setGeofences] = useState([
    {
      id: 1,
      name: 'Nairobi CBD Zone',
      type: 'circular',
      status: 'active',
      radius: '5km',
      center: { lat: -1.2864, lng: 36.8172 },
      vehicles: 12,
      alerts: 3,
      createdAt: '2024-01-15',
      color: '#10B981',
      rules: ['Entry Alert', 'Exit Alert', 'Speed Limit: 50km/h']
    },
    {
      id: 2,
      name: 'Mombasa Port Area',
      type: 'polygon',
      status: 'active',
      area: '15km²',
      vehicles: 8,
      alerts: 1,
      createdAt: '2024-01-18',
      color: '#3B82F6',
      rules: ['Entry Alert', 'Dwell Time > 30min', 'Restricted Hours: 10PM-6AM']
    },
    {
      id: 3,
      name: 'Kisumu Warehouse',
      type: 'circular',
      status: 'inactive',
      radius: '2km',
      center: { lat: -0.0917, lng: 34.7680 },
      vehicles: 0,
      alerts: 0,
      createdAt: '2024-01-20',
      color: '#8B5CF6',
      rules: ['Exit Alert', 'Unauthorized Entry']
    },
    {
      id: 4,
      name: 'Northern Corridor Route',
      type: 'route',
      status: 'active',
      length: '450km',
      vehicles: 24,
      alerts: 5,
      createdAt: '2024-01-22',
      color: '#F59E0B',
      rules: ['Route Deviation', 'Stop Duration > 1hr', 'Speed Alert']
    },
    {
      id: 5,
      name: 'Restricted Zone - Military Base',
      type: 'polygon',
      status: 'active',
      area: '8km²',
      vehicles: 0,
      alerts: 0,
      createdAt: '2024-01-10',
      color: '#EF4444',
      rules: ['No Entry', 'Proximity Alert: 1km', 'Immediate Notification']
    }
  ]);

  const alertTypes = [
    { id: 'entry', label: 'Entry Alert', icon: '📥', description: 'Notify when vehicle enters zone' },
    { id: 'exit', label: 'Exit Alert', icon: '📤', description: 'Notify when vehicle exits zone' },
    { id: 'dwell', label: 'Dwell Time', icon: '⏱️', description: 'Alert if vehicle stays too long' },
    { id: 'speed', label: 'Speed Limit', icon: '🚄', description: 'Monitor speed within zone' },
    { id: 'stop', label: 'Unauthorized Stop', icon: '🛑', description: 'Alert on unexpected stops' },
    { id: 'deviation', label: 'Route Deviation', icon: '↗️', description: 'Notify if vehicle leaves route' }
  ];

  const stats = [
    { label: 'Active Zones', value: geofences.filter(g => g.status === 'active').length, color: 'text-green-500', icon: IoShield },
    { label: 'Total Vehicles', value: geofences.reduce((sum, g) => sum + g.vehicles, 0), color: 'text-blue-500', icon: '🚚' },
    { label: 'Active Alerts', value: geofences.reduce((sum, g) => sum + g.alerts, 0), color: 'text-yellow-500', icon: MdNotificationImportant },
    { label: 'Coverage Area', value: '2,450 km²', color: 'text-purple-500', icon: FaMapMarkedAlt }
  ];

  const handleCreateZone = () => {
    setIsCreatingZone(true);
  };

  const handleShapeCreated = (shapeData) => {
    console.log('New shape created:', shapeData);
    setCreatedShapes([...createdShapes, shapeData]);
    
    // Create new geofence from shape data
    const newGeofence = {
      id: Date.now(),
      name: `New Zone ${geofences.length + 1}`,
      type: shapeData.type === 'circle' ? 'circular' : shapeData.type === 'polyline' ? 'route' : 'polygon',
      status: 'inactive',
      vehicles: 0,
      alerts: 0,
      createdAt: new Date().toISOString().split('T')[0],
      color: '#6366f1',
      rules: [],
      ...shapeData
    };
    
    setGeofences([...geofences, newGeofence]);
    setSelectedZone(newGeofence);
    setIsCreatingZone(false);
  };

  const handleDeleteZone = (id) => {
    // Implementation for deleting geofence
    console.log('Deleting zone:', id);
  };

  const handleToggleZone = (id) => {
    // Implementation for toggling geofence status
    console.log('Toggling zone:', id);
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
          className="flex items-center justify-between px-4 sm:px-6 py-4 bg-surface-light/95 dark:bg-surface-elevated-dark/95 backdrop-blur-xl shadow-elevation-1 dark:shadow-elevation-dark-1 sticky top-0 z-20"
        >
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <motion.button
              onClick={toggleNav}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200 flex-shrink-0"
              aria-label="Toggle navigation"
            >
              <IoMenu className="text-xl sm:text-2xl text-on-surface-light dark:text-on-surface-dark" />
            </motion.button>
            
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-on-surface-light dark:text-on-surface-dark flex items-center gap-2 truncate">
                <IoLocationSharp className="text-primary-500 flex-shrink-0" />
                <span className="hidden sm:inline">Geofence Management</span>
                <span className="sm:hidden">Geofence</span>
              </h1>
              <p className="text-xs sm:text-sm text-on-surface-light-medium dark:text-on-surface-dark-medium truncate">
                <span className="hidden md:inline">Define and monitor geographical boundaries for your fleet</span>
                <span className="md:hidden">Manage geo boundaries</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateZone}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg shadow-elevation-2 hover:shadow-elevation-3 transition-all flex items-center gap-2"
            >
              <IoAdd className="text-lg sm:text-xl" />
              <span className="hidden sm:inline">Create Zone</span>
              <span className="sm:hidden text-sm">Create</span>
            </motion.button>
          </div>
        </motion.header>

        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col lg:grid lg:grid-cols-3 h-full">
            {/* Mobile: Collapsible Stats Bar */}
            <div className="lg:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-3">
              <div className="grid grid-cols-4 gap-2">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 text-center"
                  >
                    <div className="flex flex-col items-center">
                      {typeof stat.icon === 'string' ? (
                        <span className="text-lg">{stat.icon}</span>
                      ) : (
                        <stat.icon className={`text-lg ${stat.color}`} />
                      )}
                      <span className={`text-lg font-bold ${stat.color}`}>
                        {stat.value}
                      </span>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate w-full">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Left Panel - Geofence List */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 overflow-y-auto max-h-96 lg:max-h-none">
              {/* Desktop Stats */}
              <div className="hidden lg:block p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        {typeof stat.icon === 'string' ? (
                          <span className="text-xl">{stat.icon}</span>
                        ) : (
                          <stat.icon className={`text-xl ${stat.color}`} />
                        )}
                        <span className={`text-2xl font-bold ${stat.color}`}>
                          {stat.value}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                {['active', 'inactive', 'all'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium capitalize transition-all ${
                      activeTab === tab
                        ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Geofence List */}
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {geofences
                  .filter(g => activeTab === 'all' || g.status === activeTab)
                  .map((geofence) => (
                    <motion.div
                      key={geofence.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedZone(geofence)}
                      className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all ${
                        selectedZone?.id === geofence.id
                          ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-500'
                          : 'bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: geofence.color }}
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className="text-sm sm:text-base font-semibold text-on-surface-light dark:text-on-surface-dark truncate">
                              {geofence.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-1.5 sm:px-2 py-0.5 text-xs rounded-full ${
                                geofence.status === 'active'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                              }`}>
                                {geofence.status}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {geofence.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleZone(geofence.id);
                            }}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          >
                            {geofence.status === 'active' ? (
                              <FaPause className="text-xs sm:text-sm text-yellow-600 dark:text-yellow-400" />
                            ) : (
                              <FaPlay className="text-xs sm:text-sm text-green-600 dark:text-green-400" />
                            )}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          >
                            <FaEdit className="text-xs sm:text-sm text-blue-600 dark:text-blue-400" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteZone(geofence.id);
                            }}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                          >
                            <FaTrash className="text-xs sm:text-sm text-red-600 dark:text-red-400" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Vehicles</p>
                          <p className="text-sm font-semibold">{geofence.vehicles}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Alerts</p>
                          <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                            {geofence.alerts}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {geofence.type === 'circular' ? 'Radius' :
                             geofence.type === 'route' ? 'Length' : 'Area'}
                          </p>
                          <p className="text-sm font-semibold truncate">
                            {geofence.radius || geofence.area || geofence.length}
                          </p>
                        </div>
                      </div>

                      {geofence.rules && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Active Rules:</p>
                          <div className="flex flex-wrap gap-1">
                            {geofence.rules.map((rule, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-xs rounded truncate"
                              >
                                {rule}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Right Panel - Map & Details */}
            <div className="lg:col-span-2 relative flex-1">
              {/* Map */}
              <div className="absolute inset-0">
                <GeofenceMap
                  onShapeCreated={handleShapeCreated}
                  existingGeofences={geofences}
                  selectedZone={selectedZone}
                  isDrawing={isCreatingZone}
                  drawingType={zoneType}
                />
              </div>

              {/* Overlay Controls */}
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-start pointer-events-none">
                {/* Zone Type Selector */}
                {isCreatingZone && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-3 p-3 sm:p-4 pointer-events-auto max-w-xs sm:max-w-none"
                  >
                    <h3 className="text-sm sm:text-base font-semibold text-on-surface-light dark:text-on-surface-dark mb-3">
                      <span className="hidden sm:inline">Select Zone Type</span>
                      <span className="sm:hidden">Zone Type</span>
                    </h3>
                    <div className="flex gap-1 sm:gap-2">
                      {[
                        { id: 'circular', icon: '⭕', label: 'Circle' },
                        { id: 'polygon', icon: '⬡', label: 'Polygon' },
                        { id: 'route', icon: '〰️', label: 'Route' }
                      ].map((type) => (
                        <motion.button
                          key={type.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setZoneType(type.id)}
                          className={`px-2 sm:px-4 py-2 rounded-lg transition-all ${
                            zoneType === type.id
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                            <span className="text-base sm:text-lg">{type.icon}</span>
                            <span className="text-xs sm:text-sm">{type.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    <div className="mt-3 sm:mt-4 flex gap-2">
                      <button
                        onClick={() => setIsCreatingZone(false)}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // The drawing will be handled by the GeofenceMap component
                          // Just keep the isCreatingZone state true
                        }}
                        className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
                      >
                        <span className="hidden sm:inline">Start Drawing</span>
                        <span className="sm:hidden">Draw</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Map Controls */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-3 p-1 sm:p-2 pointer-events-auto"
                >
                  <div className="flex flex-col gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      title="My Location"
                    >
                      <MdMyLocation className="text-lg sm:text-xl text-gray-700 dark:text-gray-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      title="Draw Polygon"
                    >
                      <FaDrawPolygon className="text-lg sm:text-xl text-gray-700 dark:text-gray-300" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      title="Measure Distance"
                    >
                      <FaRoute className="text-lg sm:text-xl text-gray-700 dark:text-gray-300" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Selected Zone Details */}
              {selectedZone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-white dark:bg-gray-900 rounded-xl shadow-elevation-4 p-3 sm:p-6 max-h-80 overflow-y-auto"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-on-surface-light dark:text-on-surface-dark flex items-center gap-2 truncate">
                        <div
                          className="w-3 sm:w-4 h-3 sm:h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: selectedZone.color }}
                        />
                        <span className="truncate">{selectedZone.name}</span>
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        Created on {selectedZone.createdAt}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedZone(null)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0 ml-2"
                    >
                      <span className="material-icons text-gray-500 text-lg sm:text-xl">close</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                      <p className="text-sm font-semibold capitalize">{selectedZone.type}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Status</p>
                      <p className="text-sm font-semibold capitalize">{selectedZone.status}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Vehicles</p>
                      <p className="text-sm font-semibold">{selectedZone.vehicles}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Alerts</p>
                      <p className="text-sm font-semibold text-yellow-600 dark:text-yellow-400">
                        {selectedZone.alerts}
                      </p>
                    </div>
                  </div>

                  {/* Alert Rules Configuration */}
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-on-surface-light dark:text-on-surface-dark mb-2 sm:mb-3">
                      Alert Rules
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                      {alertTypes.map((alert) => (
                        <label
                          key={alert.id}
                          className="flex items-start gap-2 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="mt-0.5 sm:mt-1 flex-shrink-0"
                            defaultChecked={Math.random() > 0.5}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <span className="text-sm">{alert.icon}</span>
                              <span className="text-xs sm:text-sm font-medium truncate">{alert.label}</span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                              {alert.description}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="px-3 sm:px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm">
                      View History
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 text-sm">
                      <FaSave />
                      Save Changes
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Creating Zone Instructions */}
              {isCreatingZone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-5 p-4 sm:p-6 max-w-xs sm:max-w-md pointer-events-auto"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-on-surface-light dark:text-on-surface-dark mb-3">
                      Drawing Instructions
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {zoneType === 'circular' && (
                        <>
                          <li>• Click on the map to set the center point</li>
                          <li>• Drag to adjust the radius</li>
                          <li>• Double-click to confirm</li>
                        </>
                      )}
                      {zoneType === 'polygon' && (
                        <>
                          <li>• Click to add polygon points</li>
                          <li>• Click on the first point to close the shape</li>
                          <li>• Drag points to adjust</li>
                        </>
                      )}
                      {zoneType === 'route' && (
                        <>
                          <li>• Click to add waypoints along the route</li>
                          <li>• Double-click to finish the route</li>
                          <li>• Set corridor width after drawing</li>
                        </>
                      )}
                    </ul>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Geofence;