// middleware.ts (runtime: 'edge')
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthNeedPage } from '@/shared/api/model/getAuthNeedPage';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import {
  isExpiringSoon,
  isValidRefresh,
  mintSession,
  readSubFromToken,
  verifySession,
} from './feature/middleware/model/authTokenValidation';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needs = isAuthNeedPage(pathname);
  if (!needs) return NextResponse.next();

  const isHtmlNav = req.headers.get('accept')?.includes('text/html') ?? false;
  const isHttps = req.nextUrl.protocol === 'https:';

  const session = req.cookies.get('__Host-sm_session')?.value || null;
  const refresh = req.cookies.get('__Host-sm_refresh')?.value || null;

  // 1) 세션이 없는 경우: refresh만으로 복구 시도
  if (!session) {
    if (refresh && (await isValidRefresh(refresh))) {
      // 새 세션 발급 (auto-login)
      const sub = (await readSubFromToken(refresh))!;
      const newSession = await mintSession(sub);
      const res = NextResponse.next();
      res.cookies.set('__Host-sm_session', newSession, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 15 * 60, // 15분
        secure: isHttps,
      });
      return res;
    }
    return redirectToLogin(req);
  }

  // 2) 세션이 존재: 검증 & 만료임박이면 롤링(단, HTML 네비게이션에서만)
  const verified = await verifySession(session);
  if (!verified.ok) return redirectToLogin(req);

  if (isHtmlNav && isExpiringSoon(verified.exp)) {
    if (refresh && (await isValidRefresh(refresh))) {
      const sub = verified.sub!;
      const newSession = await mintSession(sub);
      const res = NextResponse.next();
      res.cookies.set('__Host-sm_session', newSession, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60,
        secure: isHttps,
      });
      return res;
    }
    // 리프레시가 없거나 무효 → 로그인 요구
    return redirectToLogin(req);
  }

  // 정상 통과
  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const url = new URL(RouteTo.Login, req.url);
  // url.searchParams.set('next', req.nextUrl.pathname); // 필요 시 복귀 경로
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/leveltest',
    '/testresult',
    '/change-password',
    '/signup-complete',
    '/rank',
    '/suggestion/write',

    '/admin/:path*',
    '/mypage/:path*',
    '/solve/:path*',
    '/store/:path*',
  ],
};
