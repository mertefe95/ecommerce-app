import { Metadata } from 'next';

import Users from './components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Users',
    description: `Users`,
  };
}

export default function Page() {
  return (
    <>
      <Users />
    </>
  );
}
