import { Dashboard as MainContent } from './components/main-content';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainContent>
      <main className='container mt-8 rounded-md bg-neutral-50 py-8 text-black'>
        {children}
      </main>
    </MainContent>
  );
}
