import {
  CompaniesListIcon,
  DashboardIcon,
  ProfileIcon,
  ResetPasswordIcon,
} from '@/components/ui/icons';
import { DashBoardLink, LinkItem } from '@/types/link-item';
import { PlusIcon } from '@radix-ui/react-icons';

export const links: LinkItem[] = [
  {
    id: 1,
    label: 'Dashboard',
    url: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    label: 'Companies list',
    url: '/companies',
    icon: <CompaniesListIcon />,
  },
  {
    id: 3,
    label: 'Profile',
    url: '/profile',
    icon: <ProfileIcon />,
  },
  {
    id: 4,
    label: 'Create company',
    url: '/create-company',
    icon: <PlusIcon />,
  },
  {
    id: 5,
    label: 'Forgot password',
    url: '/forgot-password',
    icon: <ResetPasswordIcon />,
  },
];

export const dashBoardsLinks: DashBoardLink[] = [
  { id: 1, label: 'Admins', url: 'admins' },
  { id: 2, label: 'Users', url: 'users' },
  { id: 3, label: 'Companies', url: 'companies' },
];
