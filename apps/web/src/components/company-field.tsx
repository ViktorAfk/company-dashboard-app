import { clsx } from 'clsx';
import React from 'react';

type Props = {
  keyField: string;
  valueField: string;
};
export const CompanyField: React.FC<Props> = ({ keyField, valueField }) => {
  return (
    <div
      className={clsx('flex justify-between', {
        'flex-col': keyField === 'description',
      })}
    >
      <p className="uppercase text-lg text-primary">{keyField}</p>
      {keyField === 'price' ? (
        <p>{`${valueField}$`}</p>
      ) : (
        <p
          className={clsx('text-secondary-foreground', {
            'text-left': keyField === 'description',
          })}
        >
          {valueField}
        </p>
      )}
    </div>
  );
};
