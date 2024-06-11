import { Metadata } from 'next';
import Product from '../components/product';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Product',
    description: `Product`,
  };
}

export default function Page({ params }: { params: { id: number } }) {
  return <Product id={params.id} />;
}
