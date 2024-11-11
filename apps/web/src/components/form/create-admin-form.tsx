import { useCreateAdminMutation } from '@/api/admins/admins-query';
import { CreateAdminType } from '@/api/types';
import { toast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { InputWithLabel } from './InputWithLabel';
import { signUpSchema } from './validation/validations';

const adminSchema = signUpSchema.clone().required();

type CreateAdminsFields = yup.InferType<typeof adminSchema>;

export const CreateAdminForm: React.FC = () => {
  const methods = useForm<CreateAdminsFields>({
    defaultValues: {
      email: '',
      password: '',
      surname: '',
      confirmPassword: '',
    },
    resolver: yupResolver(adminSchema),
  });

  const navigate = useNavigate();

  const {
    mutateAsync: addNewAdmin,
    isPending,
    error: adminError,
  } = useCreateAdminMutation();

  const onSubmit = async (formData: CreateAdminsFields) => {
    try {
      const adminData: CreateAdminType = {
        name: formData.name,
        surname: formData.surname,
        password: formData.password,
        email: formData.email,
        role: 'ADMIN',
      };

      await addNewAdmin(adminData);
      methods.reset();

      toast({
        title: 'The admin has created successfully',
      });
      navigate('/dashboard/admins');
    } catch (error) {
      console.error();
      toast({
        title: 'Failed to create admin',
        description: adminError?.message,
      });
      throw new Error(`Failed to register user: ${error}`);
    }
  };

  return (
    <Form {...methods}>
      <form className="w-full mb-3" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-4">
          <InputWithLabel<CreateAdminsFields>
            placeHolder="Enter admin's name"
            fieldName="name"
            labelName="Name"
            associatedElement="name"
            inputType="text"
          />
          <InputWithLabel<CreateAdminsFields>
            placeHolder="Enter your surname"
            fieldName="surname"
            labelName="Surname"
            associatedElement="surname"
            inputType="text"
          />
          <InputWithLabel<CreateAdminsFields>
            placeHolder="Enter your email"
            fieldName="email"
            labelName="Email"
            associatedElement="email"
            inputType="email"
          />
          <InputWithLabel<CreateAdminsFields>
            placeHolder="Enter your password"
            fieldName="password"
            labelName="Password"
            associatedElement="password"
            inputType="password"
          />
          <InputWithLabel<CreateAdminsFields>
            placeHolder="Confirm your password"
            fieldName="confirmPassword"
            labelName="Confirm password"
            associatedElement="confirm-password"
            inputType="password"
          />
        </div>
        <Button
          disabled={isPending}
          variant={'destructive'}
          type="submit"
          size={'lg'}
          className="w-80"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};
