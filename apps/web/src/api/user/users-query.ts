import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteUserAvatar,
  getUser,
  updateUser,
  updateUserAvatar,
  updateUserPassword,
} from './user';

export const useGetUserQuery = (id: number | undefined) => {
  return useQuery({
    queryKey: ['user', id],
    enabled: !!id,
    queryFn: () => getUser(id),
  });
};

export const useUpdateUserQuery = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', id],
        type: 'active',
      });
    },
  });
};

export const useUpdateUserPasswordQuery = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user', id],
        type: 'active',
      });
    },
  });
};

export const useUpdateUserLogoQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
        type: 'active',
      });
    },
  });
};

export const useDeleteUserQueryLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
        type: 'active',
      });
    },
  });
};
