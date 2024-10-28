import { FieldValues, Path, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

type Props<T extends FieldValues> = {
  labelName: string;
  fieldName: Path<T>;
  associatedElement: string;
  placeHolder: string;
  inputType?: React.HTMLInputTypeAttribute;
  isTextArea?: boolean;
};

export const InputWithLabel = <T extends FieldValues>({
  labelName,
  fieldName,
  associatedElement,
  placeHolder,
  inputType = 'text',
  isTextArea = false,
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
            {isTextArea ? (
              <Textarea
                className="max-w-screen-sm"
                placeholder={placeHolder}
                {...field}
              />
            ) : (
              <Input
                type={inputType}
                className="max-w-screen-sm"
                placeholder={placeHolder}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage className="w-80" />
        </FormItem>
      )}
    />
  );
};
