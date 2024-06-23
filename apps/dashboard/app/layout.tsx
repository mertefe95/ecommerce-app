'use client';
import '@repo/ui/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '@dashboard/context/user-context';
import { SidebarProvider } from '@dashboard/context/sidebar-context';
import QueryProvider from '../lib/query-provider';
import axios from 'axios';
//import { Toaster } from '@repo/ui/components/toaster';
import { Toaster } from '@repo/ui/components/sonner';

const inter = Inter({ subsets: ['latin'] });

axios.defaults.withCredentials = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <QueryProvider>
          <UserProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </UserProvider>
        </QueryProvider>
        <Toaster position='top-right' richColors /> {/*closeButton*/}
      </body>
    </html>
  );
}
