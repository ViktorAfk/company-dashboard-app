import { Company } from '@/api/types';
import React from 'react';
import { CompanyCard } from './company-card';
type Props = {
  companies: Company[];
};
export const Companies: React.FC<Props> = ({ companies }) => {
  return (
    <div className="container grid justify-items-center md:grid-cols-2 gap-4 md:justify-items-start xl:grid-cols-3">
      {companies.map((company) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </div>
  );
};
