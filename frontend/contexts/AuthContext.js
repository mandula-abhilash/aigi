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
      const accessToken = localStorage.getItem("accessToken");

      if (storedUser && accessToken) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        await fetchTokens(userData);
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setTokens(0);
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
      const {
        user: userData,
        accessToken,
        refreshToken,
      } = await loginApi(credentials);

      // Store tokens and user data
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      await fetchTokens(userData);

      return { user: userData };
    } catch (error) {
      clearAuthData();
      throw error;
    }
  };

  const logout = async () => {
    try {
      clearAuthData();
    } catch (error) {
      console.error("Logout failed:", error);
      clearAuthData();
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
