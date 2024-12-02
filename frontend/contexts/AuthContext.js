"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  login as loginApi,
  checkSession,
  logout as logoutApi,
} from "@/services/auth";
import { getWalletDetails } from "@/services/wallet";

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
          await fetchTokens();
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

  const fetchTokens = async () => {
    try {
      const walletData = await getWalletDetails();
      setTokens(walletData.balance || 0);
    } catch (error) {
      console.error("Failed to fetch tokens:", error);
      setTokens(0);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      if (response?.user) {
        setUser(response.user);
        await fetchTokens();
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
