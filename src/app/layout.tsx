import './globals.css';
import { AppProvider } from '@/utils/providers';
import { getServerSession } from '@/modules/auth/auth.utils';

export default async function RootLayout({
  children,
  ...others
}: {
  children: React.ReactNode;
}) {
  console.log('Root Layout', others);
  const session = await getServerSession();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <AppProvider initialState={{ auth: session }}>
        <body>{children}</body>
      </AppProvider>
    </html>
  );
}
