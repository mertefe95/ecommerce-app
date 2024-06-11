import { Metadata } from 'next';
import Orders from './components/orders';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Orders',
    description: `Orders`,
  };
}

export default function Page() {
  return <Orders />;
}
