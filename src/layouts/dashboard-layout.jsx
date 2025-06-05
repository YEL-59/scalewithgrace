import DashAside from '@/components/DashboardShared/DashAside';
import DashNavbar from '@/components/DashboardShared/DashNavbar';
import { useState } from 'react';
import { Outlet } from 'react-router';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return ( 
    <div className='w-full'>
      <div className='w-full flex'>
        <aside className='w-fit'>
          <DashAside collapsed={collapsed} setCollapsed={setCollapsed}></DashAside>
        </aside>

        <nav className='w-full'>
          <DashNavbar collapsed={collapsed} setCollapsed={setCollapsed}></DashNavbar>
          <Outlet />
        </nav>
        
      </div>
    </div>

  );
}
