import React, { PureComponent } from 'react';

import Layout from '~/layouts/main';
import Auth from '~/layouts/auth';

import Form, { Wrap } from '~/components/form';
import Input from '~/components/input';
import Error from '~/components/error';
import Button from '~/components/button';

import { states } from '~/constants';

import { setFormValue } from '~/helpers';
import { forgotPassword } from '~/resources/account/account.api';

import styles from './styles.pcss';

export default class ForgotPassword extends PureComponent {
  static emailSent() {
    return (
      <div>
        <h2>Email Sent</h2>
        <p>
          {`Check your email for a link to reset your password. If it doesn&apos;t
          appear within a few minutes, check your spam folder.`}
        </p>
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.setEmail = setFormValue('email').bind(this);

    this.state = {
      email: '',
      emailSent: false,

      isLoading: false,

      error: null,
    };

    this.submitSigninAsync = this.submitSignin.bind(this);
  }

  async submitSignin(event) {
    event.preventDefault();

    this.setState({ isLoading: true, error: null });
    const newState = {};

    const { email } = this.state;

    try {
      await forgotPassword({ email });
      newState.emailSent = true;
    } catch (error) {
      newState.error = error;
    }

    this.setState({
      ...newState,
      isLoading: false,
    });
  }

  form() {
    const { email, error, isLoading } = this.state;

    return [
      <h2 key="title">Reset Your Password</h2>,
      <Form key="form" onSubmit={this.submitSigninAsync}>
        <Input
          key="email"
          value={email}
          onChange={this.setEmail}
          required
          placeholder="Email"
          type="email"
        />

        <p>
          {`Enter your email address and we will send
          you a link to reset your password.`}
        </p>

        <Error error={error} />

        <div>
          <Button
            className={styles.submitBtn}
            action="submit"
            type="submit"
            primary
            isLoading={isLoading}
            state={states.green}
          >
            {'Submit'}
          </Button>
        </div>
      </Form>,
    ];
  }

  render() {
    const { emailSent } = this.state;

    return (
      <Layout>
        <Layout.Header />
        <Auth className={styles.panel}>
          <Wrap>{emailSent ? ForgotPassword.emailSent() : this.form()}</Wrap>
        </Auth>
      </Layout>
    );
  }
}
