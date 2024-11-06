import { Role } from '@/types/User';
import { SearchParamsType } from '@/types/query-types';
import { useQuery } from '@tanstack/react-query';
import {
  getAllAdminsForDashboard,
  getAllCompaniesForDashboard,
  getAllUsersForDashboard,
} from './dashboard';

export const useGetCompaniesDashboardQuery = (params: {
  role: Role | undefined;
  queryParams: Pick<SearchParamsType, 'page'>;
}) => {
  return useQuery({
    queryKey: ['companies', params.queryParams.page],
    queryFn: () => getAllCompaniesForDashboard(params),
  });
};

export const useGetAllUsersQuery = (params: Pick<SearchParamsType, 'page'>) => {
  return useQuery({
    queryKey: ['users', params.page],
    queryFn: () => getAllUsersForDashboard(params),
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
