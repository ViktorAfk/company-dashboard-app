import { SearchParamsType } from '@/types/query-types';
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  addCompany,
  deleteCompany,
  deleteCompanyLogo,
  getCompaniesList,
  getCompany,
  loadCompanyLogo,
  updateCompanyData,
} from './companies';

export const companiesListQuery = ({
  limit,
  page,
  searchByName,
  sort,
  order,
  searchByService,
}: SearchParamsType) =>
  queryOptions({
    queryKey: [
      'companies',
      page || '',
      searchByName || '',
      order || '',
      limit || '',
      searchByService || '',
      sort || '',
    ],
    queryFn: async () =>
      getCompaniesList({
        page,
        searchByName,
        order,
        limit,
        searchByService,
        sort,
      }),
  });

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
      queryClient.invalidateQueries({
        queryKey: ['company'],
        type: 'active',
      });
    },
  });
};

export const useUploadCompanyLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loadCompanyLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['company'],
        type: 'active',
      });
    },
  });
};

export const useDeleteCompanyLogoQuery = (companyId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCompanyLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['company', companyId],
        type: 'active',
      });
    },
  });
};

export const useDeleteCompanyQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['companies'],
        type: 'active',
      });
    },
  });
};
