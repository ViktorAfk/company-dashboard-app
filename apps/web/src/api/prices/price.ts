import axios from 'axios';
import { DataRepository } from '../repositories/axios-repository';
import { Price } from '../types';

const PRICE_URL = 'prices';
const { updateData, postData, removeData } = DataRepository;

export const addPrice = async (priceData: Omit<Price, 'id'>) => {
  try {
    const response = await postData<typeof priceData, Price>(
      PRICE_URL,
      priceData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to add price data: ${error}`);
  }
};

export const updatePrice = async (priceData: {
  id: number;
  companyId: number;
  data?: string;
  price?: number;
}) => {
  try {
    const response = await updateData<typeof priceData, Price>(
      `${PRICE_URL}/${priceData.id}`,
      priceData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to update price data: ${error}`);
  }
};

export const deletePrice = async (priceId: number) => {
  try {
    const response = await removeData<Price>(`prices/${priceId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage = `${error.response?.data?.error} ${error.response?.data?.message}`;
      console.error('Error from backend:', backendErrorMessage);
      throw new Error(backendErrorMessage);
    }

    throw new Error(`Failed to update price data: ${error}`);
  }
};
