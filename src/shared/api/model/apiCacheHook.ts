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
    headers.set('X-Cache-Timestamp', now.toString());

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

export const callWithConditionalApiCalled = async <T>({
  calledFuncKey,
  calledFetcher,
  fetchersKey,
}: {
  calledFuncKey: string;
  calledFetcher: () => Promise<ApiResponse<T>>;
  fetchersKey: string[];
}) => {
  const cache = await caches.open('api-cache');
  const calledCachedResponse = await cache.match(calledFuncKey);
  console.log(
    'Called Cached Response for key: ',
    calledFuncKey,
    calledCachedResponse
  );
  if (!calledCachedResponse) {
    return await getWithCache<T>({
      key: calledFuncKey,
      fetcher: calledFetcher,
    });
  }
  const calledCachedData =
    (await calledCachedResponse.json()) as ApiResponse<T>;
  console.log('Called Cached Data:', calledCachedData);
  //* 1. target Fetcher의 타임스탬프 확인
  const result = fetchersKey.map(async (fetcherKey) => {
    const cachedResponse = await cache.match(fetcherKey);
    console.log(
      "cachedResponse for fetcherKey '",
      fetcherKey,
      "':",
      cachedResponse
    );
    if (!cachedResponse) {
      return true;
    }

    const targetLastCalledHeader =
      cachedResponse.headers.get('X-Cache-Timestamp');
    const targetLastCalledTime = targetLastCalledHeader
      ? Number(targetLastCalledHeader)
      : 0;

    const currenCalledHeader =
      calledCachedResponse.headers.get('X-Cache-Timestamp');
    const currentLastCalledTime = currenCalledHeader
      ? Number(currenCalledHeader)
      : 0;

    // 체크하고자 하는 타겟 함수보다 호출한 api가 더 최신이면 캐시된 데이터 사용
    console.log(
      'TargetLastCalledTime:',
      targetLastCalledTime,
      'CurrentLastCalledTime:',
      currentLastCalledTime
    );
    if (targetLastCalledTime < currentLastCalledTime) {
      return true;
    }

    throw new Error('Need to call API again');
  });

  //* 2. 하나라도 호출한 api보다 마지막 호출 시간이 최근이면 새로 호출
  return await Promise.all(result)
    .then(() => {
      console.log('Using cached API for key:', calledFuncKey);
      return calledCachedData as ApiResponse<T>;
    })
    .catch(async (e) => {
      console.log('error in callWithConditionalApiCalled:', e);
      console.log('Re-fetching API for key:', calledFuncKey);
      return await getWithCache<T>({
        key: calledFuncKey,
        fetcher: calledFetcher,
      });
    });
};
