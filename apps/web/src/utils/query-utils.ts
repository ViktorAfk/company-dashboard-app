import { SortType } from '@/types/query-types';

export const sortBySelectValues: SortType[] = [
  { id: 1, sortValue: 'name', sortName: 'Name' },
  { id: 2, sortValue: 'createdDate', sortName: 'Created date' },
];

export const selectLimits: SortType[] = [
  { id: 1, sortValue: '4', sortName: '4' },
  { id: 2, sortValue: '6', sortName: '6' },
  { id: 3, sortValue: '8', sortName: '8' },
];
