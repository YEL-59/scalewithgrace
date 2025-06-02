import FAQSection from '@/components/common/home/faq-section';
import OurFeaturesSection from '@/components/common/home/our-features-section';
import PricingPlanSection from '@/components/common/home/pricing-plan-section';
import ShowcaseSection from '@/components/common/home/showcase-section';
import ComingSoon from '@/components/shared/CommingSoon/CommingSoon';
import AuthLayout from '@/layouts/auth-layout';
import CommonLayout from '@/layouts/common-layout';
import DashboardLayout from '@/layouts/dashboard-layout';
import RootLayout from '@/layouts/root-layout';
import Home from '@/pages/common/home';
import Dashboard from '@/pages/dashboard/dashboard';
import { createBrowserRouter } from 'react-router';
// import ForgotPassword from '@/pages/auth/ForgotPassword';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <CommonLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: '/aboutUs',
            element: <ShowcaseSection></ShowcaseSection>,
          },
          {
            path: '/features',
            element: <OurFeaturesSection></OurFeaturesSection>,
          },
          {
            path: '/pricing',
            element: <PricingPlanSection></PricingPlanSection>,
          },
          {
            path: '/contact',
            element: <FAQSection></FAQSection>,
          },
          {
            path: '/footer',
            element: <footer></footer>,
          },
          {
            path: '/comming',
            element: <ComingSoon></ComingSoon>,
          },
        ],
      },
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: 'sign-in',
            element: <ComingSoon />,
          },
          {
            path: '/sign-up',
            element: <ComingSoon />,
          },
          // {
          //   path: '/forgot-password',
          //   element: <ForgotPassword></ForgotPassword>
          // }
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
    ],
  },
]);
