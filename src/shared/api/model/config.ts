import { BatchInterceptor } from '@mswjs/interceptors';
import { FetchInterceptor } from '@mswjs/interceptors/fetch';
import {
  getAccessToken,
  getAccessTokenFromRefreshToken,
} from './refreshTokenApi';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { userStore } from '@/shared/state/userStore';
import { Ecode } from './ecode';

export type HTTPRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export type ContentType =
  | 'text/html'
  | 'application/json'
  | 'text/plain'
  | 'application/javascript'
  | 'application/x-www-form-urlencoded';

export interface ServerErrorResponse {
  status: number;
  message: string;
  ecode: string;
}
export interface ApiResponseType<T = any> {
  ok: boolean;
  payload: T;
}

const apiDomainUrl = process.env.NEXT_PUBLIC_API_URL;
// 인터셉터 인스턴스 생성
const interceptor = new BatchInterceptor({
  name: 'fetch-interceptor',
  interceptors: [new FetchInterceptor()],
});

// 인터셉터 적용
interceptor.apply();

// 헤더 토큰 지정
let currentToken: string | null = null;
export const setTokenToHeader = (token: string | null) => {
  currentToken = token;
};

/**
 * @typedef {(
 *   "text/html" |
 *   "application/json" |
 *   "text/plain" |
 *   "application/javascript" |
 *   "application/x-www-form-urlencoded" |
 *   string
 * )} ContentType
 */
export const _apiFetch = async <T = any>(
  method: HTTPRequestMethod,
  endPoint: string,
  body?: { [key: string]: any },
  contentType: ContentType = 'application/json',
  isRetry: boolean = false
): Promise<{ ok: boolean; payload: T | ServerErrorResponse }> => {
  if (!apiDomainUrl) {
    throw new Error('Domain URL is not defined');
  }

  const options: RequestInit = {
    method,
    headers: { 'Content-Type': contentType },
    body: body ? JSON.stringify(body) : undefined,
  };

  const fetchRequest = new Request(apiDomainUrl + endPoint, options);

  try {
    const response = await fetch(fetchRequest);
    const contentType = response.headers.get('content-type');
    let payload: T | ServerErrorResponse;

    if (contentType?.includes('application/json')) {
      // JSON 응답 처리
      payload = await response.json();
    } else {
      // 텍스트 응답 처리
      payload = (await response.text()) as T;
    }
    const responseWithData = {
      ok: response.ok,
      payload: payload,
    };

    if (!response.ok) {
      const serverErrorData = payload as ServerErrorResponse;
      if (
        (serverErrorData.ecode === Ecode.E0002 ||
          serverErrorData.ecode === Ecode.E0005) &&
        !isRetry &&
        typeof window !== 'undefined'
      ) {
        const refreshToken = localStorage.getItem('refreshToken');
        setTokenToHeader(refreshToken);
        const accessToken = await getAccessTokenFromRefreshToken(refreshToken);
        setTokenToHeader(accessToken);
        return await _apiFetch(
          method,
          endPoint,
          body,
          contentType as ContentType,
          true
        );
      }
    }
    return responseWithData;
  } catch (e: any) {
    console.log(e);
    return {
      ok: false,
      payload: {
        ecode: Ecode.E9999,
        message: e.message ?? '',
        status: 500,
      },
    };
  }
};

// 인터셉터 리스너 설정
interceptor.on('request', async ({ request }) => {
  if (request.url.includes(`${String(apiDomainUrl)}/api/`)) {
    if (
      !currentToken &&
      !request.url.includes('/users/refresh') &&
      typeof window !== 'undefined'
    ) {
      try {
        const accessToken = await getAccessToken();
        if (accessToken) localStorage.setItem('accessToken', accessToken);
        currentToken = accessToken;
      } catch (e) {
        console.log(e);
      }
    }
    request.headers.set('Authorization', `Bearer ${currentToken}`);
  }
});

interceptor.on('response', async ({ response, request }) => {
  // 자동 갱신 로직에서만 refresh 호출이 일어나는데 실패했을때
  if (
    request.url.includes('/users/refresh') &&
    !response.ok &&
    typeof window !== 'undefined'
  ) {
    userStore.getState().setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = RouteTo.Home;
  }
});

export const handleFetchErrors = (error: Error) => {
  if (error.name === 'TypeError') {
    console.warn('Network Error or CORS issue:', error.message);
    return 'TypeError';
  } else if (error.name === 'AbortError') {
    console.warn('Request was aborted:', error.message);
    return 'AbortError';
  } else {
    console.warn('Frontend Error:', error.message);
    return;
  }
  //로그 관리
};
export const handleServerErrors = async () => {
  //로그 관리
};
