import MainLayout from '@dashboard/components/layout/main-layout';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
