import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

export default () => (
  <Switch>
    <Route exact path="/" component={HomeScreen} />
    <Route exact path="/login" component={LoginScreen} />
    <Route exact path="/onboarding" component={WelcomeScreen} />
    <Route path="/onboarding/:type" component={OnboardingScreen} />
  </Switch>
);
