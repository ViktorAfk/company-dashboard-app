import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import React from 'react';
import { Navigation } from '../Navigation';
// import { AvatarImage } from '../ui/avatar';
import { UserIcon } from '../ui/icons';
import { LogoutButton } from '../ui/logout-button';

export const SideBar: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-full justify-between">
      <div className="flex flex-col items-center gap-9">
        <div className="flex flex-col items-center">
          <Avatar className="w-16 h-16 mb-1 bg-primary-foreground rounded-full flex items-center justify-center">
            <AvatarFallback className="">
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <p className="text-white text-lg">User name</p>
        </div>
        <Navigation />
      </div>
      <LogoutButton />
    </div>
  );
};
