import { useUpdateAdminMutation } from '@/api/admins/admins-query';
import { useUpdateUserQuery } from '@/api/user/users-query';
import { toast } from '@/hooks/use-toast';
import { User } from '@/types/User';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { InputWithLabel } from './InputWithLabel';
import { ProfileSchema } from './validation/edit-user-validtation';

type Props = {
  user: Pick<User, 'id' | 'email' | 'name' | 'surname'>;
  close: () => void;
  isAdmin?: boolean;
};

type UserFIelds = yup.InferType<typeof ProfileSchema>;

export const EditUserForm: React.FC<Props> = ({
  user,
  close,
  isAdmin = false,
}) => {
  const methods = useForm<UserFIelds>({
    defaultValues: user || {
      name: '',
      email: '',
      surname: '',
    },
    resolver: yupResolver(ProfileSchema),
  });

  const { mutateAsync: updateUserData, error: userError } = useUpdateUserQuery(
    user.id,
  );
  const { mutateAsync: updateAdminsData } = useUpdateAdminMutation();

  const onSubmit = async (data: UserFIelds) => {
    try {
      if (isAdmin) {
        await updateAdminsData({ ...data, id: user.id });
        toast({
          title: "Admin's information has been updated",
        });
        close();
        return;
      }
      await updateUserData({ ...data, id: user.id });
      toast({
        title: "User's information has been updated",
      });
      close();
    } catch (error) {
      console.error();
      toast({
        title: 'Action failed',
        description: `${userError?.message}`,
      });
      throw new Error(`Failed to create company: ${error}`);
    }
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5">
          <InputWithLabel<UserFIelds>
            associatedElement="name"
            fieldName="name"
            labelName="Name"
            placeHolder="Enter your name"
            inputType="text"
          />
          <InputWithLabel<UserFIelds>
            fieldName={'surname'}
            labelName="Surname"
            placeHolder="Enter your surname"
            associatedElement="surname"
            inputType="text"
          />
          <InputWithLabel<UserFIelds>
            fieldName={'email'}
            labelName="email"
            placeHolder="Enter your email"
            associatedElement="email"
            inputType="email"
          />
        </div>
        <div className="flex gap-4">
          <Button type="submit">Save changes</Button>
          <Button variant={'destructive'} type="reset" onClick={close}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
