import '@repo/ui/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProvider } from '../context/user-context';
import QueryProvider from '../lib/query-provider';
import axios from 'axios';
import { Toaster } from '@repo/ui/components/toaster';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Turborepo',
  description: 'Generated by create turbo',
};
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
          <UserProvider>{children}</UserProvider>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
