import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/navigationContext';
import Sidebar from "../components/sidebar";
import {
  IoMenu, IoSearch, IoEllipsisVertical
} from 'react-icons/io5';
import {
  FiUsers, FiUserPlus, FiEdit, FiTrash2,
  FiMoreVertical, FiMail, FiPhone, FiMapPin
} from 'react-icons/fi';
import {
  MdVerified, MdAdminPanelSettings,
  MdLocalShipping, MdSupervisorAccount, MdPerson
} from 'react-icons/md';

const Users = () => {
  const { showNav, toggleNav } = useNavigation();
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [, setSelectedUser] = useState(null);
  const [, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Sample users data
  const [users] = useState([
    {
      id: 1,
      name: 'John Kamau',
      email: 'john.kamau@example.com',
      phone: '+254 712 345 678',
      role: 'driver',
      status: 'active',
      location: 'Nairobi',
      joinDate: '2024-06-15',
      deliveries: 342,
      rating: 4.8,
      avatar: 'https://ui-avatars.com/api/?name=John+Kamau&background=2196F3&color=fff',
      verified: true
    },
    {
      id: 2,
      name: 'Sarah Wanjiru',
      email: 'sarah.wanjiru@example.com',
      phone: '+254 723 456 789',
      role: 'admin',
      status: 'active',
      location: 'Mombasa',
      joinDate: '2023-12-10',
      permissions: 'full',
      lastLogin: '2 hours ago',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wanjiru&background=9C27B0&color=fff',
      verified: true
    },
    {
      id: 3,
      name: 'Peter Ochieng',
      email: 'peter.ochieng@example.com',
      phone: '+254 734 567 890',
      role: 'dispatcher',
      status: 'active',
      location: 'Kisumu',
      joinDate: '2024-03-20',
      shipmentsManaged: 567,
      activeShipments: 23,
      avatar: 'https://ui-avatars.com/api/?name=Peter+Ochieng&background=4CAF50&color=fff',
      verified: true
    },
    {
      id: 4,
      name: 'Mary Njeri',
      email: 'mary.njeri@example.com',
      phone: '+254 745 678 901',
      role: 'customer',
      status: 'pending',
      location: 'Nakuru',
      joinDate: '2025-01-05',
      orders: 12,
      totalSpent: 'KES 45,230',
      avatar: 'https://ui-avatars.com/api/?name=Mary+Njeri&background=FF9800&color=fff',
      verified: false
    },
    {
      id: 5,
      name: 'James Mutua',
      email: 'james.mutua@example.com',
      phone: '+254 756 789 012',
      role: 'driver',
      status: 'suspended',
      location: 'Eldoret',
      joinDate: '2024-08-12',
      deliveries: 189,
      rating: 3.2,
      avatar: 'https://ui-avatars.com/api/?name=James+Mutua&background=F44336&color=fff',
      verified: true
    }
  ]);

  const roles = [
    { id: 'all', label: 'All Users', count: users.length, icon: FiUsers },
    { id: 'admin', label: 'Admins', count: users.filter(u => u.role === 'admin').length, icon: MdAdminPanelSettings },
    { id: 'driver', label: 'Drivers', count: users.filter(u => u.role === 'driver').length, icon: MdLocalShipping },
    { id: 'dispatcher', label: 'Dispatchers', count: users.filter(u => u.role === 'dispatcher').length, icon: MdSupervisorAccount },
    { id: 'customer', label: 'Customers', count: users.filter(u => u.role === 'customer').length, icon: MdPerson }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-success-100 text-success-700 dark:bg-success-900/20 dark:text-success-400',
      'pending': 'bg-warning-100 text-warning-700 dark:bg-warning-900/20 dark:text-warning-400',
      'suspended': 'bg-error-100 text-error-700 dark:bg-error-900/20 dark:text-error-400',
      'inactive': 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
    };
    return colors[status] || colors.inactive;
  };

  const getRoleIcon = (role) => {
    const icons = {
      'admin': MdAdminPanelSettings,
      'driver': MdLocalShipping,
      'dispatcher': MdSupervisorAccount,
      'customer': MdPerson
    };
    return icons[role] || MdPerson;
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.phone.includes(searchQuery);
    return matchesRole && matchesSearch;
  });

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
              <h1 className="headline-6 sm:headline-5 text-on-surface-light dark:text-on-surface-dark">User Management</h1>
              <p className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium hidden sm:block">
                {filteredUsers.length} total users
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-elevation-1 md:hidden"
            >
              <IoSearch className="text-xl text-gray-600 dark:text-gray-400" />
            </motion.button>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full">
              <IoSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-48 lg:w-64 text-gray-700 dark:text-gray-300"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 shadow' : ''}`}
              >
                List
              </button>
            </div>

            {/* Add User Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
            >
              <FiUserPlus className="text-xl" />
              <span className="hidden sm:inline">Add User</span>
            </motion.button>
          </div>
        </motion.header>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {showFilters && (
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
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm flex-1 text-gray-700 dark:text-gray-300"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-1 overflow-hidden">
          {/* Role Filter Sidebar - Hidden on mobile */}
          <div className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
            <h2 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark mb-4">Filter by Role</h2>
            <div className="space-y-1">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <motion.button
                    key={role.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRole(role.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      selectedRole === role.id
                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-xl" />
                      <span className="subtitle-2">{role.label}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      selectedRole === role.id
                        ? 'bg-primary-200 dark:bg-primary-800'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {role.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl">
              <h3 className="subtitle-2 text-on-surface-light dark:text-on-surface-dark mb-3">User Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="caption">Active Users</span>
                  <span className="caption font-semibold text-success-600">{users.filter(u => u.status === 'active').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="caption">Pending</span>
                  <span className="caption font-semibold text-warning-600">{users.filter(u => u.status === 'pending').length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="caption">Suspended</span>
                  <span className="caption font-semibold text-error-600">{users.filter(u => u.status === 'suspended').length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Role Pills */}
          <div className="lg:hidden w-full">
            <div className="px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedRole === role.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {role.label} ({role.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Users Grid/List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {filteredUsers.map((user, index) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedUser(user)}
                      className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 hover:shadow-elevation-3 transition-all overflow-hidden cursor-pointer"
                    >
                      {/* User Header */}
                      <div className="p-4 text-center border-b border-gray-200 dark:border-gray-700">
                        <div className="relative inline-block">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-20 h-20 rounded-full mx-auto mb-3"
                          />
                          {user.verified && (
                            <MdVerified className="absolute bottom-2 right-0 text-2xl text-primary-500 bg-white dark:bg-gray-900 rounded-full" />
                          )}
                        </div>
                        <h3 className="subtitle-1 text-on-surface-light dark:text-on-surface-dark">
                          {user.name}
                        </h3>
                        <div className="flex items-center justify-center gap-2 mt-1">
                          <RoleIcon className="text-gray-400 text-sm" />
                          <span className="caption text-on-surface-light-medium dark:text-on-surface-dark-medium">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </div>
                        <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>

                      {/* User Details */}
                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiMail className="text-gray-400" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiPhone className="text-gray-400" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <FiMapPin className="text-gray-400" />
                          <span>{user.location}</span>
                        </div>

                        {/* Role-specific info */}
                        {user.role === 'driver' && (
                          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Deliveries</span>
                              <span className="font-semibold">{user.deliveries}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-600 dark:text-gray-400">Rating</span>
                              <span className="font-semibold">⭐ {user.rating}</span>
                            </div>
                          </div>
                        )}

                        {user.role === 'dispatcher' && (
                          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Managed</span>
                              <span className="font-semibold">{user.shipmentsManaged}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-1">
                              <span className="text-gray-600 dark:text-gray-400">Active</span>
                              <span className="font-semibold">{user.activeShipments}</span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Edit user', user.id);
                            }}
                            className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                          >
                            <IoEllipsisVertical className="text-lg" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-elevation-2 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px]">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredUsers.map((user) => {
                        const RoleIcon = getRoleIcon(user.role);
                        return (
                          <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <img
                                    className="w-10 h-10 rounded-full"
                                    src={user.avatar}
                                    alt={user.name}
                                  />
                                  {user.verified && (
                                    <MdVerified className="absolute -bottom-1 -right-1 text-sm text-primary-500 bg-white dark:bg-gray-900 rounded-full" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Joined {new Date(user.joinDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm">
                                <p className="text-gray-900 dark:text-white">{user.email}</p>
                                <p className="text-gray-500 dark:text-gray-400">{user.phone}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <RoleIcon className="text-gray-400 text-lg" />
                                <span className="text-sm text-gray-900 dark:text-white">
                                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {user.location}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <button className="text-gray-400 hover:text-primary-500 transition-colors">
                                  <FiEdit className="text-lg" />
                                </button>
                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                  <FiTrash2 className="text-lg" />
                                </button>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                  <FiMoreVertical className="text-lg" />
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

export default Users;