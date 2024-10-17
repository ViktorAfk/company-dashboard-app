import { LinkItem } from '@/types/link-item';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = Omit<LinkItem, 'id'>;
export const NavItem: React.FC<Props> = ({ label, icon: Icon, url }) => {
  return (
    <Link
      to={url}
      className="flex flex-col items-center gap-1 transition-transform hover:scale-110 active:translate-y-1"
    >
      <div className="w-9 h-9 bg-primary-foreground rounded-full flex justify-center items-center">
        {Icon}
      </div>
      <p className="text-center text-white text-base">{label}</p>
    </Link>
  );
};
