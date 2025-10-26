import { ApiResponse } from '@/shared/api/model/apiCacheHook';
import {
  HTTPRequestMethod,
  ServerErrorResponse,
} from '@/shared/api/model/config';
const FrontendAPIDomain = process.env.NEXT_PUBLIC_FRONTEND_URL;
const BackendAPIDomain = process.env.NEXT_PUBLIC_API_URL;

export const _backendFetch = async <T = any>({
  method,
  path,
  body,
  requestContentType = 'application/json',
  requestConfig,
}: {
  method: HTTPRequestMethod;
  path: string;
  body?: { [key: string]: any };
  requestContentType?: string;
  requestConfig?: RequestInit;
}) => {
  console.log('_backendFetch called... url: ', `${BackendAPIDomain}${path}`);
  if (!BackendAPIDomain)
    return {
      ok: false,
      payload: {
        status: 400,
        message: 'Domain URL is not defined',
        ecode: 'DOMAIN_URL_UNDEFINED',
      },
    } as ApiResponse<ServerErrorResponse>;

  try {
    let configOption = {} as RequestInit;
    if (requestConfig) {
      configOption = {
        method,
        headers: { 'Content-Type': requestContentType },
        ...requestConfig,
        body: body ? JSON.stringify(body) : undefined,
      };
    } else {
      configOption = {
        method,
        headers: { 'Content-Type': requestContentType },
        body: body ? JSON.stringify(body) : undefined,
      };
    }

    const fetchRequest = new Request(
      `${BackendAPIDomain}${path}`,
      configOption
    );

    const response = await fetch(fetchRequest);
    console.log('Backend Response', response);

    const contentType = response.headers.get('content-type');
    let payload: T | ServerErrorResponse;

    if (contentType?.includes('application/json')) {
      // JSON 응답 처리
      payload = await response.json();
    } else {
      // 텍스트 응답 처리
      payload = (await response.text()) as T;
    }
    return {
      ok: response.ok,
      payload: payload,
    } as ApiResponse<T>;
  } catch {
    return {
      ok: false,
      payload: {
        status: 500,
        message: 'Internal Server Error',
        ecode: 'INTERNAL_SERVER_ERROR',
      },
    } as ApiResponse<ServerErrorResponse>;
  }
};
export const _serverFetch = async <T = any>({
  method,
  path,
  body,
  requestContentType = 'application/json',
  requestConfig,
}: {
  method: HTTPRequestMethod;
  path: string;
  body?: { [key: string]: any };
  requestContentType?: string;
  requestConfig?: RequestInit;
}) => {
  console.log('_serverFetch called... url: ', `${FrontendAPIDomain}${path}`);
  if (!FrontendAPIDomain)
    return {
      ok: false,
      payload: {
        status: 400,
        message: 'Domain URL is not defined',
        ecode: 'DOMAIN_URL_UNDEFINED',
      },
    } as ApiResponse<ServerErrorResponse>;

  try {
    let configOption = {} as RequestInit;
    if (requestConfig) {
      configOption = {
        method,
        headers: { 'Content-Type': requestContentType },
        ...requestConfig,
        body: body ? JSON.stringify(body) : undefined,
      };
    } else {
      configOption = {
        method,
        headers: { 'Content-Type': requestContentType },
        body: body ? JSON.stringify(body) : undefined,
      };
    }

    const fetchRequest = new Request(
      `${FrontendAPIDomain}${path}`,
      configOption
    );

    const response = await fetch(fetchRequest);
    console.log('server response', response);
    const contentType = response.headers.get('content-type');
    let payload: ApiResponse<T>;

    if (contentType?.includes('application/json')) {
      // JSON 응답 처리
      payload = await response.json();
    } else {
      // 텍스트 응답 처리
      payload = (await response.text()) as unknown as ApiResponse<T>;
    }
    console.log('server payload', payload);

    return payload;
  } catch {
    return {
      ok: false,
      payload: {
        status: 500,
        message: 'Internal Server Error',
        ecode: 'INTERNAL_SERVER_ERROR',
      },
    } as ApiResponse<ServerErrorResponse>;
  }
};
