import { readyForProduction } from '@/routes';
import { Outlet, useLocation, useNavigate } from 'react-router';

export default function RootLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (
    readyForProduction.includes(pathname) &&
    import.meta.env.MODE === 'production'
  ) {
    return navigate('/coming');
  }

  return <Outlet />;
}
