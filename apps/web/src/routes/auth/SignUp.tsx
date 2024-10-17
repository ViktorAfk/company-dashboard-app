import { AuthContainer } from '@/components/auth-container';
import { SignUpForm } from '@/components/form/sign-up-form';
import React from 'react';

export const SignUp: React.FC = () => {
  return (
    <AuthContainer title="Sign up">
      <SignUpForm />
    </AuthContainer>
  );
};
