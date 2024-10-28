import {
  useCreatePriceQuery,
  useUpdatePriceQuery,
} from '@/api/prices/prices-query';
import { Price } from '@/api/types';
import { toast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { InputWithLabel } from './InputWithLabel';
import { PriceSchema } from './validation/price-validation';

type PriceFormFields = yup.InferType<typeof PriceSchema>;
type Props = {
  price?: Price;
  companyId: number;
  closeForm: () => void;
};
export const PriceForm: React.FC<Props> = ({ price, companyId, closeForm }) => {
  const { mutateAsync: createPrice, error: createError } =
    useCreatePriceQuery();
  const { mutateAsync: updatePrice } = useUpdatePriceQuery();

  const methods = useForm<PriceFormFields>({
    defaultValues: price || {
      date: new Date().toISOString(),
      price: 0,
    },
    resolver: yupResolver(PriceSchema),
  });

  const onSubmit = async (data: PriceFormFields) => {
    try {
      if (price && closeForm) {
        const updatedPrice = {
          ...data,
          id: price.id,
          companyId: price.companyId,
        };
        await updatePrice(updatedPrice);
        toast({
          title: 'Price has been updated',
          description: `Price with id:${price.id} has updated`,
        });
        closeForm();
        return;
      }

      await createPrice({ ...data, companyId });
      toast({
        title: 'Price has been created',
      });
      closeForm();
    } catch (error) {
      console.error();
      toast({
        title: 'Creation/update failed',
        description: `${createError?.message}`,
      });
      throw new Error(`Failed to create company: ${error}`);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <InputWithLabel<PriceFormFields>
            placeHolder="Enter a date"
            fieldName={'date'}
            labelName="Date"
            inputType="date"
            associatedElement="price-date"
          />
          <InputWithLabel<PriceFormFields>
            placeHolder="Enter a price"
            fieldName={'price'}
            labelName="Price"
            inputType="number"
            associatedElement="price-date"
          />
        </div>
        <div className="flex justify-center gap-8">
          <Button disabled={methods.formState.isLoading} type="submit">
            Submit
          </Button>
          <Button
            disabled={methods.formState.isLoading}
            variant={'secondary'}
            type="button"
            onClick={closeForm}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
