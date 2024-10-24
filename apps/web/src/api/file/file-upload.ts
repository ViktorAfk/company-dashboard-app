import { File } from 'node:buffer';
import axios from 'axios';
import { DataRepository } from '../repositories/axios-repository';

const { postData } = DataRepository;
const UPLOAD_URL = 'avatars';
export const loadAvatar = async (param: File) => {
  try {
    const response = await postData<typeof param, string>(UPLOAD_URL, param);
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
