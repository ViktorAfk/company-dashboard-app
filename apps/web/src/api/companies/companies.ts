import axios from 'axios';
import api from '../http';
import { Company, CreateCompanyData, ResponseData } from '../types';

const COMPANIES_URL = 'companies';

export const getCompaniesList = async () => {
  try {
    const response = await api.get<ResponseData<Company[]>>(COMPANIES_URL);
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

export const addCompany = async (createData: CreateCompanyData) => {
  try {
    const response = await api.post<ResponseData<Company>>(
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

    throw new Error(`Failed to get login data: ${error}`);
  }
};

export const getCompany = async (companyId: number) => {
  try {
    const response = await api.get<Company>(`${COMPANIES_URL}/${companyId}`);
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

export const updateCompanyData = async (data: {
  companyId: number;
  dataForUpdate: Partial<Company>;
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

    throw new Error(`Failed to get login data: ${error}`);
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

    throw new Error(`Failed to get login data: ${error}`);
  }
};
