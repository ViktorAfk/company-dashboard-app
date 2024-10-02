import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Layout } from './components/Layout';
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
        element: <App />,
        path: '/',
      },
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
    ],
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);
