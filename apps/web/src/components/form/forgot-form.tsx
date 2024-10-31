import { useForgotPasswordQuery } from '@/api/auth/auth-query';
import { toast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { InputWithLabel } from './InputWithLabel';
import { loginSchema } from './validation/validations';

const ForgotSchema = loginSchema.pick(['email']);
type ForgotFields = yup.InferType<typeof ForgotSchema>;
export const ForgotForm: React.FC = () => {
  const methods = useForm<ForgotFields>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(ForgotSchema),
  });

  const { mutateAsync: forgot, error: forgotError } = useForgotPasswordQuery();
  const onSubmit = async (data: ForgotFields) => {
    try {
      const response = await forgot(data);
      toast({
        title: 'Forgot password',
        description: `${response.message}`,
      });
    } catch (error) {
      console.error();
      toast({
        title: 'Sign in failed',
        description: forgotError?.message,
        variant: 'destructive',
      });
      throw new Error(`Failed to login user: ${JSON.stringify(error)}`);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5">
          <InputWithLabel<ForgotFields>
            fieldName="email"
            placeHolder="Enter your email"
            associatedElement="email"
            inputType="email"
            labelName="Email"
          />
        </div>
        <div className="flex justify-center">
          <Button
            disabled={methods.formState.isLoading}
            variant={'destructive'}
            type="submit"
            size={'lg'}
            className="w-80"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
