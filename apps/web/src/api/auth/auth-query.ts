import { useMutation, useQuery } from '@tanstack/react-query';
import { getLoggedUser, logout, registerUser } from './auth';

export const useSignInUser = () => {
  return useMutation({
    mutationFn: getLoggedUser,
  });
};

export const useRegisterUserQuery = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export const useLogoutQuery = () => {
  return useQuery({
    queryKey: ['auth'],
    queryFn: logout,
    enabled: false,
    refetchOnWindowFocus: false,
  });
};
