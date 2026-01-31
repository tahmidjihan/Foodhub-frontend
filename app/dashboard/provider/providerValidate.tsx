'use client';
import { useAuth } from '@/app/auth/useAuth';
import { redirect } from 'next/navigation';
import React from 'react';

function ProviderValidate() {
  const session = useAuth();
  // @ts-ignore
  if (session.data?.user?.role !== 'Provider' && !session.isPending) {
    redirect('/dashboard');
  }
  return <></>;
}

export default ProviderValidate;
