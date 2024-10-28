import { Company } from './User';

type SortValue = {
  sort: keyof Pick<Company, 'capital' | 'createdDate'>;
  order: 'asc' | 'desc';
};
export type SortType = {
  id: number;
  sortValue: string | SortValue;
  sortName: string;
};

export type SearchParamsType = {
  limit?: string;
  searchByName?: string;
  sort?: keyof Pick<Company, 'capital' | 'createdDate'> | null;
  order?: 'asc' | 'desc' | null;
  page?: string;
  searchByService?: string;
};
