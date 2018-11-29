// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfileAsync from './components/profile/profile.async';
import DashboardAsync from './components/dashboard/dashboard.async';

const key = (title: string): string => {
  return module.hot ? Math.random().toString() : title;
};

// key={Math.random()} - is a workaround for work of the hmr with react-loadable
// https://medium.com/@giang.nguyen.dev/hot-loader-with-react-loadable-c8f70c8ce1a6
const routes = (): React$Node => (
  <Switch>
    <Route path="/" exact component={DashboardAsync} key={key('index')} />
    <Route path="/profile" component={ProfileAsync} key={key('profile')} />
  </Switch>
);

export default routes;
