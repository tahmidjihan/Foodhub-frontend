'use client';
import { authClient } from './auth';

export function useAuth() {
  const session = authClient.useSession();
  return session;
}
