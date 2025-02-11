import { NextResponse } from 'next/server';

export function GET() {
  if (!process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID) {
    return NextResponse.json(
      { error: 'GitHub Client ID is not configured' },
      { status: 500 }
    );
  }

  const baseUrl = 'https://github.com/login/oauth/authorize';

  const state = Math.random().toString(36).substring(2); // 랜덤 state 생성
  const params = {
    client_id: process.env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID || '',
    scope: 'read:user user:email',
    allow_signup: 'true',
    state,
  };

  const formattedParams = new URLSearchParams(params);
  const redirectUrl = `${baseUrl}?${formattedParams}`;

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 300, // 5분
  });

  return response;
}
