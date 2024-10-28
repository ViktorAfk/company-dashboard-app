import { useUpdateUserPasswordQuery } from '@/api/user/users-query';
import { toast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { InputWithLabel } from './InputWithLabel';
import { PasswordSchema } from './validation/change-password-validation';

type PasswordFields = yup.InferType<typeof PasswordSchema>;

type Props = {
  userId: number;
};
export const ChangePasswordForm: React.FC<Props> = ({ userId, close }) => {
  const methods = useForm<PasswordFields>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(PasswordSchema),
  });

  const { mutateAsync: updateUserPassword, error: passwordError } =
    useUpdateUserPasswordQuery(userId);

  const onSubmit = async (data: PasswordFields) => {
    try {
      const newData = {
        currentPassword: data.oldPassword,
        newPassword: data.newPassword,
        id: userId,
      };
      await updateUserPassword(newData);
      toast({
        title: 'Password has been updated',
      });
      methods.reset();
    } catch (error) {
      console.error();
      toast({
        title: 'Creation failed',
        description: `${passwordError?.message}`,
      });
      throw new Error(`Failed to create company: ${error}`);
    }
  };
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-4">
          <InputWithLabel<PasswordFields>
            fieldName={'oldPassword'}
            labelName="Current password"
            placeHolder="Enter your current password"
            associatedElement="current-password"
            inputType="password"
          />
          <InputWithLabel<PasswordFields>
            fieldName={'newPassword'}
            labelName="New password"
            placeHolder="Enter your new password"
            associatedElement="new-password"
            inputType="password"
          />
          <InputWithLabel<PasswordFields>
            fieldName={'confirmNewPassword'}
            labelName="Confirm new password"
            placeHolder="Confirm your new password"
            associatedElement="confirm-new-password"
            inputType="password"
          />
        </div>
        <div>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Form>
  );
};
