import useScrollToTop from "@/hooks/scroll-top-hook";
import { PRODUCTION_READY_PATHS } from "@/routes";

import { Navigate, Outlet, useLocation } from "react-router";

export default function RootLayout() {
  const { pathname } = useLocation();

  // 👇 Scroll to top on every pathname change
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [pathname]);
  useScrollToTop(); // 👈 Hook handles scroll on path change

  if (import.meta.env.PROD && !PRODUCTION_READY_PATHS.includes(pathname)) {
    return <Navigate to="/coming" replace />;
  }

  return <Outlet />;
}
