import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeContainer from '../containers/HomeContainer/index';

export default () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
    {/* <Route component={HomeScreen} exact path="/" /> */}
    {/* <Route component={OnboardingScreen} path="/onboarding/:type" /> */}
  </Switch>
);
