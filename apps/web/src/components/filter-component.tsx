import { selectLimits, sortBySelectValues } from '@/utils/query-utils';
import { Input } from './ui/input';
import { SortBySelect } from './ui/sort-by-select';

export const FilterComponent = () => {
  return (
    <section className="flex justify-between mb-5">
      <div className="flex gap-5">
        <Input placeholder="Search by name" />
        <Input placeholder="Search by service" />
      </div>
      <div className="flex gap-5">
        <SortBySelect sortValues={selectLimits} />
        <SortBySelect sortValues={sortBySelectValues} />
      </div>
    </section>
  );
};
