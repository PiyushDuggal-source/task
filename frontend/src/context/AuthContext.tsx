import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getUserSettings, meCall } from "../service/service";
import { IUserSettingsProps } from "../types/types";

export type UserOrNull = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
} | null;

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserOrNull;
  userSettings: IUserSettingsProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserOrNull>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileSettings: React.Dispatch<
    React.SetStateAction<IUserSettingsProps | null>
  >;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserOrNull>(null);
  const [profileSettings, setProfileSettings] =
    useState<IUserSettingsProps | null>(null);

  const checkAuthStatus = async () => {
    try {
      const response = await meCall();
      if (response.status === 200) {
        const userSettings = await getUserSettings();
        setProfileSettings(userSettings);
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
      value={{
        isAuthenticated,
        user,
        setUser,
        setIsAuthenticated,
        userSettings: profileSettings,
        setProfileSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
