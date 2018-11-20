import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer/index';
import OnboardingScreen from '../screens/OnboardingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

export default () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    <Route exact path="/onboarding" component={WelcomeScreen} />
    <Route path="/onboarding/:type" component={OnboardingScreen} />
  </Switch>
);
