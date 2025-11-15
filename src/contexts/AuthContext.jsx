import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const userData = await authAPI.getMe();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          // Token might be expired, clear it
          authAPI.logout();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      // After registration, automatically log in
      if (response.id) {
        const loginResponse = await login(userData.email, userData.password);
        return loginResponse;
      }
      return { success: false, error: 'Registration failed' };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed' };
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

