import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../contexts/onboardingContext';
import { useAuth } from '../../contexts/authContext';
import { 
  FaUser, 
  FaCamera, 
  FaBriefcase, 
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaClock,
  FaBell
} from 'react-icons/fa';
import { HiMail, HiDeviceMobile, HiBell } from 'react-icons/hi';
import { IoMdNotifications } from 'react-icons/io';

const ProfileSetup = () => {
  const { currentUser } = useAuth();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    fullName: onboardingData.profile.fullName || currentUser?.displayName || '',
    phoneNumber: onboardingData.profile.phoneNumber || '',
    position: onboardingData.profile.position || '',
    department: onboardingData.profile.department || '',
    timezone: onboardingData.profile.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: onboardingData.profile.language || 'en',
    notifications: onboardingData.profile.notifications || {
      email: true,
      sms: false,
      push: true,
      shipmentAlerts: true,
      systemUpdates: true,
      marketing: false
    }
  });

  const departments = [
    'Operations',
    'Logistics',
    'Supply Chain',
    'Warehouse',
    'Transportation',
    'Management',
    'IT',
    'Finance',
    'Customer Service',
    'Other'
  ];

  const positions = [
    'CEO/Founder',
    'Operations Manager',
    'Logistics Manager',
    'Supply Chain Manager',
    'Warehouse Manager',
    'Fleet Manager',
    'Dispatcher',
    'Coordinator',
    'Administrator',
    'Other'
  ];

  const timezones = [
    { value: 'Africa/Nairobi', label: 'East Africa Time (EAT)' },
    { value: 'Africa/Lagos', label: 'West Africa Time (WAT)' },
    { value: 'Africa/Johannesburg', label: 'South Africa Standard Time (SAST)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)' },
    { value: 'Asia/Singapore', label: 'Singapore Time (SGT)' }
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-save to context
    updateOnboardingData('profile', {
      ...formData,
      [name]: value
    });
  };

  const handleNotificationToggle = (key) => {
    const updatedNotifications = {
      ...formData.notifications,
      [key]: !formData.notifications[key]
    };
    
    setFormData(prev => ({
      ...prev,
      notifications: updatedNotifications
    }));
    
    updateOnboardingData('profile', {
      ...formData,
      notifications: updatedNotifications
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
      {/* Profile Picture */}
      <motion.div variants={itemVariants} className="flex flex-col items-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 p-1">
              {imagePreview || currentUser?.photoURL ? (
                <img
                  src={imagePreview || currentUser?.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <FaUser className="text-4xl text-slate-400" />
                </div>
              )}
            </div>
          </div>
          <label
            htmlFor="profile-image"
            className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-lg"
          >
            <FaCamera className="text-white text-sm" />
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Upload a professional photo (optional)
        </p>
      </motion.div>

      {/* Personal Information */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+254 700 123456"
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Position *
          </label>
          <div className="relative">
            <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
              required
            >
              <option value="">Select your position</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Department *
          </label>
          <div className="relative">
            <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
              required
            >
              <option value="">Select your department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Regional Settings */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Regional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Timezone
            </label>
            <div className="relative">
              <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
              >
                {timezones.map(tz => (
                  <option key={tz.value} value={tz.value}>{tz.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Language
            </label>
            <div className="relative">
              <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
              >
                <option value="en">English</option>
                <option value="sw">Swahili</option>
                <option value="fr">French</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notification Preferences */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <FaBell className="text-blue-500" />
          Notification Preferences
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'email', label: 'Email Notifications', icon: HiMail },
            { key: 'sms', label: 'SMS Notifications', icon: HiDeviceMobile },
            { key: 'push', label: 'Push Notifications', icon: HiBell },
            { key: 'shipmentAlerts', label: 'Shipment Alerts', icon: IoMdNotifications },
            { key: 'systemUpdates', label: 'System Updates', icon: IoMdNotifications },
            { key: 'marketing', label: 'Marketing & Offers', icon: FaEnvelope }
          ].map(({ key, label, icon: Icon }) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg cursor-pointer"
              onClick={() => handleNotificationToggle(key)}
            >
              <div className="flex items-center gap-3">
                <Icon className="text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {label}
                </span>
              </div>
              <div className={`w-12 h-6 rounded-full p-1 transition-colors ${
                formData.notifications[key] 
                  ? 'bg-blue-500' 
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}>
                <motion.div
                  className="w-4 h-4 bg-white rounded-full"
                  animate={{ x: formData.notifications[key] ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Info Message */}
      <motion.div 
        variants={itemVariants}
        className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
      >
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Note:</strong> You can update these settings anytime from your profile page. 
          Fields marked with * are required.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProfileSetup;