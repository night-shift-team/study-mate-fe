import { getAllNoticeListRes } from '@/feature/notice/api';
import { _backendFetch } from '../_serverFetch';

export const runtime = 'edge'; // 또는 nodejs

export async function GET() {
  console.log('routes.ts GET called');
  const res = await _backendFetch<getAllNoticeListRes>({
    method: 'GET',
    path: '/api/v1/notice?page=0&limit=10',
    requestConfig: {
      cache: 'no-store',
    },
  });
  console.log('routes.ts called', res);
  return Response.json(res, {
    headers: {
      'CDN-Cache-Control':
        // 1 day 캐시, 2 hour stale-while-revalidate
        'public, s-maxage=86400, stale-while-revalidate=7200',
    },
  });
}
