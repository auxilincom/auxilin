// @flow

import axios from 'axios';
import type {
  Axios, $AxiosXHR, $AxiosError, $AxiosXHRConfig, AxiosPromise,
} from 'axios';

import ApiError from './api.error';

/* eslint-disable flowtype/no-weak-types */

type AxiosFnType = (url: string, data?: Object) => Promise<Object>;

type ApiErrorDataType = {
  data: Object,
  status: number,
};

const updateTokenTimeRemaining: number = 1000 * 60 * 5; // 5 minutes

const api: Axios = axios.create({
  baseURL: window.config.apiUrl,
  withCredentials: true,
  responseType: 'json',
});

// Do not throw errors on 'bad' server response codes
api.interceptors.response.use((axiosConfig: $AxiosXHR<*>): $AxiosXHR<*> => axiosConfig, (error: $AxiosError<Object>): Object => error.response || {});

const generalError = {
  _global: ['Unexpected Error Occurred'],
};

const refreshToken = (): AxiosPromise<void> => {
  const options: $AxiosXHRConfig<Object> = {
    method: 'post',
    url: '/account/refresh-token',
  };

  return api(options);
};

const isOkStatus = (status: number): boolean => {
  return status >= 200 && status < 300;
};

const getCookie = (name: string): ?string => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  }

  return null;
};

const throwApiError = ({ data = {}, status = 500 }: ApiErrorDataType): ApiError => {
  console.error('API: Error Ocurred', status, data); //eslint-disable-line
  throw new ApiError(data, status);
};

const tryUpdateToken = async (): Promise<*> => {
  const expiredAt = getCookie('expired_at');
  if (!expiredAt) {
    return;
  }

  const expiredAtDate = new Date(expiredAt);
  if (expiredAtDate instanceof Date && !Number.isNaN(expiredAtDate)) {
    const now = new Date();

    if (expiredAtDate - now < updateTokenTimeRemaining) {
      const tokenResponse = await refreshToken();

      if (!isOkStatus(tokenResponse.status)) {
        throwApiError({
          data: { errors: generalError },
          status: tokenResponse.status,
        });
      }
    }
  }
};

const redirectToLogin = () => {
  if (window.config.signinUrl) {
    window.location.href = window.config.signinUrl;
  }
};

// eslint-disable-next-line
const handleResponse = function<R>(response: $AxiosXHR<R>, skipUnauthorized: boolean): $AxiosXHR<R> {
  if (!response) {
    throwApiError({
      data: { errors: generalError },
      status: 500,
    });
    return response;
  }

  if (isOkStatus(response.status)) {
    return response;
  }

  if (response.status === 401) {
    if (skipUnauthorized) {
      return response;
    }

    redirectToLogin();
  }

  const errorData: ApiErrorDataType = {
    status: response.status,
    data: {
      ...response.data,
      errors: response.data && response.data.errors ? response.data.errors : generalError,
    },
  };
  throwApiError(errorData);
  return response;
};

// eslint-disable-next-line
const httpRequest = (method: string): AxiosFnType => async function<Req, Res> (url: string, data?: Object): AxiosPromise<Res> {
  await tryUpdateToken();

  let urlWithSlash: string = url;

  if (urlWithSlash[0] !== '/') {
    urlWithSlash = `/${urlWithSlash}`;
  }

  const options: $AxiosXHRConfig<Object> = {
    method,
    url: urlWithSlash,
  };

  if (data) {
    if (method === 'get') {
      options.params = data;
    } else {
      options.data = data;
    }
  }

  let response: $AxiosXHR<Res> = await api(options);
  response = handleResponse(response, true);

  if (response.status === 401) {
    // try to refresh token and if it will be successful
    // then send the request again
    const tokenResponse = await refreshToken();
    if (isOkStatus(tokenResponse.status)) {
      response = await api(options);
      response = handleResponse(response, false);
    } else {
      redirectToLogin();
    }
  }

  return response;
};

export const getRequest = httpRequest('get');
export const postRequest = httpRequest('post');
export const putRequest = httpRequest('put');
export const deleteRequest = httpRequest('delete');

const apiClient = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};

export default apiClient;
