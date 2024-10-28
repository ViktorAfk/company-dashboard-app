import {
  CompaniesListIcon,
  DashboardIcon,
  ProfileIcon,
  ResetPasswordIcon,
} from '@/components/ui/icons';
import { LinkItem } from '@/types/link-item';
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
    label: 'Reset password',
    url: '/reset-password',
    icon: <ResetPasswordIcon />,
  },
  {
    id: 5,
    label: 'Create company',
    url: '/create-company',
    icon: <PlusIcon />,
  },
];
