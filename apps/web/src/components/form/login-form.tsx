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
import { loginSchema } from './validation/validations';

type LoginFormFields = yup.InferType<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { mutateAsync, error: authError } = useSignInUser();
  const { signInUser } = useAuthContext();
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

      setItem(ACCESS_TOKEN, response.data.accessToken);
      setItem(REFRESH_TOKEN, response.data.refreshToken);
      signInUser({
        fullName: response.data.fullName,
        userId: response.data.userId,
      });

      methods.reset();
      navigate('/');
    } catch (error) {
      console.error();
      toast({
        title: 'Sign in failed',
        description: authError?.message,
        variant: 'destructive',
      });
      throw new Error(`Failed to login user: ${JSON.stringify(error)}`);
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
            <Link className="hover:text-blue-500" to={'/sign-up'}>
              Sign Up
            </Link>
          </span>
        </p>
        <div>
          <Link className="hover:text-blue-500" to={'/forgot-password'}>
            Forgot password?
          </Link>
        </div>
      </div>
    </Form>
  );
};
