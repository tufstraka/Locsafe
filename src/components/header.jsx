import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoabs from '../assets/logoabs.png';

const solutions = [
  {
    title: "Cold Chain Management",
    description: "End-to-end temperature-controlled logistics for pharmaceuticals and perishables",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center">
        <span className="material-icons text-white text-xl">ac_unit</span>
      </div>
    ),
    href: "/solutions/cold-chain"
  },
  {
    title: "Last-Mile Delivery",
    description: "Optimize final delivery routes with AI-powered logistics",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
        <span className="material-icons text-white text-xl">local_shipping</span>
      </div>
    ),
    href: "/solutions/last-mile"
  },
  {
    title: "Fleet Management",
    description: "Real-time tracking and management of your entire fleet",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
        <span className="material-icons text-white text-xl">directions_car</span>
      </div>
    ),
    href: "/solutions/fleet"
  },
  {
    title: "Warehouse Automation",
    description: "Smart inventory management with IoT and AI integration",
    icon: (
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
        <span className="material-icons text-white text-xl">warehouse</span>
      </div>
    ),
    href: "/solutions/warehouse"
  }
];

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface-light dark:bg-surface-dark shadow-elevation-2 dark:shadow-elevation-dark-2'
          : 'bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.img
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              src={logoabs}
              alt="Locsafe Logo"
              className="h-9 w-auto"
            />
            <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
              Locsafe
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsProductsOpen(true)}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-on-surface-light dark:text-on-surface-dark hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
              >
                <span className="font-medium">Solutions</span>
                <motion.span
                  animate={{ rotate: isProductsOpen ? 180 : 0 }}
                  className="material-icons text-base"
                >
                  expand_more
                </motion.span>
              </button>

              {/* Solutions Dropdown Menu */}
              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    onMouseLeave={() => setIsProductsOpen(false)}
                    className="absolute left-0 mt-2 w-96 bg-surface-light dark:bg-surface-elevated-dark rounded-xl shadow-elevation-3 dark:shadow-elevation-dark-3 overflow-hidden"
                  >
                    <div className="p-2">
                      {solutions.map((solution) => (
                        <Link
                          key={solution.title}
                          to={solution.href}
                          className="flex items-start p-4 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all duration-200 group"
                        >
                          <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                            {solution.icon}
                          </div>
                          <div className="ml-4">
                            <p className="font-heading font-semibold text-on-surface-light dark:text-on-surface-dark">
                              {solution.title}
                            </p>
                            <p className="text-sm text-on-surface-light-medium dark:text-on-surface-dark-medium mt-1">
                              {solution.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg text-on-surface-light dark:text-on-surface-dark hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 font-medium"
            >
              Contact
            </Link>
            
            {/*<a
              href="https://discord.gg/wCKQCxaj"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-on-surface-light dark:text-on-surface-dark hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 font-medium flex items-center gap-2"
            >
              <span className="material-icons text-xl">groups</span>
              Join Community
            </a>*/}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 ml-2"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.span
                key={isDarkMode ? 'dark' : 'light'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                className="material-icons text-xl text-on-surface-light dark:text-on-surface-dark"
              >
                {isDarkMode ? 'light_mode' : 'dark_mode'}
              </motion.span>
            </button>

            <Link to="/register" className="ml-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-2.5 rounded-full font-medium shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-200 flex items-center gap-2"
              >
                Get Started
                <span className="material-icons text-base">arrow_forward</span>
              </motion.button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            <motion.span
              key={isMobileMenuOpen ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              className="material-icons text-2xl text-on-surface-light dark:text-on-surface-dark"
            >
              {isMobileMenuOpen ? 'close' : 'menu'}
            </motion.span>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 py-4 space-y-1">
                <div className="space-y-2 mb-4">
                  <p className="px-4 text-xs font-semibold text-on-surface-light-medium dark:text-on-surface-dark-medium uppercase tracking-wider">
                    Solutions
                  </p>
                  {solutions.map((solution) => (
                    <Link
                      key={solution.title}
                      to={solution.href}
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all duration-200"
                    >
                      <span className="mr-3">{solution.icon}</span>
                      <div>
                        <p className="font-medium text-on-surface-light dark:text-on-surface-dark">{solution.title}</p>
                        <p className="text-sm text-on-surface-light-medium dark:text-on-surface-dark-medium">{solution.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all duration-200 text-on-surface-light dark:text-on-surface-dark font-medium"
                >
                  <span className="material-icons mr-3">email</span>
                  Contact
                </Link>

                <a
                  href="https://discord.gg/wCKQCxaj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all duration-200 text-on-surface-light dark:text-on-surface-dark font-medium"
                >
                  <span className="material-icons mr-3">groups</span>
                  Join Community
                </a>

                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all duration-200 text-on-surface-light dark:text-on-surface-dark font-medium"
                >
                  <span className="material-icons mr-3">
                    {isDarkMode ? 'light_mode' : 'dark_mode'}
                  </span>
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                <Link
                  to="/register"
                  className="block px-4 py-3 text-center rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium shadow-elevation-2 mt-4"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;













