import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboarding } from '../../contexts/onboardingContext';
import {
  FaBuilding,
  FaIndustry,
  FaGlobe,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaFileAlt,
  FaIdCard,
  FaCamera,
  FaCheck
} from 'react-icons/fa';
import { HiOfficeBuilding, HiScale, HiTruck, HiCube } from 'react-icons/hi';
import { BsBoxSeam, BsShop } from 'react-icons/bs';
import { MdFactory } from 'react-icons/md';

const OrganizationSetup = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [logoPreview, setLogoPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    name: onboardingData.organization.name || '',
    type: onboardingData.organization.type || '',
    size: onboardingData.organization.size || '',
    industry: onboardingData.organization.industry || '',
    website: onboardingData.organization.website || '',
    address: {
      street: onboardingData.organization.address?.street || '',
      city: onboardingData.organization.address?.city || '',
      state: onboardingData.organization.address?.state || '',
      country: onboardingData.organization.address?.country || 'Kenya',
      postalCode: onboardingData.organization.address?.postalCode || ''
    },
    primaryContact: {
      name: onboardingData.organization.primaryContact?.name || '',
      email: onboardingData.organization.primaryContact?.email || '',
      phone: onboardingData.organization.primaryContact?.phone || ''
    },
    businessRegistration: onboardingData.organization.businessRegistration || '',
    taxId: onboardingData.organization.taxId || ''
  });

  const organizationTypes = [
    { value: 'logistics', label: 'Logistics Provider', icon: HiTruck },
    { value: 'manufacturer', label: 'Manufacturer', icon: MdFactory },
    { value: 'retailer', label: 'Retailer', icon: BsShop },
    { value: 'distributor', label: 'Distributor', icon: BsBoxSeam },
    { value: 'warehouse', label: 'Warehouse', icon: HiCube },
    { value: 'freight', label: 'Freight Forwarder', icon: HiOfficeBuilding },
    { value: 'other', label: 'Other', icon: FaBuilding }
  ];

  const organizationSizes = [
    { value: 'small', label: 'Small (1-50 employees)', description: 'Startups and small businesses' },
    { value: 'medium', label: 'Medium (51-250 employees)', description: 'Growing companies' },
    { value: 'large', label: 'Large (251-1000 employees)', description: 'Established enterprises' },
    { value: 'enterprise', label: 'Enterprise (1000+ employees)', description: 'Large corporations' }
  ];

  const industries = [
    'Agriculture',
    'Automotive',
    'Chemicals',
    'Construction',
    'Consumer Goods',
    'E-commerce',
    'Electronics',
    'Energy',
    'Food & Beverage',
    'Healthcare',
    'Manufacturing',
    'Pharmaceuticals',
    'Retail',
    'Technology',
    'Textiles',
    'Transportation',
    'Other'
  ];

  const countries = [
    'Kenya',
    'Uganda',
    'Tanzania',
    'Rwanda',
    'Ethiopia',
    'Nigeria',
    'South Africa',
    'Egypt',
    'Ghana',
    'Morocco'
  ];

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
        updateOnboardingData('organization', {
          ...formData,
          logo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
      
      updateOnboardingData('organization', {
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      updateOnboardingData('organization', {
        ...formData,
        [name]: value
      });
    }
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
      {/* Organization Logo */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-xl bg-white dark:bg-slate-800 p-1">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Organization Logo"
                    className="w-full h-full rounded-xl object-contain"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                    <FaBuilding className="text-4xl text-slate-400" />
                  </div>
                )}
              </div>
            </div>
            <label
              htmlFor="org-logo"
              className="absolute bottom-0 right-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors shadow-lg"
            >
              <FaCamera className="text-white text-sm" />
              <input
                type="file"
                id="org-logo"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Upload your company logo (optional)
          </p>
        </div>
      </motion.div>

      {/* Basic Information */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Organization Name *
            </label>
            <div className="relative">
              <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter organization name"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Website
            </label>
            <div className="relative">
              <FaGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://www.example.com"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Organization Type */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Organization Type *</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {organizationTypes.map(({ value, label, icon: Icon }) => (
            <motion.div
              key={value}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setFormData(prev => ({ ...prev, type: value }));
                updateOnboardingData('organization', { ...formData, type: value });
              }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.type === value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  formData.type === value
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}>
                  <Icon className="text-xl" />
                </div>
                <span className={`font-medium ${
                  formData.type === value
                    ? 'text-purple-700 dark:text-purple-300'
                    : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {label}
                </span>
                {formData.type === value && (
                  <FaCheck className="ml-auto text-purple-500" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Organization Size */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Organization Size *</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {organizationSizes.map(({ value, label, description }) => (
            <motion.div
              key={value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setFormData(prev => ({ ...prev, size: value }));
                updateOnboardingData('organization', { ...formData, size: value });
              }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                formData.size === value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className={`font-medium ${
                    formData.size === value
                      ? 'text-purple-700 dark:text-purple-300'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {description}
                  </p>
                </div>
                {formData.size === value && (
                  <FaCheck className="text-purple-500 flex-shrink-0" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Industry and Address */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Industry & Location</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Industry *
            </label>
            <div className="relative">
              <FaIndustry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none"
                required
              >
                <option value="">Select industry</option>
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Street Address
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleInputChange}
                placeholder="123 Business Avenue"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              City *
            </label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              placeholder="Nairobi"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              State/Province
            </label>
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              placeholder="Nairobi County"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Country *
            </label>
            <select
              name="address.country"
              value={formData.address.country}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all appearance-none"
              required
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Postal Code
            </label>
            <input
              type="text"
              name="address.postalCode"
              value={formData.address.postalCode}
              onChange={handleInputChange}
              placeholder="00100"
              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>
        </div>
      </motion.div>

      {/* Primary Contact */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Primary Contact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Contact Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="primaryContact.name"
                value={formData.primaryContact.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Contact Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                name="primaryContact.email"
                value={formData.primaryContact.email}
                onChange={handleInputChange}
                placeholder="contact@company.com"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Contact Phone
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                name="primaryContact.phone"
                value={formData.primaryContact.phone}
                onChange={handleInputChange}
                placeholder="+254 700 123456"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Legal Information */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Legal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Business Registration Number
            </label>
            <div className="relative">
              <FaFileAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="businessRegistration"
                value={formData.businessRegistration}
                onChange={handleInputChange}
                placeholder="BRN/2024/123456"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tax ID / KRA PIN
            </label>
            <div className="relative">
              <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                placeholder="P051234567X"
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Compliance Notice */}
      <motion.div 
        variants={itemVariants}
        className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg"
      >
        <div className="flex items-start gap-3">
          <HiScale className="text-purple-500 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Compliance & Verification
            </p>
            <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
              Your organization information will be verified for compliance with local regulations. 
              This helps ensure secure and legitimate transactions on our platform.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrganizationSetup;