import { NavItem } from '@dashboard/interfaces/common';
import {
  DashboardIcon,
  PersonIcon,
  EnterIcon,
  LayersIcon,
  GroupIcon,
} from '@radix-ui/react-icons';

export const navItems: any[] = [
  {
    header: 'Main',
    title: 'Dashboard',
    href: '/dashboard',
    icon: DashboardIcon,
    label: 'Dashboard',
  },
  {
    title: 'Groups',
    href: '/user-groups',
    icon: GroupIcon,
    label: 'group',
  },
  {
    title: 'Users',
    href: '/users',
    icon: PersonIcon,
    label: 'user',
  },
  {
    title: 'Products',
    href: '/products',
    icon: LayersIcon,
    label: 'product',
  },

  {
    title: 'Login',
    href: '/',
    icon: EnterIcon,
    label: 'login',
  },
];
