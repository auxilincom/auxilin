// @flow

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Input from 'components/common/input';
import Button, { colors as buttonColors } from 'components/common/button';
import Form from 'components/common/form';

import { errorsToObject } from 'helpers/api/api.error';

import type { DispatchType } from 'resources/types';
import {
  updateUser as updateUserAction, fetchUser as fetchUserAction, validateUserField, validateUser,
} from 'resources/user/user.actions';
import type { StateType as UserStateType, ValidationErrorsType, UpdateUserType } from 'resources/user/user.types';
import type { ValidationResultErrorsType } from 'helpers/validation/types';
import {
  addErrorMessage as addErrorMessageAction,
  addSuccessMessage as addSuccessMessageAction,
} from 'resources/toast/toast.actions';

import styles from './profile.styles.pcss';

type UserFieldType = 'firstName' | 'lastName' | 'email';

export default function Profile(): React$Node {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch: DispatchType = useDispatch();

  const userData: UpdateUserType = {
    firstName,
    lastName,
    email,
  };

  function onChangeFirstName(value: string) {
    setFirstName(value);
  }
  function onChangeLastName(value: string) {
    setLastName(value);
  }
  function onChangeEmailName(value: string) {
    setEmail(value);
  }

  function showErrors(validationErrors: ValidationErrorsType) {
    setErrors(validationErrors);
    dispatch(addErrorMessageAction(
      'Unable to save user info:',
      validationErrors._global ? validationErrors._global.join(', ') : '',
    ));
  }
  function fieldError(field: UserFieldType): Array<string> {
    return errors[field] || [];
  }
  async function validateField(field: UserFieldType) {
    const result = await validateUserField(userData, field);
    setErrors(result.errors);
  }

  async function updateUserAsync() {
    const result: ValidationResultErrorsType = await validateUser(userData);

    if (!result.isValid) {
      showErrors(result.errors);
      return;
    }

    try {
      await dispatch(updateUserAction('current', userData));
      dispatch(addSuccessMessageAction('User info updated!'));
    } catch (error) {
      setErrors(errorsToObject(error));
    }
  }

  async function getCurrentUser() {
    const response: ?UserStateType = await dispatch(fetchUserAction('current'));
    if (response) {
      setFirstName(response.firstName);
      setLastName(response.lastName);
      setEmail(response.email);
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <span className={styles.headerTitle}>Edit Profile</span>
        <span className={styles.headerDescription}>Complete your profile</span>
      </div>
      <Form className={styles.form}>
        <span className={styles.inputTitle}>First name</span>

        <Input
          errors={fieldError('firstName')}
          value={firstName}
          onChange={onChangeFirstName}
          onBlur={() => { validateField('firstName'); }}
        />

        <span className={styles.inputTitle}>Last name</span>

        <Input
          errors={fieldError('lastName')}
          value={lastName}
          onChange={onChangeLastName}
          onBlur={() => { validateField('lastName'); }}
        />
        <span className={styles.inputTitle}>Email</span>

        <Input
          errors={fieldError('email')}
          value={email}
          onChange={onChangeEmailName}
          onBlur={() => { validateField('email'); }}
        />
        <div className={styles.buttonWrap}>
          <Button
            className={styles.button}
            onClick={updateUserAsync}
            tabIndex={0}
            color={buttonColors.purple}
          >
            {'Save'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
