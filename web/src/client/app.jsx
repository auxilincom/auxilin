// @flow

import { hot } from 'react-hot-loader/root';

import React from 'react';

import routes from './routes';

import Layout from './components/layout';

const App = (): React$Node => <Layout>{routes()}</Layout>;

export default hot(App);
