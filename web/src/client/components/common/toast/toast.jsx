// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { FaExclamationCircle, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

import type { StateType } from 'resources/types';
import { allMessagesSelector } from 'resources/toast/toast.selectors';
import { removeMessage as removeMessageAction } from 'resources/toast/toast.actions';

import type { MessageType, MessageTypeType } from 'resources/toast/toast.types';

import styles from './toast.styles.pcss';

type ToastPropsType = {
  messages: Array<MessageType>,
  removeMessage: (id: string) => *,
};

type StatePropsType = {|
  messages: Array<MessageType>,
|};

type KeyDownFnType = (e: SyntheticKeyboardEvent<HTMLDivElement>) => void;
type VoidFnType = () => void;

const icon = (messageType: MessageTypeType): React$Node => {
  switch (messageType) {
    case 'error':
      return <FaExclamationCircle className={styles.icon} size={25} />;

    case 'warning':
      return <FaExclamationTriangle className={styles.icon} size={25} />;

    case 'success':
      return <FaCheckCircle className={styles.icon} size={25} />;

    default:
      return null;
  }
};

class Toast extends Component<ToastPropsType> {
  el: HTMLElement;

  constructor(props: ToastPropsType) {
    super(props);

    this.el = document.createElement('div');
    this.el.classList.add(styles.wrap);
  }

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.el);
    }
  }

  onMessageClick = (id: string): VoidFnType => () => {
    const { removeMessage } = this.props;
    removeMessage(id);
  };

  onMessageKeyDown = (id: string): KeyDownFnType => (e: SyntheticKeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 13) {
      const { removeMessage } = this.props;
      removeMessage(id);
    }
  };

  messagesList(): Array<React$Node> {
    const { messages } = this.props;

    return messages.map((message: MessageType, index: number): React$Node => {
      const text = !message.text || typeof message.text === 'string' ? message.text : message.text.join(', ');

      return (
        <div
          key={message.id}
          role="button"
          tabIndex={index}
          className={classnames(styles.message, styles[message.type])}
          onClick={this.onMessageClick(message.id)}
          onKeyDown={this.onMessageKeyDown(message.id)}
        >
          {icon(message.type)}
          <div>
            {message.title && <div className={styles.title}>{message.title}</div>}
            <div>{text}</div>
          </div>
        </div>
      );
    });
  }

  render(): React$Node {
    return ReactDOM.createPortal(this.messagesList(), this.el);
  }
}

const mapStateToProps = (state: StateType): StatePropsType => ({
  messages: allMessagesSelector(state),
});

export default connect<ToastPropsType, {}, _, _, _, _>(
  mapStateToProps,
  {
    removeMessage: removeMessageAction,
  },
)(Toast);
