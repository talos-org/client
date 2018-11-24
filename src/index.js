// @flow
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';

import App from './routes/index';
import * as serviceWorker from './serviceWorker';

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
