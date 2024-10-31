import { AuthContainer } from '@/components/auth-container';
import { ForgotForm } from '@/components/form/forgot-form';
import React from 'react';

export const ForgotPassword: React.FC = () => {
  return (
    <AuthContainer title="Forgot your password">
      <ForgotForm />
    </AuthContainer>
  );
};
