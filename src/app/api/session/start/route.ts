// app/api/session/start/route.ts
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

import { alg } from '@/feature/middleware/model/authTokenValidation';
import { secret } from '@/feature/middleware/model/authTokenValidation';

export async function POST(req: Request) {
  console.log('session start called', req);
  const auth = req.headers.get('authorization'); // "Bearer <accessToken>"
  console.log('session start authorization token:', auth);
  if (!auth?.startsWith('Bearer '))
    return NextResponse.json({ ok: false }, { status: 401 });
  const accessToken = auth.slice(7);
  console.log('AccessToken', accessToken);

  // 서버 저장 없이 서명된 세션 JWT 발급 (짧게!)
  const session = await new SignJWT({ sub: accessToken, type: 'session' })
    .setProtectedHeader({ alg })
    .setIssuer('study-mate')
    .setAudience('developer-dev.study-mate.academy')
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);

  const refresh = await new SignJWT({ sub: accessToken, type: 'refresh' })
    .setProtectedHeader({ alg })
    .setIssuer('study-mate')
    .setAudience('developer-dev.study-mate.academy')
    .setIssuedAt()
    .setExpirationTime('60m')
    .sign(secret);

  const res = NextResponse.json({ ok: true });
  const isHttps = new URL(req.url).protocol === 'https:';
  res.headers.append(
    'Set-Cookie',
    `__Host-sm_session=${session}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${15 * 60}${isHttps ? '; Secure' : ''}`
  );
  res.headers.append(
    'Set-Cookie',
    `__Host-sm_refresh=${refresh}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60}${isHttps ? '; Secure' : ''}`
  );
  return res;
}
