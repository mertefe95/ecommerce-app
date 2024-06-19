'use client';

import { MainContent } from './components/main-content';
import { Suspense } from 'react';
import NextAdapterApp from 'next-query-params/app';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainContent>
      <Suspense>
        <main className='mx-4 w-full bg-neutral-50'>{children}</main>
      </Suspense>
    </MainContent>
  );
}
