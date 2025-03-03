import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
export const AuthContext = createContext();

// Add the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User object will hold user details like role, username, etc.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Example: Retrieve user from local storage or an API call
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  
  const login = (userData) => {
    console.log("Logging in User:", userData); // Debug login data
    setIsAuthenticated(true);
    setUser(userData); // Persist login
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const verifyToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/verifyToken', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Verified User Data:", data.user); // Log user data
        setIsAuthenticated(true);
        setUser(data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};