import {
  companiesListQuery,
  useDeleteCompanyQuery,
} from '@/api/companies/query-companies';
import { toast } from '@/hooks/use-toast.ts';
import { useToggleState } from '@/hooks/use-toggle-state.tsx';
import { SearchParamsType } from '@/types/query-types';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { CompanyCard } from './company-card';
import { PaginationItems } from './pagination-items.tsx';
import { SubmitDialog } from './submit-dialog.tsx';
import { Spinner } from './ui/Spinner.tsx';

type Props = {
  allQueryParams: SearchParamsType;
};

export const Companies: React.FC<Props> = ({ allQueryParams }) => {
  const [companyId, setCompanyId] = useState<number | null>(null);

  const {
    data: companiesData,
    isLoading,
    isError,
  } = useQuery(companiesListQuery(allQueryParams));
  const [isActive, setActive, setInActive, toggle] = useToggleState();
  const { mutateAsync: deleteCompany, error: deleteError } =
    useDeleteCompanyQuery();

  const removeCompanyData = async () => {
    try {
      if (!companyId) {
        throw new Error('Company id is required');
      }
      await deleteCompany(companyId);
      toast({
        title: 'Company has been deleted successfully',
      });
      setCompanyId(null);
      setInActive();
    } catch (error) {
      console.error();
      toast({
        title: 'Process failed',
        description: `${deleteError?.message}`,
        variant: 'destructive',
      });
      throw new Error(`Failed to delete admin: ${error}`);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        <Spinner spearerSize="large" />
      </div>
    );
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
          <CompanyCard
            setCompanyId={setCompanyId}
            setActive={setActive}
            key={company.id}
            company={company}
          />
        ))}
      </div>
      {companies.length !== 0 && (
        <PaginationItems previousPage={meta.prev} nextPage={meta.next} />
      )}
      <SubmitDialog
        isActive={isActive}
        setIsActive={toggle}
        message="company"
        removeValue={removeCompanyData}
      />
    </section>
  );
};
