import { AuthContext } from '@/context/AuthProvider';
import { useContext } from 'react';

export const useAuthContext = () => useContext(AuthContext);
