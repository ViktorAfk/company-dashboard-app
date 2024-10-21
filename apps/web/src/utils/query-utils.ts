import { SortType } from '@/types/query-types';

export const sortBySelectValues: SortType[] = [
  {
    id: 1,
    sortValue: { sort: 'capital', order: 'asc' },
    sortName: 'Capital up',
  },
  {
    id: 2,
    sortValue: { sort: 'capital', order: 'desc' },
    sortName: 'Capital down',
  },
  {
    id: 3,
    sortValue: { sort: 'createdDate', order: 'asc' },
    sortName: 'Created date up',
  },
  {
    id: 4,
    sortValue: { sort: 'createdDate', order: 'desc' },
    sortName: 'Created date down',
  },
];

export const selectLimits: SortType[] = [
  { id: 1, sortValue: '4', sortName: '4' },
  { id: 2, sortValue: '6', sortName: '6' },
  { id: 3, sortValue: '8', sortName: '8' },
];
