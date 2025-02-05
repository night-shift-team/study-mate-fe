import { BatchInterceptor } from '@mswjs/interceptors';
import { FetchInterceptor } from '@mswjs/interceptors/fetch';
import { updateAccessToken } from '.';

type HTTPRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ContentType =
  | 'text/html'
  | 'application/json'
  | 'text/plain'
  | 'application/javascript'
  | 'application/x-www-form-urlencoded';

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
export const _fetchApi = async <T = any>(
  link: string,
  method: HTTPRequestMethod = 'GET',
  contentType: ContentType = 'application/json',
  body?: any
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': contentType,
    },
  };

  switch (method) {
    case 'POST':
    case 'PUT':
    case 'PATCH':
      if (body !== undefined) {
        options.body =
          contentType === 'application/json' ? JSON.stringify(body) : body;
      }
      break;
    case 'DELETE':
    case 'GET':
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }

  try {
    // 인터셉터를 통한 요청 처리
    const response = await fetch(link, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json as unknown as Promise<T>;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

// 인터셉터 리스너 설정
interceptor.on('request', ({ request }) => {
  console.log('Intercepted request:', request.method, request.url);
  if (request.url.startsWith('https://api.yourservice.com/')) {
    const accessToken = localStorage.getItem('accessToken');
    request.headers.append('Authorization', `Bearer ${accessToken}`);
  }
});

interceptor.on('response', async ({ response }) => {
  if (!apiDomainUrl) return;
  console.log('Intercepted response:', response.status);

  //Todo: status(401) = token update
  // if (status === 401){}
  const refreshToken = localStorage.getItem('refreshToken');
  if (refreshToken) {
    try {
      const newToken = await updateAccessToken();
      const data = newToken as unknown as {
        accessToken: string;
        refreshToken: string;
      };

      localStorage.removeItem('accessToken');

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      //Todo: login api(accessToken)
    } catch (e: any) {
      console.log(e);
      window.location.href = '/login?fail';
    }
  } else {
    //Todo: logout -> login api(id,pw)
    window.location.href = '/login';
  }
});
