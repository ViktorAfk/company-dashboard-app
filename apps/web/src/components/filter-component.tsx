import { SearchParamsType } from '@/types/query-types';
import { selectLimits, sortBySelectValues } from '@/utils/query-utils';
import { DebouncedState } from 'use-debounce';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SortBySelect } from './ui/sort-by-select';

type Props = {
  debouncedQuerySearch: DebouncedState<
    (
      event: React.ChangeEvent<HTMLInputElement>,
      key: keyof Pick<SearchParamsType, 'searchByName' | 'searchByService'>,
    ) => void
  >;
  searchByNameValue: string;
  searchByService: string;
  setSortValue: (value: string) => void;
  setLimitValue: (value: string) => void;
};

export const FilterComponent: React.FC<Props> = ({
  debouncedQuerySearch,
  setSortValue,
  setLimitValue,
}) => {
  return (
    <section className="flex justify-between mb-5 bg-card p-5 rounded-xl">
      <div className="flex gap-5">
        <div className="flex flex-col gap-4">
          <Label htmlFor="search-by-name">Search by name</Label>
          <Input
            id="search-by-name"
            onChange={(event) => debouncedQuerySearch(event, 'searchByName')}
            placeholder="Search by name..."
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="search-by-name">Search by service</Label>
          <Input
            placeholder="Search by service..."
            onChange={(event) => debouncedQuerySearch(event, 'searchByService')}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-4">
          <Label htmlFor="search-by-name">Select limit per page</Label>
          <SortBySelect
            placeholderValue="Set limit"
            setSortValue={setLimitValue}
            sortValues={selectLimits}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="search-by-name">Sort by value</Label>
          <SortBySelect
            setSortValue={setSortValue}
            placeholderValue="Set sort"
            sortValues={sortBySelectValues}
          />
        </div>
      </div>
    </section>
  );
};
