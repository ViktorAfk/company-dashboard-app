import api from '@/api/http';
import { useLocalStorage } from '@/hooks/use-local-sotrage';
import { AuthResponseData } from '@/types/auth-type';

import { refresh } from '@/api/auth/auth';
import { InternalAxiosRequestConfig } from 'axios';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
type AuthContextProps = {
  authData: AuthResponseData | null | undefined;
  signInUser: (logData: AuthResponseData) => void;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  authData: null,
  signInUser: () => {},
  logoutUser: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authData, setAuth] = useState<AuthResponseData | null | undefined>();
  const signInUser = useCallback((logData: AuthResponseData) => {
    setAuth(logData);
  }, []);

  const logoutUser = useCallback(() => {
    setAuth(null);
  }, []);

  const value = useMemo(
    () => ({ authData, signInUser, logoutUser }),
    [authData, signInUser, logoutUser],
  );

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        config.headers.Authorization =
          !config._retry && authData?.accessToken
            ? `Bearer ${authData.accessToken}`
            : config.headers.Authorization;

        return config;
      },
    );

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [authData?.accessToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 403 && authData?.refreshToken) {
          try {
            const response = await refresh({
              refreshToken: authData.refreshToken,
            });
            setAuth({
              ...authData,
              accessToken: response.data.accessToken,
              refreshToken: response.data.refreshToken,
            });

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setAuth(null);
          }
          return Promise.reject(error);
        }
      },
    );
    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
