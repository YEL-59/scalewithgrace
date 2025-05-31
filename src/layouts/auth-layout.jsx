import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <Outlet />
      </div>
      <div>
        Image
        <img src="" alt="" />
      </div>
    </div>
  );
}
