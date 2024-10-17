import { AuthResponseData } from '@/types/auth-type';
import axios, { AxiosResponse } from 'axios';
import { DataRepository } from '../repositories/axios-repository';
import { LoginParams, RegisterParams, RegisterResponse } from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_LOG_URL = 'auth/login';
const AUTH_REG_LOGIN = 'auth/signup';
const AUTH_LOGOUT = 'auth/logout';
const AUTH_REFRESH = 'auth/refresh';

const { post, get } = DataRepository;

export const getLoggedUser = async (loginParams: LoginParams) => {
  try {
    const response = await post<LoginParams, AuthResponseData>(
      AUTH_LOG_URL,
      loginParams,
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const registerUser = async (registerParams: RegisterParams) => {
  try {
    const response = await post<RegisterParams, RegisterResponse>(
      AUTH_REG_LOGIN,
      registerParams,
    );
    console.log(response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage =
        error.response?.data?.message || 'An unknown error occurred';
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const logout = async (): Promise<AxiosResponse<void>> => {
  try {
    return get(AUTH_LOGOUT);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage =
        error.response?.data?.message || 'An unknown error occurred';
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const refresh = async (
  refreshToken: Pick<AuthResponseData, 'refreshToken'>,
): Promise<
  AxiosResponse<Pick<AuthResponseData, 'accessToken' | 'refreshToken'>>
> => {
  try {
    const response = axios.get(`${BASE_URL}${AUTH_REFRESH}`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage =
        error.response?.data?.message || 'An unknown error occurred';
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};
