'use client';
import React, { useState } from 'react';
import { clsx } from 'clsx';
import { ChevronsLeft } from 'lucide-react';
import { DashboardNav } from '@dashboard/components/layout/dashboard-nav';
import { navItems } from '@dashboard/common/data';
import { useSidebarContext as useSidebar } from '@dashboard/context/sidebar-context';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={clsx(
        `relative hidden h-screen flex-none border-r pt-20 md:block`,
        status && 'duration-500',
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <ChevronsLeft
        className={clsx(
          'absolute -right-3 top-1/2 cursor-pointer  rounded-full text-foreground shadow-2xl ring-2 ring-gray-100 ring-offset-4 ring-offset-gray-400',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='mt-3 space-y-1'>
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
