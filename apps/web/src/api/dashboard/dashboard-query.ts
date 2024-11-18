import { Role } from '@/types/User';
import { SearchParamsType } from '@/types/query-types';
import { useQuery } from '@tanstack/react-query';

import { getAllCompaniesForDashboard } from './dashboard';

export const useGetCompaniesDashboardQuery = (params: {
  role: Role | undefined;
  queryParams: Pick<SearchParamsType, 'page'>;
}) => {
  return useQuery({
    queryKey: ['dashboard', params.queryParams.page],
    queryFn: () => getAllCompaniesForDashboard(params),
  });
};
