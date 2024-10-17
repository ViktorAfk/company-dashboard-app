import { FieldValues, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type Props<T extends FieldValues> = {
  labelName: string;
  fieldName: keyof T & string;
  associatedElement: string;
  placeHolder: string;
  inputType: React.HTMLInputTypeAttribute;
};

export const InputWithLabel = <T extends FieldValues>({
  labelName,
  fieldName,
  associatedElement,
  placeHolder,
  inputType,
}: Props<T>) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={associatedElement}>{labelName}</FormLabel>
          <FormControl>
            <Input
              type={inputType}
              className="max-w-screen-sm"
              placeholder={placeHolder}
              {...field}
            />
          </FormControl>
          <FormMessage className="w-80" />
        </FormItem>
      )}
    />
  );
};
