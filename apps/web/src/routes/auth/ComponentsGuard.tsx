import { useAuthContext } from '@/hooks/auth-context';
import { useCurrentUserContext } from '@/hooks/auth-user-context';
import { User } from '@/types/User';
import { PropsWithChildren } from 'react';

type Props = {
  allowedRoles: User['role'][];
};

export const ComponentsGuard: React.FC<PropsWithChildren<Props>> = ({
  allowedRoles,
  children,
}) => {
  const { authData } = useAuthContext();
  const user = useCurrentUserContext();

  if (authData && user && !allowedRoles.includes(user?.role)) {
    return null;
  }
  return children;
};
