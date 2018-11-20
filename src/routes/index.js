import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export default () => (
  <Switch>
    <Route component={HomeScreen} exact path="/" />
    <Route component={OnboardingScreen} path="/onboarding/:type" />
  </Switch>
);
