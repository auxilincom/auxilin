// @flow

export type MessageTypeType = 'error' | 'success' | 'warning';

export type ShortMessageType = {
  type: MessageTypeType,
  title: string,
  text?: string | Array<string>,
  isHTML: boolean,
};

export type MessageType = {
  id: string,
  type: MessageTypeType,
  title: string,
  text?: string | Array<string>,
  isHTML: boolean,
};

export type StateType = {
  messages: Array<MessageType>,
};

export type ActionType = {
  type: string,
  message?: MessageType,
  id?: string,
};

export type ReducerType = (state?: StateType, action: ActionType) => StateType;

export type AddErrorMessageType = (title: string, text?: string, isHTML?: boolean) => void;

export type AddSuccessMessageType = (title: string, text?: string, isHTML?: boolean) => void;
