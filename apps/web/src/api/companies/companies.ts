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

const UPLOAD_URL = 'attachment';
const COMPANIES_URL = 'companies';

const { getData, postData, removeData } = DataRepository;
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

export const loadCompanyLogo = async (params: {
  file: File;
  companyId: number;
}) => {
  try {
    const config = new FormData();
    config.append('file', params.file);
    const response = await postData<typeof config, Company>(
      `${COMPANIES_URL}/${params.companyId}/${UPLOAD_URL}`,
      config,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to load company logo data: ${error}`);
  }
};

export const deleteCompanyLogo = async (companyId: number) => {
  try {
    const response = await removeData<Company>(
      `${COMPANIES_URL}/${companyId}/${UPLOAD_URL}`,
    );
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
