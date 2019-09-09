// @flow

import uuidv4 from 'uuid/v4';

import type { DispatchType, VoidThunkActionType } from 'resources/types';

import type { ApiErrorType, ErrorDataType } from 'helpers/api/api.types';
import type { ShortMessageType } from './toast.types';

export const ADD_MESSAGE: string = 'add toast message';
export const REMOVE_MESSAGE: string = 'remove toast message';

const displayTime = 3000;

type RemoveMessageType = {
  type: string,
  id: string,
};

const hideAfterTimeout = (dispatch: DispatchType, id: string) => {
  setTimeout(() => {
    dispatch({
      type: REMOVE_MESSAGE,
      id,
    });
  }, displayTime);
};

const addMessage = (dispatch: DispatchType, data: ShortMessageType) => {
  const id: string = uuidv4();

  hideAfterTimeout(dispatch, id);

  dispatch({
    type: ADD_MESSAGE,
    message: {
      ...data,
      id,
    },
  });
};

export const addErrorMessage = (title: string, text?: string, isHTML?: boolean = false): VoidThunkActionType => (dispatch: DispatchType) => {
  addMessage(dispatch, {
    type: 'error',
    title,
    text,
    isHTML,
  });
};

export const addSuccessMessage = (title: string, text?: string, isHTML?: boolean = false): VoidThunkActionType => (dispatch: DispatchType) => {
  addMessage(dispatch, {
    type: 'success',
    title,
    text,
    isHTML,
  });
};

export const removeMessage = (id: string): RemoveMessageType => ({
  type: REMOVE_MESSAGE,
  id,
});

export const addErrorMessageFromError = (error: ApiErrorType, title?: string = 'Error:'): VoidThunkActionType => (dispatch: DispatchType) => {
  const { errors }: ErrorDataType = error.data;

  addMessage(dispatch, {
    type: 'error',
    title,
    text: errors._global ? errors._global.join(', ') : '',
    isHTML: false,
  });
};
