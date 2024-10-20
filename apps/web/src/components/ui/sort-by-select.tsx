import { SortType } from '@/types/query-types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

type Props = {
  sortValues: SortType[];
};
export const SortBySelect: React.FC<Props> = ({ sortValues }) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortValues.map(({ id, sortName, sortValue }) => (
          <SelectItem key={id} value={sortValue}>
            {sortName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
