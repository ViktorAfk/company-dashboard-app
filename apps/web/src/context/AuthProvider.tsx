import api from '@/api/http';
import { AuthResponseData } from '@/types/auth-type';

import { refresh } from '@/api/auth/auth';
import { useLocalStorage } from '@/hooks/use-local-sotrage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants';
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

type AuthUserData = Pick<AuthResponseData, 'email' | 'fullName'>;
type AuthContextProps = {
  authData: AuthUserData | null | undefined;
  signInUser: (logData: AuthUserData) => void;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  authData: null,
  signInUser: () => {},
  logoutUser: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authData, setAuth] = useState<AuthUserData | null | undefined>();
  const signInUser = useCallback((logData: AuthUserData) => {
    setAuth(logData);
  }, []);

  const { getItem, setItem } = useLocalStorage();

  const logoutUser = useCallback(() => {
    setAuth(null);
  }, []);

  const value = useMemo(
    () => ({ authData, signInUser, logoutUser }),
    [authData, signInUser, logoutUser],
  );

  useLayoutEffect(() => {
    const access_token = getItem(ACCESS_TOKEN);
    const authInterceptor = api.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        config.headers.Authorization =
          !config._retry && access_token
            ? `Bearer ${access_token}`
            : config.headers.Authorization;

        return config;
      },
    );

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [getItem]);

  useLayoutEffect(() => {
    const refresh_token = getItem(REFRESH_TOKEN);
    console.log(refresh_token);
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && refresh_token) {
          try {
            console.log('I am alive');
            const response = await refresh(refresh_token);

            setItem(REFRESH_TOKEN, response.data.refreshToken);
            setItem(ACCESS_TOKEN, response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setAuth(null);
            console.log('waisted');
          }
          return Promise.reject(error);
        }
      },
    );
    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [getItem, setItem]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
