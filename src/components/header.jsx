import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 770);
    
    window.addEventListener('resize', handleResize);
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    return () => window.removeEventListener('resize', handleResize);
  }, [isDarkMode]);

  const toggleMobileNav = () => setIsNavOpen(!isNavOpen);
  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const navLinks = [
    /*{ to: '/blog', label: 'Blog' },*/
    { to: '/contact', label: 'Contact' },
    { to: 'https://chat.whatsapp.com/FHo517DQ4RSEZHjBq48LYO', label: 'Join our community', external: true },
    { to: '/register', label: 'Get Started', button: true }
  ];

  return (
    <header className="fixed w-full z-50 bg-gray-900 dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-white flex items-center">
          <img src={logo} alt="Locsafe Logo" className="h-10 md:h-12 lg:h-16 w-auto" />
        </Link>

        {isMobile ? (
          <button onClick={toggleMobileNav} className="block lg:hidden focus:outline-none transition-transform duration-300">
            <div className={`hamburger ${isNavOpen ? 'open' : ''}`}>
              <span className={`block h-0.5 w-6 bg-white mb-1 transition-transform duration-100 ${isNavOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-white mb-1 transition-opacity duration-100`}></span>
              <span className={`block h-0.5 w-6 bg-white transition-transform duration-100 ${isNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        ) : (
          <nav className="flex items-center space-x-8 text-white font-medium">
            <ul className="flex items-center space-x-8 list-none"> {/* Added list-none to remove dots */}
              {navLinks.map(({ to, label, external, button }) => (
                <li key={label}>
                  {button ? (
                    <Link to={to}>
                      <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
                        {label}
                      </button>
                    </Link>
                  ) : (
                    <Link to={to} className={`hover:text-gray-400 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} target={external ? '_blank' : '_self'}>
                      {label}
                    </Link>
                  )}
                </li>
              ))}
              <li>
                <button
                  onClick={toggleDarkMode}
                  className="text-l p-2 rounded transition-colors duration-300 flex items-center"
                  aria-label="Toggle Dark Mode"
                >
                  {isDarkMode ? <FaSun className="text-yellow-500 transition-transform duration-300" /> : <FaMoon className="text-gray-300 transition-transform duration-300" />}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {isMobile && isNavOpen && (
        <nav className={`fixed inset-x-0 top-16 bg-gray-900 dark:bg-gray-800 h-auto flex flex-col items-center transition-opacity duration-500`}>
                      
              <button
                onClick={toggleDarkMode}
                className="text-2xl p-2 rounded transition-colors duration-300 mt-4 flex items-center"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <FaSun className="text-yellow-500 transition-transform duration-300" /> : <FaMoon className="text-gray-300 transition-transform duration-300" />}
              </button>
            
          <ul className="text-white font-medium list-none">
            {navLinks.map(({ to, label, external, button }) => (
              <li key={label}>
                {button ? (
                  <Link to={to}>
                    <button className="block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-12 rounded transition-colors duration-300 mb-5">
                      {label}
                    </button>
                  </Link>
                ) : (
                  <Link to={to} className={`block py-2 px-4 hover:text-teal-400 transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} target={external ? '_blank' : '_self'}>
                    {label}
                  </Link>
                )}
              </li>
            ))}

          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;














