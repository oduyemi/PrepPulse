"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type UserFields = {
  firstName: string;
  surname: string;
  email: string;
  jobInterest: "fullstack" | "hr" | "pm";
  skillLevel: "entry" | "intermediate" | "senior";
};

export type User = {
  id: string;
  fields: Partial<UserFields>;
};

type AuthContextType = {
  user: User | null;
  isHydrated: boolean;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");

      if (stored) {
        const parsed = JSON.parse(stored);

        if (parsed?.id && parsed?.fields?.email) {
          setUser(parsed);
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch {
      localStorage.removeItem("user");
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const login = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isHydrated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};