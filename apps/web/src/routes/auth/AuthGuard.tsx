import { useAuthContext } from '@/hooks/auth-context';
import React, { PropsWithChildren, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { authData } = useAuthContext();
  const navigate = useNavigate();

  if (!authData) {
    navigate('/sign-in', { replace: true });
  }

  return <>{children}</>;
};
