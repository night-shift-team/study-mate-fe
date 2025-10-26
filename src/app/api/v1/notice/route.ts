import { getAllNoticeListRes } from '@/feature/notice/api';
import { _backendFetch } from '../_serverFetch';

export const runtime = 'edge'; // 또는 nodejs
const revalidateTime = 3 * 60; // ISR/Edge cache 재검증 시간 설정 (초 단위)

export async function GET() {
  console.log('routes.ts GET called');
  const res = await _backendFetch<getAllNoticeListRes>({
    method: 'GET',
    path: '/api/v1/notice?page=0&limit=10',
    requestConfig: {
      next: { revalidate: revalidateTime },
    },
  });
  console.log('routes.ts called', res);
  return Response.json(res);
}
