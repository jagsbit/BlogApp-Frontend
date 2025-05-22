import React, { createContext, useContext, useEffect, useState } from 'react';
import { isLoggedin, getUser } from '../auth'; // Make sure these return parsed values

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Load auth state from localStorage when app starts
  useEffect(() => {
    if (isLoggedin()) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("data")).user); // get actual user object
    }
  }, []);

  const loginContext = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logoutContext = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
