import React, { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';
import SidebarLayout from '@/components/layout/SidebarLayout';
import Header from '@/components/layout/Header';
import { getServerSession } from '@/modules/auth/auth.utils';

export default async function DashboardLayout({ children }: PropsWithChildren) {
  console.log('Dashboard Layout');
  const session = await getServerSession();

  if (!session) {
    redirect(`/401?redirectTo=/dashboard`);
  }

  return (
    <div className="w-full">
      <SidebarLayout headerSlot={<Header />}>{children}</SidebarLayout>
    </div>
  );
}
