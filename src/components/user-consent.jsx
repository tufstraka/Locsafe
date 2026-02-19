import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const UserConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      // Small delay before showing to avoid layout shift on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set('cookieConsent', 'false', { expires: 365 });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies to improve your experience. By continuing, you agree to our{' '}
                    <Link to="/privacy" className="text-gray-900 underline underline-offset-2 hover:text-primary-700 transition-colors">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleDecline}
                    className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAccept}
                    className="flex-1 sm:flex-none px-5 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserConsent;
