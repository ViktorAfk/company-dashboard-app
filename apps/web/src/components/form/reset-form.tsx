import { useResetPasswordQuery } from '@/api/auth/auth-query';
import { toast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { InputWithLabel } from './InputWithLabel';
import { PasswordSchema } from './validation/change-password-validation';

const ResetSchema = PasswordSchema.pick(['newPassword', 'confirmNewPassword']);
type ResetFields = yup.InferType<typeof ResetSchema>;

type Props = {
  resetToken: string | null;
};
export const ResetForm: React.FC<Props> = ({ resetToken }) => {
  const methods = useForm<ResetFields>({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(ResetSchema),
  });

  const { mutateAsync: resetPassword, error: resetError } =
    useResetPasswordQuery();
  const navigate = useNavigate();

  const onSubmit = async (data: ResetFields) => {
    try {
      if (!resetToken) {
        throw new Error('There is no token');
      }
      const reqData = {
        newPassword: data.newPassword,
        resetToken,
      };
      const response = await resetPassword(reqData);
      toast({
        title: 'Reset password succeeds',
        description: `${response.message}`,
      });
      methods.reset();
      navigate('/login');
    } catch (error) {
      console.error();
      toast({
        title: 'Reset password error',
        description: resetError?.message,
        variant: 'destructive',
      });
      throw new Error(`Failed to reset password: ${JSON.stringify(error)}`);
    }
  };
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5">
          <InputWithLabel<ResetFields>
            fieldName="newPassword"
            placeHolder="Enter your new password"
            associatedElement="new-password"
            inputType="password"
            labelName="New password"
          />
          <InputWithLabel<ResetFields>
            fieldName="confirmNewPassword"
            placeHolder="Confirm your new password"
            associatedElement="confirm-new-password"
            inputType="password"
            labelName="New password"
          />
        </div>
        <div className="flex justify-center">
          <Button
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
