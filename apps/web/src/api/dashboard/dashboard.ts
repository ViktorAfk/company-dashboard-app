import { Role, User } from '@/types/User';
import { SearchParamsType } from '@/types/query-types';
import axios from 'axios';
import { DataRepository } from '../repositories/axios-repository';
import {
  Admin,
  DashboardAdminData,
  DashboardUserData,
  ResponseData,
} from '../types';
const { getData, updateData, postData, removeData } = DataRepository;

const DASHBOARD_ADMINS = 'dashboard/admins';
const DASHBOARD_USERS = 'dashboard/users';
const DASHBOARD_COMPANIES = 'dashboard/companies';

export const getAllAdminsForDashboard = async (
  params: Pick<SearchParamsType, 'page'>,
) => {
  try {
    const response = await getData<ResponseData<Admin[]>>(
      DASHBOARD_ADMINS,
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

export const getAllCompaniesForDashboard = async (params: {
  role: Role | undefined;
  queryParams: Pick<SearchParamsType, 'page'>;
}) => {
  const { role, queryParams } = params;
  try {
    if (!params.role) {
      throw new Error('Role should be provided');
    }

    if (role === 'USER') {
      const response = await getData<ResponseData<DashboardUserData[]>>(
        DASHBOARD_COMPANIES,
        queryParams,
      );
      return response.data;
    }

    const response = await getData<ResponseData<DashboardAdminData[]>>(
      DASHBOARD_COMPANIES,
      queryParams,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get companies data: ${error}`);
  }
};
