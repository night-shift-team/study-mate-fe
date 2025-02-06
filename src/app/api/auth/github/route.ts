import { NextResponse } from 'next/server';

export function GET() {
  if (!process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID) {
    return NextResponse.json(
      { error: 'GitHub Client ID is not configured' },
      { status: 500 }
    );
  }

  const baseUrl = 'https://github.com/login/oauth/authorize';

  const params = {
    client_id: process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID || '',
    scope: 'read:user user:email',
    allow_signup: 'true',
    // state 파라미터는 선택적으로 제거
  };

  const formattedParams = new URLSearchParams(params);
  const redirectUrl = `${baseUrl}?${formattedParams}`;

  return NextResponse.redirect(redirectUrl);
}
