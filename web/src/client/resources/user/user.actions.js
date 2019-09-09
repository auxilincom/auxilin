// @flow

import { string, object } from 'yup';
import _isEmpty from 'lodash/isEmpty';

import { addErrorMessageFromError } from 'resources/toast/toast.actions';

import type { DispatchType, ThunkActionType } from 'resources/types';

import { validate, validateField } from 'helpers/validation';
import type { ValidationResultType, ValidationResultErrorsType } from 'helpers/validation/types';
import * as api from './user.api';

import type { StateType, AxiosUserType, UpdateUserType } from './user.types';

const schema = object({
  firstName: string()
    .trim()
    .required('Your first name must be longer than 1 letter'),
  lastName: string()
    .trim()
    .required('Your last name must be longer than 1 letter'),
  email: string()
    .trim()
    .lowercase()
    .required('Email is required')
    .email('Please enter a valid email address'),
});

export const FETCH_USER = 'fetchUser';
export const UPDATE_USER = 'updateUser';

export const fetchUser = (id: string): ThunkActionType<Promise<?StateType>> => async (dispatch: DispatchType): Promise<?StateType> => {
  try {
    const response: AxiosUserType = await api.fetchUser(id);
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    dispatch(addErrorMessageFromError(error, 'Unable to receive user info:'));
    return null;
  }
};

export const validateUserField = (data: $Shape<StateType>, field: string): Promise<ValidationResultType> => {
  return validateField(data, field, schema);
};

export const validateUser = async (data: $Shape<StateType>): Promise<ValidationResultErrorsType> => {
  const result: ValidationResultType = await validate(data, schema);
  const isValid: boolean = _isEmpty(result.errors);

  return {
    errors: {
      ...result.errors,
      _global: ['Validation Error.'],
    },
    isValid,
  };
};

export const updateUser = (id: string, data: UpdateUserType): ThunkActionType<Promise<StateType>> => async (dispatch: DispatchType): Promise<StateType> => {
  try {
    const response: AxiosUserType = await api.updateUser(id, data);
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    dispatch(addErrorMessageFromError(error, 'Unable to update user info:'));
    throw error;
  }
};
