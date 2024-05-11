import { InternalAxiosRequestConfig } from 'axios';
import { ACCESS_TOKEN, cookies } from '../client';
import { printRequestLog } from '@/utils/interceptor/logger';

const publicRoutes = new Set<string>([
  '/industry/v1',
  '/member/login/v1',
  '/app/signup/text/v1',
  '/app/network/text/v1',
  '/app/home/url/v1',
  '/member/duplicate/email/v1',
  '/network/host/v1',
  '/member/verify/password/v1',
  '/member/verify/email/v1',
  '/member/password/v1',
  '/member/refresh-token/v1',
  '/language/v1',
  '/location/v1',
  '/agreements/terms/v1',
  '/agreements/privacy/v1',
]);
export async function setAccessToken(config: InternalAxiosRequestConfig) {
  // Always set the access token if available, for protected routes
  if (config.url && !publicRoutes.has(config.url.split('?')[0])) {
    const accessToken = cookies.get(ACCESS_TOKEN);
    // const accessToken = window.localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      config.headers['Authorization'] = `${accessToken}`;
    }
  }

  return config;
}

export function logRequest(config: InternalAxiosRequestConfig) {
  printRequestLog({
    method: config.method,
    endPoint: config.url,
    requestParams: config.params,
    requestData: config.data,
    config,
  });

  return config;
}
