// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// FIXME: Use the screen component, not container
import HomeContainer from 'containers/HomeContainer';
import OnboardingScreen from './OnboardingScreen';
import Welcome from './Welcome';

import ProtectedRoute from '../utils/ProtectedRoute';

import { getChainName } from 'utils/chainName';

const chainName = getChainName();
const CHAIN_NAME_EXISTS = process.env.__BYPASS_SIGN_UP_WIZARD__ || chainName;

export default () => {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={HomeContainer}
        existing={CHAIN_NAME_EXISTS}
      />
      <Route path="/welcome" component={Welcome} />
      <Route path="/wizard/:type" component={OnboardingScreen} />
    </Switch>
  );
};
