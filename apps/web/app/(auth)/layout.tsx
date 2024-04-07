export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className='mt-40'>{children}</main>;
}
