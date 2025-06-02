import { PRODUCTION_READY_PATHS } from '@/routes';
import { Navigate, Outlet, useLocation } from 'react-router';

export default function RootLayout() {
  const { pathname } = useLocation();

  if (import.meta.env.PROD && !PRODUCTION_READY_PATHS.includes(pathname)) {
    return <Navigate to="/coming" replace />;
  }

  return <Outlet />;
}
