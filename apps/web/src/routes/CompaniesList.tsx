import { getCompaniesList } from '@/api/companies/companies';
import { useCompaniesListQuery } from '@/api/companies/query-companies';
import { Companies } from '@/components/companies';
import { FilterComponent } from '@/components/filter-component';
import { PaginationItems } from '@/components/pagiantion-items';
import { useQueryParams } from '@/hooks/use-query-params';
import { QueryClient } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { number } from 'yup';

const companiesListQuery = () => ({
  queryKey: ['companies'],
  queryFn: async () => getCompaniesList(),
});

export const loader = (queryClient: QueryClient) => async () => {
  const query = companiesListQuery();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const CompaniesList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { allQueryParams, setQueryParam, removeQueryParamByKey } =
    useQueryParams();
  const { data: companiesData } = useCompaniesListQuery();
  const currentPage = searchParams.get('page') || '1';
  const { pathname } = useLocation();

  if (!companiesData) {
    return <p>Oops! There is no data</p>;
  }

  const setPage = (page: number | null) => {
    if (!page) {
      return currentPage;
    }

    if (page.toString() === '1') {
      removeQueryParamByKey('page');
      return '/';
    }

    // setQueryParam('page', page.toString());
    return `${pathname}?page=${number}`;
  };
  const { data: companies, meta } = companiesData;
  const { next, previous } = meta;

  return (
    <section className="p-5">
      <FilterComponent />
      <Companies companies={companies} />
      <PaginationItems
        setPage={setPage}
        previousPage={previous}
        nextPage={next}
      />
    </section>
  );
};
