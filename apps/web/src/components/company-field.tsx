import React from 'react';
type Props = {
  keyField: string;
  valueField: string;
};
export const CompanyField: React.FC<Props> = ({ keyField, valueField }) => {
  return (
    <div className="flex justify-between">
      <p>{keyField}</p>
      <p>{valueField}</p>
    </div>
  );
};
