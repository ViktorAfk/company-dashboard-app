import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import { InputWithLabel } from './InputWithLabel';
import { CreateCompanyFields } from './company-form';

export const PriceForm: React.FC = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: 'prices',
    control,
  });

  const pricesWithId = fields.map((price) => {
    if (!price.hasOwnProperty('id')) {
      return {
        ...price,
        id: crypto.randomUUID(),
      };
    }
    return price;
  });

  return (
    <div>
      <h3>Prices</h3>
      <div>
        {pricesWithId.map((price, index) => (
          <div key={price.id}>
            <InputWithLabel<CreateCompanyFields>
              placeHolder="Enter a date"
              fieldName={`prices.${index}.date`}
              labelName="Date"
              inputType="date"
              associatedElement="price-date"
            />
            <InputWithLabel<CreateCompanyFields>
              placeHolder="Enter a price"
              fieldName={`prices.${index}.price`}
              labelName="Price"
              inputType="number"
              associatedElement="price-date"
            />
            {index >= 0 && (
              <Button
                onClick={() => {
                  remove(index);
                }}
              >
                Add price
              </Button>
            )}
          </div>
        ))}
        <Button
          onClick={() => {
            append({
              date: '',
              price: 0,
            });
          }}
        >
          Add price
        </Button>
      </div>
    </div>
  );
};
