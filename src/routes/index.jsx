import FAQSection from "@/components/common/home/faq-section";
import OurFeaturesSection from "@/components/common/home/our-features-section";
import PricingPlanSection from "@/components/common/home/pricing-plan-section";
import ShowcaseSection from "@/components/common/home/showcase-section";
import ComingSoon from "@/components/shared/CommingSoon/CommingSoon";
import AuthLayout from "@/layouts/auth-layout";
import CommonLayout from "@/layouts/common-layout";
import DashboardLayout from "@/layouts/dashboard-layout";
import RootLayout from "@/layouts/root-layout";
import CheckMail from "@/pages/auth/CheckMail";
import Confirmation from "@/pages/auth/Confirmation";
import ConfirmPassword from "@/pages/auth/ConfirmPassword";
import ForgetPasswordOtpVerification from "@/pages/auth/ForgetPaswordOtpVarification";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import OtpVerification from "@/pages/auth/OtpVarification";
import OtpVarification from "@/pages/auth/OtpVarification";
import SignIn from "@/pages/auth/sign-in";
import SignUp from "@/pages/auth/sign-up";
import Home from "@/pages/common/home";
import Billing from "@/pages/dashboard/billing";
import CoachingCallBooking from "@/pages/dashboard/coaching-call-booking";
import CoverLetterGenerator from "@/pages/dashboard/coverletter";
import CareerGoal from "@/pages/dashboard/creergoal";
import CareerRoadmap from "@/pages/dashboard/creergoal/careerroadmap";
import MyDashboard from "@/pages/dashboard/dashboard";
import Dashboard from "@/pages/dashboard/dashboard";
import ResumeBuilder from "@/pages/dashboard/rusumebuilder";
import CVPreview from "@/pages/dashboard/rusumebuilder/cvpreview";
import CVTemplateGallery from "@/pages/dashboard/rusumebuilder/step/cvtemplategallery";
import ResumeBuilderStepper from "@/pages/dashboard/rusumebuilder/stepper";
import WeeklyTask from "@/pages/dashboard/weeklytask";
import TaskDetail from "@/pages/dashboard/weeklytask/taskdetails";
import WeeklyTaskList from "@/pages/dashboard/weeklytask/taskdetails";
import TaskManager from "@/pages/dashboard/weeklytask/taskmanager";
import TaskManagerRedirect from "@/pages/dashboard/weeklytask/TaskManagerRedirect";
import AboutUs from "@/pages/main/aboutus";
import Features from "@/pages/main/features";
import Pricing from "@/pages/main/pricing";
import { createBrowserRouter } from "react-router";

// List of routes that are considered ready for production deployment.
// These paths correspond to pages that are presentable for client feedback.
// Used to control which pages are exposed in the production environment.
export const PRODUCTION_READY_PATHS = [
  "/",
  "/coming",
  "/about-Us",
  "/all-features",
  "/pricing",
  "/contact",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/check-mail",
  "/otp",
  "/confirm-password",
  "/confirmation",
  "dashboard",
  "/dashboard/coaching",
  "/dashboard/billing",
  "/dashboard/cover-letter",
  "/dashboard/career-goal",
  "/dashboard/career-road-map",
  "/dashboard/resume-builder",
  "/dashboard/weekly-task",
  "/dashboard/task-manager",
  "/dashboard/task/:id",
  "/dashboard/resumeBuild-step",
  "/dashboard/cv-preview/:templateSlug",
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <CommonLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/about-Us",
            element: <AboutUs />,
          },
          {
            path: "/all-features",
            element: <Features />,
          },
          {
            path: "/pricing",
            element: <Pricing />,
          },
          // {
          //   path: "/aboutUs",
          //   element: <ShowcaseSection></ShowcaseSection>,
          // },
          // {
          //   path: "/features",
          //   element: <OurFeaturesSection></OurFeaturesSection>,
          // },
          {
            path: "/pricings",
            element: <PricingPlanSection></PricingPlanSection>,
          },
          {
            path: "/contact",
            element: <FAQSection></FAQSection>,
          },
          {
            path: "/coming",
            element: <ComingSoon></ComingSoon>,
          },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/sign-in",
            element: <SignIn />,
          },
          {
            path: "/sign-up",
            element: <SignUp />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword></ForgotPassword>,
          },
          {
            path: "/otp-verify-forget-password",
            element: <ForgetPasswordOtpVerification />,
          },
          {
            path: "/check-mail",
            element: <CheckMail></CheckMail>,
          },
          {
            path: "/otp-verify",
            element: <OtpVerification />,
          },
          {
            path: "/confirm-password",
            element: <ConfirmPassword></ConfirmPassword>,
          },
          {
            path: "/confirmation",
            element: <Confirmation></Confirmation>,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <MyDashboard />,
          },
          {
            path: "coaching",
            element: <CoachingCallBooking></CoachingCallBooking>,
          },
          {
            path: "billing",
            element: <Billing />,
          },
          {
            path: "cover-letter",
            element: <CoverLetterGenerator />,
          },
          {
            path: "career-goal",
            element: <CareerGoal />,
          },
          {
            path: "career-road-map",
            element: <CareerRoadmap />,
          },
          {
            path: "resume-builder",
            element: <ResumeBuilder />,
          },
          {
            path: "task-manager",
            element: <TaskManagerRedirect />,
          },
          {
            path: "weekly-task",
            element: <WeeklyTask />,
          },
          {
            path: "task-manager/:weekId",
            element: <TaskManager />,
          },
          {
            path: "task/:id",
            element: <TaskDetail />,
          },
          {
            path: "resumeBuild-step",
            element: <ResumeBuilderStepper />,
          },
          {
            path: "cv-preview/:templateSlug",
            element: <CVPreview />,
          },
        ],
      },
    ],
  },
]);
