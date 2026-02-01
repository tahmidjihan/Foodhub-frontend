'use client';
import { redirect } from 'next/navigation';
import { authClient } from './auth';

export function useAuth() {
  const session = authClient.useSession();
  return session;
}
export function signOut() {
  authClient.signOut().then(() => {
    redirect('/');
  });
}
