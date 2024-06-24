import { Metadata } from 'next';

import UserGroups from './components';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'User Groups',
    description: `User Groups`,
  };
}

export default function Page() {
  return (
    <>
      <UserGroups />
    </>
  );
}
