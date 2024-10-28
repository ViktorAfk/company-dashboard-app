import { SearchParamsType } from '@/types/query-types';
import { SearchParams, getSearchWith } from '@/utils/params-utils';
import { useCallback, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

export const useQueryParams = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const allQueryParams: SearchParamsType = useMemo(() => {
    return Object.fromEntries(searchParams);
  }, [searchParams]);

  const getQueryParamByKey = (key: string) => {
    const params = new URLSearchParams(location.search);
    return params.get(key) || '';
  };

  const setQueryParam = useCallback(
    (params: SearchParams) => {
      const search = getSearchWith(searchParams, params);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const debounced = useDebouncedCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      key: keyof Pick<SearchParamsType, 'searchByName' | 'searchByService'>,
    ) => {
      setQueryParam({ [key]: event.target.value || null });
    },
    500,
  );

  return {
    allQueryParams,
    getQueryParamByKey,
    setQueryParam,
    debounced,
  };
};
