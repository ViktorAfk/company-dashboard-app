import { useLocation, useSearchParams } from 'react-router-dom';

export const usePageParams = (
  nextPage: number | null,
  previousPage: number | null,
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const { pathname } = useLocation();

  // const buildLink = useCallback(
  //   (newPage: number) => {
  //     const key = currentPage || 'page';
  //     if (!searchParams) {
  //       return `${pathname}?${key}=${newPage}`;
  //     }

  //     const newSearchParams = new URLSearchParams(searchParams);
  //     newSearchParams.set(key, String(newPage));
  //     return `${pathname}?${newSearchParams.toString()}`;
  //   },
  //   [searchParams, pathname, currentPage],
  // );
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();

    if (pageNumber === null) {
      return currentPage;
    }

    if (pageNumber === '' || pageNumber === '1') {
      params.delete('page');
      return '/';
    }

    params.set('page', pageNumber.toString());
    setSearchParams(params);

    return `${pathname}?${currentPage.toString()}`;
  };

  const next = nextPage === null ? Number(currentPage) : nextPage;
  const previous = previousPage === null ? 1 : previousPage;
  const checkPrevious = previous || 1;

  return { createPageURL, next, checkPrevious };
};
