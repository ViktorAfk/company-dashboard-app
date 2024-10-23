import { CompanyForm } from '@/components/form/company-form';
import React from 'react';

export const CreateCompany: React.FC = () => {
  return (
    <section className="bg-card rounded-xl p-5 h-full overflow-auto">
      <CompanyForm />
    </section>
  );
};
