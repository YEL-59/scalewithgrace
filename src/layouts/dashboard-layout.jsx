import React from 'react';
import { Outlet } from 'react-router';

export default function DashboardLayout() {
  return (
    <>
      <nav>Navbar</nav>
      <aside>Sidebar</aside>
      <Outlet />
    </>
  );
}
