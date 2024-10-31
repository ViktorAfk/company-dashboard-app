import { useMutation, useQuery } from '@tanstack/react-query';
import {
  forgotPassword,
  getLoggedUser,
  logout,
  registerUser,
  resetPassword,
} from './auth';

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

export const useForgotPasswordQuery = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPasswordQuery = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
