import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dashboard',
    description: `Dashboard`,
  };
}

export default function Page() {
  return <></>;
}
