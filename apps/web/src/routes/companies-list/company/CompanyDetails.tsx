import { useGetCompanyQuery } from '@/api/companies/query-companies';
import { CompanyInfo } from '@/components/company-info';
import React from 'react';
import { useParams } from 'react-router-dom';

export const CompanyDetails: React.FC = () => {
  const { companyId } = useParams<{ userId: string }>() as {
    companyId: string;
  };
  const {
    data: company,
    isError,
    isLoading,
  } = useGetCompanyQuery(Number(companyId));

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Oops, something went wrong</p>;
  }
  if (!company) {
    return <p>Company not found</p>;
  }
  return (
    <section>
      <CompanyInfo company={company} />
    </section>
  );
};
