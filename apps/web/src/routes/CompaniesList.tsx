import { useCompaniesListQuery } from '@/api/companies/query-companies';
import React from 'react';

export const CompaniesList: React.FC = () => {
  const { data: companies } = useCompaniesListQuery();

  console.log(companies);

  return <div>I am Companies list</div>;
};
