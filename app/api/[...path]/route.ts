import { NextRequest, NextResponse } from 'next/server';

export async function handler(req: NextRequest) {
  console.log(`[API Proxy] HANDLER CALLED: ${req.method} ${req.nextUrl.pathname}`);
  
  // Log all incoming headers for debugging
  const allHeaders: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    allHeaders[key] = value;
  });
  console.log(`[API Proxy] All incoming headers:`, JSON.stringify(allHeaders, null, 2));
  
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND ||
    process.env.BACKEND_URL ||
    'https://foodhub-backend-lilac.vercel.app';
  const pathname = req.nextUrl.pathname.replace(/^\/api\//, '');
  const url = `${backendUrl}/api/${pathname}${req.nextUrl.search}`;

  // Build headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Forward cookies from the incoming request
  const cookie = req.headers.get('cookie');
  console.log(`[API Proxy] Path: ${pathname}`);
  console.log(`[API Proxy] Incoming cookie header: ${cookie || 'NONE'}`);
  if (cookie) {
    headers['Cookie'] = cookie;
  }

  // Forward origin for CORS
  const origin = req.headers.get('origin');
  if (origin) {
    headers['Origin'] = origin;
  }

  try {
    // Handle request body
    let body: BodyInit | undefined;
    if (!['GET', 'HEAD'].includes(req.method)) {
      const text = await req.text();
      body = text || undefined;
    }

    const res = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    console.log(`[API Proxy] ${req.method} ${url} -> ${res.status}`);
    console.log(
      `[API Proxy] Backend Set-Cookie headers:`,
      res.headers.getSetCookie
        ? res.headers.getSetCookie()
        : res.headers.get('set-cookie'),
    );

    // Parse response
    let data;
    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      data = await res.json();
    } else {
      data = null;
    }

    // Forward Set-Cookie headers from backend to client
    // Remove domain attribute so cookies are scoped to frontend domain
    const responseHeaders = new Headers();
    const setCookieHeaders: string[] = res.headers.getSetCookie
      ? res.headers.getSetCookie()
      : (res.headers.get('set-cookie') || '').split(',').filter(Boolean);

    if (setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookieValue) => {
        // Remove domain attribute to scope cookies to frontend domain
        let modifiedCookie = cookieValue.replace(/;\s*domain=[^;]+/gi, '');
        responseHeaders.append('Set-Cookie', modifiedCookie);
        console.log(`[API Proxy] Forwarding Set-Cookie: ${modifiedCookie}`);
      });
    }

    return NextResponse.json(data, {
      status: res.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`[API Proxy] Error ${req.method} ${url}:`, error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to proxy request' },
      { status: 500 },
    );
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
