import { Companies } from '@/components/companies';
import { FilterComponent } from '@/components/filter-component';
import { useQueryParams } from '@/hooks/use-query-params';

import React from 'react';

export const CompaniesList: React.FC = () => {
  const { allQueryParams, setQueryParam, debounced } = useQueryParams();

  const { searchByName = '', searchByService = '' } = allQueryParams;

  const setSortValue = (value: string) => {
    if (value === 'none') {
      setQueryParam({ sort: null, order: null });

      return;
    }
    const [sortValue, orderValue] = value.split('_');

    setQueryParam({ sort: sortValue, order: orderValue });
  };

  const setLimitValue = (value: string) => {
    if (value === 'none') {
      setQueryParam({ limit: null });
      return;
    }
    setQueryParam({ limit: value });
  };

  return (
    <section className="p-5 h-full">
      <FilterComponent
        searchByNameValue={searchByName}
        debouncedQuerySearch={debounced}
        searchByService={searchByService}
        setSortValue={setSortValue}
        setLimitValue={setLimitValue}
      />

      <Companies allQueryParams={allQueryParams} />
    </section>
  );
};
