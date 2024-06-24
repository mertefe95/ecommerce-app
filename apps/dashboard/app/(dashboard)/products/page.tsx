import { Metadata } from 'next';

import Products from './components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Products',
    description: `Products`,
  };
}

export default function Page() {
  return (
    <>
      <Products />
    </>
  );
}
