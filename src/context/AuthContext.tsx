"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useStore } from "@/hooks/useStore";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  checkAuth: () => Promise<void>;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check for token on mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Ensure cookie exists for middleware route protection
      document.cookie = `token=${storedToken}; path=/; max-age=${60 * 60 * 24 * 7}`;
      checkAuth(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkAuth = async (currentToken: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      
      const res = await fetch(`${apiUrl}/auth/me`, {
        headers: {
          Authorization: `Bearer ${currentToken}`
        }
      });
      
      const data = await res.json();
      
      if (data.success) {
        setUser(data.data.user);
      } else {
        // Invalid token
        logout();
      }
    } catch (error) {
      console.error("Auth check failed", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("token", newToken);
    // Set cookie so Next.js middleware can read it for route protection
    document.cookie = `token=${newToken}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days
    setAuthModalOpen(false); // Close modal on success
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    // Remove cookie
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    useStore.getState().setCart([]);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading, 
      login, 
      logout, 
      updateUser,
      checkAuth: () => token ? checkAuth(token) : Promise.resolve(),
      authModalOpen,
      setAuthModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
