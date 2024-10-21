import { SearchParamsType } from '@/types/query-types';
import { AxiosResponse } from 'axios';
import api from '../http';

export const DataRepository = {
  get: async <P>(
    url: string,
    params?: SearchParamsType,
  ): Promise<AxiosResponse<P>> => {
    return api.get(url, { params });
  },

  post: async <T, P>(url: string, data: T): Promise<AxiosResponse<P>> => {
    return api.post(url, data);
  },

  update: async <T, P>(url: string, data: T): Promise<AxiosResponse<P>> => {
    return api.patch(url, data);
  },

  remove: async <P>(url: string): Promise<AxiosResponse<P>> => {
    return api.delete(url);
  },
};
