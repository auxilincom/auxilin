// @flow

import type { ErrorDataType } from './api.types'; // eslint-disable-line

type ErrorType = {
  [key: string]: string,
};

class ApiError extends Error {
  data: ErrorDataType;

  status: number;

  constructor(data: ErrorDataType, status: number) {
    super(data);

    this.name = this.constructor.name;

    // a workaround to make `instanceof ApiError` work in ES5 with babel
    // $FlowFixMe
    this.constructor = ApiError;
    // $FlowFixMe
    this.__proto__ = ApiError.prototype; // eslint-disable-line

    this.data = data;
    this.status = status;
  }

  status: number;
}

export const errorsToObject = (error: ApiError): Object => {
  const result = {};
  const { errors } = error.data;

  if (Array.isArray(errors)) {
    errors.forEach((errorEl: ErrorType) => {
      Object.keys(errorEl).forEach((key: string) => {
        result[key] = [] || result[key];
        result[key].push(errorEl[key]);
      });
    });
  }

  return result;
};

// $FlowFixMe
ApiError.prototype = Error.prototype;

export default ApiError;
