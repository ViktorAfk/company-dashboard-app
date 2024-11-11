import { useGetUserQuery } from '@/api/user/users-query';
import { useAuthContext } from '@/hooks/auth-context';
import { toast } from '@/hooks/use-toast';
import { User } from '@/types/User';
import React, { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  allowedRoles: User['role'][];
};
export const RoleGuard: React.FC<PropsWithChildren<Props>> = ({
  children,
  allowedRoles,
}) => {
  const { authData } = useAuthContext();
  const { data: user } = useGetUserQuery(authData?.userId);
  const location = useLocation();

  if (authData && user && !allowedRoles.includes(user?.role)) {
    toast({
      title: 'Permission denied',
      description: `${user.role} doesn't have permission to this route`,
      variant: 'destructive',
    });
    return (
      <Navigate to="/dashboard/companies" state={{ from: location }} replace />
    );
  }
  return children;
};
