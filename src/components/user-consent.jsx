import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365, path: '/' });
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm md:text-base mb-2 md:mb-0">
          We use cookies to improve your experience on our site. By accepting, you consent to our use of cookies.
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserConsent;
