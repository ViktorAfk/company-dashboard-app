import React from 'react';
import { Navigation } from '../Navigation';
// import { AvatarImage } from '../ui/avatar';
import { LogoutButton } from '../ui/logout-button';
import { UserAvatar } from '../user-avatar';

type Props = {
  userName: string | undefined;
  userId: number | undefined;
};
export const SideBar: React.FC<Props> = ({ userName, userId }) => {
  return (
    <div className="flex flex-col items-center h-full justify-between">
      <div className="flex flex-col items-center gap-9">
        <UserAvatar userId={userId} userName={userName} />
        {/* <div className="flex flex-col items-center">
          <Avatar className="w-16 h-16 mb-1 bg-primary-foreground rounded-full flex items-center justify-center">
            <AvatarFallback className="">
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <p className="text-white text-lg">{userName || 'User name'}</p>
        </div> */}
        <Navigation />
      </div>
      <LogoutButton />
    </div>
  );
};
