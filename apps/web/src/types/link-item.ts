import { ReactNode } from 'react';

export interface LinkItem {
  id: number;
  label: string;
  url: string;
  icon: ReactNode;
}

export type DashBoardLink = Omit<LinkItem, 'icon'>;
