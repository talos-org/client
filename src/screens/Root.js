// @flow
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer/index';
import Login from './Login/index';
import OnboardingScreen from './OnboardingScreen';
import WelcomeScreen from './WelcomeScreen';

export default () => {
  if (!localStorage.getItem('chainName')) {
    return (
      <Switch>
        <Route exact path="/onboarding" component={WelcomeScreen} />
        <Route path="/onboarding/:type" component={OnboardingScreen} />
        <Redirect to="/onboarding" />
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    );
  }
};
