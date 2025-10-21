import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authService } from '../services/api';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiUser, setApiUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      // If user is logged in and we have a token, fetch user data from API
      if (user && localStorage.getItem('authToken')) {
        try {
          const userData = await authService.getMe();
          setApiUser(userData);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          // If token is invalid, clear it
          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');
        }
      } else {
        setApiUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    const auth = getAuth();
    try {
      // Logout from API first
      if (localStorage.getItem('authToken')) {
        await authService.logout();
      }
    } catch (error) {
      console.error('API logout failed:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      // Sign out from Firebase
      await auth.signOut();
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, apiUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
