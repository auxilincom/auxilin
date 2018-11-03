// @flow

import { apiClient } from 'helpers/api';

import type { AxiosPromiseUserType, StateType } from './user.types';

export const fetchUser = (id: string = ''): AxiosPromiseUserType => {
  return apiClient.get(`/users/${id}`);
};

export const updateUser = (id: string = '', data: StateType): AxiosPromiseUserType => {
  return apiClient.put(`/users/${id}`, data);
};
