
import React, { createContext, useContext, useEffect, useState } from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would check for a stored user session here
    // For this example, we'll just simulate a loading period
    setTimeout(() => {
      setIsLoading(false);
      // For testing, you could set isLoggedIn to true here to see the main app
      // setIsLoggedIn(true); 
    }, 1500);
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
