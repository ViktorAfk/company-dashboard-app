import { Company } from '@/api/types';
import { parseDate } from '@/utils/parse-date';
import { TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import { CompanyField } from './company-field';
import { EditPopover } from './edit-popover';
import { CompanyForm } from './form/company-form';

import { PriceForm } from './form/prices-form';
import { PriceList } from './price-list';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Tabs } from './ui/tabs';
import { TypographyH3 } from './ui/typographyH3';
import { TypographyH2 } from './ui/typograpyH2';
type Props = {
  company: Company;
};
export const CompanyInfo: React.FC<Props> = ({ company }) => {
  const [isShownForm, setIsShownForm] = useState<boolean>(false);
  const {
    id,
    companyName,
    service,
    description,
    capital,
    createdDate,
    location,
    prices,
    userId,
  } = company;
  const preparedDate = parseDate(createdDate);

  const showForm = () => {
    setIsShownForm(true);
  };
  const closeForm = () => {
    setIsShownForm(false);
  };

  const toggle = () => {
    setIsShownForm((value) => !value);
  };

  return (
    <Tabs defaultValue="company" className="max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="company">Company info</TabsTrigger>
        <TabsTrigger value="prices">Prices</TabsTrigger>
      </TabsList>
      <TabsContent value="company">
        <Card>
          <CardHeader>
            <CardTitle>
              <TypographyH2>{companyName}</TypographyH2>
            </CardTitle>
            <CardDescription>Check information about company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <CompanyField keyField="service" valueField={service} />
              <CompanyField keyField="description" valueField={description} />
              <CompanyField
                keyField="capital"
                valueField={capital.toString()}
              />
              <CompanyField keyField="createdDate" valueField={preparedDate} />
            </div>
            <TypographyH3>Location</TypographyH3>
            <div className="flex flex-col gap-42">
              <CompanyField
                keyField="zip"
                valueField={location.zip.toString()}
              />
              <CompanyField keyField="country" valueField={location.country} />
              <CompanyField keyField="city" valueField={location.city} />
              <CompanyField keyField="streets" valueField={location.street} />
              <CompanyField
                keyField="city"
                valueField={location.building.toString()}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <EditPopover
              hasButtonTrigger={true}
              isOpen={isShownForm}
              setIsOpen={toggle}
              buttonText="Edit company info"
              editForm={
                <CompanyForm
                  company={{
                    id,
                    companyName,
                    service,
                    description,
                    capital,
                    createdDate: parseDate(createdDate),
                    location,
                    userId,
                  }}
                  closeForm={closeForm}
                />
              }
            />
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="prices">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              <TypographyH3>Prices</TypographyH3>
            </CardTitle>
            <CardDescription>
              Check and change prices information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {prices.length === 0 ? (
              <p>Oops, there are no Prices</p>
            ) : (
              <PriceList prices={prices} companyId={company.id} />
            )}
            <div>
              {isShownForm && (
                <PriceForm companyId={company.id} closeForm={closeForm} />
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={showForm}>Add price</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
