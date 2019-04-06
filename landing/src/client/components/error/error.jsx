import React from 'react';

import { ApiError } from '~/helpers/api';

import styles from './styles.pcss';

const defaultMessage = 'Unexpected error occurred';

const formatError = (err) => {
  if (err instanceof ApiError) {
    if (err.serverError) {
      return defaultMessage;
    }

    if (err._status === 400) {
      if (err.data && err.data.errors) {
        return err.data.errors.map((e) => {
          return Object.values(e).map((errorValue) => {
            return (
              <div>{errorValue}</div>
            );
          });
        });
      }
      return 'Validation Error';
    }
  }

  return defaultMessage;
};

export default ({ error } = {}) => {
  if (!error) {
    return null;
  }

  return (
    <div className={styles.error}>
      {formatError(error)}
    </div>
  );
};
