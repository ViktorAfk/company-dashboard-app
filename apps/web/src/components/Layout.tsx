import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div>
      <aside className="w-28 h-dvh bg-primary"> I am Sidebar</aside>
      <Outlet />
    </div>
  );
};
