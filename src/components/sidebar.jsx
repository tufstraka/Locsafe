import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiTruck, FiAlertOctagon, FiSettings, FiUsers,
} from "react-icons/fi";
import { FaRegCalendarAlt, FaTools, FaChevronDown } from "react-icons/fa";
import { BsFillGeoFill } from "react-icons/bs";
import { MdDashboard, MdInsights, MdNotifications } from "react-icons/md";
import { HiCube, HiOutlineDocumentReport } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useNavigation } from '../contexts/navigationContext';
import logoabs from '../assets/logoabs.png';

const Sidebar = () => {
  const { toggleNav } = useNavigation();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    operations: true,
    analytics: false,
    management: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuSections = [
    {
      id: 'operations',
      title: 'Operations',
      items: [
        {
          path: '/admin/dashboard',
          label: 'Dashboard',
          icon: MdDashboard,
          badge: null,
          description: 'Overview & metrics'
        },
        {
          path: '/assets',
          label: 'Assets',
          icon: FiTruck,
          badge: '24',
          badgeColor: 'bg-primary-500',
          description: 'Vehicle management'
        },
        {
          path: '/blockchain-explorer',
          label: 'Blockchain',
          icon: HiCube,
          badge: 'Live',
          badgeColor: 'bg-success-500',
          description: 'DPP explorer'
        },
        {
          path: '/geofence',
          label: 'Geofencing',
          icon: BsFillGeoFill,
          badge: null,
          description: 'Zone management'
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      items: [
        {
          path: '/insights',
          label: 'Insights',
          icon: MdInsights,
          badge: 'AI',
          badgeColor: 'bg-purple-500',
          description: 'AI predictions'
        },
        {
          path: '/reports',
          label: 'Reports',
          icon: HiOutlineDocumentReport,
          badge: null,
          description: 'Generate reports'
        },
        {
          path: '/calendar',
          label: 'Calendar',
          icon: FaRegCalendarAlt,
          badge: null,
          description: 'Schedule view'
        }
      ]
    },
    {
      id: 'management',
      title: 'Management',
      items: [
        {
          path: '/alerts',
          label: 'Alerts',
          icon: FiAlertOctagon,
          badge: '5',
          badgeColor: 'bg-error-500',
          description: 'System alerts'
        },
        {
          path: '/notifications',
          label: 'Notifications',
          icon: MdNotifications,
          badge: '12',
          badgeColor: 'bg-warning-500',
          description: 'All notifications'
        },
        {
          path: '/maintenance',
          label: 'Maintenance',
          icon: FaTools,
          badge: null,
          description: 'Service schedule'
        },
        {
          path: '/users',
          label: 'Users',
          icon: FiUsers,
          badge: null,
          description: 'User management'
        },
        {
          path: '/settings',
          label: 'Settings',
          icon: FiSettings,
          badge: null,
          description: 'System settings'
        }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      exit={{ x: -280 }}
      className="flex flex-col w-72 bg-surface-light dark:bg-surface-elevated-dark border-r border-gray-200 dark:border-gray-700 h-full shadow-elevation-2 dark:shadow-elevation-dark-2"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <motion.img
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            src={logoabs}
            alt="Locsafe Logo"
            className="h-8 w-auto"
          />
          <div>
            <h1 className="font-display text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Locsafe
            </h1>
            <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium -mt-1">
              Supply Chain OS
            </p>
          </div>
        </Link>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleNav}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
        >
          <IoClose className="text-xl text-on-surface-light dark:text-on-surface-dark" />
        </motion.button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-xl">
          <img
            className="w-10 h-10 rounded-full border-2 border-primary-500"
            src="https://ui-avatars.com/api/?name=Admin+User&background=2196F3&color=fff"
            alt="Profile"
          />
          <div className="flex-1">
            <p className="subtitle-2 text-on-surface-light dark:text-on-surface-dark">Admin User</p>
            <p className="caption text-success-600 dark:text-success-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {menuSections.map((section) => (
          <div key={section.id} className="mb-4">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
            >
              <span className="overline text-on-surface-light-medium dark:text-on-surface-dark-medium font-semibold">
                {section.title}
              </span>
              <motion.span
                animate={{ rotate: expandedSections[section.id] ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaChevronDown className="text-xs text-gray-400" />
              </motion.span>
            </button>

            {/* Section Items */}
            <AnimatePresence>
              {expandedSections[section.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1 space-y-1"
                >
                  {section.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden
                        ${isActive(item.path)
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-elevation-2'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                        }
                      `}
                    >
                      {/* Ripple Effect Background */}
                      {isActive(item.path) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                        />
                      )}

                      {/* Icon */}
                      <div className={`relative z-10 ${isActive(item.path) ? 'text-white' : ''}`}>
                        <item.icon className="text-xl" />
                      </div>

                      {/* Label and Description */}
                      <div className="flex-1 relative z-10">
                        <p className={`subtitle-2 ${isActive(item.path) ? 'text-white' : 'text-on-surface-light dark:text-on-surface-dark'}`}>
                          {item.label}
                        </p>
                        {!isActive(item.path) && (
                          <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium -mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Badge */}
                      {item.badge && (
                        <span className={`
                          relative z-10 px-2 py-0.5 text-xs font-semibold rounded-full
                          ${isActive(item.path)
                            ? 'bg-white/20 text-white'
                            : `${item.badgeColor || 'bg-gray-200 dark:bg-gray-700'} text-white`
                          }
                        `}>
                          {item.badge}
                        </span>
                      )}

                      {/* Hover Indicator */}
                      {!isActive(item.path) && (
                        <motion.div
                          className="absolute right-0 w-1 h-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ scaleY: 0 }}
                          whileHover={{ scaleY: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-medium shadow-elevation-2 hover:shadow-elevation-3 transition-all"
        >
          <span className="material-icons text-xl">add_circle</span>
          <span className="button-text">New Shipment</span>
        </motion.button>

        <div className="flex items-center justify-center gap-2 pt-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
            <span className="material-icons text-xl">help_outline</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
            <span className="material-icons text-xl">dark_mode</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
            <span className="material-icons text-xl">logout</span>
          </button>
        </div>
      </div>

      {/* Version Info */}
      <div className="px-4 py-2 text-center border-t border-gray-200 dark:border-gray-700">
        <p className="caption text-on-surface-light-disabled dark:text-on-surface-dark-disabled">
          Version 2.0.0 • ©2025 Locsafe
        </p>
      </div>
    </motion.div>
  );
};

export default Sidebar;
