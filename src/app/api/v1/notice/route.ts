import { getAllNoticeListRes } from '@/feature/notice/api';
import { _backendFetch } from '../_serverFetch';

export const runtime = 'nodejs';

export async function GET() {
  const res = await _backendFetch<getAllNoticeListRes>({
    method: 'GET',
    path: '/api/v1/notice?page=0&limit=10',
    requestConfig: {
      cache: 'no-store',
    },
  });

  const now = new Date();
  const every9amKST = new Date(now);
  every9amKST.setHours(24, 0, 0, 0);
  const secondsUntil9am = Math.floor(
    (every9amKST.getTime() - now.getTime()) / 1000
  );

  return Response.json(res, {
    headers: {
      'CDN-Cache-Control':
        // 1 day 캐시, 2 hour stale-while-revalidate
        `public, s-maxage=${String(secondsUntil9am)}, stale-while-revalidate=7200`,
    },
  });
}
