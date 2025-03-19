import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { BatchInterceptor } from '@mswjs/interceptors';
import { FetchInterceptor } from '@mswjs/interceptors/fetch';
import { ok } from 'assert';
import { getAccessToken } from './refreshTokenApi';
import { AuthTokenRes } from '@/shared/user/api';
import { userStore } from '@/state/userStore';
import { useRouter } from 'next/navigation';
import { RouteTo } from '@/shared/routes/model/getRoutePath';

type HTTPRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ContentType =
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

let currentToken: string | null = null;
export const setAccessTokenToHeader = (token: string | null) => {
  currentToken = token;
};
export const setRefreshTokenToHeader = (token: string | null) => {
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
  body?: any,
  contentType = 'application/json'
): Promise<{ ok: boolean; payload: T | ServerErrorResponse }> => {
  if (!apiDomainUrl) {
    throw new Error('Domain URL is not defined');
  }
  endPoint = apiDomainUrl + endPoint;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': contentType,
    },
    body: body ? JSON.stringify(body) : undefined,
  };
  const response = await fetch(endPoint, options);

  const responseWithData = {
    ok: response.ok,
    payload: await response.json(),
  };
  if (!response.ok) {
    handleServerErrors(responseWithData.payload as ServerErrorResponse);
  }
  return responseWithData;
};

// 인터셉터 리스너 설정
interceptor.on('request', async ({ request }) => {
  if (request.url.includes('/api/')) {
    if (!currentToken) {
      try {
        const accessToken = await getAccessToken();
        currentToken = accessToken as string;
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log(e);
      }
    }
    request.headers.set('Authorization', `Bearer ${currentToken}`);
  }
});

interceptor.on('response', async ({ response, request }) => {
  // console.log("interceptor", response)
  if (response.ok) return;
  const errCode = (await response.json()).ecode;
  const isDisabaleToken = errCode === Ecode.E0002 || errCode === Ecode.E0005;
  if (isDisabaleToken) {
    try {
      console.warn(EcodeMessage(errCode));
      localStorage.removeItem('accessToken');

      const accessToken = await getAccessToken();
      currentToken = accessToken as string;
      request.headers.set('Authorization', `Bearer ${currentToken}`);
    } catch (e) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      const setUser = userStore.getState().setUser;
      setUser(null);
      console.log(e);
      const router = useRouter();
      router.push(RouteTo.Home);
    }
  }
});

export const handleFetchErrors = (error: Error) => {
  if (error.name === 'TypeError') {
    console.error('Network Error or CORS issue:', error.message);
    return 'TypeError';
  } else if (error.name === 'AbortError') {
    console.error('Request was aborted:', error.message);
    return 'AbortError';
  } else {
    console.error('Frontend Error:', error.message);
    return;
  }
  //로그 관리
};
export const handleServerErrors = (error: ServerErrorResponse) => {
  //로그 관리
};
