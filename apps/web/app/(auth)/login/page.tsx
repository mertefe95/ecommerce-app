import { Metadata } from 'next';
import Login from './components/login';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Login',
    description: `Login`,
  };
}

export default function Page() {
  return <Login />;
}
