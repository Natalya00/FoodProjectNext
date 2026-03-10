import { useMutation } from '@tanstack/react-query';
import { register, setToken, setUser } from '@/shared/config/auth';

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      setToken(response.jwt);
      setUser(response.user);
    },
  });
};
