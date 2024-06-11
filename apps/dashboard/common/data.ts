import { NavItem } from '@dashboard/interfaces/common';
import { DashboardIcon, PersonIcon, EnterIcon } from '@radix-ui/react-icons';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: DashboardIcon,
    label: 'Dashboard',
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: PersonIcon,
    label: 'user',
  },

  {
    title: 'Login',
    href: '/',
    icon: EnterIcon,
    label: 'login',
  },
];
