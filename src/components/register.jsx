
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash, FaCheckCircle, FaShieldAlt, FaArrowRight, FaBuilding, FaGlobe, FaTrophy, FaUserShield } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt, HiBadgeCheck } from 'react-icons/hi';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authService } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState({
    register: false,
    google: false,
    microsoft: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [focusedField, setFocusedField] = useState('');
  const [formProgress, setFormProgress] = useState(0);

  const navigate = useNavigate();
  const auth = getAuth();

  // Calculate form progress
  useEffect(() => {
    const filledFields = Object.values(formData).filter(value => value.length > 0).length;
    const progress = (filledFields / 6) * 100;
    setFormProgress(progress);
  }, [formData]);

  // Password strength calculator
  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;
    
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmailDomain = (email) => {
    const invalidDomains = ["gmail.com", "outlook.com", "hotmail.com", "yahoo.com"];
    const emailDomain = email.split('@')[1];
    return !invalidDomains.includes(emailDomain);
  };

  const handleRegister = async () => {
    const { firstName, lastName, userName, email, password, phoneNumber } = formData;

    if (!validateEmailDomain(email)) {
      toast.error("Please use a work email address. Personal email domains are not allowed.");
      return;
    }

    if (firstName && lastName && userName && email && password && phoneNumber) {
      setLoading((prev) => ({ ...prev, register: true }));
      try {
        // Step 1: Create user with Firebase
        const firebaseResult = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update Firebase profile with name
        await updateProfile(firebaseResult.user, {
          displayName: `${firstName} ${lastName}`
        });
        
        // Save to Firestore for backward compatibility
        await setDoc(doc(db, 'users', firebaseResult.user.uid), {
          firstName,
          lastName,
          userName,
          email,
          phoneNumber
        });

        // Step 2: Register user with backend API
        const backendData = {
          email,
          username: userName,
          password,
          firstName,
          lastName,
          phoneNumber,
          firebaseUid: firebaseResult.user.uid
        };

        const apiResponse = await authService.register(backendData);
        
        console.log('API Response:', apiResponse); // Debug log
        
        // Store the JWT token - Note: backend returns 'Token' with uppercase T
        if (apiResponse.Token || apiResponse.token) {
          localStorage.setItem('authToken', apiResponse.Token || apiResponse.token);
          localStorage.setItem('userId', apiResponse.user?.id || apiResponse.User?.ID);
          localStorage.setItem('userEmail', apiResponse.user?.email || apiResponse.User?.Email);
        }

        toast.success('Welcome to Locsafe! 🚀');
        
        // Add a small delay to ensure toast is shown
        setTimeout(() => {
          console.log('Navigating to /pay'); // Debug log
          navigate('/pay');
        }, 500);
      } catch (error) {
        console.error('Registration error:', error); // Debug log
        
        // If Firebase succeeded but API failed, we might want to delete Firebase user
        if (auth.currentUser && error.message && error.message.includes('api')) {
          try {
            await auth.currentUser.delete();
          } catch (deleteError) {
            console.error('Failed to delete Firebase user:', deleteError);
          }
        }
        
        // Show more detailed error message
        const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
        toast.error(errorMessage);
      } finally {
        setLoading((prev) => ({ ...prev, register: false }));
      }
    } else {
      toast.error('Please complete all fields');
    }
  };

  const benefits = [
    { icon: FaShieldAlt, text: "Bank-grade security" },
    { icon: HiLightningBolt, text: "Real-time tracking" },
    { icon: FaTrophy, text: "99.9% uptime" },
    { icon: FaGlobe, text: "Global coverage" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-orange-500';
    if (passwordStrength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/20 overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <Header />

      <div className="container mx-auto px-4 py-12 flex justify-center items-center relative z-10 mt-16">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Benefits & Social Proof */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block space-y-8"
          >
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur-sm border border-teal-500/20 rounded-full mb-6"
              >
                <HiSparkles className="text-teal-500 animate-pulse" />
                <span className="text-teal-700 dark:text-teal-400 text-sm font-semibold">Join 26 Companies</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
                Start Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500">
                  Supply Chain Revolution
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                Get instant access to blockchain-powered tracking, AI analytics, and digital product passports.
              </p>
            </div>

            {/* Benefits Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex items-center gap-3 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <benefit.icon className="text-white text-lg" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl text-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      alt={`User ${i}`}
                      className="w-10 h-10 rounded-full border-2 border-slate-800"
                    />
                  ))}
                  <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-slate-800">
                    <span className="text-xs font-bold">+5k</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-2">
                &ldquo;Locsafe transformed our supply chain operations. The blockchain transparency is game-changing!&rdquo;
              </p>
              <p className="text-xs text-slate-400">— Sarah Chen, Supply Chain Director at TechCorp</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form 
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Your Account</h2>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{Math.round(formProgress)}% Complete</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-teal-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* Name Fields Row */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className={`relative border rounded-xl transition-all duration-300 ${
                      focusedField === 'firstName' 
                        ? 'border-teal-500 shadow-lg shadow-teal-500/20' 
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center p-3">
                      <FaUser className={`mr-3 transition-colors ${
                        focusedField === 'firstName' ? 'text-teal-500' : 'text-slate-400'
                      }`} />
                      <input
                        className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-white placeholder-slate-400"
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField('')}
                        aria-label="First Name"
                      />
                    </div>
                    {formData.firstName && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <FaCheckCircle className="text-white text-xs" />
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className={`relative border rounded-xl transition-all duration-300 ${
                      focusedField === 'lastName' 
                        ? 'border-teal-500 shadow-lg shadow-teal-500/20' 
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center p-3">
                      <FaUser className={`mr-3 transition-colors ${
                        focusedField === 'lastName' ? 'text-teal-500' : 'text-slate-400'
                      }`} />
                      <input
                        className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-white placeholder-slate-400"
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField('')}
                        aria-label="Last Name"
                      />
                    </div>
                    {formData.lastName && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <FaCheckCircle className="text-white text-xs" />
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Username Field */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className={`relative border rounded-xl transition-all duration-300 ${
                    focusedField === 'userName' 
                      ? 'border-teal-500 shadow-lg shadow-teal-500/20' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  <div className="flex items-center p-3">
                    <FaUserShield className={`mr-3 transition-colors ${
                      focusedField === 'userName' ? 'text-teal-500' : 'text-slate-400'
                    }`} />
                    <input
                      className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-white placeholder-slate-400"
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={formData.userName}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('userName')}
                      onBlur={() => setFocusedField('')}
                      aria-label="Username"
                    />
                  </div>
                  {formData.userName && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-2 -top-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <FaCheckCircle className="text-white text-xs" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Email Field */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className={`relative border rounded-xl transition-all duration-300 ${
                    focusedField === 'email' 
                      ? 'border-teal-500 shadow-lg shadow-teal-500/20' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  <div className="flex items-center p-3">
                    <FaEnvelope className={`mr-3 transition-colors ${
                      focusedField === 'email' ? 'text-teal-500' : 'text-slate-400'
                    }`} />
                    <input
                      className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-white placeholder-slate-400"
                      type="email"
                      name="email"
                      placeholder="Work Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      aria-label="Email"
                    />
                  </div>
                  {formData.email && validateEmailDomain(formData.email) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-2 -top-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <FaCheckCircle className="text-white text-xs" />
                    </motion.div>
                  )}
                  <AnimatePresence>
                    {focusedField === 'email' && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-3"
                      >
                        Use your work email for enterprise features
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className={`relative border rounded-xl transition-all duration-300 ${
                    focusedField === 'password' 
                      ? 'border-teal-500 shadow-lg shadow-teal-500/20' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  <div className="flex items-center p-3">
                    <FaLock className={`mr-3 transition-colors ${
                      focusedField === 'password' ? 'text-teal-500' : 'text-slate-400'
                    }`} />
                    <input
                      className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-white placeholder-slate-400"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-slate-500 hover:text-teal-500 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  <AnimatePresence>
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-3 pb-2"
                      >
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${getPasswordStrengthColor()}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${passwordStrength}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <span className={`text-xs font-medium ${
                            passwordStrength > 75 ? 'text-green-500' : 
                            passwordStrength > 50 ? 'text-yellow-500' : 
                            passwordStrength > 25 ? 'text-orange-500' : 'text-red-500'
                          }`}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Phone Number Field */}
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  className={`relative border rounded-xl transition-all duration-300 ${
                    focusedField === 'phoneNumber' 
                      ? 'border-teal-500 shadow-lg shadow-teal-500/20' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  <div className="flex items-center p-3">
                    <FaPhone className={`mr-3 transition-colors ${
                      focusedField === 'phoneNumber' ? 'text-teal-500' : 'text-slate-400'
                    }`} />
                    <input
                      className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-white placeholder-slate-400"
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number (e.g., 254...)"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('phoneNumber')}
                      onBlur={() => setFocusedField('')}
                      aria-label="Phone Number"
                    />
                  </div>
                  {formData.phoneNumber && formData.phoneNumber.length >= 10 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-2 -top-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <FaCheckCircle className="text-white text-xs" />
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Terms and Conditions */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl"
              >
                <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
                  By signing up, you agree to our{' '}
                  <Link to="/terms" className="text-teal-500 hover:text-teal-600 font-medium">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-teal-500 hover:text-teal-600 font-medium">Privacy Policy</Link>
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div 
                className="mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  onClick={handleRegister}
                  disabled={loading.register || formProgress < 100}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex justify-center items-center gap-2 ${
                    formProgress === 100 
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 shadow-lg shadow-teal-500/25' 
                      : 'bg-slate-400 cursor-not-allowed'
                  }`}
                >
                  {!loading.register ? (
                    <>
                      <HiLightningBolt className="text-lg" />
                      <span>Start</span>
                      <FaArrowRight className="text-sm" />
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating your account...</span>
                    </div>
                  )}
                </button>
              </motion.div>

              {/* Login Link */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center mt-6 text-slate-600 dark:text-slate-400"
              >
                Already have an account?{' '}
                <Link to="/login" className="text-teal-500 hover:text-teal-600 font-semibold">
                  Sign In
                </Link>
              </motion.p>
            </form>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex justify-center items-center gap-6"
            >
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <FaShieldAlt className="text-teal-500" />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <HiBadgeCheck className="text-blue-500" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <FaBuilding className="text-purple-500" />
                <span className="text-sm">Enterprise Ready</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default Register;
