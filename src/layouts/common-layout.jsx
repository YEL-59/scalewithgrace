import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import ReactLenis from 'lenis/react';
import { Outlet } from 'react-router';

export default function CommonLayout() {
  return (
    <ReactLenis root>
      <Navbar />
      <Outlet />
      <Footer />
    </ReactLenis>
  );
}
