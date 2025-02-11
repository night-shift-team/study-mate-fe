import { Ecode, EcodeMessage } from '@/shared/errorApi/ecode';
import { BatchInterceptor } from '@mswjs/interceptors';
import { FetchInterceptor } from '@mswjs/interceptors/fetch';
import { ok } from 'assert';

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
  const localStorageToken = localStorage.getItem('accessToken');
  request.headers.append('Authorization', `Bearer ${localStorageToken}`);
});

interceptor.on('response', async ({ response }) => {
  const isEmptyToken = (await response.json()).ecode === Ecode.E0002;
  if (isEmptyToken) {
    EcodeMessage(Ecode.E0002);
    localStorage.removeItem('accessToken');
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
