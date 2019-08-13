// @flow

import React from 'react';
import { connect } from 'react-redux';

import _omit from 'lodash/omit';
import _pick from 'lodash/pick';

import Input from 'components/common/input';
import Button, { colors as buttonColors } from 'components/common/button';
import Form from 'components/common/form';

import { errorsToObject } from 'helpers/api/api.error';

import {
  updateUser as updateUserAction, fetchUser as fetchUserAction, validateUserField, validateUser,
} from 'resources/user/user.actions';
import type { StateType as UserStateType, ValidationErrorsType } from 'resources/user/user.types';
import type { ValidationResultErrorsType } from 'helpers/validation/types';
import { addErrorMessage as addErrorMessageAction, addSuccessMessage as addSuccessMessageAction } from 'resources/toast/toast.actions';
import type { AddErrorMessageType, AddSuccessMessageType } from 'resources/toast/toast.types';

import styles from './profile.styles.pcss';

type UserFieldType = 'firstName' | 'lastName' | 'email';

type ConnectedDispatchPropsType = {
  updateUser: (id: string, data: UserStateType) => ValidationResultErrorsType,
  fetchUser: (id: string) => Promise<?UserStateType>,
  addErrorMessage: AddErrorMessageType,
  addSuccessMessage: AddSuccessMessageType,
};

type PropsType = {
  ...$Exact<ConnectedDispatchPropsType>,
};

type ProfileStateType = {
  firstName: string,
  lastName: string,
  email: string,
  errors: ValidationErrorsType,
  prevProps?: PropsType,
};

type ChangeFnType = (value: string) => void;
type AsyncFnType = () => Promise<*>;

class Profile extends React.Component<PropsType, ProfileStateType> {
  updateUserAsync: AsyncFnType;

  constructor(props: PropsType) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      errors: {},
    };

    this.updateUserAsync = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.feathUserData();
  }

  onFieldChange = (field: string): ChangeFnType => (value: string) => {
    this.setState({ [field]: value });
  };

  validateField = (field: UserFieldType): AsyncFnType => async (): Promise<*> => {
    const userData = _omit(this.state, ['errors', 'prevProps']);
    const result = await validateUserField(userData, field);

    this.setState({ errors: result.errors });
  };

  showErrors(errors: ValidationErrorsType) {
    this.setState({ errors });

    const { addErrorMessage } = this.props;
    addErrorMessage('Unable to save user info:', errors._global ? errors._global.join(', ') : '');
  }

  async feathUserData(): Promise<*> {
    const { fetchUser } = this.props;

    const response: ?UserStateType = await fetchUser('current');
    this.setState(_pick(response, ['firstName', 'lastName', 'email']));
  }

  async updateUser(): Promise<*> {
    const result: ValidationResultErrorsType = await validateUser(_omit(this.state, ['errors', 'prevProps']));

    if (!result.isValid) {
      this.showErrors(result.errors);
      return;
    }

    const { updateUser, addSuccessMessage } = this.props;

    try {
      await updateUser('current', _omit(this.state, 'errors'));
      addSuccessMessage('User info updated!');
    } catch (error) {
      this.setState({ errors: errorsToObject(error) });
    }
  }

  error(field: UserFieldType): Array<string> {
    const { errors } = this.state;
    return errors[field] || [];
  }

  render(): React$Node {
    const { firstName, lastName, email } = this.state;

    return (
      <div className={styles.profile}>
        <div className={styles.profileHeader}>
          <span className={styles.headerTitle}>Edit Profile</span>
          <span className={styles.headerDescription}>Complete your profile</span>
        </div>
        <Form className={styles.form}>
          <span className={styles.inputTitle}>First name</span>

          <Input
            errors={this.error('firstName')}
            value={firstName}
            onChange={this.onFieldChange('firstName')}
            onBlur={this.validateField('firstName')}
          />

          <span className={styles.inputTitle}>Last name</span>

          <Input errors={this.error('lastName')} value={lastName} onChange={this.onFieldChange('lastName')} onBlur={this.validateField('lastName')} />
          <span className={styles.inputTitle}>Email</span>

          <Input errors={this.error('email')} value={email} onChange={this.onFieldChange('email')} onBlur={this.validateField('email')} />
          <div className={styles.buttonWrap}>
            <Button className={styles.button} onClick={this.updateUserAsync} tabIndex={0} color={buttonColors.purple}>
              {'Save'}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect<PropsType, {}, _, _, _, _>(
  null,
  {
    updateUser: updateUserAction,
    fetchUser: fetchUserAction,
    addErrorMessage: addErrorMessageAction,
    addSuccessMessage: addSuccessMessageAction,
  },
)(Profile);
