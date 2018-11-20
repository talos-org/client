import React from 'react';
import { Router } from '@reach/router';

// import Account from '../containers/Account/index';
import { LoginContainer as Login } from '../containers/LoginContainer/index';
import { HomeContainer as Home } from '../containers/HomeContainer/index';
// import Settings from '../containers/Settings/index';

export default ({ children }) => (
  <div>
    <Router primary={true}>
      {/* <Account path="/account" /> */}
      <Home path="/" />
      <Login path="/login" />
      {/* <Settings path="/settings" /> */}
    </Router>
  </div>
);
