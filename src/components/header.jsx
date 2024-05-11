import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const checkScreen = () => {
    setMobile(window.innerWidth <= 770);
  };

  useEffect(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => {
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  const toggleMobileNav = () => {
    setIsNavOpen(!isNavOpen);
    setMobileNav(!mobileNav);
  };

  return (
    <header className="fixed w-full z-50 bg-gray-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-white flex items-center logo">
          <img src={logo} alt="Locsafe Logo" className="h-12 mr-3 " />
          <span className='text-teal-300'>Loc</span>safe
        </Link>

        {mobile ? (
          <button onClick={toggleMobileNav} className="block lg:hidden focus:outline-none">
            <div className={`hamburger ${isNavOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        ) : (
          <nav>
            <ul className="flex items-center space-x-8 text-white font-medium">
              <li>
                <Link to="/features" className="hover:text-teal-400 transition-colors duration-300">
                  Features
                </Link>
              </li>
              {/*<li>
                <Link to="/pricing" className="hover:text-teal-400 transition-colors duration-300">
                  Pricing
                </Link>
        </li>*/}
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300">
                    Request Access
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Mobile navigation menu with fade animation */}
      {mobile && (
        <nav className={`lg:hidden fixed inset-x-0 top-16 transition-opacity duration-500 ${mobileNav ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-gray-900 h-full w-full flex flex-col justify-center items-center">
            <ul className="text-white font-medium">
              <li>
                <Link to="/features" className="block py-2 px-4 hover:text-teal-400 transition-colors duration-300">
                  Features
                </Link>
              </li>
              {/*<li>
                <Link to="/pricing" className="block py-2 px-4 hover:text-teal-400 transition-colors duration-300">
                  Pricing
                </Link>
      </li>*/}
              <li>
                <Link to="/contact" className="block py-2 px-4 hover:text-teal-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 mb-5">
                    Request Access
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;










