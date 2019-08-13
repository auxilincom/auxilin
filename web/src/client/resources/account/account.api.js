// @flow

import { apiClient } from 'helpers/api';

import type { PromiseLogoutResponseType } from './account.types';

export const logout = (): PromiseLogoutResponseType => {
  return apiClient.post('/account/logout');
};
