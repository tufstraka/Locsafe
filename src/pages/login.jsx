import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { IoIosLock, IoIosMail } from "react-icons/io";
import { FaSpinner, FaEye, FaEyeSlash, FaFingerprint, FaShieldAlt, FaCheckCircle, FaGoogle, FaMicrosoft, FaArrowRight, FaUserCircle, FaLock } from "react-icons/fa";
import { HiLightningBolt, HiSparkles, HiBadgeCheck, HiLockClosed } from "react-icons/hi";
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const navigate = useNavigate();
  const auth = getAuth();

  // Typing animation effect
  useEffect(() => {
    if (email || password) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 500);
      return () => clearTimeout(timer);
    }
  }, [email, password]);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back! 🎉');
      
      // Save email if remember me is checked
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email address');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

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

  const features = [
    { icon: FaShieldAlt, text: "Secure blockchain tracking" },
    { icon: HiLightningBolt, text: "Real-time analytics" },
    { icon: FaFingerprint, text: "Digital product passports" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-teal-950/20 overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [-50, 50, -50],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
        />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <Header />

      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)] relative z-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center mt-16">
          
          {/* Left Side - Welcome Back Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500/10 to-blue-500/10 backdrop-blur-sm border border-teal-500/20 rounded-full mb-6"
              >
                <HiSparkles className="text-teal-500 animate-pulse" />
                <span className="text-teal-700 dark:text-teal-400 text-sm font-semibold">Welcome Back</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
                Sign in to
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500">
                  Your Dashboard
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Access your supply chain analytics, track shipments, and manage digital product passports.
              </p>
            </div>

            {/* Feature List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl flex items-center justify-center group-hover:from-teal-500/20 group-hover:to-blue-500/20 transition-all">
                    <feature.icon className="text-teal-500 text-xl" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-slate-800/5 to-slate-900/5 dark:from-slate-800/20 dark:to-slate-900/20 rounded-2xl backdrop-blur-sm"
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-500">10k+</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-500">99.9%</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Uptime</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">24/7</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Support</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.form 
              onSubmit={handleLogin}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Form Header */}
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/25">
                  <FaUserCircle className="text-4xl text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sign In</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Enter your credentials to continue
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-5">
                {/* Email Field */}
                <div className="relative">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className={`relative border rounded-xl transition-all duration-300 ${
                      focusedField === 'email' 
                        ? 'border-teal-500 shadow-lg shadow-teal-500/20' 
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center p-4">
                      <IoIosMail className={`mr-3 text-xl transition-colors ${
                        focusedField === 'email' ? 'text-teal-500' : 'text-slate-400'
                      }`} />
                      <input
                        type="email"
                        className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-white placeholder-slate-400"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField('')}
                        required
                      />
                      {email && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-2"
                        >
                          <FaCheckCircle className="text-green-500" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Password Field */}
                <div className="relative">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className={`relative border rounded-xl transition-all duration-300 ${
                      focusedField === 'password' 
                        ? 'border-teal-500 shadow-lg shadow-teal-500/20' 
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center p-4">
                      <IoIosLock className={`mr-3 text-xl transition-colors ${
                        focusedField === 'password' ? 'text-teal-500' : 'text-slate-400'
                      }`} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="w-full bg-transparent focus:outline-none text-slate-700 dark:text-white placeholder-slate-400"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField('')}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 text-slate-500 hover:text-teal-500 transition-colors"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Remember Me & Forgot Password */}
                <motion.div variants={itemVariants} className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all ${
                      rememberMe 
                        ? 'bg-teal-500 border-teal-500' 
                        : 'border-slate-300 dark:border-slate-600 group-hover:border-teal-400'
                    }`}>
                      {rememberMe && (
                        <motion.svg
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 text-white mx-auto mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </motion.svg>
                      )}
                    </div>
                    <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-teal-500 hover:text-teal-600 font-medium">
                    Forgot password?
                  </Link>
                </motion.div>

                {/* Login Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    type="submit"
                    disabled={loading || !email || !password}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex justify-center items-center gap-2 ${
                      email && password && !loading
                        ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 shadow-lg shadow-teal-500/25' 
                        : 'bg-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <HiLightningBolt />
                        <span>Sign In</span>
                        <FaArrowRight className="text-sm" />
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Divider */}
                <motion.div variants={itemVariants} className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-slate-800 text-slate-500">Or continue with</span>
                  </div>
                </motion.div>

                {/* Social Login Buttons */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-4 border border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    <FaGoogle className="text-red-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Google</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3 px-4 border border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all"
                  >
                    <FaMicrosoft className="text-blue-600" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Microsoft</span>
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Sign Up Link */}
              <motion.p 
                variants={itemVariants}
                className="text-center mt-6 text-slate-600 dark:text-slate-400"
              >
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-teal-500 hover:text-teal-600 font-semibold">
                  Sign up for free
                </Link>
              </motion.p>
            </motion.form>

            {/* Security Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex justify-center items-center gap-6"
            >
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <HiLockClosed className="text-teal-500" />
                <span className="text-sm">256-bit SSL</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <HiBadgeCheck className="text-blue-500" />
                <span className="text-sm">SOC 2 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <FaShieldAlt className="text-purple-500" />
                <span className="text-sm">GDPR Ready</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Floating Animation Elements */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-10 right-10 w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl z-50"
          >
            <FaLock className="text-white text-2xl animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Login;
