import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

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
    setMobileNav(!mobileNav);
  };

  return (
    <header className="py-6 bg-gray-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold text-white hover:text-gray-200">Locsafe™</Link>
        {mobile ? (
          <button onClick={toggleMobileNav} className="block lg:hidden focus:outline-none">
            <svg className="h-6 w-6 fill-current text-white" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M3 5h18a1 1 0 010 2H3a1 1 0 010-2zm18 4H3a1 1 0 100 2h18a1 1 0 100-2zm0 6H3a1 1 0 100 2h18a1 1 0 100-2z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <nav>
            <ul className="flex items-center space-x-8 text-white font-medium">
              <li>
                <Link to="/features" className="hover:text-gray-200">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-gray-200">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-200">Contact</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      {/* Mobile navigation menu with sliding animation */}
      {mobile && (
        <nav className={`lg:hidden absolute inset-x-0 top-16 transition-transform duration-300 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="bg-gray-800 h-full w-full flex flex-col justify-center items-center">
            <ul className="text-white font-medium">
              <li>
                <Link to="/features" className="block py-2 px-4 hover:text-gray-200">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="block py-2 px-4 hover:text-gray-200">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2 px-4 hover:text-gray-200">Contact</Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;




