import NavigationDrawer from '@/components/navigation/NavigationDrawer';
import React, { PropsWithChildren } from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession();
  console.log(session);
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=http://localhost:3000/dashboard`);
  }
  return (
    <>
      <NavigationDrawer />
      <section>{children}</section>
    </>
  );
}
