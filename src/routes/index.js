import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export default () => (
  <Switch>
    <Route path="/onboarding/:id" component={OnboardingScreen} />
  </Switch>
);
