// @flow

import type { AxiosPromise, $AxiosXHR } from 'axios';

export type LogoutResponseType = {
  redirectUrl: string,
};

export type AxiosLogoutResponseType = $AxiosXHR<LogoutResponseType>;

export type PromiseLogoutResponseType = AxiosPromise<LogoutResponseType>;
