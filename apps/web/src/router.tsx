// import { QueryClient } from '@tanstack/react-query';
// import { Suspense } from 'react';
// import { createBrowserRouter } from 'react-router-dom';
// import { Layout } from './components/Layout';
// import { CreateCompany } from './routes/CreateCompany';
// import { ErrorPage } from './routes/ErrorPage';
// import { Profile } from './routes/Profile';
// import { ResetPassword } from './routes/ResetPassword';
// import { AuthGuard } from './routes/auth/AuthGuard';
// import { SignIn } from './routes/auth/SignIn';
// import { SignUp } from './routes/auth/SignUp';
// import { CompaniesList } from './routes/companies-list/CompaniesList';
// import { loader as companiesLoader } from './routes/companies-list/CompaniesList';
// import { Dashboard } from './routes/dashboard/Dashboard';
// import { Admins } from './routes/dashboard/admins/Admins';
// import { Companies } from './routes/dashboard/companies/CompaniesDashbord';
// import { Users } from './routes/dashboard/users/Users';

// const router = createBrowserRouter([
//   {
//     element: <Layout />,
//     path: '/',
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         element: <AuthGuard />,
//         children: [
//           {
//             path: 'dashboard',
//             element: <Dashboard />,
//             children: [
//               {
//                 path: 'users',
//                 element: <Users />,
//               },
//               {
//                 path: 'companies',
//                 element: <Companies />,
//               },
//               {
//                 path: 'admins',
//                 element: <Admins />,
//               },
//             ],
//           },
//           {
//             path: 'companies-list',
//             element: (
//               <Suspense fallback={<p>Loading...</p>}>
//                 <CompaniesList />
//               </Suspense>
//             ),
//           },
//           {
//             path: 'profile',
//             element: <Profile />,
//           },
//           {
//             path: 'reset-password',
//             element: <ResetPassword />,
//           },
//           {
//             path: 'create-company',
//             element: <CreateCompany />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: 'sign-in',
//     element: <SignIn />,
//   },
//   {
//     path: 'sign-up',
//     element: <SignUp />,
//   },
// ]);
