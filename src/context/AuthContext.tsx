"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the shape of our user object
interface User {
  username: string;
  role: "user" | "admin";
}

// Define the shape of our context
interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Login function
  const login = async (username: string, password: string, role: string): Promise<boolean> => {
    // In a real app, this would validate with a backend
    // For demo, we'll use mock validation
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, accept any non-empty credentials
      if (username && password) {
        const newUser: User = {
          username,
          role: role === "admin" ? "admin" : "user"
        };
        
        // Save to state and localStorage
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Create the context value object
  const contextValue: AuthContextType = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}