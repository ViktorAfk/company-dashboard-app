import { App } from '@/App';
import { useAuthContext } from '@/hooks/auth-context';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './side-bar/SideBar';

export const Layout: React.FC = () => {
  const { authData } = useAuthContext();

  return (
    <main className="flex">
      <aside className="basis-32 h-dvh bg-primary pt-7 pb-9 px-2">
        <SideBar />
      </aside>
      <div className="flex-1">
        {!authData && <App />}
        <Outlet />
      </div>
    </main>
  );
};
