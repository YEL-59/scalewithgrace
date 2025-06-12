import FAQSection from '@/components/common/home/faq-section';
import OurFeaturesSection from '@/components/common/home/our-features-section';
import PricingPlanSection from '@/components/common/home/pricing-plan-section';
import ShowcaseSection from '@/components/common/home/showcase-section';
import ComingSoon from '@/components/shared/CommingSoon/CommingSoon';
import AuthLayout from '@/layouts/auth-layout';
import CommonLayout from '@/layouts/common-layout';
import DashboardLayout from '@/layouts/dashboard-layout';
import RootLayout from '@/layouts/root-layout';
import CheckMail from '@/pages/auth/CheckMail';
import Confirmation from '@/pages/auth/Confirmation';
import ConfirmPassword from '@/pages/auth/ConfirmPassword';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import OtpVarification from '@/pages/auth/OtpVarification';
import SignIn from '@/pages/auth/sign-in';
import SignUp from '@/pages/auth/SignUp';
import Home from '@/pages/common/home';
import CoachingCallBooking from '@/pages/dashboard/coaching-call-booking';
import Dashboard from '@/pages/dashboard/dashboard';
import { createBrowserRouter } from 'react-router';

// List of routes that are considered ready for production deployment.
// These paths correspond to pages that are presentable for client feedback.
// Used to control which pages are exposed in the production environment.
export const PRODUCTION_READY_PATHS = [
  '/',
  '/coming',
  '/aboutUs',
  '/features',
  '/pricing',
  '/contact',
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/check-mail',
  '/otp',
  '/confirm-password',
  '/confirmation',
];

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
            path: '/coming',
            element: <ComingSoon></ComingSoon>,
          },
        ],
      },
      {
        path: '/',
        element: <AuthLayout />,
        children: [
          {
            path: '/sign-in',
            element: <SignIn />,
          },
          {
            path: '/sign-up',
            element: <SignUp />,
          },
          {
            path: '/forgot-password',
            element: <ForgotPassword></ForgotPassword>,
          },
          {
            path: '/check-mail',
            element: <CheckMail></CheckMail>,
          },
          {
            path: '/otp',
            element: <OtpVarification></OtpVarification>,
          },
          {
            path: '/confirm-password',
            element: <ConfirmPassword></ConfirmPassword>,
          },
          {
            path: '/confirmation',
            element: <Confirmation></Confirmation>,
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
          {
            path: 'coaching',
            element: <CoachingCallBooking></CoachingCallBooking>
          }
        ],
      },
    ],
  },
]);
