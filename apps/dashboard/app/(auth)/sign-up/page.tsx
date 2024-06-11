import { Metadata } from 'next';
import SignUp from './components/sign-up';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Signup',
    description: `Signup`,
  };
}

export default function Page() {
  return <SignUp />;
}
