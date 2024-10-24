import { useDeletePriceQuery } from '@/api/prices/prices-query';
import { Price } from '@/api/types';
import { toast } from '@/hooks/use-toast';
import { useToggleState } from '@/hooks/use-toggle-state';
import { parseDate } from '@/utils/parse-date';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { CompanyField } from './company-field';
import { EditPopover } from './edit-popover';
import { PriceForm } from './form/prices-form';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
type Props = {
  prices: Price[];
  companyId: number;
};
export const PriceList: React.FC<Props> = ({ prices, companyId }) => {
  const { mutateAsync: deletePrice, error: deleteError } =
    useDeletePriceQuery();
  const [isShown, setIsShownForm, setIsNotShownForm, toggle] = useToggleState();
  const [currentPrice, setCurrentPrice] = useState<Price | null>(null);

  const removePrice = async (priceId: number) => {
    try {
      await deletePrice(priceId);
      toast({
        title: `Price with id:${priceId} has been deleted`,
      });
    } catch (error) {
      console.error();
      toast({
        title: 'Deleted failed',
        description: `${deleteError?.message}`,
      });
      throw new Error(`Failed to delete price: ${error}`);
    }
  };
  return (
    <div>
      <div className="flex flex-col gap-4 h-96 overflow-y-auto">
        {prices.map(({ id, date, price }) => (
          <Card className="relative p-8" key={id}>
            <CompanyField keyField="date" valueField={parseDate(date)} />
            <CompanyField keyField="price" valueField={price.toString()} />
            <Separator className="mb-5" />
            <div className="flex gap-1  top-2 right-2">
              <Button
                onClick={() => {
                  setCurrentPrice({
                    id,
                    date: parseDate(date),
                    price,
                    companyId,
                  });
                  setIsShownForm();
                }}
              >
                <Pencil2Icon />
                Edit
              </Button>
              <Button
                onClick={() => {
                  removePrice(id);
                }}
                variant={'secondary'}
              >
                <TrashIcon />
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <EditPopover
        isOpen={isShown}
        setIsOpen={toggle}
        buttonText="Edit company info"
        editForm={
          currentPrice ? (
            <PriceForm
              companyId={companyId}
              price={{ ...currentPrice, date: parseDate(currentPrice.date) }}
              closeForm={setIsNotShownForm}
            />
          ) : null
        }
      />
    </div>
  );
};
