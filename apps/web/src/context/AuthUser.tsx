import { Spinner } from '@/components/ui/Spinner';
import { useGetCurrentUser } from '@/hooks/use-current-user';
import { User } from '@/types/User';
import { createContext } from 'react';

export const CurrentUserContext = createContext<User | null>(null);

export const CurrentUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentUserQuery = useGetCurrentUser();

  if (currentUserQuery.isPending) {
    return <Spinner />;
  }

  if (currentUserQuery.isError) {
    return <p>Oops something went wrong</p>;
  }

  return (
    <CurrentUserContext.Provider value={currentUserQuery.data}>
      {children}
    </CurrentUserContext.Provider>
  );
};
