import { _fetchApi } from './config';
interface UpdateAccessTokenRes {}
const apiDomainUrl = process.env.NEXT_PUBLIC_API_URL ?? '';

export const updateAccessToken = async () => {
  return await _fetchApi<UpdateAccessTokenRes>(
    apiDomainUrl,
    'POST',
    'application/json'
  );
};
