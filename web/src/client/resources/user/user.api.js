// @flow

import { apiClient } from 'helpers/api';

import type { AxiosPromiseUserType, UpdateUserType } from './user.types';

export const fetchUser = (id: string = ''): AxiosPromiseUserType => {
  return apiClient.get(`/users/${id}`);
};

export const updateUser = (id: string = '', data: UpdateUserType): AxiosPromiseUserType => {
  return apiClient.put(`/users/${id}`, data);
};
