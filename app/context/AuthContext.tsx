"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Suppress "set state in effect" warning by acknowledging this is for hydration
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("nayab_user");
      if (storedUser) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const login = (name: string, phone: string) => {
    const newUser = { name, phone };
    setUser(newUser);
    localStorage.setItem("nayab_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nayab_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};