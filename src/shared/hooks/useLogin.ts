import { useMutation } from '@tanstack/react-query';
import { login, setToken, setUser } from '@/shared/config/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setToken(response.jwt);
      setUser(response.user);
    },
  });
};
