import { cn } from '@/lib/utils';
import { getSearchWith } from '@/utils/params-utils';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

type Props = {
  previousPage: number | null;
  nextPage: number | null;
};

export const PaginationItems: React.FC<Props> = ({
  previousPage,
  nextPage,
}) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const onPreviousClick = (previousPage: number | null) => {
    if (previousPage === null) {
      return '/';
    }

    return {
      search: getSearchWith(searchParams, { page: previousPage.toString() }),
    };
  };
  const onNextClick = (nextPage: number | null) => {
    if (nextPage === null) {
      return currentPage;
    }
    getSearchWith(searchParams, { page: nextPage.toString() });
    return {
      search: getSearchWith(searchParams, { page: nextPage.toString() }),
    };
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn({
              'pointer-events-none opacity-50': previousPage === null,
            })}
            isActive={Boolean(previousPage)}
            to={onPreviousClick(previousPage)}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            isActive={Boolean(nextPage)}
            className={cn({
              'pointer-events-none opacity-50': nextPage === null,
            })}
            to={onNextClick(nextPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
