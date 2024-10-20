import { useSignInUser } from '@/api/auth/auth-query';
import { useAuthContext } from '@/hooks/auth-context';
import { useLocalStorage } from '@/hooks/use-local-sotrage';
import { toast } from '@/hooks/use-toast';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { InputWithLabel } from './InputWithLabel';
import { loginSchema } from './validations';

type LoginFormFields = yup.InferType<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { signInUser } = useAuthContext();
  const { mutateAsync, error: authError } = useSignInUser();
  const { setItem } = useLocalStorage();
  const navigate = useNavigate();
  const methods = useForm<LoginFormFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (formData: LoginFormFields) => {
    try {
      const response = await mutateAsync(formData);
      console.log({
        refresh: response.data.refreshToken,
        access: response.data.accessToken,
      });
      setItem(ACCESS_TOKEN, response.data.accessToken);
      setItem(REFRESH_TOKEN, response.data.refreshToken);

      signInUser({
        fullName: response.data.fullName,
        email: response.data.email,
      });
      methods.reset();
      navigate('/');
    } catch (error) {
      console.error();
      toast({
        title: 'Sign in failed',
        description: authError?.message,
      });
      throw new Error(`Failed to login user: ${error}`);
    }
  };

  return (
    <Form {...methods}>
      <form className="w-full mb-3" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-4">
          <InputWithLabel<LoginFormFields>
            placeHolder="Email"
            fieldName="email"
            labelName="Email"
            associatedElement="email"
            inputType="email"
          />
          <InputWithLabel<LoginFormFields>
            placeHolder="Password"
            fieldName="password"
            labelName="Password"
            associatedElement="password"
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
      <div className="text-primary text-center">
        <p>
          Don’t have account?{' '}
          <span>
            <Link className="text-blue" to={'/sign-up'}>
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </Form>
  );
};
