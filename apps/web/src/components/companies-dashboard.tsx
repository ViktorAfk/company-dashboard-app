import { useGetCompaniesDashboardQuery } from '@/api/dashboard/dashboard-query';
import { useCurrentUserContext } from '@/hooks/auth-user-context';
import { useQueryParams } from '@/hooks/use-query-params';
import { ErrorPage } from '@/routes/ErrorPage';
import React from 'react';
import { CompanyChart } from './company-chart';
import { PaginationItems } from './pagination-items.tsx';
import { Spinner } from './ui/Spinner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export const CompaniesAdmins: React.FC = () => {
  const { allQueryParams } = useQueryParams();
  const value = useCurrentUserContext();

  const {
    data: dataCompanies,
    error,
    isLoading,
  } = useGetCompaniesDashboardQuery({
    role: value?.role,
    queryParams: {
      page: allQueryParams.page,
    },
  });

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <Spinner spearerSize="large" />
      </div>
    );
  }

  if (error) {
    return <ErrorPage />;
  }

  if (!dataCompanies || !value) {
    return <p>There is no company data</p>;
  }

  const { meta, data: companies } = dataCompanies;

  return (
    <div>
      <Table className="bg-card mb-5">
        <TableCaption>
          {value.role === 'USER'
            ? 'A list of your current companies with Chart Bar'
            : 'A list of companies and their capital'}
        </TableCaption>
        <TableHeader>
          <TableRow className="p-4">
            <TableHead className="w-[100px]">Company id</TableHead>
            <TableHead className="text-center">Company name</TableHead>
            <TableHead className="text-center">
              {value.role !== 'USER' ? 'Company capital, $' : 'Prices, Chart'}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => {
            if ('capital' in company) {
              return (
                <TableRow key={company.id}>
                  <TableCell className="text-center">{company.id}</TableCell>
                  <TableCell className="text-center">
                    {company.companyName}
                  </TableCell>
                  <TableCell className="text-center">
                    {company.capital}
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow key={company.id}>
                <TableCell className="text-center">{company.id}</TableCell>
                <TableCell className="text-center">
                  {company.companyName}
                </TableCell>
                <TableCell>
                  <CompanyChart prices={company.prices} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {meta.lastPage > 1 && (
        <PaginationItems previousPage={meta.prev} nextPage={meta.next} />
      )}
    </div>
  );
};
