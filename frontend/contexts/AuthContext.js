"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginApi,
  checkSession,
  logout as logoutApi,
} from "@/services/auth";

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
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const response = await checkSession();
        const user = response?.data?.user;
        if (isMounted && user) {
          setUser(user);
          await fetchTokens(user);
        } else {
          if (isMounted) {
            clearAuthData();
          }
        }
      } catch (error) {
        if (isMounted) {
          clearAuthData();
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearAuthData = () => {
    setUser(null);
    setTokens(0);
  };

  const fetchTokens = async (user) => {
    if (!user) return;
    try {
      setTokens(100);
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      if (response?.user) {
        setUser(response.user);
        await fetchTokens(response.user);
        return { user: response.user };
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      clearAuthData();
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
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
