import { createAuthClient } from 'better-auth/react';

// Auth requests must go through the frontend's catch-all API route (/api/[...path]/route.ts)
// so cookies are scoped to the frontend domain. The catch-all route proxies to the backend
// and rewrites Set-Cookie headers to use the frontend domain.
const getAuthBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // SSR: use env var or fallback - this path is only used for hooks which are client-side
  return process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
};

const baseURL = `${getAuthBaseUrl()}/api/auth`;

export const authClient = createAuthClient({
  baseURL,
  fetchOptions: {
    credentials: 'include',
  },
});

export const { useSession } = authClient;
