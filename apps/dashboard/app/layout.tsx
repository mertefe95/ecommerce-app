'use client';
import '@repo/ui/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '../context/user-context';
import QueryProvider from '../lib/query-provider';
import axios from 'axios';
import { Toaster } from '@repo/ui/components/toaster';
import NextAdapterApp from 'next-query-params/app';
import { QueryParamProvider } from 'use-query-params';
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
          <QueryParamProvider adapter={NextAdapterApp}>
            <UserProvider> {children}</UserProvider>
          </QueryParamProvider>{' '}
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
