import { useLogoutQuery } from '@/api/auth/auth-query';
import { useAuthContext } from '@/hooks/auth-context';
import { toast } from '@/hooks/use-toast';
import React from 'react';
import { Button } from './button';
import { LogoutIcon } from './icons';

export const LogoutButton: React.FC = () => {
  const { logoutUser } = useAuthContext();
  const { refetch } = useLogoutQuery();
  const handleLogout = async () => {
    try {
      await refetch();
      logoutUser();
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: `${error}`,
      });
      throw new Error('Logout failed');
    }
  };
  return (
    <Button
      type="button"
      variant={null}
      className="flex flex-col items-center h gap-1 transition-transform hover:scale-110 active:translate-y-1"
      onClick={handleLogout}
    >
      <div className="w-9 h-9 bg-primary-foreground rounded-full flex justify-center items-center">
        <LogoutIcon />
      </div>
      <span className="text-center text-white text-base">Logout</span>
    </Button>
  );
};
