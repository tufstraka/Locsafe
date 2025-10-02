import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSun, 
  FaMoon, 
  FaBars, 
  FaTimes, 
 // FaRocket, 
  //FaShieldAlt, 
  FaLock 
} from 'react-icons/fa';
import logoabs from '../assets/logoabs.png';

const products = [
  {
    title: "Chill",
    description: "We cooking something awesome.",
    icon: <FaLock className="text-teal-500" />,
    href: "#"
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
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900 shadow-lg' 
          : 'bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoabs} alt="Locsafe Logo" className="h-8 w-auto" />
            <span className="font-bold text-xl text-white">Locsafe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown */}
            <div className="relative group">
              <button 
                onMouseEnter={() => setIsProductsOpen(true)}
                className="flex items-center space-x-1 text-white dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
              >
                <span>Products</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Products Dropdown Menu */}
              <div 
                onMouseLeave={() => setIsProductsOpen(false)}
                className={`absolute left-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                  isProductsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <div className="p-4 grid gap-4">
                  {products.map((product) => (
                    <Link
                      key={product.title}
                      to={product.href}
                      className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex-shrink-0">{product.icon}</div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {product.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/contact" className="text-white dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400">
              Contact
            </Link>
            
            <a 
              href="https://discord.gg/wCKQCxaj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400"
            >
              Join Community
            </a>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            <Link to="/register">
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors">
                Get Started
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="space-y-2">
              <p className="px-3 text-sm font-semibold text-white ">
                Products
              </p>
              {products.map((product) => (
                <Link
                  key={product.title}
                  to={product.href}
                  className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="mr-3">{product.icon}</span>
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              className="block px-3 py-2 rounded-lg text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700"
            >
              Contact
            </Link>

            <a
              href="https://discord.gg/wCKQCxaj"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-lg text-white hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700"
            >
              Join Community
            </a>

            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center px-3 py-2 rounded-lg text-white hover:text-black hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <>
                  <FaSun className="mr-3" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <FaMoon className="mr-3" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <Link
              to="/register"
              className="block px-3 py-2 text-center rounded-lg bg-teal-500 text-white hover:bg-teal-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;













