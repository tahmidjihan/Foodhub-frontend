import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'API proxy is working',
    timestamp: new Date().toISOString(),
    path: req.nextUrl.pathname,
  });
}
