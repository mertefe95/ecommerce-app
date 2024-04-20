import { MainContent } from './components/main-content';
import { Suspense } from 'react';
import { QueryParamProvider } from 'use-query-params';
import NextAdapterApp from 'next-query-params/app';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainContent>
      <Suspense>
        <QueryParamProvider adapter={NextAdapterApp}>
          <main className='mx-4 w-full bg-neutral-50'>{children}</main>
        </QueryParamProvider>
      </Suspense>
    </MainContent>
  );
}
