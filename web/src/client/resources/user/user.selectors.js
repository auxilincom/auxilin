// @flow

import { createSelector } from 'reselect';

import type { Selector } from 'flow-interfaces/types';

import type { StateType } from '../types';
import type { StateType as UserType } from './user.types';

const userSelector = (state: StateType): UserType => state.user;

export const firstNameSelector: Selector<string> = createSelector(
  userSelector,
  (user: UserType): string => user.firstName,
);

export const lastNameSelector: Selector<string> = createSelector(
  userSelector,
  (user: UserType): string => user.lastName,
);

export const userNameSelector: Selector<string> = createSelector(
  userSelector,
  (user: UserType): string => {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  },
);

export const emailSelector: Selector<string> = createSelector(
  userSelector,
  (user: UserType): string => user.email,
);
