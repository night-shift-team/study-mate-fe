interface IWarmedAPICachingResult {
  status: 'success' | 'partial' | 'failed';
  warmed: {
    url: string;
    success: boolean;
  }[];
}
export const runtime = 'nodejs';
import * as Sentry from '@sentry/nextjs';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const domain =
  process.env.NEXT_PUBLIC_FRONTEND_URL ?? 'https://study-mate-fe.vercel.app';

export async function GET() {
  const result: IWarmedAPICachingResult = { status: 'failed', warmed: [] };

  // s-maxage 55~60, swr 30
  await sleep(12_000 + Math.random() * 3_000);

  try {
    const settled = await Promise.allSettled(
      cachingAPILists.map(async ({ url }) => {
        try {
          const res = await fetch(url, { method: 'GET' });
          // 응답 200, 400 모두 처리
          return { url, success: res.ok };
        } catch {
          // 서버 에러 처리 (resolve)
          return { url, success: false };
        }
      })
    );

    // promise 결과 정리
    result.warmed = settled.map((it) => {
      if (it.status === 'fulfilled') {
        return it.value;
      } else return { url: 'unknown error', success: false };
    });

    // 정책: 하나라도 실패하면 전체 실패로 간주
    const okCount = result.warmed.filter((w) => w.success).length;
    result.status = okCount === result.warmed.length ? 'success' : 'failed';
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    if (result.status !== 'success') {
      Sentry.captureMessage('Cache warming failed', {
        level: 'warning',
        extra: { warmed: result.warmed },
      });
    }
  }

  return Response.json(result, { headers: { 'Cache-Control': 'no-store' } });
}

// 캐시 값 갱신을 위한 bff api 리스트
const cachingAPILists = [
  {
    url: `${domain}/api/v1/notice?page=0&limit=10`,
  },
];
