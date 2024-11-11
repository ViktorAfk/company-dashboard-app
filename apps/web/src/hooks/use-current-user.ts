import { useGetUserQuery } from '@/api/user/users-query';
import { useAuthContext } from './auth-context';

export const useGetCurrentUser = () => {
  const { authData } = useAuthContext();

  return useGetUserQuery(authData?.userId);
};
