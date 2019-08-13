// @flow

import type { OutputSelector } from 'reselect';
import type { AxiosPromise } from 'axios';

import type { StateType } from 'resources/types';

export type Selector<TResult> = OutputSelector<StateType, void, TResult>; // eslint-disable-line

export type PromiseEmptyResponseType = AxiosPromise<void>;

export type VoidFnType = () => void;
