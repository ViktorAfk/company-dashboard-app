import React from 'react';
import { Link } from 'react-router-dom';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationNext,
//   PaginationPrevious,
// } from './ui/pagination';

type Props = {
  previousPage: number | null;
  nextPage: number | null;
  setPage: (page: number | null) => string;
};
export const PaginationItems: React.FC<Props> = ({
  previousPage,
  nextPage,
  setPage,
}) => {
  return (
    <div>
      <Link to={setPage(previousPage)}>Previous</Link>
      <Link to={setPage(nextPage)}>Next</Link>
    </div>
  );
};
