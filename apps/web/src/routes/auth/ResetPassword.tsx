import { AuthContainer } from '@/components/auth-container';
import { ResetForm } from '@/components/form/reset-form';
import React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get('token');

  return (
    <AuthContainer title="Reset your password">
      <ResetForm resetToken={resetToken} />
    </AuthContainer>
  );
};

export default ResetPassword;
