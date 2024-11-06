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
        <Navigation />
      </div>
      <LogoutButton />
    </div>
  );
};
