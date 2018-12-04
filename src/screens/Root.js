// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer/index';
import Login from './Login/index';
import OnboardingScreen from './OnboardingScreen';
import WelcomeScreen from './WelcomeScreen';

export default () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/onboarding" component={WelcomeScreen} />
    <Route path="/onboarding/:type" component={OnboardingScreen} />
  </Switch>
);
