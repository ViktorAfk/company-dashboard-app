import { companiesListQuery } from '@/api/companies/query-companies';
import { SearchParamsType } from '@/types/query-types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { CompanyCard } from './company-card';
import { PaginationItems } from './pagination-items.tsx';

type Props = {
  allQueryParams: SearchParamsType;
};

export const Companies: React.FC<Props> = ({ allQueryParams }) => {
  const {
    data: companiesData,
    isLoading,
    isError,
  } = useQuery(companiesListQuery(allQueryParams));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Oops! Something went wrong!</p>;
  }
  if (!companiesData) {
    return <p>Oops!There is no data</p>;
  }
  const { data: companies, meta } = companiesData;

  return (
    <section className="flex flex-col justify-between h-full pb-10">
      <div className="container grid justify-items-center md:grid-cols-2 gap-4 md:justify-items-start xl:grid-cols-3 mb-5">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      {companies.length !== 0 && (
        <PaginationItems previousPage={meta.prev} nextPage={meta.next} />
      )}
    </section>
  );
};
