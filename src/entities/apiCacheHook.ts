import { ServerErrorResponse } from '@/shared/api/model/config';

export type ApiResponse<T> = {
  ok: boolean;
  payload: ServerErrorResponse | T;
};

type GetWithCacheParams<T> = {
  key: string;
  fetcher: () => Promise<ApiResponse<T>>;
  expires?: number | string; // TTL (초) 또는 ISO string
};

export async function getWithCache<T>({
  key,
  fetcher,
  expires,
}: GetWithCacheParams<T>): Promise<ApiResponse<T>> {
  const cache = await caches.open('api-cache');
  const now = Date.now();

  const cachedResponse = await cache.match(key);

  if (cachedResponse) {
    const expireHeader = cachedResponse.headers.get('X-Cache-Expires-At');
    const expireTime = expireHeader ? Number(expireHeader) : 0;
    if (now < expireTime) {
      const data = await cachedResponse.json();
      return data as ApiResponse<T>;
    }
  }

  try {
    const response = await fetcher();

    const responseToCache = new Response(JSON.stringify(response), {
      headers: { 'Content-Type': 'application/json' },
    });

    const headers = new Headers(responseToCache.headers);
    let expireAt = 0;
    if (typeof expires === 'number') {
      expireAt = now + expires * 1000;
    } else if (typeof expires === 'string') {
      expireAt = new Date(expires).getTime();
    }
    headers.set('X-Cache-Expires-At', expireAt.toString());

    const modified = new Response(await responseToCache.blob(), {
      status: responseToCache.status,
      statusText: responseToCache.statusText,
      headers,
    });

    await cache.put(key, modified);
    return response;
  } catch (error) {
    console.error('getWithCache fetch error:', error);
    throw error;
  }
}
