import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import Header from './layout/header';
import Footer from './layout/footer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/table';

export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className='container relative mx-auto flex max-w-screen-2xl flex-col items-center px-8'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
