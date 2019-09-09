// @flow

import type { Store as ReduxStore } from 'redux';
import type { ThunkDispatch, ThunkAction } from 'redux-thunk';

import type { StateType as ToastStateType, ActionType as ToastActionType } from './toast/toast.types';
import type { StateType as UserStateType, ActionType as UserActionType } from './user/user.types';

export type StateType = {
  toast: ToastStateType,
  user: UserStateType,
};

export type ReduxInitActionType = { type: '@@INIT' };

export type ActionType = ReduxInitActionType | ToastActionType | UserActionType;

export type DispatchType = ThunkDispatch<StateType, void, ActionType>;

export type ThunkActionType<TReturnType> = ThunkAction<TReturnType, StateType, void, ActionType>;

export type VoidThunkActionType = ThunkActionType<void>;

export type StoreType = ReduxStore<StateType, ActionType, DispatchType>;
