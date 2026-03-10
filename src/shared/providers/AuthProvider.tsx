'use client';

import { useState, createContext, useContext, type ReactNode } from 'react';
import { AuthResponse, LoginData, RegisterData, login as apiLogin, register as apiRegister, setToken, setUser, getToken, getUser, removeToken, removeUser } from '@/shared/config/auth';

export type AuthContextType = {
  user: AuthResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUserState] = useState<AuthResponse['user'] | null | undefined>(() => {
    if (typeof window === 'undefined') return null;
    const token = getToken();
    const storedUser = getUser();
    return token && storedUser ? storedUser : null;
  });
  const isLoading = user === undefined;

  const login = async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiLogin(data);
    setToken(response.jwt);
    setUser(response.user);
    setUserState(response.user);
    return response;
  };

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiRegister(data);
    setToken(response.jwt);
    setUser(response.user);
    setUserState(response.user);
    return response;
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async () => { throw new Error('login not available'); },
      register: async () => { throw new Error('register not available'); },
      logout: () => {},
    };
  }
  return context;
}

