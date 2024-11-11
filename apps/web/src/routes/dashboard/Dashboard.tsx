import { DashBoardLinks } from '@/components/dashboard-links';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <section className="w-full min-h-dvh">
      <div className="mb-5">
        <DashBoardLinks />
      </div>
      <Outlet />
    </section>
  );
};
