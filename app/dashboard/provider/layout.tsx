import { useAuth } from '@/app/auth/useAuth';
import { redirect } from 'next/navigation';
import React from 'react';

function Layout() {
  const session = useAuth();
  // @ts-ignore
  if (!session.data?.user && session.data?.user?.role !== 'provider') {
    redirect('/auth/login');
  }
  return <></>;
}

export default Layout;
