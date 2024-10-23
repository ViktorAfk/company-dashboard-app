import { Company } from '@/api/types';
import { parseDate } from '@/utils/parse-date';
import React from 'react';
import { CompanyField } from './company-field';
type Props = {
  company: Company;
};
export const CompanyInfo: React.FC<Props> = ({ company }) => {
  const {
    companyName,
    service,
    description,
    capital,
    createdDate,
    location,
    prices,
  } = company;
  // const preparedDate = parseDate(createdDate.toDateString());
  // console.log(console.log(createdDate));
  return (
    <article className="max-w-md">
      <h2>{companyName}</h2>
      <div>
        <h3>General information</h3>

        <CompanyField keyField="service" valueField={service} />
        <CompanyField keyField="description" valueField={description} />
        <CompanyField keyField="capital" valueField={capital.toString()} />
        <CompanyField keyField="createdDate" valueField={'111'} />
      </div>
      <div>
        <h3>Location</h3>
        <CompanyField keyField="zip" valueField={location.zip.toString()} />
        <CompanyField keyField="country" valueField={location.country} />
        <CompanyField keyField="city" valueField={location.city} />
        <CompanyField keyField="streets" valueField={location.street} />
        <CompanyField
          keyField="city"
          valueField={location.building.toString()}
        />
      </div>
      <div>
        <h3>Prices</h3>
        {prices.length === 0 ? (
          <p>Oops, there are no Prices</p>
        ) : (
          prices.map(({ id, date, price }) => (
            <div key={id}>
              <CompanyField keyField="date" valueField={'11'} />
              <CompanyField keyField="price" valueField={price.toString()} />
            </div>
          ))
        )}
      </div>
    </article>
  );
};
