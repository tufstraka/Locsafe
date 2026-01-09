import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Products', href: '/#portfolio' },
    { label: 'Focus Areas', href: '/#focus' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-2xl bg-gray-900/95 shadow-lg shadow-black/10 border-b border-white/[0.06]'
          : 'backdrop-blur-xl bg-gray-900/80 border-b border-white/[0.04]'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
                <span className="text-white font-bold text-base">L</span>
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">Locsafe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-[13px] text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.06]"
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-5 bg-white/10 mx-3" />
            <Link
              to="/contact"
              className="px-5 py-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/[0.15] rounded-full text-[13px] font-medium text-white transition-all duration-200"
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/[0.08] transition-all duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-3 mt-3 border-t border-white/[0.08]">
                  <Link
                    to="/contact"
                    className="block px-4 py-3 text-center bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-medium"
                  >
                    Contact Us
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
