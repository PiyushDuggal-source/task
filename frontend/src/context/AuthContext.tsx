import React, { createContext, useState, useEffect, ReactNode } from "react";
import { meCall } from "../service/service";

type UserOrNull = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
} | null;

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserOrNull;
  setUser: React.Dispatch<React.SetStateAction<UserOrNull>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserOrNull>(null);

  const checkAuthStatus = async () => {
    try {
      const response = await meCall();
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error authentication status:", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
