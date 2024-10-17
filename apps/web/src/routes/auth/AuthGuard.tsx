import { useAuthContext } from '@/hooks/auth-context';
import React, { PropsWithChildren } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { authData } = useAuthContext();
  const location = useLocation();

  if (!authData) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};
