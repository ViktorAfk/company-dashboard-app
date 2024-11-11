import { User } from '@/types/User';
import { SearchParamsType } from '@/types/query-types';
import axios from 'axios';
import { DataRepository } from '../repositories/axios-repository';
import { Admin, CreateAdminType, ResponseData } from '../types';

const USER_URL = 'users';
const ADMINS_URL = 'users/admins';
const DASHBOARD_USERS = 'dashboard/users';

const { getData, updateData, postData, removeData } = DataRepository;

export const getUser = async (userId: number | undefined) => {
  try {
    if (!userId) {
      throw new Error('Please add id');
    }
    const response = await getData<User>(`${USER_URL}/${userId}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const getAllUsersForDashboard = async (
  params: Pick<SearchParamsType, 'page'>,
) => {
  try {
    const response = await getData<ResponseData<User[]>>(
      DASHBOARD_USERS,
      params,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get admins data: ${error}`);
  }
};

export const updateUser = async (
  params: Pick<User, 'id' | 'email' | 'name' | 'surname'>,
) => {
  try {
    const { id, ...restData } = params;
    const response = await updateData<Omit<typeof params, 'id'>, User>(
      `${USER_URL}/${id}`,
      restData,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const updateAdminsData = async (
  params: Pick<User, 'email' | 'name' | 'surname' | 'id'>,
) => {
  try {
    const { id, ...restData } = params;
    const response = await updateData<Omit<typeof params, 'id'>, User>(
      `${ADMINS_URL}/${id}`,
      restData,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const updateUserPassword = async (params: {
  id: number;
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const { id, ...restParams } = params;
    const response = await updateData<Omit<typeof params, 'id'>, User>(
      `${USER_URL}/${id}/password`,
      restParams,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const updateUserAvatar = async (params: {
  file: File;
  id: number;
}) => {
  try {
    const { id, file } = params;
    const config = new FormData();
    config.append('file', file);

    const response = await postData<typeof config, User>(
      `${USER_URL}/${id}/attachment`,
      config,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const createAdmin = async (params: CreateAdminType) => {
  try {
    const response = await postData<CreateAdminType, Admin>(ADMINS_URL, params);
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

export const deleteAdminData = async (id: number) => {
  try {
    const response = await removeData<User>(`${ADMINS_URL}/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const deleteUserAvatar = async (id: number) => {
  try {
    const response = await removeData<User>(`${USER_URL}/${id}/attachment`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to delete company logo data: ${error}`);
  }
};
