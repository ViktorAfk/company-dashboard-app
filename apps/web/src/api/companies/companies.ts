import { SearchParamsType } from '@/types/query-types';
import axios from 'axios';
import api from '../http';
import { DataRepository } from '../repositories/axios-repository';
import {
  Company,
  CreateCompanyData,
  ResponseData,
  UpdateCompanyData,
} from '../types';

const COMPANIES_URL = 'companies';
const { getData, postData } = DataRepository;
export const getCompaniesList = async (params?: SearchParamsType) => {
  try {
    const response = await api.get<ResponseData<Company[]>>(COMPANIES_URL, {
      params,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get company data: ${error}`);
  }
};

export const addCompany = async (createData: CreateCompanyData) => {
  try {
    const response = await postData<typeof createData, Company>(
      COMPANIES_URL,
      createData,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get company data: ${error}`);
  }
};

export const getCompany = async (companyId: number) => {
  try {
    const response = await getData<Company>(`${COMPANIES_URL}/${companyId}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get company data: ${error}`);
  }
};

export const updateCompanyData = async (data: {
  companyId: number;
  dataForUpdate: Partial<UpdateCompanyData>;
}) => {
  const { companyId, dataForUpdate } = data;
  try {
    const response = await api.patch<Company>(
      `${COMPANIES_URL}/${companyId}`,
      dataForUpdate,
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get company data: ${error}`);
  }
};

export const deleteCompany = async (companyId: number) => {
  try {
    const response = await api.delete<Company>(`${COMPANIES_URL}/${companyId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to get company data: ${error}`);
  }
};
