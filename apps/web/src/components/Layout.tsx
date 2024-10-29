import { App } from '@/App';
import { useAuthContext } from '@/hooks/auth-context';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './side-bar/SideBar';
import { Toaster } from './ui/toaster';

export const Layout: React.FC = () => {
  const { authData } = useAuthContext();

  return (
    <main className="flex bg-secondary">
      <aside className="basis-32 h-dvh bg-primary pt-7 pb-9 px-2">
        <SideBar userName={authData?.fullName} userId={authData?.userId} />
      </aside>
      <div className="flex-1 h-dvh overflow-y-auto max-w-screen-xl bg-secondary p-10">
        {!authData && <App />}
        <Outlet />
      </div>
      <Toaster />
    </main>
  );
};
