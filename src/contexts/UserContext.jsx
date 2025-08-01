import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(undefined);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token && userName && userEmail) {
      setUser({ token, userName, userEmail });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    setUser({ token: userData.token, userName: userData.name, userEmail: userData.email });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};