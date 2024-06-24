import { NavItem } from '@dashboard/interfaces/common';
import {
  DashboardIcon,
  PersonIcon,
  EnterIcon,
  LayersIcon,
  GroupIcon,
} from '@radix-ui/react-icons';
import { Building2Icon, CaptionsIcon } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: DashboardIcon,
    label: 'Dashboard',
  },
  {
    title: 'Groups (expand example)',
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
  /*{
    title: 'Brands',
    href: '/brands',
    icon: CaptionsIcon,
    label: 'brand',
  },
  {
    title: 'Sellers',
    href: '/sellers',
    icon: Building2Icon,
    label: 'seller',
  },*/
  {
    title: 'Infinite scroll users',
    href: '/',
    icon: EnterIcon,
    label: 'login',
  },
];
