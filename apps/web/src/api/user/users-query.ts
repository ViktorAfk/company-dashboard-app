import { useQuery } from '@tanstack/react-query';
import { getUser } from './user';

export const useGetUserQuery = (id: number | undefined) => {
  return useQuery({
    queryKey: ['user', id],
    enabled: !!id,
    queryFn: () => getUser(id),
  });
};

// export const useCurrentUserQuery = () => {
//   const { userId } = useCurrentUserId();

//   return useGetUserQuery(userId);
// };
