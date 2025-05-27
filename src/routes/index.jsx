import AuthLayout from '@/layouts/auth-layout';
import CommonLayout from '@/layouts/common-layout';
import DashboardLayout from '@/layouts/dashboard-layout';
import SignIn from '@/pages/auth/sign-in';
import Home from '@/pages/common/home';
import Dashboard from '@/pages/dashboard/dashboard';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
