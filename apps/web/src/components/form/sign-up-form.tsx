import { useRegisterUserQuery } from '@/api/auth/auth-query';
import { RegisterParams } from '@/api/types';
import { toast } from '@/hooks/use-toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { InputWithLabel } from './InputWithLabel';
import { signUpSchema } from './validations';

type SignUpFormFields = yup.InferType<typeof signUpSchema>;

export const SignUpForm: React.FC = () => {
  const { mutateAsync, error: authError } = useRegisterUserQuery();

  const navigate = useNavigate();
  const methods = useForm<SignUpFormFields>({
    defaultValues: {
      email: '',
      password: '',
      surname: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (formData: SignUpFormFields) => {
    try {
      const registerData: RegisterParams = {
        name: formData.name,
        surname: formData.surname,
        password: formData.password,
        email: formData.email,
        role: 'USER',
      };

      await mutateAsync(registerData);
      methods.reset();
      navigate('/sign-in');
      toast({
        title: 'The user has created successfully',
      });
    } catch (error) {
      console.error();
      toast({
        title: 'Failed to create user',
        description: authError?.message,
      });
      throw new Error(`Failed to register user: ${error}`);
    }
  };

  return (
    <Form {...methods}>
      <form className="w-full mb-3" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-4">
          <InputWithLabel<SignUpFormFields>
            placeHolder="Enter your name"
            fieldName="name"
            labelName="Name"
            associatedElement="name"
            inputType="text"
          />
          <InputWithLabel<SignUpFormFields>
            placeHolder="Enter your surname"
            fieldName="surname"
            labelName="Surname"
            associatedElement="surname"
            inputType="text"
          />
          <InputWithLabel<SignUpFormFields>
            placeHolder="Enter your email"
            fieldName="email"
            labelName="Email"
            associatedElement="email"
            inputType="email"
          />
          <InputWithLabel<SignUpFormFields>
            placeHolder="Enter your password"
            fieldName="password"
            labelName="Password"
            associatedElement="password"
            inputType="password"
          />
          <InputWithLabel<SignUpFormFields>
            placeHolder="Confirm your password"
            fieldName="confirmPassword"
            labelName="Confirm password"
            associatedElement="confirm-password"
            inputType="password"
          />
        </div>
        <Button
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
