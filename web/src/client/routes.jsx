// @flow

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfileAsync from './components/profile/profile.async';
import DashboardAsync from './components/dashboard/dashboard.async';

const routes = (): React$Node => (
  <Switch>
    <Route path="/" exact component={DashboardAsync} />
    <Route path="/profile" component={ProfileAsync} />
  </Switch>
);

export default routes;
