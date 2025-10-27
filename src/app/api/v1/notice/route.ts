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
  return Response.json(res, {
    headers: {
      'CDN-Cache-Control':
        // 1 day 캐시, 2 hour stale-while-revalidate
        'public, s-maxage=86400, stale-while-revalidate=7200',
    },
  });
}
