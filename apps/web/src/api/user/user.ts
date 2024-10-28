import { User } from '@/types/User';
import axios from 'axios';
import { DataRepository } from '../repositories/axios-repository';
const USER_URL = 'users';

const { getData } = DataRepository;
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
