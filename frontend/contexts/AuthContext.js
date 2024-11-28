"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { login as loginApi } from "@/services/auth";

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
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        await fetchTokens(userData);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
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
      console.error("Failed to fetch tokens:", error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      const { user: userData, tokens: userTokens } = response.data;

      setUser(userData);
      setTokens(userTokens);
      localStorage.setItem("user", JSON.stringify(userData));

      return { user: userData };
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("user");
      setUser(null);
      setTokens(0);
    } catch (error) {
      console.error("Logout failed:", error);
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
