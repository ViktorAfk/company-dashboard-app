import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

type AuthData = {
  userName: string;
  access_token: string;
  role: string;
};
type AuthContextProps = {
  authData: AuthData | null;
  setAuthData: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  authData: null,
  setAuthData: () => {},
});
const dataForLoading = {
  access_token: 'sdfsdfsdf',
  userName: 'Viktor Shapareko',
  role: 'user',
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authData, setAuth] = useState<AuthData | null>(null);
  const setAuthData = useCallback(() => {
    setAuth(dataForLoading);
  }, []);

  const value = useMemo(
    () => ({ authData, setAuthData }),
    [authData, setAuthData],
  );
  useEffect(() => {
    setAuthData();
  }, [setAuthData]);
  console.log(authData);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
