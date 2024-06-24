import { Metadata } from 'next';
import Users from '../(dashboard)/users/components/inifinite-scroll-test';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dashboard',
    description: `Dashboard`,
  };
}

export default function Page() {
  return (
    <>
      <Users />
    </>
  );
}
