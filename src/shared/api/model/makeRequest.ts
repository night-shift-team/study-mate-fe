export const makeRequest = (endPoint: string, options: RequestInit) => {
  return { url: endPoint, options: options };
};
