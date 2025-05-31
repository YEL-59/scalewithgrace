import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import { Outlet } from 'react-router';

export default function CommonLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
