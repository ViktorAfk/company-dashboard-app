import { AuthResponseData } from '@/types/auth-type';
import axios, { AxiosResponse } from 'axios';
import { DataRepository } from '../repositories/axios-repository';
import {
  ForgotResponse,
  LoginParams,
  RegisterParams,
  RegisterResponse,
} from '../types';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_LOG_URL = 'auth/login';
const AUTH_REG_LOGIN = 'auth/signup';
const AUTH_LOGOUT = 'auth/logout';
const AUTH_REFRESH = 'auth/refresh';
const AUTH_FORGOT = 'auth/forgot-password';
const AUTH_RESET = 'auth/reset-password';

const { postData, getData } = DataRepository;

export const getLoggedUser = async (loginParams: LoginParams) => {
  try {
    const response = await axios.post<AuthResponseData>(
      `${BASE_URL}${AUTH_LOG_URL}`,
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
    const response = await postData<RegisterParams, RegisterResponse>(
      AUTH_REG_LOGIN,
      registerParams,
    );
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
    return getData(AUTH_LOGOUT);
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
  refreshToken: string,
): Promise<
  AxiosResponse<Pick<AuthResponseData, 'accessToken' | 'refreshToken'>>
> => {
  try {
    const response = axios.get(`${BASE_URL}${AUTH_REFRESH}`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        'Content-Type': 'application/json',
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

export const forgotPassword = async (params: { email: string }) => {
  try {
    console.log(params);
    const response = await postData<typeof params, ForgotResponse>(
      AUTH_FORGOT,
      params,
    );

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

export const resetPassword = async (params: {
  newPassword: string;
  resetToken: string;
}) => {
  try {
    const response = await postData<typeof params, ForgotResponse>(
      AUTH_RESET,
      params,
    );

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
