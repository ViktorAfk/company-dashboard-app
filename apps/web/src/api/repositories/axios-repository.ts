import { SearchParamsType } from '@/types/query-types';
import { AxiosResponse } from 'axios';
import api from '../http';

export const DataRepository = {
  getData: async <P>(
    url: string,
    params?: SearchParamsType,
  ): Promise<AxiosResponse<P>> => {
    return api.get(url, { params });
  },

  postData: async <T, P>(url: string, data: T): Promise<AxiosResponse<P>> => {
    return api.post(url, data);
  },

  updateData: async <T, P>(url: string, data: T): Promise<AxiosResponse<P>> => {
    return api.patch(url, data);
  },

  removeData: async <P>(url: string): Promise<AxiosResponse<P>> => {
    return api.delete(url);
  },
};
