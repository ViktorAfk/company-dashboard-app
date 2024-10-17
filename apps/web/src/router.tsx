import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CompaniesList } from './routes/CompaniesList';
import { CreateCompany } from './routes/CreateCompany';
import { Profile } from './routes/Profile';
import { ResetPassword } from './routes/ResetPassword';
import { AuthGuard } from './routes/auth/AuthGuard';
import { SignIn } from './routes/auth/SignIn';
import { SignUp } from './routes/auth/SignUp';
import { Dashboard } from './routes/dashboard/Dashboard';
import { Admins } from './routes/dashboard/admins/Admins';
import { Companies } from './routes/dashboard/companies/Companies';
import { Users } from './routes/dashboard/users/Users';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    path: '/',
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
            children: [
              {
                path: 'users',
                element: <Users />,
              },
              {
                path: 'companies',
                element: <Companies />,
              },
              {
                path: 'admins',
                element: <Admins />,
              },
            ],
          },
          {
            path: 'companies-list',
            element: <CompaniesList />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
          {
            path: 'create-company',
            element: <CreateCompany />,
          },
        ],
      },
    ],
  },
  {
    path: 'sign-in',
    element: <SignIn />,
  },
  {
    path: 'sign-up',
    element: <SignUp />,
  },
]);
