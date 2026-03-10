import { useContext } from 'react';
import { AuthContext } from '@/shared/providers/AuthProvider';

export const useAuth = () => {
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
};
