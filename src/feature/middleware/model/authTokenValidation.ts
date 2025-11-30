import { jwtVerify, SignJWT } from 'jose';

export const alg = 'HS256';
export const secret = new TextEncoder().encode(process.env.SESSION_SECRET!);

// 만료 임박 임계값: 5분
const ROLL_WINDOW_SEC = 60 * 5;

export async function verifySession(
  token: string
): Promise<{ ok: true; sub: string; exp: number } | { ok: false }> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'study-mate',
      audience: process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'studymate.dinn.dev',
    });
    const sub = String(payload.sub ?? '');
    const exp = Number(payload.exp ?? 0);
    if (!sub || !exp) return { ok: false };
    return { ok: true, sub, exp };
  } catch {
    return { ok: false };
  }
}

export function isExpiringSoon(exp: number) {
  const now = Math.floor(Date.now() / 1000);
  return exp > 0 && exp - now <= ROLL_WINDOW_SEC;
}

export async function isValidRefresh(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'study-mate',
      audience: process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'studymate.dinn.dev',
    });
    return payload?.type === 'refresh' && typeof payload.sub === 'string';
  } catch {
    return false;
  }
}

export async function readSubFromToken(token: string) {
  const v = await verifySessionOrRefresh(token);
  return v?.sub ?? null;
}

async function verifySessionOrRefresh(
  token: string
): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: 'study-mate',
      audience: process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'studymate.dinn.dev',
    });
    const sub = typeof payload.sub === 'string' ? payload.sub : null;
    return sub ? { sub } : null;
  } catch {
    return null;
  }
}

export async function mintSession(sub: string) {
  return await new SignJWT({ sub, type: 'session' })
    .setProtectedHeader({ alg })
    .setIssuer('study-mate')
    .setAudience(process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'studymate.dinn.dev')
    .setIssuedAt()
    .setExpirationTime('60m')
    .sign(secret);
}
