// @flow

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import type { CombinedReducer } from 'redux';
import type { BrowserHistory } from 'history';

import type { StateType, ActionType } from './types';

import toast from './toast/toast.reducer';
import user from './user/user.reducer';

// eslint-disable-next-line
export default (history: BrowserHistory): CombinedReducer<StateType, ActionType> => combineReducers({
  router: connectRouter(history),
  user,
  toast,
});
