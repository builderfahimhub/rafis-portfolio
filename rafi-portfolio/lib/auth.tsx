"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => false,
  logout: () => {},
});

// ── YOUR LOGIN CREDENTIALS ──────────────────────────
const ADMIN_USERNAME = "rafi";
const ADMIN_PASSWORD = "rafi2025";
// ────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Persist login across page refreshes via sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("rafi_admin");
    if (saved === "true") setIsLoggedIn(true);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      sessionStorage.setItem("rafi_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("rafi_admin");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
