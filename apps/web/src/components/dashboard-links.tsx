import { dashBoardsLinks } from '@/utils/links';
import React from 'react';
import { Link } from 'react-router-dom';

export const DashBoardLinks: React.FC = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        {dashBoardsLinks.map(({ id, label, url }) => (
          <li
            key={id}
            className="flex justify-center items-center p-4 rounded-xl bg-card"
          >
            <Link to={url}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
