import { AuthContainer } from '@/components/auth-container';
import { LoginForm } from '@/components/form/login-form';
import React from 'react';

export const SignIn: React.FC = () => {
  return (
    <AuthContainer title="Sign in">
      <LoginForm />
    </AuthContainer>
  );
};
