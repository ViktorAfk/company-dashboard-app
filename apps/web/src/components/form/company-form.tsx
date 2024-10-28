import {
  useCreateCompanyQuery,
  useUpdateCompanyQuery,
} from '@/api/companies/query-companies';
import { Company, UpdateCompanyData } from '@/api/types';
import { useGetUserQuery } from '@/api/user/users-query';
import { useAuthContext } from '@/hooks/auth-context';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { TypographyH3 } from '../ui/typographyH3';
import { InputWithLabel } from './InputWithLabel';
import { schema } from './validation/company-validations';

export type CreateCompanyFields = yup.InferType<typeof schema>;
type Props = {
  company?: Omit<Company, 'createdAt' | 'updatedAt' | 'prices' | 'avatar'>;
  closeForm?: () => void;
};
export const CompanyForm: React.FC<Props> = ({ company, closeForm }) => {
  const { mutateAsync: createCompany, error: createError } =
    useCreateCompanyQuery();
  const { mutateAsync: updateCompanyInfo } = useUpdateCompanyQuery();

  const navigate = useNavigate();
  const { authData } = useAuthContext();
  const { data: user } = useGetUserQuery(authData?.userId);

  const methods = useForm<CreateCompanyFields>({
    defaultValues: company || {
      companyName: '',
      service: '',
      description: '',
      capital: 0,
      createdDate: new Date().toISOString(),
      location: {
        zip: 0,
        country: '',
        city: '',
        street: '',
        building: 0,
      },
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: CreateCompanyFields) => {
    try {
      if (company && closeForm) {
        const { location, ...restCompanyData } = company;
        const { location: newLocation, ...restNewData } = data;
        console.log(restNewData.createdDate);
        const dataForUpdate: UpdateCompanyData = {
          ...restCompanyData,
          ...restNewData,
          createdDate: new Date(restNewData.createdDate).toISOString(),
          location: {
            ...location,
            ...newLocation,
            id: company.location.id,
          },
        };

        await updateCompanyInfo({ companyId: company.id, dataForUpdate });

        toast({
          title: `Company ${company.companyName} has been updated`,
        });

        closeForm();
        return;
      }
      if (!user) {
        throw new Error('There is no user data');
      }
      const companyData = {
        ...data,
        createdDate: new Date(data.createdDate).toISOString(),
        userId: user.id,
      };

      const response = await createCompany(companyData);
      toast({
        title: `Company ${response.companyName} has created`,
        description: 'Moving to the company page',
      });
      navigate(`/companies/${response.id}`);
    } catch (error) {
      console.error();
      toast({
        title: 'Creation failed',
        description: `${createError?.message}`,
      });
      throw new Error(`Failed to create company: ${error}`);
    }
  };
  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-96 md:max-w-full"
      >
        <div
          className={cn('flex flex-col gap-5 mb-5 md:flex-row md:mb-20', {
            '!flex-col': Boolean(company),
          })}
        >
          <div className="w-full">
            <div className="mb-5">
              <TypographyH3>Company information</TypographyH3>
            </div>
            <InputWithLabel<CreateCompanyFields>
              placeHolder="Enter company name"
              fieldName="companyName"
              labelName="Company name"
              associatedElement="companyName"
              inputType="text"
            />
            <InputWithLabel<CreateCompanyFields>
              placeHolder="Enter service information"
              fieldName="service"
              labelName="Service"
              associatedElement="service"
              inputType="text"
            />
            <InputWithLabel<CreateCompanyFields>
              placeHolder="Enter description"
              fieldName="description"
              labelName="Description"
              associatedElement="description"
              isTextArea={true}
            />
            <InputWithLabel<CreateCompanyFields>
              placeHolder="Enter company capital"
              fieldName="capital"
              labelName="Capital"
              associatedElement="capital"
              inputType="number"
            />
            <InputWithLabel<CreateCompanyFields>
              placeHolder="Enter date"
              fieldName="createdDate"
              labelName="Founded"
              associatedElement="created-date"
              inputType="date"
            />
          </div>

          <div className="w-full">
            <div className="mb-5">
              <TypographyH3>Location</TypographyH3>
            </div>
            <div>
              <InputWithLabel<CreateCompanyFields>
                placeHolder="Enter zip code"
                fieldName="location.zip"
                labelName="Zip"
                associatedElement="location-zip"
                inputType="number"
              />
              <InputWithLabel<CreateCompanyFields>
                placeHolder="Enter country"
                fieldName="location.country"
                labelName="Country"
                associatedElement="location-country"
                inputType="text"
              />
              <InputWithLabel<CreateCompanyFields>
                placeHolder="Enter city"
                fieldName="location.city"
                labelName="City"
                associatedElement="location-city"
                inputType="text"
              />
              <InputWithLabel<CreateCompanyFields>
                placeHolder="Enter street"
                fieldName="location.street"
                labelName="Street"
                associatedElement="location-street"
                inputType="text"
              />
              <InputWithLabel<CreateCompanyFields>
                placeHolder="Enter building number"
                fieldName="location.building"
                labelName="Building"
                associatedElement="location-building"
                inputType="number"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-5">
          <Button
            disabled={methods.formState.isLoading}
            size={'lg'}
            variant={'default'}
            type="submit"
          >
            Submit
          </Button>
          <Button
            disabled={methods.formState.isLoading}
            onClick={() => {
              if (closeForm) {
                closeForm();
                return;
              }
              navigate(-1);
            }}
            size={'lg'}
            variant={'secondary'}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
