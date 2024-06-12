import { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }) => {
  const [showNav, setShowNav] = useState(true);

  const toggleNav = () => {
    setShowNav(prev => !prev);
  };

  const value = {
    showNav,
    toggleNav,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};