// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';

import App from 'screens/Root';
import * as serviceWorker from './serviceWorker';

// Import stylesheet(s)
import 'index.less';

const root = document.getElementById('root');

if (root != null) {
  render(
    <Router>
      <App />
    </Router>,
    root,
  );
}

// Keep this
serviceWorker.unregister();
