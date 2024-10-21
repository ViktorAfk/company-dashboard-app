import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout.tsx';
import { loader as companiesLoader } from './components/companies.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { CreateCompany } from './routes/CreateCompany.tsx';
import { ErrorPage } from './routes/ErrorPage.tsx';
import { Profile } from './routes/Profile.tsx';
import { ResetPassword } from './routes/ResetPassword.tsx';
import { AuthGuard } from './routes/auth/AuthGuard.tsx';
import { SignIn } from './routes/auth/SignIn.tsx';
import { SignUp } from './routes/auth/SignUp.tsx';
import { CompaniesList } from './routes/companies-list/CompaniesList.tsx';
import { CompanyDetails } from './routes/companies-list/company/CompanyDetails.tsx';
import { Dashboard } from './routes/dashboard/Dashboard.tsx';
import { Admins } from './routes/dashboard/admins/Admins.tsx';
import { Companies } from './routes/dashboard/companies/CompaniesDashbord.tsx';
import { Users } from './routes/dashboard/users/Users.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});
const router = createBrowserRouter([
  {
    element: <Layout />,
    path: '/',
    errorElement: <ErrorPage />,
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
            path: 'companies',
            element: <CompaniesList />,
            loader: companiesLoader(queryClient),
          },
          {
            path: 'companies/:companyId',
            element: <CompanyDetails />,
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
