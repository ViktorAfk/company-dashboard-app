import { useCreateCompanyQuery } from '@/api/companies/query-companies';
import { Company } from '@/api/types';
import { useAuthContext } from '@/hooks/auth-context';
import { toast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import { useGetUserQuery } from '@/api/user/users-query';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { InputWithLabel } from './InputWithLabel';
import { schema } from './company-validations';

export type CreateCompanyFields = yup.InferType<typeof schema>;
type Props = {
  company?: Omit<Company, 'createdAt' | 'updatedAt'>;
};
export const CompanyForm: React.FC<Props> = ({ company }) => {
  const { mutateAsync: createCompany, error: createError } =
    useCreateCompanyQuery();
  const navigate = useNavigate();
  const { authData } = useAuthContext();
  const { data: user } = useGetUserQuery(authData?.userId);
  const methods = useForm<CreateCompanyFields>({
    defaultValues: company || {
      companyName: '',
      service: '',
      description: '',
      capital: 0,
      createdDate: new Date(),
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
      if (!user) {
        throw new Error('There is no user data');
      }

      const companyData = {
        ...data,
        userId: user.id,
      };

      const response = await createCompany(companyData);
      toast({
        title: `Company ${response.data.companyName} has created`,
        description: 'Moving to the company page',
      });
      navigate(`/companies/${response.data.id}`);
    } catch (error) {
      console.error();
      toast({
        title: 'Creation failed',
        description: `${createError?.message}`,
      });
      throw new Error(`Failed to login user: ${error}`);
    }
  };
  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-96 md:max-w-full"
      >
        <div className="flex flex-col gap-5 mb-5 md:flex-row md:mb-20">
          <div className="w-full">
            <h3 className="mb-5">Company information</h3>
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
            <h3 className="mb-5">Location</h3>
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
          <Button size={'lg'} variant={'default'} type="submit">
            Submit
          </Button>
          <Button
            onClick={() => navigate(-1)}
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
