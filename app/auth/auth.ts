import { createAuthClient } from 'better-auth/react';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return window.location.origin;
  return process.env.NEXT_PUBLIC_FRONTEND_URL || process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3000';
};

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  fetchOptions: {
    credentials: 'include',
  },
});

export const { useSession } = authClient;
