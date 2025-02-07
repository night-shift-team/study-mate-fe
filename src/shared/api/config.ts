import { BatchInterceptor } from '@mswjs/interceptors';
import { FetchInterceptor } from '@mswjs/interceptors/fetch';

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
// interceptor.apply();

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
  method: HTTPRequestMethod,
  body?: any,
  contentType?: ContentType
): Promise<T> => {
  contentType = contentType ?? 'application/json';

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': contentType,
    },
  };
  console.log('before', options, contentType);
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
    const response = await fetch(link, options);
    console.log(response);
    return response as unknown as Promise<T>;
  } catch (error) {
    console.error('Fetch error:', error);
    return new Promise<T>((resolve) => resolve('fail' as T));
  }
};

// 인터셉터 리스너 설정
interceptor.on('request', async ({ request }) => {
  // console.log('Intercepted request:', request.method, request.url);
  // if (request.url.startsWith(process.env.NEXT_PUBLIC_API_URL!)) {
  //   const accessToken = localStorage.getItem('accessToken');
  //   console.log("accessToken", accessToken)
  //   request.headers.append('Authorization', `Bearer ${accessToken}`);
  // }
});

interceptor.on('response', async ({ response }) => {
  // if (!apiDomainUrl) return;
  // console.log('Intercepted response:', response.status);
  // //Todo: status(401) = token update
  // if (response.status === 401){
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   if (refreshToken) {
  //     try {
  //       const newToken = await updateAccessToken();
  //       const data = newToken as unknown as {
  //         accessToken: string;
  //         refreshToken: string;
  //       };
  //       localStorage.removeItem('accessToken');
  //       localStorage.setItem('accessToken', data.accessToken);
  //       localStorage.setItem('refreshToken', data.refreshToken);
  //       //Todo: login api(accessToken)
  //     } catch (e: any) {
  //       console.log(e);
  //       window.location.href = '/login?fail';
  //     }
  //   } else {
  //     //Todo: logout -> login api(id,pw)
  //     window.location.href = '/login';
  //   }
  // }
});
