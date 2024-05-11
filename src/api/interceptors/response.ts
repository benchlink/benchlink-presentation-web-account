import { AxiosError } from 'axios';
import { cookies, ACCESS_TOKEN, EMAIL } from '../client';
import { CustomAxiosResponse } from '../types/@shared';
import { getErrorMessage } from '@/utils/interceptor/getErrorMessage';
import { printResponseLog, printErrorLog } from '@/utils/interceptor/logger';

export function logResponse(response: CustomAxiosResponse) {
  const { config, data } = response;

  printResponseLog({
    method: config?.method,
    endPoint: config?.url,
    responseObj: data?.body ?? data,
  });

  return response;
}

export function unwrapResponse(response: CustomAxiosResponse) {
  return response.data?.body ?? response.data;
}

export function logError(e: AxiosError) {
  const url = e.config?.url;
  const method = e.config?.method;

  const errorMessage = getErrorMessage(e);

  printErrorLog({
    method,
    endPoint: url,
    errorMessage,
    errorObj: e,
  });

  return Promise.reject(e);
}

export function redirectToSignIn() {
  cookies.remove(ACCESS_TOKEN, { path: '/' });
  cookies.remove(EMAIL, { path: '/' });
  window.location.href = `${window.location.origin}/signin`;
}
