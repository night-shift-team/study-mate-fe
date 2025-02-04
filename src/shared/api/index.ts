type HTTPRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type ContentType =
  | 'text/html'
  | 'application/json'
  | 'text/plain'
  | 'application/javascript'
  | 'application/x-www-form-urlencoded'
  | string;

const _fetchApi = async (
  link: string,
  method: HTTPRequestMethod = 'GET',
  contentType: ContentType = 'application/json',
  body?: any
): Promise<Response> => {
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
      options.body =
        contentType === 'application/json' ? JSON.stringify(body) : body;
      break;
    case 'DELETE':
    case 'GET':
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }

  try {
    const response = await fetch(link, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
