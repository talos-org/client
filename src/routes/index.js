import React from 'react';
import { Router } from '@reach/router';

// import Account from '../containers/Account/index';
import { DummyContainer as DummyComponent } from '../containers/DummyContainer/index';
// import Settings from '../containers/Settings/index';

export default ({ children }) => (
  <div>
    <Router primary={true}>
      {/* <Account path="/account" /> */}
      <DummyComponent path="/" />
      {/* <Settings path="/settings" /> */}
    </Router>
  </div>
);
