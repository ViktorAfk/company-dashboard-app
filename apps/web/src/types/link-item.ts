import { ReactNode } from 'react';

export interface LinkItem {
  id: number;
  label: string;
  url: string;
  icon: ReactNode;
}
