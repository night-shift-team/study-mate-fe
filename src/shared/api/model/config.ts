import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { BatchInterceptor } from '@mswjs/interceptors';
import { FetchInterceptor } from '@mswjs/interceptors/fetch';
import { ok } from 'assert';
import { getAccessToken } from './refreshTokenApi';
import { AuthTokenRes } from '@/shared/user/api';
import { userStore } from '@/state/userStore';
import { RouteTo } from '@/shared/routes/model/getRoutePath';
import { resetUserData } from './resetAuthData';
import { makeRequest } from './makeRequest';

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

// 헤더 토큰 지정
let currentToken: string | null = null;
export const setAccessTokenToHeader = (token: string | null) => {
  currentToken = token;
};
export const setRefreshTokenToHeader = (token: string | null) => {
  currentToken = token;
};

// 재호출용 Request 객체
let currentRequest: { url: string; options: RequestInit } | null = null;

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
  contentType: ContentType = 'application/json'
): Promise<{ ok: boolean; payload: T | ServerErrorResponse }> => {
  if (!apiDomainUrl) {
    throw new Error('Domain URL is not defined');
  }

  endPoint = apiDomainUrl + endPoint;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json' as ContentType,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const newRequest = makeRequest(endPoint, options);
  currentRequest = newRequest;

  try {
    const response = await fetch(newRequest.url, newRequest.options);
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
      handleServerErrors(responseWithData.payload as ServerErrorResponse);
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
    if (!currentToken && typeof window !== 'undefined') {
      try {
        const accessToken = await getAccessToken();
        currentToken = accessToken as string;
      } catch (e) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log(e);
        resetUserData();
      }
    }
    request.headers.set('Authorization', `Bearer ${currentToken}`);
  }
});

interceptor.on('response', async ({ response, request }) => {
  // console.log("interceptor", response.headers.get('Content-Type'))
  if (response.ok) return;

  const contentType = response.headers.get('content-type');
  let data;
  if (contentType?.includes('application/json')) {
    // JSON 응답 처리
    data = await response.json();
  } else {
    // 텍스트 응답 처리
    data = await response.text();
  }

  // 토큰 에러 처리
  // 서버에서 전달해주는 에러 양식일 경우
  let isDisabaleToken = false;
  if (typeof data.ecode !== 'undefined') {
    isDisabaleToken = data.ecode === Ecode.E0002 || data.ecode === Ecode.E0005;
  }
  if (!isDisabaleToken) return;

  if (typeof window !== 'undefined') {
    console.warn(EcodeMessage(data.ecode));
    localStorage.removeItem('accessToken');

    try {
      const accessToken = await getAccessToken();
      currentToken = accessToken as string;

      if (!currentToken) {
        resetUserData();
        return;
      }
      request.headers.set('Authorization', `Bearer ${currentToken}`);

      if (!currentRequest) return;
      const parsedBody: { [key: string]: string } | undefined = currentRequest
        .options.body
        ? JSON.parse(currentRequest.options.body as string)
        : undefined;
      const contentType: ContentType =
        (currentRequest.options.headers as any)['Content-Type'] ||
        'application/json';
      await _apiFetch(
        currentRequest.options.method as HTTPRequestMethod,
        currentRequest.url,
        parsedBody,
        contentType
      );
    } catch (e) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      console.log(e);
      resetUserData();
    }
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
export const handleServerErrors = (error: ServerErrorResponse) => {
  //로그 관리
};
