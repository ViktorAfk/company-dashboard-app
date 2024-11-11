import { SearchParamsType } from '@/types/query-types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllAdminsForDashboard } from '../dashboard/dashboard';
import { createAdmin, deleteAdminData, updateAdminsData } from '../user/user';

export const useDeleteAdminMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admins'],
        type: 'all',
      });
    },
  });
};

export const useUpdateAdminMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdminsData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admins'],
        type: 'active',
      });
    },
  });
};

export const useGetAllAdminsQuery = (
  params: Pick<SearchParamsType, 'page'>,
) => {
  return useQuery({
    queryKey: ['admins', params.page],
    queryFn: () => getAllAdminsForDashboard(params),
  });
};

export const useCreateAdminMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admins'],
        type: 'all',
      });
    },
  });
};
