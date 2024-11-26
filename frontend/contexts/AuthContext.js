'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const defaultContext = {
  user: null,
  tokens: 0,
  loading: true,
  login: async () => {},
  logout: async () => {},
  fetchTokens: async () => {},
};

const AuthContext = createContext(defaultContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Simulated auth check for demo
      setUser(null);
      setTokens(0);
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTokens = async (user) => {
    if (!user) return;
    try {
      // Simulated token fetch for demo
      setTokens(100);
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
    }
  };

  const login = async (credentials) => {
    try {
      // Simulated login for demo
      const mockUser = { id: 1, name: 'Demo User' };
      setUser(mockUser);
      fetchTokens(mockUser);
      return { user: mockUser };
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setTokens(0);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const value = {
    user,
    tokens,
    loading,
    login,
    logout,
    fetchTokens,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}