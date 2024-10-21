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
  placeholderValue: string;
  setSortValue: (value: string) => void;
};
export const SortBySelect: React.FC<Props> = ({
  sortValues,
  setSortValue,
  placeholderValue,
}) => {
  return (
    <Select onValueChange={setSortValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholderValue} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="none">None</SelectItem>
        {sortValues.map(({ id, sortName, sortValue }) => (
          <SelectItem
            key={id}
            value={
              typeof sortValue === 'object'
                ? `${sortValue.sort}_${sortValue.order}`
                : sortValue
            }
          >
            {sortName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
