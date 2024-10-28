import { links } from '@/utils/links';
import React from 'react';
import { NavItem } from './ui/nav-item';

export const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-6">
        {links.map(({ id, label, icon, url }) => (
          <li key={id}>
            <NavItem label={label} icon={icon} url={url} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
