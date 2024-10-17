import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addCompany,
  deleteCompany,
  getCompaniesList,
  getCompany,
  updateCompanyData,
} from './companies';

export const useCompaniesListQuery = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompaniesList,
  });
};

export const useGetCompanyQuery = (companyId: number) => {
  return useQuery({
    queryKey: ['company', companyId],
    queryFn: () => getCompany(companyId),
  });
};

export const useCreateCompanyQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
        type: 'active',
      });
    },
  });
};

export const useUpdateCompanyQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'], type: 'active' });
    },
  });
};

export const useDeleteCompanyQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'], type: 'active' });
    },
  });
};
