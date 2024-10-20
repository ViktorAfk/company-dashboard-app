import { useCompaniesListQuery } from '@/api/companies/query-companies';
import React from 'react';

export const CompaniesContainer: React.FC = ({ companies }) => {
  const { data: companies } = useCompaniesListQuery();
  return <section></section>;
};
