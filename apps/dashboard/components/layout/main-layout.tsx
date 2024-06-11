import Header from './header';
import Sidebar from './sidebar';
import { ReactNode } from 'react';
import { MainLayoutProps } from '@dashboard/interfaces/common';

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex h-screen bg-white'>
      <Sidebar />
      <div className='flex w-full flex-1 flex-col'>
        <Header />
        <main className='flex-1 p-4'>{children}</main>
      </div>
    </div>
  );
}
