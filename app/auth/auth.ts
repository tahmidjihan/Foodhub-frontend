import { createAuthClient } from 'better-auth/react';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Use backend URL for auth API calls
    return process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';
  }
  return process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';
};

export const authClient = createAuthClient({
  baseURL: `${getBaseUrl()}/api/auth`,
  fetchOptions: {
    credentials: 'include',
  },
});

export const { useSession } = authClient;
