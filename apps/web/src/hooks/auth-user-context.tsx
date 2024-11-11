import { CurrentUserContext } from '@/context/AuthUser';
import { useContext } from 'react';

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};
