import { useAuthContext } from '@/hooks/auth-context';
import React from 'react';

export const Dashboard: React.FC = () => {
  const { authData } = useAuthContext();
  console.log(authData);
  return (
    <section className="w-full min-h-dvh">
      <h1>hello</h1>
    </section>
  );
};
